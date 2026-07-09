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
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=1600",
  mediaAlt: "R Ceramica architectural porcelain showroom interior",
  cta: { label: "Talk to Us", href: "/contact" },
  fullHeight: false,
};

export const ABOUT_HERO_STATIC = {
  imageSrc:
    "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80",
  imageAlt: "Office Facility",
  eyebrow: "Since 1994",
  titleLine1: "The Heritage of",
  titleLine2: "Excellence",
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
      "https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Precision sanitary ware manufacturing facility",
    href: "/products",
  },
  {
    label: "Our Promise",
    title: "Sustainable\nByDesign",
    imageSrc:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=1200",
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
    href: "/catalogue",
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
export type StatAccent =
  | "amber"
  | "blue"
  | "emerald"
  | "purple";

export const ABOUT_STATS: {
  number: string;
  label: string;
  accent: StatAccent;
}[] = [
  {
    number: "20+",
    label: "Global Markets Served",
    accent: "amber",
  },
  {
    number: "5000+",
    label: "Surface Designs",
    accent: "blue",
  },
  {
    number: "30+",
    label: "Industry Awards",
    accent: "emerald",
  },
  {
    number: "12M+",
    label: "SQM Annual Production Capacity",
    accent: "purple",
  },
];
export const ABOUT_TECHNOLOGY = [
  {
    title: "Nano-Trek Tech",
    description:
      "Micro-pore sealing for absolute hygienic surfaces and stain resistance.",
    image:
      "/images/aboutecnoimg.jpg",
    accent: "blue",
  },
  {
    title: "Continuum Slabs",
    description:
      "Large format engineering allowing seamless architectural transitions.",
    image:
      "/images/continuumimg.webp",
    accent: "amber",
  },
  {
    title: "Eco-Thermal Kilns",
    description:
      "Reducing carbon footprint through revolutionary energy recovery.",
    image:
      "/images/ecothermalkilns.webp",
    accent: "emerald",
  },
];

export const ABOUT_PHILOSOPHY = {
  title: "We don't just manufacture surfaces; we engineer",
  highlight: " sensory experiences.",

  intro:
    "R Ceramica was born out of a vision to redefine the architectural landscape through high-performance porcelain and ceramic solutions.",

  description:
    "Starting as a boutique facility in Morbi, the hub of ceramic innovation, we have evolved into a global powerhouse, merging traditional craftsmanship with state-of-the-art nanotechnology. Our journey is driven by one core philosophy: the surface is the soul of any space.",

  image:
    "/images/materiallab.webp",

  imageAlt: "Material Lab",

  badgeTitle: "Technical Analysis",

  badgeText: "0.05% Water Absorption Certified",
};

export const ABOUT_CHAIRMAN = {
  backgroundText: "VISIONARY",

  heading: "Chairman's Perspective",

  quote:
    "Innovation is not about adding more features; it's about stripping away everything that isn't essential until the soul of the material is all that remains.",

  name: "Rajesh Patel",

  designation: "Founder & Chairman, R Ceramica",

  image:
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80",

  imageAlt: "Chairman",
};

export const ABOUT_FOOTPRINT = {
  eyebrow: "Global Echo",

  title: "Across\nBorders",

  description:
    "With operational hubs in Gujarat, Dubai, and emerging centers in Europe, our logistics network ensures architectural excellence is delivered to every continent without compromise.",

  cta: {
    label: "View Logistics Centers",
    href: "/contact",
  },

  image:
    "/images/wordmap.jpg",

  imageAlt: "Abstract World Map",
};