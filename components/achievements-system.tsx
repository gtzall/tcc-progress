'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Trophy, 
  Star, 
  Flame, 
  Zap, 
  Target,
  Crown,
  Shield,
  Sword,
  Gem,
  Award,
  Medal,
  Sparkles,
  Lock,
  CheckCircle,
  Clock,
  Users,
  BookOpen,
  Brain,
  Rocket,
  Diamond
} from 'lucide-react'

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  category: 'battle' | 'knowledge' | 'social' | 'special' | 'legendary'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  progress: number
  maxProgress: number
  unlocked: boolean
  unlockedAt?: Date
  rewards: {
    xp: number
    title?: string
    badge?: string
    powerUp?: string
  }
}

interface Title {
  id: string
  name: string
  description: string
  color: string
  gradient: string
  icon: React.ReactNode
  unlocked: boolean
  equipped: boolean
  requirements: string[]
}

const achievements: Achievement[] = [
  {
    id: 'first-victory',
    name: 'Primeira Vitória',
    description: 'Vença sua primeira batalha',
    icon: <Trophy className="w-6 h-6" />,
    category: 'battle',
    rarity: 'common',
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    unlockedAt: new Date('2024-01-15'),
    rewards: { xp: 100, title: 'Vencedor Iniciante' }
  },
  {
    id: 'streak-master',
    name: 'Mestre das Sequências',
    description: 'Acerte 20 questões seguidas',
    icon: <Flame className="w-6 h-6" />,
    category: 'knowledge',
    rarity: 'rare',
    progress: 15,
    maxProgress: 20,
    unlocked: false,
    rewards: { xp: 500, title: 'Destruidor de Questões', badge: 'streak-master' }
  },
  {
    id: 'speed-demon',
    name: 'Demônio da Velocidade',
    description: 'Responda 10 questões em menos de 5 segundos cada',
    icon: <Zap className="w-6 h-6" />,
    category: 'battle',
    rarity: 'epic',
    progress: 7,
    maxProgress: 10,
    unlocked: false,
    rewards: { xp: 750, title: 'Raio da Matemática', powerUp: 'lightning-strike' }
  },
  {
    id: 'social-butterfly',
    name: 'Borboleta Social',
    description: 'Adicione 10 amigos',
    icon: <Users className="w-6 h-6" />,
    category: 'social',
    rarity: 'common',
    progress: 3,
    maxProgress: 10,
    unlocked: false,
    rewards: { xp: 200, badge: 'social-master' }
  },
  {
    id: 'knowledge-seeker',
    name: 'Buscador do Conhecimento',
    description: 'Complete 100 quizzes',
    icon: <BookOpen className="w-6 h-6" />,
    category: 'knowledge',
    rarity: 'rare',
    progress: 67,
    maxProgress: 100,
    unlocked: false,
    rewards: { xp: 1000, title: 'Mestre do Conhecimento' }
  },
  {
    id: 'legendary-warrior',
    name: 'Guerreiro Lendário',
    description: 'Alcance a Liga Grão-Mestre',
    icon: <Crown className="w-6 h-6" />,
    category: 'legendary',
    rarity: 'legendary',
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    rewards: { xp: 5000, title: 'Lenda Viva', badge: 'legendary-warrior' }
  }
]

const titles: Title[] = [
  {
    id: 'newbie',
    name: 'Novato',
    description: 'Título inicial para todos os jogadores',
    color: 'text-gray-400',
    gradient: 'from-gray-400 to-gray-600',
    icon: <Star className="w-4 h-4" />,
    unlocked: true,
    equipped: false,
    requirements: ['Criar conta']
  },
  {
    id: 'winner',
    name: 'Vencedor Iniciante',
    description: 'Primeira vitória conquistada',
    color: 'text-green-400',
    gradient: 'from-green-400 to-green-600',
    icon: <Trophy className="w-4 h-4" />,
    unlocked: true,
    equipped: true,
    requirements: ['Vencer primeira batalha']
  },
  {
    id: 'destroyer',
    name: 'Destruidor de Questões',
    description: 'Mestre das sequências de acertos',
    color: 'text-red-400',
    gradient: 'from-red-400 to-red-600',
    icon: <Flame className="w-4 h-4" />,
    unlocked: false,
    equipped: false,
    requirements: ['20 acertos seguidos']
  },
  {
    id: 'lightning',
    name: 'Raio da Matemática',
    description: 'Velocidade sobrenatural',
    color: 'text-yellow-400',
    gradient: 'from-yellow-400 to-yellow-600',
    icon: <Zap className="w-4 h-4" />,
    unlocked: false,
    equipped: false,
    requirements: ['10 respostas em <5s']
  },
  {
    id: 'master',
    name: 'Mestre do Conhecimento',
    description: 'Conhecimento vasto e profundo',
    color: 'text-purple-400',
    gradient: 'from-purple-400 to-purple-600',
    icon: <Brain className="w-4 h-4" />,
    unlocked: false,
    equipped: false,
    requirements: ['100 quizzes completos']
  },
  {
    id: 'legend',
    name: 'Lenda Viva',
    description: 'O mais alto título possível',
    color: 'text-pink-400',
    gradient: 'from-pink-400 to-pink-600',
    icon: <Crown className="w-4 h-4" />,
    unlocked: false,
    equipped: false,
    requirements: ['Liga Grão-Mestre']
  }
]

export function AchievementsSystem() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTitle, setSelectedTitle] = useState<string>('winner')
  const [showUnlockAnimation, setShowUnlockAnimation] = useState<string | null>(null)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-400 bg-gray-400/10'
      case 'rare': return 'border-blue-400 bg-blue-400/10'
      case 'epic': return 'border-purple-400 bg-purple-400/10'
      case 'legendary': return 'border-yellow-400 bg-yellow-400/10'
      default: return 'border-gray-400 bg-gray-400/10'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'battle': return <Sword className="w-4 h-4" />
      case 'knowledge': return <BookOpen className="w-4 h-4" />
      case 'social': return <Users className="w-4 h-4" />
      case 'special': return <Star className="w-4 h-4" />
      case 'legendary': return <Crown className="w-4 h-4" />
      default: return <Trophy className="w-4 h-4" />
    }
  }

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory)

  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalXpEarned = achievements
    .filter(a => a.unlocked)
    .reduce((sum, a) => sum + a.rewards.xp, 0)

  const equipTitle = (titleId: string) => {
    setSelectedTitle(titleId)
    // Here would update the backend
  }

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 border-blue-500/50">
          <CardContent className="p-6 text-center">
            <Trophy className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{unlockedCount}</div>
            <div className="text-sm text-gray-400">Conquistas Desbloqueadas</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-600/20 to-green-800/20 border-green-500/50">
          <CardContent className="p-6 text-center">
            <Sparkles className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{totalXpEarned.toLocaleString()}</div>
            <div className="text-sm text-gray-400">XP de Conquistas</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-600/20 to-purple-800/20 border-purple-500/50">
          <CardContent className="p-6 text-center">
            <Crown className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{titles.filter(t => t.unlocked).length}</div>
            <div className="text-sm text-gray-400">Títulos Desbloqueados</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-600/20 to-yellow-800/20 border-yellow-500/50">
          <CardContent className="p-6 text-center">
            <Diamond className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {Math.round((unlockedCount / achievements.length) * 100)}%
            </div>
            <div className="text-sm text-gray-400">Progresso Total</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="achievements" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 border border-gray-700/50">
          <TabsTrigger value="achievements" className="data-[state=active]:bg-blue-600">
            <Trophy className="w-4 h-4 mr-2" />
            Conquistas
          </TabsTrigger>
          <TabsTrigger value="titles" className="data-[state=active]:bg-purple-600">
            <Crown className="w-4 h-4 mr-2" />
            Títulos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className="border-gray-600"
            >
              Todas
            </Button>
            {['battle', 'knowledge', 'social', 'special', 'legendary'].map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="border-gray-600"
              >
                {getCategoryIcon(category)}
                <span className="ml-2 capitalize">{category}</span>
              </Button>
            ))}
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className={`relative overflow-hidden ${getRarityColor(achievement.rarity)} ${
                  achievement.unlocked ? 'border-green-500/50' : 'border-gray-700/50'
                } transition-all duration-300`}>
                  {/* Unlock Status */}
                  <div className="absolute top-2 right-2">
                    {achievement.unlocked ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <Lock className="w-6 h-6 text-gray-500" />
                    )}
                  </div>

                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      achievement.unlocked 
                        ? `bg-gradient-to-r ${getRarityColor(achievement.rarity).replace('border-', 'from-').replace(' bg-', ' to-')}`
                        : 'bg-gray-700'
                    }`}>
                      <div className={achievement.unlocked ? 'text-white' : 'text-gray-500'}>
                        {achievement.icon}
                      </div>
                    </div>

                    <CardTitle className={`text-center ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>
                      {achievement.name}
                    </CardTitle>
                    
                    <CardDescription className="text-center text-sm">
                      {achievement.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Progress */}
                    {!achievement.unlocked && (
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Progresso</span>
                          <span className="text-gray-300">
                            {achievement.progress}/{achievement.maxProgress}
                          </span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}

                    {/* Rewards */}
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-gray-300">Recompensas:</div>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-blue-500 text-white">
                          +{achievement.rewards.xp} XP
                        </Badge>
                        {achievement.rewards.title && (
                          <Badge className="bg-purple-500 text-white">
                            Título: {achievement.rewards.title}
                          </Badge>
                        )}
                        {achievement.rewards.badge && (
                          <Badge className="bg-yellow-500 text-black">
                            Badge
                          </Badge>
                        )}
                        {achievement.rewards.powerUp && (
                          <Badge className="bg-green-500 text-white">
                            Power-up
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Unlock Date */}
                    {achievement.unlocked && achievement.unlockedAt && (
                      <div className="text-xs text-gray-400 text-center">
                        Desbloqueado em {achievement.unlockedAt.toLocaleDateString()}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="titles" className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-white mb-2">Títulos Disponíveis</h3>
            <p className="text-gray-400">Equipe um título para exibir seu status</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {titles.map((title, index) => (
              <motion.div
                key={title.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className={`relative ${
                  title.unlocked ? 'border-gray-600/50' : 'border-gray-700/50 opacity-60'
                } ${title.equipped ? 'ring-2 ring-purple-400' : ''} transition-all duration-300`}>
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-r ${title.gradient}`}>
                      <div className="text-white">
                        {title.icon}
                      </div>
                    </div>

                    <CardTitle className={`text-center ${title.color}`}>
                      {title.name}
                    </CardTitle>
                    
                    <CardDescription className="text-center text-sm">
                      {title.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Requirements */}
                    <div>
                      <div className="text-sm font-semibold text-gray-300 mb-2">Requisitos:</div>
                      <div className="space-y-1">
                        {title.requirements.map((req, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                            <div className="w-1 h-1 bg-gray-400 rounded-full" />
                            <span>{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      onClick={() => equipTitle(title.id)}
                      disabled={!title.unlocked}
                      className={`w-full ${
                        title.equipped 
                          ? 'bg-purple-600 hover:bg-purple-700' 
                          : title.unlocked 
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-gray-600 cursor-not-allowed'
                      }`}
                    >
                      {title.equipped ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Equipado
                        </>
                      ) : title.unlocked ? (
                        <>
                          <Crown className="w-4 h-4 mr-2" />
                          Equipar
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Bloqueado
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Unlock Animation */}
      <AnimatePresence>
        {showUnlockAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl p-8 text-center max-w-md mx-4"
            >
              <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Conquista Desbloqueada!</h2>
              <p className="text-white/90 mb-4">Você conquistou um novo achievement!</p>
              <Button 
                onClick={() => setShowUnlockAnimation(null)}
                className="bg-white text-orange-600 hover:bg-gray-100"
              >
                Continuar
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

