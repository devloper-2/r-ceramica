import type {
  HeroContent,
} from "@/lib/types";

/**
 * constants/about.ts — All content shown on the ABOUT US page (`/about`).
 *
 * Notice these exports use the SAME types as home.ts (HeroContent, SpaceCard,
 * FeatureCard, NarrativeContent). That is intentional: the About page reuses
 * the exact same section components as the homepage — only the data changes.
 * This is the pattern every new page should follow.
 */

// ─── Hero — image variant, shorter than the homepage video hero ───────────────
export const CONTACT_HERO: HeroContent = {
  eyebrow: "Connectivity",
  title: "Get In Touch",
  description: "Experience architectural excellence first hand. Our consultants are ready to assist your vision.",
  mediaType: "image",
  mediaSrc:
    "/images/contacthero.webp",
  mediaAlt: "R Ceramica architectural porcelain showroom interior",
   cta: {
    label: "Talk to Us",
    href: "/contact",
    variant: "gold",
  },
  fullHeight: false,
};
