"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Agent Negotiation",
    desc: "Your AI Agent talks with other Agents on your behalf. No awkward first messages.",
  },
  {
    title: "Compatibility Analysis",
    desc: "대화 기반 궁합 분석으로 진짜 맞는 상대를 찾아요.",
  },
  {
    title: "You Meet",
    desc: "매칭 완료 후 실제 만남으로 이어집니다.",
  },
];

/**
 * 핵심 피쳐 섹션
 */
export default function FeaturesSection() {
  return (
    <section className="relative py-24 px-6 z-10">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-16"
        >
          How it works
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 hover:border-purple-500/30 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2 text-neonCyan">
                {f.title}
              </h3>
              <p className="text-purple-200/80 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
