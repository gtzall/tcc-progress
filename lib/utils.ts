import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { APP_CONFIG } from "./config"

// Função principal para combinar classes CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Funções de formatação
export const format = {
  // Formatação de números
  number: {
    compact: (num: number): string => {
      if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
      if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
      return num.toString()
    },
    
    percentage: (num: number, decimals: number = 1): string => {
      return `${(num * 100).toFixed(decimals)}%`
    },
    
    currency: (amount: number, currency: string = 'BRL'): string => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency
      }).format(amount)
    },
    
    ordinal: (num: number): string => {
      const suffixes = ['º', 'º', 'º', 'º', 'º', 'º', 'º', 'º', 'º', 'º']
      const lastDigit = num % 10
      return `${num}${suffixes[lastDigit]}`
    }
  },
  
  // Formatação de datas
  date: {
    relative: (date: Date | string): string => {
      const now = new Date()
      const target = new Date(date)
      const diff = now.getTime() - target.getTime()
      const seconds = Math.floor(diff / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)
      
      if (days > 0) return `${days} dia${days > 1 ? 's' : ''} atrás`
      if (hours > 0) return `${hours} hora${hours > 1 ? 's' : ''} atrás`
      if (minutes > 0) return `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`
      return 'Agora mesmo'
    },
    
    short: (date: Date | string): string => {
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(new Date(date))
    },
    
    long: (date: Date | string): string => {
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(date))
    },
    
    time: (date: Date | string): string => {
      return new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(date))
    }
  },
  
  // Formatação de tempo
  time: {
    seconds: (seconds: number): string => {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins}:${secs.toString().padStart(2, '0')}`
    },
    
    duration: (seconds: number): string => {
      const hours = Math.floor(seconds / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      const secs = seconds % 60
      
      if (hours > 0) {
        return `${hours}h ${minutes}m ${secs}s`
      } else if (minutes > 0) {
        return `${minutes}m ${secs}s`
      } else {
        return `${secs}s`
      }
    },
    
    human: (seconds: number): string => {
      if (seconds < 60) return `${seconds} segundos`
      if (seconds < 3600) return `${Math.floor(seconds / 60)} minutos`
      if (seconds < 86400) return `${Math.floor(seconds / 3600)} horas`
      return `${Math.floor(seconds / 86400)} dias`
    }
  },
  
  // Formatação de texto
  text: {
    truncate: (text: string, length: number): string => {
      if (text.length <= length) return text
      return text.slice(0, length) + '...'
    },
    
    capitalize: (text: string): string => {
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    },
    

    
    initials: (name: string): string => {
      return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
  }
}

// Funções de validação
export const validate = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },
  
  password: (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (password.length < 8) {
      errors.push('A senha deve ter pelo menos 8 caracteres')
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('A senha deve conter pelo menos uma letra maiúscula')
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('A senha deve conter pelo menos uma letra minúscula')
    }
    
    if (!/\d/.test(password)) {
      errors.push('A senha deve conter pelo menos um número')
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('A senha deve conter pelo menos um caractere especial')
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  },
  
  cpf: (cpf: string): boolean => {
    const cleanCpf = cpf.replace(/\D/g, '')
    if (cleanCpf.length !== 11) return false
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleanCpf)) return false
    
    // Validação do primeiro dígito verificador
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCpf.charAt(i)) * (10 - i)
    }
    let remainder = 11 - (sum % 11)
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cleanCpf.charAt(9))) return false
    
    // Validação do segundo dígito verificador
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCpf.charAt(i)) * (11 - i)
    }
    remainder = 11 - (sum % 11)
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cleanCpf.charAt(10))) return false
    
    return true
  },
  
  phone: (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, '')
    return cleanPhone.length >= 10 && cleanPhone.length <= 11
  }
}

// Funções de array
export const array = {
  shuffle: <T>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  },
  
  chunk: <T>(array: T[], size: number): T[][] => {
    const chunks: T[][] = []
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size))
    }
    return chunks
  },
  
  unique: <T>(array: T[]): T[] => {
    return [...new Set(array)]
  },
  
  groupBy: <T, K extends string | number>(
    array: T[],
    key: (item: T) => K
  ): Record<K, T[]> => {
    return array.reduce((groups, item) => {
      const groupKey = key(item)
      if (!groups[groupKey]) {
        groups[groupKey] = []
      }
      groups[groupKey].push(item)
      return groups
    }, {} as Record<K, T[]>)
  },
  
  sortBy: <T>(
    array: T[],
    key: keyof T | ((item: T) => any),
    order: 'asc' | 'desc' = 'asc'
  ): T[] => {
    const sorted = [...array].sort((a, b) => {
      const aValue = typeof key === 'function' ? key(a) : a[key]
      const bValue = typeof key === 'function' ? key(b) : b[key]
      
      if (aValue < bValue) return order === 'asc' ? -1 : 1
      if (aValue > bValue) return order === 'asc' ? 1 : -1
      return 0
    })
    
    return sorted
  }
}

// Funções de objeto
export const object = {
  pick: <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
    const result = {} as Pick<T, K>
    keys.forEach(key => {
      if (key in obj) {
        result[key] = obj[key]
      }
    })
    return result
  },
  
  omit: <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
    const result = { ...obj }
    keys.forEach(key => {
      delete result[key]
    })
    return result
  },
  
  deepClone: <T>(obj: T): T => {
    if (obj === null || typeof obj !== 'object') return obj
    if (obj instanceof Date) return new Date(obj.getTime()) as T
    if (obj instanceof Array) return obj.map(item => object.deepClone(item)) as T
    if (typeof obj === 'object') {
      const cloned = {} as T
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          cloned[key] = object.deepClone(obj[key])
        }
      }
      return cloned
    }
    return obj
  },
  
  isEmpty: (obj: any): boolean => {
    if (obj == null) return true
    if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0
    if (obj instanceof Map || obj instanceof Set) return obj.size === 0
    if (typeof obj === 'object') return Object.keys(obj).length === 0
    return false
  }
}

// Funções de string
export const string = {
  random: (length: number = 8): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  },
  

  
  camelCase: (text: string): string => {
    return text
      .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
      .replace(/^(.)/, c => c.toLowerCase())
  },
  
  pascalCase: (text: string): string => {
    return text
      .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
      .replace(/^(.)/, c => c.toUpperCase())
  }
}

// Funções de matemática
export const math = {
  clamp: (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max)
  },
  
  lerp: (start: number, end: number, t: number): number => {
    return start + (end - start) * t
  },
  
  map: (value: number, inMin: number, inMax: number, outMin: number, outMax: number): number => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
  },
  
  round: (value: number, decimals: number = 0): number => {
    const factor = Math.pow(10, decimals)
    return Math.round(value * factor) / factor
  },
  
  random: {
    int: (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    
    float: (min: number, max: number): number => {
      return Math.random() * (max - min) + min
    },
    
    choice: <T>(array: T[]): T => {
      return array[Math.floor(Math.random() * array.length)]
    },
    
    weighted: <T>(items: Array<{ item: T; weight: number }>): T => {
      const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)
      let random = Math.random() * totalWeight
      
      for (const { item, weight } of items) {
        random -= weight
        if (random <= 0) return item
      }
      
      return items[items.length - 1].item
    }
  }
}

// Funções de localStorage
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue || null
    } catch {
      return defaultValue || null
    }
  },
  
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error)
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Erro ao remover do localStorage:', error)
    }
  },
  
  clear: (): void => {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Erro ao limpar localStorage:', error)
    }
  },
  
  has: (key: string): boolean => {
    return localStorage.getItem(key) !== null
  }
}

// Funções de debounce e throttle
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Funções de URL
export const url = {
  params: (params: Record<string, any>): string => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value))
      }
    })
    return searchParams.toString()
  },
  
  parseParams: (queryString: string): Record<string, string> => {
    const params: Record<string, string> = {}
    const searchParams = new URLSearchParams(queryString)
    searchParams.forEach((value, key) => {
      params[key] = value
    })
    return params
  }
}

// Funções de performance
export const performanceUtils = {
  measure: <T>(name: string, fn: () => T): T => {
    const start = globalThis.performance.now()
    const result = fn()
    const end = globalThis.performance.now()
    console.log(`${name} levou ${(end - start).toFixed(2)}ms`)
    return result
  },
  
  measureAsync: async <T>(name: string, fn: () => Promise<T>): Promise<T> => {
    const start = globalThis.performance.now()
    const result = await fn()
    const end = globalThis.performance.now()
    console.log(`${name} levou ${(end - start).toFixed(2)}ms`)
    return result
  }
}

// Funções de acessibilidade
export const accessibility = {
  focusFirst: (container: HTMLElement): void => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusableElements.length > 0) {
      ;(focusableElements[0] as HTMLElement).focus()
    }
  },
  
  trapFocus: (container: HTMLElement): (() => void) => {
    const focusableElements = Array.from(
      container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[]
    
    if (focusableElements.length === 0) return () => {}
    
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }
    
    container.addEventListener('keydown', handleTabKey)
    
    return () => {
      container.removeEventListener('keydown', handleTabKey)
    }
  }
}

// Funções de erro
export const error = {
  create: (message: string, code?: string, statusCode?: number): Error => {
    const error = new Error(message) as any
    error.code = code || 'UNKNOWN_ERROR'
    error.statusCode = statusCode || 500
    error.timestamp = new Date().toISOString()
    return error
  },
  
  isAppError: (error: any): error is Error & { code?: string; statusCode?: number } => {
    return error instanceof Error && (error as any).code !== undefined
  },
  
  handle: (error: unknown, context?: string): void => {
    console.error(`Erro${context ? ` em ${context}` : ''}:`, error)
    
    // Aqui você pode adicionar lógica para enviar erros para um serviço de monitoramento
    // como Sentry, LogRocket, etc.
  }
}

// Funções de cache
export const cache = {
  memory: new Map<string, { data: any; expiresAt: number }>(),
  
  set: <T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void => {
    const expiresAt = Date.now() + ttl
    cache.memory.set(key, { data, expiresAt })
  },
  
  get: <T>(key: string): T | null => {
    const item = cache.memory.get(key)
    if (!item) return null
    
    if (Date.now() > item.expiresAt) {
      cache.memory.delete(key)
      return null
    }
    
    return item.data
  },
  
  delete: (key: string): boolean => {
    return cache.memory.delete(key)
  },
  
  clear: (): void => {
    cache.memory.clear()
  },
  
  has: (key: string): boolean => {
    const item = cache.memory.get(key)
    if (!item) return false
    
    if (Date.now() > item.expiresAt) {
      cache.memory.delete(key)
      return false
    }
    
    return true
  }
}

// Funções de teste
export const test = {
  mock: <T>(data: T): T => {
    if (process.env.NODE_ENV === 'test') {
      return data
    }
    throw new Error('Função mock só pode ser usada em ambiente de teste')
  },
  
  delay: (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

// Exporta todas as funções utilitárias
export default {
  cn,
  format,
  validate,
  array,
  object,
  string,
  math,
  storage,
  debounce,
  throttle
}

