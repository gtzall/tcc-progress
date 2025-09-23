'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { 
  BookOpen, 
  Target, 
  Clock, 
  Settings, 
  Play,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Award,
  Lightbulb,
  Brain,
  Zap,
  Star,
  Trophy,
  Calendar,
  Timer,
  Users,
  Flame,
  Eye,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Subject {
  id: string
  name: string
  icon: string
  color: string
  gradient: string
  questions: number
  difficulty: {
    easy: number
    medium: number
    hard: number
  }
  selected: boolean
  performance: {
    accuracy: number
    averageTime: number
    totalQuestions: number
    correctAnswers: number
    streak: number
    improvement: number
  }
}

interface StudySession {
  subjects: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  timeLimit: number
  questionCount: number
  timerMode: boolean
  explanations: boolean
  focusMode: boolean
}

interface PerformanceData {
  overall: {
    accuracy: number
    totalQuestions: number
    correctAnswers: number
    studyTime: number
    streak: number
    level: number
    xp: number
  }
  bySubject: Record<string, {
    accuracy: number
    improvement: number
    weakPoints: string[]
    strongPoints: string[]
    recommendations: string[]
  }>
  recentSessions: Array<{
    date: string
    subjects: string[]
    score: number
    duration: number
    questions: number
  }>
}

export default function StudyModePage() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [studySession, setStudySession] = useState<StudySession>({
    subjects: [],
    difficulty: 'medium',
    timeLimit: 30,
    questionCount: 20,
    timerMode: true,
    explanations: true,
    focusMode: false
  })
  const [activeTab, setActiveTab] = useState('configure')
  const [sessionStarted, setSessionStarted] = useState(false)

  // Mock performance data
  const [performanceData] = useState<PerformanceData>({
    overall: {
      accuracy: 78,
      totalQuestions: 450,
      correctAnswers: 351,
      studyTime: 1250, // minutes
      streak: 12,
      level: 15,
      xp: 2850
    },
    bySubject: {
      matematica: {
        accuracy: 85,
        improvement: 12,
        weakPoints: ['Geometria', 'Funções Logarítmicas'],
        strongPoints: ['Álgebra', 'Estatística'],
        recommendations: ['Pratique mais exercícios de geometria espacial', 'Revise propriedades dos logaritmos']
      },
      portugues: {
        accuracy: 72,
        improvement: -5,
        weakPoints: ['Interpretação de Texto', 'Sintaxe'],
        strongPoints: ['Gramática', 'Literatura'],
        recommendations: ['Leia mais textos diversos', 'Pratique análise sintática']
      },
      historia: {
        accuracy: 81,
        improvement: 8,
        weakPoints: ['História Contemporânea'],
        strongPoints: ['História do Brasil', 'História Antiga'],
        recommendations: ['Estude os eventos do século XX', 'Foque nas duas guerras mundiais']
      }
    },
    recentSessions: [
      { date: '2025-09-22', subjects: ['Matemática', 'Português'], score: 85, duration: 25, questions: 20 },
      { date: '2025-09-21', subjects: ['História'], score: 78, duration: 15, questions: 15 },
      { date: '2025-09-20', subjects: ['Matemática', 'Física'], score: 92, duration: 30, questions: 25 }
    ]
  })

  const subjects: Subject[] = [
    {
      id: 'matematica',
      name: 'Matemática',
      icon: '📐',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
      questions: 1250,
      difficulty: { easy: 400, medium: 500, hard: 350 },
      selected: selectedSubjects.includes('matematica'),
      performance: {
        accuracy: 85,
        averageTime: 45,
        totalQuestions: 120,
        correctAnswers: 102,
        streak: 8,
        improvement: 12
      }
    },
    {
      id: 'portugues',
      name: 'Português',
      icon: '📚',
      color: 'from-green-500 to-emerald-500',
      gradient: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
      questions: 980,
      difficulty: { easy: 350, medium: 400, hard: 230 },
      selected: selectedSubjects.includes('portugues'),
      performance: {
        accuracy: 72,
        averageTime: 52,
        totalQuestions: 95,
        correctAnswers: 68,
        streak: 3,
        improvement: -5
      }
    },
    {
      id: 'historia',
      name: 'História',
      icon: '🏛️',
      color: 'from-orange-500 to-red-500',
      gradient: 'bg-gradient-to-br from-orange-500/20 to-red-500/20',
      questions: 750,
      difficulty: { easy: 250, medium: 300, hard: 200 },
      selected: selectedSubjects.includes('historia'),
      performance: {
        accuracy: 81,
        averageTime: 38,
        totalQuestions: 85,
        correctAnswers: 69,
        streak: 6,
        improvement: 8
      }
    },
    {
      id: 'geografia',
      name: 'Geografia',
      icon: '🌍',
      color: 'from-teal-500 to-green-500',
      gradient: 'bg-gradient-to-br from-teal-500/20 to-green-500/20',
      questions: 680,
      difficulty: { easy: 220, medium: 280, hard: 180 },
      selected: selectedSubjects.includes('geografia'),
      performance: {
        accuracy: 76,
        averageTime: 41,
        totalQuestions: 65,
        correctAnswers: 49,
        streak: 4,
        improvement: 3
      }
    },
    {
      id: 'fisica',
      name: 'Física',
      icon: '⚛️',
      color: 'from-purple-500 to-pink-500',
      gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
      questions: 890,
      difficulty: { easy: 300, medium: 350, hard: 240 },
      selected: selectedSubjects.includes('fisica'),
      performance: {
        accuracy: 69,
        averageTime: 58,
        totalQuestions: 75,
        correctAnswers: 52,
        streak: 2,
        improvement: -8
      }
    },
    {
      id: 'quimica',
      name: 'Química',
      icon: '🧪',
      color: 'from-yellow-500 to-orange-500',
      gradient: 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20',
      questions: 720,
      difficulty: { easy: 240, medium: 290, hard: 190 },
      selected: selectedSubjects.includes('quimica'),
      performance: {
        accuracy: 74,
        averageTime: 48,
        totalQuestions: 60,
        correctAnswers: 44,
        streak: 5,
        improvement: 6
      }
    },
    {
      id: 'biologia',
      name: 'Biologia',
      icon: '🧬',
      color: 'from-green-500 to-teal-500',
      gradient: 'bg-gradient-to-br from-green-500/20 to-teal-500/20',
      questions: 850,
      difficulty: { easy: 280, medium: 340, hard: 230 },
      selected: selectedSubjects.includes('biologia'),
      performance: {
        accuracy: 79,
        averageTime: 44,
        totalQuestions: 70,
        correctAnswers: 55,
        streak: 7,
        improvement: 9
      }
    },
    {
      id: 'filosofia',
      name: 'Filosofia',
      icon: '🤔',
      color: 'from-indigo-500 to-purple-500',
      gradient: 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20',
      questions: 420,
      difficulty: { easy: 140, medium: 170, hard: 110 },
      selected: selectedSubjects.includes('filosofia'),
      performance: {
        accuracy: 83,
        averageTime: 35,
        totalQuestions: 45,
        correctAnswers: 37,
        streak: 9,
        improvement: 15
      }
    },
    {
      id: 'sociologia',
      name: 'Sociologia',
      icon: '👥',
      color: 'from-pink-500 to-rose-500',
      gradient: 'bg-gradient-to-br from-pink-500/20 to-rose-500/20',
      questions: 380,
      difficulty: { easy: 130, medium: 150, hard: 100 },
      selected: selectedSubjects.includes('sociologia'),
      performance: {
        accuracy: 77,
        averageTime: 39,
        totalQuestions: 40,
        correctAnswers: 31,
        streak: 3,
        improvement: 4
      }
    },
    {
      id: 'artes',
      name: 'Artes',
      icon: '🎨',
      color: 'from-violet-500 to-purple-500',
      gradient: 'bg-gradient-to-br from-violet-500/20 to-purple-500/20',
      questions: 290,
      difficulty: { easy: 100, medium: 120, hard: 70 },
      selected: selectedSubjects.includes('artes'),
      performance: {
        accuracy: 86,
        averageTime: 32,
        totalQuestions: 30,
        correctAnswers: 26,
        streak: 11,
        improvement: 18
      }
    }
  ]

  const toggleSubject = (subjectId: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subjectId) 
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    )
  }

  const getTotalQuestions = () => {
    return subjects
      .filter(s => selectedSubjects.includes(s.id))
      .reduce((total, subject) => total + subject.questions, 0)
  }

  const getPerformanceIcon = (improvement: number) => {
    if (improvement > 5) return <ArrowUp className="w-4 h-4 text-green-400" />
    if (improvement < -5) return <ArrowDown className="w-4 h-4 text-red-400" />
    return <Minus className="w-4 h-4 text-gray-400" />
  }

  const getPerformanceColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-400'
    if (accuracy >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const startStudySession = () => {
    if (selectedSubjects.length === 0) return
    setSessionStarted(true)
    // Aqui seria implementada a lógica da sessão de estudos
  }

  if (sessionStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center"
          >
            <BookOpen className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-4xl font-bold mb-4">Questão em Desenvolvimento</h1>
          <p className="text-gray-300 mb-8">Esta é uma demonstração da interface do modo estudos. A integração com o sistema de questões será implementada em breve.</p>
          
          <div className="space-y-4">
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-semibold mb-4">Configuração da Sessão:</h3>
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <span className="text-gray-400">Matérias:</span>
                  <p className="text-white">{selectedSubjects.length} selecionadas</p>
                </div>
                <div>
                  <span className="text-gray-400">Questões:</span>
                  <p className="text-white">{studySession.questionCount}</p>
                </div>
                <div>
                  <span className="text-gray-400">Tempo:</span>
                  <p className="text-white">{studySession.timeLimit} minutos</p>
                </div>
                <div>
                  <span className="text-gray-400">Dificuldade:</span>
                  <p className="text-white capitalize">{studySession.difficulty}</p>
                </div>
              </div>
            </div>
            
            <Button
              onClick={() => setSessionStarted(false)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
            >
              Voltar às Configurações
            </Button>
          </div>
        </div>
      </div>
    )
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
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mr-4 shadow-2xl"
            >
              <BookOpen className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Configure sua sessão de estudos personalizada
              </h1>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 border border-gray-700/50">
            <TabsTrigger 
              value="configure" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Settings className="w-4 h-4" />
              Configurar
            </TabsTrigger>
            <TabsTrigger 
              value="statistics" 
              className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <BarChart3 className="w-4 h-4" />
              Estatísticas
            </TabsTrigger>
            <TabsTrigger 
              value="analysis" 
              className="flex items-center gap-2 data-[state=active]:bg-pink-600 data-[state=active]:text-white"
            >
              <Brain className="w-4 h-4" />
              Análise
            </TabsTrigger>
          </TabsList>

          <TabsContent value="configure" className="space-y-6">
            {/* Subject Selection */}
            <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-blue-400" />
                  <div>
                    <CardTitle className="text-white">Selecione as Matérias</CardTitle>
                    <CardDescription>Escolha as disciplinas que deseja estudar</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {subjects.map((subject) => (
                    <motion.div
                      key={subject.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Card
                        className={`cursor-pointer transition-all duration-300 ${
                          subject.selected
                            ? `bg-gradient-to-br ${subject.color} border-2 border-cyan-400 shadow-lg shadow-cyan-400/25`
                            : 'bg-gray-700/30 border-gray-600/50 hover:border-gray-500'
                        } ${subject.gradient}`}
                        onClick={() => toggleSubject(subject.id)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="text-3xl mb-2">{subject.icon}</div>
                          <h3 className="font-semibold text-white text-sm mb-2">{subject.name}</h3>
                          <div className="text-xs text-gray-300 space-y-1">
                            <div>{subject.questions} questões</div>
                            <div className="flex justify-center">
                              <Badge className={`text-xs ${getPerformanceColor(subject.performance.accuracy)}`}>
                                {subject.performance.accuracy}% acerto
                              </Badge>
                            </div>
                          </div>
                          {subject.selected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2"
                            >
                              <CheckCircle className="w-5 h-5 text-cyan-400" />
                            </motion.div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Configuration Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Difficulty & Settings */}
              <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Settings className="w-6 h-6 text-purple-400" />
                    <div>
                      <CardTitle className="text-white">Configurações</CardTitle>
                      <CardDescription>Personalize sua sessão de estudos</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Difficulty */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-3 block">Dificuldade</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['easy', 'medium', 'hard'] as const).map((level) => (
                        <Button
                          key={level}
                          variant={studySession.difficulty === level ? "default" : "outline"}
                          onClick={() => setStudySession(prev => ({ ...prev, difficulty: level }))}
                          className={`${
                            studySession.difficulty === level
                              ? level === 'easy' ? 'bg-green-500 hover:bg-green-600' :
                                level === 'medium' ? 'bg-yellow-500 hover:bg-yellow-600' :
                                'bg-red-500 hover:bg-red-600'
                              : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                          }`}
                        >
                          {level === 'easy' ? 'Fácil' : level === 'medium' ? 'Médio' : 'Difícil'}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Time Limit */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-gray-300">Tempo: {studySession.timeLimit} minutos</label>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={studySession.timerMode}
                          onCheckedChange={(checked) => setStudySession(prev => ({ ...prev, timerMode: checked }))}
                        />
                        <span className="text-sm text-gray-400">Modo Timer</span>
                      </div>
                    </div>
                    <Slider
                      value={[studySession.timeLimit]}
                      onValueChange={([value]) => setStudySession(prev => ({ ...prev, timeLimit: value }))}
                      max={120}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  {/* Question Count */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-3 block">Questões: {studySession.questionCount}</label>
                    <Slider
                      value={[studySession.questionCount]}
                      onValueChange={([value]) => setStudySession(prev => ({ ...prev, questionCount: value }))}
                      max={100}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  {/* Additional Options */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Explicações</span>
                      <Switch
                        checked={studySession.explanations}
                        onCheckedChange={(checked) => setStudySession(prev => ({ ...prev, explanations: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Modo Foco</span>
                      <Switch
                        checked={studySession.focusMode}
                        onCheckedChange={(checked) => setStudySession(prev => ({ ...prev, focusMode: checked }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Session Summary */}
              <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Eye className="w-6 h-6 text-cyan-400" />
                    <div>
                      <CardTitle className="text-white">Resumo da Sessão</CardTitle>
                      <CardDescription>Visão geral da sua sessão de estudos</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700/30 rounded-lg p-3">
                      <div className="text-2xl font-bold text-blue-400">{selectedSubjects.length}</div>
                      <div className="text-sm text-gray-400">Matérias Selecionadas</div>
                    </div>
                    <div className="bg-gray-700/30 rounded-lg p-3">
                      <div className="text-2xl font-bold text-purple-400">{getTotalQuestions().toLocaleString()}</div>
                      <div className="text-sm text-gray-400">Questões Totais</div>
                    </div>
                    <div className="bg-gray-700/30 rounded-lg p-3">
                      <div className="text-2xl font-bold text-pink-400">{studySession.timeLimit}min</div>
                      <div className="text-sm text-gray-400">Duração</div>
                    </div>
                    <div className="bg-gray-700/30 rounded-lg p-3">
                      <div className="text-2xl font-bold text-cyan-400">{studySession.questionCount}</div>
                      <div className="text-sm text-gray-400">Questões</div>
                    </div>
                  </div>

                  {selectedSubjects.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Matérias Selecionadas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSubjects.map(subjectId => {
                          const subject = subjects.find(s => s.id === subjectId)
                          return (
                            <Badge key={subjectId} className="bg-blue-500/20 text-blue-300 border border-blue-500/30">
                              {subject?.icon} {subject?.name}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={startStudySession}
                    disabled={selectedSubjects.length === 0}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed py-3 text-lg font-semibold"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Iniciar Sessão de Estudos
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-6">
            {/* Overall Performance */}
            <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
                  <div>
                    <CardTitle className="text-white">Desempenho Geral</CardTitle>
                    <CardDescription>Suas estatísticas de estudo consolidadas</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">{performanceData.overall.accuracy}%</div>
                    <div className="text-sm text-gray-400">Taxa de Acerto</div>
                    <Progress value={performanceData.overall.accuracy} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">{performanceData.overall.totalQuestions}</div>
                    <div className="text-sm text-gray-400">Questões Respondidas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">{Math.floor(performanceData.overall.studyTime / 60)}h</div>
                    <div className="text-sm text-gray-400">Tempo de Estudo</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">{performanceData.overall.streak}</div>
                    <div className="text-sm text-gray-400">Sequência Atual</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subject Performance */}
            <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <PieChart className="w-6 h-6 text-cyan-400" />
                  <div>
                    <CardTitle className="text-white">Desempenho por Matéria</CardTitle>
                    <CardDescription>Análise detalhada de cada disciplina</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.slice(0, 6).map((subject) => (
                    <div key={subject.id} className="bg-gray-700/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{subject.icon}</span>
                          <div>
                            <h3 className="font-semibold text-white">{subject.name}</h3>
                            <p className="text-sm text-gray-400">{subject.performance.totalQuestions} questões</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getPerformanceColor(subject.performance.accuracy)}`}>
                            {subject.performance.accuracy}%
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            {getPerformanceIcon(subject.performance.improvement)}
                            <span className={subject.performance.improvement > 0 ? 'text-green-400' : subject.performance.improvement < 0 ? 'text-red-400' : 'text-gray-400'}>
                              {subject.performance.improvement > 0 ? '+' : ''}{subject.performance.improvement}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <Progress value={subject.performance.accuracy} className="mb-2" />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Sequência: {subject.performance.streak}</span>
                        <span>Tempo médio: {subject.performance.averageTime}s</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Sessions */}
            <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-pink-400" />
                  <div>
                    <CardTitle className="text-white">Sessões Recentes</CardTitle>
                    <CardDescription>Histórico das suas últimas sessões de estudo</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {performanceData.recentSessions.map((session, index) => (
                    <div key={index} className="bg-gray-700/30 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">{session.subjects.join(', ')}</div>
                        <div className="text-sm text-gray-400">{session.date} • {session.questions} questões • {session.duration}min</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getPerformanceColor(session.score)}`}>
                          {session.score}%
                        </div>
                        <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {session.score >= 80 ? 'Excelente' : session.score >= 60 ? 'Bom' : 'Precisa Melhorar'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            {/* Performance Analysis */}
            <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Brain className="w-6 h-6 text-pink-400" />
                  <div>
                    <CardTitle className="text-white">Análise de Desempenho</CardTitle>
                    <CardDescription>Insights inteligentes sobre seu progresso</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Pontos Fortes
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                        <div className="font-semibold text-green-400">Matemática - Álgebra</div>
                        <div className="text-sm text-gray-300">85% de acerto • Sequência de 8</div>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                        <div className="font-semibold text-green-400">Filosofia - Ética</div>
                        <div className="text-sm text-gray-300">83% de acerto • Melhoria de 15%</div>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                        <div className="font-semibold text-green-400">História do Brasil</div>
                        <div className="text-sm text-gray-300">81% de acerto • Consistente</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-red-400 flex items-center gap-2">
                      <TrendingDown className="w-5 h-5" />
                      Áreas para Melhoria
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                        <div className="font-semibold text-red-400">Física - Mecânica</div>
                        <div className="text-sm text-gray-300">69% de acerto • Queda de 8%</div>
                      </div>
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                        <div className="font-semibold text-red-400">Português - Interpretação</div>
                        <div className="text-sm text-gray-300">72% de acerto • Queda de 5%</div>
                      </div>
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                        <div className="font-semibold text-yellow-400">Matemática - Geometria</div>
                        <div className="text-sm text-gray-300">Tempo médio alto • Precisa praticar</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <div>
                    <CardTitle className="text-white">Recomendações Personalizadas</CardTitle>
                    <CardDescription>Sugestões baseadas em seu desempenho</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-blue-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-blue-400 mb-2">Foque em Física</h4>
                        <p className="text-gray-300 text-sm mb-3">Sua performance em Física caiu 8% nas últimas sessões. Recomendamos:</p>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Revisar conceitos de mecânica clássica</li>
                          <li>• Praticar mais exercícios de cinemática</li>
                          <li>• Focar em problemas de dinâmica</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-purple-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-purple-400 mb-2">Otimize seu Tempo</h4>
                        <p className="text-gray-300 text-sm mb-3">Você está gastando muito tempo em questões de Matemática:</p>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Pratique cálculos mentais básicos</li>
                          <li>• Use técnicas de resolução rápida</li>
                          <li>• Defina limite de tempo por questão</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Trophy className="w-5 h-5 text-green-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-green-400 mb-2">Continue o Bom Trabalho</h4>
                        <p className="text-gray-300 text-sm mb-3">Seu desempenho em Filosofia está excelente! Para manter:</p>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Mantenha a frequência de estudos</li>
                          <li>• Explore tópicos mais avançados</li>
                          <li>• Ajude colegas com dificuldades</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-cyan-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-cyan-400 mb-2">Plano de Estudos Sugerido</h4>
                        <p className="text-gray-300 text-sm mb-3">Para as próximas semanas, recomendamos:</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                          <div className="bg-gray-700/30 rounded p-2">
                            <div className="font-semibold text-white">Segunda/Quarta</div>
                            <div className="text-gray-400">Física + Matemática</div>
                          </div>
                          <div className="bg-gray-700/30 rounded p-2">
                            <div className="font-semibold text-white">Terça/Quinta</div>
                            <div className="text-gray-400">Português + História</div>
                          </div>
                          <div className="bg-gray-700/30 rounded p-2">
                            <div className="font-semibold text-white">Sexta/Sábado</div>
                            <div className="text-gray-400">Revisão Geral</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Study Goals */}
            <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <div>
                    <CardTitle className="text-white">Metas de Estudo</CardTitle>
                    <CardDescription>Objetivos personalizados para seu progresso</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-white">Melhorar Física para 75%</h4>
                      <Badge className="bg-orange-500/20 text-orange-300 border border-orange-500/30">
                        Em Progresso
                      </Badge>
                    </div>
                    <Progress value={69} className="mb-2" />
                    <div className="text-sm text-gray-400">69% atual • Meta: 75% • Faltam 6 pontos percentuais</div>
                  </div>

                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-white">500 Questões este Mês</h4>
                      <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        No Prazo
                      </Badge>
                    </div>
                    <Progress value={78} className="mb-2" />
                    <div className="text-sm text-gray-400">390/500 questões • 22 dias restantes</div>
                  </div>

                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-white">Sequência de 15 Acertos</h4>
                      <Badge className="bg-green-500/20 text-green-300 border border-green-500/30">
                        Quase Lá
                      </Badge>
                    </div>
                    <Progress value={80} className="mb-2" />
                    <div className="text-sm text-gray-400">12/15 acertos consecutivos • Continue assim!</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

