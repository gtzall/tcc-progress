"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QuizSetup } from '@/components/quiz-setup'
import { QuizGame } from '@/components/quiz-game'
import { QuizResults } from '@/components/quiz-results'
import { Button } from '@/components/ui/button'
import { Play, Trophy, Target, Clock } from 'lucide-react'

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

  return (
    <div className="min-h-screen bg-gray-900">
      <AnimatePresence mode="wait">
        {gameState === 'setup' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gray-900 text-white"
          >
            {/* Header */}
            <div className="bg-gray-800/50 border-b border-gray-700/50 p-6">
              <div className="max-w-6xl mx-auto text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center"
                >
                  <Play className="w-12 h-12 text-white" />
                </motion.div>

                <h1 className="text-4xl font-bold text-white mb-4">
                  🎯 QuizMaster
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Escolha sua matéria, dificuldade e instituição para começar!
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                  <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white">9+</div>
                    <div className="text-gray-400 text-sm">Matérias</div>
                  </div>

                  <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white">4</div>
                    <div className="text-gray-400 text-sm">Dificuldades</div>
                  </div>

                  <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white">8+</div>
                    <div className="text-gray-400 text-sm">Instituições</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quiz Setup */}
            <div className="max-w-4xl mx-auto p-6">
              <QuizSetup onStart={handleStartQuiz} onClose={() => {}} />
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
