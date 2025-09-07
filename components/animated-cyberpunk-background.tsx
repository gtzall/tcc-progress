"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface FlyingCar {
  id: number
  x: number
  y: number
  speed: number
  size: number
  color: string
  trail: Array<{ x: number; y: number; opacity: number }>
}

interface NeonSign {
  x: number
  y: number
  width: number
  height: number
  color: string
  text: string
  flickering: boolean
}

interface Building {
  x: number
  y: number
  width: number
  height: number
  windows: Array<{ x: number; y: number; lit: boolean }>
}

export function AnimatedCyberpunkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const carsRef = useRef<FlyingCar[]>([])
  const signsRef = useRef<NeonSign[]>([])
  const buildingsRef = useRef<Building[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    initializeCars()
    initializeSigns()
    initializeBuildings()
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const initializeCars = () => {
    const cars: FlyingCar[] = []
    const colors = ['#FF0080', '#00FFFF', '#FFFF00', '#FF4000', '#8000FF']
    
    for (let i = 0; i < 8; i++) {
      cars.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: 100 + Math.random() * (window.innerHeight * 0.6),
        speed: 2 + Math.random() * 4,
        size: 20 + Math.random() * 15,
        color: colors[Math.floor(Math.random() * colors.length)],
        trail: []
      })
    }
    carsRef.current = cars
  }

  const initializeSigns = () => {
    const signs: NeonSign[] = []
    const texts = ['CYBER', 'NEON', 'FUTURE', 'TECH', 'QUIZ', 'BATTLE']
    const colors = ['#FF0080', '#00FFFF', '#FFFF00', '#FF4000', '#8000FF', '#00FF80']
    
    for (let i = 0; i < 6; i++) {
      signs.push({
        x: 50 + (i * (window.innerWidth - 100)) / 5,
        y: 50 + Math.random() * 200,
        width: 80 + Math.random() * 40,
        height: 30 + Math.random() * 20,
        color: colors[i],
        text: texts[i],
        flickering: Math.random() > 0.7
      })
    }
    signsRef.current = signs
  }

  const initializeBuildings = () => {
    const buildings: Building[] = []
    const buildingCount = Math.floor(window.innerWidth / 80)
    
    for (let i = 0; i < buildingCount; i++) {
      const width = 60 + Math.random() * 40
      const height = 200 + Math.random() * 300
      const x = i * (window.innerWidth / buildingCount)
      const y = window.innerHeight - height
      
      const windows: Array<{ x: number; y: number; lit: boolean }> = []
      const windowRows = Math.floor(height / 25)
      const windowCols = Math.floor(width / 15)
      
      for (let row = 0; row < windowRows; row++) {
        for (let col = 0; col < windowCols; col++) {
          windows.push({
            x: x + col * 15 + 5,
            y: y + row * 25 + 10,
            lit: Math.random() > 0.3
          })
        }
      }
      
      buildings.push({ x, y, width, height, windows })
    }
    buildingsRef.current = buildings
  }

  const drawFlyingCar = (ctx: CanvasRenderingContext2D, car: FlyingCar) => {
    // Desenhar rastro
    car.trail.forEach((point, index) => {
      ctx.save()
      ctx.globalAlpha = point.opacity
      ctx.fillStyle = car.color
      const size = (car.size * point.opacity) / 3
      ctx.fillRect(point.x - size/2, point.y - size/2, size, size)
      ctx.restore()
    })

    // Corpo do carro
    ctx.save()
    ctx.fillStyle = car.color
    ctx.shadowColor = car.color
    ctx.shadowBlur = 15
    
    // Corpo principal
    ctx.fillRect(car.x - car.size/2, car.y - car.size/3, car.size, car.size/1.5)
    
    // Cockpit
    ctx.fillStyle = 'rgba(0, 255, 255, 0.3)'
    ctx.fillRect(car.x - car.size/3, car.y - car.size/4, car.size/1.5, car.size/3)
    
    // Propulsores
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(car.x - car.size/2 - 5, car.y - 2, 5, 4)
    ctx.fillRect(car.x - car.size/2 - 5, car.y + car.size/3 - 2, 5, 4)
    
    // Luzes
    ctx.fillStyle = '#FFFF00'
    ctx.beginPath()
    ctx.arc(car.x + car.size/2, car.y, 3, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.restore()
  }

  const drawNeonSign = (ctx: CanvasRenderingContext2D, sign: NeonSign) => {
    const shouldFlicker = sign.flickering && Math.random() > 0.9
    if (shouldFlicker) return

    ctx.save()
    
    // Fundo do letreiro
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
    ctx.fillRect(sign.x, sign.y, sign.width, sign.height)
    
    // Borda neon
    ctx.strokeStyle = sign.color
    ctx.lineWidth = 3
    ctx.shadowColor = sign.color
    ctx.shadowBlur = 10
    ctx.strokeRect(sign.x, sign.y, sign.width, sign.height)
    
    // Texto
    ctx.fillStyle = sign.color
    ctx.font = '12px monospace'
    ctx.textAlign = 'center'
    ctx.fillText(sign.text, sign.x + sign.width/2, sign.y + sign.height/2 + 4)
    
    ctx.restore()
  }

  const drawBuilding = (ctx: CanvasRenderingContext2D, building: Building) => {
    // Prédio
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(building.x, building.y, building.width, building.height)
    
    // Contorno neon
    ctx.strokeStyle = '#00FFFF'
    ctx.lineWidth = 1
    ctx.shadowColor = '#00FFFF'
    ctx.shadowBlur = 5
    ctx.strokeRect(building.x, building.y, building.width, building.height)
    
    // Janelas
    building.windows.forEach(window => {
      if (window.lit) {
        // Janela acesa com efeito aleatório
        const colors = ['#FFFF00', '#00FFFF', '#FF0080', '#00FF80']
        const color = colors[Math.floor(Math.random() * colors.length)]
        
        ctx.fillStyle = color
        ctx.shadowColor = color
        ctx.shadowBlur = 3
        ctx.fillRect(window.x, window.y, 8, 8)
      } else {
        // Janela apagada
        ctx.fillStyle = '#333'
        ctx.fillRect(window.x, window.y, 8, 8)
      }
    })
    
    // Antenas no topo
    ctx.strokeStyle = '#FF0080'
    ctx.lineWidth = 2
    ctx.shadowColor = '#FF0080'
    ctx.shadowBlur = 8
    
    for (let i = 0; i < 3; i++) {
      const antennaX = building.x + (building.width / 4) * (i + 1)
      ctx.beginPath()
      ctx.moveTo(antennaX, building.y)
      ctx.lineTo(antennaX, building.y - 20 - Math.random() * 30)
      ctx.stroke()
      
      // Luz piscante no topo
      if (Math.random() > 0.5) {
        ctx.fillStyle = '#FF0080'
        ctx.beginPath()
        ctx.arc(antennaX, building.y - 25, 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.save()
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)'
    ctx.lineWidth = 1
    
    const gridSize = 50
    
    // Linhas verticais
    for (let x = 0; x < window.innerWidth; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, window.innerHeight)
      ctx.stroke()
    }
    
    // Linhas horizontais
    for (let y = 0; y < window.innerHeight; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(window.innerWidth, y)
      ctx.stroke()
    }
    
    ctx.restore()
  }

  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    ctx.save()
    
    for (let i = 0; i < 50; i++) {
      const x = (Date.now() * 0.01 + i * 100) % (window.innerWidth + 100)
      const y = (i * 137.5) % window.innerHeight
      const size = Math.sin(Date.now() * 0.005 + i) * 2 + 2
      
      ctx.fillStyle = `rgba(0, 255, 255, ${0.3 + Math.sin(Date.now() * 0.003 + i) * 0.3})`
      ctx.shadowColor = '#00FFFF'
      ctx.shadowBlur = 5
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }
    
    ctx.restore()
  }

  const animate = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    // Fundo gradiente cyberpunk
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, '#0a0a0a')
    gradient.addColorStop(0.3, '#1a0033')
    gradient.addColorStop(0.7, '#330066')
    gradient.addColorStop(1, '#000011')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Grid cyberpunk
    drawGrid(ctx)

    // Partículas flutuantes
    drawParticles(ctx)

    // Desenhar prédios
    buildingsRef.current.forEach(building => {
      drawBuilding(ctx, building)
      
      // Piscar janelas ocasionalmente
      if (Math.random() > 0.98) {
        const randomWindow = building.windows[Math.floor(Math.random() * building.windows.length)]
        randomWindow.lit = !randomWindow.lit
      }
    })

    // Desenhar letreiros neon
    signsRef.current.forEach(sign => {
      drawNeonSign(ctx, sign)
    })

    // Atualizar e desenhar carros voadores
    carsRef.current.forEach(car => {
      // Adicionar ponto ao rastro
      car.trail.push({ x: car.x, y: car.y, opacity: 1 })
      
      // Limitar tamanho do rastro
      if (car.trail.length > 10) {
        car.trail.shift()
      }
      
      // Diminuir opacidade do rastro
      car.trail.forEach((point, index) => {
        point.opacity = (index + 1) / car.trail.length * 0.8
      })

      // Movimento do carro
      car.x += car.speed
      car.y += Math.sin(Date.now() * 0.002 + car.id) * 2

      // Reset quando sai da tela
      if (car.x > canvas.width + car.size) {
        car.x = -car.size
        car.y = 100 + Math.random() * (canvas.height * 0.6)
        car.trail = []
      }

      drawFlyingCar(ctx, car)
    })

    // Efeito de chuva digital
    ctx.save()
    ctx.fillStyle = 'rgba(0, 255, 0, 0.1)'
    ctx.font = '12px monospace'
    
    for (let i = 0; i < 20; i++) {
      const x = (Date.now() * 0.1 + i * 50) % canvas.width
      const chars = '01'
      const char = chars[Math.floor(Math.random() * chars.length)]
      
      for (let j = 0; j < 10; j++) {
        const y = (Date.now() * 0.2 + j * 20) % canvas.height
        ctx.fillText(char, x, y)
      }
    }
    ctx.restore()

    // Hologramas flutuantes
    ctx.save()
    for (let i = 0; i < 3; i++) {
      const x = 200 + i * 300
      const y = 150 + Math.sin(Date.now() * 0.003 + i) * 20
      
      ctx.strokeStyle = '#FF0080'
      ctx.lineWidth = 2
      ctx.shadowColor = '#FF0080'
      ctx.shadowBlur = 10
      ctx.globalAlpha = 0.7
      
      // Holograma triangular
      ctx.beginPath()
      ctx.moveTo(x, y - 20)
      ctx.lineTo(x - 15, y + 10)
      ctx.lineTo(x + 15, y + 10)
      ctx.closePath()
      ctx.stroke()
      
      // Linhas de scan
      for (let j = 0; j < 5; j++) {
        const scanY = y - 15 + j * 7
        ctx.beginPath()
        ctx.moveTo(x - 12, scanY)
        ctx.lineTo(x + 12, scanY)
        ctx.stroke()
      }
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
      
      {/* Overlay para melhor legibilidade */}
      <div className="fixed inset-0 -z-5 bg-black/30" />
      
      {/* Elementos decorativos adicionais */}
      <div className="fixed inset-0 -z-5 pointer-events-none">
        {/* Luzes neon pulsantes */}
        <motion.div
          className="absolute top-20 left-10 w-4 h-4 bg-cyan-400 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            boxShadow: '0 0 20px #00FFFF, 0 0 40px #00FFFF'
          }}
        />
        
        <motion.div
          className="absolute top-40 right-20 w-6 h-6 bg-pink-500 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          style={{
            boxShadow: '0 0 25px #FF0080, 0 0 50px #FF0080'
          }}
        />

        {/* Circuitos animados */}
        <motion.div
          className="absolute bottom-20 left-1/4 w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
          animate={{
            scaleX: [0, 1, 0],
            x: [0, 100, 200]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            boxShadow: '0 0 10px #FFFF00'
          }}
        />
        
        <motion.div
          className="absolute top-1/3 right-1/4 h-32 w-1 bg-gradient-to-b from-transparent via-purple-400 to-transparent"
          animate={{
            scaleY: [0, 1, 0],
            y: [0, -50, -100]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
            delay: 1
          }}
          style={{
            boxShadow: '0 0 10px #8000FF'
          }}
        />
      </div>
    </>
  )
}

