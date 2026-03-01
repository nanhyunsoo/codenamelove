"use client";

import { useState } from "react";
import Link from "next/link";
import LandingNav from "@/components/layout/LandingNav";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui";

/** 월간/연간 청구 타입 */
type BillingCycle = "monthly" | "annual";

/**
 * 요금제 페이지
 * - 첫 번째 이미지 콘텐츠 유지 (Free, Pro)
 * - 두 번째 이미지 레이아웃: Plans and Pricing 헤더, 토글, 카드형
 * - Pro: $20/월
 * - 사이트 디자인 시스템 적용 (dark canvas, headline/body, accent, card-elevated)
 */
export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const freeFeatures = [
    "Up to 10 match notifications per day",
    "Start up to 3 conversations per day",
  ];
  const proFeatures = [
    "Up to 20 match notifications per day",
    "Unlimited conversation starts",
  ];

  return (
    <main className="min-h-screen">
      <LandingNav />
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        {/* 헤더: 제목 + 부제목 */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-display text-type-h1 md:text-type-display font-bold text-headline mb-3">
            Plans and Pricing
          </h1>
          <p className="text-type-body-sm text-body-secondary max-w-xl mx-auto mb-8">
            Receive unlimited credits when you pay yearly, and save on your plan.
          </p>
          {/* 월간/연간 토글 */}
          <div className="inline-flex items-center gap-2 rounded-pill bg-dark-base p-1 border border-divider shadow-elevation-1">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`rounded-pill px-5 py-2.5 text-type-body-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${
                billingCycle === "monthly"
                  ? "bg-accent-primary text-cta-dark shadow-cta-primary"
                  : "text-body hover:text-headline"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={`rounded-pill px-5 py-2.5 text-type-body-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas flex items-center gap-2 ${
                billingCycle === "annual"
                  ? "bg-accent-primary text-cta-dark shadow-cta-primary"
                  : "text-body hover:text-headline"
              }`}
            >
              Annual
              <span className="text-type-caption text-body-secondary">Save 35%</span>
            </button>
          </div>
        </div>

        {/* 요금제 카드 2개: Free, Pro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Free 플랜 카드 */}
          <article className="bg-dark-base rounded-card p-6 md:p-8 border border-divider shadow-elevation-2 flex flex-col">
            <h2 className="font-display text-type-h2 font-bold text-headline mb-1">
              Free
            </h2>
            <div className="mt-2 mb-1">
              <span className="font-display text-3xl md:text-4xl font-bold text-headline">$0</span>
            </div>
            <p className="text-type-caption text-body-secondary mb-6">
              Per user/month{billingCycle === "annual" ? ", billed annually" : ""}
            </p>
            <p className="text-type-body-sm text-body mb-6">
              For getting started
            </p>
            <ul className="space-y-3 mb-8 flex-1">
              {freeFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-type-body-sm text-body">
                  <span className="text-accent-primary mt-0.5 shrink-0" aria-hidden>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <p className="text-type-body-sm text-body-secondary mb-6">
              Perfect for exploring how your agent connects you.
            </p>
            <Link href="/#waitlist" className="block">
              <Button variant="secondary" className="w-full justify-center">
                Get started for free
              </Button>
            </Link>
          </article>

          {/* Pro 플랜 카드 (Popular 배지) */}
          <article className="bg-dark-base rounded-card p-6 md:p-8 border border-divider shadow-elevation-2 flex flex-col relative">
            <div className="absolute top-6 right-6">
              <span className="inline-block rounded-md bg-accent-primary text-cta-dark text-type-caption font-semibold px-2.5 py-1">
                Popular
              </span>
            </div>
            <h2 className="font-display text-type-h2 font-bold text-headline mb-1">
              Pro
            </h2>
            <div className="mt-2 mb-1">
              <span className="font-display text-3xl md:text-4xl font-bold text-headline">$20</span>
              <span className="text-type-body-sm text-body-secondary ml-1">/month</span>
            </div>
            <p className="text-type-caption text-body-secondary mb-6">
              Per user/month{billingCycle === "annual" ? ", billed annually" : ""}
            </p>
            <p className="text-type-body-sm text-body mb-6">
              For active match seekers
            </p>
            <ul className="space-y-3 mb-8 flex-1">
              {proFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-type-body-sm text-body">
                  <span className="text-accent-primary mt-0.5 shrink-0" aria-hidden>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <p className="text-type-body-sm text-body-secondary mb-6">
              Designed for those who want more chances and deeper connections.
            </p>
            <Link href="/#waitlist" className="block">
              <Button className="w-full justify-center">
                Upgrade to Pro
              </Button>
            </Link>
          </article>
        </div>
      </section>
      <Footer />
    </main>
  );
}
