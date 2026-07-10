/**
 * seo.ts — SEO helper utilities.
 *
 * Centralizes the construction of Next.js Metadata objects and JSON-LD
 * structured data. Import these helpers in page.tsx / layout.tsx instead
 * of manually constructing metadata objects each time.
 */

import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PageSeoOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

// ─── Metadata Builder ─────────────────────────────────────────────────────────

const BASE_URL = siteConfig.url;
const SITE_NAME = siteConfig.name;
const DEFAULT_OG_IMAGE = siteConfig.ogImage;

/**
 * Builds a Next.js `Metadata` object for a given page.
 * The returned object is merged with the root layout metadata.
 *
 * @example
 *   export const metadata = buildPageMetadata({
 *     title: "Tiles",
 *     description: "Explore our premium tile collection.",
 *     path: "/tiles",
 *   });
 */
export function buildPageMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
}: PageSeoOptions): Metadata {
  const url = `${BASE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

/**
 * Generates a WebPage JSON-LD schema object.
 * Drop the result into a <script type="application/ld+json"> tag.
 *
 * @example
 *   <script
 *     type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema("/", "Home")) }}
 *   />
 */
export function webPageSchema(path: string, name: string, description?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${name} — ${SITE_NAME}`,
    url: `${BASE_URL}${path}`,
    ...(description && { description }),
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        ...(path !== "/"
          ? [{ "@type": "ListItem", position: 2, name, item: `${BASE_URL}${path}` }]
          : []),
      ],
    },
  };
}

/**
 * Generates a Product JSON-LD schema for individual product/collection pages.
 */
export function productSchema({
  name,
  description,
  image,
  url,
}: {
  name: string;
  description: string;
  image: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    url: `${BASE_URL}${url}`,
    brand: { "@type": "Brand", name: SITE_NAME },
  };
}
