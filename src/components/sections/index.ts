/**
 * components/sections/index.ts — Barrel export for all reusable page sections.
 *
 * Import from "@/components/sections" instead of individual files:
 *   import { Hero, MediaGrid, FeatureCards } from "@/components/sections";
 *
 * A "section" is a large, self-contained band of a page. Every section is
 * DATA-DRIVEN (it receives content via props) so the same component can appear
 * on many different pages — that is the core reuse pattern of this project.
 */

export { default as Hero } from "./Hero";
export { default as MediaGrid } from "./MediaGrid";
export { default as FeatureCards } from "./FeatureCards";
export { default as NarrativeSection } from "./NarrativeSection";
export { default as ProductCarousel } from "./ProductCarousel";
export { default as SocialFeed } from "./SocialFeed";
export { default as StatsGrid } from "./StatsGrid";
export { default as ManufacturingSection } from "./ManufacturingSection";
export { default as PhilosophySection } from "./PhilosophySection";
export { default as TestimonialsQuote } from "./TestimonialsQuote";
export { default as Footprint } from "./Footprint";