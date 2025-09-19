"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
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
  Diamond,
  Filter,
  Search,
  SortAsc,
  SortDesc,
  Play
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/theme-context"
import { useAchievements } from "@/contexts/achievements-context"
import { SmartNavigation } from "@/components/smart-navigation"
import EnhancedThemeAnimations from "@/components/enhanced-theme-animations"

const categories = [
  { id: 'all', name: 'Todas', icon: <Trophy className="h-4 w-4" /> },
  { id: 'quiz', name: 'Quizzes', icon: <Target className="h-4 w-4" /> },
  { id: 'demo', name: 'Demo', icon: <Play className="h-4 w-4" /> },
  { id: 'streak', name: 'Sequências', icon: <Flame className="h-4 w-4" /> },
  { id: 'social', name: 'Social', icon: <Heart className="h-4 w-4" /> },
  { id: 'mastery', name: 'Maestria', icon: <Brain className="h-4 w-4" /> },
  { id: 'speed', name: 'Velocidade', icon: <Zap className="h-4 w-4" /> },
  { id: 'help', name: 'Ajuda', icon: <Shield className="h-4 w-4" /> }
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

const getRarityGradient = (rarity: string) => {
  switch (rarity) {
    case 'common': return 'from-gray-400 to-gray-500'
    case 'rare': return 'from-blue-400 to-cyan-500'
    case 'epic': return 'from-purple-400 to-pink-500'
    case 'legendary': return 'from-orange-400 to-yellow-500'
    default: return 'from-gray-400 to-gray-500'
  }
}

export default function AchievementsPage() {
  const { currentTheme } = useTheme()
  const { achievements, gameStats, getUnlockedAchievements, getLockedAchievements } = useAchievements()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState<'rarity' | 'progress' | 'name'>('rarity')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [searchQuery, setSearchQuery] = useState('')

  const unlockedAchievements = getUnlockedAchievements()
  const lockedAchievements = getLockedAchievements()

  const filteredAchievements = achievements.filter(achievement => {
    const matchesCategory = selectedCategory === 'all' || achievement.category === selectedCategory
    const matchesSearch = achievement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         achievement.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    let comparison = 0
    
    switch (sortBy) {
      case 'rarity':
        const rarityOrder = { legendary: 4, epic: 3, rare: 2, common: 1 }
        comparison = rarityOrder[a.rarity] - rarityOrder[b.rarity]
        break
      case 'progress':
        const aProgress = a.unlocked ? 1 : a.progress / a.maxProgress
        const bProgress = b.unlocked ? 1 : b.progress / b.maxProgress
        comparison = aProgress - bProgress
        break
      case 'name':
        comparison = a.name.localeCompare(b.name)
        break
    }
    
    return sortOrder === 'asc' ? comparison : -comparison
  })

  const totalXP = unlockedAchievements.reduce((sum, a) => sum + a.xpReward, 0)
  const totalPoints = unlockedAchievements.reduce((sum, a) => sum + a.pointsReward, 0)

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
            <Trophy className="h-10 w-10 text-yellow-400" />
            Conquistas
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Desbloqueie conquistas únicas e mostre suas habilidades. Cada conquista traz recompensas especiais!
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
            <div className="text-3xl font-bold text-white mb-2">{unlockedAchievements.length}</div>
            <div className="text-sm text-gray-400">Conquistas Desbloqueadas</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">{achievements.length}</div>
            <div className="text-sm text-gray-400">Total de Conquistas</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">{totalXP.toLocaleString()}</div>
            <div className="text-sm text-gray-400">XP Total Ganho</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">{totalPoints.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Pontos Totais</div>
          </div>
        </motion.div>

        {/* Game Stats Summary */}
        <motion.div 
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Seu Progresso</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{gameStats.totalQuizzes}</div>
              <div className="text-sm text-gray-400">Quizzes Completados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{gameStats.totalCorrectAnswers}</div>
              <div className="text-sm text-gray-400">Respostas Corretas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{gameStats.currentLevel}</div>
              <div className="text-sm text-gray-400">Nível Atual</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{gameStats.demoQuizzes}</div>
              <div className="text-sm text-gray-400">Demos Jogados</div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div 
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-cyan-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </div>

            {/* Search and Sort */}
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar conquistas..."
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="rarity-desc">Raridade (Maior)</option>
                <option value="rarity-asc">Raridade (Menor)</option>
                <option value="progress-desc">Progresso (Maior)</option>
                <option value="progress-asc">Progresso (Menor)</option>
                <option value="name-asc">Nome (A-Z)</option>
                <option value="name-desc">Nome (Z-A)</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Achievements Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {sortedAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${
                achievement.unlocked 
                  ? getRarityColor(achievement.rarity) + ' hover:scale-105' 
                  : 'border-gray-600 bg-gray-800/50 opacity-60'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: achievement.unlocked ? -5 : -2 }}
            >
              {/* Rarity Border Glow */}
              {achievement.unlocked && (
                <div className={`absolute inset-0 bg-gradient-to-r ${getRarityGradient(achievement.rarity)} opacity-20 blur-sm`}></div>
              )}
              
              <div className="relative p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    achievement.unlocked 
                      ? 'text-cyan-400 bg-cyan-400/10' 
                      : 'text-gray-500 bg-gray-600/20'
                  }`}>
                    {achievement.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`font-semibold ${
                        achievement.unlocked ? 'text-white' : 'text-gray-400'
                      }`}>
                        {achievement.name}
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        achievement.rarity === 'legendary' ? 'bg-orange-500/20 text-orange-400' :
                        achievement.rarity === 'epic' ? 'bg-purple-500/20 text-purple-400' :
                        achievement.rarity === 'rare' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {getRarityText(achievement.rarity)}
                      </span>
                    </div>
                    
                    <div className={`text-sm mb-3 ${
                      achievement.unlocked ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {achievement.description}
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          achievement.unlocked 
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
                            : 'bg-gradient-to-r from-gray-500 to-gray-600'
                        }`}
                        style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className={achievement.unlocked ? 'text-gray-400' : 'text-gray-500'}>
                        {achievement.progress} / {achievement.maxProgress}
                      </span>
                      
                      {achievement.unlocked ? (
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400">+{achievement.xpReward} XP</span>
                          <span className="text-cyan-400">+{achievement.pointsReward} pts</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">{achievement.xpReward} XP</span>
                          <span className="text-gray-500">{achievement.pointsReward} pts</span>
                        </div>
                      )}
                    </div>
                    
                    {achievement.unlocked && achievement.unlockedAt && (
                      <div className="text-xs text-gray-500 mt-2">
                        Desbloqueado em {achievement.unlockedAt}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Unlock Status */}
                {achievement.unlocked && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {sortedAchievements.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Trophy className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">Nenhuma conquista encontrada</h3>
            <p className="text-gray-500">Tente ajustar os filtros ou a busca</p>
          </motion.div>
        )}
      </main>
    </div>
  )
}
