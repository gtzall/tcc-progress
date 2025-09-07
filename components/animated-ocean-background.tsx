"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Fish {
  id: number
  x: number
  y: number
  size: number
  speed: number
  direction: number
  type: 'fish' | 'shark' | 'jellyfish'
  color: string
}

interface Bubble {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

interface Shipwreck {
  x: number
  y: number
  rotation: number
}

export function AnimatedOceanBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fishRef = useRef<Fish[]>([])
  const bubblesRef = useRef<Bubble[]>([])
  const shipwrecksRef = useRef<Shipwreck[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Configurar canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Inicializar elementos
    initializeFish()
    initializeBubbles()
    initializeShipwrecks()

    // Iniciar animação
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const initializeFish = () => {
    const fish: Fish[] = []
    const fishTypes = [
      { type: 'fish' as const, colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'] },
      { type: 'shark' as const, colors: ['#708090', '#2F4F4F'] },
      { type: 'jellyfish' as const, colors: ['#DDA0DD', '#FFB6C1', '#87CEEB'] }
    ]

    for (let i = 0; i < 15; i++) {
      const typeData = fishTypes[Math.floor(Math.random() * fishTypes.length)]
      fish.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * 0.8 + window.innerHeight * 0.2,
        size: typeData.type === 'shark' ? 40 + Math.random() * 30 : 15 + Math.random() * 20,
        speed: typeData.type === 'shark' ? 0.5 + Math.random() * 1 : 1 + Math.random() * 2,
        direction: Math.random() * Math.PI * 2,
        type: typeData.type,
        color: typeData.colors[Math.floor(Math.random() * typeData.colors.length)]
      })
    }
    fishRef.current = fish
  }

  const initializeBubbles = () => {
    const bubbles: Bubble[] = []
    for (let i = 0; i < 30; i++) {
      bubbles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + Math.random() * 200,
        size: 3 + Math.random() * 8,
        speed: 0.5 + Math.random() * 1.5,
        opacity: 0.3 + Math.random() * 0.4
      })
    }
    bubblesRef.current = bubbles
  }

  const initializeShipwrecks = () => {
    const shipwrecks: Shipwreck[] = []
    for (let i = 0; i < 3; i++) {
      shipwrecks.push({
        x: Math.random() * window.innerWidth,
        y: window.innerHeight * 0.7 + Math.random() * window.innerHeight * 0.2,
        rotation: -30 + Math.random() * 60
      })
    }
    shipwrecksRef.current = shipwrecks
  }

  const drawFish = (ctx: CanvasRenderingContext2D, fish: Fish) => {
    ctx.save()
    ctx.translate(fish.x, fish.y)
    ctx.rotate(fish.direction)

    if (fish.type === 'fish') {
      // Corpo do peixe
      ctx.fillStyle = fish.color
      ctx.beginPath()
      ctx.ellipse(0, 0, fish.size, fish.size * 0.6, 0, 0, Math.PI * 2)
      ctx.fill()

      // Cauda
      ctx.beginPath()
      ctx.moveTo(-fish.size, 0)
      ctx.lineTo(-fish.size * 1.5, -fish.size * 0.4)
      ctx.lineTo(-fish.size * 1.5, fish.size * 0.4)
      ctx.closePath()
      ctx.fill()

      // Olho
      ctx.fillStyle = 'white'
      ctx.beginPath()
      ctx.arc(fish.size * 0.3, -fish.size * 0.2, fish.size * 0.15, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.fillStyle = 'black'
      ctx.beginPath()
      ctx.arc(fish.size * 0.35, -fish.size * 0.2, fish.size * 0.08, 0, Math.PI * 2)
      ctx.fill()
    } else if (fish.type === 'shark') {
      // Corpo do tubarão
      ctx.fillStyle = fish.color
      ctx.beginPath()
      ctx.ellipse(0, 0, fish.size, fish.size * 0.4, 0, 0, Math.PI * 2)
      ctx.fill()

      // Barbatana dorsal
      ctx.beginPath()
      ctx.moveTo(0, -fish.size * 0.4)
      ctx.lineTo(fish.size * 0.3, -fish.size * 0.8)
      ctx.lineTo(fish.size * 0.6, -fish.size * 0.4)
      ctx.closePath()
      ctx.fill()

      // Cauda
      ctx.beginPath()
      ctx.moveTo(-fish.size, 0)
      ctx.lineTo(-fish.size * 1.3, -fish.size * 0.6)
      ctx.lineTo(-fish.size * 1.1, 0)
      ctx.lineTo(-fish.size * 1.3, fish.size * 0.3)
      ctx.closePath()
      ctx.fill()

      // Olho
      ctx.fillStyle = 'red'
      ctx.beginPath()
      ctx.arc(fish.size * 0.4, -fish.size * 0.1, fish.size * 0.1, 0, Math.PI * 2)
      ctx.fill()
    } else if (fish.type === 'jellyfish') {
      // Corpo da água-viva
      ctx.fillStyle = fish.color
      ctx.globalAlpha = 0.7
      ctx.beginPath()
      ctx.arc(0, 0, fish.size, 0, Math.PI, false)
      ctx.fill()

      // Tentáculos
      ctx.strokeStyle = fish.color
      ctx.lineWidth = 2
      ctx.globalAlpha = 0.5
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI - Math.PI / 2
        const startX = Math.cos(angle) * fish.size * 0.8
        const startY = Math.sin(angle) * fish.size * 0.8
        
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        
        // Tentáculo ondulado
        for (let j = 1; j <= 5; j++) {
          const waveX = startX + Math.sin(Date.now() * 0.005 + i + j) * 5
          const waveY = startY + j * fish.size * 0.3
          ctx.lineTo(waveX, waveY)
        }
        ctx.stroke()
      }
      ctx.globalAlpha = 1
    }

    ctx.restore()
  }

  const drawBubble = (ctx: CanvasRenderingContext2D, bubble: Bubble) => {
    ctx.save()
    ctx.globalAlpha = bubble.opacity
    
    // Gradiente para a bolha
    const gradient = ctx.createRadialGradient(
      bubble.x, bubble.y, 0,
      bubble.x, bubble.y, bubble.size
    )
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
    gradient.addColorStop(0.7, 'rgba(173, 216, 230, 0.4)')
    gradient.addColorStop(1, 'rgba(173, 216, 230, 0.1)')
    
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2)
    ctx.fill()
    
    // Brilho da bolha
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
    ctx.beginPath()
    ctx.arc(bubble.x - bubble.size * 0.3, bubble.y - bubble.size * 0.3, bubble.size * 0.3, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.restore()
  }

  const drawShipwreck = (ctx: CanvasRenderingContext2D, shipwreck: Shipwreck) => {
    ctx.save()
    ctx.translate(shipwreck.x, shipwreck.y)
    ctx.rotate(shipwreck.rotation * Math.PI / 180)
    
    // Casco do navio
    ctx.fillStyle = '#8B4513'
    ctx.fillRect(-60, -15, 120, 30)
    
    // Mastro
    ctx.fillStyle = '#654321'
    ctx.fillRect(-2, -60, 4, 45)
    
    // Vela rasgada
    ctx.fillStyle = 'rgba(139, 69, 19, 0.6)'
    ctx.beginPath()
    ctx.moveTo(-30, -55)
    ctx.lineTo(30, -50)
    ctx.lineTo(25, -25)
    ctx.lineTo(-25, -30)
    ctx.closePath()
    ctx.fill()
    
    // Algas no navio
    ctx.strokeStyle = '#228B22'
    ctx.lineWidth = 2
    for (let i = 0; i < 5; i++) {
      const x = -50 + i * 25
      ctx.beginPath()
      ctx.moveTo(x, 15)
      ctx.quadraticCurveTo(x + 5, 25, x, 35)
      ctx.stroke()
    }
    
    ctx.restore()
  }

  const animate = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    // Limpar canvas com gradiente oceânico
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, '#001f3f')  // Azul escuro no topo
    gradient.addColorStop(0.3, '#0074D9') // Azul médio
    gradient.addColorStop(0.7, '#39CCCC') // Azul claro
    gradient.addColorStop(1, '#2ECC40')   // Verde no fundo

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Desenhar raios de sol
    ctx.save()
    ctx.globalAlpha = 0.1
    ctx.strokeStyle = '#FFD700'
    ctx.lineWidth = 3
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const startX = canvas.width * 0.8 + Math.cos(angle) * 50
      const startY = 50 + Math.sin(angle) * 50
      const endX = canvas.width * 0.8 + Math.cos(angle) * 200
      const endY = 50 + Math.sin(angle) * 200
      
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.lineTo(endX, endY)
      ctx.stroke()
    }
    ctx.restore()

    // Desenhar naufrágios
    shipwrecksRef.current.forEach(shipwreck => {
      drawShipwreck(ctx, shipwreck)
    })

    // Atualizar e desenhar bolhas
    bubblesRef.current.forEach(bubble => {
      bubble.y -= bubble.speed
      bubble.x += Math.sin(Date.now() * 0.001 + bubble.id) * 0.5
      
      if (bubble.y < -bubble.size) {
        bubble.y = canvas.height + bubble.size
        bubble.x = Math.random() * canvas.width
      }
      
      drawBubble(ctx, bubble)
    })

    // Atualizar e desenhar peixes
    fishRef.current.forEach(fish => {
      // Movimento dos peixes
      fish.x += Math.cos(fish.direction) * fish.speed
      fish.y += Math.sin(fish.direction) * fish.speed

      // Mudança ocasional de direção
      if (Math.random() < 0.02) {
        fish.direction += (Math.random() - 0.5) * 0.5
      }

      // Manter peixes na tela
      if (fish.x < -fish.size) fish.x = canvas.width + fish.size
      if (fish.x > canvas.width + fish.size) fish.x = -fish.size
      if (fish.y < fish.size) fish.y = fish.size
      if (fish.y > canvas.height - fish.size) fish.y = canvas.height - fish.size

      drawFish(ctx, fish)
    })

    // Efeito de ondas na superfície
    ctx.save()
    ctx.globalAlpha = 0.3
    ctx.strokeStyle = '#87CEEB'
    ctx.lineWidth = 2
    for (let i = 0; i < 5; i++) {
      ctx.beginPath()
      const waveY = 20 + i * 15
      ctx.moveTo(0, waveY)
      
      for (let x = 0; x <= canvas.width; x += 20) {
        const y = waveY + Math.sin((x + Date.now() * 0.002) * 0.02) * 10
        ctx.lineTo(x, y)
      }
      ctx.stroke()
    }
    ctx.restore()

    animationRef.current = requestAnimationFrame(animate)
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Overlay para melhor legibilidade do texto */}
      <div className="fixed inset-0 -z-5 bg-black/20" />
      
      {/* Elementos decorativos adicionais */}
      <div className="fixed inset-0 -z-5 pointer-events-none">
        {/* Corais animados */}
        <motion.div
          className="absolute bottom-0 left-10"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 2, 0, -2, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-16 h-32 bg-gradient-to-t from-pink-500 to-orange-400 rounded-t-full opacity-60" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-0 right-20"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, -1, 0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <div className="w-12 h-24 bg-gradient-to-t from-purple-500 to-blue-400 rounded-t-full opacity-60" />
        </motion.div>

        {/* Plantas aquáticas */}
        <motion.div
          className="absolute bottom-0 left-1/3"
          animate={{
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-2 h-40 bg-gradient-to-t from-green-600 to-green-400 rounded-t-full opacity-70" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-0 right-1/3"
          animate={{
            rotate: [0, -3, 0, 3, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <div className="w-2 h-36 bg-gradient-to-t from-green-700 to-green-500 rounded-t-full opacity-70" />
        </motion.div>
      </div>
    </>
  )
}

