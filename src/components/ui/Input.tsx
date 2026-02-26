"use client";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export default function Input({
  label,
  error,
  helperText,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, "-");
  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm text-body-secondary"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full px-4 py-3 rounded-card bg-dark-base text-body 
          border border-divider focus:border-accent-primary focus:outline-none
          placeholder:text-body-secondary transition-colors focus-ring
          ${error ? "border-red-500" : ""} ${className}
        `}
        aria-invalid={!!error}
        aria-describedby={
          error
            ? `${inputId}-error`
            : helperText
              ? `${inputId}-helper`
              : undefined
        }
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-sm text-red-400">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${inputId}-helper`} className="text-sm text-body-secondary">
          {helperText}
        </p>
      )}
    </div>
  );
}
