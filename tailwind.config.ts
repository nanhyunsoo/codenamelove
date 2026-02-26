import type { Config } from "tailwindcss";

/**
 * design.json 기반 Tailwind 테마 토큰화
 * 색상/라운드/섀도/타이포그래피 스케일을 theme로 매핑
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Global canvas & frame */
        canvas: "#0E0E0F",
        "content-frame": "#D9CFBD",
        "dark-base": "#0F0F10",
        /* Typography */
        headline: "#E7DFC9",
        body: "#CFC6B4",
        "body-secondary": "#A79F90",
        "nav-text": "#1A1A1A",
        "nav-text-hover": "#000000",
        /* CTA & Accent */
        "accent-primary": "#F05A28",
        "accent-hover": "#FF6A3A",
        "accent-active": "#D94F20",
        "accent-disabled": "#A8644A",
        "accent-disabled-text": "#3A2A24",
        /* Buttons */
        "cta-dark": "#111111",
        "cta-dark-hover": "#000000",
        /* Cards & Surfaces */
        "card-dark": "#1C1C1F",
        "card-dark-hover": "#2A2A2E",
        "input-card": "#E6DDC8",
        "input-card-text": "#4A463E",
        "chip-default": "#EFE6D2",
        "chip-border": "#D5CCB8",
        "chip-text": "#3F3A32",
        /* Divider */
        divider: "#2A2A2C",
      },
      borderRadius: {
        frame: "28px",
        hero: "20px",
        card: "16px",
        pill: "999px",
      },
      boxShadow: {
        "elevation-1": "0 4px 12px rgba(0,0,0,0.2)",
        "elevation-2": "0 8px 24px rgba(0,0,0,0.25)",
        "cta-primary": "0 6px 16px rgba(240,90,40,0.35)",
        avatar: "0 4px 12px rgba(0,0,0,0.35)",
        "integration-icon": "0 6px 18px rgba(0,0,0,0.3)",
      },
      fontFamily: {
        display: ["Playfair Display", "Didot", "Georgia", "serif"],
        sans: ["Inter", "SF Pro", "system-ui", "-apple-system", "sans-serif"],
      },
      /* 타이포그래피 스케일: 자간(tracking), 행간(lineHeight) 통일 */
      fontSize: {
        /* Display: Hero 헤드라인 */
        "type-display": ["clamp(2.25rem,5vw,3.75rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "type-display-lg": ["clamp(3rem,6vw,4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        /* Title: H1, H2 */
        "type-h1": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "type-h2": ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        "type-h3": ["1.125rem", { lineHeight: "1.35", letterSpacing: "0" }],
        /* Body */
        "type-body": ["1rem", { lineHeight: "1.625", letterSpacing: "0" }],
        "type-body-lg": ["1.25rem", { lineHeight: "1.5", letterSpacing: "0" }],
        "type-body-sm": ["0.875rem", { lineHeight: "1.5", letterSpacing: "0.01em" }],
        /* Caption: 라벨, 메타 */
        "type-caption": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.04em" }],
        "type-caption-sm": ["0.6875rem", { lineHeight: "1.35", letterSpacing: "0.05em" }],
      },
      letterSpacing: {
        "type-tight": "-0.02em",
        "type-normal": "0",
        "type-wide": "0.04em",
        "type-wider": "0.08em",
      },
      lineHeight: {
        "type-tight": "1.2",
        "type-snug": "1.35",
        "type-normal": "1.5",
        "type-relaxed": "1.625",
      },
      spacing: {
        "content-padding": "32px",
        "hero-padding": "56px",
        "header-cta-padding": "10px 18px",
        "primary-cta-padding": "14px 28px",
      },
    },
  },
  plugins: [],
};

export default config;
