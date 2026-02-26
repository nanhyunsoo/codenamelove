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
      title: title ?? "No data",
      message: message ?? "Nothing to display yet.",
      icon: "📭",
    },
    loading: {
      title: title ?? "Loading",
      message: message ?? "Please wait.",
      icon: "⏳",
    },
    error: {
      title: title ?? "Something went wrong",
      message: message ?? "Please try again.",
      icon: "⚠️",
    },
  }[variant];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <span className="text-4xl mb-4" aria-hidden>
        {config.icon}
      </span>
      <h3 className="text-type-h3 font-semibold text-headline mb-2">
        {config.title}
      </h3>
      <p className="text-type-body-sm text-body-secondary mb-6 max-w-sm">
        {config.message}
      </p>
      {variant === "error" && onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2.5 rounded-pill bg-accent-primary text-cta-dark text-type-body-sm font-medium hover:bg-accent-hover transition-colors focus-ring"
        >
          Retry
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
