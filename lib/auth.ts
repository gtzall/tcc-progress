import { storage } from './utils'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  level: number
  xp: number
  totalQuizzes: number
  correctAnswers: number
  streak: number
  achievements: string[]
  createdAt: string
  lastLoginAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

class AuthService {
  private readonly STORAGE_KEY = 'quizmaster_auth'
  private readonly USERS_KEY = 'quizmaster_users'

  // Obter estado atual da autenticação
  getAuthState(): AuthState {
    const authData = storage.get<AuthState>(this.STORAGE_KEY)
    return authData || { user: null, isAuthenticated: false }
  }

  // Obter todos os usuários registrados
  private getUsers(): User[] {
    return storage.get<User[]>(this.USERS_KEY) || []
  }

  // Salvar usuários
  private saveUsers(users: User[]): void {
    storage.set(this.USERS_KEY, users)
  }

  // Salvar estado de autenticação
  private saveAuthState(authState: AuthState): void {
    storage.set(this.STORAGE_KEY, authState)
  }

  // Registrar novo usuário
  register(name: string, email: string): { success: boolean; user?: User; error?: string } {
    const users = this.getUsers()
    
    // Verificar se email já existe
    if (users.find(user => user.email === email)) {
      return { success: false, error: 'Email já está em uso' }
    }

    // Criar novo usuário
    const newUser: User = {
      id: this.generateId(),
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

    // Salvar usuário
    users.push(newUser)
    this.saveUsers(users)

    // Fazer login automático
    const authState: AuthState = {
      user: newUser,
      isAuthenticated: true
    }
    this.saveAuthState(authState)

    return { success: true, user: newUser }
  }

  // Fazer login
  login(email: string): { success: boolean; user?: User; error?: string } {
    const users = this.getUsers()
    const user = users.find(u => u.email === email)

    if (!user) {
      return { success: false, error: 'Usuário não encontrado' }
    }

    // Atualizar último login
    user.lastLoginAt = new Date().toISOString()
    this.saveUsers(users)

    // Salvar estado de autenticação
    const authState: AuthState = {
      user,
      isAuthenticated: true
    }
    this.saveAuthState(authState)

    return { success: true, user }
  }

  // Fazer logout
  logout(): void {
    const authState: AuthState = {
      user: null,
      isAuthenticated: false
    }
    this.saveAuthState(authState)
  }

  // Atualizar dados do usuário
  updateUser(updates: Partial<User>): { success: boolean; user?: User; error?: string } {
    const authState = this.getAuthState()
    if (!authState.isAuthenticated || !authState.user) {
      return { success: false, error: 'Usuário não autenticado' }
    }

    const users = this.getUsers()
    const userIndex = users.findIndex(u => u.id === authState.user!.id)
    
    if (userIndex === -1) {
      return { success: false, error: 'Usuário não encontrado' }
    }

    // Atualizar usuário
    const updatedUser = { ...users[userIndex], ...updates }
    users[userIndex] = updatedUser

    // Salvar alterações
    this.saveUsers(users)
    
    // Atualizar estado de autenticação
    const newAuthState: AuthState = {
      user: updatedUser,
      isAuthenticated: true
    }
    this.saveAuthState(newAuthState)

    return { success: true, user: updatedUser }
  }

  // Adicionar XP ao usuário
  addXP(xp: number): { success: boolean; user?: User; levelUp?: boolean } {
    const authState = this.getAuthState()
    if (!authState.isAuthenticated || !authState.user) {
      return { success: false }
    }

    const currentUser = authState.user
    const newXP = currentUser.xp + xp
    const currentLevel = currentUser.level
    const newLevel = this.calculateLevel(newXP)
    const levelUp = newLevel > currentLevel

    const updateResult = this.updateUser({
      xp: newXP,
      level: newLevel
    })

    return {
      success: updateResult.success,
      user: updateResult.user,
      levelUp
    }
  }

  // Calcular nível baseado no XP
  private calculateLevel(xp: number): number {
    // Fórmula: level = floor(sqrt(xp / 100)) + 1
    return Math.floor(Math.sqrt(xp / 100)) + 1
  }

  // Calcular XP necessário para o próximo nível
  getXPForNextLevel(currentLevel: number): number {
    return Math.pow(currentLevel, 2) * 100
  }

  // Adicionar conquista
  addAchievement(achievementId: string): { success: boolean; user?: User; isNew?: boolean } {
    const authState = this.getAuthState()
    if (!authState.isAuthenticated || !authState.user) {
      return { success: false }
    }

    const currentUser = authState.user
    const hasAchievement = currentUser.achievements.includes(achievementId)
    
    if (hasAchievement) {
      return { success: true, user: currentUser, isNew: false }
    }

    const updateResult = this.updateUser({
      achievements: [...currentUser.achievements, achievementId]
    })

    return {
      success: updateResult.success,
      user: updateResult.user,
      isNew: true
    }
  }

  // Atualizar estatísticas do quiz
  updateQuizStats(correct: number, total: number): { success: boolean; user?: User } {
    const authState = this.getAuthState()
    if (!authState.isAuthenticated || !authState.user) {
      return { success: false }
    }

    const currentUser = authState.user
    const updateResult = this.updateUser({
      totalQuizzes: currentUser.totalQuizzes + 1,
      correctAnswers: currentUser.correctAnswers + correct,
      streak: correct === total ? currentUser.streak + 1 : 0
    })

    return updateResult
  }

  // Obter ranking de usuários
  getUserRanking(): User[] {
    const users = this.getUsers()
    return users
      .sort((a, b) => {
        // Ordenar por XP (descendente)
        if (b.xp !== a.xp) return b.xp - a.xp
        // Em caso de empate, ordenar por nível (descendente)
        if (b.level !== a.level) return b.level - a.level
        // Em caso de empate, ordenar por streak (descendente)
        return b.streak - a.streak
      })
      .map((user, index) => ({
        ...user,
        rank: index + 1
      })) as (User & { rank: number })[]
  }

  // Gerar ID único
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // Verificar se usuário está autenticado
  isAuthenticated(): boolean {
    return this.getAuthState().isAuthenticated
  }

  // Obter usuário atual
  getCurrentUser(): User | null {
    return this.getAuthState().user
  }
}

// Instância singleton do serviço de autenticação
export const authService = new AuthService()

// Hook para usar autenticação em componentes React
export function useAuth() {
  const [authState, setAuthState] = React.useState<AuthState>(authService.getAuthState())

  React.useEffect(() => {
    // Listener para mudanças no localStorage
    const handleStorageChange = () => {
      setAuthState(authService.getAuthState())
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Verificar mudanças periodicamente (para mudanças na mesma aba)
    const interval = setInterval(() => {
      const currentState = authService.getAuthState()
      setAuthState(prev => {
        if (JSON.stringify(prev) !== JSON.stringify(currentState)) {
          return currentState
        }
        return prev
      })
    }, 1000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const register = (name: string, email: string) => {
    const result = authService.register(name, email)
    if (result.success) {
      setAuthState(authService.getAuthState())
    }
    return result
  }

  const login = (email: string) => {
    const result = authService.login(email)
    if (result.success) {
      setAuthState(authService.getAuthState())
    }
    return result
  }

  const logout = () => {
    authService.logout()
    setAuthState(authService.getAuthState())
  }

  const updateUser = (updates: Partial<User>) => {
    const result = authService.updateUser(updates)
    if (result.success) {
      setAuthState(authService.getAuthState())
    }
    return result
  }

  return {
    ...authState,
    register,
    login,
    logout,
    updateUser,
    addXP: authService.addXP.bind(authService),
    addAchievement: authService.addAchievement.bind(authService),
    updateQuizStats: authService.updateQuizStats.bind(authService),
    getUserRanking: authService.getUserRanking.bind(authService)
  }
}

// Importar React para o hook
import * as React from 'react'

