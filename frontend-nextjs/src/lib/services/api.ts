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
  image?: string | null;
}

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "X-API-Key": KEY },
  });
  if (!res.ok) {
    throw new Error(`Content API ${path} responded ${res.status}`);
  }
  const json = (await res.json()) as { data: T };
  return json.data;
}

export const api = {
  getPage: (slug: string) => apiGet<ApiPage>(`/pages/${slug}`),
  getPages: () => apiGet<Array<Pick<ApiPage, "slug" | "title" | "meta_title" | "meta_description">>>(`/pages`),
  getProducts: (category?: string) =>
    apiGet<ApiProductListItem[]>(`/products${category ? `?category=${encodeURIComponent(category)}` : ""}`),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getProduct: (slug: string) => apiGet<Record<string, any>>(`/products/${slug}`),
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
