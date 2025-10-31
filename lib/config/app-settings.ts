// lib/config/app-settings.ts

/**
 * Interface para as configurações de Gamificação do sistema.
 * Define valores constantes para o cálculo de XP e limites.
 */
export interface GamificationSettings {
  XP_PER_CORRECT_ANSWER: number;
  XP_PER_BATTLE_WIN: number;
  XP_BONUS_STREAK_MULTIPLIER: number;
  MAX_LEVEL: number;
  LEVEL_UP_BASE_XP: number; // XP base para o primeiro nível
  LEVEL_UP_MULTIPLIER: number; // Multiplicador para a progressão de nível
}

/**
 * Interface para as configurações gerais da aplicação.
 */
export interface AppSettings {
  GAMIFICATION: GamificationSettings;
  APP_NAME: string;
  DEFAULT_THEME: 'light' | 'dark' | 'system';
  API_BASE_URL: string;
  // Adicionar outras configurações globais conforme necessário (e.g., limites de rate limit, chaves de terceiros simuladas)
}

/**
 * Configurações de Alto Nível para a aplicação QuizMaster.
 * Utiliza o padrão Single Source of Truth (SSOT) para todas as constantes de negócio.
 */
export const appSettings: AppSettings = {
  APP_NAME: "QuizMaster Pro",
  DEFAULT_THEME: 'system',
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',

  GAMIFICATION: {
    XP_PER_CORRECT_ANSWER: 10,
    XP_PER_BATTLE_WIN: 100,
    XP_BONUS_STREAK_MULTIPLIER: 1.5,
    MAX_LEVEL: 50,
    LEVEL_UP_BASE_XP: 500,
    LEVEL_UP_MULTIPLIER: 1.2, // Cada nível requer 20% mais XP que o anterior
  },
};

// Função utilitária para calcular o XP necessário para um determinado nível
export const getRequiredXpForLevel = (level: number): number => {
  if (level <= 1) return 0; // Nível 1 não requer XP
  const { LEVEL_UP_BASE_XP, LEVEL_UP_MULTIPLIER } = appSettings.GAMIFICATION;
  // Fórmula de progressão exponencial: Base * (Multiplicador ^ (Nível - 2))
  // O nível 2 requer LEVEL_UP_BASE_XP
  return Math.round(LEVEL_UP_BASE_XP * Math.pow(LEVEL_UP_MULTIPLIER, level - 2));
};
