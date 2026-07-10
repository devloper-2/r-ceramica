import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Brand Colors ─────────────────────────────────────────────────────────
      // Mapped to the CSS variables in src/app/css/theme.css so that the
      // theme file remains the single source of truth. Editing theme.css
      // updates both `var(--color-*)` usages AND `bg-brand-*` utilities.
      colors: {
        brand: {
          bg: "var(--color-bg)",
          "bg-alt": "var(--color-bg-alt)",
          "bg-card": "var(--color-bg-card)",
          surface: "var(--color-surface)",
          gold: "var(--color-gold)",
          "gold-light": "var(--color-gold-light)",
          white: "var(--color-white)",
          border: "var(--color-border)",
          "border-hover": "var(--color-border-hover)",
        },
      },
      // ─── Typography ───────────────────────────────────────────────────────────
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
      },
      // ─── Letter Spacing ───────────────────────────────────────────────────────
      letterSpacing: {
        "ultra-wide": "0.5em",
        "extra-wide": "0.4em",
        "super-wide": "0.3em",
        "mega-wide": "0.2em",
      },
      // ─── Max Widths ───────────────────────────────────────────────────────────
      maxWidth: {
        content: "1440px",
      },
      // ─── Transitions ──────────────────────────────────────────────────────────
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.23, 1, 0.32, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "700": "700ms",
        "800": "800ms",
        "2000": "2000ms",
      },
      // ─── Animations ───────────────────────────────────────────────────────────
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 1s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
