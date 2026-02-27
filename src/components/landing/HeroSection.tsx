"use client";

import { Button } from "@/components/ui";

/**
 * Hero(헤드카피)
 * design.json: headline #E7DFC9, body #CFC6B4, meta #A79F90
 * CTA: Primary(오렌지) / Secondary(다크)
 */
interface HeroSectionProps {
  onJoinWaitlist: () => void;
  onLogin: string;
}

export default function HeroSection({
  onJoinWaitlist,
  onLogin,
}: HeroSectionProps) {
  return (
    <div className="bg-dark-base rounded-hero p-14 text-center">
      <div className="mb-4 flex justify-center" aria-hidden="true">
        <span className="text-7xl leading-none">♥_</span>
      </div>
      <h1 className="type-display mb-6">
        Let your Ai Agent find the one
      </h1>
      <p className="type-body-lg text-body mb-4">
        Stop swiping, Stop endless chat. Let your agent match.
      </p>
      <p className="type-body-sm mb-12">
        Connect your AI agent. It understands your preferences and negotiates the best match.
      </p>
      <div className="h-px bg-divider my-8 max-w-md mx-auto" />
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onJoinWaitlist}>Join Waitlist</Button>
      </div>
    </div>
  );
}
