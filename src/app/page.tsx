"use client";

import { useState } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import WaitlistModal from "@/components/WaitlistModal";
import IdealPartnerForm from "@/components/IdealPartnerForm";
import AgentNegotiationViz from "@/components/AgentNegotiationViz";
import MatchConfirmation from "@/components/MatchConfirmation";
import FeedbackSection from "@/components/FeedbackSection";
import AgentActivatedScreen from "@/components/AgentActivatedScreen";
import type { IdealPartnerFormData } from "@/components/IdealPartnerForm";

type View =
  | "landing"
  | "agentActivated"
  | "negotiating"
  | "matchConfirmed";

export default function Home() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [view, setView] = useState<View>("landing");

  const handleJoinWaitlist = async (
    email: string,
    relationshipIntent?: string
  ) => {
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        relationship_intent: relationshipIntent,
        source: "landing",
      }),
    });
    if (!res.ok) throw new Error("Failed to register");
  };

  const handleSignInMoltbook = () => {
    // 프로토타입: 실제 Moltbook redirect 없이 바로 Agent Activated
    setView("agentActivated");
  };

  const handleIdealPartnerSubmit = (_: IdealPartnerFormData) => {
    setView("negotiating");
  };

  const handleNegotiationComplete = () => {
    setView("matchConfirmed");
  };

  const handleFeedbackSubmit = async (message: string, emotion: string) => {
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, emotion }),
    });
    if (!res.ok) throw new Error("Failed to submit");
  };

  return (
    <main className="relative min-h-screen">
      <ParticleBackground />

      {view === "agentActivated" && (
        <AgentActivatedScreen onBack={() => setView("landing")} />
      )}

      {view === "negotiating" && (
        <AgentNegotiationViz onComplete={handleNegotiationComplete} />
      )}

      {view === "matchConfirmed" && (
        <MatchConfirmation onClose={() => setView("landing")} />
      )}

      {view === "landing" && (
        <>
          <HeroSection
            onJoinWaitlist={() => setWaitlistOpen(true)}
            onSignInMoltbook={handleSignInMoltbook}
          />
          <FeaturesSection />
          <IdealPartnerForm onSubmit={handleIdealPartnerSubmit} />
          <FeedbackSection onSubmit={handleFeedbackSubmit} />
        </>
      )}

      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        onSubmit={handleJoinWaitlist}
      />
    </main>
  );
}
