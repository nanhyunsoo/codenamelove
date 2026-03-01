"use client";

/**
 * Footer (Landing용)
 * 약관/정책/문의 - 비클릭 가능, 시각적 표시만
 * design.json: brand strip container #D9CFBD, logo #1A1A1A
 */
export default function Footer() {
  const links = [
    { label: "Terms" },
    { label: "Privacy" },
    { label: "Contact" },
  ];

  return (
    <footer className="bg-content-frame text-nav-text">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="inline-flex items-center gap-1.5 text-type-body-lg font-semibold" aria-label="CodenameLove">
            <span className="leading-none" aria-hidden="true">♥_</span>
          </span>
          <ul className="flex gap-6">
            {links.map((link) => (
              <li key={link.label}>
                <span
                  className="text-type-body cursor-default pointer-events-none select-none"
                  aria-hidden="true"
                >
                  {link.label}
                </span>
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
