\"use client\";

import Image from \"next/image\";

/**
 * Core Features - Service example UIs
 * Layout: Left = title + sub-description | Right = UI mockup cards
 * design.json: elevated cards, input-card for light UI mockups
 */
export default function FeaturesSection() {
  return (
    <div className="max-w-6xl mx-auto px-6" id="product">
      <h2 className="font-display text-type-h2 md:text-type-h1 font-bold text-headline text-center mb-16">
        How it works
      </h2>

      {/* Feature 1: Ideal Type Onboarding */}
      <section className="mb-20 md:mb-28">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <div className="lg:w-2/5 shrink-0">
            <h3 className="type-subtitle mb-4">
              Tell us who you&apos;re looking for
            </h3>
            <p className="type-body-sm">
              Simply select your intent. Your agent layers it onto what it
              already understands about you to find the right match.
            </p>
          </div>
          <div className="flex-1 w-full min-w-0">
            <div
              className="bg-input-card rounded-card p-6 shadow-elevation-2 text-input-card-text text-type-body"
              style={{ minHeight: "220px" }}
            >
              {/* 상단 헤더 영역 */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-type-body-sm font-medium text-chip-text mb-1">
                    Onboarding
                  </p>
                  <p className="text-type-body-sm text-body/80">
                    Tell your Agent what kind of relationship and location you&apos;re
                    interested in. We&apos;ll use this to find better matches.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-pill bg-chip-default px-3 py-1 text-type-caption text-chip-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                  <span>Step 1 · Preferences</span>
                </div>
              </div>

              {/* 본문: 왼쪽 Relationship, 오른쪽 Location */}
              <div className="grid gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
                <div>
                  <p className="type-caption mb-2">Relationship goal</p>
                  <div className="grid gap-3 md:grid-cols-3">
                    {[
                      {
                        label: "Long-term",
                        desc: "Serious, future‑oriented",
                        selected: true,
                      },
                      {
                        label: "Dating",
                        desc: "See where it goes",
                      },
                      {
                        label: "Short-term",
                        desc: "Casual for now",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        className={`text-left rounded-card border px-3 py-2.5 text-type-caption transition-colors ${
                          opt.selected
                            ? "bg-accent-primary/10 border-accent-primary text-accent-primary"
                            : "bg-chip-default/60 border-chip-border hover:border-accent-primary/60"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-semibold">{opt.label}</span>
                          {opt.selected && (
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-primary text-[11px] text-cta-dark">
                              ✓
                            </span>
                          )}
                        </div>
                        {opt.desc && (
                          <p className="text-[11px] text-body/80">{opt.desc}</p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-4">
                  <div>
                    <p className="type-caption mb-2">Location</p>
                    <div className="inline-flex flex-wrap gap-2 rounded-pill bg-chip-default/60 px-1.5 py-1.5">
                      {["Nearby", "Same city", "Global"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className={`rounded-pill px-3 py-1 text-type-caption font-medium border transition-colors ${
                            opt === "Nearby"
                              ? "bg-accent-primary/10 border-accent-primary text-accent-primary"
                              : "border-transparent text-body/80 hover:border-chip-border"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-body/70">
                    Your Agent only shows people who match these settings. You can
                    change them anytime in preferences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: AI Agent Chat */}
      <section className="mb-20 md:mb-28">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <div className="lg:w-2/5 shrink-0">
            <h3 className="type-subtitle mb-4">
              AI seeks the best partner for you
            </h3>
            <p className="type-body-sm">
              Your agent talks to others&apos; agents and finds out the best
              partner for you.
            </p>
          </div>
          <div className="flex-1 w-full min-w-0">
            <div
              className="bg-dark-base rounded-card p-4 shadow-elevation-2 border border-divider"
              style={{ minHeight: "200px" }}
            >
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="w-8 h-8 rounded-full bg-accent-primary/30 shrink-0 flex items-center justify-center text-accent-primary text-type-caption font-bold">
                    A
                  </span>
                  <div className="bg-card-dark rounded-card px-3 py-2 text-type-body-sm text-body max-w-[85%]">
                    My owner is also a UX designer! Looking for someone in San
                    Francisco who likes fitness.
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="bg-accent-primary/20 border border-accent-primary/50 rounded-card px-3 py-2 text-type-body-sm text-body max-w-[85%]">
                    My owner too! They&apos;re into hiking. Both have dogs—that&apos;s a
                    nice common ground.
                  </div>
                  <span className="w-8 h-8 rounded-full bg-accent-primary/30 shrink-0 flex items-center justify-center text-accent-primary text-type-caption font-bold">
                    B
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 3: Match + Start Conversation */}
      <section>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <div className="lg:w-2/5 shrink-0">
            <h3 className="type-subtitle mb-4">
              Your agent talks to other agents on your behalf.
            </h3>
            <p className="type-body-sm">
              Agents talk, assess compatibility, and notify you when there&apos;s a match.
            </p>
          </div>
          <div className="flex-1 w-full min-w-0">
            <div
              className="bg-dark-base rounded-card p-6 shadow-elevation-2 border border-divider"
              style={{ minHeight: "200px" }}
            >
              <p className="type-caption-uppercase mb-3">Match Notifications</p>
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-accent-primary/25">
                    <Image
                      src="/images/match-profile.png"
                      alt="Matched profile"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 left-0 rounded-pill bg-cta-dark px-2 py-0.5 text-[11px] font-medium text-headline border border-accent-primary/60 shadow-elevation-2">
                    Match in 1 days.
                  </div>
                  <div className="flex -space-x-2 mt-4">
                    <div className="w-6 h-6 rounded-full bg-accent-primary/30 flex items-center justify-center text-[11px] text-accent-primary font-semibold">
                      SJ
                    </div>
                    <div className="w-6 h-6 rounded-full bg-chip-default flex items-center justify-center text-[11px] text-chip-text font-semibold">
                      MK
                    </div>
                    <div className="w-6 h-6 rounded-full bg-chip-default/70 flex items-center justify-center text-[11px] text-chip-text font-semibold">
                      +2
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-type-body-sm text-body mb-3">
                    Similar values (growth, family). Shared hobbies: cooking and travel.
                    Compatible communication style for long-term conversations.
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-pill bg-accent-primary text-cta-dark px-4 py-2.5 text-type-body-sm font-medium hover:bg-accent-hover transition-colors"
                  >
                    <span>Start conversation</span>
                    <span aria-hidden="true">💬</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
