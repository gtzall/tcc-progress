"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle, Sparkles, Gamepad2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function GamePreview() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [score, setScore] = useState(0)
  const [showAchievement, setShowAchievement] = useState(false)

  // Sample questions for the preview
  const previewQuestions = [
    {
      question: "Qual é a nota máxima possível na redação do ENEM?",
      options: ["800 pontos", "1000 pontos", "900 pontos", "950 pontos"],
      correctAnswer: 1,
      explanation: "A redação do ENEM pode chegar a 1000 pontos, sendo avaliada em cinco competências diferentes.",
    },
    {
      question: "O que significa a sigla ENEM?",
      options: [
        "Exame Nacional do Ensino Médio",
        "Exame Nacional de Educação Média",
        "Exame Nacional para Entrada na Universidade",
        "Exame Nacional de Escolas Médias",
      ],
      correctAnswer: 0,
      explanation:
        "ENEM significa Exame Nacional do Ensino Médio, criado em 1998 para avaliar o desempenho escolar ao final da educação básica.",
    },
  ]

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index)
    setShowFeedback(true)

    if (index === previewQuestions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 100)

      if (score + 100 >= 100 && !showAchievement) {
        setTimeout(() => {
          setShowAchievement(true)
          setTimeout(() => setShowAchievement(false), 3000)
        }, 1000)
      }
    }
  }

  // Auto-rotate through questions for the preview
  useEffect(() => {
    if (!isHovered) {
      const timer = setTimeout(() => {
        if (showFeedback) {
          setShowFeedback(false)
          setSelectedAnswer(null)
          setCurrentQuestion((prev) => (prev + 1) % previewQuestions.length)
        }
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [showFeedback, currentQuestion, previewQuestions.length, isHovered])

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 rounded-full mb-4">
            <Gamepad2 className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Experimente o Jogo</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Experimente Nosso Jogo de Quiz
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Teste uma questão de exemplo abaixo ou mergulhe diretamente na experiência completa do jogo!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <motion.div
            className="lg:col-span-2"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gray-900/70 border-blue-900/50 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-10 w-10 rounded-full flex items-center justify-center">
                      <span className="font-bold">JD</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">
                        Jogador: <span className="text-white">Jogador</span>
                      </p>
                      <div className="flex items-center gap-3">
                        <p className="text-sm text-gray-300">
                          Nível: <span className="text-blue-400">1</span>
                        </p>
                        <p className="text-sm text-gray-300">
                          Pontuação: <span className="text-purple-400">{score}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-right">
                    <p className="text-gray-300">
                      Questão <span className="text-white">{currentQuestion + 1}</span> de{" "}
                      <span className="text-white">10</span>
                    </p>
                    <p className="text-gray-300">
                      Tema: <span className="text-blue-400">Provas</span>
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <Progress
                    value={10}
                    className="h-2 bg-gray-800"
                    indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-6 text-center p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-900/50">
                    {previewQuestions[currentQuestion].question}
                  </h3>
                  <div className="space-y-3">
                    {previewQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => !showFeedback && handleAnswerClick(index)}
                        disabled={showFeedback}
                        className={`w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center ${
                          selectedAnswer === index
                            ? index === previewQuestions[currentQuestion].correctAnswer
                              ? "bg-green-900/30 border border-green-500"
                              : "bg-red-900/30 border border-red-500"
                            : "bg-gray-800/50 border border-gray-700 hover:border-blue-500"
                        }`}
                      >
                        {showFeedback && index === previewQuestions[currentQuestion].correctAnswer && (
                          <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                        )}
                        {showFeedback &&
                          selectedAnswer === index &&
                          index !== previewQuestions[currentQuestion].correctAnswer && (
                            <XCircle className="h-5 w-5 mr-3 text-red-500 flex-shrink-0" />
                          )}
                        {(!showFeedback ||
                          (showFeedback &&
                            selectedAnswer !== index &&
                            index !== previewQuestions[currentQuestion].correctAnswer)) && (
                          <div className="h-5 w-5 mr-3 rounded-full border border-gray-600 flex-shrink-0"></div>
                        )}
                        <span>{option}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg mb-6 ${
                      selectedAnswer === previewQuestions[currentQuestion].correctAnswer
                        ? "bg-green-900/20 border-l-4 border-green-500"
                        : "bg-red-900/20 border-l-4 border-red-500"
                    }`}
                  >
                    <div className="flex items-start">
                      {selectedAnswer === previewQuestions[currentQuestion].correctAnswer ? (
                        <CheckCircle className="h-6 w-6 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-6 w-6 mr-3 text-red-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium mb-1">
                          {selectedAnswer === previewQuestions[currentQuestion].correctAnswer
                            ? "Correto!"
                            : "Incorreto!"}
                        </p>
                        <p className="text-gray-300">{previewQuestions[currentQuestion].explanation}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="flex justify-between">
                  <Button disabled variant="outline" className="border-gray-700 text-gray-400">
                    Anterior
                  </Button>
                  <Button
                    disabled={!showFeedback}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Próxima Questão
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <Gamepad2 className="h-10 w-10" />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Pronto para a Experiência Completa?
              </h3>
              <p className="text-gray-300 mb-6">
                Entre no nosso jogo completo de quiz com conquistas, rankings e trilhas de aprendizado personalizadas.
              </p>
              <Link href="/game">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full py-6 animate-pulse"
                >
                  <Gamepad2 className="mr-2 h-5 w-5" /> Jogar Jogo Completo
                </Button>
              </Link>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-blue-900/50 mt-4 w-full">
              <h4 className="font-medium mb-2 flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-yellow-400" /> Recursos do Jogo
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                  <span>Centenas de questões educativas</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                  <span>Múltiplos níveis de dificuldade</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span>Sistema de conquistas</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                  <span>Análises detalhadas de desempenho</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Achievement popup */}
      {showAchievement && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-black/70 backdrop-blur-sm p-8 rounded-xl border-2 border-yellow-500 text-center"
            initial={{ scale: 0.5, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: -100 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 15, -15, 15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: 1 }}
            >
              🏆
            </motion.div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-2">Conquista Desbloqueada!</h2>
            <p className="text-white text-lg">Primeira Resposta Correta</p>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
