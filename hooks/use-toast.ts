// hooks/use-toast.ts

import { useState, useCallback } from 'react';

type ToastVariant = 'default' | 'destructive';

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface Toast {
  id: string;
  variant?: ToastVariant;
  title?: string;
  description?: string;
  action?: React.ReactNode; // Allowing React nodes for flexibility
  duration?: number;
}

const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 9);
};

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(
    ({
      variant = 'default',
      title,
      description,
      action,
      duration = 3000, // Default duration of 3 seconds
    }: Omit<Toast, 'id'>) => {
      const id = generateUniqueId();
      const newToast: Toast = { id, variant, title, description, action, duration };
      setToasts((prevToasts) => [...prevToasts, newToast]);

      // Automatically remove the toast after the specified duration
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
      }, duration);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  }, []);

  return {
    toasts,
    toast,
    dismissToast,
  };
}