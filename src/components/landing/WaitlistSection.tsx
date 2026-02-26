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
          AI 매칭 소식을 가장 먼저 받아보세요
        </h2>
        <p className="text-body-secondary mb-8">
          대기자 등록 후 초대를 받으면 서비스를 먼저 체험할 수 있어요.
        </p>
        <Button onClick={onJoinClick}>Join Waitlist</Button>
      </div>
    </div>
  );
}
