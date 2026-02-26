/**
 * design.json 기반 디자인 토큰 상수
 * Tailwind 클래스와 함께 사용하거나 인라인 스타일에 활용
 */
export const DESIGN = {
  colors: {
    canvas: "#0E0E0F",
    contentFrame: "#D9CFBD",
    darkBase: "#0F0F10",
    headline: "#E7DFC9",
    body: "#CFC6B4",
    bodySecondary: "#A79F90",
    navText: "#1A1A1A",
    navTextHover: "#000000",
    accentPrimary: "#F05A28",
    accentHover: "#FF6A3A",
    accentActive: "#D94F20",
    accentDisabled: "#A8644A",
    accentDisabledText: "#3A2A24",
    ctaDark: "#111111",
    ctaDarkHover: "#000000",
    cardDark: "#1C1C1F",
    cardDarkHover: "#2A2A2E",
    inputCard: "#E6DDC8",
    inputCardText: "#4A463E",
    chipDefault: "#EFE6D2",
    chipBorder: "#D5CCB8",
    chipText: "#3F3A32",
    divider: "#2A2A2C",
  },
  radius: {
    frame: "28px",
    hero: "20px",
    card: "16px",
    pill: "999px",
    icon: "50%",
  },
  shadow: {
    elevation1: "0 4px 12px rgba(0,0,0,0.2)",
    elevation2: "0 8px 24px rgba(0,0,0,0.25)",
    ctaPrimary: "0 6px 16px rgba(240,90,40,0.35)",
    avatar: "0 4px 12px rgba(0,0,0,0.35)",
    integrationIcon: "0 6px 18px rgba(0,0,0,0.3)",
  },
  /** 타이포그래피: 자간(letterSpacing), 행간(lineHeight) - design.json 일관 적용 */
  typography: {
    letterSpacing: { tight: "-0.02em", normal: "0", wide: "0.04em", wider: "0.08em" },
    lineHeight: { tight: "1.15", snug: "1.25", normal: "1.5", relaxed: "1.625" },
  },
} as const;
