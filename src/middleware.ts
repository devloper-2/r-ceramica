/**
 * middleware.ts — Next.js Edge Middleware for R Ceramica.
 *
 * Runs at the edge before every request (no cold starts).
 * Handles:
 *   1. Locale detection — reads Accept-Language and stores preferred locale
 *      in a cookie, matching the EN / FR / IT options in LANGUAGES constant.
 *   2. Security — adds a request ID for tracing (response header).
 *
 * NOTE: This middleware does NOT redirect URLs (e.g. /fr/...) — it purely
 * sets a cookie so client components (language switcher) can read the
 * detected locale. Implement full i18n routing here if sub-path locales
 * are added in the future.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Supported locales — must mirror siteConfig.locales and LANGUAGES constant
const SUPPORTED_LOCALES = ["en", "fr", "it"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

const DEFAULT_LOCALE: SupportedLocale = "en";
const LOCALE_COOKIE = "rc-locale";

/**
 * Parses the Accept-Language header and returns the best matching
 * supported locale, falling back to the default.
 */
function detectLocale(acceptLanguage: string | null): SupportedLocale {
  if (!acceptLanguage) return DEFAULT_LOCALE;

  // Parse "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7" into ["fr", "en", ...]
  const preferred = acceptLanguage
    .split(",")
    .map((part) => part.trim().split(";")[0].slice(0, 2).toLowerCase());

  for (const lang of preferred) {
    if (SUPPORTED_LOCALES.includes(lang as SupportedLocale)) {
      return lang as SupportedLocale;
    }
  }

  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // ── 1. Locale detection ──────────────────────────────────────────────────
  const existingLocale = request.cookies.get(LOCALE_COOKIE)?.value;

  if (!existingLocale || !SUPPORTED_LOCALES.includes(existingLocale as SupportedLocale)) {
    const detected = detectLocale(request.headers.get("accept-language"));
    response.cookies.set(LOCALE_COOKIE, detected, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
      httpOnly: false, // Client-readable so the language switcher can sync
    });
  }

  // ── 2. Request tracing header ────────────────────────────────────────────
  const requestId = crypto.randomUUID();
  response.headers.set("x-request-id", requestId);

  return response;
}

export const config = {
  /**
   * Run middleware on all routes EXCEPT:
   * - Next.js internals (_next/static, _next/image)
   * - Static files in /public (favicon, images, etc.)
   * - API routes (handled separately)
   */
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
