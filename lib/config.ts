// Configurações centralizadas do QuizMaster
export const APP_CONFIG = {
  name: "QuizMaster",
  version: "1.0.0",
  description: "Plataforma de Quiz Educacional Interativa",
  author: "QuizMaster Team",
  contact: "contato@quizmaster.com",
  
  // URLs e rotas
  routes: {
    home: "/",
    game: "/game",
    profile: "/profile",
    achievements: "/achievements",
    library: "/library",
    stats: "/stats",
    login: "/login",
    register: "/register",
    dashboard: "/dashboard"
  },
  
  // Configurações de tema
  themes: {
    default: "cyberpunk",
    available: ["cyberpunk", "space", "ocean", "forest", "desert", "volcano", "aurora"] as const
  },
  
  // Configurações de jogo
  game: {
    defaultQuizTime: 300, // 5 minutos
    pointsPerCorrectAnswer: 100,
    bonusPoints: {
      speed: 50,
      streak: 25,
      perfect: 200
    },
    levels: {
      xpPerLevel: 1000,
      maxLevel: 100
    }
  },
  
  // Configurações de conquistas
  achievements: {
    categories: ["quiz", "streak", "social", "mastery", "speed", "help", "demo"] as const,
    rarities: ["common", "rare", "epic", "legendary"] as const
  },
  
  // Configurações de UI
  ui: {
    animations: {
      duration: {
        fast: 200,
        normal: 300,
        slow: 500
      },
      easing: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
      }
    },
    breakpoints: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536
    }
  },
  
  // Configurações de localStorage
  storage: {
    keys: {
      theme: "quiz-theme",
      stats: "quizGameStats",
      achievements: "quizAchievements",
      user: "quizUser",
      settings: "quizSettings"
    }
  },
  
  // Configurações de API
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    timeout: 10000,
    retries: 3
  }
} as const

// Tipos derivados da configuração
export type ThemeType = typeof APP_CONFIG.themes.available[number]
export type AchievementCategory = typeof APP_CONFIG.achievements.categories[number]
export type AchievementRarity = typeof APP_CONFIG.achievements.rarities[number]

// Configurações de cores por tema
export const THEME_COLORS = {
  cyberpunk: {
    background: "bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900",
    primary: "text-cyan-400",
    secondary: "text-pink-400",
    accent: "text-yellow-400",
    text: "text-white"
  },
  space: {
    background: "bg-gradient-to-br from-black via-blue-900 to-purple-900",
    primary: "text-blue-400",
    secondary: "text-purple-400",
    accent: "text-cyan-400",
    text: "text-white"
  },
  ocean: {
    background: "bg-gradient-to-br from-blue-900 via-cyan-800 to-teal-700",
    primary: "text-cyan-400",
    secondary: "text-blue-400",
    accent: "text-teal-400",
    text: "text-white"
  },
  forest: {
    background: "bg-gradient-to-br from-green-900 via-emerald-800 to-teal-700",
    primary: "text-green-400",
    secondary: "text-emerald-400",
    accent: "text-teal-400",
    text: "text-white"
  },
  desert: {
    background: "bg-gradient-to-br from-yellow-900 via-orange-800 to-red-700",
    primary: "text-yellow-400",
    secondary: "text-orange-400",
    accent: "text-red-400",
    text: "text-white"
  },
  volcano: {
    background: "bg-gradient-to-br from-red-900 via-orange-800 to-yellow-700",
    primary: "text-red-400",
    secondary: "text-orange-400",
    accent: "text-yellow-400",
    text: "text-white"
  },
  aurora: {
    background: "bg-gradient-to-br from-green-900 via-blue-800 to-purple-700",
    primary: "text-green-400",
    secondary: "text-blue-400",
    accent: "text-purple-400",
    text: "text-white"
  }
} as const

// Configurações de navegação
export const NAVIGATION_ITEMS = [
  {
    label: "Início",
    href: "/",
    icon: "Home",
    description: "Página principal do QuizMaster",
    badge: undefined
  },
  {
    label: "Jogar",
    href: "/game",
    icon: "Gamepad2",
    description: "Iniciar um novo quiz",
    badge: "Novo"
  },
  {
    label: "Perfil",
    href: "/profile",
    icon: "User",
    description: "Seu perfil e estatísticas",
    badge: undefined
  },
  {
    label: "Conquistas",
    href: "/achievements",
    icon: "Trophy",
    description: "Suas conquistas e badges",
    badge: undefined
  },
  {
    label: "Biblioteca",
    href: "/library",
    icon: "BookOpen",
    description: "Materiais de estudo",
    badge: undefined
  },
  {
    label: "Estatísticas",
    href: "/stats",
    icon: "BarChart3",
    description: "Análise detalhada do progresso",
    badge: undefined
  }
] as const

// Configurações de recursos
export const FEATURES = [
  {
    icon: "Brain",
    title: "Aprendizado Inteligente",
    description: "Sistema adaptativo que se ajusta ao seu nível de conhecimento"
  },
  {
    icon: "Trophy",
    title: "Sistema de Conquistas",
    description: "Desbloqueie badges e conquistas conforme progride"
  },
  {
    icon: "BarChart3",
    title: "Estatísticas Detalhadas",
    description: "Acompanhe seu progresso com gráficos e análises"
  },
  {
    icon: "Users",
    title: "Competição Social",
    description: "Compare seu desempenho com amigos e outros jogadores"
  },
  {
    icon: "Clock",
    title: "Modo Cronometrado",
    description: "Teste seus conhecimentos contra o tempo"
  },
  {
    icon: "Lightbulb",
    title: "Dicas Inteligentes",
    description: "Receba dicas personalizadas baseadas em seus erros"
  }
] as const
