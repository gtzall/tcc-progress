"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Heart, 
  Zap, 
  Target, 
  Trophy, 
  Star, 
  Shield, 
  Battery,
  Wifi,
  Signal
} from "lucide-react"

interface GameHUDProps {
  playerHealth: number
  playerEnergy: number
  playerScore: number
  playerLevel: number
  comboCount: number
  currentMission: string
  achievements: string[]
}

export default function GameHUD({
  playerHealth = 100,
  playerEnergy = 100,
  playerScore = 0,
  playerLevel = 1,
  comboCount = 0,
  currentMission = "Complete the quiz",
  achievements = []
}: GameHUDProps) {
  const [showMission, setShowMission] = useState(true)
  const [showAchievement, setShowAchievement] = useState(false)
  const [latestAchievement, setLatestAchievement] = useState("")

  useEffect(() => {
    if (achievements.length > 0) {
      setLatestAchievement(achievements[achievements.length - 1])
      setShowAchievement(true)
      setTimeout(() => setShowAchievement(false), 3000)
    }
  }, [achievements])

  return (
    <>
      {/* Top HUD Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="flex justify-between items-center">
          {/* Player Stats */}
          <div className="flex items-center space-x-4">
            {/* Health Bar */}
            <div className="hud-element px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-500" />
                <div className="w-24 h-3 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-500 to-red-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${playerHealth}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-red-400 text-sm font-mono">{playerHealth}</span>
              </div>
            </div>

            {/* Energy Bar */}
            <div className="hud-element px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <div className="w-24 h-3 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full energy-bar rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${playerEnergy}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-yellow-400 text-sm font-mono">{playerEnergy}</span>
              </div>
            </div>

            {/* Shield */}
            <div className="hud-element px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <span className="text-blue-400 text-sm font-mono">100%</span>
              </div>
            </div>
          </div>

          {/* Center Mission */}
          <AnimatePresence>
            {showMission && (
              <motion.div
                className="mission-objective px-6 py-3 rounded-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-cyan-500" />
                  <span className="text-cyan-400 text-sm font-medium">{currentMission}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Side Stats */}
          <div className="flex items-center space-x-4">
            {/* Combo Counter */}
            {comboCount > 0 && (
              <motion.div
                className="combo-counter px-4 py-2 rounded-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-white" />
                  <span className="text-white font-bold text-lg">{comboCount}x</span>
                  <span className="text-white text-sm">COMBO</span>
                </div>
              </motion.div>
            )}

            {/* Score */}
            <div className="hud-element px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="text-yellow-400 font-mono text-lg">{playerScore.toLocaleString()}</span>
              </div>
            </div>

            {/* Level */}
            <div className="hud-element px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-pulse" />
                <span className="text-green-400 font-mono text-lg">LV.{playerLevel}</span>
              </div>
            </div>

            {/* Connection Status */}
            <div className="hud-element px-3 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <Wifi className="h-4 w-4 text-green-500" />
                <Signal className="h-4 w-4 text-green-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Notification */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            className="fixed top-24 right-4 z-50 achievement-unlock"
            initial={{ opacity: 0, x: 100, scale: 0 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0 }}
          >
            <div className="hud-element px-6 py-4 rounded-lg max-w-sm">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-yellow-400 font-bold text-sm">ACHIEVEMENT UNLOCKED!</h3>
                  <p className="text-white text-xs">{latestAchievement}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Bottom HUD */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
        <div className="flex justify-center">
          <div className="hud-element px-6 py-3 rounded-lg">
            <div className="flex items-center space-x-6">
              {/* Weapon/Ability Slots */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-800 border-2 border-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-cyan-400 text-xs font-mono">Q</span>
                </div>
                <div className="w-12 h-12 bg-gray-800 border-2 border-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-purple-400 text-xs font-mono">W</span>
                </div>
                <div className="w-12 h-12 bg-gray-800 border-2 border-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-green-400 text-xs font-mono">E</span>
                </div>
              </div>

              {/* Mini Map */}
              <div className="w-32 h-20 bg-gray-800 border-2 border-blue-500 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50" />
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-500 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute top-2 left-2 text-blue-400 text-xs font-mono">MAP</div>
              </div>

              {/* Status Effects */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-900/50 border border-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-green-400 text-xs">+</span>
                </div>
                <div className="w-8 h-8 bg-blue-900/50 border border-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-blue-400 text-xs">⚡</span>
                </div>
                <div className="w-8 h-8 bg-purple-900/50 border border-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-purple-400 text-xs">🛡️</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
