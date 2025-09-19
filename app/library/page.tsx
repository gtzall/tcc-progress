"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  BookOpen, 
  Search, 
  Filter, 
  Clock, 
  Star, 
  Target, 
  TrendingUp,
  Play,
  Award,
  Lock,
  CheckCircle,
  Zap,
  Flame,
  Crown,
  Medal,
  Brain,
  Heart,
  Shield,
  Users,
  Calendar,
  BarChart3,
  Trophy
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/theme-context"
import { useAchievements } from "@/contexts/achievements-context"
import { SmartNavigation } from "@/components/smart-navigation"
import EnhancedThemeAnimations from "@/components/enhanced-theme-animations"
import { 
  libraryActivities, 
  subjects, 
  difficulties, 
  activityTypes,
  getActivitiesBySubject,
  getActivitiesByDifficulty,
  getActivitiesByType,
  getAvailableActivities,
  type LibraryActivity
} from "@/lib/library-activities"
import { useRouter } from "next/navigation"

export default function LibraryPage() {
  const { currentTheme } = useTheme()
  const { gameStats } = useAchievements()
  const router = useRouter()
  
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<'name' | 'difficulty' | 'duration' | 'xp'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [selectedActivity, setSelectedActivity] = useState<LibraryActivity | null>(null)

  // Get available activities based on user level and achievements
  const availableActivities = getAvailableActivities(gameStats.currentLevel, gameStats.achievements)

  // Filter activities
  const filteredActivities = availableActivities.filter(activity => {
    const matchesSubject = selectedSubject === "all" || activity.subject === selectedSubject
    const matchesDifficulty = selectedDifficulty === "all" || activity.difficulty === selectedDifficulty
    const matchesType = selectedType === "all" || activity.type === selectedType
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesSubject && matchesDifficulty && matchesType && matchesSearch
  })

  // Sort activities
  const sortedActivities = [...filteredActivities].sort((a, b) => {
    let comparison = 0
    
    switch (sortBy) {
      case 'name':
        comparison = a.title.localeCompare(b.title)
        break
      case 'difficulty':
        const difficultyOrder = { facil: 1, medio: 2, dificil: 3 }
        comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        break
      case 'duration':
        comparison = a.duration - b.duration
        break
      case 'xp':
        comparison = a.xpReward - b.xpReward
        break
    }
    
    return sortOrder === 'asc' ? comparison : -comparison
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facil': return 'text-green-400 bg-green-400/10'
      case 'medio': return 'text-yellow-400 bg-yellow-400/10'
      case 'dificil': return 'text-red-400 bg-red-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quiz': return <Target className="h-4 w-4" />
      case 'simulador': return <Trophy className="h-4 w-4" />
      case 'exercicio': return <Brain className="h-4 w-4" />
      case 'video': return <Play className="h-4 w-4" />
      case 'leitura': return <BookOpen className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  const handleStartActivity = (activity: LibraryActivity) => {
    // For now, redirect to game page with activity info
    // In a real implementation, you would start the specific activity
    router.push(`/game?activity=${activity.id}`)
  }

  const canAccessActivity = (activity: LibraryActivity) => {
    if (!activity.requirements) return true
    
    if (activity.requirements.level && gameStats.currentLevel < activity.requirements.level) {
      return false
    }
    
    if (activity.requirements.achievements) {
      return activity.requirements.achievements.every(
        achievement => gameStats.achievements.includes(achievement)
      )
    }
    
    return true
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative">
      <EnhancedThemeAnimations theme={currentTheme} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <BookOpen className="h-10 w-10 text-blue-400" />
            Biblioteca de Atividades
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore nossa vasta coleção de atividades educacionais organizadas por matéria e dificuldade
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">{availableActivities.length}</div>
            <div className="text-sm text-gray-400">Atividades Disponíveis</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">{gameStats.currentLevel}</div>
            <div className="text-sm text-gray-400">Seu Nível</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">{gameStats.totalQuizzes}</div>
            <div className="text-sm text-gray-400">Atividades Completadas</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">{gameStats.totalScore}</div>
            <div className="text-sm text-gray-400">Pontos Totais</div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Subject Filters */}
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => setSelectedSubject(subject.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    selectedSubject === subject.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {subject.name}
                </button>
              ))}
            </div>

            {/* Search and Sort */}
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar atividades..."
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [sort, order] = e.target.value.split('-')
                  setSortBy(sort as any)
                  setSortOrder(order as any)
                }}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name-asc">Nome (A-Z)</option>
                <option value="name-desc">Nome (Z-A)</option>
                <option value="difficulty-asc">Dificuldade (Menor)</option>
                <option value="difficulty-desc">Dificuldade (Maior)</option>
                <option value="duration-asc">Duração (Menor)</option>
                <option value="duration-desc">Duração (Maior)</option>
                <option value="xp-asc">XP (Menor)</option>
                <option value="xp-desc">XP (Maior)</option>
              </select>
            </div>
          </div>

          {/* Additional Filters */}
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Dificuldade:</span>
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty.id}
                  onClick={() => setSelectedDifficulty(difficulty.id)}
                  className={`px-3 py-1 rounded-md text-sm transition-all duration-200 ${
                    selectedDifficulty === difficulty.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {difficulty.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Tipo:</span>
              {activityTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-3 py-1 rounded-md text-sm transition-all duration-200 flex items-center gap-1 ${
                    selectedType === type.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{type.icon}</span>
                  {type.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Activities Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {sortedActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              {/* Activity Image */}
              <div className="h-48 bg-gradient-to-br from-blue-900/30 to-purple-900/30 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-20">
                    {getTypeIcon(activity.type)}
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
                    {activity.difficulty.toUpperCase()}
                  </div>
                </div>
                {!canAccessActivity(activity) && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Lock className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Activity Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(activity.type)}
                    <span className="text-sm text-gray-400">{activity.type}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-yellow-400">{activity.xpReward} XP</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">{activity.title}</h3>
                <p className="text-sm text-gray-300 mb-4 line-clamp-2">{activity.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {activity.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Activity Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{activity.duration}min</span>
                    </div>
                    {activity.questions && (
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        <span>{activity.questions} questões</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Medal className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm text-cyan-400">{activity.pointsReward} pts</span>
                  </div>
                </div>

                {/* Requirements */}
                {activity.requirements && !canAccessActivity(activity) && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-sm text-red-400 mb-1">Requisitos:</p>
                    {activity.requirements.level && gameStats.currentLevel < activity.requirements.level && (
                      <p className="text-xs text-red-300">
                        Nível {activity.requirements.level} necessário (você tem nível {gameStats.currentLevel})
                      </p>
                    )}
                    {activity.requirements.achievements && (
                      <p className="text-xs text-red-300">
                        Conquistas específicas necessárias
                      </p>
                    )}
                  </div>
                )}

                {/* Action Button */}
                <Button
                  onClick={() => canAccessActivity(activity) ? handleStartActivity(activity) : null}
                  disabled={!canAccessActivity(activity)}
                  className={`w-full ${
                    canAccessActivity(activity)
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {canAccessActivity(activity) ? (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Iniciar Atividade
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Bloqueado
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {sortedActivities.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <BookOpen className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">Nenhuma atividade encontrada</h3>
            <p className="text-gray-500">Tente ajustar os filtros ou a busca</p>
          </motion.div>
        )}
      </main>
    </div>
  )
}
