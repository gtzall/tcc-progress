// lib/analytics-engine.ts

import { Question, UserPerformanceData } from './types'; // Assumindo que 'types' existe e define as interfaces

/**
 * Interface para os resultados da análise de desempenho do usuário.
 * Estrutura de dados de alto nível para o módulo de BI (Business Intelligence) interno.
 */
export interface PerformanceAnalysis {
  knowledgeGaps: string[]; // Tópicos com baixo desempenho
  proficiencyScore: number; // Score geral de proficiência (0-100)
  studyRecommendations: string[]; // Sugestões de módulos de estudo
  timeManagementScore: number; // Score baseado na velocidade de resposta
}

/**
 * Motor de Análise Preditiva e Feedback Personalizado (Analytics Engine).
 * Implementa a lógica de Business Intelligence para transformar dados brutos em insights acionáveis.
 */
export class AnalyticsEngine {
  private performanceData: UserPerformanceData[];

  constructor(data: UserPerformanceData[]) {
    this.performanceData = data;
  }

  /**
   * Executa a análise completa de desempenho.
   * @returns {PerformanceAnalysis} O resultado estruturado da análise.
   */
  public analyze(): PerformanceAnalysis {
    if (this.performanceData.length === 0) {
      return this.emptyAnalysis();
    }

    const topicStats = this.calculateTopicStats();
    const knowledgeGaps = this.identifyKnowledgeGaps(topicStats);
    const proficiencyScore = this.calculateProficiencyScore(topicStats);
    const studyRecommendations = this.generateStudyRecommendations(knowledgeGaps);
    const timeManagementScore = this.calculateTimeManagementScore();

    return {
      knowledgeGaps,
      proficiencyScore,
      studyRecommendations,
      timeManagementScore,
    };
  }

  /**
   * Calcula estatísticas de acerto e erro por tópico/matéria.
   * @returns {Map<string, { total: number, correct: number }>} Mapa de estatísticas.
   */
  private calculateTopicStats(): Map<string, { total: number, correct: number }> {
    const stats = new Map<string, { total: number, correct: number }>();

    this.performanceData.forEach(data => {
      const topic = data.topic || 'Geral'; // Assumindo que a performance data tem um campo 'topic'
      const currentStats = stats.get(topic) || { total: 0, correct: 0 };

      currentStats.total += 1;
      if (data.isCorrect) {
        currentStats.correct += 1;
      }
      stats.set(topic, currentStats);
    });

    return stats;
  }

  /**
   * Identifica lacunas de conhecimento (tópicos com taxa de acerto abaixo de 60%).
   * @param topicStats Estatísticas calculadas por tópico.
   * @returns {string[]} Lista de tópicos que são lacunas de conhecimento.
   */
  private identifyKnowledgeGaps(topicStats: Map<string, { total: number, correct: number }>): string[] {
    const GAPS_THRESHOLD = 0.6; // 60%

    return Array.from(topicStats.entries())
      .filter(([topic, stats]) => {
        const accuracy = stats.correct / stats.total;
        return stats.total > 5 && accuracy < GAPS_THRESHOLD; // Considera apenas tópicos com mais de 5 questões
      })
      .map(([topic]) => topic);
  }

  /**
   * Calcula um score geral de proficiência.
   * @param topicStats Estatísticas calculadas por tópico.
   * @returns {number} Score de 0 a 100.
   */
  private calculateProficiencyScore(topicStats: Map<string, { total: number, correct: number }>): number {
    const totalQuestions = Array.from(topicStats.values()).reduce((sum, stats) => sum + stats.total, 0);
    const totalCorrect = Array.from(topicStats.values()).reduce((sum, stats) => sum + stats.correct, 0);

    if (totalQuestions === 0) return 0;

    const accuracy = totalCorrect / totalQuestions;
    return Math.round(accuracy * 100);
  }

  /**
   * Gera recomendações de estudo baseadas nas lacunas.
   * @param knowledgeGaps Lista de tópicos com lacunas.
   * @returns {string[]} Lista de recomendações.
   */
  private generateStudyRecommendations(knowledgeGaps: string[]): string[] {
    if (knowledgeGaps.length === 0) {
      return ["Seu desempenho está excelente! Continue revisando os tópicos mais recentes."];
    }

    return knowledgeGaps.map(gap => `Recomendamos revisar o módulo de "${gap}" no Modo Estudos.`);
  }

  /**
   * Calcula um score de gerenciamento de tempo (simulação de métrica).
   * @returns {number} Score de 0 a 100.
   */
  private calculateTimeManagementScore(): number {
    // Lógica de alto nível: Média do tempo de resposta vs. tempo ideal (simulado)
    const totalTime = this.performanceData.reduce((sum, data) => sum + (data.timeSpent || 0), 0);
    const averageTimePerQuestion = totalTime / this.performanceData.length;

    // Simulação: Tempo ideal é 30 segundos por questão
    const IDEAL_TIME = 30;

    // Quanto menor o tempo médio, maior o score (com limite superior)
    const score = Math.max(0, 100 - (averageTimePerQuestion - IDEAL_TIME) * 2);

    return Math.min(100, Math.round(score));
  }

  /**
   * Retorna uma análise vazia para usuários sem dados.
   * @returns {PerformanceAnalysis} Análise vazia.
   */
  private emptyAnalysis(): PerformanceAnalysis {
    return {
      knowledgeGaps: ["Nenhum dado de desempenho encontrado. Comece a jogar para receber feedback personalizado!"],
      proficiencyScore: 0,
      studyRecommendations: ["Acesse o Modo Estudos para iniciar sua jornada de aprendizado."],
      timeManagementScore: 0,
    };
  }
}

// Nota: A interface UserPerformanceData e Question precisam ser definidas em './types'
// Para fins de demonstração, vamos simular a inclusão de UserPerformanceData no types.ts
// (Será feito no próximo passo de refatoração, se necessário)
