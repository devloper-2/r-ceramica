/**
 * services/site-data.ts — Typed accessors for the site-wide CMS data
 * (navigation, footer links, contact, socials) used by the global Navbar and
 * Footer, which render on every page.
 *
 * The data lives in `src/lib/generated/site-data.json`, refreshed from the API
 * at build time by `scripts/gen-site-data.mjs`. The committed JSON is a valid
 * fallback so a build never breaks if the API is unreachable.
 */
import data from "@/lib/generated/site-data.json";

export interface SiteLink {
  label: string;
  href: string;
}
export interface SiteLanguage {
  code: string;
  label: string;
}

/**
 * The primary menu is SYSTEM-FIXED by design — it is not editable from the
 * admin panel. Explore drives the Category → Subcategory → Product tree;
 * Catalogue and the landing pages round out the site.
 */
export const NAV_LINKS: SiteLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Explore", href: "/explore" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "Contact Us", href: "/contact" },
];

export const LANGUAGES: SiteLanguage[] = data.languages;

/** Footer quick links kept in sync with the fixed menu (no dead routes). */
export const FOOTER_QUICK_LINKS: SiteLink[] = [
  { label: "Explore", href: "/explore" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];
export const FOOTER_CORPORATE_LINKS: SiteLink[] = data.footer.corporateLinks;
export const CONTACT = data.contact;
export const ADDRESS = data.address;
export const SOCIALS = data.socials;
export const SITE = data.site;

/** tel:/wa.me links want digits only. */
export function digits(value: string): string {
  return (value || "").replace(/[^\d]/g, "");
}
