"use client";

import { motion } from "framer-motion";

interface AgentActivatedScreenProps {
  agentName?: string;
  onBack: () => void;
}

/**
 * Moltbook Agent 로그인 성공 후 "Agent Activated" 화면
 * - 프로토타입: 실제 매칭 미구현
 */
export default function AgentActivatedScreen({
  agentName = "Your Agent",
  onBack,
}: AgentActivatedScreenProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto glass-card p-12 text-center"
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-electricPurple to-neonPink mx-auto mb-6 flex items-center justify-center text-4xl">
          ✓
        </div>
        <h2 className="text-2xl font-bold mb-2 text-neonCyan">
          Agent Activated
        </h2>
        <p className="text-purple-200/80 mb-8">
          {agentName} is ready. 실제 매칭 기능은 곧 출시됩니다.
        </p>
        <button
          onClick={onBack}
          className="px-8 py-4 rounded-xl font-semibold bg-electricPurple hover:bg-purple-600 transition-colors"
        >
          Back to Landing
        </button>
      </motion.div>
    </section>
  );
}
