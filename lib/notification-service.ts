// lib/notification-service.ts

/**
 * Tipos de Notificação para categorização e roteamento.
 * Padrão empresarial para desacoplamento e extensibilidade.
 */
export enum NotificationType {
  LEVEL_UP = 'LEVEL_UP',
  BATTLE_ALERT = 'BATTLE_ALERT',
  RETENTION_REMINDER = 'RETENTION_REMINDER',
  ACHIEVEMENT_UNLOCKED = 'ACHIEVEMENT_UNLOCKED',
  SYSTEM_MESSAGE = 'SYSTEM_MESSAGE',
}

/**
 * Interface para uma Notificação.
 * Garante a tipagem estrita para o serviço.
 */
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  message: string;
  timestamp: Date;
  isRead: boolean;
  data?: Record<string, any>; // Dados adicionais para contexto (e.g., level number, battle ID)
}

/**
 * Serviço de Notificação (Service-Oriented Architecture - SOA).
 * Responsável por criar, armazenar e distribuir notificações.
 */
export class NotificationService {
  // Simulação de um repositório de notificações em memória para fins de demonstração
  private notifications: Notification[] = [];
  private nextId = 1;

  /**
   * Envia uma nova notificação para um usuário.
   * @param userId ID do usuário alvo.
   * @param type Tipo da notificação.
   * @param message Mensagem principal.
   * @param data Dados adicionais.
   * @returns A notificação criada.
   */
  public async sendNotification(
    userId: string,
    type: NotificationType,
    message: string,
    data?: Record<string, any>
  ): Promise<Notification> {
    const newNotification: Notification = {
      id: (this.nextId++).toString(),
      userId,
      type,
      message,
      timestamp: new Date(),
      isRead: false,
      data,
    };

    // 1. Armazenar a notificação (Simulação de persistência em DB)
    this.notifications.push(newNotification);

    // 2. Roteamento e Distribuição (Lógica de Alto Nível)
    this.routeNotification(newNotification);

    return newNotification;
  }

  /**
   * Lógica de roteamento para diferentes canais (in-app, e-mail, push).
   * Padrão Strategy/Observer implícito.
   * @param notification A notificação a ser roteada.
   */
  private routeNotification(notification: Notification): void {
    console.log(`[NotificationService] Roteando notificação ${notification.id} (${notification.type}) para o usuário ${notification.userId}`);

    // Lógica de Alto Nível:
    switch (notification.type) {
      case NotificationType.LEVEL_UP:
      case NotificationType.ACHIEVEMENT_UNLOCKED:
        // Notificações de Gamificação: In-app e Push (para engajamento imediato)
        this.sendInApp(notification);
        // this.sendPush(notification); // Simulação
        break;
      case NotificationType.BATTLE_ALERT:
        // Alertas de Tempo Real: In-app e Push (prioridade alta)
        this.sendInApp(notification);
        // this.sendPush(notification); // Simulação
        break;
      case NotificationType.RETENTION_REMINDER:
        // Marketing/CRM: E-mail e Push (para reengajamento)
        // this.sendEmail(notification); // Simulação
        // this.sendPush(notification); // Simulação
        break;
      case NotificationType.SYSTEM_MESSAGE:
        // Mensagens de Sistema: Apenas In-app (para informações críticas)
        this.sendInApp(notification);
        break;
      default:
        console.warn(`Tipo de notificação desconhecido: ${notification.type}`);
    }
  }

  /**
   * Simulação de envio de notificação In-App.
   */
  private sendInApp(notification: Notification): void {
    // Em um ambiente real, isso acionaria um WebSocket ou um evento de atualização de estado no frontend.
    console.log(`[In-App] Notificação enviada para ${notification.userId}: ${notification.message}`);
  }

  /**
   * Busca todas as notificações não lidas para um usuário.
   * @param userId ID do usuário.
   * @returns Lista de notificações não lidas.
   */
  public async getUnreadNotifications(userId: string): Promise<Notification[]> {
    return this.notifications.filter(n => n.userId === userId && !n.isRead);
  }

  /**
   * Marca uma notificação como lida.
   * @param notificationId ID da notificação.
   * @param userId ID do usuário (para segurança).
   * @returns true se a notificação foi marcada como lida.
   */
  public async markAsRead(notificationId: string, userId: string): Promise<boolean> {
    const notification = this.notifications.find(n => n.id === notificationId && n.userId === userId);
    if (notification) {
      notification.isRead = true;
      return true;
    }
    return false;
  }
}

// Exportar uma instância singleton do serviço
export const notificationService = new NotificationService();
