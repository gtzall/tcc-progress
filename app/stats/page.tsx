"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Target, 
  Clock, 
  Calendar, 
  Star, 
  Trophy, 
  User, 
  Users, 
  Zap,
  Brain,
  BookOpen,
  Award,
  CheckCircle,
  XCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  Activity,
  PieChart,
  LineChart,
  BarChart,
  Eye,
  Heart,
  Timer,
  Percent
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/theme-context"
import { SmartNavigation } from "@/components/smart-navigation"
import EnhancedThemeAnimations from "@/components/enhanced-theme-animations"

interface StatCard {
  title: string
  value: string | number
  change: string
  trend: 'up' | 'down' | 'neutral'
  icon: React.ReactNode
  color: string
  description: string
}

interface SubjectStats {
  subject: string
  accuracy: number
  completed: number
  totalTime: string
  averageScore: number
  color: string
  icon: React.ReactNode
}

interface TimeStats {
  period: string
  quizzes: number
  accuracy: number
  timeSpent: string
  points: number
}

const overallStats: StatCard[] = [
  {
    title: "Quizzes Completados",
    value: 156,
    change: "+12 esta semana",
    trend: 'up',
    icon: <CheckCircle className="h-6 w-6" />,
    color: "text-green-400",
    description: "Total de quizzes finalizados com sucesso"
  },
  {
    title: "Precisão Média",
    value: "87%",
    change: "+3% este mês",
    trend: 'up',
    icon: <Target className="h-6 w-6" />,
    color: "text-blue-400",
    description: "Porcentagem média de acertos"
  },
  {
    title: "Tempo Total Estudado",
    value: "45h 32m",
    change: "+8h esta semana",
    trend: 'up',
    icon: <Clock className="h-6 w-6" />,
    color: "text-purple-400",
    description: "Tempo acumulado em atividades"
  },
  {
    title: "Pontuação Total",
    value: "45,678",
    change: "+1,234 hoje",
    trend: 'up',
    icon: <Star className="h-6 w-6" />,
    color: "text-yellow-400",
    description: "Pontos acumulados em todas as atividades"
  },
  {
    title: "Sequência Atual",
    value: "7 dias",
    change: "Recorde: 12 dias",
    trend: 'neutral',
    icon: <Zap className="h-6 w-6" />,
    color: "text-orange-400",
    description: "Dias consecutivos de atividade"
  },
  {
    title: "Ranking Global",
    value: "#15",
    change: "+3 posições",
    trend: 'up',
    icon: <Trophy className="h-6 w-6" />,
    color: "text-cyan-400",
    description: "Posição no ranking geral"
  }
]

const subjectStats: SubjectStats[] = [
  {
    subject: "Matemática",
    accuracy: 92,
    completed: 45,
    totalTime: "12h 30m",
    averageScore: 890,
    color: "text-blue-400",
    icon: <Brain className="h-5 w-5" />
  },
  {
    subject: "Português",
    accuracy: 88,
    completed: 32,
    totalTime: "8h 45m",
    averageScore: 825,
    color: "text-green-400",
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    subject: "História",
    accuracy: 85,
    completed: 28,
    totalTime: "7h 20m",
    averageScore: 780,
    color: "text-yellow-400",
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    subject: "Geografia",
    accuracy: 83,
    completed: 25,
    totalTime: "6h 15m",
    averageScore: 745,
    color: "text-purple-400",
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    subject: "Ciências",
    accuracy: 90,
    completed: 26,
    totalTime: "7h 50m",
    averageScore: 865,
    color: "text-red-400",
    icon: <Brain className="h-5 w-5" />
  }
]

const weeklyStats: TimeStats[] = [
  { period: "Segunda", quizzes: 3, accuracy: 85, timeSpent: "45m", points: 1250 },
  { period: "Terça", quizzes: 4, accuracy: 90, timeSpent: "1h 20m", points: 1680 },
  { period: "Quarta", quizzes: 2, accuracy: 88, timeSpent: "35m", points: 890 },
  { period: "Quinta", quizzes: 5, accuracy: 92, timeSpent: "1h 45m", points: 2150 },
  { period: "Sexta", quizzes: 3, accuracy: 87, timeSpent: "50m", points: 1320 },
  { period: "Sábado", quizzes: 6, accuracy: 89, timeSpent: "2h 10m", points: 2450 },
  { period: "Domingo", quizzes: 4, accuracy: 91, timeSpent: "1h 15m", points: 1680 }
]

const achievements = [
  { name: "Primeiro Passo", date: "15/01/2024", points: 100 },
  { name: "Perfeição", date: "20/01/2024", points: 250 },
  { name: "Velocidade da Luz", date: "25/01/2024", points: 300 }
]

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up': return <ArrowUp className="h-4 w-4 text-green-400" />
    case 'down': return <ArrowDown className="h-4 w-4 text-red-400" />
    default: return <Minus className="h-4 w-4 text-gray-400" />
  }
}

const getTrendColor = (trend: string) => {
  switch (trend) {
    case 'up': return 'text-green-400'
    case 'down': return 'text-red-400'
    default: return 'text-gray-400'
  }
}

export default function StatsPage() {
  const { currentTheme } = useTheme()
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative">
      <EnhancedThemeAnimations theme={currentTheme} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <BarChart3 className="h-10 w-10 text-cyan-400" />
            Estatísticas
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Acompanhe seu progresso e desempenho detalhado em todas as atividades
          </p>
        </motion.div>

        {/* Period Selector */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-1">
            {[
              { id: 'week', label: 'Semana' },
              { id: 'month', label: 'Mês' },
              { id: 'year', label: 'Ano' }
            ].map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id as any)}
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  selectedPeriod === period.id
                    ? 'bg-cyan-500 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Overall Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {overallStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-white/10 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center gap-1 text-sm ${getTrendColor(stat.trend)}`}>
                  {getTrendIcon(stat.trend)}
                </div>
              </div>
              
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400 mb-2">{stat.title}</div>
              <div className={`text-xs ${getTrendColor(stat.trend)}`}>{stat.change}</div>
              <div className="text-xs text-gray-500 mt-2">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Subject Performance */}
          <motion.div 
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <PieChart className="h-5 w-5 text-cyan-400" />
              Performance por Matéria
            </h3>
            
            <div className="space-y-4">
              {subjectStats.map((subject, index) => (
                <div key={subject.subject} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-white/10 ${subject.color}`}>
                        {subject.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{subject.subject}</div>
                        <div className="text-sm text-gray-400">{subject.completed} quizzes • {subject.totalTime}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">{subject.accuracy}%</div>
                      <div className="text-sm text-gray-400">{subject.averageScore} pts média</div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${
                        subject.accuracy >= 90 ? 'from-green-500 to-emerald-500' :
                        subject.accuracy >= 80 ? 'from-blue-500 to-cyan-500' :
                        subject.accuracy >= 70 ? 'from-yellow-500 to-orange-500' :
                        'from-red-500 to-pink-500'
                      }`}
                      style={{ width: `${subject.accuracy}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Weekly Activity */}
          <motion.div 
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Activity className="h-5 w-5 text-cyan-400" />
              Atividade Semanal
            </h3>
            
            <div className="space-y-3">
              {weeklyStats.map((day, index) => (
                <div key={day.period} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                    <div>
                      <div className="font-semibold text-white">{day.period}</div>
                      <div className="text-sm text-gray-400">{day.quizzes} quizzes • {day.timeSpent}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{day.accuracy}%</div>
                    <div className="text-sm text-cyan-400">+{day.points} pts</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Achievements */}
        <motion.div 
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-400" />
            Conquistas Recentes
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div key={achievement.name} className="p-4 bg-white/5 rounded-lg border border-yellow-400/20">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  <div className="font-semibold text-white">{achievement.name}</div>
                </div>
                <div className="text-sm text-gray-400">{achievement.date}</div>
                <div className="text-sm text-yellow-400">+{achievement.points} XP</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
            <BarChart className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Eye className="h-4 w-4 mr-2" />
            Comparar com Outros
          </Button>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Heart className="h-4 w-4 mr-2" />
            Definir Metas
          </Button>
        </motion.div>
      </main>
    </div>
  )
}
