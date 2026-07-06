import type { CarouselSlide, SpaceCard, SocialPost } from "@/lib/types";

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

export const SPACE_CARDS: SpaceCard[] = [
  {
    label: "Materiality",
    title: "Culinary\nStudios",
    imageSrc:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Designer Kitchen with premium ceramic surfaces",
    href: "/products?category=culinary",
  },
  {
    label: "Precision",
    title: "Expansive\nLiving",
    imageSrc:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Expansive living space with architectural porcelain",
    href: "/products?category=living",
  },
];

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
      "https://images.unsplash.com/photo-1620626011761-9963d7b59675?auto=format&fit=crop&q=80&w=600",
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
