# R Ceramica — Next.js Project

## Stack
- Next.js 16 (**Pages Router**, TypeScript) — routes live in `src/pages/`
- Tailwind CSS v4
- next/font (Inter + Outfit — no CDN fonts except Material Symbols)
- lucide-react for icons (social icons are inline SVGs — this version lacks them)

## Theme — Single Source of Truth
The entire site theme lives in **one file**: `src/styles/theme.css`. It holds
every colour, font, and spacing value as a CSS variable. Change a value there
and it updates the whole website.

- `src/styles/theme.css` — the ONE file to edit for rebranding
- `tailwind.config.ts` — `brand.*` tokens are mapped to those CSS variables, so
  `bg-brand-gold` and `var(--color-gold)` both flow from theme.css

**Never hardcode hex colours in components.** Always use `var(--color-*)` or
`bg-brand-*` Tailwind tokens so theming stays centralised.

## Project Structure — Reusability First
Components are organised by **type/reusability, NOT by page**. There are no
per-page component folders (no `home/`, no `about/`). A section like `Hero` is
written once and reused on every page — only the DATA changes per page.

```
src/
├── pages/                # Pages Router — the FILENAME is the route
│   ├── _app.tsx          #   wraps every page: Navbar/Footer + ALL global CSS imports
│   ├── _document.tsx     #   <html>/<body> shell, fonts, site-wide JSON-LD
│   ├── index.tsx         #   → "/"           (Home)
│   ├── about.tsx         #   → "/about"       (About Us)
│   ├── 404.tsx           #   custom not-found page
│   ├── 500.tsx           #   custom server-error page
│   └── sitemap.xml.tsx   #   → "/sitemap.xml" (getServerSideProps)
├── styles/               # Global CSS (imported ONLY in _app.tsx)
│   ├── theme.css         #   ⭐ single theme source (all colours/fonts/spacing)
│   ├── globals.css       #   Tailwind + Material Symbols + theme + base reset
│   ├── homepage.css      #   Home-only styles (scoped by .page-home)
│   └── aboutpage.css     #   About-only styles (scoped by .page-about)
├── components/
│   ├── layout/           # Global chrome: Navbar, Footer, WhatsAppButton
│   ├── sections/         # Reusable, PROP-DRIVEN page bands (Hero, MediaGrid,
│   │                     #   FeatureCards, NarrativeSection, ProductCarousel,
│   │                     #   SocialFeed). Reused across many pages.
│   ├── css/              # Component CSS (footer.css, navbar.css, …) — imported in _app
│   └── ui/               # Primitive atoms: Button, ArrowLink, SectionLabel
├── lib/
│   ├── constants/        # Per-page DATA (home.ts, about.ts) typed by lib/types
│   ├── schemas/          # JSON-LD structured data
│   ├── services/         # Data-fetching / API clients
│   ├── types/            # Shared interfaces (HeroContent, FeatureCard, …)
│   ├── utils/            # Pure helpers (cn, format, seo)
│   └── fonts.ts          # next/font instances (applied to <html> in _document)
└── proxy.ts              # edge proxy (formerly middleware.ts) — locale cookie + tracing
```

### Routing rules (Pages Router — framework contract)
The **filename IS the route**: `pages/index.tsx` → `/`, `pages/about.tsx` → `/about`,
`pages/tiles/[slug].tsx` → `/tiles/:slug`. Reserved special files:
- `_app.tsx` — wraps every page (shared layout + the ONLY place global CSS may be imported)
- `_document.tsx` — the HTML shell (`<html>`/`<body>`, fonts, site-wide JSON-LD)
- `404.tsx` / `500.tsx` — custom error pages
- Home page must be named `index.tsx` (that is how `/` is defined).

### CSS convention (Pages Router constraint)
- Global (non-module) CSS can be imported **only in `_app.tsx`** — every page &
  component `.css` file is registered there in one place.
- Per-page/component files stay split (`styles/homepage.css`, `components/css/footer.css`)
  and are scoped with a wrapper class (`.page-home`, `.site-footer`).
- Every CSS file uses `var(--color-*)` tokens from `theme.css` — never raw hexes.
- If you need truly component-scoped styles, use a CSS **Module** (`name.module.css`).

### The One Rule of Reuse
A section component NEVER hardcodes page content. It receives everything via
props (typed in `lib/types`). Page-specific text/images live in
`lib/constants/<page>.ts`. If you find yourself copy-pasting a section to tweak
its text, stop — pass a prop instead. See `src/pages/about.tsx` for the
canonical example: it reuses `Hero`, `NarrativeSection`, `MediaGrid`, and
`FeatureCards` with nothing but different data.

## Component Rules
1. Pages Router has **no React Server Components** — components render on the
   server for HTML then hydrate. Add `"use client"` is NOT used here; instead
   interactive components simply use hooks/`useEffect` normally.
2. Interactive components: `Navbar`, `NarrativeSection`, `ProductCarousel` (hold UI state)
3. Use `next/image` for ALL images (`fill` + `sizes` for responsive)
4. Use `next/link` for ALL internal navigation
5. Per-page SEO uses `next/head` (`<Head>`) — set `<title>`, description, canonical, OG
6. Every section needs an `aria-label` (pass it as a prop where reusable)
7. Icons in data files are **lucide-react components** (e.g. `icon: Building2`),
   passed by reference so `lib/constants/*.ts` stays free of JSX

## Adding a New Page  (example: Contact)
1. Add DATA to `src/lib/constants/contact.ts`, typed with existing interfaces
   from `@/lib/types` (HeroContent, SpaceCard, FeatureCard, NarrativeContent…)
2. Create the route `src/pages/contact.tsx`:
   - add a `<Head>` block (title, description, canonical, OG) via `next/head`
   - compose from existing `@/components/sections/*` — reuse first
   - wrap the JSX in `<div className="page-contact">`
3. Create the styles `src/styles/contactpage.css` (use `var(--color-*)` tokens) and
   register it in `src/pages/_app.tsx` (global CSS may only be imported there)
4. Only build a NEW section if no existing one fits; put it in `components/sections/`
   with its own `components/css/<name>.css` (also imported in `_app.tsx`)
5. Add the route to `NAV_LINKS` in `src/lib/constants/navigation.ts`
6. Add the path to the `paths` array in `src/pages/sitemap.xml.tsx`

## Security
- HTTP security headers set in `next.config.ts` (CSP, HSTS, X-Frame-Options, etc.)
- Never store secrets in client code — use API routes (`src/pages/api/*`) or `getServerSideProps`
- Payment integration: call Stripe/Razorpay SDKs from API routes server-side only

## Performance Targets (>85 PageSpeed)
- Images: always use `next/image` with explicit `width`/`height` or `fill`+`sizes`
- Fonts: loaded via `next/font/google` (self-hosted, no render-blocking)
- Videos: `preload="metadata"` only, autoplay with `muted playsInline`
- Avoid large client bundles — keep `"use client"` components minimal
