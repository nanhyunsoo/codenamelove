/**
 * 온보딩 프리퍼런스 카드 - 정적 UI 목업 (클릭 불가, 이미지처럼 표시)
 */
const RELATIONSHIP_OPTIONS = [
  {
    label: "Committed Relationship",
    desc: "Long-term and exclusive connection",
    icon: "❤️",
    selected: true,
  },
  {
    label: "Casual Dating",
    desc: "Low-pressure dates and fun",
    icon: "🔥",
    selected: false,
  },
  {
    label: "Still Exploring",
    desc: "Not sure yet, seeing where it goes",
    icon: "🧭",
    selected: false,
  },
];

const DISTANCE_OPTIONS = [
  { label: "Nearby", sub: "Within 10 miles", icon: "📍", selected: true },
  { label: "Same City", sub: "Metro area", icon: "🏙️", selected: false },
];

export default function PreferencesCard() {
  return (
    <div className="bg-dark-base rounded-card p-5 shadow-elevation-2 border border-divider text-headline w-full max-w-2xl">
      {/* 헤더: 진행 표시 */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-type-caption uppercase tracking-wider text-body-secondary">
          Onboarding
        </span>
        <span className="text-type-caption text-body-secondary">
          Step 1 of 5
        </span>
      </div>
      <div className="h-1 rounded-full bg-white/10 mb-4 overflow-hidden">
        <div
          className="h-full rounded-full bg-accent-primary"
          style={{ width: "20%" }}
        />
      </div>

      {/* 본문: 관계 + 위치 2열 */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* 왼쪽 - 관계 타입 (정적 표시) */}
        <div>
          <p className="text-type-body-sm font-semibold text-headline mb-0.5">
            What kind of relationship are you looking for?
          </p>
          <p className="text-type-caption text-body-secondary mb-2">
            Select the option that best describes your current intent.
          </p>
          <div className="space-y-2">
            {RELATIONSHIP_OPTIONS.map((opt) => (
              <div
                key={opt.label}
                className={`flex items-center gap-3 rounded-card border px-3 py-2 text-left ${
                  opt.selected
                    ? "border-accent-primary bg-accent-primary/10"
                    : "border-white/15 bg-white/5"
                }`}
              >
                <span className="text-sm opacity-90">{opt.icon}</span>
                <span className="flex-1 min-w-0">
                  <span className="block text-type-body-sm font-medium text-headline truncate">
                    {opt.label}
                  </span>
                  <span className="block text-type-caption text-body-secondary truncate">
                    {opt.desc}
                  </span>
                </span>
                <span
                  className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center ${
                    opt.selected
                      ? "border-accent-primary bg-accent-primary"
                      : "border-white/40"
                  }`}
                >
                  {opt.selected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cta-dark" />
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽 - 위치 (정적 표시) */}
        <div className="space-y-4">
          <div>
            <p className="text-type-body-sm font-semibold text-headline mb-1">
              Where are you?
            </p>
            <div className="flex items-center gap-2 rounded-card bg-white/5 border border-white/15 px-3 py-2 mb-1">
              <span className="text-body-secondary">🔍</span>
              <span className="text-type-caption text-body-secondary flex-1">
                Search city or zip code
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-card bg-white/5 border border-white/15 px-3 py-2 text-type-body-sm text-headline">
              <span>✈️</span>
              Use Current Location
            </div>
          </div>

          <div>
            <p className="text-type-body-sm font-semibold text-headline mb-2">
              Search Distance
            </p>
            <div className="grid grid-cols-2 gap-2">
              {DISTANCE_OPTIONS.map((opt) => (
                <div
                  key={opt.label}
                  className={`rounded-card border px-3 py-2 text-left ${
                    opt.selected
                      ? "border-accent-primary bg-accent-primary/10"
                      : "border-white/15 bg-white/5"
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-sm opacity-80">{opt.icon}</span>
                    <span
                      className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 flex items-center justify-center ${
                        opt.selected
                          ? "border-accent-primary bg-accent-primary"
                          : "border-white/40"
                      }`}
                    >
                      {opt.selected && (
                        <span className="w-1 h-1 rounded-full bg-cta-dark" />
                      )}
                    </span>
                  </div>
                  <span className="block text-type-body-sm font-medium text-headline mt-1">
                    {opt.label}
                  </span>
                  <span className="block text-type-caption text-body-secondary uppercase text-[10px]">
                    {opt.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
