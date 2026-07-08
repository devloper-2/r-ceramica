import type { HeroContent, ExploreContent } from "@/lib/types";

export const EXPLORE_HERO: HeroContent = {
  eyebrow: "Collections",
  title: "Explore Categories",
  description:
    "Discover our complete range of luxury sanitaryware, faucets, showers and premium bathroom solutions.",
  mediaType: "image",
  mediaSrc: "/images/ecothermalkilns.webp", // apni image
  mediaAlt: "R Ceramica Explore Collections",

  cta: {
    label: "Explore Now",
    href: "#categories", // ya "/contact"
    variant: "gold",
  },

  fullHeight: false,
};

export const EXPLORE_CATEGORIES: ExploreContent[] = [
  {
    eyebrow: "Designer Range",
    title: "Luxury\nShowers",
    description:
      "Advanced hydro-therapy systems designed for the ultimate wellness experience.",
    image: "/images/csection1.webp",
    imageAlt: "Luxury Showers",
    href: "/showers",
    linkLabel: "Explore Models",
  },

  {
    eyebrow: "Geometric Precision",
    title: "Artisan\nFaucets",
    description:
      "Precision engineered hardware defining the intersection of fluid dynamics and sculpture.",
    image: "/images/csection2.webp",
    imageAlt: "Artisan Faucets",
    href: "/faucets",
    linkLabel: "Technical Series",
  },

   {
    eyebrow: "Hygiene Systems",
    title: "Sanitary\Form",
    description:
      "High-performance water closets connecting ergonomic form and sustainability for contemporary living.",
    image: "/images/csection3.webp",
    imageAlt: "Browse Complete Series",
    href: "/faucets",
    linkLabel: "Browse Complete Series",
  },
];