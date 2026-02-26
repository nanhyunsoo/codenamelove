"use client";

import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  /** Primary: 오렌지 / Secondary: 다크 / Ghost: 텍스트 */
  children: React.ReactNode;
}

const variantClasses: Record<
  Variant,
  string
> = {
  primary:
    "bg-accent-primary text-cta-dark rounded-pill px-7 py-3.5 font-medium shadow-cta-primary hover:bg-accent-hover active:bg-accent-active disabled:bg-accent-disabled disabled:text-accent-disabled-text disabled:cursor-not-allowed disabled:shadow-none",
  secondary:
    "bg-cta-dark text-white rounded-pill px-[18px] py-2.5 font-medium hover:bg-cta-dark-hover disabled:opacity-50 disabled:cursor-not-allowed",
  ghost:
    "text-body hover:text-white bg-transparent rounded-pill px-4 py-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${variantClasses[variant]} transition-colors focus-ring ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
