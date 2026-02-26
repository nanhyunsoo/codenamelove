"use client";

/**
 * Multi-select chips 스타일
 * design.json: surface #EFE6D2, border #D5CCB8, hover #FFFFFF
 */
interface ChipProps {
  label: string;
  selected?: boolean;
  onToggle?: () => void;
  onRemove?: () => void;
  disabled?: boolean;
}

export default function Chip({
  label,
  selected = false,
  onToggle,
  onRemove,
  disabled,
}: ChipProps) {
  const clickable = onToggle || onRemove;
  return (
    <span
      role={clickable ? "button" : undefined}
      onClick={clickable && !disabled ? (onRemove ?? onToggle) : undefined}
      onKeyDown={(e) => {
        if (
          clickable &&
          !disabled &&
          (e.key === "Enter" || e.key === " ")
        ) {
          e.preventDefault();
          (onRemove ?? onToggle)?.();
        }
      }}
      tabIndex={clickable && !disabled ? 0 : undefined}
      className={`
        inline-flex items-center gap-1.5 px-4 py-2 rounded-pill
        border border-chip-border text-chip-text font-medium
        transition-colors focus-ring
        ${
          selected
            ? "bg-white"
            : "bg-chip-default hover:bg-white"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
      aria-pressed={onToggle ? selected : undefined}
    >
      {label}
      {onRemove && (
        <span className="ml-1 text-body-secondary hover:text-body" aria-hidden>
          ×
        </span>
      )}
    </span>
  );
}
