'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Calculator, 
  Globe, 
  Microscope, 
  Clock, 
  Target, 
  Zap, 
  Trophy,
  Play,
  Star,
  Brain,
  GraduationCap
} from 'lucide-react'

interface QuickActivity {
  id: string
  title: string
  description: string
  subject: string
  difficulty: 'facil' | 'medio' | 'dificil'
  questionCount: number
  timeLimit: number
  icon: React.ReactNode
  color: string
  xpReward: number
  category: string
  estimatedTime: string
}

const quickActivities: QuickActivity[] = [
  {
    id: 'matematica-enem-dificil',
    title: 'Matemática ENEM - Nível Avançado',
    description: 'Questões de alta complexidade para o ENEM',
    subject: 'geral',
    difficulty: 'dificil',
    questionCount: 15,
    timeLimit: 900, // 15 minutos
    icon: <Calculator className="w-6 h-6" />,
    color: 'from-blue-600 to-purple-600',
    xpReward: 150,
    category: 'ENEM',
    estimatedTime: '15 min'
  },
  {
    id: 'portugues-medio',
    title: 'Português - Interpretação de Texto',
    description: 'Desenvolva suas habilidades de interpretação',
    subject: 'geral',
    difficulty: 'medio',
    questionCount: 10,
    timeLimit: 600, // 10 minutos
    icon: <BookOpen className="w-6 h-6" />,
    color: 'from-green-600 to-emerald-600',
    xpReward: 100,
    category: 'Língua Portuguesa',
    estimatedTime: '10 min'
  },
  {
    id: 'conhecimentos-gerais-facil',
    title: 'Conhecimentos Gerais - Iniciante',
    description: 'Perfeito para começar seus estudos',
    subject: 'geral',
    difficulty: 'facil',
    questionCount: 8,
    timeLimit: 480, // 8 minutos
    icon: <Brain className="w-6 h-6" />,
    color: 'from-yellow-500 to-orange-500',
    xpReward: 80,
    category: 'Geral',
    estimatedTime: '8 min'
  },
  {
    id: 'historia-brasil',
    title: 'História do Brasil',
    description: 'Teste seus conhecimentos sobre nossa história',
    subject: 'geral',
    difficulty: 'medio',
    questionCount: 12,
    timeLimit: 720, // 12 minutos
    icon: <GraduationCap className="w-6 h-6" />,
    color: 'from-amber-600 to-red-600',
    xpReward: 120,
    category: 'História',
    estimatedTime: '12 min'
  },
  {
    id: 'geografia-mundo',
    title: 'Geografia Mundial',
    description: 'Explore o mundo através de questões',
    subject: 'geral',
    difficulty: 'medio',
    questionCount: 10,
    timeLimit: 600, // 10 minutos
    icon: <Globe className="w-6 h-6" />,
    color: 'from-teal-600 to-cyan-600',
    xpReward: 100,
    category: 'Geografia',
    estimatedTime: '10 min'
  },
  {
    id: 'ciencias-natureza',
    title: 'Ciências da Natureza',
    description: 'Biologia, Física e Química integradas',
    subject: 'geral',
    difficulty: 'dificil',
    questionCount: 18,
    timeLimit: 1080, // 18 minutos
    icon: <Microscope className="w-6 h-6" />,
    color: 'from-emerald-600 to-green-600',
    xpReward: 180,
    category: 'Ciências',
    estimatedTime: '18 min'
  }
]

interface QuickActivitiesProps {
  onActivitySelect: (config: any) => void
}

export function QuickActivities({ onActivitySelect }: QuickActivitiesProps) {
  const [selectedActivity, setSelectedActivity] = useState<QuickActivity | null>(null)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facil':
        return 'bg-green-500'
      case 'medio':
        return 'bg-yellow-500'
      case 'dificil':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'facil':
        return 'Fácil'
      case 'medio':
        return 'Médio'
      case 'dificil':
        return 'Difícil'
      default:
        return difficulty
    }
  }

  const handleActivityStart = (activity: QuickActivity) => {
    const config = {
      subject: activity.subject,
      difficulty: activity.difficulty,
      institution: 'geral',
      questionCount: activity.questionCount,
      timeLimit: activity.timeLimit,
      area: 'Todas',
      tema: 'Todos'
    }
    
    onActivitySelect(config)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Atividades Rápidas</h2>
        <p className="text-gray-400">
          Escolha uma atividade pré-configurada e comece a jogar imediatamente
        </p>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickActivities.map((activity) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="h-full"
          >
            <Card className="h-full bg-gray-800/50 border-gray-700/50 hover:border-gray-600 transition-all duration-300 cursor-pointer group">
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${activity.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  {activity.icon}
                </div>
                
                <CardTitle className="text-white text-lg leading-tight">
                  {activity.title}
                </CardTitle>
                
                <CardDescription className="text-gray-400 text-sm">
                  {activity.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Activity Stats */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">{activity.questionCount} questões</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">{activity.estimatedTime}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300">+{activity.xpReward} XP</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-300">{activity.category}</span>
                  </div>
                </div>

                {/* Difficulty Badge */}
                <div className="flex items-center justify-between">
                  <Badge className={`${getDifficultyColor(activity.difficulty)} text-white`}>
                    {getDifficultyLabel(activity.difficulty)}
                  </Badge>
                  
                  <Button
                    onClick={() => handleActivityStart(activity)}
                    size="sm"
                    className={`bg-gradient-to-r ${activity.color} hover:opacity-90 transition-opacity`}
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Jogar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-400">{quickActivities.length}</div>
            <div className="text-sm text-gray-400">Atividades Disponíveis</div>
          </div>
          
          <div>
            <div className="text-2xl font-bold text-green-400">
              {quickActivities.reduce((sum, activity) => sum + activity.questionCount, 0)}
            </div>
            <div className="text-sm text-gray-400">Total de Questões</div>
          </div>
          
          <div>
            <div className="text-2xl font-bold text-yellow-400">
              {quickActivities.reduce((sum, activity) => sum + activity.xpReward, 0)}
            </div>
            <div className="text-sm text-gray-400">XP Total Disponível</div>
          </div>
          
          <div>
            <div className="text-2xl font-bold text-purple-400">
              {Math.round(quickActivities.reduce((sum, activity) => sum + activity.timeLimit, 0) / 60)}
            </div>
            <div className="text-sm text-gray-400">Minutos de Conteúdo</div>
          </div>
        </div>
      </div>
    </div>
  )
}

