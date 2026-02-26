"use client";

interface StatePlaceholderProps {
  variant: "empty" | "loading" | "error";
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function StatePlaceholder({
  variant,
  title,
  message,
  onRetry,
}: StatePlaceholderProps) {
  const config = {
    empty: {
      title: title ?? "데이터가 없습니다",
      message: message ?? "아직 표시할 내용이 없어요.",
      icon: "📭",
    },
    loading: {
      title: title ?? "로딩 중",
      message: message ?? "잠시만 기다려주세요.",
      icon: "⏳",
    },
    error: {
      title: title ?? "오류가 발생했습니다",
      message: message ?? "다시 시도해주세요.",
      icon: "⚠️",
    },
  }[variant];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <span className="text-4xl mb-4" aria-hidden>
        {config.icon}
      </span>
      <h3 className="text-lg font-semibold text-headline mb-2">
        {config.title}
      </h3>
      <p className="text-body-secondary mb-6 max-w-sm">
        {config.message}
      </p>
      {variant === "error" && onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2.5 rounded-pill bg-accent-primary text-cta-dark font-medium hover:bg-accent-hover transition-colors focus-ring"
        >
          다시 시도
        </button>
      )}
      {variant === "loading" && (
        <div
          className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin"
          aria-hidden
        />
      )}
    </div>
  );
}
