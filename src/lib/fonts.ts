import {
  Inter,
  Outfit,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Tenor_Sans,
} from "next/font/google";

/**
 * fonts.ts — self-hosted Google fonts (loaded via next/font, no CDN request).
 * The CSS variables are attached to <html> in pages/_document.tsx so the whole
 * app can use var(--font-inter) / var(--font-outfit) through theme.css.
 *
 * Inter + Outfit power the marketing pages. The account/commerce pages
 * (cart, checkout, orders, order-details, tracking) use Playfair Display +
 * Plus Jakarta Sans, and the login page uses Tenor Sans — mirroring the
 * original static mockups.
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

export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["200", "300", "400", "500", "600"],
  display: "swap",
});

export const tenor = Tenor_Sans({
  subsets: ["latin"],
  variable: "--font-tenor",
  weight: ["400"],
  display: "swap",
});
