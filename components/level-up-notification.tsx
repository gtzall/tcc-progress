"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, Star, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import confetti from "canvas-confetti"

interface LevelUpNotificationProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  show?: boolean
  onClose?: () => void
  level?: number
  data?: {
    level: number
    rewards: {
      name: string
      description: string
      icon: React.ReactNode
    }[]
  }
  rewards?: {
    name: string
    description: string
    icon: React.ReactNode
  }[]
}

export default function LevelUpNotification({ open, onOpenChange, show, onClose, level, data, rewards }: LevelUpNotificationProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  // Use the appropriate props
  const isOpen = open !== undefined ? open : show
  const handleClose = onOpenChange ? (() => onOpenChange(false)) : onClose
  const currentLevel = level || data?.level || 1
  const currentRewards = rewards || data?.rewards || []

  // Reset to first step when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0)
      setShowConfetti(true)
    }
  }, [isOpen])

  // Trigger confetti effect
  useEffect(() => {
    if (showConfetti) {
      const duration = 3 * 1000
      const animationEnd = Date.now() + duration
      const colors = ["#3b82f6", "#8b5cf6", "#d946ef"]

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min
      }

      const confettiInterval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()
        if (timeLeft <= 0) {
          clearInterval(confettiInterval)
          setShowConfetti(false)
          return
        }

        const particleCount = 50 * (timeLeft / duration)
        confetti({
          particleCount,
          spread: randomInRange(50, 100),
          origin: { y: 0.6 },
          colors,
          disableForReducedMotion: true,
        })
      }, 250)

      return () => clearInterval(confettiInterval)
    }
  }, [showConfetti])

  const steps = [
    {
      title: `Nível ${currentLevel} Alcançado!`,
      description: "Parabéns! Você subiu de nível e desbloqueou novas recompensas.",
      icon: <Trophy className="h-16 w-16 text-yellow-400" />,
    },
    ...currentRewards.map((reward) => ({
      title: `Nova Recompensa: ${reward.name}`,
      description: reward.description,
      icon: reward.icon,
    })),
    {
      title: "Continue Jogando!",
      description: "Continue jogando para ganhar mais XP e desbloquear mais recompensas.",
      icon: <Star className="h-16 w-16 text-blue-400" />,
    },
  ]

  const currentStepData = steps[currentStep]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-900 border-2 border-blue-600 rounded-xl max-w-md w-full mx-4 overflow-hidden"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center">
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2" />
                <h2 className="font-bold text-lg">Nível Alcançado!</h2>
              </div>
              <Badge className="bg-yellow-600">+{level * 50} XP</Badge>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  >
                    {currentStepData.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">{currentStepData.title}</h3>
                  <p className="text-gray-300 mb-6">{currentStepData.description}</p>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between items-center">
                <div className="flex space-x-1">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === currentStep ? "bg-blue-500" : "bg-gray-700"}`}
                    />
                  ))}
                </div>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={handleNext}
                >
                  {currentStep < steps.length - 1 ? "Próximo" : "Continuar"}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
