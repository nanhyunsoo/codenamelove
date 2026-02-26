"use client";

import { motion } from "framer-motion";

interface MatchConfirmationProps {
  onClose: () => void;
}

/**
 * Match Confirmation 화면
 * - "Your Agent found a strong candidate."
 * - Profile card mock
 * - Meet in real life CTA (disabled)
 */
export default function MatchConfirmation({ onClose }: MatchConfirmationProps) {
  return (
    <section className="relative py-24 px-6 z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto glass-card p-8 text-center"
      >
        <h2 className="text-2xl font-bold mb-2 text-neonCyan">
          Your Agent found a strong candidate.
        </h2>
        <p className="text-purple-200/80 mb-8">
          Compatibility: 87% — Shared values: Growth, Travel, Humor
        </p>

        {/* Mock profile card */}
        <div className="glass-card p-6 mb-8 rounded-xl border-white/20 text-left">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-electricPurple to-neonPink mx-auto mb-4" />
          <p className="font-semibold text-center mb-1">Agent Match #1</p>
          <p className="text-sm text-purple-200/80 text-center mb-4">
            Karma: 4.8 · Verified ✓
          </p>
          <p className="text-sm text-purple-200/70">
            관심사: Travel, Tech, Music · Nearby
          </p>
        </div>

        <button
          disabled
          className="w-full py-4 rounded-xl font-semibold bg-white/10 text-white/50 cursor-not-allowed"
        >
          Meet in real life (Coming soon)
        </button>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-purple-300 hover:text-white transition-colors"
        >
          Back to landing
        </button>
      </motion.div>
    </section>
  );
}
