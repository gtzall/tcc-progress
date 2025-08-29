"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Ana Silva",
    role: "Estudante ENEM",
    content:
      "Esta plataforma transformou minha rotina de estudos. Melhorei minhas notas em 20% em apenas dois meses de prática constante!",
    rating: 5,
  },
  {
    name: "Carlos Mendes",
    role: "Candidato a Medicina",
    content:
      "Os quizzes especializados para medicina me ajudaram a dominar tópicos complexos que eu tinha dificuldade com métodos tradicionais de estudo.",
    rating: 5,
  },
  {
    name: "Juliana Costa",
    role: "Estudante de Engenharia",
    content:
      "As seções de matemática e física são incrivelmente abrangentes. Me sinto muito mais confiante sobre minhas próximas provas.",
    rating: 4,
  },
  {
    name: "Rafael Santos",
    role: "Professor do Ensino Médio",
    content:
      "Recomendo esta plataforma para todos os meus alunos. As análises me ajudam a identificar quais tópicos precisam de mais atenção em sala de aula.",
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <section ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O Que Nossos Usuários Dizem</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Junte-se a milhares de estudantes que melhoraram seu desempenho em exames com nossa plataforma.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-blue-950 p-8 rounded-xl shadow-lg border border-blue-900/50"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0, 0, 100, 0.3)" }}
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                  />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
