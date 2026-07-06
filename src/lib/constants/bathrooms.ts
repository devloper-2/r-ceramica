/**
 * bathrooms.ts — DATA for the /bathrooms page (ported from faucets.html).
 */

export interface CollectionCard {
  id: string;
  name: string;
  image: string;
}

export interface FeatureTile {
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

export const BATHROOMS_HERO = {
  eyebrow: "Water Engineering",
  title: "The Art of",
  titleLine2: "Fluidity",
  description:
    "Precision-engineered faucet collections where architectural geometry meets the sensory experience of water.",
  image:
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80",
  alt: "Luxury faucets",
};

export const FUSION_COLLECTIONS: CollectionCard[] = [
  { id: "101", name: "RIVO COLLECTION", image: "https://images.unsplash.com/photo-1620626011761-9963d7b59675?auto=format&fit=crop&q=80&w=600" },
  { id: "201", name: "CURVE COLLECTION", image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600" },
  { id: "301", name: "EVA COLLECTION", image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=600" },
  { id: "401", name: "ROMA COLLECTION", image: "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?auto=format&fit=crop&q=80&w=600" },
  { id: "501", name: "ARTIZ COLLECTION", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600" },
  { id: "601", name: "METRO COLLECTION", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600" },
  { id: "701", name: "IRIS COLLECTION", image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=600" },
  { id: "801", name: "CADIZ COLLECTION", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=600" },
];

export const SHOWER_TILES: FeatureTile[] = [
  {
    title: "Overhead Series",
    subtitle: "View Models",
    image: "https://images.unsplash.com/photo-1620626014330-f99a0937285d?auto=format&fit=crop&q=80&w=800",
    href: "/products?category=showers",
  },
  {
    title: "Body Jets",
    subtitle: "View Models",
    image: "https://images.unsplash.com/photo-1584622781514-f670c2269a84?auto=format&fit=crop&q=80&w=800",
    href: "/products?category=showers",
  },
  {
    title: "Hand Showers",
    subtitle: "View Models",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800",
    href: "/products?category=showers",
  },
];

export const SANITARY_TILES: FeatureTile[] = [
  {
    title: "Water Closets",
    subtitle: "Explore Series",
    image: "https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=1200",
    href: "/products?category=sanitary",
  },
  {
    title: "Artisan Basins",
    subtitle: "Explore Series",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
    href: "/products?category=basins",
  },
];
