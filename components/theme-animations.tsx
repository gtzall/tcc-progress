"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { ThemeType } from "./theme-selector"

interface ThemeAnimationsProps {
  theme: ThemeType
}

export default function ThemeAnimations({ theme }: ThemeAnimationsProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Generate particle positions only on client side
  const [particlePositions, setParticlePositions] = useState<Array<{x: number, y: number, size: number, color: string}>>([])

  useEffect(() => {
    if (isClient) {
      const particles = Array.from({ length: 20 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
      }))
      setParticlePositions(particles)
    }
  }, [isClient, theme])

  // Don't render anything on server side
  if (!isClient) {
    return null
  }

  if (theme === "ocean") {
    return (
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Water Surface Waves */}
        <motion.div
          className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-400/30 to-transparent"
          animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Flowing Currents */}
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={`current-${index}`}
            className="absolute w-2 h-24 bg-gradient-to-b from-blue-400/60 to-transparent rounded-full"
            style={{ left: `${12 + index * 12}%`, top: `${20 + index * 8}%` }}
            animate={{ x: [0, 60, 0], opacity: [0.3, 0.8, 0.3], scaleY: [1, 1.5, 1] }}
            transition={{ duration: 6 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        {/* Floating Particles */}
        {particlePositions.map((particle, index) => (
          <motion.div
            key={`ocean-particle-${index}`}
            className="absolute rounded-full"
            style={{ left: `${particle.x}%`, top: `${particle.y}%`, width: `${particle.size}px`, height: `${particle.size}px`, backgroundColor: particle.color, boxShadow: `0 0 ${particle.size * 2}px ${particle.color}` }}
            animate={{ y: [0, -50, 0], x: [0, Math.sin(index) * 20, 0], opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 8 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 4, ease: "easeInOut" }}
          />
        ))}
      </div>
    )
  }

  if (theme === "cyberpunk") {
    return (
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Data Streams */}
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={`data-stream-${index}`}
            className="absolute w-1 bg-gradient-to-b from-cyan-400 to-transparent"
            style={{ left: `${15 + index * 15}%`, height: '100%' }}
            animate={{ 
              y: [0, -100, 0], 
              opacity: [0.2, 0.8, 0.2],
              scaleY: [1, 1.5, 1]
            }}
            transition={{ 
              duration: 3 + index * 0.3, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: index * 0.2
            }}
          />
        ))}
        {/* Floating Particles */}
        {particlePositions.map((particle, index) => (
          <motion.div
            key={`cyberpunk-particle-${index}`}
            className="absolute rounded-full"
            style={{ left: `${particle.x}%`, top: `${particle.y}%`, width: `${particle.size}px`, height: `${particle.size}px`, backgroundColor: particle.color, boxShadow: `0 0 ${particle.size * 2}px ${particle.color}` }}
            animate={{ 
              y: [0, -30, 0], 
              x: [0, Math.cos(index) * 15, 0], 
              opacity: [0.3, 1, 0.3], 
              scale: [0.6, 1.4, 0.6] 
            }}
            transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3, ease: "easeInOut" }}
          />
        ))}
        {/* Rain Effect */}
        {Array.from({ length: 50 }).map((_, index) => (
          <motion.div
            key={`rain-${index}`}
            className="absolute w-0.5 bg-gradient-to-b from-cyan-400/60 to-transparent"
            style={{ 
              left: `${Math.random() * 100}%`, 
              height: `${Math.random() * 20 + 10}px`,
              top: '-20px'
            }}
                          animate={{ 
                y: [0, 1000], 
                opacity: [0, 1, 0] 
              }}
            transition={{ 
              duration: 1 + Math.random() * 2, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    )
  }

  if (theme === "space") {
    return (
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Twinkling Stars */}
        {Array.from({ length: 100 }).map((_, index) => (
          <motion.div
            key={`star-${index}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${Math.random() * 3 + 1}px white`
            }}
            animate={{ 
              opacity: [0.2, 1, 0.2], 
              scale: [0.5, 1.5, 0.5] 
            }}
            transition={{ 
              duration: 2 + Math.random() * 3, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: Math.random() * 4
            }}
          />
        ))}
        {/* Shooting Stars */}
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.div
            key={`shooting-star-${index}`}
            className="absolute w-2 h-0.5 bg-gradient-to-r from-white to-transparent"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 50}%`,
              transform: 'rotate(-45deg)'
            }}
            animate={{ 
              x: [0, 200], 
              y: [0, 200], 
              opacity: [0, 1, 0] 
            }}
            transition={{ 
              duration: 2 + Math.random() * 2, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
        {/* Nebula Clouds */}
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.div
            key={`nebula-${index}`}
            className="absolute rounded-full opacity-20"
            style={{ 
              left: `${20 + index * 30}%`, 
              top: `${30 + index * 20}%`,
              width: `${100 + index * 50}px`,
              height: `${100 + index * 50}px`,
              background: `radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)`
            }}
            animate={{ 
              scale: [1, 1.2, 1], 
              opacity: [0.1, 0.3, 0.1] 
            }}
            transition={{ 
              duration: 8 + index * 2, 
              repeat: Infinity, 
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    )
  }

  if (theme === "forest") {
    return (
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Floating Particles */}
        {particlePositions.map((particle, index) => (
          <motion.div
            key={`forest-particle-${index}`}
            className="absolute rounded-full"
            style={{ left: `${particle.x}%`, top: `${particle.y}%`, width: `${particle.size}px`, height: `${particle.size}px`, backgroundColor: particle.color, boxShadow: `0 0 ${particle.size * 2}px ${particle.color}` }}
            animate={{ 
              y: [0, -40, 0], 
              x: [0, Math.sin(index) * 15, 0], 
              opacity: [0.3, 0.8, 0.3], 
              scale: [0.7, 1.3, 0.7] 
            }}
            transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3, ease: "easeInOut" }}
          />
        ))}
        {/* Fireflies */}
        {Array.from({ length: 15 }).map((_, index) => (
          <motion.div
            key={`firefly-${index}`}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 6px yellow, 0 0 12px yellow`
            }}
            animate={{ 
              y: [0, -20, 0], 
              x: [0, Math.sin(index) * 10, 0], 
              opacity: [0.3, 1, 0.3], 
              scale: [0.5, 1.5, 0.5] 
            }}
            transition={{ 
              duration: 3 + Math.random() * 2, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    )
  }

  if (theme === "desert") {
    return (
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Sand Storm */}
        {Array.from({ length: 30 }).map((_, index) => (
          <motion.div
            key={`sand-${index}`}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`
            }}
            animate={{ 
              x: [0, 100], 
              y: [0, -50], 
              opacity: [0, 0.8, 0] 
            }}
            transition={{ 
              duration: 4 + Math.random() * 3, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 2
            }}
          />
        ))}
        {/* Floating Particles */}
        {particlePositions.map((particle, index) => (
          <motion.div
            key={`desert-particle-${index}`}
            className="absolute rounded-full"
            style={{ left: `${particle.x}%`, top: `${particle.y}%`, width: `${particle.size}px`, height: `${particle.size}px`, backgroundColor: particle.color, boxShadow: `0 0 ${particle.size * 2}px ${particle.color}` }}
            animate={{ 
              y: [0, -30, 0], 
              x: [0, Math.cos(index) * 20, 0], 
              opacity: [0.2, 0.6, 0.2], 
              scale: [0.6, 1.4, 0.6] 
            }}
            transition={{ duration: 7 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 4, ease: "easeInOut" }}
          />
        ))}
      </div>
    )
  }

  if (theme === "volcano") {
    return (
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Fire Particles */}
        {Array.from({ length: 25 }).map((_, index) => (
          <motion.div
            key={`fire-${index}`}
            className="absolute w-2 h-2 bg-orange-500 rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 4px orange, 0 0 8px red`
            }}
            animate={{ 
              y: [0, -60, 0], 
              x: [0, Math.sin(index) * 15, 0], 
              opacity: [0.3, 1, 0], 
              scale: [0.5, 1.5, 0.5] 
            }}
            transition={{ 
              duration: 3 + Math.random() * 2, 
              repeat: Infinity, 
              ease: "easeOut",
              delay: Math.random() * 2
            }}
          />
        ))}
        {/* Smoke */}
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={`smoke-${index}`}
            className="absolute w-8 h-8 bg-gray-600 rounded-full opacity-30"
            style={{ 
              left: `${40 + index * 8}%`, 
              top: `${70 + index * 5}%`
            }}
            animate={{ 
              y: [0, -100, 0], 
              x: [0, Math.sin(index) * 20, 0], 
              opacity: [0.1, 0.4, 0], 
              scale: [0.5, 2, 0.5] 
            }}
            transition={{ 
              duration: 6 + index * 0.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: index * 0.3
            }}
          />
        ))}
      </div>
    )
  }

  if (theme === "aurora") {
    return (
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Aurora Borealis */}
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.div
            key={`aurora-${index}`}
            className="absolute w-full h-32 opacity-30"
            style={{ 
              top: `${20 + index * 15}%`,
              background: `linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.3), rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3), transparent)`,
              filter: 'blur(8px)'
            }}
            animate={{ 
              x: [0, 50, 0], 
              opacity: [0.1, 0.4, 0.1],
              scaleY: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 8 + index * 1, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: index * 0.5
            }}
          />
        ))}
        {/* Floating Particles */}
        {particlePositions.map((particle, index) => (
          <motion.div
            key={`aurora-particle-${index}`}
            className="absolute rounded-full"
            style={{ left: `${particle.x}%`, top: `${particle.y}%`, width: `${particle.size}px`, height: `${particle.size}px`, backgroundColor: particle.color, boxShadow: `0 0 ${particle.size * 2}px ${particle.color}` }}
            animate={{ 
              y: [0, -40, 0], 
              x: [0, Math.cos(index) * 25, 0], 
              opacity: [0.2, 0.7, 0.2], 
              scale: [0.6, 1.4, 0.6] 
            }}
            transition={{ duration: 9 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5, ease: "easeInOut" }}
          />
        ))}
      </div>
    )
  }

  return null
}