"use client";

import { useState } from "react";
import { Modal, Input, Button } from "@/components/ui";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => Promise<void>;
  /** 제출 결과: 성공/중복/실패/미설정(503) */
  result?: "success" | "duplicate" | "error" | "unavailable" | null;
  onResultDismiss?: () => void;
}

export default function WaitlistModal({
  isOpen,
  onClose,
  onSubmit,
  result,
  onResultDismiss,
}: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [wantsUpdate, setWantsUpdate] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await onSubmit(email.trim());
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setWantsUpdate(false);
    onResultDismiss?.();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Join Waitlist">
      {result === "success" ? (
        <div className="text-center py-4">
          <p className="text-type-body-lg text-headline mb-4">
            ✓ You're on the list! We'll be in touch soon.
          </p>
          <Button onClick={handleClose}>OK</Button>
        </div>
      ) : result === "duplicate" ? (
        <div className="text-center py-4">
          <p className="text-type-body mb-4">
            This email is already registered.
          </p>
          <Button onClick={onResultDismiss}>Try again</Button>
        </div>
      ) : result === "unavailable" ? (
        <div className="text-center py-4">
          <p className="text-type-body text-amber-400 mb-4">
            Waitlist is not configured yet. Set Supabase env vars (locally: .env.local; deployed: your host&apos;s environment variables). See README.
          </p>
          <Button onClick={handleClose}>OK</Button>
        </div>
      ) : result === "error" ? (
        <div className="text-center py-4">
          <p className="text-type-body text-red-400 mb-4">Registration failed. Please try again.</p>
          <Button onClick={onResultDismiss}>Try again</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email *"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <label className="flex items-start gap-2 text-type-body-sm cursor-pointer select-none">
            <input
              type="checkbox"
              checked={wantsUpdate}
              onChange={(e) => setWantsUpdate(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-border bg-transparent text-electricPurple focus:ring-electricPurple"
            />
            <span className="text-type-body">
              Be the first to know what's coming next.
            </span>
          </label>
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
