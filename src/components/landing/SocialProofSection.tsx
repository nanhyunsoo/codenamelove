"use client";

/**
 * 소셜 프루프 (로고/지표)
 * design.json: brand strip #D9CFBD, logo #1A1A1A
 */
const metrics = [
  { value: "10K+", label: "대기자" },
  { value: "92%", label: "매칭 만족도" },
  { value: "50+", label: "파트너십" },
];

const partners = ["Moltbook", "Agent API", "Partner Apps"];

export default function SocialProofSection() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="bg-content-frame rounded-frame p-8 md:p-12">
        <h2
          className="font-display text-2xl md:text-3xl font-bold text-nav-text text-center mb-12"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          Trusted by early adopters
        </h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
          {partners.map((name) => (
            <div
              key={name}
              className="px-6 py-3 rounded-card bg-white/20 text-nav-text font-semibold"
            >
              {name}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-12 md:gap-16">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-nav-text">
                {m.value}
              </p>
              <p className="text-body-secondary text-sm mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
