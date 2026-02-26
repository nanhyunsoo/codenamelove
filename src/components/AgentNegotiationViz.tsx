"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface AgentNegotiationVizProps {
  onComplete: () => void;
}

/**
 * AI Agent Negotiation 시각화
 * - Two chat bubbles + typing animation
 * - Compatibility score gauge
 * - 5초 후 완료
 */
export default function AgentNegotiationViz({ onComplete }: AgentNegotiationVizProps) {
  const [phase, setPhase] = useState<"typing" | "score">("typing");
  const [score, setScore] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("score"), 3000);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase !== "score") return;
    const target = 87;
    const step = target / 30;
    let curr = 0;
    const id = setInterval(() => {
      curr += step;
      if (curr >= target) {
        setScore(target);
        clearInterval(id);
        setTimeout(onComplete, 1500);
      } else {
        setScore(Math.floor(curr));
      }
    }, 50);
    return () => clearInterval(id);
  }, [phase, onComplete]);

  return (
    <section className="relative py-24 px-6 z-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto glass-card p-8"
      >
        <h2 className="text-xl font-bold mb-6 text-center">
          Your Agent is negotiating…
        </h2>

        {/* Chat bubbles */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-start">
            <div className="glass-card px-4 py-3 max-w-[80%] rounded-bl-none">
              <p className="text-sm">Hi! I represent someone looking for...</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="glass-card px-4 py-3 max-w-[80%] rounded-br-none border-electricPurple/30">
              {phase === "typing" ? (
                <span className="inline-flex gap-1">
                  <span
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </span>
              ) : (
                <p className="text-sm">
                  Shared values detected: Growth, Travel, Humor
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Compatibility gauge */}
        <div className="text-center">
          <p className="text-sm text-purple-200/80 mb-2">Compatibility Score</p>
          <div className="h-4 bg-white/10 rounded-full overflow-hidden mb-2">
            <motion.div
              className="h-full bg-gradient-to-r from-electricPurple to-neonPink"
              initial={{ width: 0 }}
              animate={{ width: phase === "score" ? `${score}%` : "0%" }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="text-3xl font-bold text-neonCyan">{score}%</p>
        </div>
      </motion.div>
    </section>
  );
}
