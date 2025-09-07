"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, Star, Zap, Target } from "lucide-react"
import { format } from "@/lib/utils"

interface RankingUser {
  id: string
  name: string
  level: number
  xp: number
  totalQuizzes: number
  correctAnswers: number
  streak: number
  achievements: string[]
  rank: number
}

export default function RankingPage() {
  const [ranking, setRanking] = useState<RankingUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchRanking()
  }, [])

  const fetchRanking = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/users?action=ranking')
      const data = await response.json()
      
      if (response.ok) {
        setRanking(data.ranking || [])
      } else {
        setError(data.error || 'Erro ao carregar ranking')
      }
    } catch (err) {
      setError('Erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600"
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500"
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600"
      default:
        return "bg-gradient-to-r from-blue-400 to-blue-600"
    }
  }

  const getAccuracy = (user: RankingUser) => {
    if (user.totalQuizzes === 0) return 0
    return (user.correctAnswers / (user.totalQuizzes * 10)) * 100 // Assumindo 10 questões por quiz
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando ranking...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <p className="text-destructive">{error}</p>
            <button 
              onClick={fetchRanking}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Tentar novamente
            </button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          🏆 Ranking Global
        </h1>
        <p className="text-muted-foreground mt-2">
          Os melhores jogadores do QuizMaster
        </p>
      </div>

      {ranking.length === 0 ? (
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Nenhum jogador no ranking ainda. Seja o primeiro!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4 max-w-4xl mx-auto">
          {ranking.map((user, index) => (
            <Card 
              key={user.id} 
              className={`transition-all duration-200 hover:shadow-lg ${
                user.rank <= 3 ? 'ring-2 ring-primary/20' : ''
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  {/* Posição no ranking */}
                  <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                    {getRankIcon(user.rank)}
                  </div>

                  {/* Avatar e informações básicas */}
                  <div className="flex items-center gap-4 flex-1">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                      <AvatarFallback>{format.text.initials(user.name)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{user.name}</h3>
                        <Badge 
                          className={`text-white ${getRankBadgeColor(user.rank)}`}
                        >
                          Nível {user.level}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          <span>{format.number.compact(user.xp)} XP</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4" />
                          <span>{user.totalQuizzes} quizzes</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Zap className="h-4 w-4" />
                          <span>{user.streak} sequência</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Estatísticas detalhadas */}
                  <div className="hidden md:flex flex-col items-end gap-2">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {format.number.percentage(getAccuracy(user) / 100)}
                      </div>
                      <div className="text-xs text-muted-foreground">Precisão</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-semibold">
                        {user.correctAnswers}
                      </div>
                      <div className="text-xs text-muted-foreground">Acertos</div>
                    </div>
                  </div>

                  {/* Conquistas */}
                  <div className="hidden lg:flex flex-col items-center gap-1">
                    <div className="text-lg font-bold text-amber-500">
                      {user.achievements.length}
                    </div>
                    <div className="text-xs text-muted-foreground">Conquistas</div>
                  </div>
                </div>

                {/* Estatísticas móveis */}
                <div className="md:hidden mt-4 pt-4 border-t">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-primary">
                        {format.number.percentage(getAccuracy(user) / 100)}
                      </div>
                      <div className="text-xs text-muted-foreground">Precisão</div>
                    </div>
                    
                    <div>
                      <div className="text-lg font-bold">
                        {user.correctAnswers}
                      </div>
                      <div className="text-xs text-muted-foreground">Acertos</div>
                    </div>
                    
                    <div>
                      <div className="text-lg font-bold text-amber-500">
                        {user.achievements.length}
                      </div>
                      <div className="text-xs text-muted-foreground">Conquistas</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Estatísticas gerais */}
      {ranking.length > 0 && (
        <Card className="mt-8 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">📊 Estatísticas Gerais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {ranking.length}
                </div>
                <div className="text-sm text-muted-foreground">Jogadores</div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-green-500">
                  {ranking.reduce((sum, user) => sum + user.totalQuizzes, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Quizzes</div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-blue-500">
                  {format.number.compact(ranking.reduce((sum, user) => sum + user.xp, 0))}
                </div>
                <div className="text-sm text-muted-foreground">XP Total</div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-amber-500">
                  {ranking.reduce((sum, user) => sum + user.achievements.length, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Conquistas</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

