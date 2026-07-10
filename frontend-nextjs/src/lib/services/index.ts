/**
 * lib/services/index.ts — Barrel export for all service modules.
 *
 * Import from "@/lib/services" instead of individual files:
 *   import { fetchProducts, fetchProductBySlug } from "@/lib/services";
 */

export { fetchProducts, fetchProductBySlug } from "./products";
export type { Product } from "./products";

export { submitContactForm } from "./contact";
export type { ContactPayload } from "./contact";
