/**
 * hooks/index.ts — Barrel export for all custom hooks.
 *
 * Import from "@/hooks" instead of individual files:
 *   import { useScrolled, useMediaQuery } from "@/hooks";
 */

export { useScrolled } from "./useScrolled";
export { useMediaQuery, breakpoints } from "./useMediaQuery";
export { useLocalStorage } from "./useLocalStorage";
