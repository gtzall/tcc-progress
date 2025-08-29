"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trophy, Sparkles, Gift, Crown, Medal, Zap, Gamepad2, Lock, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Reward {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  unlockLevel: number
  category: "tema" | "avatar" | "poder" | "medalha" | "título"
  unlocked: boolean
  new?: boolean
}

export default function RewardsShowcase() {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const rewards: Reward[] = [
    {
      id: "tema-espacial",
      name: "Tema Espacial",
      description: "Transforme a interface do jogo com um tema espacial futurista.",
      icon: <Sparkles className="h-8 w-8 text-blue-400" />,
      unlockLevel: 2,
      category: "tema",
      unlocked: true,
      new: true,
    },
    {
      id: "tema-neon",
      name: "Tema Neon",
      description: "Um tema vibrante com cores neon para a interface do jogo.",
      icon: <Zap className="h-8 w-8 text-purple-400" />,
      unlockLevel: 5,
      category: "tema",
      unlocked: false,
    },
    {
      id: "avatar-astronauta",
      name: "Avatar Astronauta",
      description: "Um avatar exclusivo de astronauta para seu perfil.",
      icon: <Gamepad2 className="h-8 w-8 text-blue-400" />,
      unlockLevel: 3,
      category: "avatar",
      unlocked: true,
    },
    {
      id: "poder-dica",
      name: "Poder de Dica",
      description: "Receba uma dica durante as questões difíceis.",
      icon: <Gift className="h-8 w-8 text-yellow-400" />,
      unlockLevel: 4,
      category: "poder",
      unlocked: false,
    },
    {
      id: "medalha-ouro",
      name: "Medalha de Ouro",
      description: "Uma medalha de ouro para exibir em seu perfil.",
      icon: <Medal className="h-8 w-8 text-yellow-400" />,
      unlockLevel: 6,
      category: "medalha",
      unlocked: false,
    },
    {
      id: "titulo-mestre",
      name: "Título: Mestre do Quiz",
      description: "Um título exclusivo para exibir junto ao seu nome.",
      icon: <Crown className="h-8 w-8 text-yellow-400" />,
      unlockLevel: 10,
      category: "título",
      unlocked: false,
    },
  ]

  const filteredRewards = activeTab === "all" ? rewards : rewards.filter((reward) => reward.category === activeTab)

  return (
    <div className="bg-gray-900/70 backdrop-blur-sm border border-blue-900/50 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Trophy className="h-6 w-6 text-yellow-400 mr-2" />
          <h2 className="text-xl font-bold">Recompensas</h2>
        </div>
        <Badge className="bg-blue-600">
          {rewards.filter((r) => r.unlocked).length}/{rewards.length} Desbloqueadas
        </Badge>
      </div>

      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-6 mb-4">
          <TabsTrigger value="all" className="text-xs">
            Todas
          </TabsTrigger>
          <TabsTrigger value="tema" className="text-xs">
            Temas
          </TabsTrigger>
          <TabsTrigger value="avatar" className="text-xs">
            Avatares
          </TabsTrigger>
          <TabsTrigger value="poder" className="text-xs">
            Poderes
          </TabsTrigger>
          <TabsTrigger value="medalha" className="text-xs">
            Medalhas
          </TabsTrigger>
          <TabsTrigger value="título" className="text-xs">
            Títulos
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredRewards.map((reward) => (
              <motion.div
                key={reward.id}
                className={`relative bg-gray-800/70 rounded-lg p-4 border ${
                  reward.unlocked ? "border-blue-900/50" : "border-gray-700/50"
                } cursor-pointer transition-all duration-300 hover:shadow-md ${
                  reward.unlocked ? "hover:border-blue-500/50" : "hover:border-gray-600/50"
                } ${!reward.unlocked && "opacity-70"}`}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedReward(reward)}
              >
                <div className="absolute top-2 right-2">
                  {reward.unlocked ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Lock className="h-4 w-4 text-gray-500" />
                  )}
                </div>

                {reward.new && (
                  <div className="absolute -top-2 -left-2">
                    <Badge className="bg-green-600 text-xs px-1.5 animate-pulse">Novo</Badge>
                  </div>
                )}

                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-16 h-16 rounded-full ${
                      reward.unlocked
                        ? "bg-gradient-to-br from-blue-600 to-purple-600"
                        : "bg-gradient-to-br from-gray-700 to-gray-800"
                    } flex items-center justify-center mb-3`}
                  >
                    {reward.icon}
                  </div>
                  <h3 className="font-bold mb-1">{reward.name}</h3>
                  <p className="text-xs text-gray-400 mb-2">{reward.description}</p>
                  <Badge
                    className={`${reward.unlocked ? "bg-blue-600" : "bg-gray-700"} text-xs px-2 py-0.5 font-normal`}
                  >
                    Nível {reward.unlockLevel}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedReward && (
        <div className="mt-6 bg-gray-800/70 rounded-lg p-4 border border-blue-900/50">
          <div className="flex items-start">
            <div
              className={`w-20 h-20 rounded-full ${
                selectedReward.unlocked
                  ? "bg-gradient-to-br from-blue-600 to-purple-600"
                  : "bg-gradient-to-br from-gray-700 to-gray-800"
              } flex items-center justify-center mr-4 flex-shrink-0`}
            >
              {selectedReward.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold">{selectedReward.name}</h3>
                <Badge
                  className={`${
                    selectedReward.unlocked ? "bg-green-600" : "bg-gray-700"
                  } text-xs px-2 py-0.5 font-normal`}
                >
                  {selectedReward.unlocked ? "Desbloqueado" : `Bloqueado (Nível ${selectedReward.unlockLevel})`}
                </Badge>
              </div>
              <p className="text-gray-300 mb-4">{selectedReward.description}</p>
              {selectedReward.unlocked ? (
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Usar Recompensa
                </Button>
              ) : (
                <Button disabled className="bg-gray-700 cursor-not-allowed">
                  <Lock className="h-4 w-4 mr-2" /> Bloqueado
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
