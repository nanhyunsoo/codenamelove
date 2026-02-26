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
        display: ["Playfair Display", "Didot", "serif"],
        sans: ["Inter", "SF Pro", "system-ui", "sans-serif"],
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
