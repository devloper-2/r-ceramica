import { Gem, Leaf, ShieldCheck, Users } from "lucide-react";
import type {
  HeroContent,
  NarrativeContent,
  SpaceCard,
  FeatureCard,
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
export const ABOUT_HERO: HeroContent = {
  eyebrow: "Our Story",
  title: "About R Ceramica",
  mediaType: "image",
  mediaSrc:
    "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=80&w=1600",
  mediaAlt: "R Ceramica architectural porcelain showroom interior",
  cta: { label: "Talk to Us", href: "/contact" },
  fullHeight: false,
};

// ─── Our Story (NarrativeSection — same component as the homepage Legacy) ──────
export const ABOUT_NARRATIVE: NarrativeContent = {
  eyebrow: "Who We Are",
  title: "Crafting\nSurfaces Since\n1998",
  lead: "From a single kiln in Morbi to a globally recognised name in architectural porcelain, our journey has always been about one thing — surfaces that redefine spaces.",
  paragraphs: [
    "R Ceramica was founded on the belief that a surface is more than a finish — it is the foundation of how a space feels. Over two decades we have invested in nanotechnology, thermal-efficiency kilns, and a design studio that treats every slab as a canvas.",
    "Today our collections reach over 40 countries through a curated network of exclusive studios. Every tile we ship carries the same promise it did on day one: uncompromising technical performance paired with timeless aesthetics.",
    "We remain family-led and craftsmanship-driven, blending the patience of traditional ceramics with the precision of modern engineering — because the spaces our customers build deserve nothing less.",
  ],
  cta: { label: "View Collection", href: "/tiles" },
  watermark: "Since 1998",
};

// ─── Our Values (MediaGrid — same component as homepage Architectural Spaces) ──
export const ABOUT_VALUES: SpaceCard[] = [
  {
    label: "Our Craft",
    title: "Design-Led\nManufacturing",
    imageSrc:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Precision ceramic manufacturing facility",
    href: "/tiles",
  },
  {
    label: "Our Promise",
    title: "Sustainable\nByDesign",
    imageSrc:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Sustainable material sourcing and green production",
    href: "/about",
  },
];

// ─── Why Choose Us (FeatureCards — same component as homepage Business Support)─
export const ABOUT_CAPABILITIES: FeatureCard[] = [
  {
    icon: Gem,
    title: "Premium\nQuality",
    description: "Large-format slabs engineered to architectural tolerances",
    linkLabel: "Our Standards",
    href: "/tiles",
  },
  {
    icon: Leaf,
    title: "Sustainable\nProduction",
    description: "Responsible sourcing from raw material to final finish",
    linkLabel: "Our Commitment",
    href: "/about",
  },
  {
    icon: ShieldCheck,
    title: "Certified\nExcellence",
    description: "Independently tested for durability and safety",
    linkLabel: "Certifications",
    href: "#",
  },
  {
    icon: Users,
    title: "Trusted\nWorldwide",
    description: "200+ exclusive studios across 40+ countries",
    linkLabel: "Find a Studio",
    href: "/contact",
    inverted: true,
  },
];
