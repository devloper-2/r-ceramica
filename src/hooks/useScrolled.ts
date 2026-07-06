/**
 * useScrolled.ts — Detects whether the user has scrolled past a threshold.
 *
 * Usage:
 *   const isScrolled = useScrolled(80);   // true once scrollY > 80px
 *
 * Perfect for Navbar transparent-to-solid transitions.
 */

"use client";

import { useState, useEffect } from "react";

/**
 * @param threshold  Pixel offset from the top that triggers the "scrolled" state.
 *                   Defaults to 80 (matches a typical navbar height).
 */
export function useScrolled(threshold = 80): boolean {
  // Lazy initializer runs only on the client during first render.
  // This avoids a synchronous setState call inside useEffect.
  const [scrolled, setScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > threshold
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}
