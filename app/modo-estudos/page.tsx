'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Book, 
  Clock, 
  Target, 
  BarChart3, 
  Settings, 
  Play, 
  Pause, 
  RotateCcw,
  Trophy,
  Brain,
  Zap,
  Star,
  ChevronRight,
  BookOpen,
  Calculator,
  Globe,
  Atom,
  Palette,
  Music,
  Users,
  Heart,
  Lightbulb,
  CheckCircle,
  XCircle,
  TrendingUp,
  Award,
  Timer,
  Focus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

// Dados das matérias
const SUBJECTS = [
  {
    id: 'matematica',
    name: 'Matemática',
    icon: Calculator,
    color: 'from-blue-500 to-cyan-500',
    description: 'Álgebra, Geometria, Estatística',
    questions: 1250,
    difficulty: { easy: 40, medium: 35, hard: 25 }
  },
  {
    id: 'portugues',
    name: 'Português',
    icon: BookOpen,
    color: 'from-green-500 to-emerald-500',
    description: 'Gramática, Literatura, Redação',
    questions: 980,
    difficulty: { easy: 45, medium: 30, hard: 25 }
  },
  {
    id: 'historia',
    name: 'História',
    icon: Globe,
    color: 'from-orange-500 to-red-500',
    description: 'Brasil, Mundo, Contemporânea',
    questions: 750,
    difficulty: { easy: 50, medium: 30, hard: 20 }
  },
  {
    id: 'geografia',
    name: 'Geografia',
    icon: Globe,
    color: 'from-teal-500 to-green-500',
    description: 'Física, Humana, Cartografia',
    questions: 680,
    difficulty: { easy: 45, medium: 35, hard: 20 }
  },
  {
    id: 'fisica',
    name: 'Física',
    icon: Atom,
    color: 'from-purple-500 to-pink-500',
    description: 'Mecânica, Eletricidade, Óptica',
    questions: 890,
    difficulty: { easy: 30, medium: 40, hard: 30 }
  },
  {
    id: 'quimica',
    name: 'Química',
    icon: Atom,
    color: 'from-yellow-500 to-orange-500',
    description: 'Orgânica, Inorgânica, Físico-química',
    questions: 720,
    difficulty: { easy: 35, medium: 40, hard: 25 }
  },
  {
    id: 'biologia',
    name: 'Biologia',
    icon: Heart,
    color: 'from-green-500 to-teal-500',
    description: 'Genética, Ecologia, Anatomia',
    questions: 850,
    difficulty: { easy: 40, medium: 35, hard: 25 }
  },
  {
    id: 'filosofia',
    name: 'Filosofia',
    icon: Lightbulb,
    color: 'from-indigo-500 to-purple-500',
    description: 'Ética, Política, Metafísica',
    questions: 420,
    difficulty: { easy: 50, medium: 30, hard: 20 }
  },
  {
    id: 'sociologia',
    name: 'Sociologia',
    icon: Users,
    color: 'from-pink-500 to-rose-500',
    description: 'Sociedade, Cultura, Política',
    questions: 380,
    difficulty: { easy: 55, medium: 30, hard: 15 }
  },
  {
    id: 'artes',
    name: 'Artes',
    icon: Palette,
    color: 'from-violet-500 to-purple-500',
    description: 'História da Arte, Movimentos',
    questions: 290,
    difficulty: { easy: 60, medium: 25, hard: 15 }
  }
]

const DIFFICULTY_LEVELS = [
  { id: 'easy', name: 'Fácil', color: 'text-green-400', bgColor: 'bg-green-500/20' },
  { id: 'medium', name: 'Médio', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' },
  { id: 'hard', name: 'Difícil', color: 'text-red-400', bgColor: 'bg-red-500/20' }
]

export default function ModoEstudosPage() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>(['easy', 'medium'])
  const [studyTime, setStudyTime] = useState([30])
  const [questionsCount, setQuestionsCount] = useState([20])
  const [isTimerMode, setIsTimerMode] = useState(true)
  const [showExplanations, setShowExplanations] = useState(true)
  const [focusMode, setFocusMode] = useState(false)
  const [currentSession, setCurrentSession] = useState<any>(null)
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    timeSpent: 0,
    streak: 0,
    maxStreak: 0
  })

  const toggleSubject = (subjectId: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subjectId) 
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    )
  }

  const toggleDifficulty = (difficultyId: string) => {
    setSelectedDifficulty(prev => 
      prev.includes(difficultyId) 
        ? prev.filter(id => id !== difficultyId)
        : [...prev, difficultyId]
    )
  }

  const startStudySession = () => {
    if (selectedSubjects.length === 0) {
      alert('Selecione pelo menos uma matéria!')
      return
    }
    if (selectedDifficulty.length === 0) {
      alert('Selecione pelo menos um nível de dificuldade!')
      return
    }

    setCurrentSession({
      subjects: selectedSubjects,
      difficulty: selectedDifficulty,
      timeLimit: isTimerMode ? studyTime[0] * 60 : null,
      questionsLimit: questionsCount[0],
      startTime: Date.now()
    })
  }

  const getTotalQuestions = () => {
    return selectedSubjects.reduce((total, subjectId) => {
      const subject = SUBJECTS.find(s => s.id === subjectId)
      return total + (subject?.questions || 0)
    }, 0)
  }

  if (currentSession) {
    return <StudySessionView session={currentSession} onEnd={() => setCurrentSession(null)} />
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mr-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                Modo Estudos
              </h1>
              <p className="text-gray-400 text-lg mt-2">
                Configure sua sessão de estudos personalizada
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Seleção de Matérias */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <BookOpen className="w-5 h-5 mr-2 text-cyan-400" />
                    Selecione as Matérias
                  </CardTitle>
                  <CardDescription>
                    Escolha as disciplinas que deseja estudar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SUBJECTS.map((subject, index) => {
                      const Icon = subject.icon
                      const isSelected = selectedSubjects.includes(subject.id)
                      
                      return (
                        <motion.div
                          key={subject.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card
                            className={cn(
                              "cursor-pointer transition-all duration-300 border-2",
                              isSelected
                                ? "border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/20"
                                : "border-gray-700/50 hover:border-gray-600 bg-gray-800/30"
                            )}
                            onClick={() => toggleSubject(subject.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center mb-3">
                                <div className={cn(
                                  "w-10 h-10 rounded-lg flex items-center justify-center mr-3",
                                  `bg-gradient-to-r ${subject.color}`
                                )}>
                                  <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-white">{subject.name}</h3>
                                  <p className="text-sm text-gray-400">{subject.description}</p>
                                </div>
                                {isSelected && (
                                  <CheckCircle className="w-5 h-5 text-cyan-400" />
                                )}
                              </div>
                              
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">
                                  {subject.questions.toLocaleString()} questões
                                </span>
                                <div className="flex space-x-1">
                                  <Badge className="bg-green-500/20 text-green-400 text-xs">
                                    {subject.difficulty.easy}%
                                  </Badge>
                                  <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">
                                    {subject.difficulty.medium}%
                                  </Badge>
                                  <Badge className="bg-red-500/20 text-red-400 text-xs">
                                    {subject.difficulty.hard}%
                                  </Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Configurações */}
          <div className="space-y-6">
            {/* Nível de Dificuldade */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Target className="w-5 h-5 mr-2 text-purple-400" />
                    Dificuldade
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {DIFFICULTY_LEVELS.map((level) => {
                    const isSelected = selectedDifficulty.includes(level.id)
                    
                    return (
                      <div
                        key={level.id}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all",
                          isSelected ? level.bgColor : "hover:bg-gray-800/50"
                        )}
                        onClick={() => toggleDifficulty(level.id)}
                      >
                        <span className={cn("font-medium", isSelected ? level.color : "text-gray-300")}>
                          {level.name}
                        </span>
                        {isSelected && <CheckCircle className={cn("w-4 h-4", level.color)} />}
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </motion.div>

            {/* Configurações de Tempo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Clock className="w-5 h-5 mr-2 text-cyan-400" />
                    Configurações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Modo Timer */}
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-white font-medium">Modo Timer</label>
                      <p className="text-sm text-gray-400">Limite de tempo por sessão</p>
                    </div>
                    <Switch
                      checked={isTimerMode}
                      onCheckedChange={setIsTimerMode}
                    />
                  </div>

                  {/* Tempo de Estudo */}
                  {isTimerMode && (
                    <div>
                      <label className="text-white font-medium mb-3 block">
                        Tempo: {studyTime[0]} minutos
                      </label>
                      <Slider
                        value={studyTime}
                        onValueChange={setStudyTime}
                        max={120}
                        min={5}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>5 min</span>
                        <span>120 min</span>
                      </div>
                    </div>
                  )}

                  {/* Número de Questões */}
                  <div>
                    <label className="text-white font-medium mb-3 block">
                      Questões: {questionsCount[0]}
                    </label>
                    <Slider
                      value={questionsCount}
                      onValueChange={setQuestionsCount}
                      max={100}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>5</span>
                      <span>100</span>
                    </div>
                  </div>

                  {/* Outras Configurações */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-white font-medium">Explicações</label>
                        <p className="text-sm text-gray-400">Mostrar explicações após cada questão</p>
                      </div>
                      <Switch
                        checked={showExplanations}
                        onCheckedChange={setShowExplanations}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-white font-medium">Modo Foco</label>
                        <p className="text-sm text-gray-400">Interface minimalista</p>
                      </div>
                      <Switch
                        checked={focusMode}
                        onCheckedChange={setFocusMode}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Resumo e Iniciar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <BarChart3 className="w-5 h-5 mr-2 text-green-400" />
                    Resumo da Sessão
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Matérias selecionadas:</span>
                      <span className="text-white font-medium">{selectedSubjects.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Total de questões:</span>
                      <span className="text-white font-medium">{getTotalQuestions().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Dificuldades:</span>
                      <span className="text-white font-medium">{selectedDifficulty.length}</span>
                    </div>
                    {isTimerMode && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Tempo limite:</span>
                        <span className="text-white font-medium">{studyTime[0]} min</span>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={startStudySession}
                    disabled={selectedSubjects.length === 0}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Iniciar Sessão de Estudos
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente da sessão de estudos
function StudySessionView({ session, onEnd }: { session: any, onEnd: () => void }) {
  const [timeLeft, setTimeLeft] = useState(session.timeLimit || 0)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [isPlaying, setIsPlaying] = useState(true)
  const [stats, setStats] = useState({
    correct: 0,
    incorrect: 0,
    streak: 0,
    maxStreak: 0
  })

  useEffect(() => {
    if (!isPlaying || !session.timeLimit) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsPlaying(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isPlaying, session.timeLimit])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = session.timeLimit ? ((session.timeLimit - timeLeft) / session.timeLimit) * 100 : 0

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header da Sessão */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-gray-700/50"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                <Focus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Sessão de Estudos</h1>
                <p className="text-gray-400">Questão {currentQuestion} de {session.questionsLimit}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {session.timeLimit && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{formatTime(timeLeft)}</div>
                  <div className="text-sm text-gray-400">Tempo restante</div>
                </div>
              )}
              
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                variant="outline"
                size="sm"
                className="border-gray-600"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              
              <Button
                onClick={onEnd}
                variant="outline"
                size="sm"
                className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
              >
                Finalizar
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          {session.timeLimit && (
            <div className="mb-4">
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-green-400">{stats.correct}</div>
              <div className="text-sm text-gray-400">Corretas</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-red-400">{stats.incorrect}</div>
              <div className="text-sm text-gray-400">Incorretas</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-yellow-400">{stats.streak}</div>
              <div className="text-sm text-gray-400">Sequência</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-purple-400">{stats.maxStreak}</div>
              <div className="text-sm text-gray-400">Melhor</div>
            </div>
          </div>
        </motion.div>

        {/* Área da Questão */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50"
        >
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Questão em Desenvolvimento
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Esta é uma demonstração da interface do modo estudos. 
              A integração com o sistema de questões será implementada em breve.
            </p>
            
            <div className="space-y-4">
              <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 text-lg">
                Opção A - Resposta de exemplo
              </Button>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-4 text-lg">
                Opção B - Resposta de exemplo
              </Button>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 text-lg">
                Opção C - Resposta de exemplo
              </Button>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 text-lg">
                Opção D - Resposta de exemplo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

