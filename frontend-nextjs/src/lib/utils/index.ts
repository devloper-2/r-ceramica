/**
 * lib/utils/index.ts — Barrel export for all utility functions.
 *
 * Import from "@/lib/utils" instead of individual files:
 *   import { cn, truncate, buildPageMetadata } from "@/lib/utils";
 */

export { cn } from "./cn";
export { formatPhone, toTitleCase, truncate, slugToLabel, absoluteUrl } from "./format";
export { buildPageMetadata, webPageSchema, productSchema } from "./seo";
