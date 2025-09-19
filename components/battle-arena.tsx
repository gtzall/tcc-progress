'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Swords, 
  Shield, 
  Zap, 
  Target, 
  Clock, 
  Crown, 
  Fire,
  Users,
  Trophy,
  Star,
  Flame,
  Sparkles,
  Bolt,
  Eye,
  Timer
} from 'lucide-react'

interface BattleMode {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  gradient: string
  maxPlayers: number
  questionsCount: number
  timePerQuestion: number
  xpMultiplier: number
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme'
  features: string[]
  isLocked?: boolean
  requiredLevel?: number
}

interface PowerUp {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  cost: number
  cooldown: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

const battleModes: BattleMode[] = [
  {
    id: 'blitz',
    name: 'Blitz Arena',
    description: 'Batalhas ultra-rápidas com respostas em 5 segundos',
    icon: <Bolt className="w-8 h-8" />,
    color: 'from-yellow-500 to-orange-500',
    gradient: 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20',
    maxPlayers: 2,
    questionsCount: 10,
    timePerQuestion: 5,
    xpMultiplier: 2.0,
    difficulty: 'hard',
    features: ['Respostas Rápidas', 'XP Dobrado', 'Adrenalina Pura']
  },
  {
    id: 'survival',
    name: 'Survival Mode',
    description: 'Eliminação progressiva - apenas os melhores sobrevivem',
    icon: <Shield className="w-8 h-8" />,
    color: 'from-red-500 to-pink-500',
    gradient: 'bg-gradient-to-br from-red-500/20 to-pink-500/20',
    maxPlayers: 8,
    questionsCount: 20,
    timePerQuestion: 15,
    xpMultiplier: 3.0,
    difficulty: 'extreme',
    features: ['Eliminação', 'Multi-jogador', 'XP Triplo']
  },
  {
    id: 'team-conquest',
    name: 'Team Conquest',
    description: 'Batalhas estratégicas em equipe com power-ups',
    icon: <Users className="w-8 h-8" />,
    color: 'from-blue-500 to-purple-500',
    gradient: 'bg-gradient-to-br from-blue-500/20 to-purple-500/20',
    maxPlayers: 6,
    questionsCount: 15,
    timePerQuestion: 20,
    xpMultiplier: 2.5,
    difficulty: 'hard',
    features: ['Trabalho em Equipe', 'Power-ups', 'Estratégia']
  },
  {
    id: 'boss-battle',
    name: 'Boss Battle',
    description: 'Enfrente o "Mestre do Conhecimento" em questões impossíveis',
    icon: <Crown className="w-8 h-8" />,
    color: 'from-purple-500 to-indigo-500',
    gradient: 'bg-gradient-to-br from-purple-500/20 to-indigo-500/20',
    maxPlayers: 1,
    questionsCount: 25,
    timePerQuestion: 30,
    xpMultiplier: 5.0,
    difficulty: 'extreme',
    features: ['Boss Fight', 'XP x5', 'Questões Épicas'],
    isLocked: true,
    requiredLevel: 25
  }
]

const powerUps: PowerUp[] = [
  {
    id: 'lightning-strike',
    name: 'Lightning Strike',
    description: 'Resposta instantânea correta',
    icon: <Zap className="w-5 h-5" />,
    color: 'text-yellow-400',
    cost: 100,
    cooldown: 180,
    rarity: 'epic'
  },
  {
    id: 'shield',
    name: 'Shield',
    description: 'Proteção contra próximo erro',
    icon: <Shield className="w-5 h-5" />,
    color: 'text-blue-400',
    cost: 75,
    cooldown: 120,
    rarity: 'rare'
  },
  {
    id: 'insight',
    name: 'Insight',
    description: 'Elimina 2 alternativas incorretas',
    icon: <Eye className="w-5 h-5" />,
    color: 'text-purple-400',
    cost: 50,
    cooldown: 90,
    rarity: 'common'
  },
  {
    id: 'time-freeze',
    name: 'Time Freeze',
    description: 'Pausa cronômetro por 10 segundos',
    icon: <Timer className="w-5 h-5" />,
    color: 'text-cyan-400',
    cost: 125,
    cooldown: 200,
    rarity: 'legendary'
  }
]

export function BattleArena() {
  const [selectedMode, setSelectedMode] = useState<BattleMode | null>(null)
  const [playerLevel] = useState(15) // Mock player level
  const [playerCoins] = useState(450) // Mock player coins
  const [isSearching, setIsSearching] = useState(false)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500'
      case 'medium': return 'bg-yellow-500'
      case 'hard': return 'bg-orange-500'
      case 'extreme': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil'
      case 'medium': return 'Médio'
      case 'hard': return 'Difícil'
      case 'extreme': return 'Extremo'
      default: return difficulty
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-400 bg-gray-400/10'
      case 'rare': return 'border-blue-400 bg-blue-400/10'
      case 'epic': return 'border-purple-400 bg-purple-400/10'
      case 'legendary': return 'border-yellow-400 bg-yellow-400/10'
      default: return 'border-gray-400 bg-gray-400/10'
    }
  }

  const handleStartBattle = (mode: BattleMode) => {
    if (mode.isLocked && playerLevel < (mode.requiredLevel || 0)) {
      return
    }
    
    setSelectedMode(mode)
    setIsSearching(true)
    
    // Simulate matchmaking
    setTimeout(() => {
      setIsSearching(false)
      // Here would redirect to actual battle
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-red-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
            Arena de Batalhas
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Entre na arena e prove que você é o mestre do conhecimento
          </p>
          
          {/* Player Stats */}
          <div className="flex justify-center items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-400" />
              <span className="text-lg font-semibold">Nível {playerLevel}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <span className="text-lg font-semibold">{playerCoins} Moedas</span>
            </div>
          </div>
        </motion.div>

        {/* Battle Modes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {battleModes.map((mode, index) => (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <Card className={`h-full bg-gray-800/50 backdrop-blur-xl border-gray-700/50 hover:border-gray-600 transition-all duration-300 ${mode.gradient} ${mode.isLocked && playerLevel < (mode.requiredLevel || 0) ? 'opacity-50' : ''}`}>
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${mode.color} flex items-center justify-center mb-4 mx-auto`}>
                    {mode.icon}
                  </div>
                  
                  <CardTitle className="text-white text-center text-lg">
                    {mode.name}
                  </CardTitle>
                  
                  <CardDescription className="text-gray-300 text-center text-sm">
                    {mode.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Mode Stats */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Jogadores:</span>
                      <Badge variant="secondary">{mode.maxPlayers}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Questões:</span>
                      <Badge variant="secondary">{mode.questionsCount}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Tempo:</span>
                      <Badge variant="secondary">{mode.timePerQuestion}s</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">XP:</span>
                      <Badge className="bg-green-500">x{mode.xpMultiplier}</Badge>
                    </div>
                  </div>

                  {/* Difficulty */}
                  <div className="flex items-center justify-center">
                    <Badge className={`${getDifficultyColor(mode.difficulty)} text-white`}>
                      {getDifficultyLabel(mode.difficulty)}
                    </Badge>
                  </div>

                  {/* Features */}
                  <div className="space-y-1">
                    {mode.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => handleStartBattle(mode)}
                    disabled={mode.isLocked && playerLevel < (mode.requiredLevel || 0)}
                    className={`w-full bg-gradient-to-r ${mode.color} hover:opacity-90 transition-opacity`}
                  >
                    {mode.isLocked && playerLevel < (mode.requiredLevel || 0) ? (
                      <>
                        <Crown className="w-4 h-4 mr-2" />
                        Nível {mode.requiredLevel} Necessário
                      </>
                    ) : (
                      <>
                        <Swords className="w-4 h-4 mr-2" />
                        Entrar na Arena
                      </>
                    )}
                  </Button>
                </CardContent>

                {/* Lock Overlay */}
                {mode.isLocked && playerLevel < (mode.requiredLevel || 0) && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold">Nível {mode.requiredLevel}</p>
                      <p className="text-xs text-gray-400">Necessário</p>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Power-ups Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Power-ups Disponíveis
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {powerUps.map((powerUp, index) => (
              <motion.div
                key={powerUp.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className={`bg-gray-800/50 backdrop-blur-xl border-2 ${getRarityColor(powerUp.rarity)} hover:shadow-lg transition-all duration-300`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`${powerUp.color}`}>
                        {powerUp.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm">{powerUp.name}</h3>
                        <p className="text-xs text-gray-400">{powerUp.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-purple-400" />
                        <span className="text-gray-300">{powerUp.cost}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-blue-400" />
                        <span className="text-gray-300">{powerUp.cooldown}s</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Matchmaking Modal */}
        <AnimatePresence>
          {isSearching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-xl p-8 text-center max-w-md mx-4"
              >
                <div className="w-20 h-20 mx-auto mb-6 relative">
                  <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                  <Swords className="w-8 h-8 text-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">Procurando Oponente</h3>
                <p className="text-gray-400 mb-4">
                  Encontrando um adversário digno para {selectedMode?.name}...
                </p>
                
                <div className="space-y-2">
                  <Progress value={66} className="w-full" />
                  <p className="text-sm text-gray-500">Analisando habilidades...</p>
                </div>
                
                <Button
                  onClick={() => setIsSearching(false)}
                  variant="outline"
                  className="mt-6 border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Cancelar Busca
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

