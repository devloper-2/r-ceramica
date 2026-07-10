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

export const NAV_LINKS: SiteLink[] = data.nav;
export const LANGUAGES: SiteLanguage[] = data.languages;
export const FOOTER_QUICK_LINKS: SiteLink[] = data.footer.quickLinks;
export const FOOTER_CORPORATE_LINKS: SiteLink[] = data.footer.corporateLinks;
export const CONTACT = data.contact;
export const ADDRESS = data.address;
export const SOCIALS = data.socials;
export const SITE = data.site;

/** tel:/wa.me links want digits only. */
export function digits(value: string): string {
  return (value || "").replace(/[^\d]/g, "");
}
