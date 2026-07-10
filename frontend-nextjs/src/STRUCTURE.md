# Route Structure (Pages Router)

R Ceramica uses the Next.js **Pages Router**: the file path inside `src/pages/`
IS the URL. Use this as a reference when adding new pages.

## Current Routes

```
src/pages/
├── _app.tsx            Wraps every page (Navbar/Footer + all global CSS imports)
├── _document.tsx       HTML shell (<html>/<body>, fonts, site-wide JSON-LD)
├── index.tsx           →  /
├── about.tsx           →  /about
├── 404.tsx             custom "not found" page
├── 500.tsx             custom "server error" page
└── sitemap.xml.tsx     →  /sitemap.xml   (getServerSideProps)
```

## Planned Routes

```
src/pages/
├── catalogue.tsx           →  /catalogue
├── contact.tsx             →  /contact
├── tiles/
│   ├── index.tsx           →  /tiles
│   └── [slug].tsx          →  /tiles/:slug        (individual tile)
├── bathrooms/
│   ├── index.tsx           →  /bathrooms
│   └── [slug].tsx          →  /bathrooms/:slug
├── accessories.tsx         →  /accessories
└── api/
    └── contact.ts          →  POST /api/contact   (contact form handler)
```

## Full src/ Structure

```
src/
├── pages/                   Routes (filename = URL) + _app/_document
├── styles/                  Global CSS — theme.css (⭐ single theme), globals.css,
│                            homepage.css, aboutpage.css  (imported in _app.tsx)
├── components/
│   ├── layout/              Navbar, Footer, WhatsAppButton (global chrome)
│   ├── sections/            Reusable, prop-driven page bands — Hero, MediaGrid,
│   │                        FeatureCards, NarrativeSection, ProductCarousel,
│   │                        SocialFeed (shared by pages)
│   ├── css/                 Component CSS (footer.css, navbar.css, …)
│   └── ui/                  Primitive atoms: Button, ArrowLink, SectionLabel
├── lib/
│   ├── constants/           Per-page DATA (home.ts, about.ts)
│   ├── schemas/             JSON-LD structured data
│   ├── services/            Data-fetching / API clients
│   ├── types/               Shared interfaces
│   ├── utils/               Pure helpers (cn, format, seo)
│   └── fonts.ts             next/font instances
└── proxy.ts                 Edge proxy (formerly middleware.ts)
```

## Conventions

- **Filename = route** — `pages/about.tsx` → `/about`; the home page must be
  `index.tsx`; dynamic pages use `[slug].tsx`.
- **Reuse first** — pages are built by composing `@/components/sections/*` and
  supplying data from `lib/constants/<page>.ts`. Sections never hardcode content;
  they take it via props. See `pages/about.tsx` for the reference example.
- **SEO** — every page sets `<Head>` (title, description, canonical, OG) via
  `next/head`. Add the new path to `pages/sitemap.xml.tsx`.
- **Global CSS** — may be imported ONLY in `_app.tsx`. Register any new page/
  component `.css` file there. For scoped styles use a CSS Module (`*.module.css`).
- **New sections** — only add a component to `components/sections/` when no
  existing section fits. Keep it prop-driven so the next page can reuse it too.
