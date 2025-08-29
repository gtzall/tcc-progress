'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Palette, Sparkles, Zap, Star } from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'
import { APP_CONFIG, THEME_COLORS, ThemeType } from '@/lib/config'
import { cn } from '@/lib/utils'

interface ThemeOption {
  id: ThemeType
  name: string
  description: string
  icon: React.ReactNode
  gradient: string
  accent: string
  features: string[]
}

const themeOptions: ThemeOption[] = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Futurista e neon',
    icon: <Zap className="w-5 h-5" />,
    gradient: 'from-gray-900 via-purple-900 to-cyan-900',
    accent: 'from-cyan-400 to-pink-400',
    features: ['Neon', 'Futurista', 'Tech']
  },
  {
    id: 'space',
    name: 'Espaço',
    description: 'Cosmos infinito',
    icon: <Star className="w-5 h-5" />,
    gradient: 'from-black via-blue-900 to-purple-900',
    accent: 'from-blue-400 to-purple-400',
    features: ['Galáxias', 'Estrelas', 'Mistério']
  },
  {
    id: 'ocean',
    name: 'Oceano',
    description: 'Profundezas marinhas',
    icon: <Sparkles className="w-5 h-5" />,
    gradient: 'from-blue-900 via-cyan-800 to-teal-700',
    accent: 'from-cyan-400 to-teal-400',
    features: ['Marinho', 'Calmo', 'Fluido']
  },
  {
    id: 'forest',
    name: 'Floresta',
    description: 'Natureza viva',
    icon: <Palette className="w-5 h-5" />,
    gradient: 'from-green-900 via-emerald-800 to-teal-700',
    accent: 'from-green-400 to-emerald-400',
    features: ['Natural', 'Fresco', 'Vital']
  },
  {
    id: 'desert',
    name: 'Deserto',
    description: 'Areias douradas',
    icon: <Star className="w-5 h-5" />,
    gradient: 'from-yellow-900 via-orange-800 to-red-700',
    accent: 'from-yellow-400 to-orange-400',
    features: ['Quente', 'Árido', 'Dourado']
  },
  {
    id: 'volcano',
    name: 'Vulcão',
    description: 'Fogo e energia',
    icon: <Zap className="w-5 h-5" />,
    gradient: 'from-red-900 via-orange-800 to-yellow-700',
    accent: 'from-red-400 to-orange-400',
    features: ['Quente', 'Energético', 'Intenso']
  },
  {
    id: 'aurora',
    name: 'Aurora',
    description: 'Luzes do norte',
    icon: <Sparkles className="w-5 h-5" />,
    gradient: 'from-green-900 via-blue-800 to-purple-700',
    accent: 'from-green-400 to-blue-400',
    features: ['Mágico', 'Colorido', 'Suave']
  }
]

export function ThemeSelector() {
  const { currentTheme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredTheme, setHoveredTheme] = useState<ThemeType | null>(null)

  const handleThemeChange = (theme: ThemeType) => {
    setTheme(theme)
    setIsOpen(false)
  }

  const currentThemeOption = themeOptions.find(t => t.id === currentTheme)

  return (
    <div className="relative">
      {/* Botão principal */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'relative group flex items-center gap-3 px-4 py-3 rounded-xl',
          'bg-gradient-to-r from-gray-800/50 to-gray-700/50',
          'backdrop-blur-md border border-gray-600/30',
          'hover:from-gray-700/60 hover:to-gray-600/60',
          'transition-all duration-300 ease-out',
          'shadow-lg hover:shadow-xl'
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Ícone do tema atual */}
        <div className="relative">
          <div className={cn(
            'w-8 h-8 rounded-lg bg-gradient-to-br',
            currentThemeOption?.gradient,
            'flex items-center justify-center text-white'
          )}>
            {currentThemeOption?.icon}
          </div>
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Texto */}
        <div className="text-left">
          <div className="text-sm font-medium text-white">
            {currentThemeOption?.name}
          </div>
          <div className="text-xs text-gray-300">
            {currentThemeOption?.description}
          </div>
        </div>

        {/* Seta */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-auto text-gray-400"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.button>

      {/* Dropdown de temas */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl p-2">
              <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
                {themeOptions.map((theme) => (
                  <motion.button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    onMouseEnter={() => setHoveredTheme(theme.id)}
                    onMouseLeave={() => setHoveredTheme(null)}
                    className={cn(
                      'relative group p-3 rounded-xl transition-all duration-300',
                      'hover:bg-gray-800/50 hover:scale-105',
                      currentTheme === theme.id && 'bg-gray-800/70 ring-2 ring-blue-500/50'
                    )}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      {/* Ícone do tema */}
                      <div className={cn(
                        'w-10 h-10 rounded-lg bg-gradient-to-br',
                        theme.gradient,
                        'flex items-center justify-center text-white',
                        'shadow-lg group-hover:shadow-xl transition-shadow duration-300'
                      )}>
                        {theme.icon}
                      </div>

                      {/* Informações do tema */}
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium text-white">
                          {theme.name}
                        </div>
                        <div className="text-xs text-gray-300 mb-2">
                          {theme.description}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {theme.features.map((feature, index) => (
                            <span
                              key={index}
                              className={cn(
                                'px-2 py-1 text-xs rounded-full',
                                'bg-gradient-to-r from-gray-700/50 to-gray-600/50',
                                'text-gray-300 border border-gray-600/30'
                              )}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Checkmark para tema atual */}
                      {currentTheme === theme.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </div>

                    {/* Preview do tema no hover */}
                    <AnimatePresence>
                      {hoveredTheme === theme.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute -right-2 -top-2 w-32 h-20 rounded-lg overflow-hidden shadow-2xl"
                        >
                          <div className={cn(
                            'w-full h-full bg-gradient-to-br',
                            theme.gradient
                          )}>
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="absolute bottom-2 left-2 text-white text-xs font-medium">
                              {theme.name}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
