'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Trophy, 
  Target, 
  Clock, 
  BarChart3, 
  Check, 
  X, 
  RotateCcw, 
  Home,
  Share2,
  Download,
  Star,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface QuizResults {
  config: {
    subject: string
    difficulty: string
    institution: string
    questionCount: number
    timeLimit: number
  }
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: number
  answers: (number | null)[]
  questions: any[]
}

interface QuizResultsProps {
  results: QuizResults
  onRestart: () => void
  onBack: () => void
}

const getScoreColor = (score: number) => {
  if (score >= 90) return 'from-green-500 to-emerald-500'
  if (score >= 80) return 'from-blue-500 to-cyan-500'
  if (score >= 70) return 'from-yellow-500 to-orange-500'
  if (score >= 60) return 'from-orange-500 to-red-500'
  return 'from-red-500 to-pink-500'
}

const getScoreMessage = (score: number) => {
  if (score >= 90) return 'Excelente! Você é um mestre!'
  if (score >= 80) return 'Muito bem! Continue assim!'
  if (score >= 70) return 'Bom trabalho! Você está progredindo!'
  if (score >= 60) return 'Parabéns! Você passou!'
  return 'Não desanime! Continue estudando!'
}

const getScoreEmoji = (score: number) => {
  if (score >= 90) return '🏆'
  if (score >= 80) return '🥇'
  if (score >= 70) return '🥈'
  if (score >= 60) return '🥉'
  return '💪'
}

export function QuizResults({ results, onRestart, onBack }: QuizResultsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'analysis'>('overview')

  const accuracy = Math.round((results.correctAnswers / results.totalQuestions) * 100)
  const averageTimePerQuestion = Math.round(results.timeSpent / results.totalQuestions)
  const unansweredQuestions = results.answers.filter(answer => answer === null).length

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: <Trophy className="w-4 h-4" /> },
    { id: 'details', label: 'Detalhes', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'analysis', label: 'Análise', icon: <TrendingUp className="w-4 h-4" /> }
  ]

  const handleShare = () => {
    const text = `🎯 Acabei de completar um quiz de ${results.config.subject} no QuizMaster!\n📊 Pontuação: ${results.score}%\n✅ ${results.correctAnswers}/${results.totalQuestions} corretas\n⏱️ Tempo: ${Math.floor(results.timeSpent / 60)}:${(results.timeSpent % 60).toString().padStart(2, '0')}`
    
    if (navigator.share) {
      navigator.share({
        title: 'Meus Resultados do Quiz',
        text: text,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(text)
      // Aqui você pode mostrar um toast de "Copiado para a área de transferência"
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700/50 p-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-4xl"
          >
            {getScoreEmoji(results.score)}
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-2">
            Quiz Concluído!
          </h1>
          <p className="text-gray-300 text-lg">
            {getScoreMessage(results.score)}
          </p>
        </div>
      </div>

      {/* Score Display */}
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 rounded-3xl p-8 border border-gray-700/50 text-center mb-8"
        >
          <div className="mb-6">
            <div className={cn(
              'text-8xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-4',
              getScoreColor(results.score)
            )}>
              {results.score}%
            </div>
            <p className="text-gray-300 text-lg">
              {results.correctAnswers} de {results.totalQuestions} questões corretas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">{accuracy}%</div>
              <div className="text-gray-400 text-sm">Precisão</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">
                {Math.floor(results.timeSpent / 60)}:{(results.timeSpent % 60).toString().padStart(2, '0')}
              </div>
              <div className="text-gray-400 text-sm">Tempo Total</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">{averageTimePerQuestion}s</div>
              <div className="text-gray-400 text-sm">Tempo/Questão</div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 overflow-hidden mb-8">
          <div className="flex border-b border-gray-700/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-200',
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-400" />
                        Respostas Corretas
                      </h3>
                      <div className="text-3xl font-bold text-green-400 mb-2">
                        {results.correctAnswers}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {Math.round((results.correctAnswers / results.totalQuestions) * 100)}% de acerto
                      </div>
                    </div>

                    <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <X className="w-5 h-5 text-red-400" />
                        Respostas Incorretas
                      </h3>
                      <div className="text-3xl font-bold text-red-400 mb-2">
                        {results.totalQuestions - results.correctAnswers}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {Math.round(((results.totalQuestions - results.correctAnswers) / results.totalQuestions) * 100)}% de erro
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-400" />
                      Desempenho por Dificuldade
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Dificuldade:</span>
                        <span className="text-white font-medium capitalize">{results.config.difficulty}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Instituição:</span>
                        <span className="text-white font-medium capitalize">{results.config.institution}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Matéria:</span>
                        <span className="text-white font-medium capitalize">{results.config.subject}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Resumo das Questões
                  </h3>
                  
                  <div className="space-y-3">
                    {results.questions.map((question, index) => {
                      const userAnswer = results.answers[index]
                      const isCorrect = userAnswer === question.correctAnswer
                      const isAnswered = userAnswer !== null

                      return (
                        <div
                          key={index}
                          className={cn(
                            'p-4 rounded-xl border-2 transition-all duration-200',
                            isCorrect ? 'border-green-500/50 bg-green-500/10' :
                            isAnswered ? 'border-red-500/50 bg-red-500/10' :
                            'border-gray-600/50 bg-gray-700/30'
                          )}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold',
                                isCorrect ? 'bg-green-500 text-white' :
                                isAnswered ? 'bg-red-500 text-white' :
                                'bg-gray-600 text-gray-300'
                              )}>
                                {index + 1}
                              </div>
                              <span className="text-white font-medium">
                                Questão {index + 1}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {isCorrect ? (
                                <Check className="w-5 h-5 text-green-400" />
                              ) : isAnswered ? (
                                <X className="w-5 h-5 text-red-400" />
                              ) : (
                                <span className="text-gray-400 text-sm">Não respondida</span>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-gray-300 text-sm mb-2">
                            {question.text}
                          </p>
                          
                          <div className="text-xs text-gray-400">
                            <span className="capitalize">{question.subject}</span> • 
                            <span className="capitalize"> {question.difficulty}</span> • 
                            <span className="capitalize"> {question.institution}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {activeTab === 'analysis' && (
                <motion.div
                  key="analysis"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                        Estatísticas de Tempo
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Tempo total:</span>
                          <span className="text-white font-medium">
                            {Math.floor(results.timeSpent / 60)}:{(results.timeSpent % 60).toString().padStart(2, '0')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Tempo por questão:</span>
                          <span className="text-white font-medium">{averageTimePerQuestion}s</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Questões não respondidas:</span>
                          <span className="text-white font-medium">{unansweredQuestions}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-400" />
                        Recomendações
                      </h3>
                      <div className="space-y-3 text-sm text-gray-300">
                        {results.score >= 90 && (
                          <p>🎯 Continue assim! Você domina este conteúdo.</p>
                        )}
                        {results.score >= 80 && results.score < 90 && (
                          <p>📚 Revise os tópicos onde errou para atingir a excelência.</p>
                        )}
                        {results.score >= 70 && results.score < 80 && (
                          <p>💡 Bom trabalho! Foque nos conceitos mais difíceis.</p>
                        )}
                        {results.score >= 60 && results.score < 70 && (
                          <p>📖 Continue estudando! Você está no caminho certo.</p>
                        )}
                        {results.score < 60 && (
                          <p>🚀 Não desanime! Pratique mais e revise o conteúdo.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onRestart}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-3 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Jogar Novamente
          </Button>

          <Button
            onClick={handleShare}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white px-8 py-3"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Compartilhar
          </Button>

          <Button
            onClick={onBack}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white px-8 py-3"
          >
            <Home className="w-5 h-5 mr-2" />
            Voltar ao Início
          </Button>
        </div>
      </div>
    </div>
  )
}
