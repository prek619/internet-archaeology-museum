"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { X } from "lucide-react";

type ToastType = "success" | "error";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({
  toast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={[
              "flex items-start gap-3 p-4 border-4 border-black shadow-neo-md pointer-events-auto",
              t.type === "error" ? "bg-neo-accent" : "bg-neo-secondary",
            ].join(" ")}
          >
            <p className="flex-1 font-bold text-sm text-black uppercase tracking-wide">
              {t.message}
            </p>
            <button
              onClick={() => dismiss(t.id)}
              className="shrink-0 p-0.5 hover:opacity-60 transition-opacity"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4 stroke-[3px]" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
