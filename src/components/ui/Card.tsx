"use client";

interface CardProps {
  children: React.ReactNode;
  /** 플로팅 카드(elevation2) / 인풋 카드(라이트) / 다크 카드 */
  variant?: "elevated" | "input" | "dark";
  className?: string;
  onClick?: () => void;
}

const variantClasses = {
  elevated:
    "bg-dark-base rounded-card p-5 shadow-elevation-2 text-headline text-type-body",
  input:
    "bg-input-card text-input-card-text rounded-card p-5 shadow-elevation-2 text-type-body",
  dark:
    "bg-card-dark text-body text-type-body rounded-card p-5 hover:bg-card-dark-hover transition-colors",
};

export default function Card({
  children,
  variant = "elevated",
  className = "",
  onClick,
}: CardProps) {
  const base = variantClasses[variant];
  const interactive = onClick ? "cursor-pointer" : "";
  return (
    <div
      className={`${base} ${interactive} ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") e.preventDefault();
              if (e.key === "Enter") onClick();
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
