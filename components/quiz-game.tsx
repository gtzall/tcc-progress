'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Clock, 
  Check, 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Trophy, 
  Target,
  BarChart3,
  Play,
  Pause,
  RotateCcw,
  Home
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Tipos
interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
  explanation: string
  subject: string
  difficulty: string
  institution: string
  imageUrl?: string
}

interface QuizConfig {
  subject: string
  difficulty: string
  institution: string
  questionCount: number
  timeLimit: number
}

interface QuizState {
  currentQuestion: number
  answers: (number | null)[]
  timeRemaining: number
  isPaused: boolean
  isFinished: boolean
  score: number
  startTime: number
  endTime?: number
}

interface QuizGameProps {
  config: QuizConfig
  onFinish: (results: QuizResults) => void
  onBack: () => void
}

interface QuizResults {
  config: QuizConfig
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: number
  answers: (number | null)[]
  questions: Question[]
}

// Dados de exemplo (em produção, viriam de uma API)
const sampleQuestions: Question[] = [
  {
    id: '1',
    text: 'Qual é a fórmula da equação de segundo grau?',
    options: [
      'ax² + bx + c = 0',
      'ax + b = 0',
      'ax³ + bx² + cx + d = 0',
      'ax⁴ + bx² + c = 0'
    ],
    correctAnswer: 0,
    explanation: 'A equação de segundo grau é da forma ax² + bx + c = 0, onde a ≠ 0.',
    subject: 'matematica',
    difficulty: 'facil',
    institution: 'enem'
  },
  {
    id: '2',
    text: 'Em qual período da história do Brasil ocorreu a Proclamação da República?',
    options: [
      'Período Colonial',
      'Período Imperial',
      'Primeira República',
      'Era Vargas'
    ],
    correctAnswer: 1,
    explanation: 'A Proclamação da República ocorreu em 1889, durante o Período Imperial, pondo fim à monarquia.',
    subject: 'historia',
    difficulty: 'medio',
    institution: 'enem'
  },
  {
    id: '3',
    text: 'Qual é a capital do estado de Minas Gerais?',
    options: [
      'São Paulo',
      'Rio de Janeiro',
      'Belo Horizonte',
      'Salvador'
    ],
    correctAnswer: 2,
    explanation: 'Belo Horizonte é a capital de Minas Gerais, fundada em 1897.',
    subject: 'geografia',
    difficulty: 'facil',
    institution: 'enem'
  },
  {
    id: '4',
    text: 'Qual é o processo de divisão celular que resulta em duas células filhas idênticas?',
    options: [
      'Mitose',
      'Meiose',
      'Fecundação',
      'Fertilização'
    ],
    correctAnswer: 0,
    explanation: 'A mitose é o processo de divisão celular que resulta em duas células filhas geneticamente idênticas.',
    subject: 'biologia',
    difficulty: 'medio',
    institution: 'enem'
  },
  {
    id: '5',
    text: 'Qual é a unidade de medida da força no Sistema Internacional?',
    options: [
      'Joule',
      'Watt',
      'Newton',
      'Pascal'
    ],
    correctAnswer: 2,
    explanation: 'A unidade de medida da força no SI é o Newton (N), definido como 1 N = 1 kg·m/s².',
    subject: 'fisica',
    difficulty: 'medio',
    institution: 'enem'
  }
]

export function QuizGame({ config, onFinish, onBack }: QuizGameProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    timeRemaining: config.timeLimit,
    isPaused: false,
    isFinished: false,
    score: 0,
    startTime: Date.now()
  })

  const [showExplanation, setShowExplanation] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  // Inicializar questões
  useEffect(() => {
    // Em produção, buscar questões da API baseado na configuração
    const filteredQuestions = sampleQuestions
      .filter(q => q.subject === config.subject)
      .filter(q => q.difficulty === config.difficulty)
      .filter(q => q.institution === config.institution)
      .slice(0, config.questionCount)

    // Se não houver questões suficientes, usar todas disponíveis
    const finalQuestions = filteredQuestions.length >= config.questionCount 
      ? filteredQuestions 
      : sampleQuestions.slice(0, config.questionCount)

    setQuestions(finalQuestions)
    setQuizState(prev => ({
      ...prev,
      answers: new Array(finalQuestions.length).fill(null)
    }))
  }, [config])

  // Timer
  useEffect(() => {
    if (quizState.isPaused || quizState.isFinished) return

    const timer = setInterval(() => {
      setQuizState(prev => {
        if (prev.timeRemaining <= 1) {
          finishQuiz()
          return prev
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quizState.isPaused, quizState.isFinished])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return // Já respondeu
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...quizState.answers]
    newAnswers[quizState.currentQuestion] = selectedAnswer

    setQuizState(prev => ({
      ...prev,
      answers: newAnswers,
      currentQuestion: prev.currentQuestion + 1
    }))

    setSelectedAnswer(null)
    setShowExplanation(false)

    // Verificar se é a última questão
    if (quizState.currentQuestion === questions.length - 1) {
      finishQuiz()
    }
  }

  const handlePreviousQuestion = () => {
    if (quizState.currentQuestion === 0) return

    setQuizState(prev => ({
      ...prev,
      currentQuestion: prev.currentQuestion - 1
    }))

    setSelectedAnswer(quizState.answers[quizState.currentQuestion - 1])
    setShowExplanation(false)
  }

  const togglePause = () => {
    setQuizState(prev => ({ ...prev, isPaused: !prev.isPaused }))
  }

  const finishQuiz = () => {
    const endTime = Date.now()
    const timeSpent = Math.floor((endTime - quizState.startTime) / 1000)
    
    let correctAnswers = 0
    quizState.answers.forEach((answer, index) => {
      if (answer === questions[index]?.correctAnswer) {
        correctAnswers++
      }
    })

    const score = Math.round((correctAnswers / questions.length) * 100)

    const results: QuizResults = {
      config,
      score,
      totalQuestions: questions.length,
      correctAnswers,
      timeSpent,
      answers: quizState.answers,
      questions
    }

    setQuizState(prev => ({ ...prev, isFinished: true, endTime }))
    onFinish(results)
  }

  const currentQuestion = questions[quizState.currentQuestion]
  const progress = (quizState.currentQuestion / questions.length) * 100
  const isLastQuestion = quizState.currentQuestion === questions.length - 1

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Carregando questões...</p>
        </div>
      </div>
    )
  }

  if (quizState.isFinished) {
    return null // Será gerenciado pelo componente pai
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700/50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-gray-400 hover:text-white hover:bg-gray-700/50"
            >
              <Home className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Target className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">
                  {quizState.currentQuestion + 1} de {questions.length}
                </span>
              </div>

              <Button
                onClick={togglePause}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-700/50"
              >
                {quizState.isPaused ? (
                  <Play className="w-4 h-4" />
                ) : (
                  <Pause className="w-4 h-4" />
                )}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-400" />
              <span className={cn(
                'text-lg font-mono font-bold',
                quizState.timeRemaining <= 30 ? 'text-red-400' : 'text-white'
              )}>
                {formatTime(quizState.timeRemaining)}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={quizState.currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Question */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {quizState.currentQuestion + 1}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Questão {quizState.currentQuestion + 1}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {currentQuestion.subject} • {currentQuestion.difficulty} • {currentQuestion.institution}
                  </p>
                </div>
              </div>

              <p className="text-lg text-gray-100 leading-relaxed mb-6">
                {currentQuestion.text}
              </p>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                    className={cn(
                      'w-full p-4 text-left rounded-xl border-2 transition-all duration-200',
                      'hover:scale-[1.02] hover:shadow-lg',
                      selectedAnswer === null && 'hover:border-blue-500/50 hover:bg-gray-700/50',
                      selectedAnswer === index && 'border-blue-500 bg-blue-500/10',
                      selectedAnswer !== null && selectedAnswer !== index && 'opacity-50 cursor-not-allowed'
                    )}
                    whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-8 h-8 rounded-lg border-2 flex items-center justify-center text-sm font-bold',
                        selectedAnswer === index
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-gray-600 text-gray-400'
                      )}>
                        {String.fromCharCode(65 + index)} {/* A, B, C, D */}
                      </div>
                      <span className="text-gray-100">{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Explanation */}
              {selectedAnswer !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6 p-4 bg-gray-700/50 rounded-xl border border-gray-600/50"
                >
                  <div className="flex items-center gap-2 mb-3">
                    {selectedAnswer === currentQuestion.correctAnswer ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <X className="w-5 h-5 text-red-400" />
                    )}
                    <span className={cn(
                      'font-semibold',
                      selectedAnswer === currentQuestion.correctAnswer ? 'text-green-400' : 'text-red-400'
                    )}>
                      {selectedAnswer === currentQuestion.correctAnswer ? 'Correto!' : 'Incorreto'}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    <strong>Explicação:</strong> {currentQuestion.explanation}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                onClick={handlePreviousQuestion}
                disabled={quizState.currentQuestion === 0}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Anterior
              </Button>

              <div className="flex items-center gap-3">
                <Button
                  onClick={togglePause}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  {quizState.isPaused ? (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Continuar
                    </>
                  ) : (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pausar
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className={cn(
                    'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold',
                    'hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                  )}
                >
                  {isLastQuestion ? (
                    <>
                      <Trophy className="w-4 h-4 mr-2" />
                      Finalizar
                    </>
                  ) : (
                    <>
                      Próxima
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
