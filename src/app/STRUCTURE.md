# App Router Route Structure

This file documents the planned route layout for R Ceramica.
Use this as a reference when adding new pages.

## Current Routes

```
src/app/
├── layout.tsx          Root layout (Navbar, Footer, WhatsApp button)
├── page.tsx            Homepage  →  /
├── not-found.tsx       Custom 404 page
├── error.tsx           Global error boundary (client component)
├── loading.tsx         Global loading skeleton
├── sitemap.ts          Auto-generated /sitemap.xml
├── robots.ts           Auto-generated /robots.txt
├── globals.css         Global styles
└── favicon.ico
```

## Planned Routes

```
src/app/
├── (marketing)/                 Route group — shares root layout
│   ├── about/
│   │   └── page.tsx             →  /about
│   ├── catalogue/
│   │   └── page.tsx             →  /catalogue
│   └── contact/
│       └── page.tsx             →  /contact
│
├── (products)/                  Route group — may have a different layout
│   ├── tiles/
│   │   ├── page.tsx             →  /tiles
│   │   ├── loading.tsx          Route-level loading UI
│   │   ├── _components/         Page-specific components (not shared)
│   │   └── [slug]/
│   │       ├── page.tsx         →  /tiles/[slug]  (individual tile)
│   │       └── _components/     Slug-page-specific components
│   ├── bathrooms/
│   │   ├── page.tsx             →  /bathrooms
│   │   └── [slug]/
│   │       └── page.tsx         →  /bathrooms/[slug]
│   └── accessories/
│       └── page.tsx             →  /accessories
│
└── api/                         API routes (Route Handlers)
    └── contact/
        └── route.ts             →  POST /api/contact  (contact form)
```

## Full src/ Structure (for scale)

```
src/
├── app/                         App Router (routes only)
├── components/
│   ├── layout/                  Navbar, Footer, WhatsAppButton (global)
│   ├── home/                    Homepage section components
│   ├── <page>/                  Page-specific section components
│   └── ui/                      Primitive atoms: Button, ArrowLink, SectionLabel
├── lib/
│   ├── constants/               Static data arrays (navigation, home content, etc.)
│   ├── schemas/                 JSON-LD structured data factories
│   ├── services/                API clients & data-fetching functions (CMS, backend)
│   │   ├── products.ts          e.g. fetchProducts(), fetchProductBySlug()
│   │   └── contact.ts           e.g. submitContactForm()
│   ├── types/                   Shared TypeScript interfaces
│   └── utils/                   Pure helper functions (cn, format, seo)
├── hooks/                       Custom React hooks
├── config/                      Site-wide config (site.ts)
└── middleware.ts                 Edge middleware (locale, request tracing)
```

## Conventions

- **Route Groups** `(name)/` — group related pages without affecting the URL.
- **Dynamic Segments** `[slug]/` — for product detail pages.
- **Colocation** — keep page-specific components in `_components/` inside the route
  folder. Only promote to `src/components/<page>/` when shared across 2+ routes.
- **Services layer** — all data-fetching and API calls live in `src/lib/services/`.
  Never fetch directly in components; never dump API logic into `utils/`.
- **Metadata** — every `page.tsx` must export a `metadata` object or
  `generateMetadata()` function using `buildPageMetadata()` from `@/lib/utils`.
- **Loading UI** — add `loading.tsx` next to any `page.tsx` that fetches data.
- **Error UI** — add `error.tsx` for pages with data fetching that could fail.
- **Sitemap** — add dynamic product slugs to `sitemap.ts` when CMS is wired up.
