export interface LibraryActivity {
  id: string
  title: string
  description: string
  subject: string
  difficulty: 'facil' | 'medio' | 'dificil'
  type: 'quiz' | 'simulador' | 'exercicio' | 'video' | 'leitura'
  duration: number // em minutos
  questions?: number
  tags: string[]
  image: string
  xpReward: number
  pointsReward: number
  isAvailable: boolean
  requirements?: {
    level?: number
    achievements?: string[]
  }
}

export const libraryActivities: LibraryActivity[] = [
  // MATEMÁTICA
  {
    id: "math-basics",
    title: "Fundamentos da Matemática",
    description: "Aprenda os conceitos básicos de matemática: operações, frações e porcentagens",
    subject: "Matemática",
    difficulty: "facil",
    type: "quiz",
    duration: 15,
    questions: 10,
    tags: ["básico", "operações", "frações"],
    image: "/placeholder.jpg",
    xpReward: 150,
    pointsReward: 75,
    isAvailable: true
  },
  {
    id: "algebra-basics",
    title: "Introdução à Álgebra",
    description: "Equações de primeiro grau, expressões algébricas e resolução de problemas",
    subject: "Matemática",
    difficulty: "medio",
    type: "quiz",
    duration: 25,
    questions: 15,
    tags: ["álgebra", "equações", "expressões"],
    image: "/placeholder.jpg",
    xpReward: 250,
    pointsReward: 125,
    isAvailable: true
  },
  {
    id: "geometry-fundamentals",
    title: "Geometria Fundamental",
    description: "Áreas, perímetros, volumes e propriedades das figuras geométricas",
    subject: "Matemática",
    difficulty: "medio",
    type: "quiz",
    duration: 30,
    questions: 20,
    tags: ["geometria", "áreas", "volumes"],
    image: "/placeholder.jpg",
    xpReward: 300,
    pointsReward: 150,
    isAvailable: true
  },
  {
    id: "trigonometry",
    title: "Trigonometria Avançada",
    description: "Funções trigonométricas, identidades e aplicações práticas",
    subject: "Matemática",
    difficulty: "dificil",
    type: "quiz",
    duration: 45,
    questions: 25,
    tags: ["trigonometria", "funções", "identidades"],
    image: "/placeholder.jpg",
    xpReward: 500,
    pointsReward: 250,
    isAvailable: true,
    requirements: {
      level: 5
    }
  },

  // PORTUGUÊS
  {
    id: "grammar-basics",
    title: "Gramática Básica",
    description: "Classes gramaticais, concordância e regras fundamentais da língua portuguesa",
    subject: "Português",
    difficulty: "facil",
    type: "quiz",
    duration: 20,
    questions: 12,
    tags: ["gramática", "classes", "concordância"],
    image: "/placeholder.jpg",
    xpReward: 180,
    pointsReward: 90,
    isAvailable: true
  },
  {
    id: "literature-analysis",
    title: "Análise Literária",
    description: "Escolas literárias, figuras de linguagem e interpretação de textos",
    subject: "Português",
    difficulty: "medio",
    type: "quiz",
    duration: 35,
    questions: 18,
    tags: ["literatura", "figuras", "interpretação"],
    image: "/placeholder.jpg",
    xpReward: 280,
    pointsReward: 140,
    isAvailable: true
  },
  {
    id: "writing-skills",
    title: "Técnicas de Redação",
    description: "Estrutura de textos, argumentação e produção de redações",
    subject: "Português",
    difficulty: "dificil",
    type: "exercicio",
    duration: 60,
    tags: ["redação", "argumentação", "estrutura"],
    image: "/placeholder.jpg",
    xpReward: 400,
    pointsReward: 200,
    isAvailable: true,
    requirements: {
      level: 3
    }
  },

  // HISTÓRIA
  {
    id: "brazil-history",
    title: "História do Brasil",
    description: "Períodos históricos, fatos importantes e personalidades brasileiras",
    subject: "História",
    difficulty: "facil",
    type: "quiz",
    duration: 25,
    questions: 15,
    tags: ["brasil", "períodos", "personalidades"],
    image: "/placeholder.jpg",
    xpReward: 200,
    pointsReward: 100,
    isAvailable: true
  },
  {
    id: "world-history",
    title: "História Mundial",
    description: "Grandes eventos históricos, guerras e revoluções mundiais",
    subject: "História",
    difficulty: "medio",
    type: "quiz",
    duration: 30,
    questions: 20,
    tags: ["mundial", "guerras", "revoluções"],
    image: "/placeholder.jpg",
    xpReward: 300,
    pointsReward: 150,
    isAvailable: true
  },
  {
    id: "ancient-civilizations",
    title: "Civilizações Antigas",
    description: "Egito, Grécia, Roma e outras civilizações da antiguidade",
    subject: "História",
    difficulty: "dificil",
    type: "quiz",
    duration: 40,
    questions: 25,
    tags: ["antiguidade", "civilizações", "arqueologia"],
    image: "/placeholder.jpg",
    xpReward: 450,
    pointsReward: 225,
    isAvailable: true,
    requirements: {
      level: 4
    }
  },

  // GEOGRAFIA
  {
    id: "brazil-geography",
    title: "Geografia do Brasil",
    description: "Regiões, estados, clima e características físicas do território brasileiro",
    subject: "Geografia",
    difficulty: "facil",
    type: "quiz",
    duration: 20,
    questions: 12,
    tags: ["brasil", "regiões", "clima"],
    image: "/placeholder.jpg",
    xpReward: 180,
    pointsReward: 90,
    isAvailable: true
  },
  {
    id: "world-geography",
    title: "Geografia Mundial",
    description: "Continentes, países, relevo e fenômenos naturais globais",
    subject: "Geografia",
    difficulty: "medio",
    type: "quiz",
    duration: 30,
    questions: 18,
    tags: ["mundial", "continentes", "relevo"],
    image: "/placeholder.jpg",
    xpReward: 280,
    pointsReward: 140,
    isAvailable: true
  },
  {
    id: "economic-geography",
    title: "Geografia Econômica",
    description: "Globalização, blocos econômicos e relações comerciais internacionais",
    subject: "Geografia",
    difficulty: "dificil",
    type: "quiz",
    duration: 35,
    questions: 22,
    tags: ["econômica", "globalização", "blocos"],
    image: "/placeholder.jpg",
    xpReward: 350,
    pointsReward: 175,
    isAvailable: true,
    requirements: {
      level: 3
    }
  },

  // BIOLOGIA
  {
    id: "cell-biology",
    title: "Biologia Celular",
    description: "Estrutura celular, organelas e processos celulares fundamentais",
    subject: "Biologia",
    difficulty: "facil",
    type: "quiz",
    duration: 25,
    questions: 15,
    tags: ["célula", "organelas", "processos"],
    image: "/placeholder.jpg",
    xpReward: 200,
    pointsReward: 100,
    isAvailable: true
  },
  {
    id: "human-anatomy",
    title: "Anatomia Humana",
    description: "Sistemas do corpo humano, órgãos e suas funções",
    subject: "Biologia",
    difficulty: "medio",
    type: "quiz",
    duration: 30,
    questions: 20,
    tags: ["anatomia", "sistemas", "órgãos"],
    image: "/placeholder.jpg",
    xpReward: 300,
    pointsReward: 150,
    isAvailable: true
  },
  {
    id: "genetics",
    title: "Genética e Evolução",
    description: "Herança genética, DNA, mutações e teoria da evolução",
    subject: "Biologia",
    difficulty: "dificil",
    type: "quiz",
    duration: 40,
    questions: 25,
    tags: ["genética", "DNA", "evolução"],
    image: "/placeholder.jpg",
    xpReward: 450,
    pointsReward: 225,
    isAvailable: true,
    requirements: {
      level: 5
    }
  },

  // FÍSICA
  {
    id: "mechanics",
    title: "Mecânica Básica",
    description: "Movimento, forças, energia e leis de Newton",
    subject: "Física",
    difficulty: "facil",
    type: "quiz",
    duration: 25,
    questions: 15,
    tags: ["mecânica", "movimento", "forças"],
    image: "/placeholder.jpg",
    xpReward: 200,
    pointsReward: 100,
    isAvailable: true
  },
  {
    id: "thermodynamics",
    title: "Termodinâmica",
    description: "Calor, temperatura, energia térmica e leis da termodinâmica",
    subject: "Física",
    difficulty: "medio",
    type: "quiz",
    duration: 30,
    questions: 20,
    tags: ["termodinâmica", "calor", "energia"],
    image: "/placeholder.jpg",
    xpReward: 300,
    pointsReward: 150,
    isAvailable: true
  },
  {
    id: "quantum-physics",
    title: "Física Quântica",
    description: "Princípios da mecânica quântica e física moderna",
    subject: "Física",
    difficulty: "dificil",
    type: "quiz",
    duration: 45,
    questions: 25,
    tags: ["quântica", "moderna", "princípios"],
    image: "/placeholder.jpg",
    xpReward: 500,
    pointsReward: 250,
    isAvailable: true,
    requirements: {
      level: 7
    }
  },

  // QUÍMICA
  {
    id: "atomic-structure",
    title: "Estrutura Atômica",
    description: "Átomos, elementos químicos e tabela periódica",
    subject: "Química",
    difficulty: "facil",
    type: "quiz",
    duration: 20,
    questions: 12,
    tags: ["átomo", "elementos", "tabela"],
    image: "/placeholder.jpg",
    xpReward: 180,
    pointsReward: 90,
    isAvailable: true
  },
  {
    id: "chemical-reactions",
    title: "Reações Químicas",
    description: "Tipos de reações, balanceamento e estequiometria",
    subject: "Química",
    difficulty: "medio",
    type: "quiz",
    duration: 30,
    questions: 18,
    tags: ["reações", "balanceamento", "estequiometria"],
    image: "/placeholder.jpg",
    xpReward: 280,
    pointsReward: 140,
    isAvailable: true
  },
  {
    id: "organic-chemistry",
    title: "Química Orgânica",
    description: "Compostos orgânicos, funções e reações orgânicas",
    subject: "Química",
    difficulty: "dificil",
    type: "quiz",
    duration: 40,
    questions: 25,
    tags: ["orgânica", "compostos", "funções"],
    image: "/placeholder.jpg",
    xpReward: 450,
    pointsReward: 225,
    isAvailable: true,
    requirements: {
      level: 6
    }
  },

  // ATIVIDADES ESPECIAIS
  {
    id: "enem-simulation",
    title: "Simulado ENEM",
    description: "Simulado completo com questões de todas as áreas do conhecimento",
    subject: "ENEM",
    difficulty: "dificil",
    type: "simulador",
    duration: 180,
    questions: 45,
    tags: ["simulado", "enem", "completo"],
    image: "/placeholder.jpg",
    xpReward: 1000,
    pointsReward: 500,
    isAvailable: true,
    requirements: {
      level: 5
    }
  },
  {
    id: "speed-challenge",
    title: "Desafio de Velocidade",
    description: "Responda o máximo de questões em 5 minutos",
    subject: "Geral",
    difficulty: "medio",
    type: "quiz",
    duration: 5,
    tags: ["velocidade", "desafio", "tempo"],
    image: "/placeholder.jpg",
    xpReward: 300,
    pointsReward: 150,
    isAvailable: true,
    requirements: {
      level: 2
    }
  },
  {
    id: "daily-challenge",
    title: "Desafio Diário",
    description: "Novas questões todos os dias para manter a consistência",
    subject: "Geral",
    difficulty: "medio",
    type: "quiz",
    duration: 15,
    questions: 10,
    tags: ["diário", "consistência", "variado"],
    image: "/placeholder.jpg",
    xpReward: 200,
    pointsReward: 100,
    isAvailable: true
  }
]

export const subjects = [
  { id: "all", name: "Todas as Matérias", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { id: "Matemática", name: "Matemática", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
  { id: "Português", name: "Português", color: "bg-gradient-to-r from-green-500 to-emerald-500" },
  { id: "História", name: "História", color: "bg-gradient-to-r from-orange-500 to-red-500" },
  { id: "Geografia", name: "Geografia", color: "bg-gradient-to-r from-yellow-500 to-orange-500" },
  { id: "Biologia", name: "Biologia", color: "bg-gradient-to-r from-green-600 to-teal-500" },
  { id: "Física", name: "Física", color: "bg-gradient-to-r from-indigo-500 to-purple-500" },
  { id: "Química", name: "Química", color: "bg-gradient-to-r from-pink-500 to-rose-500" },
  { id: "ENEM", name: "ENEM", color: "bg-gradient-to-r from-red-600 to-pink-600" },
  { id: "Geral", name: "Geral", color: "bg-gradient-to-r from-gray-500 to-slate-500" }
]

export const difficulties = [
  { id: "all", name: "Todas", color: "text-gray-400" },
  { id: "facil", name: "Fácil", color: "text-green-400" },
  { id: "medio", name: "Médio", color: "text-yellow-400" },
  { id: "dificil", name: "Difícil", color: "text-red-400" }
]

export const activityTypes = [
  { id: "all", name: "Todos", icon: "📚" },
  { id: "quiz", name: "Quiz", icon: "❓" },
  { id: "simulador", name: "Simulador", icon: "🎯" },
  { id: "exercicio", name: "Exercício", icon: "✏️" },
  { id: "video", name: "Vídeo", icon: "🎥" },
  { id: "leitura", name: "Leitura", icon: "📖" }
]

export function getActivitiesBySubject(subject: string) {
  if (subject === "all") return libraryActivities
  return libraryActivities.filter(activity => activity.subject === subject)
}

export function getActivitiesByDifficulty(difficulty: string) {
  if (difficulty === "all") return libraryActivities
  return libraryActivities.filter(activity => activity.difficulty === difficulty)
}

export function getActivitiesByType(type: string) {
  if (type === "all") return libraryActivities
  return libraryActivities.filter(activity => activity.type === type)
}

export function getAvailableActivities(userLevel: number, userAchievements: string[]) {
  return libraryActivities.filter(activity => {
    if (!activity.isAvailable) return false
    
    if (activity.requirements) {
      if (activity.requirements.level && userLevel < activity.requirements.level) {
        return false
      }
      
      if (activity.requirements.achievements) {
        const hasRequiredAchievements = activity.requirements.achievements.every(
          achievement => userAchievements.includes(achievement)
        )
        if (!hasRequiredAchievements) return false
      }
    }
    
    return true
  })
}
