"use client";

import Link from "next/link";

/**
 * Top Navigation (Landing용)
 * Pricing + Join Waitlist (우측), 중앙 메뉴 제거
 * design.json: container #D9CFBD, text #1A1A1A, CTA 버튼 #111111
 * onJoinWaitlist가 있으면 Join Waitlist 클릭 시 모달 열기(히어로 버튼과 동일), 없으면 /#waitlist로 스크롤
 */
interface LandingNavProps {
  onJoinWaitlist?: () => void;
}

export default function LandingNav({ onJoinWaitlist }: LandingNavProps) {
  return (
    <header
      className="sticky top-0 z-40 bg-content-frame"
      style={{ borderRadius: 0 }}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        {/* 왼쪽 로고 */}
        <Link
          href="/"
          className="text-type-body-lg font-semibold text-nav-text hover:text-nav-text-hover transition-colors"
        >
          CodenameLove
        </Link>

        {/* 가운데 내비게이션 제거됨 */}

        {/* 오른쪽: Pricing + Join Waitlist */}
        <div className="flex items-center gap-4">
          <Link
            href="/pricing"
            className="text-type-body text-nav-text hover:text-nav-text-hover hover:underline transition-colors"
          >
            Pricing
          </Link>
          {onJoinWaitlist ? (
            <button
              type="button"
              onClick={onJoinWaitlist}
              className="rounded-pill bg-cta-dark text-white px-[18px] py-2.5 text-type-body-sm font-medium hover:bg-cta-dark-hover transition-colors"
            >
              Join Waitlist
            </button>
          ) : (
            <Link
              href="/#waitlist"
              className="rounded-pill bg-cta-dark text-white px-[18px] py-2.5 text-type-body-sm font-medium hover:bg-cta-dark-hover transition-colors"
            >
              Join Waitlist
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
