/**
 * site.ts — Single source of truth for site-wide metadata.
 *
 * Import from here instead of hardcoding strings across layout.tsx,
 * page.tsx, next.config.ts, and JSON-LD schemas.
 */

export const siteConfig = {
  name: "R Ceramica",
  tagline: "Redefining Spaces",
  url: "https://rceramica.com",

  description:
    "R Ceramica — premium porcelain and ceramic surfaces. Explore our collection of architectural tiles, luxury bathrooms, and innovative sanitaryware.",

  shortDescription: "Premium porcelain and ceramic surfaces for architectural excellence.",

  contact: {
    phone: "+91-94274-10127",
    whatsapp: "+919427410127",
    email: "info@rceramica.com",
  },

  address: {
    street: "Opp. Ceramic City, 8-A National Highway",
    city: "Morbi",
    state: "Gujarat",
    postalCode: "363642",
    country: "IN",
    countryFull: "India",
  },

  socials: {
    instagram: "https://www.instagram.com/rceramica",
    facebook: "https://www.facebook.com/rceramica",
  },

  /** Absolute URL to the OG/Twitter share image (1200×630 px) */
  ogImage: "/og-image.jpg",

  /** Google Fonts currently loaded in layout.tsx */
  fonts: {
    sans: "Inter",
    display: "Outfit",
  },

  /** Supported UI locales — mirrors LANGUAGES in lib/constants/navigation.ts */
  locales: ["en", "fr", "it"] as const,
  defaultLocale: "en" as const,

  keywords: [
    "porcelain tiles",
    "ceramic surfaces",
    "luxury tiles",
    "bathroom fixtures",
    "architectural surfaces",
    "R Ceramica",
  ],
} as const;

export type SiteLocale = (typeof siteConfig.locales)[number];
