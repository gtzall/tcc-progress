"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  User, 
  Trophy, 
  Star, 
  Target, 
  TrendingUp, 
  Calendar,
  Award,
  BookOpen,
  BarChart3,
  Settings,
  Edit,
  Camera,
  Crown,
  Zap,
  Brain,
  Heart,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  Medal,
  Badge,
  Flame,
  Shield,
  Sword,
  Gem,
  Diamond
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/theme-context"
import { useAchievements } from "@/contexts/achievements-context"
import { SmartNavigation } from "@/components/smart-navigation"
import EnhancedThemeAnimations from "@/components/enhanced-theme-animations"
import { AnimatePresence } from "framer-motion"
import { getAllTopics, getQuestionsBySubject, getQuestionsByTopic } from "@/lib/subject-questions"

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  unlocked: boolean
  progress: number
  maxProgress: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlockedAt?: string
}

interface Stat {
  label: string
  value: string | number
  icon: React.ReactNode
  change?: string
  color: string
}

const achievements: Achievement[] = [
  {
    id: "first-quiz",
    name: "Primeiro Passo",
    description: "Complete seu primeiro quiz",
    icon: <Target className="h-6 w-6" />,
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    rarity: 'common',
    unlockedAt: "2024-01-15"
  },
  {
    id: "perfect-score",
    name: "Perfeição",
    description: "Acerte 100% em um quiz",
    icon: <Star className="h-6 w-6" />,
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    rarity: 'rare',
    unlockedAt: "2024-01-20"
  },
  {
    id: "streak-7",
    name: "Semana de Foco",
    description: "Complete quizzes por 7 dias seguidos",
    icon: <Flame className="h-6 w-6" />,
    unlocked: false,
    progress: 5,
    maxProgress: 7,
    rarity: 'epic'
  },
  {
    id: "master-subject",
    name: "Mestre da Matemática",
    description: "Complete 50 quizzes de matemática",
    icon: <Brain className="h-6 w-6" />,
    unlocked: false,
    progress: 32,
    maxProgress: 50,
    rarity: 'legendary'
  },
  {
    id: "speed-demon",
    name: "Velocidade da Luz",
    description: "Complete um quiz em menos de 2 minutos",
    icon: <Zap className="h-6 w-6" />,
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    rarity: 'rare',
    unlockedAt: "2024-01-25"
  },
  {
    id: "helpful",
    name: "Ajudante",
    description: "Ajude 10 outros usuários",
    icon: <Heart className="h-6 w-6" />,
    unlocked: false,
    progress: 7,
    maxProgress: 10,
    rarity: 'epic'
  }
]

const stats: Stat[] = [
  {
    label: "Quizzes Completados",
    value: "156",
    icon: <CheckCircle className="h-5 w-5" />,
    change: "+12%",
    color: "text-green-400"
  },
  {
    label: "Pontuação Total",
    value: "45,678",
    icon: <Star className="h-5 w-5" />,
    change: "+8%",
    color: "text-yellow-400"
  },
  {
    label: "Precisão Média",
    value: "87%",
    icon: <Target className="h-5 w-5" />,
    change: "+3%",
    color: "text-blue-400"
  },
  {
    label: "Tempo Total",
    value: "23h 45m",
    icon: <Clock className="h-5 w-5" />,
    change: "+15%",
    color: "text-purple-400"
  },
  {
    label: "Conquistas",
    value: "23/50",
    icon: <Trophy className="h-5 w-5" />,
    change: "+2",
    color: "text-orange-400"
  },
  {
    label: "Ranking",
    value: "#15",
    icon: <TrendingUp className="h-5 w-5" />,
    change: "+3",
    color: "text-cyan-400"
  }
]

const recentActivity = [
  { id: 1, action: "Completou quiz de Matemática", score: "95%", time: "2 horas atrás" },
  { id: 2, action: "Desbloqueou conquista 'Velocidade da Luz'", score: "", time: "1 dia atrás" },
  { id: 3, action: "Completou quiz de História", score: "88%", time: "2 dias atrás" },
  { id: 4, action: "Subiu no ranking", score: "#15", time: "3 dias atrás" },
  { id: 5, action: "Completou quiz de Ciências", score: "92%", time: "4 dias atrás" }
]

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'common': return 'border-gray-400 bg-gray-400/10'
    case 'rare': return 'border-blue-400 bg-blue-400/10'
    case 'epic': return 'border-purple-400 bg-purple-400/10'
    case 'legendary': return 'border-orange-400 bg-orange-400/10'
    default: return 'border-gray-400 bg-gray-400/10'
  }
}

const getRarityText = (rarity: string) => {
  switch (rarity) {
    case 'common': return 'Comum'
    case 'rare': return 'Raro'
    case 'epic': return 'Épico'
    case 'legendary': return 'Lendário'
    default: return 'Comum'
  }
}

export default function ProfilePage() {
  const { currentTheme } = useTheme()
  const { gameStats } = useAchievements()
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'activity' | 'themes'>('overview')
  const [isEditing, setIsEditing] = useState(false)

  const unlockedAchievements = achievements.filter(a => a.unlocked)
  const lockedAchievements = achievements.filter(a => !a.unlocked)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative">
      <EnhancedThemeAnimations theme={currentTheme} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div 
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                <User className="h-12 w-12" />
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 bg-cyan-500 rounded-full hover:bg-cyan-600 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-3xl font-bold text-white">João Silva</h1>
                <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-semibold">
                  <Crown className="h-3 w-3" />
                  Nível 15
                </div>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>
              
              <p className="text-gray-300 mb-4">Estudante dedicado apaixonado por aprender e superar desafios</p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="h-4 w-4" />
                  Membro desde Janeiro 2024
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Trophy className="h-4 w-4" />
                  {unlockedAchievements.length} conquistas
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Target className="h-4 w-4" />
                  {stats[0].value} quizzes completados
                </div>
              </div>
            </div>

            {/* Level Progress */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-2">
                <span className="text-xl font-bold">15</span>
              </div>
              <div className="w-32 bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">75% para o nível 16</p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { id: 'overview', label: 'Visão Geral', icon: <BarChart3 className="h-4 w-4" /> },
            { id: 'achievements', label: 'Conquistas', icon: <Trophy className="h-4 w-4" /> },
            { id: 'activity', label: 'Atividade', icon: <Clock className="h-4 w-4" /> },
            { id: 'themes', label: 'Temas', icon: <BookOpen className="h-4 w-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 rounded-lg ${stat.color.replace('text-', 'bg-')} bg-opacity-20`}>
                        {stat.icon}
                      </div>
                      {stat.change && (
                        <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {stat.change}
                        </span>
                      )}
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Achievements */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-400" />
                  Conquistas Recentes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {unlockedAchievements.slice(0, 3).map((achievement) => (
                    <div key={achievement.id} className={`p-4 rounded-lg border ${getRarityColor(achievement.rarity)}`}>
                      <div className="flex items-center gap-3">
                        <div className="text-cyan-400">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="font-semibold text-white">{achievement.name}</div>
                          <div className="text-sm text-gray-400">{achievement.description}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            Desbloqueado em {achievement.unlockedAt}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Achievement Progress */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Progresso das Conquistas</h3>
                  <div className="text-sm text-gray-400">
                    {unlockedAchievements.length} de {achievements.length} desbloqueadas
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(unlockedAchievements.length / achievements.length) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-400">
                  {Math.round((unlockedAchievements.length / achievements.length) * 100)}% completo
                </div>
              </div>

              {/* Unlocked Achievements */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  Conquistas Desbloqueadas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {unlockedAchievements.map((achievement) => (
                    <motion.div
                      key={achievement.id}
                      className={`p-6 rounded-xl border ${getRarityColor(achievement.rarity)} hover:scale-105 transition-all duration-300`}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-cyan-400">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="font-semibold text-white">{achievement.name}</div>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              achievement.rarity === 'legendary' ? 'bg-orange-500/20 text-orange-400' :
                              achievement.rarity === 'epic' ? 'bg-purple-500/20 text-purple-400' :
                              achievement.rarity === 'rare' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {getRarityText(achievement.rarity)}
                            </span>
                          </div>
                          <div className="text-sm text-gray-400 mb-3">{achievement.description}</div>
                          <div className="text-xs text-gray-500">
                            Desbloqueado em {achievement.unlockedAt}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Locked Achievements */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-gray-400" />
                  Conquistas Bloqueadas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lockedAchievements.map((achievement) => (
                    <motion.div
                      key={achievement.id}
                      className="p-6 rounded-xl border border-gray-600 bg-gray-800/50 opacity-60"
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-gray-500">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="font-semibold text-gray-400">{achievement.name}</div>
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-600/50 text-gray-400">
                              {getRarityText(achievement.rarity)}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500 mb-3">{achievement.description}</div>
                          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                            <div 
                              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {achievement.progress} / {achievement.maxProgress}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'activity' && (
            <motion.div
              key="activity"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-cyan-400" />
                  Atividade Recente
                </h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <div>
                          <div className="text-white">{activity.action}</div>
                          <div className="text-sm text-gray-400">{activity.time}</div>
                        </div>
                      </div>
                      {activity.score && (
                        <div className="text-sm font-semibold text-cyan-400">
                          {activity.score}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'themes' && (
            <motion.div
              key="themes"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Progress by Subject */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-400" />
                  Progresso por Matéria
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(getAllTopics()).map(([subject, topics]) => {
                    const totalQuestions = getQuestionsBySubject(subject).length
                    const completedQuestions = Math.floor(Math.random() * totalQuestions) // Simulated data
                    const progress = (completedQuestions / totalQuestions) * 100
                    
                    return (
                      <motion.div
                        key={subject}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                        whileHover={{ y: -5 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-white">{subject}</h4>
                          <div className="text-sm text-gray-400">
                            {completedQuestions}/{totalQuestions}
                          </div>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <div className="text-sm text-gray-400 mb-4">
                          {Math.round(progress)}% completo
                        </div>
                        <div className="space-y-2">
                          <div className="text-xs text-gray-500 font-medium">Tópicos:</div>
                          <div className="flex flex-wrap gap-1">
                            {topics.slice(0, 3).map((topic) => (
                              <span
                                key={topic}
                                className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full"
                              >
                                {topic}
                              </span>
                            ))}
                            {topics.length > 3 && (
                              <span className="px-2 py-1 text-xs bg-gray-500/20 text-gray-400 rounded-full">
                                +{topics.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Topic Mastery */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-400" />
                  Domínio de Tópicos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(getAllTopics()).slice(0, 4).map(([subject, topics]) => (
                    <div key={subject} className="space-y-4">
                      <h4 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                        {subject}
                      </h4>
                      <div className="space-y-3">
                        {topics.map((topic) => {
                          const questions = getQuestionsByTopic(subject, topic)
                          const mastered = Math.floor(Math.random() * questions.length) // Simulated data
                          const mastery = (mastered / questions.length) * 100
                          
                          return (
                            <div key={topic} className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="text-sm text-white">{topic}</div>
                                <div className="text-xs text-gray-400">
                                  {mastered} de {questions.length} questões
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-gray-700 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full transition-all duration-500 ${
                                      mastery >= 80 ? 'bg-green-500' : 
                                      mastery >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${mastery}%` }}
                                  ></div>
                                </div>
                                <span className={`text-xs font-medium ${
                                  mastery >= 80 ? 'text-green-400' : 
                                  mastery >= 50 ? 'text-yellow-400' : 'text-red-400'
                                }`}>
                                  {Math.round(mastery)}%
                                </span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
