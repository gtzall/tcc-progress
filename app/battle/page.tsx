"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Swords, 
  Users, 
  Crown, 
  Clock, 
  Target, 
  Zap, 
  Plus,
  Search,
  Copy,
  Share2,
  Play,
  UserPlus,
  Trophy
} from "lucide-react"
import { useBattleSystem, BattleRoom, BattleMode } from "@/lib/battle-system"
import { useAuth } from "@/lib/auth"
import { format } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function BattlePage() {
  const [availableRooms, setAvailableRooms] = useState<BattleRoom[]>([])
  const [activeRoom, setActiveRoom] = useState<BattleRoom | null>(null)
  const [loading, setLoading] = useState(true)
  const [createRoomOpen, setCreateRoomOpen] = useState(false)
  const [joinCodeOpen, setJoinCodeOpen] = useState(false)
  const [inviteCode, setInviteCode] = useState("")
  
  // Formulário de criação de sala
  const [roomMode, setRoomMode] = useState<BattleMode>('1v1')
  const [difficulty, setDifficulty] = useState<'facil' | 'medio' | 'dificil'>('medio')
  const [questionsCount, setQuestionsCount] = useState(10)
  const [timePerQuestion, setTimePerQuestion] = useState(30)
  const [isPrivate, setIsPrivate] = useState(false)

  const battleSystem = useBattleSystem()
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    loadData()
    
    // Atualizar dados a cada 5 segundos
    const interval = setInterval(loadData, 5000)
    return () => clearInterval(interval)
  }, [isAuthenticated])

  const loadData = async () => {
    try {
      setLoading(true)
      
      // Carregar salas disponíveis
      const rooms = battleSystem.getAvailableRooms()
      setAvailableRooms(rooms)
      
      // Verificar se o usuário tem uma sala ativa
      if (user) {
        const active = battleSystem.getActiveRoom(user.id)
        setActiveRoom(active)
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateRoom = async () => {
    if (!user) return

    const result = battleSystem.createRoom(
      user.id,
      roomMode,
      {
        questionsCount,
        timePerQuestion: timePerQuestion * 1000, // converter para ms
        difficulty,
        theme: 'default'
      },
      isPrivate
    )

    if (result.success && result.room) {
      // Entrar na sala criada
      const joinResult = battleSystem.joinRoom(result.room.id, {
        id: user.id,
        name: user.name,
        level: user.level,
        xp: user.xp,
        avatar: user.avatar
      })

      if (joinResult.success) {
        setCreateRoomOpen(false)
        router.push(`/battle/room/${result.room.id}`)
      }
    }
  }

  const handleJoinRoom = (roomId: string) => {
    if (!user) return

    const result = battleSystem.joinRoom(roomId, {
      id: user.id,
      name: user.name,
      level: user.level,
      xp: user.xp,
      avatar: user.avatar
    })

    if (result.success) {
      router.push(`/battle/room/${roomId}`)
    }
  }

  const handleJoinByCode = () => {
    if (!user || !inviteCode.trim()) return

    const result = battleSystem.joinByInviteCode(inviteCode.trim().toUpperCase(), {
      id: user.id,
      name: user.name,
      level: user.level,
      xp: user.xp,
      avatar: user.avatar
    })

    if (result.success && result.room) {
      setJoinCodeOpen(false)
      setInviteCode("")
      router.push(`/battle/room/${result.room.id}`)
    }
  }

  const getModeIcon = (mode: BattleMode) => {
    switch (mode) {
      case '1v1':
        return <Swords className="h-5 w-5" />
      case '2v2':
        return <Users className="h-5 w-5" />
      case 'group':
        return <Crown className="h-5 w-5" />
    }
  }

  const getModeLabel = (mode: BattleMode) => {
    switch (mode) {
      case '1v1':
        return 'Duelo 1v1'
      case '2v2':
        return 'Duplas 2v2'
      case 'group':
        return 'Grupo vs Grupo'
    }
  }

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

  if (!isAuthenticated) {
    return null
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando batalhas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          ⚔️ Arena de Batalhas
        </h1>
        <p className="text-muted-foreground mt-2">
          Desafie outros jogadores em batalhas épicas de conhecimento
        </p>
      </div>

      {/* Sala Ativa */}
      {activeRoom && (
        <Card className="mb-8 border-orange-500/50 bg-gradient-to-r from-orange-500/10 to-red-500/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-orange-500" />
              Batalha Ativa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {getModeIcon(activeRoom.mode)}
                <div>
                  <p className="font-semibold">{getModeLabel(activeRoom.mode)}</p>
                  <p className="text-sm text-muted-foreground">
                    {activeRoom.currentPlayers}/{activeRoom.maxPlayers} jogadores
                  </p>
                </div>
              </div>
              <Button onClick={() => router.push(`/battle/room/${activeRoom.id}`)}>
                Continuar Batalha
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="quick" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="quick">Partida Rápida</TabsTrigger>
          <TabsTrigger value="rooms">Salas Disponíveis</TabsTrigger>
          <TabsTrigger value="create">Criar Sala</TabsTrigger>
        </TabsList>

        {/* Partida Rápida */}
        <TabsContent value="quick" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Duelo 1v1 */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-blue-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Swords className="h-6 w-6 text-blue-500" />
                  Duelo 1v1
                </CardTitle>
                <CardDescription>
                  Batalha direta contra outro jogador
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="h-4 w-4" />
                    <span>10 questões</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>30s por questão</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="h-4 w-4" />
                    <span>Dificuldade média</span>
                  </div>
                </div>
                <Button className="w-full" onClick={() => {
                  setRoomMode('1v1')
                  handleCreateRoom()
                }}>
                  Buscar Oponente
                </Button>
              </CardContent>
            </Card>

            {/* Duplas 2v2 */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-green-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-green-500" />
                  Duplas 2v2
                </CardTitle>
                <CardDescription>
                  Forme uma dupla e enfrente outra dupla
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="h-4 w-4" />
                    <span>15 questões</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>30s por questão</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="h-4 w-4" />
                    <span>Dificuldade média</span>
                  </div>
                </div>
                <Button className="w-full" onClick={() => {
                  setRoomMode('2v2')
                  handleCreateRoom()
                }}>
                  Buscar Dupla
                </Button>
              </CardContent>
            </Card>

            {/* Grupo vs Grupo */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-purple-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-6 w-6 text-purple-500" />
                  Grupo vs Grupo
                </CardTitle>
                <CardDescription>
                  Batalha épica entre grupos de até 4 jogadores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="h-4 w-4" />
                    <span>20 questões</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>45s por questão</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="h-4 w-4" />
                    <span>Dificuldade alta</span>
                  </div>
                </div>
                <Button className="w-full" onClick={() => {
                  setRoomMode('group')
                  handleCreateRoom()
                }}>
                  Buscar Grupo
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Entrar por código */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Entrar com Código
              </CardTitle>
              <CardDescription>
                Tem um código de convite? Entre na sala privada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Digite o código (ex: ABC123)"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                  maxLength={6}
                />
                <Button onClick={handleJoinByCode} disabled={!inviteCode.trim()}>
                  Entrar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Salas Disponíveis */}
        <TabsContent value="rooms" className="space-y-4">
          {availableRooms.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Nenhuma sala disponível no momento. Que tal criar uma?
                </p>
              </CardContent>
            </Card>
          ) : (
            availableRooms.map((room) => (
              <Card key={room.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getModeIcon(room.mode)}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{getModeLabel(room.mode)}</h3>
                          <Badge className={getDifficultyColor(room.settings.difficulty)}>
                            {room.settings.difficulty}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{room.currentPlayers}/{room.maxPlayers} jogadores</span>
                          <span>{room.settings.questionsCount} questões</span>
                          <span>{room.settings.timePerQuestion / 1000}s por questão</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Jogadores na sala */}
                      <div className="flex -space-x-2">
                        {room.players.slice(0, 3).map((player) => (
                          <Avatar key={player.id} className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.name}`} />
                            <AvatarFallback>{format.text.initials(player.name)}</AvatarFallback>
                          </Avatar>
                        ))}
                        {room.players.length > 3 && (
                          <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                            +{room.players.length - 3}
                          </div>
                        )}
                      </div>

                      <Button onClick={() => handleJoinRoom(room.id)}>
                        Entrar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Criar Sala */}
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Criar Nova Sala
              </CardTitle>
              <CardDescription>
                Configure sua batalha personalizada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Modo de Jogo */}
                <div className="space-y-2">
                  <Label>Modo de Jogo</Label>
                  <Select value={roomMode} onValueChange={(value: BattleMode) => setRoomMode(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1v1">Duelo 1v1</SelectItem>
                      <SelectItem value="2v2">Duplas 2v2</SelectItem>
                      <SelectItem value="group">Grupo vs Grupo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Dificuldade */}
                <div className="space-y-2">
                  <Label>Dificuldade</Label>
                  <Select value={difficulty} onValueChange={(value: 'facil' | 'medio' | 'dificil') => setDifficulty(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facil">Fácil</SelectItem>
                      <SelectItem value="medio">Médio</SelectItem>
                      <SelectItem value="dificil">Difícil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Número de Questões */}
                <div className="space-y-2">
                  <Label>Número de Questões</Label>
                  <Select value={questionsCount.toString()} onValueChange={(value) => setQuestionsCount(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 questões</SelectItem>
                      <SelectItem value="10">10 questões</SelectItem>
                      <SelectItem value="15">15 questões</SelectItem>
                      <SelectItem value="20">20 questões</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tempo por Questão */}
                <div className="space-y-2">
                  <Label>Tempo por Questão</Label>
                  <Select value={timePerQuestion.toString()} onValueChange={(value) => setTimePerQuestion(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 segundos</SelectItem>
                      <SelectItem value="30">30 segundos</SelectItem>
                      <SelectItem value="45">45 segundos</SelectItem>
                      <SelectItem value="60">60 segundos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Sala Privada */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="private"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="private">Sala privada (apenas por convite)</Label>
              </div>

              <Button onClick={handleCreateRoom} className="w-full" size="lg">
                <Plus className="h-4 w-4 mr-2" />
                Criar Sala
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

