import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

/**
 * types/index.ts — Shared TypeScript interfaces.
 *
 * These describe the DATA that reusable sections receive as props.
 * A "section" (Hero, MediaGrid, FeatureCards, NarrativeSection…) is written
 * once and reused on many pages — only the data below changes per page.
 */

// ─── Navigation ───────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}

export interface Language {
  code: string;
  label: string;
}

// ─── Shared call-to-action ────────────────────────────────────────────────────
/** A reusable button/link pair used by Hero, NarrativeSection, etc. */
export interface CtaLink {
  label: string;
  href: string;
  className?: string;
  variant?: "outline" | "solid" | "ghost" | "gold";
}

// ─── Hero (reusable across Home, About, and future pages) ─────────────────────
export interface HeroContent {
  /** Small overline text above the title (optional). */
  eyebrow?: string;
  title: string;
  /** "video" for the homepage hero, "image" for lighter inner pages. */
   /** Optional description below the hero title. */
  description?: string;
  mediaType: "video" | "image";
  mediaSrc: string;
  /** Required (for a11y) when mediaType is "image". */
  mediaAlt?: string;
  cta?: CtaLink;
  /** true → full viewport height (home); false → shorter inner-page hero. */
  fullHeight?: boolean;
}

// ─── Media Grid card (reusable — "Architectural Spaces", "Our Values"…) ───────
export interface SpaceCard {
  label: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

// ─── Feature card (reusable — "Business Support", "Our Capabilities"…) ────────
export interface FeatureCard {
  /** A lucide-react icon component, e.g. `Building2` (passed, not rendered). */
  icon: LucideIcon;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  /** Renders the card in the inverted (light) colour scheme. */
  inverted?: boolean;
}

// ─── Narrative / long-form text section (reusable "Legacy", "Our Story"…) ─────
export interface NarrativeContent {
  eyebrow: string;
  /** Large heading — supports `\n` for manual line breaks. */
  title: string;
  /** Bold intro line shown above the body copy. */
  lead: string;
  paragraphs: string[];
  cta?: CtaLink;
  /** Faint oversized background text (optional decoration). */
  watermark?: string;
}

// ─── Carousel ─────────────────────────────────────────────────────────────────
export interface CarouselSlide {
  title: string;
  subtitle: string;
  videoSrc: string;
}

// ─── Social ───────────────────────────────────────────────────────────────────
export interface SocialLink {
  platform: string;
  href: string;
  ariaLabel: string;
}

export interface SocialPost {
  imageSrc: string;
  imageAlt: string;
  id: number;
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

export type { ReactNode };
