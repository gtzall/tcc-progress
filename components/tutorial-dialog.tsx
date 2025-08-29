"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Award,
  BookOpen,
  Brain,
  CheckCircle,
  XCircle,
  BarChart,
  Trophy,
  Sparkles,
  Tag,
  Star,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface TutorialDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  isOpen?: boolean
  onClose?: () => void
  isFirstTime?: boolean
}

export default function TutorialDialog({ open, onOpenChange, isOpen: externalIsOpen, onClose, isFirstTime = false }: TutorialDialogProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const isOpen = open !== undefined ? open : (externalIsOpen !== undefined ? externalIsOpen : internalIsOpen)
  const setIsOpen = onOpenChange || (externalIsOpen !== undefined ? onClose || (() => {}) : setInternalIsOpen)

  const tutorialSteps = [
    {
      title: "Bem-vindo ao QuizMaster!",
      description:
        "Este tutorial interativo vai guiá-lo sobre como usar nosso jogo educacional de quiz. Vamos começar!",
      image: "🚀",
    },
    {
      title: "Iniciando um Quiz",
      description:
        "Digite seu nome e selecione um nível de dificuldade. A dificuldade afeta a complexidade das questões e os pontos ganhos.",
      image: "👤",
    },
    {
      title: "Respondendo Questões",
      description:
        "Leia cada questão cuidadosamente e selecione a resposta que você acredita ser correta. Vamos tentar uma questão de exemplo!",
      image: "❓",
      interactive: true,
    },
    {
      title: "Acompanhando seu Progresso",
      description:
        "Monitore sua pontuação, nível e progresso durante o quiz. Seu nível aumenta conforme você ganha mais pontos!",
      image: "📊",
    },
    {
      title: "Desbloqueando Conquistas",
      description:
        "Ganhe conquistas especiais completando desafios específicos, como responder várias questões corretamente em sequência.",
      image: "🏆",
    },
    {
      title: "Revisando Resultados",
      description:
        "Após completar um quiz, revise seu desempenho, veja quais conquistas você desbloqueou e identifique áreas para melhorar.",
      image: "📝  veja quais conquistas você desbloqueou e identifique áreas para melhorar.",
      image: "📝",
    },
    {
      title: "Você Está Pronto!",
      description:
        "Agora você sabe como usar o QuizMaster! Inicie um quiz e comece sua jornada de aprendizado. Boa sorte!",
      image: "🎉",
    },
  ]

  const handleNextStep = () => {
    if (currentStep === 2 && !showFeedback) {
      return // Não avance se a questão interativa não foi respondida
    }

    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    } else {
      setIsOpen(false)
      setTimeout(() => setCurrentStep(0), 300)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    }
  }

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index)
    setShowFeedback(true)
  }

  // Questão de exemplo para o tutorial interativo
  const sampleQuestion = {
    question: "Qual é a nota máxima possível na redação do ENEM?",
    options: ["800 pontos", "1000 pontos", "900 pontos", "950 pontos"],
    correctAnswer: 1,
    explanation: "A redação do ENEM pode chegar a 1000 pontos, sendo avaliada em cinco competências diferentes.",
  }

  return (
    <>
      {!isFirstTime && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="border-blue-500/50 hover:bg-blue-900/20 text-blue-400"
        >
          <HelpCircle className="mr-2 h-4 w-4" /> Tutorial
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-gray-900 border-blue-900/50 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <span className="text-3xl">{tutorialSteps[currentStep].image}</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                {tutorialSteps[currentStep].title}
              </span>
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-base">
              {tutorialSteps[currentStep].description}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {/* Indicador de progresso */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Início</span>
                <span>Completo</span>
              </div>
              <Progress
                value={(currentStep / (tutorialSteps.length - 1)) * 100}
                className="h-2 bg-gray-800"
                indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500"
              />
            </div>

            {/* Conteúdo interativo baseado no passo atual */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 0 && (
                  <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-900/50 text-center">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                      <span className="text-3xl">🚀</span>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Bem-vindo ao QuizMaster!</h3>
                    <p className="text-gray-300">
                      Nosso jogo educacional interativo de quiz vai ajudá-lo a se preparar para provas enquanto se
                      diverte!
                    </p>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                    <div className="flex flex-col gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Seu Nome</label>
                        <div className="flex">
                          <input
                            type="text"
                            placeholder="Digite seu nome"
                            className="bg-gray-900 border border-gray-700 rounded-md p-2 w-full text-white"
                            disabled
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Dificuldade</label>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-green-600 text-white p-2 rounded-md text-center">Fácil</div>
                          <div className="bg-gray-700 text-gray-300 p-2 rounded-md text-center">Médio</div>
                          <div className="bg-gray-700 text-gray-300 p-2 rounded-md text-center">Difícil</div>
                        </div>
                        <div className="mt-2 text-sm text-gray-400">
                          <span className="flex items-center">
                            <Sparkles className="h-3 w-3 mr-1 text-green-400" />
                            Fácil: 100 pontos por resposta correta
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 mr-2 text-blue-400" />
                        <span className="text-sm text-gray-300">
                          Tema: <span className="text-blue-400">Provas</span>
                        </span>
                      </div>
                      <div className="flex items-center">
                        <BarChart className="h-4 w-4 mr-2 text-purple-400" />
                        <span className="text-sm text-gray-300">
                          Dificuldade: <span className="text-purple-400">Fácil</span>
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-medium mb-4 text-center">{sampleQuestion.question}</h3>

                    <div className="space-y-3">
                      {sampleQuestion.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => !showFeedback && handleAnswerClick(index)}
                          disabled={showFeedback}
                          className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center ${
                            selectedAnswer === index
                              ? index === sampleQuestion.correctAnswer
                                ? "bg-green-900/30 border border-green-500"
                                : "bg-red-900/30 border border-red-500"
                              : "bg-gray-900/70 border border-gray-700 hover:border-blue-500"
                          }`}
                        >
                          {showFeedback && index === sampleQuestion.correctAnswer ? (
                            <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                          ) : showFeedback && selectedAnswer === index && index !== sampleQuestion.correctAnswer ? (
                            <XCircle className="h-5 w-5 mr-3 text-red-500 flex-shrink-0" />
                          ) : (
                            <div className="h-5 w-5 mr-3 rounded-full border border-gray-600 flex-shrink-0"></div>
                          )}
                          <span>{option}</span>
                        </button>
                      ))}
                    </div>

                    {showFeedback && (
                      <div
                        className={`p-4 rounded-lg mt-4 ${
                          selectedAnswer === sampleQuestion.correctAnswer
                            ? "bg-green-900/20 border-l-4 border-green-500"
                            : "bg-red-900/20 border-l-4 border-red-500"
                        }`}
                      >
                        <div className="flex items-start">
                          {selectedAnswer === sampleQuestion.correctAnswer ? (
                            <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="h-5 w-5 mr-3 text-red-500 flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className="font-medium mb-1">
                              {selectedAnswer === sampleQuestion.correctAnswer ? "Correto!" : "Incorreto!"}
                            </p>
                            <p className="text-gray-300 text-sm">{sampleQuestion.explanation}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-blue-600 h-10 w-10 rounded-full flex items-center justify-center">
                        <span className="font-bold">J</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">
                          Jogador: <span className="text-white">João</span>
                        </p>
                        <div className="flex items-center gap-3">
                          <p className="text-sm text-gray-300">
                            Nível: <span className="text-blue-400">2</span>
                          </p>
                          <p className="text-sm text-gray-300">
                            Pontuação: <span className="text-purple-400">750</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Questão 1</span>
                        <span>Questão 10</span>
                      </div>
                      <Progress
                        value={60}
                        className="h-2 bg-gray-900"
                        indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500"
                      />
                      <div className="text-right text-xs text-gray-400 mt-1">6/10 completadas</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-gray-900/70 p-3 rounded-lg text-center">
                        <div className="text-sm text-gray-400 mb-1">Respostas Corretas</div>
                        <div className="text-xl font-bold text-green-400">4</div>
                      </div>
                      <div className="bg-gray-900/70 p-3 rounded-lg text-center">
                        <div className="text-sm text-gray-400 mb-1">Respostas Erradas</div>
                        <div className="text-xl font-bold text-red-400">2</div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <Trophy className="mr-2 h-5 w-5 text-yellow-500" /> Conquistas Disponíveis
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-900/70 p-4 rounded-lg flex items-center gap-3 border border-yellow-900/50">
                        <div className="h-10 w-10 rounded-full bg-yellow-900/30 flex items-center justify-center">
                          <Award className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Iniciante</h4>
                          <p className="text-xs text-gray-400">Acertar 2 perguntas</p>
                        </div>
                      </div>

                      <div className="bg-gray-900/70 p-4 rounded-lg flex items-center gap-3 border border-gray-700">
                        <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Expert em Provas</h4>
                          <p className="text-xs text-gray-400">Acertar 3 perguntas sobre provas</p>
                        </div>
                      </div>

                      <div className="bg-gray-900/70 p-4 rounded-lg flex items-center gap-3 border border-gray-700">
                        <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Sem Erros</h4>
                          <p className="text-xs text-gray-400">Responder 3 perguntas seguidas sem errar</p>
                        </div>
                      </div>

                      <div className="bg-gray-900/70 p-4 rounded-lg flex items-center gap-3 border border-gray-700">
                        <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                          <Brain className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Mestre do Conhecimento</h4>
                          <p className="text-xs text-gray-400">Alcançar nível 3</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                      <div className="bg-gray-900/70 p-3 rounded-lg text-center">
                        <Star className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
                        <div className="text-lg font-bold text-yellow-400">850</div>
                        <div className="text-xs text-gray-400">Pontuação Final</div>
                      </div>
                      <div className="bg-gray-900/70 p-3 rounded-lg text-center">
                        <CheckCircle className="h-5 w-5 mx-auto mb-1 text-green-500" />
                        <div className="text-lg font-bold text-green-400">7</div>
                        <div className="text-xs text-gray-400">Corretas</div>
                      </div>
                      <div className="bg-gray-900/70 p-3 rounded-lg text-center">
                        <XCircle className="h-5 w-5 mx-auto mb-1 text-red-500" />
                        <div className="text-lg font-bold text-red-400">3</div>
                        <div className="text-xs text-gray-400">Erradas</div>
                      </div>
                      <div className="bg-gray-900/70 p-3 rounded-lg text-center">
                        <Award className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                        <div className="text-lg font-bold text-blue-400">2</div>
                        <div className="text-xs text-gray-400">Nível</div>
                      </div>
                    </div>

                    <div className="bg-red-900/10 border border-red-900/30 rounded-lg p-4">
                      <p className="text-sm text-gray-300 mb-2">Áreas para melhorar:</p>
                      <div className="flex items-start gap-2 mb-2">
                        <div className="h-5 w-5 rounded-full bg-red-900/30 flex items-center justify-center text-xs flex-shrink-0">
                          1
                        </div>
                        <p className="text-xs text-gray-400">Revisar critérios de pontuação da redação do ENEM</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-red-900/30 flex items-center justify-center text-xs flex-shrink-0">
                          2
                        </div>
                        <p className="text-xs text-gray-400">Praticar mais questões de admissão universitária</p>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 6 && (
                  <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-900/50 text-center">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                      <span className="text-3xl">🎉</span>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Você Está Pronto para Começar!</h3>
                    <p className="text-gray-300 mb-4">
                      Agora você sabe como usar o QuizMaster. Inicie um quiz e comece sua jornada de aprendizado!
                    </p>
                    <Button
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={() => setIsOpen(false)}
                    >
                      Começar a Jogar
                    </Button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" onClick={handlePrevStep} disabled={currentStep === 0} className="border-gray-700">
              <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={currentStep === 2 && !showFeedback}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {currentStep < tutorialSteps.length - 1 ? (
                <>
                  Próximo <ChevronRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                "Finalizar Tutorial"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
