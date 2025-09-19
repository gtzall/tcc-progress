"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Gamepad2, 
  Trophy, 
  Brain, 
  Sparkles, 
  Rocket, 
  Play, 
  Target, 
  Star, 
  Zap, 
  Crown,
  User,
  Check,
  X,
  ArrowRight,
  BookOpen,
  BarChart3,
  Award,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  Lightbulb
} from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { useAchievements } from "@/contexts/achievements-context"
import EnhancedThemeAnimations from "@/components/enhanced-theme-animations"
import SmartNavigation from "@/components/smart-navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { APP_CONFIG, FEATURES } from "@/lib/config"
import { format } from "@/lib/utils"

// Demo quiz questions
const demoQuestions = [
  {
    question: "Qual é a capital do Brasil?",
    options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
    correct: 2,
    explanation: "Brasília é a capital federal do Brasil desde 1960."
  },
  {
    question: "Quem escreveu 'Dom Casmurro'?",
    options: ["Machado de Assis", "José de Alencar", "Eça de Queirós", "Graciliano Ramos"],
    correct: 0,
    explanation: "Dom Casmurro é uma obra de Machado de Assis, publicada em 1899."
  },
  {
    question: "Qual é o maior planeta do sistema solar?",
    options: ["Terra", "Marte", "Júpiter", "Saturno"],
    correct: 2,
    explanation: "Júpiter é o maior planeta do sistema solar."
  }
]

export default function HomePage() {
  const { currentTheme, themeData } = useTheme()
  const { gameStats, updateProgress, achievements } = useAchievements()
  const { toast } = useToast()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [showDemo, setShowDemo] = useState(false)
  const [quizStartTime, setQuizStartTime] = useState<number>(0)
  const [newlyUnlockedAchievements, setNewlyUnlockedAchievements] = useState<string[]>([])

  // Stats for display
  const stats = [
    { label: "Quizzes Completados", value: gameStats.totalQuizzes.toString(), icon: <CheckCircle className="h-6 w-6" /> },
    { label: "Pontuação Total", value: format.number.compact(gameStats.totalScore), icon: <Star className="h-6 w-6" /> },
    { label: "Conquistas", value: gameStats.achievements.length.toString(), icon: <Award className="h-6 w-6" /> },
    { label: "Nível Atual", value: gameStats.currentLevel.toString(), icon: <TrendingUp className="h-6 w-6" /> }
  ]

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(answerIndex)
    
    const isCorrect = answerIndex === demoQuestions[currentQuestion].correct
    if (isCorrect) {
      setScore(score + 1)
    }
    
    setShowResult(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < demoQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      // Quiz completed
      const quizTime = Date.now() - quizStartTime
      const isPerfectScore = score === demoQuestions.length
      
      // Update game stats
      updateProgress({
        demoQuizzes: gameStats.demoQuizzes + 1,
        demoPerfectScores: isPerfectScore ? gameStats.demoPerfectScores + 1 : gameStats.demoPerfectScores,
        fastestQuizTime: gameStats.fastestQuizTime === 0 || quizTime < gameStats.fastestQuizTime ? quizTime : gameStats.fastestQuizTime,
        totalScore: gameStats.totalScore + (score * APP_CONFIG.game.pointsPerCorrectAnswer),
        totalCorrectAnswers: gameStats.totalCorrectAnswers + score,
        totalWrongAnswers: gameStats.totalWrongAnswers + (demoQuestions.length - score)
      })

      // Check for new achievements
      const unlockedAchievements = achievements.filter(a => 
        a.unlocked && !gameStats.achievements.includes(a.id)
      )
      
      if (unlockedAchievements.length > 0) {
        setNewlyUnlockedAchievements(unlockedAchievements.map(a => a.name))
        unlockedAchievements.forEach(achievement => {
          toast({
            title: "Conquista Desbloqueada! 🏆",
            description: `${achievement.name}: ${achievement.description}`,
            variant: "default",
          })
        })
      }

      setShowDemo(false)
      setCurrentQuestion(0)
      setSelectedAnswer(null)
      setShowResult(false)
      setScore(0)
      setQuizStartTime(0)
    }
  }

  const startDemo = () => {
    setShowDemo(true)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizStartTime(Date.now())
    setNewlyUnlockedAchievements([])
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative transition-all duration-1000`}>
      <EnhancedThemeAnimations theme={currentTheme} />
      
      {/* Header with Smart Navigation */}


      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4 mr-2" />
                Plataforma de Quiz Mais Avançada do Brasil
              </div>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-8 text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Domine seus Estudos com
              <span className="block text-6xl md:text-8xl mt-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {APP_CONFIG.name}
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {APP_CONFIG.description}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href={APP_CONFIG.routes.game}>
                <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  <Play className="h-6 w-6 mr-2" />
                  Começar a Jogar
                </Button>
              </Link>
              <Button 
                onClick={startDemo}
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-semibold"
              >
                <Gamepad2 className="h-6 w-6 mr-2" />
                Experimentar Demo
              </Button>
            </motion.div>

            {/* Stats Section */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300">
                  <div className="text-cyan-400 mb-2 flex justify-center">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Por que escolher o <span className="text-cyan-400">{APP_CONFIG.name}</span>?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Nossa plataforma oferece recursos exclusivos para maximizar seu aprendizado
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURES.map((feature, index) => {
                const IconComponent = iconMap[feature.icon as keyof typeof iconMap]
                return (
                  <motion.div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-cyan-400 mb-4">{IconComponent}</div>
                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <AnimatePresence>
          {showDemo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">Demo Quiz</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDemo(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                {currentQuestion < demoQuestions.length ? (
                  <div>
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-400">
                          Questão {currentQuestion + 1} de {demoQuestions.length}
                        </span>
                        <span className="text-sm text-cyan-400">
                          Pontuação: {score}/{currentQuestion + 1}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${((currentQuestion + 1) / demoQuestions.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <h4 className="text-xl font-semibold text-white mb-6 leading-relaxed">
                      {demoQuestions[currentQuestion].question}
                    </h4>

                    <div className="space-y-3 mb-6">
                      {demoQuestions[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          disabled={selectedAnswer !== null}
                          className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                            selectedAnswer === null
                              ? 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-cyan-500/50'
                              : selectedAnswer === index
                              ? index === demoQuestions[currentQuestion].correct
                                ? 'border-green-500 bg-green-500/20'
                                : 'border-red-500 bg-red-500/20'
                              : index === demoQuestions[currentQuestion].correct
                              ? 'border-green-500 bg-green-500/20'
                              : 'border-white/20 bg-white/5'
                          }`}
                        >
                          <span className="text-white font-medium">{option}</span>
                        </button>
                      ))}
                    </div>

                    {showResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 rounded-lg bg-white/5 border border-white/10"
                      >
                        <div className="flex items-center mb-2">
                          {selectedAnswer === demoQuestions[currentQuestion].correct ? (
                            <Check className="h-5 w-5 text-green-400 mr-2" />
                          ) : (
                            <X className="h-5 w-5 text-red-400 mr-2" />
                          )}
                          <span className={`font-semibold ${
                            selectedAnswer === demoQuestions[currentQuestion].correct 
                              ? 'text-green-400' 
                              : 'text-red-400'
                          }`}>
                            {selectedAnswer === demoQuestions[currentQuestion].correct 
                              ? 'Correto!' 
                              : 'Incorreto!'}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          {demoQuestions[currentQuestion].explanation}
                        </p>
                      </motion.div>
                    )}

                    {showResult && (
                      <Button
                        onClick={handleNextQuestion}
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold"
                      >
                        {currentQuestion < demoQuestions.length - 1 ? 'Próxima Questão' : 'Ver Resultado Final'}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-2xl font-bold text-white mb-4">Quiz Concluído!</h3>
                    <p className="text-gray-300 mb-6">
                      Você acertou {score} de {demoQuestions.length} questões.
                    </p>
                    <div className="text-4xl font-bold text-cyan-400 mb-6">
                      {format.number.percentage(score / demoQuestions.length)}
                    </div>
                    
                    {/* Show newly unlocked achievements */}
                    {newlyUnlockedAchievements.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg"
                      >
                        <h4 className="text-lg font-semibold text-yellow-400 mb-2">🏆 Conquistas Desbloqueadas!</h4>
                        <ul className="text-sm text-yellow-300">
                          {newlyUnlockedAchievements.map((achievement, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Trophy className="h-4 w-4" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                    
                    <Button
                      onClick={() => setShowDemo(false)}
                      className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold"
                    >
                      Fechar Demo
                    </Button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/20 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Gamepad2 className="h-8 w-8 text-cyan-400" />
                <span className="text-2xl font-bold text-white">{APP_CONFIG.name}</span>
              </div>
              <p className="text-gray-400">
                {APP_CONFIG.description}
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href={APP_CONFIG.routes.game} className="hover:text-cyan-400 transition-colors">Jogar</Link></li>
                <li><Link href={APP_CONFIG.routes.library} className="hover:text-cyan-400 transition-colors">Biblioteca</Link></li>
                <li><Link href={APP_CONFIG.routes.achievements} className="hover:text-cyan-400 transition-colors">Conquistas</Link></li>
                <li><Link href={APP_CONFIG.routes.stats} className="hover:text-cyan-400 transition-colors">Estatísticas</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-cyan-400 transition-colors">Central de Ajuda</Link></li>
                <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contato</Link></li>
                <li><Link href="/faq" className="hover:text-cyan-400 transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacidade</Link></li>
                <li><Link href="/terms" className="hover:text-cyan-400 transition-colors">Termos de Uso</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} {APP_CONFIG.name}. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Mapeamento de ícones para as features
const iconMap = {
  Brain: <Brain className="h-8 w-8" />,
  Trophy: <Trophy className="h-8 w-8" />,
  BarChart3: <BarChart3 className="h-8 w-8" />,
  Users: <Users className="h-8 w-8" />,
  Clock: <Clock className="h-8 w-8" />,
  Lightbulb: <Lightbulb className="h-8 w-8" />
}
