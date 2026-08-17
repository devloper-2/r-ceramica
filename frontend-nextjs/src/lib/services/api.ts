/**
 * services/api.ts — Typed client for the CodeIgniter content API (/api/v1).
 *
 * Used at BUILD TIME by getStaticProps/getStaticPaths (server-side, so the
 * API key stays out of the browser bundle). Every response uses the envelope
 * { data, meta }; these helpers unwrap and return `data`.
 */

const BASE = process.env.CONTENT_API_URL ?? "http://localhost:8080/api/v1";
const KEY = process.env.CONTENT_API_KEY ?? "";

// ─── Response shapes (loosely typed — content is prop data for sections) ──────
export interface ApiSection {
  id: string | number;
  type: string;
  sort_order: string | number;
  // Section content is prop data whose shape varies per `type`; the page maps
  // it onto the matching section component, so it stays intentionally untyped.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
}

export interface ApiPage {
  id: string | number;
  slug: string;
  title: string;
  meta_title?: string | null;
  meta_description?: string | null;
  status: string;
  sections: ApiSection[];
}

export interface ApiProductListItem {
  id: string | number;
  slug: string;
  name: string;
  short_description?: string | null;
  price: number;
  currency: string;
  category?: string | null;
  category_name?: string | null;
  subcategory?: string | null;
  subcategory_name?: string | null;
  image?: string | null;
}

export interface ApiSubcategory {
  id: string | number;
  category_id: string | number;
  slug: string;
  name: string;
  subtitle?: string | null;
  description?: string | null;
  image?: string | null;
  sort_order?: string | number;
  status?: string;
}

export interface ApiCategory {
  id: string | number;
  slug: string;
  name: string;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  image?: string | null;
  hero_eyebrow?: string | null;
  hero_title?: string | null;
  hero_subtitle?: string | null;
  hero_image?: string | null;
  subcategories?: ApiSubcategory[];
}

export interface ApiSubcategoryDetail extends ApiSubcategory {
  category_slug?: string | null;
  category_name?: string | null;
  category_title?: string | null;
  products: ApiProductListItem[];
}

export interface ApiCatalogue {
  id: string | number;
  slug: string;
  title: string;
  title_line2?: string | null;
  eyebrow?: string | null;
  sub?: string | null;
  pages?: number | null;
  size?: string | null;
  badge_label?: string | null;
  badge_gold?: number | string;
  spine_gold?: number | string;
  spine_label?: string | null;
  image?: string | null;
  img_opacity?: number | string;
  availability?: "green" | "yellow";
  avail_label?: string | null;
  tags?: string[] | null;
  technical?: number | string;
  pdf_path?: string | null;
}

// Media map loaded at build time to rewrite external URLs to local downloads.
// In Next.js getStaticProps, `fs` works normally.
let mediaMap: Record<string, string> | null = null;
function loadMediaMap() {
  if (mediaMap !== null) return;
  mediaMap = {};
  if (typeof window === "undefined") {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const fs = require("node:fs");
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const path = require("node:path");
      const mapPath = path.join(process.cwd(), "src/lib/generated/media-map.json");
      if (fs.existsSync(mapPath)) {
        mediaMap = JSON.parse(fs.readFileSync(mapPath, "utf8"));
      }
    } catch (err) {
      // ignore
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rewriteMediaUrls(obj: any): any {
  if (!obj || !mediaMap) return obj;
  if (typeof obj === "string") {
    return mediaMap[obj] || obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(rewriteMediaUrls);
  }
  if (typeof obj === "object") {
    const newObj: Record<string, unknown> = {};
    for (const key in obj) {
      newObj[key] = rewriteMediaUrls(obj[key]);
    }
    return newObj;
  }
  return obj;
}

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "X-API-Key": KEY },
  });
  if (!res.ok) {
    throw new Error(`Content API ${path} responded ${res.status}`);
  }
  const json = (await res.json()) as { data: T };
  loadMediaMap();
  return rewriteMediaUrls(json.data) as T;
}

export const api = {
  getPage: (slug: string) => apiGet<ApiPage>(`/pages/${slug}`),
  getPages: () => apiGet<Array<Pick<ApiPage, "slug" | "title" | "meta_title" | "meta_description">>>(`/pages`),
  getProducts: (category?: string) =>
    apiGet<ApiProductListItem[]>(`/products${category ? `?category=${encodeURIComponent(category)}` : ""}`),
  getProductsBySubcategory: (subcategory: string) =>
    apiGet<ApiProductListItem[]>(`/products?subcategory=${encodeURIComponent(subcategory)}`),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getProduct: (slug: string) => apiGet<Record<string, any>>(`/products/${slug}`),
  getCategories: () => apiGet<ApiCategory[]>(`/categories`),
  getCategory: (slug: string) => apiGet<ApiCategory>(`/categories/${slug}`),
  getSubcategory: (slug: string) => apiGet<ApiSubcategoryDetail>(`/subcategories/${slug}`),
  getCatalogues: () => apiGet<ApiCatalogue[]>(`/catalogues`),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getNavigation: () => apiGet<any[]>(`/navigation`),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getSettings: () => apiGet<Record<string, any>>(`/settings`),
};

/**
 * Index a page's sections by `type` → content. Home/About use unique types,
 * so this gives ergonomic access (`s.hero`, `s.mediaGrid`). For pages that
 * repeat a type, use the raw `page.sections` array instead.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sectionsByType(sections: ApiSection[]): Record<string, any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const map: Record<string, any> = {};
  for (const s of sections) {
    if (!(s.type in map)) {
      map[s.type] = s.content;
    }
  }
  return map;
}
