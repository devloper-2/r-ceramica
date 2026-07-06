import { Inter, Outfit } from "next/font/google";

/**
 * fonts.ts — self-hosted Google fonts (loaded via next/font, no CDN request).
 * The CSS variables are attached to <html> in pages/_document.tsx so the whole
 * app can use var(--font-inter) / var(--font-outfit) through theme.css.
 */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500"],
  display: "swap",
});
