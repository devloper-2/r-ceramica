/**
 * services/products.ts — Data-fetching functions for products.
 *
 * All CMS/API calls for tiles, bathrooms, and accessories live here.
 * Components never fetch directly — they call these functions instead.
 *
 * Wire up to your CMS (Sanity, Contentful, etc.) by replacing the
 * placeholder implementations below.
 */

// ─── Types (import from @/lib/types when defined) ────────────────────────────

export interface Product {
  slug: string;
  name: string;
  category: "tiles" | "bathrooms" | "accessories";
  description: string;
  image: string;
}

// ─── Fetchers ─────────────────────────────────────────────────────────────────

export async function fetchProducts(category?: Product["category"]): Promise<Product[]> {
  // TODO: Replace with CMS query
  // e.g. return sanityClient.fetch(groq`*[_type == "product" && category == $category]`, { category })
  void category;
  return [];
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  // TODO: Replace with CMS query
  void slug;
  return null;
}
