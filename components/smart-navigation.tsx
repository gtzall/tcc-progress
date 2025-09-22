'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Menu, 
  X, 
  Search, 
  Bell, 
  User, 
  Settings,
  Sun,
  Moon,
  Palette,
  Home,
  Gamepad2,
  Book,
  Award,
  Swords,
  Trophy,
  BookOpen,
  BarChart3
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useTheme } from '@/contexts/theme-context'
import { useAchievements } from '@/contexts/achievements-context'
import { NAVIGATION_ITEMS, APP_CONFIG } from '@/lib/config'
import { cn, format } from '@/lib/utils'
import { EnhancedThemeSelector } from './enhanced-theme-selector'

export function SmartNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'achievement' as const,
      title: 'Primeira Conquista!',
      message: 'Você desbloqueou a conquista "Iniciante"',
      time: '2 min atrás',
      read: false
    },
    {
      id: 2,
      type: 'quiz' as const,
      title: 'Quiz Concluído',
      message: 'Você completou o quiz de Matemática com 80%',
      time: '1 hora atrás',
      read: false
    }
  ])

  const { currentTheme, setTheme, isDark, toggleTheme } = useTheme()
  const { gameStats } = useAchievements()

  const unreadNotifications = notifications.filter(n => !n.read).length

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementar busca
    console.log('Searching for:', searchQuery)
  }

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return 'Conquista'
      case 'quiz':
        return 'Quiz'
      default:
        return 'Info'
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'achievement':
        return 'text-yellow-400'
      case 'quiz':
        return 'text-blue-400'
      case 'level':
        return 'text-purple-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <nav className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center"
              >
                <span className="text-white font-bold text-lg">Q</span>
              </motion.div>
              <span className="text-xl font-bold text-white hidden sm:block">
                {APP_CONFIG.name}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item) => {
              const Icon = {
                Home,
                Gamepad2,
                Book,
                Award,
                Swords,
                User,
                Trophy,
                BookOpen,
                BarChart3,
                Settings
              }[item.icon as keyof typeof import('lucide-react')];

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.badge && (
                    <Badge className="bg-blue-500 text-white text-xs px-2 py-1 animate-pulse">
                      {item.badge}
                    </Badge>
                  )}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden lg:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Buscar quizzes, matérias..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </form>

            {/* Theme Toggle */}
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-700/50"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-700/50 relative"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Bell className="w-4 h-4" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center p-0">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-80 bg-gray-800/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-2xl z-50"
                  >
                    <div className="p-4 border-b border-gray-700/50">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">Notificações</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white"
                          onClick={() => setIsOpen(false)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={cn(
                              'p-4 border-b border-gray-700/50 transition-colors duration-200 cursor-pointer',
                              notification.read ? 'bg-gray-800/30' : 'bg-blue-500/10 hover:bg-blue-500/20'
                            )}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <div className="flex items-start space-x-3">
                              <span className="text-2xl">
                                {getNotificationIcon(notification.type)}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p className={cn(
                                    'text-sm font-medium',
                                    getNotificationColor(notification.type)
                                  )}>
                                    {notification.title}
                                  </p>
                                  <span className="text-xs text-gray-400">
                                    {notification.time}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-300 mt-1">
                                  {notification.message}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-gray-400">
                          <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>Nenhuma notificação</p>
                        </div>
                      )}
                    </div>

                    {notifications.length > 0 && (
                      <div className="p-4 border-t border-gray-700/50">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          Ver todas as notificações
                        </Button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-700/50"
              >
                <User className="w-4 h-4 mr-2" />
                <span className="hidden sm:block">Perfil</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-400 hover:text-white hover:bg-gray-700/50"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-700/50"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {NAVIGATION_ITEMS.map((item) => {
                  const Icon = {
                    Home,
                    Gamepad2,
                    Book,
                    Award,
                    Swords,
                    User,
                    Trophy,
                    BookOpen,
                    BarChart3,
                    Settings
                  }[item.icon as keyof typeof import("lucide-react")];

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors duration-200"
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                      <span>{item.label}</span>
                      {item.badge && (
                        <Badge className="ml-2 bg-blue-500 text-white text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Search */}
              <div className="px-2 py-3 border-t border-gray-700/50">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Buscar..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
                    />
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default SmartNavigation
