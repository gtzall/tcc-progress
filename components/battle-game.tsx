'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Zap, 
  Shield, 
  Eye, 
  Timer, 
  Crown, 
  Fire,
  Heart,
  Star,
  Target,
  Sparkles,
  Bolt,
  Swords
} from 'lucide-react'

interface BattleQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme'
  category: string
  timeLimit: number
}

interface Player {
  id: string
  name: string
  level: number
  health: number
  maxHealth: number
  score: number
  streak: number
  powerUps: string[]
  avatar?: string
}

interface PowerUpEffect {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  active: boolean
  cooldown: number
}

const mockQuestions: BattleQuestion[] = [
  {
    id: '1',
    question: 'Qual é a capital do Brasil?',
    options: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Belo Horizonte'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'Geografia',
    timeLimit: 15
  },
  {
    id: '2',
    question: 'Quanto é 15 × 8?',
    options: ['120', '130', '110', '140'],
    correctAnswer: 0,
    difficulty: 'medium',
    category: 'Matemática',
    timeLimit: 10
  },
  {
    id: '3',
    question: 'Quem escreveu "Dom Casmurro"?',
    options: ['José de Alencar', 'Machado de Assis', 'Clarice Lispector', 'Guimarães Rosa'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'Literatura',
    timeLimit: 12
  }
]

export function BattleGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [gamePhase, setGamePhase] = useState<'countdown' | 'playing' | 'result' | 'finished'>('countdown')
  const [countdown, setCountdown] = useState(3)
  
  // Players
  const [player1, setPlayer1] = useState<Player>({
    id: '1',
    name: 'Você',
    level: 15,
    health: 100,
    maxHealth: 100,
    score: 0,
    streak: 0,
    powerUps: ['lightning-strike', 'shield']
  })
  
  const [player2, setPlayer2] = useState<Player>({
    id: '2',
    name: 'Oponente',
    level: 12,
    health: 100,
    maxHealth: 100,
    score: 0,
    streak: 0,
    powerUps: ['insight', 'time-freeze']
  })

  // Power-ups
  const [activePowerUps, setActivePowerUps] = useState<PowerUpEffect[]>([
    {
      id: 'lightning-strike',
      name: 'Lightning Strike',
      icon: <Zap className="w-4 h-4" />,
      color: 'text-yellow-400',
      active: false,
      cooldown: 0
    },
    {
      id: 'shield',
      name: 'Shield',
      icon: <Shield className="w-4 h-4" />,
      color: 'text-blue-400',
      active: false,
      cooldown: 0
    },
    {
      id: 'insight',
      name: 'Insight',
      icon: <Eye className="w-4 h-4" />,
      color: 'text-purple-400',
      active: false,
      cooldown: 0
    },
    {
      id: 'time-freeze',
      name: 'Time Freeze',
      icon: <Timer className="w-4 h-4" />,
      color: 'text-cyan-400',
      active: false,
      cooldown: 0
    }
  ])

  // Countdown inicial
  useEffect(() => {
    if (gamePhase === 'countdown' && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (gamePhase === 'countdown' && countdown === 0) {
      setGamePhase('playing')
      setTimeLeft(mockQuestions[currentQuestion].timeLimit)
    }
  }, [gamePhase, countdown, currentQuestion])

  // Timer da questão
  useEffect(() => {
    if (gamePhase === 'playing' && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (gamePhase === 'playing' && timeLeft === 0 && !showResult) {
      handleTimeUp()
    }
  }, [gamePhase, timeLeft, showResult])

  const handleTimeUp = () => {
    setShowResult(true)
    // Simular resposta do oponente
    simulateOpponentAnswer()
    
    setTimeout(() => {
      nextQuestion()
    }, 3000)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult || selectedAnswer !== null) return
    
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    
    const isCorrect = answerIndex === mockQuestions[currentQuestion].correctAnswer
    
    // Atualizar pontuação do jogador
    if (isCorrect) {
      const points = calculatePoints(timeLeft, player1.streak)
      setPlayer1(prev => ({
        ...prev,
        score: prev.score + points,
        streak: prev.streak + 1
      }))
      
      // Dano ao oponente
      setPlayer2(prev => ({
        ...prev,
        health: Math.max(0, prev.health - 20)
      }))
    } else {
      // Reset streak e dano ao jogador
      setPlayer1(prev => ({
        ...prev,
        streak: 0,
        health: Math.max(0, prev.health - 15)
      }))
    }
    
    // Simular resposta do oponente
    simulateOpponentAnswer()
    
    setTimeout(() => {
      nextQuestion()
    }, 3000)
  }

  const simulateOpponentAnswer = () => {
    // Simular resposta do oponente (70% de chance de acerto)
    const isCorrect = Math.random() < 0.7
    
    if (isCorrect) {
      const points = calculatePoints(Math.floor(Math.random() * 10) + 5, player2.streak)
      setPlayer2(prev => ({
        ...prev,
        score: prev.score + points,
        streak: prev.streak + 1
      }))
      
      // Dano ao jogador
      setPlayer1(prev => ({
        ...prev,
        health: Math.max(0, prev.health - 18)
      }))
    } else {
      setPlayer2(prev => ({
        ...prev,
        streak: 0,
        health: Math.max(0, prev.health - 12)
      }))
    }
  }

  const calculatePoints = (timeRemaining: number, streak: number) => {
    const basePoints = 100
    const timeBonus = timeRemaining * 5
    const streakBonus = streak * 10
    return basePoints + timeBonus + streakBonus
  }

  const nextQuestion = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setTimeLeft(mockQuestions[currentQuestion + 1].timeLimit)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setGamePhase('finished')
    }
  }

  const usePowerUp = (powerUpId: string) => {
    const powerUp = activePowerUps.find(p => p.id === powerUpId)
    if (!powerUp || powerUp.active || powerUp.cooldown > 0) return

    switch (powerUpId) {
      case 'lightning-strike':
        // Resposta automática correta
        handleAnswerSelect(mockQuestions[currentQuestion].correctAnswer)
        break
      case 'shield':
        // Proteção contra próximo erro (implementar lógica)
        break
      case 'insight':
        // Eliminar 2 alternativas incorretas (implementar lógica)
        break
      case 'time-freeze':
        // Pausar cronômetro por 10s
        setTimeLeft(prev => prev + 10)
        break
    }

    // Ativar cooldown
    setActivePowerUps(prev => prev.map(p => 
      p.id === powerUpId 
        ? { ...p, active: true, cooldown: 30 }
        : p
    ))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500'
      case 'medium': return 'bg-yellow-500'
      case 'hard': return 'bg-orange-500'
      case 'extreme': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  if (gamePhase === 'countdown') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <motion.div
            key={countdown}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            className="text-9xl font-bold text-white mb-4"
          >
            {countdown || 'GO!'}
          </motion.div>
          <p className="text-2xl text-gray-300">Prepare-se para a batalha!</p>
        </motion.div>
      </div>
    )
  }

  if (gamePhase === 'finished') {
    const winner = player1.score > player2.score ? player1 : player2
    const isPlayerWinner = winner.id === '1'
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto p-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center ${
              isPlayerWinner ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : 'bg-gradient-to-r from-gray-600 to-gray-700'
            }`}
          >
            {isPlayerWinner ? (
              <Crown className="w-16 h-16 text-white" />
            ) : (
              <Swords className="w-16 h-16 text-white" />
            )}
          </motion.div>
          
          <h1 className={`text-4xl font-bold mb-4 ${
            isPlayerWinner ? 'text-yellow-400' : 'text-gray-400'
          }`}>
            {isPlayerWinner ? 'VITÓRIA!' : 'DERROTA'}
          </h1>
          
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">{player1.name}</h3>
              <div className="text-3xl font-bold text-blue-400 mb-1">{player1.score}</div>
              <div className="text-sm text-gray-400">pontos</div>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">{player2.name}</h3>
              <div className="text-3xl font-bold text-red-400 mb-1">{player2.score}</div>
              <div className="text-sm text-gray-400">pontos</div>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Jogar Novamente
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300">
              Voltar ao Menu
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  const question = mockQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / mockQuestions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Header com informações dos jogadores */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Player 1 */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold">
              {player1.name[0]}
            </div>
            <div>
              <div className="font-semibold">{player1.name}</div>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all duration-300"
                    style={{ width: `${(player1.health / player1.maxHealth) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-400">{player1.health}/100</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-400">{player1.score}</div>
              <div className="text-xs text-gray-400">Streak: {player1.streak}</div>
            </div>
          </div>

          {/* VS */}
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">VS</div>
            <div className="text-sm text-gray-400">
              {currentQuestion + 1}/{mockQuestions.length}
            </div>
          </div>

          {/* Player 2 */}
          <div className="flex items-center gap-4">
            <div className="text-left">
              <div className="text-2xl font-bold text-red-400">{player2.score}</div>
              <div className="text-xs text-gray-400">Streak: {player2.streak}</div>
            </div>
            <div>
              <div className="font-semibold text-right">{player2.name}</div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">{player2.health}/100</span>
                <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all duration-300"
                    style={{ width: `${(player2.health / player2.maxHealth) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center font-bold">
              {player2.name[0]}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-6xl mx-auto mt-4">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Área principal da questão */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Timer e categoria */}
        <div className="flex items-center justify-between mb-6">
          <Badge className={`${getDifficultyColor(question.difficulty)} text-white`}>
            {question.category}
          </Badge>
          
          <div className="flex items-center gap-4">
            <div className={`text-3xl font-bold ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {timeLeft}s
            </div>
            <div className="w-16 h-16 relative">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-700"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={timeLeft <= 5 ? 'text-red-400' : 'text-blue-400'}
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  strokeDasharray={`${(timeLeft / question.timeLimit) * 100}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Questão */}
        <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50 mb-6">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">
              {question.question}
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Alternativas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {question.options.map((option, index) => {
            let buttonClass = "bg-gray-800/50 hover:bg-gray-700/50 border-gray-700/50 hover:border-gray-600"
            
            if (showResult) {
              if (index === question.correctAnswer) {
                buttonClass = "bg-green-600 border-green-500 text-white"
              } else if (index === selectedAnswer && index !== question.correctAnswer) {
                buttonClass = "bg-red-600 border-red-500 text-white"
              }
            } else if (selectedAnswer === index) {
              buttonClass = "bg-blue-600 border-blue-500 text-white"
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult || selectedAnswer !== null}
                  className={`w-full h-16 text-left justify-start text-lg ${buttonClass}`}
                >
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-4 font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </Button>
              </motion.div>
            )
          })}
        </div>

        {/* Power-ups */}
        <div className="flex justify-center gap-4">
          {activePowerUps.map((powerUp) => (
            <Button
              key={powerUp.id}
              onClick={() => usePowerUp(powerUp.id)}
              disabled={powerUp.active || powerUp.cooldown > 0}
              className={`w-12 h-12 p-0 ${powerUp.color} bg-gray-800/50 hover:bg-gray-700/50 border-gray-700/50`}
            >
              {powerUp.icon}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

