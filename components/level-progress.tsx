"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gift, Crown, Medal, Zap } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface LevelProgressProps {
  currentLevel: number
  currentXP: number
  xpForNextLevel: number
  showDetails?: boolean
}

export default function LevelProgress({
  currentLevel = 1,
  currentXP = 350,
  xpForNextLevel = 500,
  showDetails = false,
}: LevelProgressProps) {
  const [showLevelUpAnimation, setShowLevelUpAnimation] = useState(false)
  const progressPercentage = (currentXP / xpForNextLevel) * 100

  const simulateLevelUp = () => {
    setShowLevelUpAnimation(true)
    setTimeout(() => setShowLevelUpAnimation(false), 3000)
  }

  return (
    <div className="relative">
      {/* Level Up Animation */}
      <AnimatePresence>
        {showLevelUpAnimation && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-black/70 backdrop-blur-sm p-8 rounded-xl border-2 border-yellow-500 text-center"
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: -100 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ rotate: [0, 15, -15, 15, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: 1 }}
              >
                🏆
              </motion.div>
              <h2 className="text-2xl font-bold text-yellow-400 mb-2">Nível Alcançado!</h2>
              <p className="text-white text-lg">Você alcançou o nível {currentLevel + 1}!</p>
              <p className="text-blue-400 mt-2">Nova recompensa desbloqueada: Tema Espacial</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-gray-900/70 backdrop-blur-sm border border-blue-900/50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-lg font-bold">{currentLevel}</span>
              </div>
              {currentLevel >= 5 && (
                <div className="absolute -top-1 -right-1">
                  <Crown className="h-4 w-4 text-yellow-400" />
                </div>
              )}
            </div>
            <div className="ml-3">
              <div className="flex items-center">
                <h3 className="font-bold text-lg">Nível {currentLevel}</h3>
                <Badge className="ml-2 bg-blue-600 hover:bg-blue-700">
                  {currentLevel < 5 ? "Iniciante" : currentLevel < 10 ? "Intermediário" : "Avançado"}
                </Badge>
              </div>
              <p className="text-sm text-gray-300">
                {currentXP} / {xpForNextLevel} XP para o próximo nível
              </p>
            </div>
          </div>
          {!showDetails && (
            <Link href="/profile">
              <Button variant="outline" size="sm" className="border-blue-500 text-blue-400 hover:bg-blue-900/20">
                Ver Perfil
              </Button>
            </Link>
          )}
        </div>

        <div className="relative">
          <Progress
            value={progressPercentage}
            className="h-3 bg-gray-800"
            indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500"
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
            <span className="text-xs font-medium text-white drop-shadow-md">
              {Math.round(progressPercentage)}% Completo
            </span>
          </div>
        </div>

        {showDetails && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-300 mb-2">
              <span>Próximas Recompensas:</span>
              <button onClick={simulateLevelUp} className="text-blue-400 hover:text-blue-300 text-xs underline">
                Simular Level Up
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-800/70 rounded-lg p-2 text-center border border-blue-900/50 relative">
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-blue-600 text-xs px-1.5">Nível {currentLevel + 1}</Badge>
                </div>
                <Gift className="h-6 w-6 mx-auto mb-1 text-blue-400" />
                <p className="text-xs">Tema Espacial</p>
              </div>
              <div className="bg-gray-800/70 rounded-lg p-2 text-center border border-gray-700/50 relative opacity-70">
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-gray-700 text-xs px-1.5">Nível {currentLevel + 2}</Badge>
                </div>
                <Medal className="h-6 w-6 mx-auto mb-1 text-gray-500" />
                <p className="text-xs">Medalha de Ouro</p>
              </div>
              <div className="bg-gray-800/70 rounded-lg p-2 text-center border border-gray-700/50 relative opacity-70">
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-gray-700 text-xs px-1.5">Nível {currentLevel + 3}</Badge>
                </div>
                <Zap className="h-6 w-6 mx-auto mb-1 text-gray-500" />
                <p className="text-xs">Poder Especial</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
