# R Ceramica — Next.js Project

## Stack
- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4
- next/font (Inter + Outfit — no CDN fonts except Material Symbols)
- lucide-react for icons (social icons are inline SVGs — this version lacks them)

## Theme — Single Source of Truth
All brand colours, fonts, and spacing live in **two files only**:
- `tailwind.config.ts` — Tailwind tokens (`brand.*`, `fontFamily`, etc.)
- `src/app/globals.css` — CSS custom properties (`--color-bg`, `--color-gold`, `--font-display`, etc.)

**Never hardcode hex colours in components.** Always use `var(--color-*)` or `bg-brand-*` Tailwind tokens.

## Project Structure
```
src/
├── app/              # App Router pages + root layout
├── components/
│   ├── layout/       # Navbar, Footer, WhatsAppButton (shared everywhere)
│   ├── home/         # Page-specific sections (one file per section)
│   └── ui/           # Primitive reusable atoms: Button, ArrowLink, SectionLabel
├── lib/
│   ├── constants/    # All static data arrays (navigation, home content, etc.)
│   └── types/        # Shared TypeScript interfaces
└── styles/           # globals.css only
```

## Component Rules
1. **Server Components by default** — only add `"use client"` when you need hooks/events
2. Currently client components: `Navbar`, `ProductCarousel`, `LegacySection`
3. Use `next/image` for ALL images (`fill` + `sizes` for responsive)
4. Use `next/link` for ALL internal navigation
5. Every section needs `aria-label` for accessibility

## Adding a New Page
1. Create `src/app/<page>/page.tsx` with `export const metadata: Metadata = {...}`
2. Import layout components from `@/components/layout/*`
3. Build page-specific sections in `src/components/<page>/`
4. Add static data to `src/lib/constants/<page>.ts`
5. Add route to `NAV_LINKS` in `src/lib/constants/navigation.ts`

## Security
- HTTP security headers set in `next.config.ts` (CSP, HSTS, X-Frame-Options, etc.)
- Never store secrets in client code — use server actions or API routes
- Payment integration: use server actions with Stripe/Razorpay SDKs server-side only

## Performance Targets (>85 PageSpeed)
- Images: always use `next/image` with explicit `width`/`height` or `fill`+`sizes`
- Fonts: loaded via `next/font/google` (self-hosted, no render-blocking)
- Videos: `preload="metadata"` only, autoplay with `muted playsInline`
- Avoid large client bundles — keep `"use client"` components minimal
