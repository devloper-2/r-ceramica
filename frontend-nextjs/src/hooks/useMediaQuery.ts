/**
 * useMediaQuery.ts — Reactive CSS media query hook.
 *
 * Usage:
 *   const isDesktop = useMediaQuery("(min-width: 1024px)");
 *   const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
 *
 * SSR-safe: returns `false` on the server / before hydration.
 */

"use client";

import { useState, useEffect } from "react";

/**
 * @param query  A valid CSS media query string.
 * @returns      `true` when the query matches, `false` otherwise.
 */
export function useMediaQuery(query: string): boolean {
  // Lazy initializer — SSR-safe: returns false on the server.
  // Avoids a synchronous setState call inside useEffect.
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

// ─── Pre-built breakpoint helpers ─────────────────────────────────────────────
// Mirror Tailwind's default breakpoints for consistency.

export const breakpoints = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
} as const;
