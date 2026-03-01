"use client";

import Link from "next/link";

/**
 * Top Navigation (Landing용)
 * Pricing + Join Waitlist (우측), 중앙 메뉴 제거
 * design.json: container #D9CFBD, text #1A1A1A, CTA 버튼 #111111
 */
export default function LandingNav() {
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
          <Link
            href="/#waitlist"
            className="rounded-pill bg-cta-dark text-white px-[18px] py-2.5 text-type-body-sm font-medium hover:bg-cta-dark-hover transition-colors"
          >
            Join Waitlist
          </Link>
        </div>
      </nav>
    </header>
  );
}
