"use client";

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
              Simple onboarding—your Agent learns your preferences and finds the
              best match for you.
            </p>
          </div>
          <div className="flex-1 w-full min-w-0">
            <div
              className="bg-input-card rounded-card p-6 shadow-elevation-2 text-input-card-text text-type-body"
              style={{ minHeight: "200px" }}
            >
              <p className="text-type-body-sm font-medium text-chip-text mb-3">
                Onboarding
              </p>
              <div className="space-y-4">
                <div>
                  <label className="type-caption block mb-1.5">
                    Relationship
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Long-term", "Short-term", "Dating"].map((opt) => (
                      <span
                        key={opt}
                        className={`px-3 py-1.5 rounded-pill text-type-caption font-medium border ${
                          opt === "Long-term"
                            ? "bg-accent-primary/20 border-accent-primary text-accent-primary"
                            : "bg-chip-default border-chip-border"
                        }`}
                      >
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="type-caption block mb-1.5">
                    Location
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Nearby", "Same city", "Global"].map((opt) => (
                      <span
                        key={opt}
                        className="px-3 py-1.5 rounded-pill text-type-caption font-medium bg-chip-default border border-chip-border"
                      >
                        {opt}
                      </span>
                    ))}
                  </div>
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
              Talk to your partner
            </h3>
            <p className="type-body-sm">
              We&apos;ll suggest conversation topics to help you connect.
            </p>
          </div>
          <div className="flex-1 w-full min-w-0">
            <div
              className="bg-dark-base rounded-card p-6 shadow-elevation-2 border border-divider"
              style={{ minHeight: "200px" }}
            >
              <p className="type-caption-uppercase mb-2">
                Match Report
              </p>
              <p className="text-type-body-sm text-body mb-4">
                Similar values (growth, family). Shared hobbies: cooking,
                travel. Compatible communication style.
              </p>
              <button
                type="button"
                className="w-full rounded-pill bg-accent-primary text-cta-dark py-2.5 text-type-body-sm font-medium hover:bg-accent-hover transition-colors"
              >
                Start conversation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
