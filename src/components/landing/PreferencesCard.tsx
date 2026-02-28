"use client";

import { useState } from "react";

const RELATIONSHIP_OPTIONS = [
  {
    label: "Committed Relationship",
    desc: "Long-term and exclusive connection",
    icon: "❤️",
  },
  {
    label: "Casual Dating",
    desc: "Low-pressure dates and fun",
    icon: "🔥",
  },
  {
    label: "Social Circle Expansion",
    desc: "Meeting new people and groups",
    icon: "👥",
  },
  {
    label: "Still Exploring",
    desc: "Not sure yet, seeing where it goes",
    icon: "🧭",
  },
  {
    label: "Serious but Open",
    desc: "Looking for serious but flexible",
    icon: "💑",
  },
  {
    label: "Friendship First",
    desc: "Building a bond before dating",
    icon: "🙂",
  },
];

const DISTANCE_OPTIONS = [
  { label: "Nearby", sub: "Within 10 miles", icon: "📍" },
  { label: "Same City", sub: "Metro area", icon: "🏙️" },
  { label: "Country", sub: "National", icon: "🏳️" },
  { label: "Global", sub: "Anywhere", icon: "🌐" },
];

/**
 * 온보딩 프리퍼런스 카드 (참고 UI 분위기 반영)
 * 다크 테마, 진행 바, 관계/위치 선택 카드, CTA
 */
export default function PreferencesCard() {
  const [selectedRelation, setSelectedRelation] = useState(0);
  const [selectedDistance, setSelectedDistance] = useState(0);

  return (
    <div
      className="bg-dark-base rounded-card p-4 shadow-elevation-2 border border-divider text-headline"
      style={{ minHeight: "200px" }}
    >
      {/* 헤더: 진행 표시 */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-type-caption uppercase tracking-wider text-body-secondary">
          Onboarding
        </span>
        <span className="text-type-caption text-body-secondary">
          Step 1 of 5
        </span>
      </div>
      <div className="h-1 rounded-full bg-white/10 mb-3 overflow-hidden">
        <div
          className="h-full rounded-full bg-accent-primary transition-all"
          style={{ width: "20%" }}
        />
      </div>

      {/* 본문: 관계 + 위치 2열 */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* 왼쪽 - 관계 타입 (2열 그리드로 컴팩트) */}
        <div>
          <p className="text-type-body-sm font-semibold text-headline mb-0.5">
            What kind of relationship are you looking for?
          </p>
          <p className="text-type-caption text-body-secondary mb-2">
            Select the option that best describes your current intent.
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {RELATIONSHIP_OPTIONS.map((opt, index) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setSelectedRelation(index)}
                className={`w-full flex items-center gap-2 rounded-card border px-2 py-1.5 text-left transition-colors ${
                  selectedRelation === index
                    ? "border-accent-primary bg-accent-primary/10"
                    : "border-white/15 bg-white/5 hover:border-white/25"
                }`}
              >
                <span className="text-sm opacity-90">{opt.icon}</span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[11px] font-medium text-headline truncate leading-tight">
                    {opt.label}
                  </span>
                  <span className="block text-[10px] text-body-secondary truncate leading-tight">
                    {opt.desc}
                  </span>
                </span>
                <span
                  className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 flex items-center justify-center ${
                    selectedRelation === index
                      ? "border-accent-primary bg-accent-primary"
                      : "border-white/40"
                  }`}
                >
                  {selectedRelation === index && (
                    <span className="w-1 h-1 rounded-full bg-cta-dark" />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 오른쪽 - 위치 */}
        <div className="space-y-3">
          <div>
            <p className="text-type-body-sm font-semibold text-headline mb-1">
              Where are you?
            </p>
            <div className="flex items-center gap-2 rounded-card bg-white/5 border border-white/15 px-2.5 py-1.5 mb-1">
              <span className="text-body-secondary text-sm">🔍</span>
              <span className="text-type-caption text-body-secondary flex-1 truncate">
                Search city or zip code
              </span>
            </div>
            <button
              type="button"
              className="w-full flex items-center gap-2 rounded-card bg-white/5 border border-white/15 px-2.5 py-1.5 text-type-caption text-headline hover:bg-white/10 transition-colors"
            >
              <span className="text-sm">✈️</span>
              Use Current Location
            </button>
          </div>

          <div>
            <p className="text-type-body-sm font-semibold text-headline mb-1">
              Search Distance
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {DISTANCE_OPTIONS.map((opt, index) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setSelectedDistance(index)}
                  className={`rounded-card border px-2 py-1.5 text-left transition-colors ${
                    selectedDistance === index
                      ? "border-accent-primary bg-accent-primary/10"
                      : "border-white/15 bg-white/5 hover:border-white/25"
                  }`}
                >
                  <div className="flex items-start justify-between gap-0.5">
                    <span className="text-xs opacity-80">{opt.icon}</span>
                    <span
                      className={`w-3 h-3 rounded-full border flex-shrink-0 flex items-center justify-center ${
                        selectedDistance === index
                          ? "border-accent-primary bg-accent-primary"
                          : "border-white/40"
                      }`}
                    >
                      {selectedDistance === index && (
                        <span className="w-1 h-1 rounded-full bg-cta-dark" />
                      )}
                    </span>
                  </div>
                  <span className="block text-[11px] font-medium text-headline truncate">
                    {opt.label}
                  </span>
                  <span className="block text-[10px] text-body-secondary uppercase truncate">
                    {opt.sub}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA + 푸터 */}
      <div className="mt-3 pt-3 border-t border-divider">
        <button
          type="button"
          className="w-full rounded-card bg-accent-primary text-cta-dark py-2 text-type-caption font-semibold hover:bg-accent-hover transition-colors"
        >
          Continue
        </button>
        <p className="text-[10px] text-body-secondary text-center mt-1.5">
          You can always change this later in settings.
        </p>
      </div>
    </div>
  );
}
