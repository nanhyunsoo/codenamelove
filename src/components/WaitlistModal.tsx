"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, relationshipIntent?: string) => Promise<void>;
}

/**
 * Waitlist 모달
 * - email (required)
 * - relationship intent (optional)
 */
export default function WaitlistModal({
  isOpen,
  onClose,
  onSubmit,
}: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [relationshipIntent, setRelationshipIntent] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await onSubmit(email.trim(), relationshipIntent?.trim() || undefined);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setEmail("");
        setRelationshipIntent("");
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("등록에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card p-8 max-w-md w-full"
          >
            <h3 className="text-2xl font-bold mb-2">Join Waitlist</h3>
            <p className="text-purple-200/80 mb-6">
              AI 매칭 소식을 가장 먼저 받아보세요.
            </p>

            {success ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-neonCyan text-center py-8"
              >
                ✓ 등록되었습니다! 곧 연락드릴게요.
              </motion.p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-purple-200/80 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-electricPurple outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-purple-200/80 mb-1">
                    Relationship Intent (optional)
                  </label>
                  <input
                    type="text"
                    value={relationshipIntent}
                    onChange={(e) => setRelationshipIntent(e.target.value)}
                    placeholder="Long-term, Casual, Open..."
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-electricPurple outline-none transition-colors"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 rounded-lg border border-white/20 hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 rounded-lg bg-electricPurple hover:bg-purple-600 transition-colors disabled:opacity-50"
                  >
                    {loading ? "등록 중..." : "Register"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
