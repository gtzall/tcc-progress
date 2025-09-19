'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Crown, 
  Trophy, 
  Medal, 
  Star, 
  Flame, 
  Zap, 
  Target,
  TrendingUp,
  Calendar,
  Globe,
  Users,
  Award,
  Sparkles,
  Sword,
  Shield,
  Diamond,
  Gem
} from 'lucide-react'

interface Player {
  id: string
  name: string
  level: number
  xp: number
  totalXp: number
  rank: number
  previousRank: number
  league: 'bronze' | 'silver' | 'gold' | 'diamond' | 'master' | 'grandmaster'
  avatar?: string
  title?: string
  badges: string[]
  stats: {
    gamesPlayed: number
    winRate: number
    averageScore: number
    bestStreak: number
    totalCorrectAnswers: number
  }
  weeklyXp: number
  monthlyXp: number
}

interface League {
  id: string
  name: string
  color: string
  gradient: string
  icon: React.ReactNode
  minXp: number
  maxXp: number
  rewards: string[]
}

const leagues: League[] = [
  {
    id: 'bronze',
    name: 'Liga Bronze',
    color: 'text-amber-600',
    gradient: 'from-amber-600 to-amber-800',
    icon: <Medal className="w-6 h-6" />,
    minXp: 0,
    maxXp: 999,
    rewards: ['Avatar Bronze', '+10% XP Bônus']
  },
  {
    id: 'silver',
    name: 'Liga Prata',
    color: 'text-gray-400',
    gradient: 'from-gray-400 to-gray-600',
    icon: <Award className="w-6 h-6" />,
    minXp: 1000,
    maxXp: 2499,
    rewards: ['Avatar Prata', '+15% XP Bônus', 'Power-up Grátis']
  },
  {
    id: 'gold',
    name: 'Liga Ouro',
    color: 'text-yellow-400',
    gradient: 'from-yellow-400 to-yellow-600',
    icon: <Trophy className="w-6 h-6" />,
    minXp: 2500,
    maxXp: 4999,
    rewards: ['Avatar Ouro', '+20% XP Bônus', '2 Power-ups Grátis']
  },
  {
    id: 'diamond',
    name: 'Liga Diamante',
    color: 'text-cyan-400',
    gradient: 'from-cyan-400 to-blue-600',
    icon: <Diamond className="w-6 h-6" />,
    minXp: 5000,
    maxXp: 9999,
    rewards: ['Avatar Diamante', '+25% XP Bônus', 'Título Especial']
  },
  {
    id: 'master',
    name: 'Liga Mestre',
    color: 'text-purple-400',
    gradient: 'from-purple-400 to-purple-600',
    icon: <Crown className="w-6 h-6" />,
    minXp: 10000,
    maxXp: 24999,
    rewards: ['Avatar Mestre', '+30% XP Bônus', 'Efeitos Especiais']
  },
  {
    id: 'grandmaster',
    name: 'Grão-Mestre',
    color: 'text-red-400',
    gradient: 'from-red-400 to-pink-600',
    icon: <Gem className="w-6 h-6" />,
    minXp: 25000,
    maxXp: Infinity,
    rewards: ['Avatar Lendário', '+50% XP Bônus', 'Todos os Privilégios']
  }
]

const mockPlayers: Player[] = [
  {
    id: '1',
    name: 'MathWizard',
    level: 45,
    xp: 15750,
    totalXp: 15750,
    rank: 1,
    previousRank: 2,
    league: 'master',
    title: 'Destruidor de Questões',
    badges: ['streak-master', 'speed-demon', 'math-genius'],
    stats: {
      gamesPlayed: 234,
      winRate: 87.5,
      averageScore: 1250,
      bestStreak: 45,
      totalCorrectAnswers: 1876
    },
    weeklyXp: 2340,
    monthlyXp: 8750
  },
  {
    id: '2',
    name: 'QuizMaster2024',
    level: 42,
    xp: 14200,
    totalXp: 14200,
    rank: 2,
    previousRank: 1,
    league: 'master',
    title: 'Mestre do Conhecimento',
    badges: ['battle-veteran', 'knowledge-seeker'],
    stats: {
      gamesPlayed: 198,
      winRate: 82.1,
      averageScore: 1180,
      bestStreak: 38,
      totalCorrectAnswers: 1654
    },
    weeklyXp: 1890,
    monthlyXp: 7200
  },
  {
    id: '3',
    name: 'BrainStorm',
    level: 38,
    xp: 11500,
    totalXp: 11500,
    rank: 3,
    previousRank: 4,
    league: 'master',
    title: 'Tempestade Mental',
    badges: ['quick-thinker', 'combo-master'],
    stats: {
      gamesPlayed: 167,
      winRate: 79.6,
      averageScore: 1095,
      bestStreak: 32,
      totalCorrectAnswers: 1423
    },
    weeklyXp: 1650,
    monthlyXp: 6800
  },
  {
    id: '4',
    name: 'Você',
    level: 15,
    xp: 3450,
    totalXp: 3450,
    rank: 127,
    previousRank: 134,
    league: 'gold',
    badges: ['newcomer', 'dedicated'],
    stats: {
      gamesPlayed: 45,
      winRate: 68.9,
      averageScore: 850,
      bestStreak: 12,
      totalCorrectAnswers: 287
    },
    weeklyXp: 450,
    monthlyXp: 1200
  }
]

export function EpicRanking() {
  const [selectedTab, setSelectedTab] = useState('global')
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null)
  const [players, setPlayers] = useState(mockPlayers)
  const [currentPlayer] = useState(mockPlayers.find(p => p.name === 'Você'))

  const getLeagueByXp = (xp: number) => {
    return leagues.find(league => xp >= league.minXp && xp <= league.maxXp) || leagues[0]
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-8 h-8 text-yellow-400" />
      case 2:
        return <Trophy className="w-8 h-8 text-gray-400" />
      case 3:
        return <Medal className="w-8 h-8 text-amber-600" />
      default:
        return <span className="text-2xl font-bold text-gray-400">#{rank}</span>
    }
  }

  const getRankChange = (current: number, previous: number) => {
    const change = previous - current
    if (change > 0) {
      return { direction: 'up', value: change, color: 'text-green-400' }
    } else if (change < 0) {
      return { direction: 'down', value: Math.abs(change), color: 'text-red-400' }
    }
    return { direction: 'same', value: 0, color: 'text-gray-400' }
  }

  const getProgressToNextLeague = (player: Player) => {
    const currentLeague = getLeagueByXp(player.xp)
    const nextLeague = leagues.find(l => l.minXp > player.xp)
    
    if (!nextLeague) return { progress: 100, nextLeague: null }
    
    const progress = ((player.xp - currentLeague.minXp) / (nextLeague.minXp - currentLeague.minXp)) * 100
    return { progress, nextLeague }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Hall da Fama
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Os maiores mestres do conhecimento se encontram aqui
          </p>
        </motion.div>

        {/* Player Stats Card */}
        {currentPlayer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-purple-800/50 to-blue-800/50 backdrop-blur-xl border-purple-500/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Avatar className="w-20 h-20 border-4 border-purple-400">
                        <AvatarFallback className="bg-purple-600 text-white text-2xl font-bold">
                          {currentPlayer.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                        {currentPlayer.level}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{currentPlayer.name}</h3>
                      {currentPlayer.title && (
                        <p className="text-purple-300 mb-2">{currentPlayer.title}</p>
                      )}
                      <div className="flex items-center gap-4">
                        <Badge className={`bg-gradient-to-r ${getLeagueByXp(currentPlayer.xp).gradient} text-white`}>
                          {getLeagueByXp(currentPlayer.xp).name}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-400">Rank:</span>
                          <span className="font-bold text-white">#{currentPlayer.rank}</span>
                          {(() => {
                            const change = getRankChange(currentPlayer.rank, currentPlayer.previousRank)
                            return change.direction !== 'same' && (
                              <span className={`text-sm ${change.color}`}>
                                ({change.direction === 'up' ? '+' : '-'}{change.value})
                              </span>
                            )
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-3xl font-bold text-purple-400 mb-1">
                      {currentPlayer.xp.toLocaleString()} XP
                    </div>
                    <div className="text-sm text-gray-400 mb-4">
                      {currentPlayer.stats.winRate}% Taxa de Vitória
                    </div>
                    
                    {/* Progress to next league */}
                    {(() => {
                      const { progress, nextLeague } = getProgressToNextLeague(currentPlayer)
                      return nextLeague && (
                        <div className="w-48">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Próxima Liga</span>
                            <span>{Math.round(progress)}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full bg-gradient-to-r ${nextLeague.gradient} transition-all duration-300`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {(nextLeague.minXp - currentPlayer.xp).toLocaleString()} XP restante
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Leagues Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Ligas Competitivas
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {leagues.map((league, index) => (
              <motion.div
                key={league.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedLeague(selectedLeague === league.id ? null : league.id)}
                className="cursor-pointer"
              >
                <Card className={`bg-gray-800/50 backdrop-blur-xl border-2 ${
                  selectedLeague === league.id ? 'border-purple-400' : 'border-gray-700/50'
                } hover:border-gray-600 transition-all duration-300`}>
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${league.gradient} flex items-center justify-center`}>
                      {league.icon}
                    </div>
                    <h3 className={`font-semibold mb-1 ${league.color}`}>{league.name}</h3>
                    <p className="text-xs text-gray-400">
                      {league.minXp === 0 ? '0' : league.minXp.toLocaleString()} - {
                        league.maxXp === Infinity ? '∞' : league.maxXp.toLocaleString()
                      } XP
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ranking Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 border border-gray-700/50">
            <TabsTrigger value="global" className="data-[state=active]:bg-purple-600">
              <Globe className="w-4 h-4 mr-2" />
              Global
            </TabsTrigger>
            <TabsTrigger value="weekly" className="data-[state=active]:bg-blue-600">
              <Calendar className="w-4 h-4 mr-2" />
              Semanal
            </TabsTrigger>
            <TabsTrigger value="monthly" className="data-[state=active]:bg-green-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              Mensal
            </TabsTrigger>
            <TabsTrigger value="friends" className="data-[state=active]:bg-orange-600">
              <Users className="w-4 h-4 mr-2" />
              Amigos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="space-y-4">
            <div className="grid gap-4">
              {players.slice(0, 10).map((player, index) => {
                const league = getLeagueByXp(player.xp)
                const rankChange = getRankChange(player.rank, player.previousRank)
                const isCurrentPlayer = player.name === 'Você'
                
                return (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className={`bg-gray-800/50 backdrop-blur-xl border-gray-700/50 hover:border-gray-600 transition-all duration-300 ${
                      isCurrentPlayer ? 'ring-2 ring-purple-400 bg-purple-800/20' : ''
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {/* Rank */}
                            <div className="w-16 text-center">
                              {getRankIcon(player.rank)}
                            </div>
                            
                            {/* Avatar and Info */}
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <Avatar className="w-12 h-12 border-2 border-gray-600">
                                  <AvatarFallback className={`bg-gradient-to-r ${league.gradient} text-white font-bold`}>
                                    {player.name[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold border-2 border-gray-800">
                                  {player.level}
                                </div>
                              </div>
                              
                              <div>
                                <h3 className="font-semibold text-white">{player.name}</h3>
                                {player.title && (
                                  <p className="text-sm text-gray-400">{player.title}</p>
                                )}
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge className={`bg-gradient-to-r ${league.gradient} text-white text-xs`}>
                                    {league.name}
                                  </Badge>
                                  {player.badges.slice(0, 2).map((badge, idx) => (
                                    <div key={idx} className="w-4 h-4 bg-yellow-500 rounded-full" />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Stats */}
                          <div className="text-right">
                            <div className="text-2xl font-bold text-purple-400 mb-1">
                              {player.xp.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-400 mb-2">
                              {player.stats.winRate}% vitórias
                            </div>
                            
                            {/* Rank Change */}
                            {rankChange.direction !== 'same' && (
                              <div className={`flex items-center justify-end gap-1 ${rankChange.color}`}>
                                <TrendingUp className={`w-3 h-3 ${rankChange.direction === 'down' ? 'rotate-180' : ''}`} />
                                <span className="text-xs">{rankChange.value}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">Ranking Semanal</h3>
              <p className="text-gray-400">Competição desta semana em andamento...</p>
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">Ranking Mensal</h3>
              <p className="text-gray-400">Competição deste mês em andamento...</p>
            </div>
          </TabsContent>

          <TabsContent value="friends" className="space-y-4">
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">Ranking de Amigos</h3>
              <p className="text-gray-400">Adicione amigos para competir com eles!</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

