"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Gamepad2, Star, Trophy } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const scrollY = window.scrollY
      const sectionTop = sectionRef.current.offsetTop
      const offset = scrollY - sectionTop

      if (offset > -500 && offset < 500) {
        const parallaxElements = sectionRef.current.querySelectorAll(".parallax")
        parallaxElements.forEach((el, index) => {
          const speed = 0.1 + index * 0.05
          const yPos = -offset * speed
          const htmlEl = el as HTMLElement
          htmlEl.style.transform = `translateY(${yPos}px)`
        })
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="py-12 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-4 parallax">
              <div className="bg-blue-600/30 text-blue-400 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Gamepad2 className="h-4 w-4 mr-1" /> Jogo Educacional
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight parallax">
              Aprenda Jogando com{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                QuizMaster
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 parallax">
              Prepare-se para o ENEM e vestibulares com nossa plataforma interativa de quiz. Torne o estudo divertido e
              eficaz!
            </p>
            <div className="flex flex-wrap gap-4 parallax">
              <Link href="/game">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Jogar Agora <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-950">
                  Criar Conta
                </Button>
              </Link>
            </div>

            <div className="flex items-center mt-8 space-x-6 parallax">
              <div className="flex items-center">
                <div className="bg-blue-900/30 p-2 rounded-full">
                  <Trophy className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium">Conquistas</p>
                  <p className="text-xs text-gray-400">Desbloqueie prêmios</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-purple-900/30 p-2 rounded-full">
                  <Star className="h-5 w-5 text-purple-400" />
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium">Ranking</p>
                  <p className="text-xs text-gray-400">Compita com amigos</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full aspect-video bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl overflow-hidden shadow-2xl parallax border border-blue-900/50">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center animate-pulse">
                  <Gamepad2 className="h-10 w-10" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-1">Quiz Interativo</h3>
                    <p className="text-sm text-gray-300">Milhares de questões para você praticar</p>
                  </div>
                  <Link href="/game">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Jogar
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full blur-3xl opacity-20"></div>

            <div className="absolute -right-4 top-1/4 transform rotate-12 bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg border border-blue-900/50 shadow-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                  <span className="text-xs font-bold">+1</span>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Conquista Desbloqueada!</p>
                  <p className="text-xs text-gray-400">Resposta Perfeita</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-950 to-transparent"></div>
    </section>
  )
}
