export const EXPLORE_SECTIONS = [
  {
    eyebrow: "Heritage Collection",
    title: "Architectural",
    italicLine: "Surfaces",
    description:
      "Curated porcelain systems for high-envelope architecture.",
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80",
    imageAlt: "Architectural Surfaces",
    imageOpacity: 50,
    bg: "#080808",
    overlayClass:
      "bg-gradient-to-t from-black via-transparent to-transparent",
    titleTracking: "tight" as const,

    // 👇 PRODUCT PAGE
    href: "/products/architectural-surfaces",

    linkLabel: "View Product",
    linkVariant: "arrow" as const,
    isH1: true,
  },

  {
    eyebrow: "Designer Range",
    title: "Luxury\nShowers",
    description:
      "Advanced hydro-therapy systems designed for the ultimate wellness experience.",
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80",
    imageAlt: "Luxury Showers",
    imageOpacity: 30,
    bg: "#0c0c0c",
    overlayClass:
      "bg-black/30 group-hover:bg-black/10 transition-all",
    titleTracking: "wide" as const,

    href: "/products/luxury-showers",

    linkLabel: "Explore Product",
    linkVariant: "chevron" as const,
  },

  {
    eyebrow: "Geometric Precision",
    title: "Artisan\nFaucets",
    description:
      "Precision engineered hardware defining the intersection of fluid dynamics and sculpture.",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1600",
    imageAlt: "Artisan Faucets",
    imageOpacity: 50,
    bg: "#0a0a0a",
    overlayClass:
      "bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/40 to-transparent",
    contentPosition: "center" as const,
    titleTracking: "tight" as const,

    href: "/products/artisan-faucets",

    linkLabel: "View Product",
    linkVariant: "gold-arrow" as const,
  },

  {
    eyebrow: "Hygiene Systems",
    title: "Sanitary\nForm",
    description:
      "High-performance water closets connecting ergonomic form and sustainability for contemporary living.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1600",
    imageAlt: "Sanitary Form",
    imageOpacity: 40,
    bg: "#0c0c0c",
    overlayClass:
      "bg-gradient-to-b from-black/20 to-black/80",
    titleTracking: "wide" as const,

    href: "/products/sanitary-form",

    linkLabel: "Browse Product",
    linkVariant: "button" as const,
  },

  {
    eyebrow: "Vessel Works",
    title: "Minimal\nBasins",
    description:
      "Hand-crafted artisan basins that redefine the morning ritual through stone and ceramic textures.",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=1600",
    imageAlt: "Minimal Basins",
    imageOpacity: 40,
    bg: "#080808",
    overlayClass:
      "bg-gradient-to-t from-black/60 to-transparent",
    titleTracking: "wide" as const,

    href: "/products/minimal-basins",

    linkLabel: "View Product",
    linkVariant: "button" as const,
  },

  {
    eyebrow: "Infrastructural",
    title: "FRP\nManhole",
    description: [
      "A blend of durability",
      "and sustainable performance",
    ],
    image:
      "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&q=80&w=1600",
    imageAlt: "FRP Manhole",
    imageOpacity: 30,
    bg: "#060606",
    overlayClass:
      "bg-gradient-to-b from-transparent to-black/90",
    titleTracking: "wide" as const,

    href: "/products/frp-manhole",

    linkLabel: "View Technical Product",
    linkVariant: "gold-arrow" as const,
  },
];