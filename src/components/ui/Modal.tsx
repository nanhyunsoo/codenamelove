"use client";

import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  /** 포커스 트랩 (접근성) */
  trapFocus?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  trapFocus = true,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    firstFocusRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div
        className="bg-dark-base rounded-hero p-8 max-w-md w-full shadow-elevation-2 text-headline text-type-body"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 id="modal-title" className="text-type-h2 font-display font-semibold mb-4">
            {title}
          </h2>
        )}
        {children}
        <button
          ref={firstFocusRef}
          onClick={onClose}
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:p-2 focus:rounded-pill focus:bg-card-dark focus:text-body"
          aria-label="Close"
        />
      </div>
    </div>
  );
}
