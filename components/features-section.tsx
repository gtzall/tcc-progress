"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Award, Users, BarChart4, Clock, Gamepad2, Star, Trophy } from "lucide-react"

const features = [
  {
    icon: <Gamepad2 className="h-10 w-10 text-blue-400" />,
    title: "Aprenda Jogando",
    description: "Transforme o estudo em uma experiência divertida e envolvente com nossos quizzes interativos.",
  },
  {
    icon: <Award className="h-10 w-10 text-purple-400" />,
    title: "Sistema de Conquistas",
    description: "Ganhe medalhas e acompanhe seu progresso enquanto domina diferentes áreas do conhecimento.",
  },
  {
    icon: <Users className="h-10 w-10 text-cyan-400" />,
    title: "Competição com Amigos",
    description: "Desafie seus colegas para competições amigáveis e sessões de estudo em grupo.",
  },
  {
    icon: <BarChart4 className="h-10 w-10 text-blue-400" />,
    title: "Análise de Desempenho",
    description: "Visualize seus pontos fortes e fracos com relatórios detalhados de desempenho.",
  },
  {
    icon: <Clock className="h-10 w-10 text-purple-400" />,
    title: "Desafios Cronometrados",
    description: "Pratique em condições de exame com quizzes cronometrados e simulados completos.",
  },
  {
    icon: <Trophy className="h-10 w-10 text-cyan-400" />,
    title: "Ranking de Jogadores",
    description: "Compare seu desempenho com outros jogadores e suba no ranking global.",
  },
]

export default function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

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
            <Star className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Recursos do Jogo</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Recursos Incríveis
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Desenvolvemos nosso jogo de quiz para tornar o estudo para provas mais eficaz e divertido.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-900/80 to-gray-900/60 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-blue-900/50 hover:border-blue-700/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0, 0, 100, 0.3)" }}
            >
              <div className="mb-6 bg-gradient-to-br from-blue-900/30 to-purple-900/30 p-3 rounded-lg inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600 rounded-full blur-[150px] opacity-5 pointer-events-none"></div>
    </section>
  )
}
