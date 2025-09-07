"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { AnimatedOceanBackground } from './animated-ocean-background'
import { AnimatedCyberpunkBackground } from './animated-cyberpunk-background'
import { AnimatedSpaceBackground } from './animated-space-background'

type Theme = 'ocean' | 'cyberpunk' | 'space' | 'forest' | 'desert' | 'volcano' | 'aurora'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  isDark: boolean
  toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_STORAGE_KEY = 'quizmaster_theme'
const DARK_MODE_STORAGE_KEY = 'quizmaster_dark_mode'

export function EnhancedThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('ocean')
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Carregar tema salvo
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme
    const savedDarkMode = localStorage.getItem(DARK_MODE_STORAGE_KEY)
    
    if (savedTheme) {
      setThemeState(savedTheme)
    }
    
    if (savedDarkMode !== null) {
      setIsDark(savedDarkMode === 'true')
    }
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem(THEME_STORAGE_KEY, newTheme)
    
    // Aplicar classes CSS do tema
    document.documentElement.className = `theme-${newTheme} ${isDark ? 'dark' : 'light'}`
  }

  const toggleDarkMode = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    localStorage.setItem(DARK_MODE_STORAGE_KEY, newDarkMode.toString())
    
    // Aplicar classes CSS
    document.documentElement.className = `theme-${theme} ${newDarkMode ? 'dark' : 'light'}`
  }

  useEffect(() => {
    // Aplicar classes CSS iniciais
    document.documentElement.className = `theme-${theme} ${isDark ? 'dark' : 'light'}`
  }, [theme, isDark])

  const renderBackground = () => {
    switch (theme) {
      case 'ocean':
        return <AnimatedOceanBackground />
      case 'cyberpunk':
        return <AnimatedCyberpunkBackground />
      case 'space':
        return <AnimatedSpaceBackground />
      default:
        return <AnimatedOceanBackground />
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, toggleDarkMode }}>
      {renderBackground()}
      <div className={`relative z-10 min-h-screen ${getThemeClasses(theme, isDark)}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useEnhancedTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useEnhancedTheme must be used within an EnhancedThemeProvider')
  }
  return context
}

function getThemeClasses(theme: Theme, isDark: boolean): string {
  const baseClasses = isDark ? 'text-white' : 'text-gray-900'
  
  switch (theme) {
    case 'ocean':
      return `${baseClasses} ocean-theme`
    case 'cyberpunk':
      return `${baseClasses} cyberpunk-theme`
    case 'space':
      return `${baseClasses} space-theme`
    case 'forest':
      return `${baseClasses} forest-theme`
    case 'desert':
      return `${baseClasses} desert-theme`
    case 'volcano':
      return `${baseClasses} volcano-theme`
    case 'aurora':
      return `${baseClasses} aurora-theme`
    default:
      return baseClasses
  }
}

