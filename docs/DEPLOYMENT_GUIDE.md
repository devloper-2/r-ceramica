# R Ceramica — Complete Deployment Guide

> **Audience**: Any developer joining the project who needs to set up the local
> environment and/or deploy to Hostinger for the first time.
>
> **Last updated**: 2026-07-27

---

## Table of Contents

1. [Project Architecture](#1-project-architecture)
2. [Prerequisites](#2-prerequisites)
3. [Local Development Setup](#3-local-development-setup)
4. [Understanding the Hostinger Layout](#4-understanding-the-hostinger-layout)
5. [Initial Backend Deployment (CI4 Admin Panel)](#5-initial-backend-deployment-ci4-admin-panel)
6. [Initial Frontend Deployment (Next.js)](#6-initial-frontend-deployment-nextjs)
7. [GitHub Actions — Automated Publishing](#7-github-actions--automated-publishing)
8. [Day-to-Day: Deploying Code Changes](#8-day-to-day-deploying-code-changes)
9. [Database: Running New Migrations](#9-database-running-new-migrations)
10. [Environment Variables Reference](#10-environment-variables-reference)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. Project Architecture

R Ceramica is a two-part application:

```
┌─────────────────────────────────────────────────────────┐
│                    HOSTINGER SHARED HOSTING             │
│                                                         │
│  staging.rceramica.com          admin.rceramica.com     │
│  ─────────────────────          ──────────────────      │
│  Next.js static export          CodeIgniter 4           │
│  (HTML/CSS/JS files)            (PHP admin + REST API)  │
│                                                         │
│  public_html/staging/           public_html/admin/      │
│                                 ci4-app/  (above root)  │
│                                                         │
│                    MySQL Database                       │
│                    u715248258_rceramica                 │
└─────────────────────────────────────────────────────────┘
```

| Part | Technology | URL | Purpose |
|---|---|---|---|
| Frontend | Next.js 16 (static export) | staging.rceramica.com | Customer-facing website |
| Backend | CodeIgniter 4 | admin.rceramica.com | Admin panel + REST API |
| Database | MySQL 8 | Hostinger MySQL | All content, products, orders |

**How they connect:**

- The Next.js build reads content from the CI4 API at build time via `getStaticProps`
- The browser calls the CI4 API at runtime for commerce (cart, checkout, orders)
- When an admin clicks **Publish**, GitHub Actions rebuilds Next.js and FTPs the `out/` folder to Hostinger

**Local repo structure:**

```
r-ceramica/                    ← git root (branch: wordpress)
├── backend-codeigniter/       ← CI4 app (PHP)
│   ├── app/                   ← controllers, models, views, config, migrations
│   ├── vendor/                ← composer packages (NOT committed, but uploaded to server)
│   ├── writable/              ← logs, cache, sessions (server-writable)
│   ├── public/                ← web root files (.htaccess, index.php)
│   ├── deploy/
│   │   ├── index.php          ← production front-controller (different path to ci4-app)
│   │   └── .env.production    ← production .env template (fill DB password, commit ignored)
│   ├── .env                   ← local dev env (gitignored)
│   └── .env.example           ← template for local .env
├── frontend-nextjs/           ← Next.js app
│   ├── src/                   ← pages, components, styles, lib
│   ├── public/                ← static assets (images, fonts, .htaccess)
│   ├── scripts/               ← gen-site-data.mjs, gen-sitemap.mjs
│   ├── out/                   ← built static export (generated, gitignored)
│   ├── .env.local             ← local dev env (gitignored)
│   └── .env.production        ← production env (points to live API)
├── docs/                      ← this file and other guides
├── .github/workflows/
│   └── deploy-staging.yml     ← GitHub Actions pipeline
└── database/
    └── r_ceramica.sql         ← full DB dump for fresh setup
```

---

## 2. Prerequisites

Install these tools before starting:

| Tool | Version | Download |
|---|---|---|
| XAMPP | Any recent | xampp.apache.org (includes PHP + MySQL) |
| Node.js | 22 LTS | nodejs.org |
| PHP | 8.2+ | included with XAMPP |
| Composer | 2.x | getcomposer.org |
| FileZilla | Any | filezilla-project.org |
| Git | Any | git-scm.com |

**Verify your setup:**

```bash
php --version       # should say PHP 8.2.x or higher
node --version      # should say v22.x.x
composer --version  # should say Composer 2.x
```

**Enable the `intl` PHP extension** (CI4 requires it):

Open `C:\xampp\php\php.ini`, find the line `;extension=intl` and remove the leading `;`:

```ini
extension=intl
```

Restart XAMPP after saving.

---

## 3. Local Development Setup

Do this once when you first clone the repo.

### 3.1 Clone the repo

```bash
git clone https://github.com/Codezpark/r-ceramica.git
cd r-ceramica
git checkout wordpress
```

### 3.2 Set up the backend (CodeIgniter)

```bash
cd backend-codeigniter
composer install
```

Copy the example env and fill in your local values:

```bash
copy .env.example .env
```

Open `backend-codeigniter/.env` and set:

```ini
CI_ENVIRONMENT = development
app.baseURL = 'http://localhost:8080/'
database.default.hostname = 127.0.0.1
database.default.database = r_ceramica
database.default.username = root
database.default.password =
app.contentApiKey = 646aecba511131b674cc9a1ae0b214e841dbb284ee1a7d1b
```

> **Note**: Local MySQL uses `root` with no password (default XAMPP).

### 3.3 Create and seed the local database

Start MySQL from the XAMPP Control Panel, then run:

```bash
cd backend-codeigniter
php spark migrate
php spark db:seed DatabaseSeeder
```

`migrate` creates all tables. `db:seed` fills them with sample content, products, and the admin user.

### 3.4 Set up the frontend (Next.js)

```bash
cd ../frontend-nextjs
npm install
```

The file `frontend-nextjs/.env.local` already points to `http://localhost:8080`. No changes needed for local dev.

### 3.5 Start both servers

Open two terminal windows:

**Terminal 1 — Backend:**

```bash
cd backend-codeigniter
php spark serve --port 8080
```

**Terminal 2 — Frontend:**

```bash
cd frontend-nextjs
npm run dev
```

**URLs:**

| URL | What |
|---|---|
| http://localhost:3000 | Customer-facing website |
| http://localhost:8080/admin/login | CMS admin panel |
| http://localhost:8080/api/v1/pages/home | Content API (needs X-API-Key header) |

**Admin credentials** (change after first login on production):

```
Email:    admin@rceramica.com
Password: Admin@12345
```

---

## 4. Understanding the Hostinger Layout

Hostinger shared hosting cannot run PHP from inside `public_html` securely if the whole CI4 app lives there (it would expose `app/`, `vendor/`, `.env` to the web). The solution is to **split the CI4 app**:

```
/home/u715248258/domains/rceramica.com/
│
├── public_html/                  ← everything here is web-accessible
│   ├── admin/                    ← admin.rceramica.com docroot
│   │   ├── index.php             ← CI4 front-controller (from deploy/index.php)
│   │   ├── .htaccess             ← from backend-codeigniter/public/.htaccess
│   │   └── uploads/              ← user-uploaded images (NEVER delete this)
│   └── staging/                  ← staging.rceramica.com docroot
│       ├── index.html
│       ├── about.html
│       ├── .htaccess             ← URL rewriting for clean URLs
│       └── _next/                ← Next.js assets
│
└── ci4-app/                      ← NOT web-accessible (above public_html)
    ├── app/                      ← controllers, models, views, config, migrations
    ├── vendor/                   ← composer packages
    ├── writable/                 ← cache, logs, sessions
    ├── .env                      ← production secrets (NEVER in public_html)
    ├── composer.json
    ├── composer.lock
    └── spark
```

The key trick is `public_html/admin/index.php` — it's a custom front-controller that points up to `../../ci4-app/app/Config/Paths.php` instead of the default `../app/Config/Paths.php`. This is what `backend-codeigniter/deploy/index.php` does.

---

## 5. Initial Backend Deployment (CI4 Admin Panel)

> **Skip to [Section 8](#8-day-to-day-deploying-code-changes)** if the backend is already live and you just need to push code changes.

### 5.1 Create the MySQL database on Hostinger

1. Log in to Hostinger **hPanel**
2. Go to **Hosting → Manage → Databases → MySQL Databases**
3. Create a new database:
   - **Database name**: `rceramica` → Hostinger will prefix it: `u715248258_rceramica`
   - **Username**: `rcadmin` → becomes `u715248258_rcadmin`
   - **Password**: click **Generate** and **copy it immediately** — you need it in 5.3
4. Click **Create**

### 5.2 Import the database

1. On the same page, find your database → click **Enter phpMyAdmin**
2. In phpMyAdmin, click your database `u715248258_rceramica` on the left sidebar
3. Click the **Import** tab at the top
4. Click **Choose File** → select `database/r_ceramica.sql` from your PC
5. Scroll down → click **Import**
6. You should see ~21 tables created successfully

> **If the import fails with "CREATE DATABASE not allowed"**: Open the SQL file and
> remove the `CREATE DATABASE` and `USE` lines at the top. Re-import the cleaned file.
> Hostinger blocks those statements.

### 5.3 Prepare the production `.env`

Open `backend-codeigniter/deploy/.env.production` in a text editor and fill in:

```ini
database.default.database = u715248258_rceramica
database.default.username = u715248258_rcadmin
database.default.password = YOUR_DB_PASSWORD_FROM_STEP_5_1

github.repo  = Codezpark/r-ceramica
github.token = ghp_YOUR_CLASSIC_PAT
```

> **GitHub token**: Must be a **classic PAT** (starts with `ghp_`). Fine-grained PATs
> (`github_pat_...`) do NOT work for `repository_dispatch` on organisation repos.
> Create one at: GitHub → Settings → Developer settings → Personal access tokens →
> Tokens (classic) → scopes needed: `repo`.

Save but **do not commit** this file — it contains secrets.

### 5.4 Upload via Hostinger File Manager

Go to **hPanel → Files → File Manager**. Navigate to the home root
(`/home/u715248258/domains/rceramica.com/`). You will see `public_html/` and possibly `.builds/`.

**Upload the app code to `ci4-app/`:**

1. Create a new folder named `ci4-app` at the root level (sibling of `public_html/`)
2. Zip `backend-codeigniter/app/` on your PC (right-click → Send to → Compressed folder → `app.zip`)
3. Upload `app.zip` into `ci4-app/` → right-click → **Extract Here** → you now have `ci4-app/app/`
4. Repeat for `vendor/` → `ci4-app/vendor/`
5. Repeat for `writable/` → `ci4-app/writable/`
6. Upload `backend-codeigniter/composer.json` → `ci4-app/composer.json`
7. Upload `backend-codeigniter/composer.lock` → `ci4-app/composer.lock`
8. Upload `backend-codeigniter/spark` → `ci4-app/spark`
9. Upload your edited `.env.production` → rename it to `.env` inside `ci4-app/`

**Upload the public files to `public_html/admin/`:**

The `admin/` subdomain folder should already exist (Hostinger creates it when you add the subdomain). If not, create it.

1. Upload `backend-codeigniter/deploy/index.php` → `public_html/admin/index.php`
2. Upload `backend-codeigniter/public/.htaccess` → `public_html/admin/.htaccess`
3. Create an empty `uploads/` folder inside `public_html/admin/` (right-click → New Folder)

**Set folder permissions:**

Right-click `ci4-app/writable/` → **Change Permissions** → set to **755** recursively.

### 5.5 Enable SSL on the subdomain

1. hPanel → **Security → SSL/TLS**
2. Find `admin.rceramica.com` → click **Install** (Hostinger free SSL)
3. Wait until status shows **Active** (usually < 5 minutes)

### 5.6 Verify the backend is live

Open these URLs in your browser:

| URL | Expected result |
|---|---|
| `https://admin.rceramica.com/admin/login` | Admin login page appears |
| `https://admin.rceramica.com/api/v1/settings` | `{"error":"Unauthorized"}` (correct — needs API key) |

Log in with `admin@rceramica.com` / `Admin@12345`. **Change the password immediately.**

---

## 6. Initial Frontend Deployment (Next.js)

### 6.1 Build the static export — creates the `out/` folder

Open **PowerShell** and navigate to the frontend folder:

```bash
cd C:\xampp\htdocs\r-ceramica\frontend-nextjs
```

**Option A — Simple (recommended, reads `.env.production` automatically):**

```bash
npm run build:export
```

**Option B — Explicit (use this if Option A fails or you need to override env vars):**

```bash
Remove-Item -Recurse -Force .next; $env:STATIC_EXPORT="true"; $env:CONTENT_API_URL="https://admin.rceramica.com/api/v1"; $env:CONTENT_API_KEY="646aecba511131b674cc9a1ae0b214e841dbb284ee1a7d1b"; $env:NEXT_PUBLIC_API_URL="https://admin.rceramica.com/api/v1"; npx next build
```

> `Remove-Item -Recurse -Force .next` clears the build cache first — always do this
> when you hit TypeScript or type errors from a previous build.

Both commands do the same thing: run `STATIC_EXPORT=true next build`, fetch all content
from the live API (`https://admin.rceramica.com/api/v1`), and output static HTML/CSS/JS
into `frontend-nextjs/out/`.

**What a successful build looks like:**

```
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages (XX/XX)
✓ Finalizing page optimization
```

**Build takes 2–5 minutes.** Each page is listed as it generates. If the build fails:
- `API unreachable` → backend is not live yet (complete Section 5 first)
- `undefined cannot be serialized` → a `getStaticProps` is returning `undefined` instead of `null`
- `ISR cannot be used with output: export` → a page has `revalidate` or `fallback: "blocking"` — remove both

### 6.2 Verify the `out/` folder was created

After a successful build, confirm the output exists:

```bash
dir out
```

You should see files like `index.html`, `about.html`, `explore.html`, `catalogue.html`,
a `_next/` folder, and a `.htaccess` file. If `.htaccess` is missing, copy it manually:

```bash
copy public\.htaccess out\.htaccess
```

> `.htaccess` is critical — without it, all page URLs except `/` will return 404 on Hostinger.

### 6.3 Upload `out/` to Hostinger

1. Open Windows Explorer → navigate to `frontend-nextjs\out\`
2. Select **all files and folders** inside `out\` (Ctrl+A)
3. Right-click → **Send to → Compressed (zipped) folder** → name it `staging.zip`
4. In Hostinger **File Manager** → navigate to `public_html/staging/`
5. Delete everything currently inside `staging/` (select all → delete)
6. Upload `staging.zip` → once uploaded, right-click → **Extract Here**
7. Delete `staging.zip` after extracting

> **Critical**: Select the **contents** of `out/` before zipping, not the `out/` folder itself.
> Correct result: `staging/index.html` ✓
> Wrong result: `staging/out/index.html` ✗

### 6.4 Verify the frontend is live

| URL | Expected |
|---|---|
| `https://staging.rceramica.com` | Home page renders |
| `https://staging.rceramica.com/about` | About page renders |
| `https://staging.rceramica.com/explore` | Explore categories page |
| `https://staging.rceramica.com/catalogue` | Catalogue page |
| `https://staging.rceramica.com/explore/tiles` | Category page (tiles) |
| `https://staging.rceramica.com/products/petra-vessel-basin` | Product detail page |

---

## 7. GitHub Actions — Automated Publishing

Once this is set up, content updates are fully automated: **Admin → Publish → GitHub Actions builds → uploads to Hostinger automatically**.

### 7.1 Add GitHub Secrets

In GitHub → repository `Codezpark/r-ceramica` → **Settings → Secrets and variables → Actions**:

| Secret name | Value |
|---|---|
| `CONTENT_API_KEY` | `646aecba511131b674cc9a1ae0b214e841dbb284ee1a7d1b` |
| `FTP_HOST` | `82.25.107.184` |
| `FTP_USER` | `u715248258.rceramica.com` |
| `FTP_PASS` | your Hostinger FTP password (hPanel → FTP Accounts) |

### 7.2 Add GitHub token to the server `.env`

In Hostinger File Manager → `ci4-app/.env` → click Edit → ensure:

```ini
github.repo  = Codezpark/r-ceramica
github.token = ghp_YOUR_CLASSIC_PAT
github.eventType = rebuild-site
```

Save.

### 7.3 How the pipeline works

```
Admin clicks "Publish"
       │
       ▼
CI4 sends POST to GitHub API
(repository_dispatch event: rebuild-site)
       │
       ▼
GitHub Actions (.github/workflows/deploy-staging.yml) starts:
  1. Checkout repo (branch: wordpress)
  2. npm install
  3. Verify live API is reachable (curl admin.rceramica.com)
  4. gen-site-data.mjs  → fetches nav/settings from API → writes src/lib/generated/site-data.json
  5. gen-sitemap.mjs    → generates public/sitemap.xml
  6. next build (STATIC_EXPORT=true) → produces out/
  7. Copy .htaccess into out/
  8. lftp mirror out/ → staging/ on Hostinger FTP
       │
       ▼
staging.rceramica.com now shows updated content
(total time: ~3-5 minutes)
```

### 7.4 Trigger a manual rebuild

If you need to force a rebuild without editing content:

1. GitHub → repository → **Actions** tab → **Deploy staging site**
2. Click **Run workflow** → **Run workflow**

Or via the admin panel: any page → **Publish** button.

---

## 8. Day-to-Day: Deploying Code Changes

This covers deploying **code** changes (new features, bug fixes) — not content changes (which are handled by the Publish button).

### 8.1 Backend code changes (CI4)

When you change PHP files in `backend-codeigniter/app/`:

**Option A — Hostinger File Manager (small changes):**

1. Navigate to the changed file inside `ci4-app/app/` on Hostinger
2. Click the file → **Edit** → paste the updated content → Save

**Option B — FTP with FileZilla (large changes, recommended):**

Connect FileZilla:
- Host: `82.25.107.184`
- Username: `u715248258.rceramica.com`
- Password: Hostinger FTP password
- Port: `21`

Upload changed files from `backend-codeigniter/app/` to `ci4-app/app/` on the server.

**Option C — ZIP upload (full app refresh):**

1. Zip `backend-codeigniter/app/` → `app.zip`
2. Upload to `ci4-app/` in File Manager → Extract → overwrite existing

> Never delete `ci4-app/writable/` — it holds session data and logs.
> Never delete `public_html/admin/uploads/` — it holds user-uploaded images.

### 8.2 Frontend code changes (Next.js)

When you change React components, pages, or styles in `frontend-nextjs/src/`:

1. Build locally: `npm run build:export` (inside `frontend-nextjs/`)
2. Upload `out/` contents to `public_html/staging/` (replacing old files)

Or just click **Publish** in the admin panel — GitHub Actions will build with the latest code from the `wordpress` branch automatically.

> **Important**: Push your code changes to the `wordpress` branch on GitHub **before** clicking Publish, otherwise Actions will build the old code.

### 8.3 Adding a new DB migration

When you add a new migration file in `backend-codeigniter/app/Database/Migrations/`:

1. Upload the updated `app/Database/Migrations/` folder to `ci4-app/app/Database/Migrations/`
2. Run the migration in phpMyAdmin (see [Section 9](#9-database-running-new-migrations))

---

## 9. Database: Running New Migrations

Every time a new migration file is added to `app/Database/Migrations/`, it needs to run on the production database.

### Option A — phpMyAdmin (no SSH needed)

1. hPanel → **Databases → phpMyAdmin** → select `u715248258_rceramica`
2. Click the **SQL** tab
3. Check which migrations have already run:

```sql
SELECT version, class, batch FROM migrations ORDER BY id DESC LIMIT 20;
```

4. Write the SQL equivalent of each new migration's `up()` method and run it
5. After running the SQL, register the migration in the CI4 migrations table:

```sql
INSERT IGNORE INTO migrations (version, class, group, namespace, time, batch)
VALUES ('2026-07-XX-XXXXXX', 'App\\Database\\Migrations\\YourMigrationClass',
        'default', 'App', UNIX_TIMESTAMP(), 2);
```

### Option B — SSH terminal (cleanest approach)

Hostinger provides SSH access via hPanel → **Advanced → SSH Access**.

```bash
ssh u715248258@82.25.107.184
cd /home/u715248258/domains/rceramica.com/ci4-app
php spark migrate
```

This runs all pending migrations automatically and updates the migrations table.

### Current migration batches

| Batch | Migrations | When run |
|---|---|---|
| 1 | 13 original tables (pages, sections, products, orders, admin_users, …) | Initial deploy, 2026-07-10 |
| 2 | folder/product_id on media; categories content/hero fields; subcategories table; catalogues table; subcategory_id on products; image_2d/3d on products; google_id on customers | 2026-07-27 |

---

## 10. Environment Variables Reference

### Backend: `backend-codeigniter/.env` (local) / `ci4-app/.env` (production)

| Variable | Local value | Production value | Notes |
|---|---|---|---|
| `CI_ENVIRONMENT` | `development` | `production` | Controls error display |
| `app.baseURL` | `http://localhost:8080/` | `https://admin.rceramica.com/` | Must have trailing slash |
| `database.default.hostname` | `127.0.0.1` | `localhost` | Hostinger uses localhost |
| `database.default.database` | `r_ceramica` | `u715248258_rceramica` | |
| `database.default.username` | `root` | `u715248258_rcadmin` | |
| `database.default.password` | *(empty)* | *(your DB password)* | |
| `app.contentApiKey` | `646aecba...` | `646aecba...` | Must match GitHub secret |
| `app.allowedCorsOrigins` | `http://localhost:3000` | `https://staging.rceramica.com` | |
| `github.repo` | *(blank)* | `Codezpark/r-ceramica` | |
| `github.token` | *(blank)* | `ghp_...` classic PAT | Fine-grained PATs don't work |
| `razorpay.keyId` | `rzp_test_...` | `rzp_test_...` or live key | |
| `razorpay.keySecret` | `6KheIA...` | *(production secret)* | Never expose to browser |

### Frontend: `frontend-nextjs/.env.local` (local) / `.env.production` (production build)

| Variable | Local value | Production value | Exposed to browser? |
|---|---|---|---|
| `CONTENT_API_URL` | `http://localhost:8080/api/v1` | `https://admin.rceramica.com/api/v1` | No (build-time only) |
| `CONTENT_API_KEY` | `646aecba...` | `646aecba...` | No (build-time only) |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8080/api/v1` | `https://admin.rceramica.com/api/v1` | Yes (runtime commerce) |
| `STATIC_EXPORT` | *(not set)* | `true` | No |

### GitHub Actions Secrets (repo → Settings → Secrets)

| Secret | Value |
|---|---|
| `CONTENT_API_KEY` | `646aecba511131b674cc9a1ae0b214e841dbb284ee1a7d1b` |
| `FTP_HOST` | `82.25.107.184` |
| `FTP_USER` | `u715248258.rceramica.com` |
| `FTP_PASS` | Hostinger FTP password |

---

## 11. Troubleshooting

### Admin panel shows a blank page or 500 error

Check `ci4-app/writable/logs/` for the latest log file. Common causes:

- **Database connection failed**: Wrong credentials in `ci4-app/.env`. Re-check DB name, username, password.
- **`writable/` not writable**: Set permissions to 755 on `ci4-app/writable/` via File Manager.
- **Wrong PHP version**: hPanel → **PHP Configuration** → ensure PHP 8.2+.
- **`intl` extension missing**: hPanel → **PHP Configuration** → enable `intl`.

### API returns 404 on all routes

The `.htaccess` is missing from `public_html/admin/`. Upload `backend-codeigniter/public/.htaccess` there.

### GitHub Actions build fails: "Content API returned HTTP 000 or 5xx"

The backend is not reachable from GitHub's servers. Check:

1. `https://admin.rceramica.com/api/v1/pages/home` loads in your browser
2. SSL certificate is active on `admin.rceramica.com`

### GitHub Actions build fails: "API returned 401"

The `CONTENT_API_KEY` secret in GitHub does not match `app.contentApiKey` in `ci4-app/.env`.

### Publish button does nothing / admin shows no response

Check `ci4-app/.env`:

- `github.repo = Codezpark/r-ceramica` (no quotes, no spaces around `=`)
- `github.token = ghp_...` must be a **classic** PAT, not fine-grained
- The PAT must have `repo` scope

### FTP deploy fails: files land in wrong folder

The FTP user `u715248258.rceramica.com` logs in **already inside `public_html/`** — not at the home root. So the lftp command targets `staging/` not `public_html/staging/`. This is already correct in `.github/workflows/deploy-staging.yml`.

### After FTP deploy, `/about` returns 404

The `.htaccess` was not copied into `out/` before the FTP upload. The workflow does this automatically:

```yaml
cp public/.htaccess out/.htaccess
```

If doing a manual upload, ensure `out/.htaccess` exists before zipping.

### `npm run build:export` fails with "Cannot find module"

Run `npm install` first inside `frontend-nextjs/`.

### `php spark migrate` fails: "Table already exists"

Some migrations already ran. Use `php spark migrate:status` to see which ones are pending, then run only the missing ones.

### Upload images in admin are not showing on the frontend

Uploaded images are stored at `public_html/admin/uploads/`. The frontend references them as `https://admin.rceramica.com/uploads/...`. Make sure:

1. The image URL in the DB starts with `/uploads/` (relative) or the full admin domain
2. `next.config.ts` has `admin.rceramica.com` in `remotePatterns`

---

## Quick Reference: Hostinger Credentials

| Thing | Value |
|---|---|
| hPanel login | codezpark1@gmail.com |
| FTP host | `82.25.107.184` |
| FTP user | `u715248258.rceramica.com` |
| FTP port | 21 |
| DB name | `u715248258_rceramica` |
| DB user | `u715248258_rcadmin` |
| Admin URL | https://admin.rceramica.com/admin |
| Frontend URL | https://staging.rceramica.com |
| Admin login | admin@rceramica.com / Admin@12345 *(change this!)* |

---

*See also: [LOCAL.md](LOCAL.md) for local-only dev tips, [DEPLOY.md](DEPLOY.md) for the original first-deploy checklist.*
