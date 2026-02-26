"use client";

import { Button } from "@/components/ui";

interface WaitlistSectionProps {
  onJoinClick: () => void;
}

/**
 * Waitlist CTA 섹션
 */
export default function WaitlistSection({ onJoinClick }: WaitlistSectionProps) {
  return (
    <div className="max-w-2xl mx-auto px-6 text-center">
      <div className="bg-dark-base rounded-hero p-12 md:p-16">
        <h2
          className="font-display text-2xl md:text-3xl font-bold text-headline mb-4"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          Be the first to know about AI matching
        </h2>
        <p className="text-body-secondary mb-8">
          Join the waitlist and get early access when we launch.
        </p>
        <Button onClick={onJoinClick}>Join Waitlist</Button>
      </div>
    </div>
  );
}
