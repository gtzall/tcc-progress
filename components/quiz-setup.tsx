'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  Target, 
  Building2, 
  Clock, 
  Play, 
  Filter,
  X,
  Check,
  GraduationCap,
  Brain,
  Zap,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// Tipos de dados
interface Subject {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  description: string
  questionCount: number
}

interface Difficulty {
  id: string
  name: string
  color: string
  description: string
  multiplier: number
}

interface Institution {
  id: string
  name: string
  type: 'federal' | 'estadual' | 'particular' | 'enem' | 'vestibular'
  location: string
  questionCount: number
  subjects: string[]
}

interface QuizConfig {
  subject: string
  difficulty: string
  institution: string
  questionCount: number
  timeLimit: number
  area?: string
  tema?: string
}

interface Question {
  enunciado: string
  alternativas: string[]
  respostaCorreta: number
  tema: string
  explicacao: string
}

// Dados das matérias
const subjects: Subject[] = [
  {
    id: 'geral',
    name: 'Conhecimentos Gerais',
    icon: <Brain className="w-5 h-5" />,
    color: 'from-blue-500 to-cyan-500',
    description: 'Questões diversas sobre educação',
    questionCount: 30
  },
  {
    id: 'matematica',
    name: 'Matemática',
    icon: <Brain className="w-5 h-5" />,
    color: 'from-blue-500 to-cyan-500',
    description: 'Álgebra, geometria e cálculo',
    questionCount: 0
  },
  {
    id: 'portugues',
    name: 'Português',
    icon: <BookOpen className="w-5 h-5" />,
    color: 'from-green-500 to-emerald-500',
    description: 'Gramática e literatura',
    questionCount: 0
  },
  {
    id: 'historia',
    name: 'História',
    icon: <GraduationCap className="w-5 h-5" />,
    color: 'from-amber-500 to-orange-500',
    description: 'História geral e do Brasil',
    questionCount: 0
  },
  {
    id: 'geografia',
    name: 'Geografia',
    icon: <Target className="w-5 h-5" />,
    color: 'from-teal-500 to-cyan-500',
    description: 'Geografia física e humana',
    questionCount: 0
  },
  {
    id: 'biologia',
    name: 'Biologia',
    icon: <Zap className="w-5 h-5" />,
    color: 'from-emerald-500 to-green-500',
    description: 'Vida e ecologia',
    questionCount: 0
  }
]
// Dados das dificuldades
const difficulties: Difficulty[] = [
  {
    id: 'facil',
    name: 'Fácil',
    color: 'from-green-500 to-emerald-500',
    description: 'Conceitos básicos',
    multiplier: 1.0
  },
  {
    id: 'medio',
    name: 'Médio',
    color: 'from-yellow-500 to-orange-500',
    description: 'Conceitos intermediários',
    multiplier: 1.5
  },
  {
    id: 'dificil',
    name: 'Difícil',
    color: 'from-red-500 to-pink-500',
    description: 'Conceitos avançados',
    multiplier: 2.0
  }
]

// Áreas disponíveis
const AREAS = [
  'Todas',
  'Provas',
  'Cursos', 
  'Programas',
  'Escola',
  'Universidades',
  'Estatísticas'
]

// Temas disponíveis
const TEMAS = [
  'Todos',
  'Provas',
  'Cursos',
  'Programas',
  'Escola',
  'Universidades',
  'Estatísticas'
]

// Dados das instituições
const institutions: Institution[] = [
  {
    id: 'geral',
    name: 'Conhecimentos Gerais',
    type: 'enem',
    location: 'Nacional',
    questionCount: 30,
    subjects: ['geral']
  }
]

interface QuizSetupProps {
  onStart: (config: QuizConfig) => void
  onClose: () => void
}

export function QuizSetup({ onStart, onClose }: QuizSetupProps) {
  const [config, setConfig] = useState<QuizConfig>({
    subject: '',
    difficulty: '',
    institution: '',
    questionCount: 10,
    timeLimit: 300,
    area: 'Todas',
    tema: 'Todos'
  })

  const [activeTab, setActiveTab] = useState<'subject' | 'difficulty' | 'institution' | 'settings'>('subject')
  const [showFilters, setShowFilters] = useState(false)
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([])
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([])

  useEffect(() => {
    loadQuestions()
  }, [])

  useEffect(() => {
    filterQuestions()
  }, [config.area, config.tema, config.difficulty, availableQuestions])

  const loadQuestions = async () => {
    try {
      const response = await fetch('/api/questions')
      const data = await response.json()
      
      // Converter estrutura do JSON para array
      const allQuestions: Question[] = []
      Object.entries(data).forEach(([dificuldade, questoes]) => {
        (questoes as any[]).forEach((questao) => {
          allQuestions.push({
            ...questao,
            dificuldade: dificuldade as 'facil' | 'medio' | 'dificil'
          })
        })
      })
      
      setAvailableQuestions(allQuestions)
    } catch (error) {
      console.error('Erro ao carregar questões:', error)
    }
  }

  const filterQuestions = () => {
    let filtered = availableQuestions

    if (config.difficulty && config.difficulty !== 'todas') {
      filtered = filtered.filter(q => (q as any).dificuldade === config.difficulty)
    }

    if (config.area && config.area !== 'Todas') {
      filtered = filtered.filter(q => (q as any).area === config.area)
    }

    if (config.tema && config.tema !== 'Todos') {
      filtered = filtered.filter(q => q.tema === config.tema)
    }

    setFilteredQuestions(filtered)
  }

  const handleConfigChange = (key: keyof QuizConfig, value: string | number) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  const canStart = config.subject && config.difficulty && config.institution && filteredQuestions.length > 0

  const getFilteredInstitutions = () => {
    if (!config.subject) return institutions
    return institutions.filter(inst => inst.subjects.includes(config.subject))
  }

  const getFilteredSubjects = () => {
    if (!config.institution) return subjects
    const institution = institutions.find(inst => inst.id === config.institution)
    if (!institution) return subjects
    return subjects.filter(subject => institution.subjects.includes(subject.id))
  }

  const tabs = [
    { id: 'subject', label: 'Matéria', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'difficulty', label: 'Dificuldade', icon: <Target className="w-4 h-4" /> },
    { id: 'institution', label: 'Instituição', icon: <Building2 className="w-4 h-4" /> },
    { id: 'settings', label: 'Configurações', icon: <Clock className="w-4 h-4" /> }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-4xl max-h-[90vh] bg-gray-900 rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-gray-800 to-gray-700 border-b border-gray-600/30">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Configurar Quiz</h2>
              <p className="text-gray-300 mt-1">Personalize sua experiência de estudo</p>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-700/50"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mt-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <AnimatePresence mode="wait">
            {activeTab === 'subject' && (
          <motion.div
                key="subject"
                initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getFilteredSubjects().map((subject) => (
                    <motion.button
                      key={subject.id}
                      onClick={() => handleConfigChange('subject', subject.id)}
                      className={cn(
                        'relative p-4 rounded-xl border-2 transition-all duration-300 text-left group',
                        'hover:scale-105 hover:shadow-xl',
                        config.subject === subject.id
                          ? 'border-blue-500 bg-blue-500/10 shadow-blue-500/25'
                          : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                      )}
                      whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                      <div className={cn(
                        'w-12 h-12 rounded-lg bg-gradient-to-r mb-3 flex items-center justify-center text-white',
                        subject.color
                      )}>
                        {subject.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {subject.name}
                      </h3>
                      <p className="text-gray-300 text-sm mb-3">
                        {subject.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-400 text-sm font-medium">
                          {subject.questionCount} questões
                        </span>
                        {config.subject === subject.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center"
                          >
                            <Check className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                        </div>
                    </motion.button>
                  ))}
                      </div>
                  </motion.div>
            )}

            {activeTab === 'difficulty' && (
          <motion.div
                key="difficulty"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {difficulties.map((difficulty) => (
                    <motion.button
                      key={difficulty.id}
                      onClick={() => handleConfigChange('difficulty', difficulty.id)}
                      className={cn(
                        'relative p-6 rounded-xl border-2 transition-all duration-300 text-left group',
                        'hover:scale-105 hover:shadow-xl',
                        config.difficulty === difficulty.id
                          ? 'border-blue-500 bg-blue-500/10 shadow-blue-500/25'
                          : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                      )}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={cn(
                        'w-16 h-16 rounded-xl bg-gradient-to-r mb-4 flex items-center justify-center text-white text-2xl font-bold',
                        difficulty.color
                      )}>
                        {difficulty.multiplier}x
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {difficulty.name}
                      </h3>
                      <p className="text-gray-300 text-sm mb-3">
                        {difficulty.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-400 text-sm font-medium">
                          Multiplicador: {difficulty.multiplier}x
                        </span>
                        {config.difficulty === difficulty.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center"
                          >
                            <Check className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'institution' && (
              <motion.div
                key="institution"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getFilteredInstitutions().map((institution) => (
                    <motion.button
                      key={institution.id}
                      onClick={() => handleConfigChange('institution', institution.id)}
                      className={cn(
                        'relative p-6 rounded-xl border-2 transition-all duration-300 text-left group',
                        'hover:scale-105 hover:shadow-xl',
                        config.institution === institution.id
                          ? 'border-blue-500 bg-blue-500/10 shadow-blue-500/25'
                          : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                      )}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className={cn(
                          'w-12 h-12 rounded-lg flex items-center justify-center text-white',
                          institution.type === 'enem' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                          institution.type === 'federal' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                          institution.type === 'estadual' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                          'bg-gradient-to-r from-gray-500 to-slate-500'
                        )}>
                          <Building2 className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">
                            {institution.name}
                          </h3>
                          <p className="text-gray-400 text-sm capitalize">
                            {institution.type} • {institution.location}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">
                        {institution.questionCount} questões disponíveis
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-400 text-sm font-medium">
                          {institution.subjects.length} matérias
                        </span>
                        {config.institution === institution.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center"
                          >
                            <Check className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Filtros por Área e Tema */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Filtros de Questões</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-white font-medium">Área</label>
                      <Select value={config.area} onValueChange={(value) => handleConfigChange('area', value)}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          {AREAS.map(area => (
                            <SelectItem key={area} value={area} className="text-white">
                              {area}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-white font-medium">Tema</label>
                      <Select value={config.tema} onValueChange={(value) => handleConfigChange('tema', value)}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          {TEMAS.map(tema => (
                            <SelectItem key={tema} value={tema} className="text-white">
                              {tema}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-600/50">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Questões disponíveis:</span>
                      <Badge className="bg-blue-600 text-white">
                        {filteredQuestions.length} questões
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Número de questões */}
                  <div className="space-y-3">
                    <label className="text-white font-medium">Número de Questões</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[5, 10, 15, 20].map((count) => (
                        <button
                          key={count}
                          onClick={() => handleConfigChange('questionCount', Math.min(count, filteredQuestions.length))}
                          disabled={count > filteredQuestions.length}
                          className={cn(
                            'px-4 py-3 rounded-lg border-2 transition-all duration-200',
                            'hover:scale-105 hover:shadow-lg',
                            count > filteredQuestions.length
                              ? 'border-gray-700 bg-gray-800/30 text-gray-500 cursor-not-allowed'
                              : config.questionCount === count
                              ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                              : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                          )}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tempo limite */}
                  <div className="space-y-3">
                    <label className="text-white font-medium">Tempo Limite</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: 180, label: '3 min' },
                        { value: 300, label: '5 min' },
                        { value: 600, label: '10 min' },
                        { value: 900, label: '15 min' }
                      ].map((time) => (
                        <button
                          key={time.value}
                          onClick={() => handleConfigChange('timeLimit', time.value)}
                          className={cn(
                            'px-4 py-3 rounded-lg border-2 transition-all duration-200',
                            'hover:scale-105 hover:shadow-lg',
                            config.timeLimit === time.value
                              ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                              : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                          )}
                        >
                          {time.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
              </AnimatePresence>
                  </div>

        {/* Footer */}
        <div className="p-6 bg-gray-800/50 border-t border-gray-600/30">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              {config.subject && config.difficulty && config.institution && (
                <span>
                  Quiz configurado: <span className="text-blue-400 font-medium">
                    {subjects.find(s => s.id === config.subject)?.name} • 
                    {difficulties.find(d => d.id === config.difficulty)?.name} • 
                    {institutions.find(i => i.id === config.institution)?.name}
                  </span>
                      </span>
                  )}
                </div>
            <div className="flex gap-3">
                  <Button
                onClick={onClose}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Cancelar
                  </Button>
                  <Button
                onClick={() => onStart(config)}
                disabled={!canStart}
                className={cn(
                  'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold',
                  'hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                <Play className="w-4 h-4 mr-2" />
                Iniciar Quiz
                  </Button>
                </div>
        </div>
      </div>
      </motion.div>
    </motion.div>
  )
}
