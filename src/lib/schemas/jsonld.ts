/**
 * jsonld.ts — Reusable JSON-LD structured data schemas.
 *
 * These factory functions replace the inline JSON-LD objects in
 * layout.tsx and page.tsx, making schemas reusable and testable.
 *
 * Usage in a Server Component or layout:
 *   import { organizationSchema } from "@/lib/schemas";
 *
 *   <script
 *     type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
 *   />
 */

import { siteConfig } from "@/config/site";

// ─── Organization ─────────────────────────────────────────────────────────────

/**
 * Top-level Organization schema — placed once in the root layout.
 * Tells search engines who runs the site.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.contact.phone,
    contactType: "customer service",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  },
  sameAs: [siteConfig.socials.instagram, siteConfig.socials.facebook],
} as const;

// ─── WebSite ──────────────────────────────────────────────────────────────────

/**
 * WebSite schema — enables Google's Sitelinks Searchbox.
 * Add to the root layout alongside organizationSchema.
 */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
} as const;

// ─── Home WebPage ─────────────────────────────────────────────────────────────

/**
 * Homepage WebPage schema — used in src/app/page.tsx.
 */
export const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `${siteConfig.name} — ${siteConfig.tagline}`,
  url: siteConfig.url,
  description: siteConfig.shortDescription,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
    ],
  },
} as const;
