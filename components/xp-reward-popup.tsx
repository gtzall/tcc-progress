"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Star, Plus } from "lucide-react"

interface XPRewardPopupProps {
  xp: number
  reason: string
  duration?: number
  onComplete?: () => void
}

export default function XPRewardPopup({ xp, reason, duration = 3000, onComplete }: XPRewardPopupProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      if (onComplete) onComplete()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed top-20 right-4 z-50 pointer-events-none"
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="bg-gradient-to-r from-blue-900/80 to-purple-900/80 backdrop-blur-sm p-3 rounded-lg border border-blue-500/50 shadow-lg flex items-center">
            <div className="bg-yellow-600/30 p-2 rounded-full mr-3">
              <Sparkles className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="text-yellow-400 font-bold flex items-center">
                  <Plus className="h-3 w-3 mr-0.5" />
                  {xp} XP
                </span>
              </div>
              <p className="text-xs text-gray-300">{reason}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
