"use client"

import Link from "next/link"
import { X, BookOpen, Trophy, Users, Settings, LogOut, Home, Tag, BarChart } from "lucide-react"

interface GameSidebarProps {
  isOpen: boolean
  onClose: () => void
  activeTab: string
  onTabChange: (tab: string) => void
  gameStats?: { level: number | undefined; score: number | undefined }
  levelSystem?: { getXPForLevel: (level: number) => number }
}

export default function GameSidebar({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  gameStats,
  levelSystem,
}: GameSidebarProps) {
  const handleTabClick = (tab: string) => {
    onTabChange(tab)
    if (window.innerWidth < 1024) {
      onClose()
    }
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-blue-900/50 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-blue-900/50">
          <div className="flex items-center">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              QuizMaster
            </h1>
            <button className="ml-auto lg:hidden" onClick={onClose}>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-4 border-b border-blue-900/50">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="font-bold">JD</span>
            </div>
            <div>
              <p className="font-medium">Jogador</p>
              <div className="flex items-center gap-2">
                <div className="bg-blue-900/30 px-1.5 py-0.5 rounded text-xs text-blue-400">
                  Nível {gameStats?.level || 1}
                </div>
                <p className="text-xs text-gray-400">{gameStats?.score || 0} XP</p>
              </div>
            </div>
          </div>

          {/* Add mini level progress bar */}
          <div className="mt-3">
            <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                style={{
                  width: `${
                    levelSystem && gameStats?.score && gameStats?.level
                      ? ((gameStats.score % levelSystem.getXPForLevel(gameStats.level)) /
                          levelSystem.getXPForLevel(gameStats.level)) *
                        100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Nível {gameStats?.level || 1}</span>
              <span>Nível {(gameStats?.level || 1) + 1}</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <button
            onClick={() => handleTabClick("inicio")}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg w-full text-left ${
              activeTab === "inicio" ? "bg-blue-900/30 text-blue-400" : "hover:bg-gray-800 transition-colors"
            }`}
          >
            <Home className="h-5 w-5" />
            <span>Início</span>
          </button>

          <button
            onClick={() => handleTabClick("quiz")}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg w-full text-left ${
              activeTab === "quiz" ? "bg-blue-900/30 text-blue-400" : "hover:bg-gray-800 transition-colors"
            }`}
          >
            <BookOpen className="h-5 w-5" />
            <span>Quiz</span>
          </button>

          <button
            onClick={() => handleTabClick("categorias")}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg w-full text-left ${
              activeTab === "categorias" ? "bg-blue-900/30 text-blue-400" : "hover:bg-gray-800 transition-colors"
            }`}
          >
            <Tag className="h-5 w-5" />
            <span>Categorias</span>
          </button>

          <button
            onClick={() => handleTabClick("achievements")}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg w-full text-left ${
              activeTab === "achievements" ? "bg-blue-900/30 text-blue-400" : "hover:bg-gray-800 transition-colors"
            }`}
          >
            <Trophy className="h-5 w-5" />
            <span>Conquistas</span>
          </button>

          <button
            onClick={() => handleTabClick("statistics")}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg w-full text-left ${
              activeTab === "statistics" ? "bg-blue-900/30 text-blue-400" : "hover:bg-gray-800 transition-colors"
            }`}
          >
            <BarChart className="h-5 w-5" />
            <span>Estatísticas</span>
          </button>

          <button
            onClick={() => handleTabClick("ranking")}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg w-full text-left ${
              activeTab === "ranking" ? "bg-blue-900/30 text-blue-400" : "hover:bg-gray-800 transition-colors"
            }`}
          >
            <Users className="h-5 w-5" />
            <span>Ranking</span>
          </button>
        </nav>

        <div className="p-4 border-t border-blue-900/50">
          <div className="space-y-1">
            <button className="flex items-center space-x-3 px-3 py-2 rounded-lg w-full text-left hover:bg-gray-800 transition-colors">
              <Settings className="h-5 w-5" />
              <span>Configurações</span>
            </button>
            <Link
              href="/"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Sair do Jogo</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}
