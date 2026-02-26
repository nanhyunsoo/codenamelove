"use client";

import Link from "next/link";

/**
 * Top Navigation (Landing용)
 * Product / Solutions / Pricing / Developers + Login/CTA
 * design.json: container #D9CFBD, text #1A1A1A, CTA 버튼 #111111
 */
export default function LandingNav() {
  const navLinks = [
    { href: "#product", label: "Product" },
    { href: "#solutions", label: "Solutions" },
    { href: "#pricing", label: "Pricing" },
    { href: "#developers", label: "Developers" },
  ];

  return (
    <header
      className="sticky top-0 z-40 bg-content-frame"
      style={{ borderRadius: 0 }}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        aria-label="메인 내비게이션"
      >
        <Link
          href="/"
          className="text-lg font-semibold text-nav-text hover:text-nav-text-hover transition-colors"
        >
          CodenameLove
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-nav-text hover:text-nav-text-hover hover:underline transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-nav-text hover:text-nav-text-hover hover:underline transition-colors"
          >
            Login
          </Link>
          <Link
            href="/#waitlist"
            className="rounded-pill bg-cta-dark text-white px-[18px] py-2.5 text-sm font-medium hover:bg-cta-dark-hover transition-colors"
          >
            Join Waitlist
          </Link>
        </div>
      </nav>
    </header>
  );
}
