"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, HelpCircle, Gamepad2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AstroGuide() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [hasBeenOpened, setHasBeenOpened] = useState(false)

  const messages = [
    {
      text: "Olá! Eu sou o Astro, seu guia cósmico no QuizMaster! 👋",
      delay: 0,
    },
    {
      text: "Precisa de ajuda para navegar pelo universo do conhecimento? Estou aqui para te ajudar!",
      delay: 1000,
    },
    {
      text: "Experimente nosso jogo de quiz interativo para se preparar para suas provas de forma divertida!",
      delay: 1000,
    },
    {
      text: "Quer começar agora? Clique no botão abaixo para iniciar sua jornada de aprendizado!",
      delay: 1000,
      action: {
        text: "Iniciar Jogo de Quiz",
        link: "/game",
      },
    },
  ]

  // Auto-open the guide after 3 seconds if it hasn't been opened yet
  useEffect(() => {
    if (!hasBeenOpened) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        setHasBeenOpened(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [hasBeenOpened])

  // Auto-advance through messages
  useEffect(() => {
    if (isOpen && currentMessage < messages.length - 1) {
      const timer = setTimeout(() => {
        setCurrentMessage((prev) => prev + 1)
      }, messages[currentMessage].delay)
      return () => clearTimeout(timer)
    }
  }, [isOpen, currentMessage, messages])

  return (
    <>
      {/* Chat button */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg z-50 hover:scale-110 transition-transform duration-300"
        onClick={() => {
          setIsOpen(!isOpen)
          setHasBeenOpened(true)
          if (!isOpen) setCurrentMessage(0)
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Gamepad2 className="h-6 w-6" />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-xl border border-blue-900/50 z-50 overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-b border-blue-900/50 flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-3">
                <span className="text-lg font-bold">🚀</span>
              </div>
              <div>
                <h3 className="font-bold">Astro Guia</h3>
                <p className="text-xs text-gray-300">Seu assistente cósmico de aprendizado</p>
              </div>
              <button className="ml-auto text-gray-400 hover:text-white" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 h-64 overflow-y-auto flex flex-col space-y-4">
              {messages.slice(0, currentMessage + 1).map((message, index) => (
                <motion.div
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="text-sm">🚀</span>
                  </div>
                  <div className="bg-blue-900/30 rounded-lg p-3 max-w-[85%]">
                    <p className="text-sm">{message.text}</p>
                    {message.action && (
                      <Link href={message.action.link}>
                        <Button
                          size="sm"
                          className="mt-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xs"
                        >
                          <Gamepad2 className="mr-1 h-3 w-3" /> {message.action.text}
                        </Button>
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-3 border-t border-blue-900/50 flex items-center">
              <div className="text-xs text-gray-400 flex items-center">
                <HelpCircle className="h-3 w-3 mr-1" />
                <span>
                  Precisa de mais ajuda? Visite nossa{" "}
                  <Link href="/help" className="text-blue-400 hover:underline">
                    Central de Ajuda
                  </Link>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
