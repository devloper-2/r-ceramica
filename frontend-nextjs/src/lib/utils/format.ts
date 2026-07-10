import { siteConfig } from "@/config/site";

/**
 * format.ts — Pure formatting utilities for display values.
 *
 * All functions are side-effect-free and can be used in both
 * server and client components.
 */

// ─── Phone ────────────────────────────────────────────────────────────────────

/**
 * Formats a raw phone string into a human-readable format.
 * @example formatPhone("+919427410127") → "+91 94274 10127"
 */
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length === 12) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return raw;
}

// ─── Text ─────────────────────────────────────────────────────────────────────

/**
 * Converts a string to title case.
 * @example toTitleCase("luxury bathroom tiles") → "Luxury Bathroom Tiles"
 */
export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Truncates a string to a maximum length, appending an ellipsis.
 * @example truncate("Long product description", 15) → "Long product..."
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3).trimEnd() + "…";
}

/**
 * Converts a slug to a human-readable label.
 * @example slugToLabel("architectural-spaces") → "Architectural Spaces"
 */
export function slugToLabel(slug: string): string {
  return toTitleCase(slug.replace(/-/g, " "));
}

// ─── URL ──────────────────────────────────────────────────────────────────────

/**
 * Builds an absolute URL from a relative path using the site's base URL.
 * Avoids duplicating the base URL string across components.
 *
 * @example absoluteUrl("/products") → "https://rceramica.com/products"
 */
export function absoluteUrl(path: string, baseUrl = siteConfig.url): string {
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
