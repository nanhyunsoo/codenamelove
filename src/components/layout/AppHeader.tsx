"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

interface AppHeaderProps {
  title?: string;
  /** 상태 배지 (예: Deployed) */
  statusBadge?: string;
}

export default function AppHeader({ title, statusBadge }: AppHeaderProps) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-dark-base border-b border-divider">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Link
            href="/app/console"
            className="text-type-body-lg font-semibold text-headline hover:text-body transition-colors"
          >
            CodenameLove
          </Link>
          {title && (
            <span className="text-body-secondary">/</span>
          )}
          {title && (
            <h1 className="text-type-body font-medium">{title}</h1>
          )}
          {statusBadge && (
            <span className="px-3 py-1 rounded-pill bg-accent-primary/20 text-accent-primary text-type-caption font-medium">
              {statusBadge}
            </span>
          )}
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-card bg-card-dark hover:bg-card-dark-hover text-type-body-sm text-body transition-colors focus-ring"
            aria-expanded={menuOpen}
            aria-haspopup="true"
          >
            <span className="w-8 h-8 rounded-full bg-accent-primary/30 flex items-center justify-center text-accent-primary font-semibold">
              {user?.name?.[0] ?? "U"}
            </span>
            <span className="hidden sm:inline">{user?.email}</span>
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 mt-2 w-48 py-2 rounded-card bg-dark-base border border-divider shadow-elevation-2"
              role="menu"
            >
              <Link
                href="/app/settings"
                className="block px-4 py-2 text-type-body-sm text-body hover:bg-card-dark transition-colors"
                role="menuitem"
                onClick={() => setMenuOpen(false)}
              >
                Settings
              </Link>
              {user?.role === "admin" && (
                <Link
                  href="/admin/waitlist"
                  className="block px-4 py-2 text-type-body-sm text-body hover:bg-card-dark transition-colors"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  Waitlist Admin
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                  window.location.href = "/";
                }}
                className="block w-full text-left px-4 py-2 text-type-body-sm text-body hover:bg-card-dark transition-colors"
                role="menuitem"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
