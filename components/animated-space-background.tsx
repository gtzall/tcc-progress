"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Star {
  id: number
  x: number
  y: number
  size: number
  brightness: number
  twinkleSpeed: number
}

interface Planet {
  id: number
  x: number
  y: number
  size: number
  color: string
  orbitRadius: number
  orbitSpeed: number
  angle: number
  moons?: Array<{
    size: number
    distance: number
    speed: number
    angle: number
  }>
}

interface Comet {
  id: number
  x: number
  y: number
  speed: number
  angle: number
  size: number
  tail: Array<{ x: number; y: number; opacity: number }>
}

interface Nebula {
  x: number
  y: number
  size: number
  color: string
  opacity: number
}

export function AnimatedSpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const planetsRef = useRef<Planet[]>([])
  const cometsRef = useRef<Comet[]>([])
  const nebulaeRef = useRef<Nebula[]>([])
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

    initializeStars()
    initializePlanets()
    initializeComets()
    initializeNebulae()
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const initializeStars = () => {
    const stars: Star[] = []
    for (let i = 0; i < 200; i++) {
      stars.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        brightness: Math.random(),
        twinkleSpeed: 0.02 + Math.random() * 0.03
      })
    }
    starsRef.current = stars
  }

  const initializePlanets = () => {
    const planets: Planet[] = []
    const planetColors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#F0E68C', '#FFB6C1', '#87CEEB', '#D2691E'
    ]

    for (let i = 0; i < 5; i++) {
      const planet: Planet = {
        id: i,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        size: 30 + Math.random() * 50,
        color: planetColors[Math.floor(Math.random() * planetColors.length)],
        orbitRadius: 200 + i * 150,
        orbitSpeed: 0.001 + Math.random() * 0.002,
        angle: Math.random() * Math.PI * 2
      }

      // Adicionar luas para alguns planetas
      if (Math.random() > 0.5) {
        planet.moons = []
        const moonCount = 1 + Math.floor(Math.random() * 3)
        for (let j = 0; j < moonCount; j++) {
          planet.moons.push({
            size: 5 + Math.random() * 10,
            distance: planet.size + 20 + j * 15,
            speed: 0.02 + Math.random() * 0.03,
            angle: Math.random() * Math.PI * 2
          })
        }
      }

      planets.push(planet)
    }
    planetsRef.current = planets
  }

  const initializeComets = () => {
    const comets: Comet[] = []
    for (let i = 0; i < 3; i++) {
      comets.push({
        id: i,
        x: -50,
        y: Math.random() * window.innerHeight,
        speed: 2 + Math.random() * 3,
        angle: Math.random() * Math.PI / 4 - Math.PI / 8,
        size: 8 + Math.random() * 6,
        tail: []
      })
    }
    cometsRef.current = comets
  }

  const initializeNebulae = () => {
    const nebulae: Nebula[] = []
    const nebulaColors = ['#FF69B4', '#9370DB', '#4169E1', '#00CED1', '#FF1493']
    
    for (let i = 0; i < 3; i++) {
      nebulae.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 100 + Math.random() * 200,
        color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
        opacity: 0.1 + Math.random() * 0.2
      })
    }
    nebulaeRef.current = nebulae
  }

  const drawStar = (ctx: CanvasRenderingContext2D, star: Star) => {
    const brightness = 0.5 + Math.sin(Date.now() * star.twinkleSpeed + star.id) * 0.5
    
    ctx.save()
    ctx.globalAlpha = brightness * star.brightness
    ctx.fillStyle = '#FFFFFF'
    ctx.shadowColor = '#FFFFFF'
    ctx.shadowBlur = star.size * 2
    
    // Estrela principal
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
    ctx.fill()
    
    // Raios da estrela
    if (star.size > 2) {
      ctx.strokeStyle = '#FFFFFF'
      ctx.lineWidth = 1
      ctx.globalAlpha = brightness * 0.5
      
      const rayLength = star.size * 3
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2
        ctx.beginPath()
        ctx.moveTo(
          star.x + Math.cos(angle) * star.size,
          star.y + Math.sin(angle) * star.size
        )
        ctx.lineTo(
          star.x + Math.cos(angle) * rayLength,
          star.y + Math.sin(angle) * rayLength
        )
        ctx.stroke()
      }
    }
    
    ctx.restore()
  }

  const drawPlanet = (ctx: CanvasRenderingContext2D, planet: Planet) => {
    // Calcular posição orbital
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const x = centerX + Math.cos(planet.angle) * planet.orbitRadius
    const y = centerY + Math.sin(planet.angle) * planet.orbitRadius

    ctx.save()
    
    // Órbita (linha pontilhada)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.lineWidth = 1
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.arc(centerX, centerY, planet.orbitRadius, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])

    // Planeta
    const gradient = ctx.createRadialGradient(x - planet.size/3, y - planet.size/3, 0, x, y, planet.size)
    gradient.addColorStop(0, planet.color)
    gradient.addColorStop(1, `${planet.color}80`)
    
    ctx.fillStyle = gradient
    ctx.shadowColor = planet.color
    ctx.shadowBlur = 15
    ctx.beginPath()
    ctx.arc(x, y, planet.size, 0, Math.PI * 2)
    ctx.fill()

    // Anéis (para alguns planetas)
    if (planet.id === 1 || planet.id === 3) {
      ctx.strokeStyle = `${planet.color}60`
      ctx.lineWidth = 3
      ctx.shadowBlur = 5
      
      for (let i = 1; i <= 2; i++) {
        ctx.beginPath()
        ctx.ellipse(x, y, planet.size + i * 15, (planet.size + i * 15) * 0.3, 0, 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    // Luas
    if (planet.moons) {
      planet.moons.forEach(moon => {
        const moonX = x + Math.cos(moon.angle) * moon.distance
        const moonY = y + Math.sin(moon.angle) * moon.distance
        
        ctx.fillStyle = '#C0C0C0'
        ctx.shadowColor = '#C0C0C0'
        ctx.shadowBlur = 5
        ctx.beginPath()
        ctx.arc(moonX, moonY, moon.size, 0, Math.PI * 2)
        ctx.fill()
        
        moon.angle += moon.speed
      })
    }

    ctx.restore()
    
    // Atualizar ângulo orbital
    planet.angle += planet.orbitSpeed
  }

  const drawComet = (ctx: CanvasRenderingContext2D, comet: Comet) => {
    // Adicionar ponto à cauda
    comet.tail.push({ x: comet.x, y: comet.y, opacity: 1 })
    
    // Limitar tamanho da cauda
    if (comet.tail.length > 20) {
      comet.tail.shift()
    }
    
    // Diminuir opacidade da cauda
    comet.tail.forEach((point, index) => {
      point.opacity = (index + 1) / comet.tail.length
    })

    ctx.save()
    
    // Desenhar cauda
    ctx.strokeStyle = '#87CEEB'
    ctx.lineWidth = 3
    ctx.shadowColor = '#87CEEB'
    ctx.shadowBlur = 10
    
    for (let i = 1; i < comet.tail.length; i++) {
      const current = comet.tail[i]
      const previous = comet.tail[i - 1]
      
      ctx.globalAlpha = current.opacity * 0.7
      ctx.lineWidth = (current.opacity * 5) + 1
      
      ctx.beginPath()
      ctx.moveTo(previous.x, previous.y)
      ctx.lineTo(current.x, current.y)
      ctx.stroke()
    }

    // Núcleo do cometa
    ctx.globalAlpha = 1
    ctx.fillStyle = '#FFFFFF'
    ctx.shadowColor = '#FFFFFF'
    ctx.shadowBlur = 15
    ctx.beginPath()
    ctx.arc(comet.x, comet.y, comet.size, 0, Math.PI * 2)
    ctx.fill()

    // Coma (atmosfera do cometa)
    const comaGradient = ctx.createRadialGradient(comet.x, comet.y, comet.size, comet.x, comet.y, comet.size * 3)
    comaGradient.addColorStop(0, 'rgba(135, 206, 235, 0.3)')
    comaGradient.addColorStop(1, 'rgba(135, 206, 235, 0)')
    
    ctx.fillStyle = comaGradient
    ctx.beginPath()
    ctx.arc(comet.x, comet.y, comet.size * 3, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()

    // Movimento do cometa
    comet.x += Math.cos(comet.angle) * comet.speed
    comet.y += Math.sin(comet.angle) * comet.speed

    // Reset quando sai da tela
    if (comet.x > window.innerWidth + 100 || comet.y > window.innerHeight + 100 || comet.y < -100) {
      comet.x = -50
      comet.y = Math.random() * window.innerHeight
      comet.angle = Math.random() * Math.PI / 4 - Math.PI / 8
      comet.tail = []
    }
  }

  const drawNebula = (ctx: CanvasRenderingContext2D, nebula: Nebula) => {
    ctx.save()
    
    const gradient = ctx.createRadialGradient(
      nebula.x, nebula.y, 0,
      nebula.x, nebula.y, nebula.size
    )
    gradient.addColorStop(0, `${nebula.color}${Math.floor(nebula.opacity * 255).toString(16).padStart(2, '0')}`)
    gradient.addColorStop(0.5, `${nebula.color}${Math.floor(nebula.opacity * 128).toString(16).padStart(2, '0')}`)
    gradient.addColorStop(1, 'transparent')
    
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(nebula.x, nebula.y, nebula.size, 0, Math.PI * 2)
    ctx.fill()
    
    // Efeito de pulsação
    nebula.opacity = 0.1 + Math.sin(Date.now() * 0.001) * 0.1
    
    ctx.restore()
  }

  const drawGalaxy = (ctx: CanvasRenderingContext2D) => {
    const centerX = window.innerWidth * 0.8
    const centerY = window.innerHeight * 0.2
    
    ctx.save()
    
    // Núcleo da galáxia
    const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 50)
    coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
    coreGradient.addColorStop(0.3, 'rgba(255, 215, 0, 0.6)')
    coreGradient.addColorStop(1, 'transparent')
    
    ctx.fillStyle = coreGradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, 50, 0, Math.PI * 2)
    ctx.fill()
    
    // Braços espirais
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
    ctx.lineWidth = 2
    
    for (let arm = 0; arm < 2; arm++) {
      ctx.beginPath()
      for (let angle = 0; angle < Math.PI * 4; angle += 0.1) {
        const radius = angle * 8
        const x = centerX + Math.cos(angle + arm * Math.PI) * radius
        const y = centerY + Math.sin(angle + arm * Math.PI) * radius * 0.5
        
        if (angle === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()
    }
    
    ctx.restore()
  }

  const drawAsteroidBelt = (ctx: CanvasRenderingContext2D) => {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const beltRadius = 400
    
    ctx.save()
    
    for (let i = 0; i < 50; i++) {
      const angle = (i / 50) * Math.PI * 2 + Date.now() * 0.0001
      const radius = beltRadius + Math.sin(i * 0.5) * 30
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      const size = 1 + Math.random() * 3
      
      ctx.fillStyle = '#8B7355'
      ctx.shadowColor = '#8B7355'
      ctx.shadowBlur = 2
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

    // Fundo do espaço profundo
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
    )
    gradient.addColorStop(0, '#000011')
    gradient.addColorStop(0.5, '#000033')
    gradient.addColorStop(1, '#000000')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Desenhar nebulosas
    nebulaeRef.current.forEach(nebula => {
      drawNebula(ctx, nebula)
    })

    // Desenhar galáxia distante
    drawGalaxy(ctx)

    // Desenhar estrelas
    starsRef.current.forEach(star => {
      drawStar(ctx, star)
    })

    // Desenhar cinturão de asteroides
    drawAsteroidBelt(ctx)

    // Desenhar planetas
    planetsRef.current.forEach(planet => {
      drawPlanet(ctx, planet)
    })

    // Desenhar cometas
    cometsRef.current.forEach(comet => {
      drawComet(ctx, comet)
    })

    // Efeito de poeira cósmica
    ctx.save()
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
    for (let i = 0; i < 100; i++) {
      const x = (Date.now() * 0.02 + i * 50) % (canvas.width + 100)
      const y = (i * 73.5) % canvas.height
      const size = Math.random() * 1
      
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
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
      <div className="fixed inset-0 -z-5 bg-black/20" />
      
      {/* Elementos decorativos adicionais */}
      <div className="fixed inset-0 -z-5 pointer-events-none">
        {/* Pulsar distante */}
        <motion.div
          className="absolute top-10 right-10 w-3 h-3 bg-white rounded-full"
          animate={{
            scale: [1, 3, 1],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            boxShadow: '0 0 20px #FFFFFF, 0 0 40px #FFFFFF'
          }}
        />
        
        {/* Supernova distante */}
        <motion.div
          className="absolute bottom-20 left-10 w-6 h-6 bg-blue-400 rounded-full"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 1, 0.5],
            rotate: [0, 360]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            boxShadow: '0 0 30px #60A5FA, 0 0 60px #60A5FA'
          }}
        />

        {/* Estação espacial */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-8 h-2 bg-gray-400"
          animate={{
            x: [0, 50, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            boxShadow: '0 0 10px #9CA3AF'
          }}
        />
        
        {/* Satélite */}
        <motion.div
          className="absolute top-1/2 right-1/3"
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-4 h-4 bg-silver-400 transform rotate-45" style={{
            boxShadow: '0 0 8px #C0C0C0'
          }} />
        </motion.div>
      </div>
    </>
  )
}

