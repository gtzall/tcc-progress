"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Palette, 
  Waves, 
  Cpu, 
  Rocket, 
  Trees, 
  Sun, 
  Mountain, 
  Sparkles,
  Check
} from 'lucide-react'
import { useEnhancedTheme } from './enhanced-theme-provider'

const themes = [
  {
    id: 'ocean' as const,
    name: 'Oceano',
    description: 'Mergulhe nas profundezas do mar',
    icon: Waves,
    colors: ['#001f3f', '#0074D9', '#39CCCC', '#2ECC40'],
    features: ['Peixes animados', 'Bolhas flutuantes', 'Navios naufragados', 'Corais coloridos']
  },
  {
    id: 'cyberpunk' as const,
    name: 'Cyberpunk',
    description: 'Futuro neon e tecnologia',
    icon: Cpu,
    colors: ['#FF0080', '#00FFFF', '#FFFF00', '#8000FF'],
    features: ['Carros voadores', 'Cidade futurista', 'Letreiros neon', 'Chuva digital']
  },
  {
    id: 'space' as const,
    name: 'Espaço',
    description: 'Explore o cosmos infinito',
    icon: Rocket,
    colors: ['#000011', '#4169E1', '#9370DB', '#FF69B4'],
    features: ['Planetas orbitando', 'Cometas brilhantes', 'Estrelas cintilantes', 'Nebulosas coloridas']
  },
  {
    id: 'forest' as const,
    name: 'Floresta',
    description: 'Natureza exuberante e vida',
    icon: Trees,
    colors: ['#228B22', '#32CD32', '#90EE90', '#98FB98'],
    features: ['Árvores balançando', 'Animais selvagens', 'Folhas caindo', 'Raios de sol'],
    comingSoon: true
  },
  {
    id: 'desert' as const,
    name: 'Deserto',
    description: 'Dunas douradas e miragens',
    icon: Sun,
    colors: ['#DAA520', '#F4A460', '#DEB887', '#D2691E'],
    features: ['Dunas moventes', 'Tempestades de areia', 'Oásis distantes', 'Caravanas'],
    comingSoon: true
  },
  {
    id: 'volcano' as const,
    name: 'Vulcão',
    description: 'Poder e energia da terra',
    icon: Mountain,
    colors: ['#DC143C', '#FF4500', '#FF6347', '#FF8C00'],
    features: ['Lava fluindo', 'Erupções épicas', 'Rochas incandescentes', 'Fumaça densa'],
    comingSoon: true
  },
  {
    id: 'aurora' as const,
    name: 'Aurora',
    description: 'Luzes mágicas do norte',
    icon: Sparkles,
    colors: ['#00FF7F', '#00CED1', '#9370DB', '#FF1493'],
    features: ['Luzes dançantes', 'Céu estrelado', 'Montanhas nevadas', 'Reflexos gelados'],
    comingSoon: true
  }
]

export function EnhancedThemeSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useEnhancedTheme()

  const currentTheme = themes.find(t => t.id === theme)

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        size="sm"
        className="text-gray-400 hover:text-white hover:bg-gray-700/50 relative"
      >
        <Palette className="w-4 h-4 mr-2" />
        <span className="hidden sm:block">{currentTheme?.name}</span>
        <span className="sm:hidden">Tema</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Theme Selector Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl mx-4"
            >
              <Card className="bg-gray-900/95 backdrop-blur-xl border-gray-700/50 shadow-2xl">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      🎨 Escolha seu Tema
                    </h2>
                    <p className="text-gray-400">
                      Personalize sua experiência com temas animados únicos
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {themes.map((themeOption) => {
                      const Icon = themeOption.icon
                      const isSelected = theme === themeOption.id
                      const isDisabled = themeOption.comingSoon

                      return (
                        <motion.div
                          key={themeOption.id}
                          whileHover={!isDisabled ? { scale: 1.02 } : {}}
                          whileTap={!isDisabled ? { scale: 0.98 } : {}}
                        >
                          <Card 
                            className={`relative cursor-pointer transition-all duration-200 ${
                              isSelected 
                                ? 'ring-2 ring-blue-500 bg-blue-500/10' 
                                : isDisabled
                                ? 'opacity-60 cursor-not-allowed bg-gray-800/50'
                                : 'hover:bg-gray-800/50 hover:border-gray-600'
                            }`}
                            onClick={() => {
                              if (!isDisabled) {
                                setTheme(themeOption.id)
                                setIsOpen(false)
                              }
                            }}
                          >
                            <CardContent className="p-4">
                              {/* Header */}
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <Icon className="w-5 h-5 text-white" />
                                  <h3 className="font-semibold text-white">
                                    {themeOption.name}
                                  </h3>
                                </div>
                                
                                {isSelected && (
                                  <Check className="w-5 h-5 text-blue-500" />
                                )}
                                
                                {themeOption.comingSoon && (
                                  <Badge variant="secondary" className="text-xs">
                                    Em breve
                                  </Badge>
                                )}
                              </div>

                              {/* Description */}
                              <p className="text-sm text-gray-400 mb-3">
                                {themeOption.description}
                              </p>

                              {/* Color Palette */}
                              <div className="flex gap-1 mb-3">
                                {themeOption.colors.map((color, index) => (
                                  <div
                                    key={index}
                                    className="w-6 h-6 rounded-full border border-gray-600"
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </div>

                              {/* Features */}
                              <div className="space-y-1">
                                {themeOption.features.map((feature, index) => (
                                  <div 
                                    key={index}
                                    className="text-xs text-gray-500 flex items-center gap-1"
                                  >
                                    <span className="w-1 h-1 bg-gray-500 rounded-full" />
                                    {feature}
                                  </div>
                                ))}
                              </div>

                              {/* Preview Animation */}
                              {!isDisabled && (
                                <div className="mt-3 h-8 bg-gradient-to-r rounded overflow-hidden relative"
                                  style={{
                                    background: `linear-gradient(90deg, ${themeOption.colors.join(', ')})`
                                  }}
                                >
                                  <motion.div
                                    className="absolute inset-0 bg-white/20"
                                    animate={{
                                      x: ['-100%', '100%']
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      ease: "linear"
                                    }}
                                  />
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Footer */}
                  <div className="mt-6 text-center">
                    <Button
                      onClick={() => setIsOpen(false)}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Fechar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

