'use client'

import { useState, useEffect } from 'react'
import { AdminLogin } from '@/components/admin-login'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Edit, Trash2, Search, Filter, BookOpen, Target, Brain } from "lucide-react"

interface Question {
  id?: string
  enunciado: string
  alternativas: string[]
  respostaCorreta: number
  tema: string
  explicacao: string
  dificuldade: 'facil' | 'medio' | 'dificil'
  area: string
}

const DIFICULDADES = [
  { value: 'facil', label: 'Fácil', color: 'bg-green-500' },
  { value: 'medio', label: 'Médio', color: 'bg-yellow-500' },
  { value: 'dificil', label: 'Difícil', color: 'bg-red-500' }
]

const AREAS = [
  'Provas',
  'Cursos', 
  'Programas',
  'Escola',
  'Universidades',
  'Estatísticas',
  'Matemática',
  'Português',
  'História',
  'Geografia',
  'Ciências',
  'Física',
  'Química',
  'Biologia'
]

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDificuldade, setFilterDificuldade] = useState<string>('all')
  const [filterArea, setFilterArea] = useState<string>('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)
  const [formData, setFormData] = useState<Question>({
    enunciado: '',
    alternativas: ['', '', '', ''],
    respostaCorreta: 0,
    tema: '',
    explicacao: '',
    dificuldade: 'facil',
    area: 'Provas'
  })
  const { toast } = useToast()

  useEffect(() => {
    loadQuestions()
  }, [])

  useEffect(() => {
    filterQuestions()
  }, [questions, searchTerm, filterDificuldade, filterArea])

  const loadQuestions = async () => {
    try {
      const response = await fetch('/api/questions')
      const data = await response.json()
      
      // Converter estrutura do JSON para array com dificuldade
      const allQuestions: Question[] = []
      Object.entries(data).forEach(([dificuldade, questoes]) => {
        (questoes as any[]).forEach((questao, index) => {
          allQuestions.push({
            id: `${dificuldade}-${index}`,
            ...questao,
            dificuldade: dificuldade as 'facil' | 'medio' | 'dificil',
            area: questao.tema
          })
        })
      })
      
      setQuestions(allQuestions)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar as questões",
        variant: "destructive"
      })
    }
  }

  const filterQuestions = () => {
    let filtered = questions

    if (searchTerm) {
      filtered = filtered.filter(q => 
        q.enunciado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.tema.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.area.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterDificuldade !== 'all') {
      filtered = filtered.filter(q => q.dificuldade === filterDificuldade)
    }

    if (filterArea !== 'all') {
      filtered = filtered.filter(q => q.area === filterArea)
    }

    setFilteredQuestions(filtered)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.enunciado || formData.alternativas.some(alt => !alt.trim()) || !formData.explicacao) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      })
      return
    }

    try {
      const method = editingQuestion ? 'PUT' : 'POST'
      const url = editingQuestion ? `/api/questions/${editingQuestion.id}` : '/api/questions'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: editingQuestion ? "Questão atualizada com sucesso" : "Questão criada com sucesso"
        })
        
        setIsDialogOpen(false)
        setEditingQuestion(null)
        resetForm()
        loadQuestions()
      } else {
        throw new Error('Erro na requisição')
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar a questão",
        variant: "destructive"
      })
    }
  }

  const handleEdit = (question: Question) => {
    setEditingQuestion(question)
    setFormData(question)
    setIsDialogOpen(true)
  }

  const handleDelete = async (questionId: string) => {
    try {
      const response = await fetch(`/api/questions/${questionId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Questão excluída com sucesso"
        })
        loadQuestions()
      } else {
        throw new Error('Erro na requisição')
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir a questão",
        variant: "destructive"
      })
    }
  }

  const resetForm = () => {
    setFormData({
      enunciado: '',
      alternativas: ['', '', '', ''],
      respostaCorreta: 0,
      tema: '',
      explicacao: '',
      dificuldade: 'facil',
      area: 'Provas'
    })
  }

  const handleAlternativaChange = (index: number, value: string) => {
    const newAlternativas = [...formData.alternativas]
    newAlternativas[index] = value
    setFormData({ ...formData, alternativas: newAlternativas })
  }

  const getDificuldadeColor = (dificuldade: string) => {
    const dif = DIFICULDADES.find(d => d.value === dificuldade)
    return dif?.color || 'bg-gray-500'
  }

  const getDificuldadeLabel = (dificuldade: string) => {
    const dif = DIFICULDADES.find(d => d.value === dificuldade)
    return dif?.label || dificuldade
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Administração de Questões</h1>
            <p className="text-gray-400">Gerencie as questões do sistema de quiz</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={onLogout}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Sair
            </Button>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={() => {
                    setEditingQuestion(null)
                    resetForm()
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                <Plus className="h-4 w-4 mr-2" />
                Nova Questão
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">
                  {editingQuestion ? 'Editar Questão' : 'Nova Questão'}
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Preencha os dados da questão abaixo
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dificuldade" className="text-white">Dificuldade</Label>
                    <Select value={formData.dificuldade} onValueChange={(value) => setFormData({...formData, dificuldade: value as 'facil' | 'medio' | 'dificil'})}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {DIFICULDADES.map(dif => (
                          <SelectItem key={dif.value} value={dif.value} className="text-white">
                            {dif.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="area" className="text-white">Área</Label>
                    <Select value={formData.area} onValueChange={(value) => setFormData({...formData, area: value})}>
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
                </div>

                <div>
                  <Label htmlFor="tema" className="text-white">Tema</Label>
                  <Input
                    id="tema"
                    value={formData.tema}
                    onChange={(e) => setFormData({...formData, tema: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Ex: Provas, Cursos, etc."
                  />
                </div>

                <div>
                  <Label htmlFor="enunciado" className="text-white">Enunciado da Questão</Label>
                  <Textarea
                    id="enunciado"
                    value={formData.enunciado}
                    onChange={(e) => setFormData({...formData, enunciado: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
                    placeholder="Digite o enunciado da questão..."
                  />
                </div>

                <div>
                  <Label className="text-white">Alternativas</Label>
                  <div className="space-y-3">
                    {formData.alternativas.map((alt, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="resposta"
                            checked={formData.respostaCorreta === index}
                            onChange={() => setFormData({...formData, respostaCorreta: index})}
                            className="mr-2"
                          />
                          <span className="text-white font-medium">{String.fromCharCode(65 + index)})</span>
                        </div>
                        <Input
                          value={alt}
                          onChange={(e) => handleAlternativaChange(index, e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white flex-1"
                          placeholder={`Alternativa ${String.fromCharCode(65 + index)}`}
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Selecione a alternativa correta marcando o círculo correspondente
                  </p>
                </div>

                <div>
                  <Label htmlFor="explicacao" className="text-white">Explicação</Label>
                  <Textarea
                    id="explicacao"
                    value={formData.explicacao}
                    onChange={(e) => setFormData({...formData, explicacao: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
                    placeholder="Explique por que esta é a resposta correta..."
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    {editingQuestion ? 'Atualizar' : 'Criar'} Questão
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          </div>
        </div>

        {/* Filtros e Busca */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar questões..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <Select value={filterDificuldade} onValueChange={setFilterDificuldade}>
                  <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Dificuldade" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all" className="text-white">Todas</SelectItem>
                    {DIFICULDADES.map(dif => (
                      <SelectItem key={dif.value} value={dif.value} className="text-white">
                        {dif.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterArea} onValueChange={setFilterArea}>
                  <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Área" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all" className="text-white">Todas</SelectItem>
                    {AREAS.map(area => (
                      <SelectItem key={area} value={area} className="text-white">
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-white">{questions.length}</p>
                  <p className="text-sm text-gray-400">Total de Questões</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-green-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {questions.filter(q => q.dificuldade === 'facil').length}
                  </p>
                  <p className="text-sm text-gray-400">Fáceis</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-yellow-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {questions.filter(q => q.dificuldade === 'medio').length}
                  </p>
                  <p className="text-sm text-gray-400">Médias</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Brain className="h-8 w-8 text-red-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {questions.filter(q => q.dificuldade === 'dificil').length}
                  </p>
                  <p className="text-sm text-gray-400">Difíceis</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Questões */}
        <div className="space-y-4">
          {filteredQuestions.map((question) => (
            <Card key={question.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className={`${getDificuldadeColor(question.dificuldade)} text-white`}>
                        {getDificuldadeLabel(question.dificuldade)}
                      </Badge>
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {question.area}
                      </Badge>
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {question.tema}
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-3">
                      {question.enunciado}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                      {question.alternativas.map((alt, index) => (
                        <div 
                          key={index} 
                          className={`p-2 rounded text-sm ${
                            index === question.respostaCorreta 
                              ? 'bg-green-600/20 border border-green-600/50 text-green-300' 
                              : 'bg-gray-700 text-gray-300'
                          }`}
                        >
                          <span className="font-medium">{String.fromCharCode(65 + index)})</span> {alt}
                        </div>
                      ))}
                    </div>
                    
                    <p className="text-sm text-gray-400">
                      <strong>Explicação:</strong> {question.explicacao}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(question)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-600 text-red-400 hover:bg-red-600/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-gray-800 border-gray-700">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-white">Confirmar Exclusão</AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-400">
                            Tem certeza que deseja excluir esta questão? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="border-gray-600 text-gray-300 hover:bg-gray-700">
                            Cancelar
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => question.id && handleDelete(question.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Nenhuma questão encontrada</h3>
              <p className="text-gray-400">
                {searchTerm || filterDificuldade !== 'all' || filterArea !== 'all'
                  ? 'Tente ajustar os filtros de busca'
                  : 'Comece criando sua primeira questão'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

// Componente principal que controla o acesso
export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Verificar se já está autenticado no localStorage
  useEffect(() => {
    const authStatus = localStorage.getItem('admin-authenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
    localStorage.setItem('admin-authenticated', 'true')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin-authenticated')
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return <AdminDashboard onLogout={handleLogout} />
}

