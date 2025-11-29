'use client';

import { ThemeProvider } from '@/hooks/useTheme';
import { NotificationProvider } from '@/components/NotificationProvider';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </ThemeProvider>
  );
}
