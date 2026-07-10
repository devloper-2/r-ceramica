# R Ceramica — Full-Stack Migration Plan

**Goal:** Turn the current static Next.js site into a WordPress-style CMS where an
admin can edit every text, image, and navigation item — using a PHP backend that
runs on **shared hosting**.

**Status of decisions**

| Layer | Choice | Role |
|---|---|---|
| Frontend | Next.js (static export) | Display only; fetches content at build time |
| Admin Panel | CodeIgniter 4 (MVC + PHP views) | Runs on shared hosting, PHP sessions |
| REST API | CodeIgniter 4 controllers → JSON | Feeds the Next.js build |
| Database | MySQL (phpMyAdmin) | All editable content |
| Admin auth | PHP sessions | Server-side |
| API auth | API key in request header | Read-only public data |
| Image storage | `/uploads/` on shared hosting | No S3 |
| Frontend hosting | Static export on the same shared host | See SEO section |
| Rebuild pipeline | GitHub Actions (free tier) | Build + export + FTP on publish |

---

## 1. Architecture Overview

The public website is **static HTML**. The browser never calls the API or the
database. The API is consumed **only at build time** by GitHub Actions. This keeps
the live site fast, cheap, and hard to attack — the only internet-facing dynamic
surface is the admin panel.

```
                    SHARED HOSTING (one cPanel account)
┌────────────────────────────────────────────────────────────────────┐
│  rceramica.com/            ← static Next.js HTML (the exported /out) │
│  ├── index.html, about.html, catalogue.html, products/*.html …      │
│  └── _next/  (JS, CSS, optimised images)                            │
│                                                                      │
│  admin.rceramica.com/      ← CodeIgniter 4 (public/ = docroot)       │
│    ├── /admin/*   PHP-session admin panel (server-rendered views)   │
│    └── /api/v1/*  JSON API (read-only; consumed by the build only)  │
│                                                                      │
│  MySQL (phpMyAdmin)        ← all editable content                   │
│  /uploads/                 ← admin-uploaded images (PHP exec off)   │
└────────────────────────────────────────────────────────────────────┘
                         ▲ build-time fetch (X-API-Key)
                         │
     GitHub Actions (free Node runner):  npm ci → next build → export
     → FTP/rsync the /out folder onto the host docroot.
```

**Data flow at build time**

1. GitHub Actions runs `next build`.
2. `getStaticProps` / `getStaticPaths` fetch content from `https://admin.rceramica.com/api/v1/*`.
3. Next.js renders every page to static HTML with the content baked in.
4. The `out/` folder is FTP'd to the public docroot → live in ~1–3 minutes.

**Data flow when an admin edits content**

1. Admin logs into `/admin`, edits a page/product/nav item, uploads images.
2. Admin clicks **Publish**.
3. CI4 calls the GitHub `repository_dispatch` webhook.
4. GitHub Actions rebuilds and redeploys the static site automatically.

---

## 2. Repository Restructure

Everything currently in the repo root moves under `frontend-nextjs/`. A new
`backend-codeigniter/` folder holds the CI4 app.

```
r-ceramica/
├── frontend-nextjs/                 ← current Next.js app moves here (git mv)
│   ├── src/
│   │   ├── pages/                    (index, about, catalogue, products/[id] …)
│   │   ├── components/               (layout, sections, ui — UNCHANGED)
│   │   ├── styles/                   (theme.css + per-page css — UNCHANGED)
│   │   ├── lib/
│   │   │   ├── constants/            ← becomes fallback/seed data only
│   │   │   ├── services/api.ts       ← NEW: typed fetch helpers for CI4 API
│   │   │   ├── types/                (HeroContent, FeatureCard … — reused)
│   │   │   └── schemas/, utils/, fonts.ts
│   │   ├── hooks/, config/
│   │   └── proxy.ts
│   ├── next.config.ts                ← add `output: 'export'`, images unoptimized
│   ├── package.json, tailwind.config.ts, tsconfig.json
│   └── .env.local                    ← API_BASE_URL, API_KEY (build-time)
│
├── backend-codeigniter/             ← NEW CI4 app
│   ├── app/
│   │   ├── Controllers/
│   │   │   ├── Api/                  (Pages, Products, Navigation, Settings)
│   │   │   └── Admin/                (Auth, Dashboard, Page, Product, Media,
│   │   │                              Navigation, Settings, Publish)
│   │   ├── Models/                   (PageModel, SectionModel, ProductModel,
│   │   │                              MediaModel, NavModel, SettingModel, UserModel)
│   │   ├── Views/admin/              (login, dashboard, editors — PHP views)
│   │   ├── Filters/                  (AdminAuthFilter, ApiKeyFilter, ThrottleFilter)
│   │   ├── Config/                   (Routes, Security, Filters, App)
│   │   └── Database/Migrations/, Seeds/
│   ├── public/                       ← WEB DOCROOT (only index.php exposed)
│   ├── writable/                     (logs, cache, sessions — above docroot)
│   ├── uploads/                      ← image storage (.htaccess: PHP off)
│   ├── .env                          ← DB creds + API key (gitignored)
│   └── composer.json
│
├── .github/workflows/deploy.yml     ← build → export → FTP pipeline
├── database/schema.sql              ← reference schema (migrations are source of truth)
├── docs/
│   ├── PLAN.md                       ← this file
│   ├── DEPLOY.md                     ← hosting/setup runbook
│   └── SECURITY.md                   ← hardening checklist
├── CLAUDE.md
└── README.md
```

**Migration note:** moving the frontend into a subfolder is a pure `git mv` — no
logic changes. Update relative paths only where tooling assumes repo root
(e.g. CI config, `.gitignore`).

---

## 3. Database Schema (MySQL)

Content mirrors the current `src/lib/constants/*.ts` shape so the admin edits what
the code used to hardcode. The flexible `sections.content` JSON column preserves
the existing "prop-driven reusable section" architecture — each section row is
just the props a component like `Hero` already accepts.

```
pages
  id, slug (unique), title,
  meta_title, meta_description, og_image_id,
  status ENUM('draft','published'), created_at, updated_at

sections
  id, page_id (FK pages), type ENUM('hero','mediaGrid','featureCards',
     'narrative','productCarousel','socialFeed',…),
  sort_order, content JSON, is_active, updated_at

products
  id, slug (unique), name, short_description, description,
  price, currency, specs JSON, category_id,
  meta_title, meta_description,
  status ENUM('draft','published'), created_at, updated_at

product_images
  id, product_id (FK), media_id (FK media), sort_order, is_primary

categories
  id, slug, name, sort_order

media
  id, filename, path, alt_text, mime, width, height, size_bytes, created_at

nav_links
  id, label, url, parent_id (self FK), sort_order, is_active

settings
  id, `key` (unique), `value` JSON        -- logo, phone, whatsapp, socials, footer

admin_users
  id, name, email (unique), password_hash, role ENUM('admin','editor'),
  last_login_at, failed_attempts, locked_until, created_at

audit_log
  id, user_id (FK), action, table_name, record_id, ip, user_agent, created_at
```

Seeds are generated from the current constants files so nothing looks empty on
first launch.

---

## 4. CodeIgniter 4 Backend

Two faces on one app, separated by route group + filter.

### 4a. Public JSON API (`/api/v1/*`) — read-only

| Method | Route | Returns |
|---|---|---|
| GET | `/api/v1/pages/{slug}` | Page + ordered active sections |
| GET | `/api/v1/pages` | All published page slugs (for sitemap/build paths) |
| GET | `/api/v1/products` | Published products (list) |
| GET | `/api/v1/products/{slug}` | Single product + images |
| GET | `/api/v1/navigation` | Nav tree |
| GET | `/api/v1/settings` | Global settings (logo, contact, socials, footer) |

- Guarded by `ApiKeyFilter` (header `X-API-Key`). Read-only; no write routes exist.
- Consistent JSON envelope: `{ data, meta }`; proper HTTP status codes.
- Optional: restrict by IP/referrer to the GitHub Actions runner.

### 4b. Admin panel (`/admin/*`) — PHP sessions, server-rendered

- `GET /admin/login`, `POST /admin/login`, `GET /admin/logout`
- `GET /admin` dashboard
- Pages: list, edit sections (add/reorder/remove/toggle), meta/SEO fields
- Products: CRUD + image gallery management
- Media library: upload, list, alt-text edit, delete
- Navigation: CRUD + drag-reorder
- Settings: logo, contact, socials, footer
- `POST /admin/publish` → triggers GitHub rebuild (debounced)
- Whole group wrapped by `AdminAuthFilter` — nothing reachable when logged out.

### 4c. Frontend consumption

Each Next.js page swaps `import { HOME } from '@/lib/constants/home'` for a
build-time fetch:

```
export async function getStaticProps() {
  const page = await api.getPage('home');   // GET /api/v1/pages/home
  return { props: { page } };
}
```

`products/[id].tsx` uses `getStaticPaths` (all product slugs from
`/api/v1/products`) + `getStaticProps`. Same components, same typed props — only
the data *source* changes. Constants files remain as typed fallbacks.

---

## 5. SEO Strategy (static export)

**Static export is good for SEO, not bad** — pages are fully pre-rendered at build,
so crawlers get complete HTML (faster than a live SPA). The only trade-off is
*freshness*, which the rebuild pipeline reduces to a ~1–3 minute delay.

- Per-page `<title>` / meta / canonical / OG come from the `pages` table, injected
  via `next/head` at build.
- `sitemap.xml` generated at build from DB slugs.
- JSON-LD (organisation, product) built from `settings` + `products`.
- `robots.txt` + canonical URLs baked in.
- Auto-rebuild on Publish keeps indexed content current with no manual work.

Compatibility: if edits are ever very frequent, add a nightly cron rebuild as a
safety net; the architecture doesn't change.

---

## 6. Build & Deploy Pipeline

`.github/workflows/deploy.yml` (triggered by `repository_dispatch` from CI4, and
optionally on push to main):

1. Checkout, `npm ci` in `frontend-nextjs/`.
2. `next build` (runs `getStaticProps`/`getStaticPaths` against the live API,
   using `API_BASE_URL` + `API_KEY` from GitHub Secrets).
3. Export produces `frontend-nextjs/out/`.
4. FTP/rsync `out/` → shared host public docroot.

**Cost:** free for public repos (unlimited); private repos get 2,000 min/month
free. A rebuild is ~2–4 min, so realistic usage stays well within free limits.

**Debounce:** CI4 `Publish` enforces one build per N minutes (or a single batch
"Publish changes" button) so repeated clicks don't spam builds. GitHub cancels
superseded runs so only the latest deploys.

---

## 7. Security Hardening

Public site is static HTML, so attack surface = admin panel + API only.

**Admin panel**
- CI4 CSRF protection on every form.
- Passwords hashed with bcrypt/Argon2 (`password_hash`); never plaintext.
- Session hardening: `HttpOnly`, `Secure`, `SameSite=Strict`, regenerate ID on
  login, idle timeout.
- Login rate-limiting + account lockout (`failed_attempts` / `locked_until`).
- `AdminAuthFilter` on the entire `/admin` group.
- Admin on a separate subdomain and/or IP-allowlist; optional cPanel HTTP Basic
  Auth as a second wall.
- Role checks on destructive actions; `audit_log` on every change.

**API**
- `X-API-Key` required; read-only; optional IP/referrer allowlist to the runner.

**Server / files**
- CI4 docroot is `public/` only — `app/`, `.env`, `writable/` sit above web root.
- `/uploads/`: disable PHP execution (`.htaccess`), validate MIME + extension,
  re-encode images on upload (blocks "shell-as-.jpg").
- Security headers via `.htaccess`; secrets gitignored; least-privilege DB user;
  keep PHP + CI4 patched.

**Input / output**
- CI4 Validation on all fields; Query Builder / prepared statements (no raw SQL).
- Escape all output in PHP views (XSS-safe).

Full checklist lives in `docs/SECURITY.md`.

---

## 8. Phased Roadmap

| Phase | Deliverable | Outcome |
|---|---|---|
| 1 | Repo restructure (`frontend-nextjs/` + `backend-codeigniter/`) | Clean two-folder layout, no logic change |
| 2 | MySQL schema + migrations + seed from current constants | DB reflects existing content |
| 3 | CI4 read API + `ApiKeyFilter` | JSON endpoints live |
| 4 | Migrate Home to `getStaticProps` against API | End-to-end loop proven |
| 5 | Admin auth + session hardening | Secure login before any editor exists |
| 6 | Admin editors (pages, sections, products, nav, media, settings) | Full content control |
| 7 | Security pass (CSRF, uploads, throttle, headers, audit) | Hardened |
| 8 | GitHub Actions build → export → FTP, wired to Publish | Auto-rebuild working |
| 9 | Migrate remaining pages; deploy to shared host | Live CMS-driven static site |

---

## 9. Open Items / Decisions To Confirm

- Admin location: subdomain (`admin.rceramica.com`) vs subfolder (`/admin`).
- Cart / checkout / orders: are these live commerce (need runtime PHP + payment
  API routes) or display-only for now? Static export can't process orders
  client-side — commerce needs dynamic PHP endpoints on the host.
- Multi-language (the `proxy.ts` locale cookie) — in scope now or later?
- Who owns the GitHub repo/secrets for the Actions pipeline.
