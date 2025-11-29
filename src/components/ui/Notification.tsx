'use client';

import { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { NotificationProps } from '@/types';
import { cn } from '@/utils/cn';

export default function Notification({ message, type, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
  };

  const Icon = icons[type];

  const typeClasses = {
    success: 'bg-green-500 border-green-400',
    error: 'bg-red-500 border-red-400',
    info: 'bg-blue-500 border-blue-400',
  };

  return (
    <div
      className={cn(
        'notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm text-white border-l-4 transform transition-all duration-300',
        typeClasses[type]
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start space-x-3">
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-white hover:text-gray-200 transition-colors duration-200"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
