"use client";

import Link from "next/link";

/**
 * Footer (Landing용)
 * 약관/정책/문의
 * design.json: brand strip container #D9CFBD, logo #1A1A1A
 */
export default function Footer() {
  const links = [
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-content-frame text-nav-text">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-type-body-lg font-semibold">CodenameLove</span>
          <ul className="flex gap-6">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-type-body hover:text-nav-text-hover hover:underline transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-center text-type-body-sm text-body-secondary">
          © 2026 CodenameLove. AI-powered matchmaking.
        </p>
      </div>
    </footer>
  );
}
