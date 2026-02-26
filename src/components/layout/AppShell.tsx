"use client";

import Link from "next/link";
import AppHeader from "./AppHeader";

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  statusBadge?: string;
}

const appNavItems = [
  { href: "/app/console", label: "Agent Console" },
  { href: "/app/search", label: "Partner Search" },
];

export default function AppShell({
  children,
  title,
  statusBadge,
}: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader title={title} statusBadge={statusBadge} />
      <div className="flex flex-1">
        <aside className="hidden md:flex w-48 shrink-0 flex-col border-r border-divider py-4">
          <nav className="px-4 space-y-1" aria-label="앱 내비게이션">
            {appNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 rounded-card text-body hover:bg-card-dark hover:text-headline transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
