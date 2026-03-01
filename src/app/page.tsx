"use client";

import { useState } from "react";
import LandingNav from "@/components/layout/LandingNav";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import FAQSection from "@/components/landing/FAQSection";
import WaitlistSection from "@/components/landing/WaitlistSection";
import WaitlistModal from "@/components/landing/WaitlistModal";

export default function LandingPage() {
  const [waitlistModalOpen, setWaitlistModalOpen] = useState(false);
  const [waitlistResult, setWaitlistResult] = useState<
    "success" | "duplicate" | "error" | "unavailable" | null
  >(null);

  const handleWaitlistSubmit = async (email: string) => {
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 409 || data.error?.includes("duplicate")) {
          setWaitlistResult("duplicate");
        } else if (res.status === 503) {
          setWaitlistResult("unavailable");
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
      <LandingNav onJoinWaitlist={() => setWaitlistModalOpen(true)} />
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

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24">
        <FAQSection />
      </section>

      {/* Feedback / Waitlist */}
      <section id="waitlist" className="py-16 md:py-24">
        <WaitlistSection />
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
