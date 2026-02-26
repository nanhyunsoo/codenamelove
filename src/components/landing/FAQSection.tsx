"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Agent가 정말 내 선호를 반영하나요?",
    a: "온보딩에서 입력하신 관계 형태, 거리, 취미, 가치관 등을 학습합니다. 에이전트가 이를 바탕으로 대화하고 매칭합니다.",
  },
  {
    q: "비용은 어떻게 되나요?",
    a: "초기에는 대기자로 등록 후 초대를 받아 무료로 체험할 수 있습니다. 정식 런칭 후 요금제가 공개됩니다.",
  },
  {
    q: "개인정보는 안전한가요?",
    a: "데이터 암호화 및 개인정보처리방침을 준수하며, 에이전트 학습 시 민감 정보는 제외됩니다.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-2xl mx-auto px-6">
      <h2
        className="font-display text-3xl font-bold text-headline text-center mb-12"
        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
      >
        자주 묻는 질문
      </h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-dark-base rounded-card overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-6 py-4 text-left flex items-center justify-between text-headline font-medium hover:bg-card-dark transition-colors focus-ring rounded-card"
              aria-expanded={openIndex === i}
            >
              {faq.q}
              <span className="text-body-secondary">
                {openIndex === i ? "−" : "+"}
              </span>
            </button>
            {openIndex === i && (
              <div className="px-6 pb-4 text-body-secondary text-sm border-t border-divider pt-4 -mt-2 mx-6">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
