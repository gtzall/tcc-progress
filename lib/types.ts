import { ThemeType, AchievementCategory, AchievementRarity } from './config'

// Tipos básicos
export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

// Tipos de usuário
export interface User extends BaseEntity {
  username: string
  email: string
  avatar?: string
  isVerified: boolean
  preferences: UserPreferences
}

export interface UserPreferences {
  theme: ThemeType
  notifications: NotificationSettings
  privacy: PrivacySettings
  accessibility: AccessibilitySettings
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  achievements: boolean
  reminders: boolean
  social: boolean
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private'
  showStats: boolean
  showAchievements: boolean
  allowFriendRequests: boolean
}

export interface AccessibilitySettings {
  highContrast: boolean
  reducedMotion: boolean
  fontSize: 'small' | 'medium' | 'large'
  soundEffects: boolean
}

// Tipos de jogo
export interface Quiz extends BaseEntity {
  title: string
  description: string
  subject: string
  difficulty: 'easy' | 'medium' | 'hard' | 'expert'
  timeLimit: number
  questions: Question[]
  tags: string[]
  author: string
  isPublic: boolean
  rating: number
  totalAttempts: number
  averageScore: number
}

export interface Question extends BaseEntity {
  text: string
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'matching'
  options: string[]
  correctAnswer: number | number[]
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
  tags: string[]
  imageUrl?: string
}

export interface QuizAttempt extends BaseEntity {
  quizId: string
  userId: string
  answers: Answer[]
  score: number
  timeSpent: number
  completed: boolean
  accuracy: number
  rank?: number
}

export interface Answer {
  questionId: string
  selectedAnswer: number | number[]
  isCorrect: boolean
  timeSpent: number
  points: number
}

// Tipos de conquistas
export interface Achievement extends BaseEntity {
  name: string
  description: string
  icon: string
  category: AchievementCategory
  rarity: AchievementRarity
  xpReward: number
  pointsReward: number
  progress: number
  maxProgress: number
  unlocked: boolean
  unlockedAt?: string
  condition: (stats: GameStats) => boolean
  progressFunction: (stats: GameStats) => number
}

// Tipos de estatísticas
export interface GameStats extends BaseEntity {
  userId: string
  totalQuizzes: number
  totalCorrectAnswers: number
  totalWrongAnswers: number
  totalScore: number
  currentLevel: number
  totalXP: number
  streakDays: number
  perfectScores: number
  demoQuizzes: number
  demoPerfectScores: number
  fastestQuizTime: number
  subjectsMastered: string[]
  lastQuizDate?: string
  achievements: string[]
  hasSeenTutorial: boolean
  weeklyStats: WeeklyStats
  monthlyStats: MonthlyStats
  yearlyStats: YearlyStats
}

export interface WeeklyStats {
  week: string
  quizzesCompleted: number
  averageScore: number
  totalXP: number
  streakDays: number
}

export interface MonthlyStats {
  month: string
  quizzesCompleted: number
  averageScore: number
  totalXP: number
  achievementsUnlocked: number
}

export interface YearlyStats {
  year: number
  quizzesCompleted: number
  averageScore: number
  totalXP: number
  achievementsUnlocked: number
  levelProgress: number
}

// Tipos de progresso
export interface LevelProgress {
  currentLevel: number
  currentXP: number
  xpToNextLevel: number
  progressPercentage: number
  rewards: LevelReward[]
}

export interface LevelReward {
  level: number
  type: 'achievement' | 'badge' | 'title' | 'feature'
  name: string
  description: string
  unlocked: boolean
}

// Tipos de social
export interface Friend extends BaseEntity {
  userId: string
  friendId: string
  status: 'pending' | 'accepted' | 'blocked'
  mutualFriends: number
  lastInteraction?: string
}

export interface LeaderboardEntry extends BaseEntity {
  userId: string
  username: string
  avatar?: string
  score: number
  rank: number
  level: number
  achievements: number
}

// Tipos de notificações
export interface Notification extends BaseEntity {
  userId: string
  type: 'achievement' | 'friend' | 'quiz' | 'system' | 'reminder'
  title: string
  message: string
  data?: Record<string, any>
  read: boolean
  actionUrl?: string
  expiresAt?: string
}

// Tipos de configuração
export interface AppSettings {
  theme: ThemeType
  language: string
  timezone: string
  dateFormat: string
  currency: string
}

// Tipos de resposta da API
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  timestamp: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Tipos de eventos
export interface GameEvent extends BaseEntity {
  type: 'quiz_started' | 'quiz_completed' | 'achievement_unlocked' | 'level_up' | 'friend_added'
  userId: string
  data: Record<string, any>
  metadata?: Record<string, any>
}

// Tipos de análise
export interface AnalyticsData {
  userId: string
  period: 'day' | 'week' | 'month' | 'year'
  metrics: {
    quizzesCompleted: number
    averageScore: number
    totalXP: number
    timeSpent: number
    subjects: Record<string, SubjectStats>
  }
  trends: {
    scoreTrend: number[]
    xpTrend: number[]
    activityTrend: number[]
  }
}

export interface SubjectStats {
  name: string
  quizzesCompleted: number
  averageScore: number
  totalXP: number
  timeSpent: number
  strength: 'weak' | 'average' | 'strong'
}

// Tipos de gamificação
export interface Badge extends BaseEntity {
  name: string
  description: string
  icon: string
  rarity: AchievementRarity
  category: AchievementCategory
  unlocked: boolean
  unlockedAt?: string
  progress: number
  maxProgress: number
}

export interface Title extends BaseEntity {
  name: string
  description: string
  rarity: AchievementRarity
  unlocked: boolean
  unlockedAt?: string
  requirements: string[]
}

// Tipos de estudo
export interface StudyMaterial extends BaseEntity {
  title: string
  description: string
  type: 'article' | 'video' | 'pdf' | 'interactive' | 'quiz'
  subject: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: number
  tags: string[]
  author: string
  rating: number
  views: number
  isPremium: boolean
  url: string
}

export interface StudyPlan extends BaseEntity {
  userId: string
  name: string
  description: string
  subjects: string[]
  goals: StudyGoal[]
  schedule: StudySchedule[]
  progress: number
  isActive: boolean
}

export interface StudyGoal {
  id: string
  description: string
  targetScore: number
  targetDate: string
  completed: boolean
  progress: number
}

export interface StudySchedule {
  day: string
  timeSlots: TimeSlot[]
  subjects: string[]
}

export interface TimeSlot {
  startTime: string
  endTime: string
  duration: number
  activity: string
}

// Tipos de feedback
export interface Feedback extends BaseEntity {
  userId: string
  type: 'bug' | 'feature' | 'improvement' | 'general'
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  category: string
  attachments?: string[]
  assignedTo?: string
  resolvedAt?: string
  resolution?: string
}

// Tipos de sistema
export interface SystemInfo {
  version: string
  environment: 'development' | 'staging' | 'production'
  lastUpdate: string
  maintenanceMode: boolean
  features: Record<string, boolean>
}

// Tipos de validação
export interface ValidationError {
  field: string
  message: string
  code: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

// Tipos de análise de desempenho
export interface UserPerformanceData {
  questionId: string;
  topic: string; // Tópico ou matéria da questão (ex: 'Matemática - Geometria')
  isCorrect: boolean;
  timeSpent: number; // Tempo gasto na resposta (em segundos)
  timestamp: Date;
}

// Tipos de cache
export interface CacheEntry<T> {
  key: string
  data: T
  expiresAt: number
  createdAt: number
}

// Tipos de erro
export interface AppError extends Error {
  code: string
  statusCode: number
  details?: Record<string, any>
  timestamp: string
  requestId?: string
}

// Tipos de contexto
export interface AppContext {
  user: User | null
  theme: ThemeType
  settings: AppSettings
  isAuthenticated: boolean
  isLoading: boolean
  error: AppError | null
}

// Tipos de hook
export interface UseQueryResult<T> {
  data: T | undefined
  isLoading: boolean
  error: AppError | null
  refetch: () => void
}

export interface UseMutationResult<T, V> {
  data: T | undefined
  isLoading: boolean
  error: AppError | null
  mutate: (variables: V) => void
  reset: () => void
}
