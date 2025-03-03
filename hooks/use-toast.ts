import { useState, useCallback, useEffect } from 'react';

type ToastVariant = 'default' | 'destructive';

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
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    const timeouts: Record<string, ReturnType<typeof setTimeout>> = {};

    toasts.forEach((toast) => {
      if (toast.duration && !timeouts[toast.id]) {
        timeouts[toast.id] = setTimeout(() => {
          dismissToast(toast.id);
          delete timeouts[toast.id];
        }, toast.duration);
      }
    });

    return () => {
      Object.values(timeouts).forEach(clearTimeout);
    };
  }, [toasts, dismissToast]);

  return {
    toasts,
    toast,
    dismissToast,
  };
}