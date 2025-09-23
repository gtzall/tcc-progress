'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QuizSetup } from '@/components/quiz-setup'
import { QuizGame } from '@/components/quiz-game'
import { QuizResults } from '@/components/quiz-results'
import { QuickActivities } from '@/components/quick-activities'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Play, 
  Trophy, 
  Target, 
  Clock, 
  Zap, 
  Settings, 
  Swords, 
  BookOpen, 
  Users,
  Crown,
  Star,
  Flame,
  Shield,
  Gamepad2,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

type GameState = 'setup' | 'playing' | 'results'

interface QuizConfig {
  subject: string
  difficulty: string
  institution: string
  questionCount: number
  timeLimit: number
}

interface QuizResults {
  config: QuizConfig
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: number
  answers: (number | null)[]
  questions: any[]
}

interface GameMode {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  gradient: string
  features: string[]
  href?: string
  action?: () => void
  badge?: string
  difficulty: 'Fácil' | 'Médio' | 'Difícil' | 'Extremo'
  players: string
  duration: string
  xp: string
}

export default function GamePage() {
  const [gameState, setGameState] = useState<GameState>('setup')
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null)
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null)

  const handleStartQuiz = (config: QuizConfig) => {
    setQuizConfig(config)
    setGameState('playing')
  }

  const handleQuizFinish = (results: QuizResults) => {
    setQuizResults(results)
    setGameState('results')
  }

  const handleRestart = () => {
    setGameState('setup')
    setQuizConfig(null)
    setQuizResults(null)
  }

  const handleBackToHome = () => {
    setGameState('setup')
    setQuizConfig(null)
    setQuizResults(null)
  }

  const handleBackFromQuiz = () => {
    setGameState('setup')
    setQuizConfig(null)
  }

  const gameModes: GameMode[] = [
    {
      id: 'battle',
      title: 'Arena de Batalhas',
      description: 'Desafie outros jogadores em batalhas épicas de conhecimento',
      icon: <Swords className="w-8 h-8" />,
      color: 'from-red-500 to-orange-500',
      gradient: 'bg-gradient-to-br from-red-500/20 to-orange-500/20',
      features: ['Multiplayer', 'Ranking Global', 'Power-ups', 'Recompensas Épicas'],
      href: '/battle',
      badge: 'Popular',
      difficulty: 'Extremo',
      players: '2-8',
      duration: '5-15 min',
      xp: '+300 XP'
    },
    {
      id: 'study',
      title: 'Modo Estudos',
      description: 'Estude com configurações personalizadas e análise detalhada',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      gradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
      features: ['Personalizado', 'Estatísticas', 'Análise de Desempenho', 'Sugestões'],
      href: '/modo-estudos',
      badge: 'Recomendado',
      difficulty: 'Médio',
      players: '1',
      duration: '10-60 min',
      xp: '+150 XP'
    },
    {
      id: 'quick',
      title: 'Quiz Rápido',
      description: 'Atividades pré-configuradas para jogar imediatamente',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-yellow-500 to-orange-500',
      gradient: 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20',
      features: ['Início Rápido', 'Diversos Temas', 'Sem Configuração', 'Ideal para Iniciantes'],
      action: () => setGameState('setup'),
      difficulty: 'Fácil',
      players: '1',
      duration: '5-10 min',
      xp: '+100 XP'
    },
    {
      id: 'custom',
      title: 'Quiz Personalizado',
      description: 'Configure seu próprio quiz com opções avançadas',
      icon: <Settings className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
      features: ['Configuração Total', 'Filtros Avançados', 'Tempo Personalizado', 'Dificuldade Ajustável'],
      action: () => setGameState('setup'),
      difficulty: 'Médio',
      players: '1',
      duration: 'Variável',
      xp: '+200 XP'
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'bg-green-500'
      case 'Médio': return 'bg-yellow-500'
      case 'Difícil': return 'bg-orange-500'
      case 'Extremo': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <AnimatePresence mode="wait">
        {gameState === 'setup' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white"
          >
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
                <div className="flex items-center justify-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl"
                  >
                    <Gamepad2 className="w-10 h-10 text-white" />
                  </motion.div>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                  Escolha seu Modo de Jogo
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Explore diferentes formas de aprender e se divertir. Cada modo oferece uma experiência única!
                </p>
              </motion.div>

              {/* Game Modes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {gameModes.map((mode, index) => (
                  <motion.div
                    key={mode.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="relative"
                  >
                    <Card className={`h-full bg-gray-800/50 backdrop-blur-xl border-gray-700/50 hover:border-gray-600 transition-all duration-300 ${mode.gradient} overflow-hidden`}>
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${mode.color} flex items-center justify-center shadow-lg`}>
                            {mode.icon}
                          </div>
                          {mode.badge && (
                            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold px-3 py-1 animate-pulse">
                              {mode.badge}
                            </Badge>
                          )}
                        </div>
                        
                        <CardTitle className="text-white text-2xl mb-2">
                          {mode.title}
                        </CardTitle>
                        
                        <CardDescription className="text-gray-300 text-base leading-relaxed">
                          {mode.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        {/* Mode Stats */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-700/30 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400 text-sm">Dificuldade:</span>
                              <Badge className={`${getDifficultyColor(mode.difficulty)} text-white text-xs`}>
                                {mode.difficulty}
                              </Badge>
                            </div>
                          </div>
                          <div className="bg-gray-700/30 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400 text-sm">Jogadores:</span>
                              <span className="text-white text-sm font-semibold">{mode.players}</span>
                            </div>
                          </div>
                          <div className="bg-gray-700/30 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400 text-sm">Duração:</span>
                              <span className="text-white text-sm font-semibold">{mode.duration}</span>
                            </div>
                          </div>
                          <div className="bg-gray-700/30 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400 text-sm">Recompensa:</span>
                              <span className="text-green-400 text-sm font-semibold">{mode.xp}</span>
                            </div>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-gray-300 mb-3">Características:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {mode.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Button */}
                        {mode.href ? (
                          <Link href={mode.href}>
                            <Button className={`w-full bg-gradient-to-r ${mode.color} hover:opacity-90 transition-opacity text-white font-semibold py-3 text-base`}>
                              <Play className="w-5 h-5 mr-2" />
                              Jogar Agora
                              <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                          </Link>
                        ) : (
                          <Button
                            onClick={mode.action}
                            className={`w-full bg-gradient-to-r ${mode.color} hover:opacity-90 transition-opacity text-white font-semibold py-3 text-base`}
                          >
                            <Play className="w-5 h-5 mr-2" />
                            Jogar Agora
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-800/30 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-400 mb-2">4</div>
                    <div className="text-gray-300 text-sm">Modos de Jogo</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-400 mb-2">500+</div>
                    <div className="text-gray-300 text-sm">Questões</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-pink-400 mb-2">15</div>
                    <div className="text-gray-300 text-sm">Matérias</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-cyan-400 mb-2">∞</div>
                    <div className="text-gray-300 text-sm">Diversão</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {gameState === 'playing' && quizConfig && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizGame
              config={quizConfig}
              onFinish={handleQuizFinish}
              onBack={handleBackFromQuiz}
            />
          </motion.div>
        )}

        {gameState === 'results' && quizResults && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizResults
              results={quizResults}
              onRestart={handleRestart}
              onBack={handleBackToHome}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
