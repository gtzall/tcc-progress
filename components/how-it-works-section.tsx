"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { UserPlus, Trophy, Gamepad2, Star, Medal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const steps = [
  {
    icon: <UserPlus className="h-8 w-8" />,
    title: "Crie Sua Conta",
    description: "Cadastre-se e crie seu perfil personalizado para acompanhar seu progresso e conquistas.",
  },
  {
    icon: <Gamepad2 className="h-8 w-8" />,
    title: "Escolha Seus Desafios",
    description: "Selecione as categorias e níveis de dificuldade que deseja enfrentar.",
  },
  {
    icon: <Trophy className="h-8 w-8" />,
    title: "Jogue e Conquiste",
    description: "Participe de quizzes interativos, ganhe pontos e desbloqueie conquistas especiais.",
  },
]

export default function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <section ref={ref} className="py-16 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 rounded-full mb-4">
            <Medal className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Como Jogar</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Comece a Jogar em 3 Passos
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Começar com nosso jogo é fácil. Siga estes passos simples para iniciar sua jornada rumo ao sucesso
            acadêmico.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-purple-600 hidden md:block"></div>

          <div className="space-y-20">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div
                  className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}
                >
                  <div className="md:w-1/2 flex justify-center">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center z-10 relative">
                        {step.icon}
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-600/20 rounded-full blur-xl"></div>
                      <div className="absolute -top-2 -right-2 bg-blue-900/80 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-500/50 text-sm font-bold">
                        Passo {index + 1}
                      </div>
                    </div>
                  </div>

                  <div className="md:w-1/2 text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 text-lg mb-4">{step.description}</p>
                    {index === steps.length - 1 && (
                      <Link href="/game">
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          <Gamepad2 className="mr-2 h-4 w-4" /> Começar a Jogar
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20 py-12 border-y border-blue-900/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Pronto para testar seus conhecimentos?</h3>
              <p className="text-gray-300 mb-6">
                Junte-se a milhares de estudantes que estão melhorando suas notas enquanto se divertem com nosso jogo de
                quiz educacional.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/game">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Gamepad2 className="mr-2 h-4 w-4" /> Jogar Agora
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-900/20">
                    <UserPlus className="mr-2 h-4 w-4" /> Criar Conta
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center animate-pulse">
                  <Star className="h-16 w-16" />
                </div>
                <div className="absolute -top-4 -right-4 bg-yellow-600/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold animate-bounce">
                  Novo!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
