"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const EMOTIONS = [
  { id: "excited", label: "🔥 Excited", emoji: "🔥" },
  { id: "curious", label: "🤔 Curious", emoji: "🤔" },
  { id: "skeptical", label: "😅 Skeptical", emoji: "😅" },
];

interface FeedbackSectionProps {
  onSubmit: (message: string, emotion: string) => Promise<void>;
}

/**
 * 피드백 모듈
 * - 텍스트 입력 + 감정 선택
 * - POST /api/feedback
 */
export default function FeedbackSection({ onSubmit }: FeedbackSectionProps) {
  const [message, setMessage] = useState("");
  const [emotion, setEmotion] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !emotion) return;
    setLoading(true);
    try {
      await onSubmit(message.trim(), emotion);
      setDone(true);
      setMessage("");
      setEmotion("");
    } catch (err) {
      console.error(err);
      alert("피드백 전송에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-24 px-6 z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto glass-card p-8"
      >
        <h2 className="text-2xl font-bold mb-2">Feedback</h2>
        <p className="text-purple-200/80 mb-8">
          CodenameLove에 대한 생각을 들려주세요.
        </p>

        {done ? (
          <p className="text-neonCyan text-center py-8">
            ✓ 피드백을 남겨주셔서 감사합니다!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-purple-200/80 mb-2">
                Your thoughts
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                placeholder="AI 매칭 서비스에 대한 의견을 자유롭게..."
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-electricPurple outline-none transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm text-purple-200/80 mb-2">
                How do you feel?
              </label>
              <div className="flex flex-wrap gap-2">
                {EMOTIONS.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setEmotion(e.id)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      emotion === e.id
                        ? "border-neonPink bg-neonPink/20"
                        : "border-white/20 hover:border-white/40"
                    }`}
                  >
                    {e.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold bg-electricPurple hover:bg-purple-600 transition-colors disabled:opacity-50"
            >
              {loading ? "전송 중..." : "Send Feedback"}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
