"use client";

interface Step {
  id: string;
  label: string;
}

interface StepperProps {
  steps: Step[];
  currentIndex: number;
  onStepClick?: (index: number) => void;
}

export default function Stepper({
  steps,
  currentIndex,
  onStepClick,
}: StepperProps) {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((step, i) => {
          const isCurrent = i === currentIndex;
          const isCompleted = i < currentIndex;
          const isClickable = onStepClick && (isCompleted || isCurrent);
          return (
            <li
              key={step.id}
              className="flex items-center shrink-0"
            >
              <button
                type="button"
                onClick={() => isClickable && onStepClick(i)}
                disabled={!isClickable}
                className={`
                  flex items-center gap-2 rounded-pill px-4 py-2 text-sm font-medium
                  transition-colors focus-ring
                  ${
                    isCurrent
                      ? "bg-accent-primary text-cta-dark"
                      : isCompleted
                        ? "bg-card-dark text-body hover:bg-card-dark-hover"
                        : "bg-card-dark/50 text-body-secondary cursor-default"
                  }
                `}
                aria-current={isCurrent ? "step" : undefined}
              >
                <span
                  className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs
                    ${
                      isCompleted
                        ? "bg-accent-primary/20 text-accent-primary"
                        : isCurrent
                          ? "bg-cta-dark/20"
                          : "bg-body-secondary/20"
                    }
                  `}
                >
                  {isCompleted ? "✓" : i + 1}
                </span>
                {step.label}
              </button>
              {i < steps.length - 1 && (
                <span
                  className="mx-2 w-8 h-px bg-divider shrink-0"
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
