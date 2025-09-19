'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QuizSetup } from '@/components/quiz-setup'
import { QuizGame } from '@/components/quiz-game'
import { QuizResults } from '@/components/quiz-results'
import { QuickActivities } from '@/components/quick-activities'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Play, Trophy, Target, Clock, Zap, Settings } from 'lucide-react'

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
                  QuizMaster
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Escolha como você quer jogar!
                </p>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto p-6">
              <Tabs defaultValue="quick" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 border border-gray-700/50">
                  <TabsTrigger 
                    value="quick" 
                    className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    <Zap className="w-4 h-4" />
                    Atividades Rápidas
                  </TabsTrigger>
                  <TabsTrigger 
                    value="custom" 
                    className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                  >
                    <Settings className="w-4 h-4" />
                    Configurar Quiz
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="quick" className="space-y-6">
                  <QuickActivities onActivitySelect={handleStartQuiz} />
                </TabsContent>

                <TabsContent value="custom" className="space-y-6">
                  <QuizSetup onStart={handleStartQuiz} onClose={() => {}} />
                </TabsContent>
              </Tabs>
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
