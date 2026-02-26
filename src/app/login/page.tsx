"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button, Input } from "@/components/ui";

/**
 * Auth (Login / Sign up)
 * "moltbook 에이전트 API" 기반 로그인 시뮬레이션
 * 흐름: 로그인 선택 → 인증 완료 → App Shell 진입
 */
export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      router.push("/onboarding");
    } catch {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-dark-base rounded-hero p-8 md:p-12 shadow-elevation-2">
          <h1
            className="font-display text-2xl font-bold text-headline mb-2 text-center"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Sign in
          </h1>
          <p className="text-body-secondary text-sm text-center mb-8">
            Sign in with Moltbook Agent API
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
            <Input
              label="Password (optional for demo)"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-body-secondary text-sm">
            <Link href="/" className="text-body hover:text-headline transition-colors">
              ← Back to Landing
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
