"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { ThemeType, THEME_COLORS, APP_CONFIG } from "@/lib/config"
import { storage } from "@/lib/utils"

interface ThemeContextType {
  currentTheme: ThemeType
  setTheme: (theme: ThemeType) => void
  themeData: {
    background: string
    primaryColor: string
    secondaryColor: string
    accentColor: string
    textColor: string
  }
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(APP_CONFIG.themes.default)

  // Load theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = storage.get<ThemeType>(APP_CONFIG.storage.keys.theme)
      if (savedTheme && APP_CONFIG.themes.available.includes(savedTheme)) {
        setCurrentTheme(savedTheme)
      }
    }
  }, [])

  // Save theme to localStorage and update document when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Save to localStorage
      storage.set(APP_CONFIG.storage.keys.theme, currentTheme)
      
      // Update document body classes
      const themeConfig = THEME_COLORS[currentTheme]
      document.body.className = themeConfig.background
      
      // Update CSS custom properties for theme colors
      const root = document.documentElement
      root.style.setProperty("--theme-primary", getComputedStyle(root).getPropertyValue("--cyan-400") || "#22d3ee")
      root.style.setProperty("--theme-secondary", getComputedStyle(root).getPropertyValue("--pink-400") || "#f472b6")
      root.style.setProperty("--theme-accent", getComputedStyle(root).getPropertyValue("--yellow-400") || "#facc15")
      
      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', getThemeColor(currentTheme))
      }
    }
  }, [currentTheme])

  const setTheme = (theme: ThemeType) => {
    if (APP_CONFIG.themes.available.includes(theme)) {
      setCurrentTheme(theme)
    }
  }

  const toggleTheme = () => {
    const currentIndex = APP_CONFIG.themes.available.indexOf(currentTheme)
    const nextIndex = (currentIndex + 1) % APP_CONFIG.themes.available.length
    setTheme(APP_CONFIG.themes.available[nextIndex])
  }

  const isDark = ['cyberpunk', 'space', 'ocean'].includes(currentTheme)

  const themeData = {
    background: THEME_COLORS[currentTheme].background,
    primaryColor: THEME_COLORS[currentTheme].primary,
    secondaryColor: THEME_COLORS[currentTheme].secondary,
    accentColor: THEME_COLORS[currentTheme].accent,
    textColor: THEME_COLORS[currentTheme].text
  }

  return (
    <ThemeContext.Provider value={{ 
      currentTheme, 
      setTheme, 
      themeData, 
      isDark, 
      toggleTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

// Helper function to get theme color for meta tag
function getThemeColor(theme: ThemeType): string {
  const themeColors: Record<ThemeType, string> = {
    cyberpunk: "#0f172a",
    space: "#000000",
    ocean: "#0c4a6e",
    forest: "#064e3b",
    desert: "#92400e",
    volcano: "#7f1d1d",
    aurora: "#064e3b"
  }
  return themeColors[theme] || "#0f172a"
}
