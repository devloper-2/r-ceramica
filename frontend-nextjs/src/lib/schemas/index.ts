/**
 * lib/schemas/index.ts — Barrel export for all schema definitions.
 *
 * Import from "@/lib/schemas" instead of individual files:
 *   import { organizationSchema, homePageSchema } from "@/lib/schemas";
 */

export {
  organizationSchema,
  websiteSchema,
  homePageSchema,
  aboutPageSchema,
  contactPageSchema,
  explorePageSchema,
} from "./jsonld";