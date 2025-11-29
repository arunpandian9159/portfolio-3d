'use client';

import { createContext, useContext } from 'react';
import { useNotification } from '@/hooks/useNotification';
import Notification from '@/components/ui/Notification';

interface NotificationContextType {
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => string;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { notifications, showNotification, removeNotification, clearAllNotifications } = useNotification();

  return (
    <NotificationContext.Provider value={{ showNotification, removeNotification, clearAllNotifications }}>
      {children}
      
      {/* Render notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
}
