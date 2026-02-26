"use client";

import { useState } from "react";
import { Modal, Input, Button } from "@/components/ui";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, relationshipIntent?: string) => Promise<void>;
  /** 제출 결과: 성공/중복/실패 */
  result?: "success" | "duplicate" | "error" | null;
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
  const [relationshipIntent, setRelationshipIntent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await onSubmit(email.trim(), relationshipIntent?.trim() || undefined);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setRelationshipIntent("");
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
          <Input
            label="Relationship Intent (optional)"
            type="text"
            value={relationshipIntent}
            onChange={(e) => setRelationshipIntent(e.target.value)}
            placeholder="Long-term, Casual, Open..."
          />
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
