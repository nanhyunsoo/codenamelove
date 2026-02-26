"use client";

import { useEffect } from "react";

type ToastType = "success" | "error" | "warning" | "loading";

interface ToastProps {
  message: string;
  type?: ToastType;
  onDismiss?: () => void;
  duration?: number;
}

const typeStyles: Record<ToastType, string> = {
  success: "border-green-500/50 text-green-200",
  error: "border-red-500/50 text-red-200",
  warning: "border-amber-500/50 text-amber-200",
  loading: "border-body-secondary/50 text-body",
};

export default function Toast({
  message,
  type = "success",
  onDismiss,
  duration = 4000,
}: ToastProps) {
  useEffect(() => {
    if (type !== "loading" && onDismiss && duration > 0) {
      const t = setTimeout(onDismiss, duration);
      return () => clearTimeout(t);
    }
  }, [type, onDismiss, duration]);

  return (
    <div
      role="alert"
      className={`
        fixed bottom-6 right-6 z-[100] px-5 py-3 rounded-card
        bg-dark-base border shadow-elevation-2
        ${typeStyles[type]}
      `}
    >
      <p className="font-medium">{message}</p>
    </div>
  );
}
