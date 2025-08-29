"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { ThemeType } from "./theme-selector"

interface EnhancedThemeAnimationsProps {
  theme: ThemeType
}

export default function EnhancedThemeAnimations({ theme }: EnhancedThemeAnimationsProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Generate particle positions only on client side
  const [particlePositions, setParticlePositions] = useState<Array<{x: number, y: number, size: number, color: string}>>([])

  useEffect(() => {
    if (isClient) {
      const particles = Array.from({ length: 30 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 3,
        color: `hsl(${Math.random() * 360}, 80%, 70%)`
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
        {/* Ocean Surface */}
        <motion.div
          className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-blue-400/40 via-blue-300/20 to-transparent"
          animate={{ y: [0, -15, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Ocean Currents */}
        {Array.from({ length: 12 }).map((_, index) => (
          <motion.div
            key={`ocean-current-${index}`}
            className="absolute w-3 h-32 bg-gradient-to-b from-blue-400/80 via-cyan-400/60 to-transparent rounded-full"
            style={{ left: `${8 + index * 8}%`, top: `${15 + index * 6}%` }}
            animate={{ 
              x: [0, 80, 0], 
              opacity: [0.4, 0.9, 0.4], 
              scaleY: [1, 1.8, 1],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 8 + index * 0.8, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        
        {/* Bubbles */}
        {Array.from({ length: 25 }).map((_, index) => (
          <motion.div
            key={`bubble-${index}`}
            className="absolute rounded-full bg-white/30 backdrop-blur-sm"
            style={{ 
              left: `${Math.random() * 100}%`, 
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`
            }}
            animate={{ 
              y: [100, -20], 
              x: [0, Math.sin(index) * 30], 
              opacity: [0, 0.8, 0], 
              scale: [0.5, 1.2, 0.5] 
            }}
            transition={{ 
              duration: 10 + Math.random() * 5, 
              repeat: Infinity, 
              delay: Math.random() * 5, 
              ease: "easeOut" 
            }}
          />
        ))}
        
        {/* Floating Seaweed */}
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={`seaweed-${index}`}
            className="absolute w-2 bg-gradient-to-b from-green-400/60 to-transparent rounded-full"
            style={{ 
              left: `${15 + index * 12}%`, 
              height: `${60 + Math.random() * 40}px`,
              bottom: '0%'
            }}
            animate={{ 
              rotate: [0, 5, -5, 0], 
              opacity: [0.6, 0.9, 0.6] 
            }}
            transition={{ 
              duration: 4 + index * 0.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        ))}
      </div>
    )
  }

  if (theme === "cyberpunk") {
    return (
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Data Streams */}
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={`data-stream-${index}`}
            className="absolute w-1 bg-gradient-to-b from-cyan-400 via-pink-400 to-transparent"
            style={{ left: `${12 + index * 12}%`, height: '100%' }}
            animate={{ 
              y: [0, -100, 0], 
              opacity: [0.3, 0.9, 0.3],
              scaleY: [1, 1.8, 1]
            }}
            transition={{ 
              duration: 4 + index * 0.4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: index * 0.3
            }}
          />
        ))}
        
        {/* Holographic Grid */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, index) => (
            <motion.div
              key={`grid-line-${index}`}
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              style={{ top: `${index * 5}%` }}
              animate={{ 
                opacity: [0.2, 0.6, 0.2],
                scaleX: [0.8, 1.2, 0.8]
              }}
              transition={{ 
                duration: 3 + index * 0.1, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          ))}
        </div>
        
        {/* Floating Holograms */}
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={`hologram-${index}`}
            className="absolute w-16 h-16 border border-cyan-400/50 rounded-lg"
            style={{ 
              left: `${20 + index * 15}%`, 
              top: `${30 + index * 10}%` 
            }}
            animate={{ 
              rotate: [0, 360], 
              opacity: [0.3, 0.7, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ 
              duration: 8 + index * 1, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            <div className="absolute inset-1 border border-pink-400/30 rounded"></div>
          </motion.div>
        ))}
        
        {/* Energy Particles */}
        {Array.from({ length: 40 }).map((_, index) => (
          <motion.div
            key={`energy-${index}`}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%` 
            }}
            animate={{ 
              y: [0, -50, 0], 
              x: [0, Math.sin(index) * 20, 0], 
              opacity: [0, 1, 0], 
              scale: [0, 2, 0] 
            }}
            transition={{ 
              duration: 3 + Math.random() * 2, 
              repeat: Infinity, 
              delay: Math.random() * 3, 
              ease: "easeInOut" 
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
        {Array.from({ length: 150 }).map((_, index) => (
          <motion.div
            key={`star-${index}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${Math.random() * 4 + 2}px white`
            }}
            animate={{ 
              opacity: [0.1, 1, 0.1], 
              scale: [0.3, 1.5, 0.3] 
            }}
            transition={{ 
              duration: 2 + Math.random() * 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
        
        {/* Shooting Stars */}
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={`shooting-star-${index}`}
            className="absolute w-3 h-0.5 bg-gradient-to-r from-white via-cyan-300 to-transparent"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 60}%`,
              transform: 'rotate(-45deg)'
            }}
            animate={{ 
              x: [0, 300], 
              y: [0, 300], 
              opacity: [0, 1, 0] 
            }}
            transition={{ 
              duration: 3 + Math.random() * 2, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 6
            }}
          />
        ))}
        
        {/* Nebula Clouds */}
        {Array.from({ length: 4 }).map((_, index) => (
          <motion.div
            key={`nebula-${index}`}
            className="absolute rounded-full opacity-30"
            style={{ 
              left: `${15 + index * 25}%`, 
              top: `${25 + index * 15}%`,
              width: `${120 + index * 60}px`,
              height: `${120 + index * 60}px`,
              background: `radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(59, 130, 246, 0.3) 30%, transparent 70%)`
            }}
            animate={{ 
              scale: [1, 1.3, 1], 
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 12 + index * 3, 
              repeat: Infinity, 
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Asteroid Belt */}
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.div
            key={`asteroid-${index}`}
            className="absolute w-2 h-2 bg-gray-600 rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%` 
            }}
            animate={{ 
              x: [0, 100, 0], 
              y: [0, -50, 0], 
              rotate: [0, 360] 
            }}
            transition={{ 
              duration: 20 + Math.random() * 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
          />
        ))}
      </div>
    )
  }

  if (theme === "forest") {
    return (
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Floating Leaves */}
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.div
            key={`leaf-${index}`}
            className="absolute w-4 h-4 bg-green-400/60 rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%` 
            }}
            animate={{ 
              y: [0, -60, 0], 
              x: [0, Math.sin(index) * 20, 0], 
              rotate: [0, 360], 
              opacity: [0.4, 0.8, 0.4] 
            }}
            transition={{ 
              duration: 8 + Math.random() * 4, 
              repeat: Infinity, 
              delay: Math.random() * 4, 
              ease: "easeInOut" 
            }}
          />
        ))}
        
        {/* Fireflies */}
        {Array.from({ length: 25 }).map((_, index) => (
          <motion.div
            key={`firefly-${index}`}
            className="absolute w-3 h-3 bg-yellow-400 rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 8px yellow, 0 0 16px yellow`
            }}
            animate={{ 
              y: [0, -30, 0], 
              x: [0, Math.sin(index) * 15, 0], 
              opacity: [0.3, 1, 0.3], 
              scale: [0.5, 1.5, 0.5] 
            }}
            transition={{ 
              duration: 4 + Math.random() * 2, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: Math.random() * 3
            }}
          />
        ))}
        
        {/* Tree Branches */}
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={`branch-${index}`}
            className="absolute w-1 bg-gradient-to-b from-green-800/60 to-transparent"
            style={{ 
              left: `${10 + index * 18}%`, 
              height: `${80 + Math.random() * 40}px`,
              bottom: '0%'
            }}
            animate={{ 
              rotate: [0, 3, -3, 0], 
              opacity: [0.7, 0.9, 0.7] 
            }}
            transition={{ 
              duration: 6 + index * 0.8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        ))}
        
        {/* Moss Patches */}
        {Array.from({ length: 12 }).map((_, index) => (
          <motion.div
            key={`moss-${index}`}
            className="absolute w-8 h-8 bg-green-600/40 rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`, 
              bottom: `${Math.random() * 20}%` 
            }}
            animate={{ 
              scale: [0.8, 1.2, 0.8], 
              opacity: [0.4, 0.7, 0.4] 
            }}
            transition={{ 
              duration: 5 + Math.random() * 3, 
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
        {Array.from({ length: 50 }).map((_, index) => (
          <motion.div
            key={`sand-${index}`}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%` 
            }}
            animate={{ 
              x: [0, 150], 
              y: [0, -80], 
              opacity: [0, 0.8, 0],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 6 + Math.random() * 4, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 3
            }}
          />
        ))}
        
        {/* Heat Waves */}
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.div
            key={`heat-wave-${index}`}
            className="absolute w-full h-20 bg-gradient-to-b from-orange-400/20 via-yellow-400/10 to-transparent"
            style={{ top: `${20 + index * 15}%` }}
            animate={{ 
              y: [0, -10, 0], 
              opacity: [0.1, 0.3, 0.1],
              scaleY: [1, 1.5, 1]
            }}
            transition={{ 
              duration: 4 + index * 0.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        ))}
        
        {/* Cactus Shadows */}
        {Array.from({ length: 4 }).map((_, index) => (
          <motion.div
            key={`cactus-${index}`}
            className="absolute w-3 bg-gradient-to-b from-green-700/60 to-transparent"
            style={{ 
              left: `${20 + index * 25}%`, 
              height: `${60 + Math.random() * 40}px`,
              bottom: '0%'
            }}
            animate={{ 
              opacity: [0.6, 0.9, 0.6] 
            }}
            transition={{ 
              duration: 8 + index * 1, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        ))}
        
        {/* Desert Rocks */}
        {Array.from({ length: 15 }).map((_, index) => (
          <motion.div
            key={`rock-${index}`}
            className="absolute w-6 h-4 bg-gray-600/50 rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`, 
              bottom: `${Math.random() * 15}%` 
            }}
            animate={{ 
              scale: [0.9, 1.1, 0.9], 
              opacity: [0.5, 0.8, 0.5] 
            }}
            transition={{ 
              duration: 7 + Math.random() * 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>
    )
  }

  if (theme === "volcano") {
    return (
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Lava Flows */}
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={`lava-${index}`}
            className="absolute w-4 h-20 bg-gradient-to-b from-red-500 via-orange-500 to-yellow-500 rounded-full"
            style={{ 
              left: `${30 + index * 8}%`, 
              bottom: '0%'
            }}
            animate={{ 
              y: [0, -40, 0], 
              opacity: [0.6, 1, 0.6],
              scaleY: [1, 1.3, 1]
            }}
            transition={{ 
              duration: 3 + index * 0.3, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: index * 0.2
            }}
          />
        ))}
        
        {/* Fire Particles */}
        {Array.from({ length: 35 }).map((_, index) => (
          <motion.div
            key={`fire-${index}`}
            className="absolute w-3 h-3 bg-orange-500 rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 6px orange, 0 0 12px red`
            }}
            animate={{ 
              y: [0, -80, 0], 
              x: [0, Math.sin(index) * 20, 0], 
              opacity: [0.4, 1, 0], 
              scale: [0.5, 1.8, 0.5] 
            }}
            transition={{ 
              duration: 4 + Math.random() * 2, 
              repeat: Infinity, 
              ease: "easeOut",
              delay: Math.random() * 3
            }}
          />
        ))}
        
        {/* Smoke Clouds */}
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={`smoke-${index}`}
            className="absolute w-12 h-12 bg-gray-600/40 rounded-full"
            style={{ 
              left: `${35 + index * 10}%`, 
              top: `${70 + index * 5}%` 
            }}
            animate={{ 
              y: [0, -120, 0], 
              x: [0, Math.sin(index) * 30, 0], 
              opacity: [0.2, 0.6, 0], 
              scale: [0.5, 3, 0.5] 
            }}
            transition={{ 
              duration: 8 + index * 0.8, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: index * 0.5
            }}
          />
        ))}
        
        {/* Ash Particles */}
        {Array.from({ length: 25 }).map((_, index) => (
          <motion.div
            key={`ash-${index}`}
            className="absolute w-1 h-1 bg-gray-500 rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%` 
            }}
            animate={{ 
              y: [0, -100, 0], 
              x: [0, Math.cos(index) * 25, 0], 
              opacity: [0, 0.7, 0], 
              scale: [0, 1.5, 0] 
            }}
            transition={{ 
              duration: 6 + Math.random() * 3, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: Math.random() * 4
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
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={`aurora-${index}`}
            className="absolute w-full h-40 opacity-40"
            style={{ 
              top: `${15 + index * 12}%`,
              background: `linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.4), rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.4), transparent)`,
              filter: 'blur(12px)'
            }}
            animate={{ 
              x: [0, 60, 0], 
              opacity: [0.2, 0.5, 0.2],
              scaleY: [1, 1.3, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 10 + index * 1.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: index * 0.8
            }}
          />
        ))}
        
        {/* Northern Lights Particles */}
        {Array.from({ length: 40 }).map((_, index) => (
          <motion.div
            key={`northern-particle-${index}`}
            className="absolute w-2 h-2 rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              backgroundColor: `hsl(${120 + Math.random() * 60}, 80%, 70%)`,
              boxShadow: `0 0 8px hsl(${120 + Math.random() * 60}, 80%, 70%)`
            }}
            animate={{ 
              y: [0, -50, 0], 
              x: [0, Math.cos(index) * 30, 0], 
              opacity: [0.3, 0.9, 0.3], 
              scale: [0.6, 1.6, 0.6] 
            }}
            transition={{ 
              duration: 12 + Math.random() * 6, 
              repeat: Infinity, 
              delay: Math.random() * 8, 
              ease: "easeInOut" 
            }}
          />
        ))}
        
        {/* Ice Crystals */}
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.div
            key={`crystal-${index}`}
            className="absolute w-4 h-4 bg-cyan-300/60 rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%` 
            }}
            animate={{ 
              rotate: [0, 360], 
              scale: [0.8, 1.2, 0.8],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ 
              duration: 8 + Math.random() * 4, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
        
        {/* Snow Flakes */}
        {Array.from({ length: 30 }).map((_, index) => (
          <motion.div
            key={`snow-${index}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%` 
            }}
            animate={{ 
              y: [0, 100], 
              x: [0, Math.sin(index) * 10, 0], 
              opacity: [0, 0.8, 0], 
              scale: [0, 1.5, 0] 
            }}
            transition={{ 
              duration: 5 + Math.random() * 3, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 4
            }}
          />
        ))}
      </div>
    )
  }

  return null
}
