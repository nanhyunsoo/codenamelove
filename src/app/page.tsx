"use client";

import { useState } from "react";
import LandingNav from "@/components/layout/LandingNav";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import FAQSection from "@/components/landing/FAQSection";
import WaitlistSection from "@/components/landing/WaitlistSection";
import WaitlistModal from "@/components/landing/WaitlistModal";

export default function LandingPage() {
  const [waitlistModalOpen, setWaitlistModalOpen] = useState(false);
  const [waitlistResult, setWaitlistResult] = useState<
    "success" | "duplicate" | "error" | null
  >(null);

  const handleWaitlistSubmit = async (
    email: string,
    relationshipIntent?: string
  ) => {
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          relationship_intent: relationshipIntent,
          source: "landing",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 409 || data.error?.includes("duplicate")) {
          setWaitlistResult("duplicate");
        } else {
          setWaitlistResult("error");
        }
        return;
      }
      setWaitlistResult("success");
    } catch {
      setWaitlistResult("error");
    }
  };

  return (
    <main className="min-h-screen">
      <LandingNav />
      {/* Hero - design.json: dark base, no shadow on hero */}
      <section id="hero" className="relative">
        <div className="mx-auto max-w-7xl px-6 py-8 md:py-12">
          <HeroSection
            onJoinWaitlist={() => setWaitlistModalOpen(true)}
            onLogin="/login"
          />
        </div>
      </section>

      {/* Features */}
      <section id="product" className="py-16 md:py-24">
        <FeaturesSection />
      </section>

      {/* Social Proof */}
      <section id="solutions" className="py-16 md:py-24">
        <SocialProofSection />
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24">
        <FAQSection />
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="py-16 md:py-24">
        <WaitlistSection onJoinClick={() => setWaitlistModalOpen(true)} />
      </section>

      <Footer />

      <WaitlistModal
        isOpen={waitlistModalOpen}
        onClose={() => {
          setWaitlistModalOpen(false);
          setWaitlistResult(null);
        }}
        onSubmit={handleWaitlistSubmit}
        result={waitlistResult}
        onResultDismiss={() => setWaitlistResult(null)}
      />
    </main>
  );
}
