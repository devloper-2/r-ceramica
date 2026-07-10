# R Ceramica — Deployment Guide (Hostinger)

Two deployments, in order:
1. **Backend** (CodeIgniter) → `admin.rceramica.com`  ← do this first
2. **Frontend** (Next.js static) → `staging.rceramica.com`

Files prepared for you:
- `database/r_ceramica.sql` — your data, ready to import
- `backend-codeigniter/deploy/index.php` — production front controller (path-fixed)
- `backend-codeigniter/deploy/.env.production` — production config template

---

# STEP 1 — Backend (admin.rceramica.com)

### 1.1  Create the MySQL database
1. Hostinger hPanel → left menu **Databases → Management** (under your rceramica.com website).
2. Under **Create a New MySQL Database**:
   - Database name: `rceramica`  → becomes `u715248258_rceramica`
   - Username: `rcadmin`  → becomes `u715248258_rcadmin`
   - Password: click **Generate** (or type a strong one) — **COPY IT NOW**.
   - Click **Create**.
3. Write down the three values (DB name, username, password) — you need them in 1.5.

### 1.2  Import your data
1. On the same page, find your new DB in the list → click **Enter phpMyAdmin**.
2. In phpMyAdmin, select the `u715248258_rceramica` database on the left.
3. Top menu → **Import** → **Choose File** → select `database/r_ceramica.sql` from your PC.
4. Scroll down → **Import**. You should see 14 tables created (pages, sections, products, orders, admin_users, …).

### 1.3  Prepare the two upload folders on your PC
CodeIgniter is split so secrets aren't web-accessible:
- **`ci4-app/`** (goes ABOVE web root) = everything in `backend-codeigniter/` EXCEPT `public/`
  → `app/`, `vendor/`, `writable/`, `composer.json`, `composer.lock`, `spark`
  → plus your **`.env`** (from `deploy/.env.production`, edited in 1.5)
- **`admin/`** (the web root) = the contents of `backend-codeigniter/public/`
  → but REPLACE its `index.php` with `deploy/index.php`

Tip: zip `backend-codeigniter` locally (right-click → Send to → Compressed folder) to upload faster, then extract on the server.

### 1.4  Upload
Hostinger hPanel → **Files → File Manager** → open
`domains/rceramica.com/`. You will see `public_html/` already there.

1. Create a folder here named **`ci4-app`** (button **New Folder**), at
   `/home/u715248258/domains/rceramica.com/ci4-app`.
   → Upload `app/`, `vendor/`, `writable/`, `composer.json`, `composer.lock`, `spark` into it.
2. Open `public_html/admin/` (already exists as your subdomain root).
   → Upload the **contents of `backend-codeigniter/public/`** here
     (i.e. `.htaccess`, `robots.txt`, `favicon.ico`, and the `uploads/` folder).
   → Then upload `deploy/index.php` here as **`index.php`** (overwrite if asked).
   → Delete `index.html` if present (so index.php is served).

Final layout on the server:
```
/home/u715248258/domains/rceramica.com/
├── public_html/
│   ├── admin/              ← admin.rceramica.com
│   │   ├── index.php       (from deploy/index.php)
│   │   ├── .htaccess
│   │   └── uploads/
│   └── staging/            ← (frontend goes here in Step 2)
└── ci4-app/                ← NOT web-accessible
    ├── app/  vendor/  writable/
    ├── .env                (from deploy/.env.production)
    ├── composer.json  composer.lock  spark
```

### 1.5  Create the .env on the server
1. In File Manager, open `ci4-app/`.
2. Upload `deploy/.env.production` here and **rename it to `.env`**.
3. Edit `.env` (File Manager → right-click → Edit) and set the DATABASE block to the
   values from 1.1:
   ```
   database.default.database = u715248258_rceramica
   database.default.username = u715248258_rcadmin
   database.default.password = <the password you copied>
   ```
   Leave the rest as-is. Save.
4. Make sure `writable/` is writable (permissions 755 or 775) — File Manager →
   right-click `writable` → Permissions.

### 1.6  Enable HTTPS on the subdomain
1. hPanel → **Security → SSL** (or Websites → SSL).
2. Ensure an SSL certificate is issued/active for **admin.rceramica.com** (Hostinger
   provides free SSL — click **Install** if not already active). Wait until it says Active.

### 1.7  Test the backend
Open in your browser:
- `https://admin.rceramica.com/admin/login` → the admin login should appear.
  Sign in with `admin@rceramica.com` / `Admin@12345` → **change this password after login**.
- `https://admin.rceramica.com/api/v1/settings` → should return `{"error":"unauthorized"...}`
  (that's correct — it needs the API key; it proves the API is live).

✅ When both work, the backend is live. Proceed to Step 2.

---

# STEP 2 — Frontend (staging.rceramica.com)

> I will prepare the static-export build (a few code changes) before this step so
> the build points at `https://admin.rceramica.com/api/v1`. Once ready:

1. Build the static site on your PC (I'll give the exact command; it produces an `out/` folder).
2. Hostinger → File Manager → `public_html/staging/`.
3. Upload the **contents of `out/`** here (index.html, about.html, `_next/`, `products/`, …).
4. Visit `https://staging.rceramica.com` — the live site, reading content baked from your CMS.

To update content later: edit in the admin panel → rebuild → re-upload `out/`
(Step 3 automates this).

---

# STEP 3 — Automate publishing (optional, later)

GitHub Actions builds and uploads automatically when you click **Publish site** in the
admin. Requires: a GitHub repo, an FTP/deploy secret, and `github.repo` + `github.token`
in the server `.env`. Covered after Steps 1–2 are working.
