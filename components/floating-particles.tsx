"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
  rotation: number
  rotationSpeed: number
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create particles
    const particles: Particle[] = []
    const particleCount = Math.min(30, Math.floor((canvas.width * canvas.height) / 50000))

    const createParticle = (): Particle => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 15 + 5,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        color: getRandomColor(),
        opacity: Math.random() * 0.5 + 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() * 0.02 - 0.01) * (Math.random() > 0.5 ? 1 : -1),
      }
    }

    const getRandomColor = () => {
      const colors = ["#4a6bff", "#5d87ff", "#64ffda", "#a78bfa", "#8b5cf6", "#3b82f6"]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle())
    }

    // Draw particles
    const drawParticle = (particle: Particle) => {
      if (!ctx) return

      ctx.save()
      ctx.globalAlpha = particle.opacity
      ctx.translate(particle.x, particle.y)
      ctx.rotate(particle.rotation)

      // Draw geometric shapes
      const shapeType = Math.floor(Math.random() * 3)

      if (shapeType === 0) {
        // Draw circle
        ctx.beginPath()
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      } else if (shapeType === 1) {
        // Draw square
        ctx.fillStyle = particle.color
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
      } else {
        // Draw triangle
        ctx.beginPath()
        ctx.moveTo(0, -particle.size / 2)
        ctx.lineTo(particle.size / 2, particle.size / 2)
        ctx.lineTo(-particle.size / 2, particle.size / 2)
        ctx.closePath()
        ctx.fillStyle = particle.color
        ctx.fill()
      }

      ctx.restore()
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.rotation += particle.rotationSpeed

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1
        }

        // Draw particle
        drawParticle(particle)
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-30" />
}
