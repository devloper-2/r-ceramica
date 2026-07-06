import type { ExploreCategory } from "@/components/sections/ExploreCategories";

/**
 * tiles.ts — DATA for the /tiles ("Explore") page. Each entry is a full-screen
 * band rendered by <ExploreCategories>. Ported from static-html/explore.html.
 */
export const TILES_CATEGORIES: ExploreCategory[] = [
  {
    eyebrow: "Heritage Collection",
    title: "Architectural",
    titleLine2: "Surfaces",
    italicAccent: true,
    description: "Curated porcelain systems for high-envelope architecture.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80",
    alt: "Architectural porcelain surfaces",
    cta: { label: "View Collection", href: "/products?category=tiles", variant: "arrow" },
  },
  {
    eyebrow: "Designer Range",
    title: "Luxury",
    titleLine2: "Showers",
    description:
      "Advanced hydro-therapy systems designed for the ultimate wellness experience.",
    image:
      "https://images.unsplash.com/photo-1620626014330-f99a0937285d?auto=format&fit=crop&q=80",
    alt: "Luxury showers",
    cta: { label: "Explore Models", href: "/bathrooms" },
  },
  {
    eyebrow: "Geometric Precision",
    title: "Artisan",
    titleLine2: "Faucets",
    description:
      "Precision engineered hardware defining the intersection of fluid dynamics and sculpture.",
    image:
      "https://images.unsplash.com/photo-1584622781514-f670c2269a84?auto=format&fit=crop&q=80&w=1600",
    alt: "Artisan faucets",
    cta: { label: "Technical Series", href: "/bathrooms", variant: "arrow" },
  },
  {
    eyebrow: "Hygiene Systems",
    title: "Sanitary",
    titleLine2: "Form",
    description:
      "High-performance water closets connecting ergonomic form and sustainability for contemporary living.",
    image:
      "https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=1600",
    alt: "Sanitary forms",
    cta: { label: "Browse Complete Series", href: "/bathrooms", variant: "button" },
  },
  {
    eyebrow: "Vessel Works",
    title: "Minimal",
    titleLine2: "Basins",
    description:
      "Hand-crafted artisan basins that redefine the morning ritual through stone and ceramic textures.",
    image:
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1600",
    alt: "Minimal basins",
    cta: { label: "Explore Gallery", href: "/bathrooms", variant: "button" },
  },
  {
    eyebrow: "Infrastructural",
    title: "FRP",
    titleLine2: "Manhole",
    description: "A blend of durability and sustainable performance.",
    image:
      "https://images.unsplash.com/photo-1533150423042-12714441c940?auto=format&fit=crop&q=80&w=1600",
    alt: "FRP manhole covers",
    cta: { label: "Technical Spec", href: "/login", variant: "arrow" },
  },
];
