import { Building2, Globe, Headset, Smartphone } from "lucide-react";
import type {
  HeroContent,
  SpaceCard,
  FeatureCard,
  CarouselSlide,
  SocialPost,
  NarrativeContent,
} from "@/lib/types";

/**
 * constants/home.ts — All content shown on the HOME page (`/`).
 *
 * Each export below is the DATA for one reusable section. The page file
 * (src/app/page.tsx) only wires this data into the shared section components.
 * To change homepage copy or imagery, edit here — never the section components.
 */

// ─── Hero ─────────────────────────────────────────────────────────────────────
export const HOME_HERO: HeroContent = {
  title: "Redefining Spaces",
  mediaType: "video",
  mediaSrc:
    "/images/bathroomvideo.mp4",
  cta: { label: "Explore Collection", href: "/products" },
  fullHeight: true,
};

// ─── Architectural Spaces (MediaGrid) ─────────────────────────────────────────
export const SPACE_CARDS: SpaceCard[] = [
  {
    label: "Materiality",
    title: "Culinary\nStudios",
    imageSrc:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Designer Kitchen with premium ceramic surfaces",
    href: "/explore",
  },
  {
    label: "Precision",
    title: "Expansive\nLiving",
    imageSrc:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Expansive living space with architectural porcelain",
    href: "/bathrooms",
  },
];

// ─── Spotlight (ProductCarousel) ──────────────────────────────────────────────
export const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    title: "Petra Vessel",
    subtitle: "Natural Granite / Matte Finish",
    videoSrc:
      "https://hindwarestg.blob.core.windows.net/container1/products/ae5eb07a-52f8-45fa-98ea-c427f8dde36f.mp4",
  },
  {
    title: "Obsidian Mono",
    subtitle: "Hand-Carved Basalt / Textured",
    videoSrc:
      "https://assets.mixkit.co/videos/preview/mixkit-modern-bathroom-interior-4158-large.mp4",
  },
  {
    title: "Calcite Flow",
    subtitle: "Sandstone / Minimalist",
    videoSrc:
      "https://assets.mixkit.co/videos/preview/mixkit-hand-spraying-water-on-the-ceramic-31834-large.mp4",
  },
];

// ─── Business Support (FeatureCards) ──────────────────────────────────────────
export const HOME_FEATURES: FeatureCard[] = [
  {
    icon: Building2,
    title: "Institutional\nBusiness",
    description: "Project solutions for institutional & business clients",
    linkLabel: "Explore Projects",
    href: "/about",
  },
  {
    icon: Globe,
    title: "International\nBusiness",
    description: "Our global footprint and operational countries",
    linkLabel: "Global Reach",
    href: "/about",
  },
  {
    icon: Headset,
    title: "Service &\nSupport",
    description: "Installation assistance and technical requests",
    linkLabel: "Connect Now",
    href: "/contact",
  },
  {
    icon: Smartphone,
    title: "Download\nService App",
    description: "Manage your space from your fingertips",
    linkLabel: "Download Now",
    href: "/catalogue",
    inverted: true,
  },
];

// ─── Legacy (NarrativeSection) ────────────────────────────────────────────────
export const HOME_NARRATIVE: NarrativeContent = {
  eyebrow: "Insight & Heritage",
  title: "The Legacy of\nArchitectural\nSurfaces",
  lead: "Merging traditional craftsmanship with state-of-the-art nanotechnology to redefine modern porcelain engineering.",
  paragraphs: [
    "R Ceramica — an exclusive porcelain and ceramic brand, has established its presence through decades of innovation, merging traditional craftsmanship with cutting-edge nanotechnology production. Our manufacturing units in key industrial hubs are equipped with first-for-industry thermal efficiency systems, ensuring every slab meets the highest architectural standards.",
    "With a curated network of over 200+ exclusive studios across international markets, we bring a sensory-driven approach to architectural surfaces. Our commitment to sustainability isn't just a corporate statement; it's embedded in our supply chain, from raw material extraction to the final tactile finish of our large-format porcelain slabs.",
    "Whether you are designing a high-traffic commercial space or a minimalist private residence, R Ceramica provides the technical data and aesthetic versatility required to transcend the limits of traditional design. Our portfolio spans the world's most prestigious projects, reflecting our status as a cornerstone of modern architectural surface engineering.",
  ],
  cta: { label: "Enquire Now", href: "/contact" },
  watermark: "Excellence Through Innovation",
};

// ─── Social Feed ──────────────────────────────────────────────────────────────
export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 1,
    imageSrc:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Luxury contemporary bathroom with architectural porcelain slabs",
  },
  {
    id: 2,
    imageSrc:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Detailed view of luxury ceramic surface textures",
  },
  {
    id: 3,
    imageSrc:
      "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Minimalist residential living with high-end floor tiles",
  },
  {
    id: 4,
    imageSrc:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Architectural surface applications in modern design",
  },
  {
    id: 5,
    imageSrc:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Modern kitchen backsplash with premium tiling",
  },
];
