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

export const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",

  name: `About Us | ${siteConfig.name}`,
  url: `${siteConfig.url}/about`,
  description:
    "Discover the R Ceramica story — two decades of design-led porcelain manufacturing, sustainable production, and surfaces trusted worldwide.",

  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About Us",
        item: `${siteConfig.url}/about`,
      },
    ],
  },
} as const;

export const explorePageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",

  name: `Explore Collections | ${siteConfig.name}`,
  url: `${siteConfig.url}/explore`,
  description:
    "Explore R Ceramica's luxury sanitaryware, faucets, showers and premium collections.",
} as const;

// ─── Contact Page ─────────────────────────────────────────────────────────────

export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",

  name: `Contact | ${siteConfig.name}`,
  url: `${siteConfig.url}/contact`,
  description:
    "Contact R Ceramica for porcelain slabs, exports, dealership and project inquiries.",

  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: `${siteConfig.url}/contact`,
      },
    ],
  },

  mainEntity: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
  },
} as const;
