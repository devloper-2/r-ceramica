import type { ProductCardData } from "@/components/ui/ProductCard";

/**
 * products.ts — DATA for the /products listing (ported from products.html).
 * Cart quantity is demo/local per card; no real cart backend.
 */

/** Maps a ?category id to its display title (ported from products.html). */
export const CATEGORY_MAP: Record<string, string> = {
  "101": "Rivo Collection",
  "201": "Curve Collection",
  "301": "Eva Collection",
  "401": "Roma Collection",
  "501": "Artiz Collection",
  fusion: "Fusion Collection",
  tiles: "Architectural Surfaces",
  sanitary: "Sanitary Forms",
  culinary: "Culinary Studios",
  living: "Expansive Living",
  showers: "Luxury Showers",
  basins: "Minimal Basins",
};

export const PRODUCTS: ProductCardData[] = [
  { id: 1, name: "Fusion Basin Mixer", collection: "Fusion", code: "F10201CL", price: "12,450", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600" },
  { id: 2, name: "Prime Wall Mixer", collection: "Fusion", code: "F10202WM", price: "18,200", img: "https://images.unsplash.com/photo-1620626011761-9963d7b59675?auto=format&fit=crop&q=80&w=600" },
  { id: 3, name: "Eco High Neck Faucet", collection: "Fusion", code: "E10301HN", price: "8,900", img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600" },
  { id: 4, name: "Sleek Pillar Cock", collection: "Fusion", code: "S10401PC", price: "4,650", img: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=600" },
  { id: 5, name: "Grand Shower Arm", collection: "Fusion", code: "G10501SA", price: "14,000", img: "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?auto=format&fit=crop&q=80&w=600" },
  { id: 6, name: "Urban Bath Spout", collection: "Fusion", code: "U10601BS", price: "6,200", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600" },
  { id: 7, name: "Nova Concealed Valve", collection: "Fusion", code: "N10701CV", price: "5,500", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600" },
  { id: 8, name: "Zen Exposed Mixer", collection: "Fusion", code: "Z10801EM", price: "22,400", img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=600" },
  { id: 9, name: "Aero Hand Shower", collection: "Fusion", code: "A10901HS", price: "3,800", img: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=600" },
  { id: 10, name: "Minimal Diverter", collection: "Fusion", code: "M11001DV", price: "9,500", img: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=600" },
  { id: 11, name: "Artisan Glass Basin", collection: "Sanitary", code: "G20101VB", price: "32,000", img: "https://images.unsplash.com/photo-1620626014330-f99a0937285d?auto=format&fit=crop&q=80&w=600" },
  { id: 12, name: "Shadow Granite Slab", collection: "Tiles", code: "SG501", price: "450 / sqft", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800" },
];

/** Pick which products to display for a given category (demo logic from source). */
export function productsForCategory(categoryId: string): ProductCardData[] {
  if (categoryId === "tiles") return PRODUCTS.filter((p) => p.collection === "Tiles");
  if (categoryId === "sanitary") return PRODUCTS.filter((p) => p.collection === "Sanitary");
  return PRODUCTS;
}
