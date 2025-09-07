import { NextRequest, NextResponse } from "next/server"

// Simulação de banco de dados em memória (em produção, usar um banco real)
let users: any[] = []

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')

  switch (action) {
    case 'ranking':
      // Retornar ranking de usuários
      const ranking = users
        .sort((a, b) => {
          if (b.xp !== a.xp) return b.xp - a.xp
          if (b.level !== a.level) return b.level - a.level
          return b.streak - a.streak
        })
        .map((user, index) => ({
          ...user,
          rank: index + 1,
          // Não retornar informações sensíveis
          email: undefined
        }))
      
      return NextResponse.json({ ranking })

    case 'profile':
      const userId = searchParams.get('userId')
      if (!userId) {
        return NextResponse.json({ error: 'ID do usuário é obrigatório' }, { status: 400 })
      }
      
      const user = users.find(u => u.id === userId)
      if (!user) {
        return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
      }
      
      return NextResponse.json({ user: { ...user, email: undefined } })

    default:
      return NextResponse.json({ users: users.map(u => ({ ...u, email: undefined })) })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    switch (action) {
      case 'register':
        const { name, email } = body
        
        if (!name || !email) {
          return NextResponse.json({ error: 'Nome e email são obrigatórios' }, { status: 400 })
        }

        // Verificar se email já existe
        if (users.find(user => user.email === email)) {
          return NextResponse.json({ error: 'Email já está em uso' }, { status: 409 })
        }

        // Criar novo usuário
        const newUser = {
          id: Date.now().toString(36) + Math.random().toString(36).substr(2),
          name,
          email,
          level: 1,
          xp: 0,
          totalQuizzes: 0,
          correctAnswers: 0,
          streak: 0,
          achievements: [],
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString()
        }

        users.push(newUser)
        
        return NextResponse.json({ 
          success: true, 
          user: { ...newUser, email: undefined } 
        })

      case 'login':
        const { email: loginEmail } = body
        
        if (!loginEmail) {
          return NextResponse.json({ error: 'Email é obrigatório' }, { status: 400 })
        }

        const user = users.find(u => u.email === loginEmail)
        if (!user) {
          return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
        }

        // Atualizar último login
        user.lastLoginAt = new Date().toISOString()
        
        return NextResponse.json({ 
          success: true, 
          user: { ...user, email: undefined } 
        })

      case 'updateStats':
        const { userId, correct, total, xpGained } = body
        
        if (!userId) {
          return NextResponse.json({ error: 'ID do usuário é obrigatório' }, { status: 400 })
        }

        const userIndex = users.findIndex(u => u.id === userId)
        if (userIndex === -1) {
          return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
        }

        const currentUser = users[userIndex]
        const newXP = currentUser.xp + (xpGained || 0)
        const newLevel = Math.floor(Math.sqrt(newXP / 100)) + 1
        
        // Atualizar estatísticas
        users[userIndex] = {
          ...currentUser,
          xp: newXP,
          level: newLevel,
          totalQuizzes: currentUser.totalQuizzes + 1,
          correctAnswers: currentUser.correctAnswers + correct,
          streak: correct === total ? currentUser.streak + 1 : 0
        }

        return NextResponse.json({ 
          success: true, 
          user: { ...users[userIndex], email: undefined },
          levelUp: newLevel > currentUser.level
        })

      case 'addAchievement':
        const { userId: achievementUserId, achievementId } = body
        
        if (!achievementUserId || !achievementId) {
          return NextResponse.json({ error: 'ID do usuário e da conquista são obrigatórios' }, { status: 400 })
        }

        const achievementUserIndex = users.findIndex(u => u.id === achievementUserId)
        if (achievementUserIndex === -1) {
          return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
        }

        const achievementUser = users[achievementUserIndex]
        const hasAchievement = achievementUser.achievements.includes(achievementId)
        
        if (!hasAchievement) {
          users[achievementUserIndex] = {
            ...achievementUser,
            achievements: [...achievementUser.achievements, achievementId]
          }
        }

        return NextResponse.json({ 
          success: true, 
          user: { ...users[achievementUserIndex], email: undefined },
          isNew: !hasAchievement
        })

      default:
        return NextResponse.json({ error: 'Ação não reconhecida' }, { status: 400 })
    }
  } catch (error) {
    console.error('Erro na API de usuários:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, updates } = body
    
    if (!userId) {
      return NextResponse.json({ error: 'ID do usuário é obrigatório' }, { status: 400 })
    }

    const userIndex = users.findIndex(u => u.id === userId)
    if (userIndex === -1) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
    }

    // Atualizar usuário (não permitir alteração de email e ID)
    const { email, id, ...allowedUpdates } = updates
    users[userIndex] = {
      ...users[userIndex],
      ...allowedUpdates
    }

    return NextResponse.json({ 
      success: true, 
      user: { ...users[userIndex], email: undefined } 
    })
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

