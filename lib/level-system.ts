// This file implements the core level system logic

export interface LevelSystemOptions {
  baseXP: number
  xpMultiplier: number
  maxLevel: number
  onLevelUp?: (newLevel: number, rewards: Reward[]) => void
}

export interface Reward {
  id: string
  name: string
  description: string
  type: "tema" | "avatar" | "poder" | "medalha" | "título"
}

export interface LevelProgress {
  currentLevel: number
  currentXP: number
  xpForNextLevel: number
  totalXP: number
  progress: number
}

export class LevelSystem {
  private baseXP: number
  private xpMultiplier: number
  private maxLevel: number
  private onLevelUp?: (newLevel: number, rewards: Reward[]) => void
  private levelRewards: Map<number, Reward[]>

  constructor(options: LevelSystemOptions) {
    this.baseXP = options.baseXP || 100
    this.xpMultiplier = options.xpMultiplier || 1.5
    this.maxLevel = options.maxLevel || 50
    this.onLevelUp = options.onLevelUp
    this.levelRewards = new Map()

    // Initialize level rewards
    this.initializeLevelRewards()
  }

  private initializeLevelRewards() {
    // Level 2 rewards
    this.levelRewards.set(2, [
      {
        id: "tema-espacial",
        name: "Tema Espacial",
        description: "Transforme a interface do jogo com um tema espacial futurista.",
        type: "tema",
      },
    ])

    // Level 3 rewards
    this.levelRewards.set(3, [
      {
        id: "avatar-astronauta",
        name: "Avatar Astronauta",
        description: "Um avatar exclusivo de astronauta para seu perfil.",
        type: "avatar",
      },
    ])

    // Level 4 rewards
    this.levelRewards.set(4, [
      {
        id: "poder-dica",
        name: "Poder de Dica",
        description: "Receba uma dica durante as questões difíceis.",
        type: "poder",
      },
    ])

    // Level 5 rewards
    this.levelRewards.set(5, [
      {
        id: "tema-neon",
        name: "Tema Neon",
        description: "Um tema vibrante com cores neon para a interface do jogo.",
        type: "tema",
      },
      {
        id: "titulo-estudioso",
        name: "Título: Estudioso",
        description: "Um título exclusivo para exibir junto ao seu nome.",
        type: "título",
      },
    ])

    // Add more level rewards as needed...
    this.levelRewards.set(10, [
      {
        id: "titulo-mestre",
        name: "Título: Mestre do Quiz",
        description: "Um título exclusivo para exibir junto ao seu nome.",
        type: "título",
      },
    ])
  }

  /**
   * Calculate XP required for a specific level
   */
  public getXPForLevel(level: number): number {
    return Math.floor(this.baseXP * Math.pow(this.xpMultiplier, level - 1))
  }

  /**
   * Calculate total XP required to reach a specific level
   */
  public getTotalXPForLevel(level: number): number {
    let totalXP = 0
    for (let i = 1; i < level; i++) {
      totalXP += this.getXPForLevel(i)
    }
    return totalXP
  }

  /**
   * Get level progress information based on total XP
   */
  public getLevelProgress(totalXP: number): LevelProgress {
    let level = 1
    let xpForCurrentLevel = this.getXPForLevel(level)
    let accumulatedXP = 0

    // Find the current level based on total XP
    while (accumulatedXP + xpForCurrentLevel <= totalXP && level < this.maxLevel) {
      accumulatedXP += xpForCurrentLevel
      level++
      xpForCurrentLevel = this.getXPForLevel(level)
    }

    const currentXP = totalXP - accumulatedXP
    const xpForNextLevel = this.getXPForLevel(level)
    const progress = (currentXP / xpForNextLevel) * 100

    return {
      currentLevel: level,
      currentXP,
      xpForNextLevel,
      totalXP,
      progress,
    }
  }

  /**
   * Add XP to a player and handle level ups
   */
  public addXP(
    currentTotalXP: number,
    xpToAdd: number,
  ): { newTotalXP: number; leveledUp: boolean; newLevel: number; oldLevel: number; rewards: Reward[] } {
    const oldProgress = this.getLevelProgress(currentTotalXP)
    const oldLevel = oldProgress.currentLevel

    const newTotalXP = currentTotalXP + xpToAdd
    const newProgress = this.getLevelProgress(newTotalXP)
    const newLevel = newProgress.currentLevel

    const leveledUp = newLevel > oldLevel
    const rewards: Reward[] = []

    // If leveled up, collect all rewards for the levels gained
    if (leveledUp) {
      for (let level = oldLevel + 1; level <= newLevel; level++) {
        const levelRewards = this.levelRewards.get(level) || []
        rewards.push(...levelRewards)

        // Call the onLevelUp callback if provided
        if (this.onLevelUp) {
          this.onLevelUp(level, levelRewards)
        }
      }
    }

    return {
      newTotalXP,
      leveledUp,
      newLevel,
      oldLevel,
      rewards,
    }
  }

  /**
   * Get rewards for a specific level
   */
  public getRewardsForLevel(level: number): Reward[] {
    return this.levelRewards.get(level) || []
  }

  /**
   * Get all rewards up to a specific level
   */
  public getAllRewardsUpToLevel(level: number): Reward[] {
    const allRewards: Reward[] = []
    for (let i = 1; i <= level; i++) {
      const levelRewards = this.levelRewards.get(i) || []
      allRewards.push(...levelRewards)
    }
    return allRewards
  }
}

// Create a singleton instance with default settings
export const levelSystem = new LevelSystem({
  baseXP: 100,
  xpMultiplier: 1.5,
  maxLevel: 50,
})

// Helper functions to calculate XP rewards
export function calculateQuizXP(difficulty: string, correctAnswers: number, totalQuestions: number): number {
  const baseXP = difficulty === "facil" ? 10 : difficulty === "medio" ? 15 : 20
  const accuracyBonus = Math.floor((correctAnswers / totalQuestions) * 100) / 100
  const streakBonus = 1 // Could be increased based on answer streak

  return Math.floor(baseXP * correctAnswers * accuracyBonus * streakBonus)
}

export function calculateAchievementXP(achievementType: string): number {
  switch (achievementType) {
    case "basic":
      return 50
    case "intermediate":
      return 100
    case "advanced":
      return 200
    case "expert":
      return 300
    default:
      return 50
  }
}
