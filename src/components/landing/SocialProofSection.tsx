"use client";

/**
 * 소셜 프루프 (로고/지표)
 * design.json: brand strip #D9CFBD, logo #1A1A1A
 */
const metrics = [
  { value: "10K+", label: "Waitlist" },
  { value: "92%", label: "Match satisfaction" },
  { value: "50+", label: "Partnerships" },
];

const partners = ["Moltbook", "Agent API", "Partner Apps"];

export default function SocialProofSection() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="bg-content-frame rounded-frame p-8 md:p-12">
        <h2 className="font-display text-type-h2 md:text-type-h1 font-bold text-nav-text text-center mb-12">
          Trusted by early adopters
        </h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
          {partners.map((name) => (
            <div
              key={name}
              className="px-6 py-3 rounded-card bg-white/20 text-nav-text text-type-body-sm font-semibold"
            >
              {name}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-12 md:gap-16">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <p className="text-type-h2 md:text-type-h1 font-bold text-nav-text">
                {m.value}
              </p>
              <p className="text-type-body-sm text-body-secondary mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
