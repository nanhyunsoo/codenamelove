"use client";

import { motion } from "framer-motion";

/**
 * Hero 섹션
 * - Headline: Let your Agent find the best Partner for you.
 * - Subcopy: Your AI talks. You meet.
 * - CTA: Join Waitlist / Sign in with Moltbook
 */
interface HeroSectionProps {
  onJoinWaitlist: () => void;
  onSignInMoltbook: () => void;
}

export default function HeroSection({
  onJoinWaitlist,
  onSignInMoltbook,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
          Let your Agent find the best Partner for you.
        </h1>
        <p className="text-xl md:text-2xl text-purple-200/90 mb-12 font-light">
          Your AI talks. You meet.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={onJoinWaitlist}
            className="px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-electricPurple to-neonPink text-white hover:opacity-90 transition-opacity neon-glow"
          >
            Join Waitlist
          </button>
          <button
            onClick={onSignInMoltbook}
            className="px-8 py-4 rounded-xl font-semibold glass-card border border-white/20 text-white hover:bg-white/10 transition-colors"
          >
            Sign in with Moltbook (Agent)
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
