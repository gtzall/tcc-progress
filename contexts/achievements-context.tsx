"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Trophy, Star, Target, TrendingUp, Calendar, Award, BookOpen, BarChart3, Brain, Heart, Clock, CheckCircle, Zap, Flame, Shield, Crown, Medal, Gem, Diamond, Play } from 'lucide-react'
import { Achievement, GameStats, AchievementCategory, AchievementRarity } from '@/lib/types'
import { APP_CONFIG } from '@/lib/config'
import { storage } from '@/lib/utils'

interface AchievementsContextType {
  achievements: Achievement[]
  gameStats: GameStats
  unlockAchievement: (achievementId: string) => void
  updateProgress: (stats: Partial<GameStats>) => void
  getUnlockedAchievements: () => Achievement[]
  getLockedAchievements: () => Achievement[]
  getAchievementProgress: (achievementId: string) => number
  resetStats: () => void
  getAchievementsByCategory: (category: AchievementCategory) => Achievement[]
  getAchievementsByRarity: (rarity: AchievementRarity) => Achievement[]
  getTotalXP: () => number
  getLevelProgress: () => { currentLevel: number; currentXP: number; xpToNextLevel: number; progressPercentage: number }
}

const defaultStats: GameStats = {
  id: 'default',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  userId: 'default',
  totalQuizzes: 0,
  totalCorrectAnswers: 0,
  totalWrongAnswers: 0,
  totalScore: 0,
  currentLevel: 1,
  totalXP: 0,
  streakDays: 0,
  perfectScores: 0,
  demoQuizzes: 0,
  demoPerfectScores: 0,
  fastestQuizTime: 0,
  subjectsMastered: [],
  lastQuizDate: undefined,
  achievements: [],
  hasSeenTutorial: false,
  weeklyStats: {
    week: '',
    quizzesCompleted: 0,
    averageScore: 0,
    totalXP: 0,
    streakDays: 0
  },
  monthlyStats: {
    month: '',
    quizzesCompleted: 0,
    averageScore: 0,
    totalXP: 0,
    achievementsUnlocked: 0
  },
  yearlyStats: {
    year: new Date().getFullYear(),
    quizzesCompleted: 0,
    averageScore: 0,
    totalXP: 0,
    achievementsUnlocked: 0,
    levelProgress: 0
  }
}

const defaultAchievements: Achievement[] = [
  {
    id: "first-quiz",
    name: "Primeiro Passo",
    description: "Complete seu primeiro quiz",
    icon: "Target",
    category: "quiz",
    rarity: "common",
    xpReward: 100,
    pointsReward: 50,
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    condition: (stats) => stats.totalQuizzes >= 1,
    progressFunction: (stats) => Math.min(stats.totalQuizzes, 1)
  },
  {
    id: "first-demo",
    name: "Experimentador",
    description: "Complete seu primeiro quiz demo",
    icon: "Play",
    category: "demo",
    rarity: "common",
    xpReward: 50,
    pointsReward: 25,
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    condition: (stats) => stats.demoQuizzes >= 1,
    progressFunction: (stats) => Math.min(stats.demoQuizzes, 1)
  },
  {
    id: "perfect-score",
    name: "Perfeição",
    description: "Acerte 100% em um quiz",
    icon: "Star",
    category: "quiz",
    rarity: "rare",
    xpReward: 250,
    pointsReward: 100,
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    condition: (stats) => stats.perfectScores >= 1,
    progressFunction: (stats) => Math.min(stats.perfectScores, 1)
  },
  {
    id: "perfect-demo",
    name: "Demo Perfeito",
    description: "Acerte 100% em um quiz demo",
    icon: "Star",
    category: "demo",
    rarity: "rare",
    xpReward: 150,
    pointsReward: 75,
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    condition: (stats) => stats.demoPerfectScores >= 1,
    progressFunction: (stats) => Math.min(stats.demoPerfectScores, 1)
  },
  {
    id: "streak-3",
    name: "Consistência",
    description: "Complete quizzes por 3 dias seguidos",
    icon: "Flame",
    category: "streak",
    rarity: "epic",
    xpReward: 300,
    pointsReward: 150,
    progress: 0,
    maxProgress: 3,
    unlocked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    condition: (stats) => stats.streakDays >= 3,
    progressFunction: (stats) => Math.min(stats.streakDays, 3)
  },
  {
    id: "streak-7",
    name: "Semana de Foco",
    description: "Complete quizzes por 7 dias seguidos",
    icon: "Flame",
    category: "streak",
    rarity: "epic",
    xpReward: 500,
    pointsReward: 200,
    progress: 0,
    maxProgress: 7,
    unlocked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    condition: (stats) => stats.streakDays >= 7,
    progressFunction: (stats) => Math.min(stats.streakDays, 7)
  },
  {
    id: "level-5",
    name: "Aprendiz Avançado",
    description: "Alcance o nível 5",
    icon: "TrendingUp",
    category: "mastery",
    rarity: "rare",
    xpReward: 400,
    pointsReward: 200,
    progress: 0,
    maxProgress: 5,
    unlocked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    condition: (stats) => stats.currentLevel >= 5,
    progressFunction: (stats) => Math.min(stats.currentLevel, 5)
  },
  {
    id: "level-10",
    name: "Mestre do Conhecimento",
    description: "Alcance o nível 10",
    icon: "Crown",
    category: "mastery",
    rarity: "legendary",
    xpReward: 1000,
    pointsReward: 500,
    progress: 0,
    maxProgress: 10,
    unlocked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    condition: (stats) => stats.currentLevel >= 10,
    progressFunction: (stats) => Math.min(stats.currentLevel, 10)
  },
  {
    id: "speed-demon",
    name: "Velocidade da Luz",
    description: "Complete um quiz em menos de 2 minutos",
    icon: "Zap",
    category: "speed",
    rarity: "rare",
    xpReward: 300,
    pointsReward: 150,
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    condition: (stats) => stats.fastestQuizTime > 0 && stats.fastestQuizTime <= 120,
    progressFunction: (stats) => stats.fastestQuizTime > 0 && stats.fastestQuizTime <= 120 ? 1 : 0
  },
  {
    id: "quiz-master",
    name: "Mestre dos Quizzes",
    description: "Complete 50 quizzes no total",
    icon: "Trophy",
    category: "quiz",
    rarity: "legendary",
    xpReward: 1500,
    pointsReward: 750,
    progress: 0,
    maxProgress: 50,
    unlocked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    condition: (stats) => stats.totalQuizzes >= 50,
    progressFunction: (stats) => Math.min(stats.totalQuizzes, 50)
  },
  {
    id: "demo-master",
    name: "Mestre do Demo",
    description: "Complete 10 quizzes demo",
    icon: "Play",
    category: "demo",
    rarity: "epic",
    xpReward: 600,
    pointsReward: 300,
    progress: 0,
    maxProgress: 10,
    unlocked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    condition: (stats) => stats.demoQuizzes >= 10,
    progressFunction: (stats) => Math.min(stats.demoQuizzes, 10)
  },
  {
    id: "score-1000",
    name: "Pontuação Milenar",
    description: "Alcance 1000 pontos totais",
    icon: "Medal",
    category: "quiz",
    rarity: "rare",
    xpReward: 400,
    pointsReward: 200,
    progress: 0,
    maxProgress: 1000,
    unlocked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    condition: (stats) => stats.totalScore >= 1000,
    progressFunction: (stats) => Math.min(stats.totalScore, 1000)
  },
  {
    id: "score-5000",
    name: "Pontuação Épica",
    description: "Alcance 5000 pontos totais",
    icon: "Diamond",
    category: "quiz",
    rarity: "legendary",
    xpReward: 2000,
    pointsReward: 1000,
    progress: 0,
    maxProgress: 5000,
    unlocked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    condition: (stats) => stats.totalScore >= 5000,
    progressFunction: (stats) => Math.min(stats.totalScore, 5000)
  }
]

const AchievementsContext = createContext<AchievementsContextType | undefined>(undefined)

export function AchievementsProvider({ children }: { children: ReactNode }) {
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements)
  const [gameStats, setGameStats] = useState<GameStats>(defaultStats)

  // Load stats from localStorage on mount
  useEffect(() => {
    const savedStats = storage.get<GameStats>(APP_CONFIG.storage.keys.stats)
    const savedAchievements = storage.get<Achievement[]>(APP_CONFIG.storage.keys.achievements)
    
    if (savedStats) {
      setGameStats(savedStats)
    }
    
    if (savedAchievements) {
      // Restore functions that are lost during JSON serialization
      const restoredAchievements = defaultAchievements.map(defaultAchievement => {
        const savedAchievement = savedAchievements.find((a: any) => a.id === defaultAchievement.id)
        if (savedAchievement) {
          return {
            ...savedAchievement,
            condition: defaultAchievement.condition,
            progressFunction: defaultAchievement.progressFunction
          }
        }
        return defaultAchievement
      })
      setAchievements(restoredAchievements)
    }
  }, [])

  // Save stats to localStorage whenever they change
  useEffect(() => {
    storage.set(APP_CONFIG.storage.keys.stats, gameStats)
  }, [gameStats])

  // Save achievements to localStorage whenever they change
  useEffect(() => {
    storage.set(APP_CONFIG.storage.keys.achievements, achievements)
  }, [achievements])

  // Update achievement progress based on current stats
  useEffect(() => {
    setAchievements(prev => prev.map(achievement => ({
      ...achievement,
      progress: achievement.progressFunction(gameStats),
      unlocked: achievement.condition(gameStats)
    })))
  }, [gameStats])

  const unlockAchievement = (achievementId: string) => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.id === achievementId && !achievement.unlocked) {
        return {
          ...achievement,
          unlocked: true,
          unlockedAt: new Date().toISOString().split('T')[0]
        }
      }
      return achievement
    }))

    setGameStats(prev => ({
      ...prev,
      achievements: [...prev.achievements, achievementId]
    }))
  }

  const updateProgress = (newStats: Partial<GameStats>) => {
    setGameStats(prev => {
      const updated = { ...prev, ...newStats }
      
      // Check for new achievements
      achievements.forEach(achievement => {
        if (!achievement.unlocked && achievement.condition(updated)) {
          unlockAchievement(achievement.id)
        }
      })
      
      return updated
    })
  }

  const getUnlockedAchievements = () => {
    return achievements.filter(a => a.unlocked)
  }

  const getLockedAchievements = () => {
    return achievements.filter(a => !a.unlocked)
  }

  const getAchievementProgress = (achievementId: string) => {
    const achievement = achievements.find(a => a.id === achievementId)
    return achievement ? achievement.progress : 0
  }

  const getAchievementsByCategory = (category: AchievementCategory) => {
    return achievements.filter(a => a.category === category)
  }

  const getAchievementsByRarity = (rarity: AchievementRarity) => {
    return achievements.filter(a => a.rarity === rarity)
  }

  const getTotalXP = () => {
    return achievements
      .filter(a => a.unlocked)
      .reduce((total, a) => total + a.xpReward, 0)
  }

  const getLevelProgress = () => {
    const xpPerLevel = APP_CONFIG.game.levels.xpPerLevel
    const currentLevel = gameStats.currentLevel
    const currentXP = gameStats.totalXP % xpPerLevel
    const xpToNextLevel = xpPerLevel - currentXP
    const progressPercentage = (currentXP / xpPerLevel) * 100

    return {
      currentLevel,
      currentXP,
      xpToNextLevel,
      progressPercentage
    }
  }

  const resetStats = () => {
    setGameStats(defaultStats)
    setAchievements(defaultAchievements)
    storage.remove(APP_CONFIG.storage.keys.stats)
    storage.remove(APP_CONFIG.storage.keys.achievements)
  }

  return (
    <AchievementsContext.Provider value={{
      achievements,
      gameStats,
      unlockAchievement,
      updateProgress,
      getUnlockedAchievements,
      getLockedAchievements,
      getAchievementProgress,
      resetStats,
      getAchievementsByCategory,
      getAchievementsByRarity,
      getTotalXP,
      getLevelProgress
    }}>
      {children}
    </AchievementsContext.Provider>
  )
}

export function useAchievements() {
  const context = useContext(AchievementsContext)
  if (context === undefined) {
    throw new Error('useAchievements must be used within an AchievementsProvider')
  }
  return context
}
