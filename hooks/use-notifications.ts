// hooks/use-notifications.ts

import { useState, useEffect, useCallback } from 'react';
import { Notification, NotificationService, notificationService } from '../lib/notification-service'; // Importa a tipagem e o serviço
import { useToast } from './use-toast'; // Assumindo que este hook já existe para exibir toasts

/**
 * Hook de alto nível para gerenciar o estado e as interações com o sistema de notificações.
 * Simula a conexão com um serviço em tempo real (WebSockets) e gerencia o estado local.
 * Padrão de Reatividade Empresarial.
 * @param userId O ID do usuário logado.
 */
export const useNotifications = (userId: string) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  /**
   * Função para buscar notificações não lidas no servidor (simulado).
   */
  const fetchNotifications = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    setError(null);
    try {
      // Em um ambiente real, esta seria uma chamada de API (e.g., GET /api/notifications/unread)
      const unread = await notificationService.getUnreadNotifications(userId);
      setNotifications(unread.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())); // Ordena por mais recente
    } catch (err) {
      console.error("Erro ao buscar notificações:", err);
      setError("Não foi possível carregar as notificações.");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  /**
   * Função para marcar uma notificação como lida.
   * @param notificationId O ID da notificação a ser marcada.
   */
  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      // Em um ambiente real, esta seria uma chamada de API (e.g., PATCH /api/notifications/:id/read)
      const success = await notificationService.markAsRead(notificationId, userId);
      if (success) {
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
      } else {
        toast({ title: "Erro", description: "Não foi possível marcar a notificação como lida.", variant: "destructive" });
      }
    } catch (err) {
      console.error("Erro ao marcar como lida:", err);
      toast({ title: "Erro", description: "Ocorreu um erro ao interagir com a notificação.", variant: "destructive" });
    }
  }, [userId, toast]);

  /**
   * Simulação de conexão com WebSockets para receber novas notificações em tempo real.
   */
  useEffect(() => {
    fetchNotifications();

    // Simulação de um listener de WebSocket
    const handleNewNotification = (newNotification: Notification) => {
        if (newNotification.userId === userId) {
            setNotifications(prev => [newNotification, ...prev].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
            toast({
                title: `Nova Notificação: ${newNotification.type}`,
                description: newNotification.message,
                duration: 5000,
            });
        }
    };

    // Em um ambiente real, você faria:
    // const ws = new WebSocket(`ws://seuservidor.com/ws/${userId}`);
    // ws.onmessage = (event) => handleNewNotification(JSON.parse(event.data));
    // return () => ws.close();

    // Simulação de uma notificação de teste a cada 30 segundos
    const interval = setInterval(() => {
        if (userId) {
            notificationService.sendNotification(
                userId,
                NotificationType.SYSTEM_MESSAGE,
                `Lembrete de Estudo: Não se esqueça de praticar hoje! (${new Date().toLocaleTimeString()})`
            ).then(handleNewNotification);
        }
    }, 30000);

    return () => clearInterval(interval);

  }, [userId, fetchNotifications, toast]);

  return {
    notifications,
    isLoading,
    error,
    markAsRead,
    refetch: fetchNotifications,
    unreadCount: notifications.length,
  };
};

// Nota: O tipo NotificationType precisa ser exportado do notification-service.ts
// Já foi feito no passo anterior.
