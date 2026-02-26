"use client";

import Card from "@/components/ui/Card";

const features = [
  {
    title: "Agent Negotiation",
    desc: "Your AI Agent talks with other Agents on your behalf. No awkward first messages.",
    image: "🤖",
  },
  {
    title: "Compatibility Analysis",
    desc: "대화 기반 궁합 분석으로 진짜 맞는 상대를 찾아요.",
    image: "📊",
  },
  {
    title: "You Meet",
    desc: "매칭 완료 후 실제 만남으로 이어집니다.",
    image: "💑",
  },
];

/**
 * 핵심 피처 (이미지+설명)
 * design.json: 플로팅 카드에 elevation, 다크 surface
 */
export default function FeaturesSection() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <h2
        className="font-display text-3xl md:text-4xl font-bold text-headline text-center mb-16"
        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
      >
        How it works
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f) => (
          <Card key={f.title} variant="elevated">
            <div className="text-4xl mb-4">{f.image}</div>
            <h3 className="text-lg font-semibold text-headline mb-2">
              {f.title}
            </h3>
            <p className="text-body-secondary text-sm">{f.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
