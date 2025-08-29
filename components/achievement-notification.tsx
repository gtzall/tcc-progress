"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Trophy, Star, Target, TrendingUp, Flame, Zap, Crown, Medal, Diamond } from "lucide-react"
import { useEffect, useState } from "react"

interface AchievementNotificationProps {
  achievement: {
    id: string
    name: string
    description: string
    rarity: 'common' | 'rare' | 'epic' | 'legendary'
    xpReward: number
    pointsReward: number
  }
  onClose: () => void
}

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'common': return 'text-gray-400'
    case 'rare': return 'text-blue-400'
    case 'epic': return 'text-purple-400'
    case 'legendary': return 'text-orange-400'
    default: return 'text-gray-400'
  }
}

const getRarityGradient = (rarity: string) => {
  switch (rarity) {
    case 'common': return 'from-gray-400 to-gray-500'
    case 'rare': return 'from-blue-400 to-cyan-500'
    case 'epic': return 'from-purple-400 to-pink-500'
    case 'legendary': return 'from-orange-400 to-yellow-500'
    default: return 'from-gray-400 to-gray-500'
  }
}

const getRarityIcon = (rarity: string) => {
  switch (rarity) {
    case 'common': return <Target className="h-6 w-6" />
    case 'rare': return <Star className="h-6 w-6" />
    case 'epic': return <Flame className="h-6 w-6" />
    case 'legendary': return <Crown className="h-6 w-6" />
    default: return <Trophy className="h-6 w-6" />
  }
}

export default function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 500) // Wait for exit animation
    }, 4000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed top-4 right-4 z-50 max-w-sm w-full"
        >
          <div className={`relative overflow-hidden rounded-xl border-2 bg-gradient-to-r ${getRarityGradient(achievement.rarity)} p-0.5`}>
            <div className="bg-black/90 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-start gap-3">
                <motion.div
                  className={`p-2 rounded-lg bg-gradient-to-r ${getRarityGradient(achievement.rarity)} bg-opacity-20`}
                  animate={{ 
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: 2,
                    repeatType: "reverse"
                  }}
                >
                  {getRarityIcon(achievement.rarity)}
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-bold text-sm ${getRarityColor(achievement.rarity)}`}>
                      {achievement.name}
                    </h3>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ 
                        duration: 1,
                        repeat: 1,
                        repeatType: "reverse"
                      }}
                    >
                      <Trophy className="h-4 w-4 text-yellow-400" />
                    </motion.div>
                  </div>
                  
                  <p className="text-xs text-gray-300 mb-2">
                    {achievement.description}
                  </p>
                  
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400" />
                      <span className="text-yellow-400">+{achievement.xpReward} XP</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Medal className="h-3 w-3 text-cyan-400" />
                      <span className="text-cyan-400">+{achievement.pointsReward} pts</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Progress bar */}
              <motion.div 
                className="w-full bg-gray-700 rounded-full h-1 mt-3 overflow-hidden"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div 
                  className={`h-full bg-gradient-to-r ${getRarityGradient(achievement.rarity)}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </motion.div>
            </div>
          </div>
          
          {/* Sparkle effects */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + (i % 2) * 80}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
