#!/usr/bin/env node
/**
 * Generates public/sitemap.xml at build time (static export can't use getServerSideProps).
 */
const SITE_URL = "https://staging.rceramica.com";
const paths = [
  "/", "/about", "/explore", "/bathrooms", "/contact",
  "/products", "/cart", "/catalogue", "/checkout",
  "/login", "/tracking", "/orders", "/privacy", "/terms",
];

// `trailingSlash: true` means /about redirects to /about/. Emit the final URL
// so the sitemap does not point search engines at a chain of 301s.
const withSlash = (p) => (p.endsWith("/") ? p : `${p}/`);

const urls = paths
  .map(
    (p) => `  <url>\n    <loc>${SITE_URL}${withSlash(p)}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "public", "sitemap.xml");
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, xml, "utf-8");
console.log("✓ public/sitemap.xml generated");
