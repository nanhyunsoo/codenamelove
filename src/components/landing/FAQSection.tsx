"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Does the Agent reflect my preferences?",
    a: "Yes. During onboarding you provide relationship type, distance, hobbies, and values. The Agent learns from these and negotiates matches accordingly.",
  },
  {
    q: "Is my data safe?",
    a: "We encrypt your data and strictly follow our privacy policy. Sensitive information is never shared when your Agent talks to other Agents.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-2xl mx-auto px-6">
      <h2 className="font-display text-type-h2 md:text-type-h1 font-bold text-headline text-center mb-12">
        Frequently Asked Questions
      </h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-dark-base rounded-card overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-6 py-4 text-left flex items-center justify-between text-type-body text-headline font-medium hover:bg-card-dark transition-colors focus-ring rounded-card"
              aria-expanded={openIndex === i}
            >
              {faq.q}
              <span className="text-body-secondary">
                {openIndex === i ? "−" : "+"}
              </span>
            </button>
            {openIndex === i && (
              <div className="px-6 pb-4 text-type-body-sm text-body-secondary border-t border-divider pt-4 -mt-2 mx-6">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
