import { storage } from './utils'

export type BattleMode = '1v1' | '2v2' | 'group'
export type BattleStatus = 'waiting' | 'ready' | 'in_progress' | 'finished' | 'cancelled'
export type PlayerStatus = 'waiting' | 'ready' | 'playing' | 'finished'

export interface BattlePlayer {
  id: string
  name: string
  level: number
  xp: number
  avatar?: string
  status: PlayerStatus
  score: number
  answers: Array<{
    questionIndex: number
    selectedAnswer: number
    isCorrect: boolean
    timeSpent: number
  }>
  joinedAt: string
  readyAt?: string
  finishedAt?: string
}

export interface BattleRoom {
  id: string
  mode: BattleMode
  status: BattleStatus
  maxPlayers: number
  currentPlayers: number
  players: BattlePlayer[]
  teams?: {
    team1: BattlePlayer[]
    team2: BattlePlayer[]
  }
  questions: Array<{
    enunciado: string
    alternativas: string[]
    respostaCorreta: number
    tema: string
    explicacao: string
  }>
  settings: {
    questionsCount: number
    timePerQuestion: number
    difficulty: 'facil' | 'medio' | 'dificil'
    theme: string
  }
  createdAt: string
  startedAt?: string
  finishedAt?: string
  winner?: {
    type: 'player' | 'team'
    id: string
    name: string
    score: number
  }
  createdBy: string
  isPrivate: boolean
  inviteCode?: string
}

export interface BattleInvite {
  id: string
  roomId: string
  fromPlayerId: string
  fromPlayerName: string
  toPlayerId: string
  toPlayerName: string
  mode: BattleMode
  message?: string
  createdAt: string
  expiresAt: string
  status: 'pending' | 'accepted' | 'declined' | 'expired'
}

class BattleSystemService {
  private readonly ROOMS_KEY = 'quizmaster_battle_rooms'
  private readonly INVITES_KEY = 'quizmaster_battle_invites'
  private readonly ACTIVE_ROOM_KEY = 'quizmaster_active_room'

  // Obter todas as salas
  private getRooms(): BattleRoom[] {
    return storage.get<BattleRoom[]>(this.ROOMS_KEY) || []
  }

  // Salvar salas
  private saveRooms(rooms: BattleRoom[]): void {
    storage.set(this.ROOMS_KEY, rooms)
  }

  // Obter convites
  private getInvites(): BattleInvite[] {
    return storage.get<BattleInvite[]>(this.INVITES_KEY) || []
  }

  // Salvar convites
  private saveInvites(invites: BattleInvite[]): void {
    storage.set(this.INVITES_KEY, invites)
  }

  // Gerar ID único
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // Gerar código de convite
  private generateInviteCode(): string {
    return Math.random().toString(36).substr(2, 6).toUpperCase()
  }

  // Criar nova sala de batalha
  createRoom(
    creatorId: string,
    mode: BattleMode,
    settings: BattleRoom['settings'],
    isPrivate: boolean = false
  ): { success: boolean; room?: BattleRoom; error?: string } {
    const maxPlayers = mode === '1v1' ? 2 : mode === '2v2' ? 4 : 8
    
    const room: BattleRoom = {
      id: this.generateId(),
      mode,
      status: 'waiting',
      maxPlayers,
      currentPlayers: 0,
      players: [],
      questions: [],
      settings,
      createdAt: new Date().toISOString(),
      createdBy: creatorId,
      isPrivate,
      inviteCode: isPrivate ? this.generateInviteCode() : undefined
    }

    const rooms = this.getRooms()
    rooms.push(room)
    this.saveRooms(rooms)

    return { success: true, room }
  }

  // Entrar em uma sala
  joinRoom(
    roomId: string,
    player: Omit<BattlePlayer, 'status' | 'score' | 'answers' | 'joinedAt'>
  ): { success: boolean; room?: BattleRoom; error?: string } {
    const rooms = this.getRooms()
    const roomIndex = rooms.findIndex(r => r.id === roomId)

    if (roomIndex === -1) {
      return { success: false, error: 'Sala não encontrada' }
    }

    const room = rooms[roomIndex]

    if (room.status !== 'waiting') {
      return { success: false, error: 'Sala não está disponível para entrada' }
    }

    if (room.currentPlayers >= room.maxPlayers) {
      return { success: false, error: 'Sala está cheia' }
    }

    if (room.players.find(p => p.id === player.id)) {
      return { success: false, error: 'Jogador já está na sala' }
    }

    const battlePlayer: BattlePlayer = {
      ...player,
      status: 'waiting',
      score: 0,
      answers: [],
      joinedAt: new Date().toISOString()
    }

    room.players.push(battlePlayer)
    room.currentPlayers = room.players.length

    // Organizar em times se necessário
    if (room.mode === '2v2' || room.mode === 'group') {
      this.organizeTeams(room)
    }

    rooms[roomIndex] = room
    this.saveRooms(rooms)

    // Salvar sala ativa para o jogador
    storage.set(`${this.ACTIVE_ROOM_KEY}_${player.id}`, roomId)

    return { success: true, room }
  }

  // Organizar jogadores em times
  private organizeTeams(room: BattleRoom): void {
    if (!room.teams) {
      room.teams = { team1: [], team2: [] }
    }

    const playersPerTeam = room.maxPlayers / 2
    
    room.players.forEach((player, index) => {
      if (index < playersPerTeam) {
        if (!room.teams!.team1.find(p => p.id === player.id)) {
          room.teams!.team1.push(player)
        }
      } else {
        if (!room.teams!.team2.find(p => p.id === player.id)) {
          room.teams!.team2.push(player)
        }
      }
    })
  }

  // Sair de uma sala
  leaveRoom(roomId: string, playerId: string): { success: boolean; error?: string } {
    const rooms = this.getRooms()
    const roomIndex = rooms.findIndex(r => r.id === roomId)

    if (roomIndex === -1) {
      return { success: false, error: 'Sala não encontrada' }
    }

    const room = rooms[roomIndex]
    const playerIndex = room.players.findIndex(p => p.id === playerId)

    if (playerIndex === -1) {
      return { success: false, error: 'Jogador não está na sala' }
    }

    room.players.splice(playerIndex, 1)
    room.currentPlayers = room.players.length

    // Reorganizar times se necessário
    if (room.mode === '2v2' || room.mode === 'group') {
      room.teams = { team1: [], team2: [] }
      this.organizeTeams(room)
    }

    // Se a sala ficar vazia ou o criador sair, cancelar
    if (room.currentPlayers === 0 || room.createdBy === playerId) {
      room.status = 'cancelled'
    }

    rooms[roomIndex] = room
    this.saveRooms(rooms)

    // Remover sala ativa do jogador
    storage.remove(`${this.ACTIVE_ROOM_KEY}_${playerId}`)

    return { success: true }
  }

  // Marcar jogador como pronto
  setPlayerReady(roomId: string, playerId: string): { success: boolean; room?: BattleRoom; error?: string } {
    const rooms = this.getRooms()
    const roomIndex = rooms.findIndex(r => r.id === roomId)

    if (roomIndex === -1) {
      return { success: false, error: 'Sala não encontrada' }
    }

    const room = rooms[roomIndex]
    const playerIndex = room.players.findIndex(p => p.id === playerId)

    if (playerIndex === -1) {
      return { success: false, error: 'Jogador não está na sala' }
    }

    room.players[playerIndex].status = 'ready'
    room.players[playerIndex].readyAt = new Date().toISOString()

    // Verificar se todos estão prontos
    const allReady = room.players.every(p => p.status === 'ready')
    const hasMinPlayers = room.currentPlayers >= (room.mode === '1v1' ? 2 : 2)

    if (allReady && hasMinPlayers) {
      room.status = 'ready'
    }

    rooms[roomIndex] = room
    this.saveRooms(rooms)

    return { success: true, room }
  }

  // Iniciar batalha
  async startBattle(roomId: string): Promise<{ success: boolean; room?: BattleRoom; error?: string }> {
    const rooms = this.getRooms()
    const roomIndex = rooms.findIndex(r => r.id === roomId)

    if (roomIndex === -1) {
      return { success: false, error: 'Sala não encontrada' }
    }

    const room = rooms[roomIndex]

    if (room.status !== 'ready') {
      return { success: false, error: 'Sala não está pronta para iniciar' }
    }

    // Carregar questões
    try {
      const response = await fetch('/api/questions')
      const questionsData = await response.json()
      
      const difficultyQuestions = questionsData[room.settings.difficulty] || []
      const selectedQuestions = this.shuffleArray(difficultyQuestions)
        .slice(0, room.settings.questionsCount)

      room.questions = selectedQuestions
      room.status = 'in_progress'
      room.startedAt = new Date().toISOString()

      // Marcar todos os jogadores como jogando
      room.players.forEach(player => {
        player.status = 'playing'
      })

      rooms[roomIndex] = room
      this.saveRooms(rooms)

      return { success: true, room }
    } catch (error) {
      return { success: false, error: 'Erro ao carregar questões' }
    }
  }

  // Embaralhar array
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Submeter resposta
  submitAnswer(
    roomId: string,
    playerId: string,
    questionIndex: number,
    selectedAnswer: number,
    timeSpent: number
  ): { success: boolean; room?: BattleRoom; error?: string } {
    const rooms = this.getRooms()
    const roomIndex = rooms.findIndex(r => r.id === roomId)

    if (roomIndex === -1) {
      return { success: false, error: 'Sala não encontrada' }
    }

    const room = rooms[roomIndex]
    const playerIndex = room.players.findIndex(p => p.id === playerId)

    if (playerIndex === -1) {
      return { success: false, error: 'Jogador não está na sala' }
    }

    const question = room.questions[questionIndex]
    if (!question) {
      return { success: false, error: 'Questão não encontrada' }
    }

    const isCorrect = selectedAnswer === question.respostaCorreta
    const player = room.players[playerIndex]

    // Verificar se já respondeu esta questão
    const existingAnswer = player.answers.find(a => a.questionIndex === questionIndex)
    if (existingAnswer) {
      return { success: false, error: 'Questão já foi respondida' }
    }

    // Adicionar resposta
    player.answers.push({
      questionIndex,
      selectedAnswer,
      isCorrect,
      timeSpent
    })

    // Calcular pontuação (acerto + bônus de velocidade)
    if (isCorrect) {
      const speedBonus = Math.max(0, room.settings.timePerQuestion - timeSpent) / 1000
      player.score += 100 + Math.floor(speedBonus * 10)
    }

    // Verificar se terminou todas as questões
    if (player.answers.length >= room.settings.questionsCount) {
      player.status = 'finished'
      player.finishedAt = new Date().toISOString()
    }

    // Verificar se todos terminaram
    const allFinished = room.players.every(p => p.status === 'finished')
    if (allFinished) {
      this.finishBattle(room)
    }

    rooms[roomIndex] = room
    this.saveRooms(rooms)

    return { success: true, room }
  }

  // Finalizar batalha
  private finishBattle(room: BattleRoom): void {
    room.status = 'finished'
    room.finishedAt = new Date().toISOString()

    // Determinar vencedor
    if (room.mode === '1v1') {
      const sortedPlayers = [...room.players].sort((a, b) => b.score - a.score)
      room.winner = {
        type: 'player',
        id: sortedPlayers[0].id,
        name: sortedPlayers[0].name,
        score: sortedPlayers[0].score
      }
    } else if (room.teams) {
      const team1Score = room.teams.team1.reduce((sum, p) => sum + p.score, 0)
      const team2Score = room.teams.team2.reduce((sum, p) => sum + p.score, 0)
      
      if (team1Score > team2Score) {
        room.winner = {
          type: 'team',
          id: 'team1',
          name: 'Time 1',
          score: team1Score
        }
      } else if (team2Score > team1Score) {
        room.winner = {
          type: 'team',
          id: 'team2',
          name: 'Time 2',
          score: team2Score
        }
      }
    }

    // Limpar salas ativas dos jogadores
    room.players.forEach(player => {
      storage.remove(`${this.ACTIVE_ROOM_KEY}_${player.id}`)
    })
  }

  // Obter sala ativa do jogador
  getActiveRoom(playerId: string): BattleRoom | null {
    const roomId = storage.get<string>(`${this.ACTIVE_ROOM_KEY}_${playerId}`)
    if (!roomId) return null

    const rooms = this.getRooms()
    return rooms.find(r => r.id === roomId) || null
  }

  // Listar salas disponíveis
  getAvailableRooms(): BattleRoom[] {
    const rooms = this.getRooms()
    return rooms.filter(room => 
      room.status === 'waiting' && 
      !room.isPrivate && 
      room.currentPlayers < room.maxPlayers
    )
  }

  // Entrar por código de convite
  joinByInviteCode(
    inviteCode: string,
    player: Omit<BattlePlayer, 'status' | 'score' | 'answers' | 'joinedAt'>
  ): { success: boolean; room?: BattleRoom; error?: string } {
    const rooms = this.getRooms()
    const room = rooms.find(r => r.inviteCode === inviteCode)

    if (!room) {
      return { success: false, error: 'Código de convite inválido' }
    }

    return this.joinRoom(room.id, player)
  }

  // Criar convite direto
  createInvite(
    fromPlayerId: string,
    fromPlayerName: string,
    toPlayerId: string,
    toPlayerName: string,
    roomId: string,
    mode: BattleMode,
    message?: string
  ): { success: boolean; invite?: BattleInvite; error?: string } {
    const invite: BattleInvite = {
      id: this.generateId(),
      roomId,
      fromPlayerId,
      fromPlayerName,
      toPlayerId,
      toPlayerName,
      mode,
      message,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutos
      status: 'pending'
    }

    const invites = this.getInvites()
    invites.push(invite)
    this.saveInvites(invites)

    return { success: true, invite }
  }

  // Obter convites do jogador
  getPlayerInvites(playerId: string): BattleInvite[] {
    const invites = this.getInvites()
    const now = new Date()

    return invites
      .filter(invite => invite.toPlayerId === playerId)
      .map(invite => {
        // Marcar como expirado se passou do tempo
        if (new Date(invite.expiresAt) < now && invite.status === 'pending') {
          invite.status = 'expired'
        }
        return invite
      })
      .filter(invite => invite.status !== 'expired')
  }

  // Responder convite
  respondToInvite(
    inviteId: string,
    response: 'accepted' | 'declined',
    player?: Omit<BattlePlayer, 'status' | 'score' | 'answers' | 'joinedAt'>
  ): { success: boolean; room?: BattleRoom; error?: string } {
    const invites = this.getInvites()
    const inviteIndex = invites.findIndex(i => i.id === inviteId)

    if (inviteIndex === -1) {
      return { success: false, error: 'Convite não encontrado' }
    }

    const invite = invites[inviteIndex]
    
    if (invite.status !== 'pending') {
      return { success: false, error: 'Convite não está mais disponível' }
    }

    if (new Date(invite.expiresAt) < new Date()) {
      invite.status = 'expired'
      invites[inviteIndex] = invite
      this.saveInvites(invites)
      return { success: false, error: 'Convite expirado' }
    }

    invite.status = response
    invites[inviteIndex] = invite
    this.saveInvites(invites)

    if (response === 'accepted' && player) {
      return this.joinRoom(invite.roomId, player)
    }

    return { success: true }
  }
}

// Instância singleton do serviço de batalhas
export const battleSystem = new BattleSystemService()

// Hook para usar o sistema de batalhas em componentes React
export function useBattleSystem() {
  return {
    createRoom: battleSystem.createRoom.bind(battleSystem),
    joinRoom: battleSystem.joinRoom.bind(battleSystem),
    leaveRoom: battleSystem.leaveRoom.bind(battleSystem),
    setPlayerReady: battleSystem.setPlayerReady.bind(battleSystem),
    startBattle: battleSystem.startBattle.bind(battleSystem),
    submitAnswer: battleSystem.submitAnswer.bind(battleSystem),
    getActiveRoom: battleSystem.getActiveRoom.bind(battleSystem),
    getAvailableRooms: battleSystem.getAvailableRooms.bind(battleSystem),
    joinByInviteCode: battleSystem.joinByInviteCode.bind(battleSystem),
    createInvite: battleSystem.createInvite.bind(battleSystem),
    getPlayerInvites: battleSystem.getPlayerInvites.bind(battleSystem),
    respondToInvite: battleSystem.respondToInvite.bind(battleSystem)
  }
}

