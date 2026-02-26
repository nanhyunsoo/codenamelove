"use client";

import Link from "next/link";
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
      <h1 className="type-display mb-6">
        Let your Agent find the best Partner for you.
      </h1>
      <p className="type-body-lg text-body mb-4">
        Your AI talks. You meet.
      </p>
      <p className="type-body-sm mb-12">
        AI-powered matchmaking through Agent negotiation.
      </p>
      <div className="h-px bg-divider my-8 max-w-md mx-auto" />
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onJoinWaitlist}>Join Waitlist</Button>
        <Link href={onLogin}>
          <Button variant="secondary">Sign in with Moltbook</Button>
        </Link>
      </div>
    </div>
  );
}
