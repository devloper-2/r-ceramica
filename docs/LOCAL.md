# Running R Ceramica locally

Three things must be running: **MySQL**, the **CodeIgniter API/admin**, and the **Next.js frontend**.

## 1. MySQL (XAMPP)
Start **MySQL** from the XAMPP Control Panel (Apache is optional — we use `spark serve`).
Database `r_ceramica` already exists. To reset/seed it:
```bash
cd backend-codeigniter
php spark migrate            # create tables
php spark db:seed DatabaseSeeder   # seed content + admin + products
```

## 2. Backend — CodeIgniter (API + admin) → http://localhost:8080
```bash
cd backend-codeigniter
php spark serve --port 8080
```
- API base:   http://localhost:8080/api/v1
- Admin panel: http://localhost:8080/admin/login
- Admin login: `admin@rceramica.com` / `Admin@12345`

## 3. Frontend — Next.js → http://localhost:3000
```bash
cd frontend-nextjs
npm install        # first time only
npm run dev
```
Open http://localhost:3000

## How local differs from live
- **Local (`npm run dev`)**: `getStaticProps` runs on every request, so editing content in
  the admin panel shows up immediately on refresh.
- **Live**: the site is a static export; content refreshes when the **Publish** button
  triggers a rebuild + redeploy (Phase 8/9).

## Config
- Frontend reads the API URL from `frontend-nextjs/.env.local`
  (`CONTENT_API_URL`, `CONTENT_API_KEY`, `NEXT_PUBLIC_API_URL`).
- Backend reads DB + keys from `backend-codeigniter/.env`.

## Quick smoke test
- Home/About/Products/Explore/Privacy/Terms should render.
- Admin → edit a section → save → refresh the matching page → change appears.
- `/checkout` → Pay Securely → Razorpay **test card 4111 1111 1111 1111**, any future expiry/CVV.
