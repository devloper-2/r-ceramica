/**
 * gen-site-data.mjs — Build-time refresh of src/lib/generated/site-data.json
 * from the CodeIgniter API (navigation + settings). Runs before `next build`
 * (see package.json "prebuild"). If the API is unreachable it leaves the
 * committed fallback untouched and exits 0 so the build still succeeds.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const OUT = join(root, "src/lib/generated/site-data.json");

// Minimal .env.local loader so the script has the API URL + key locally.
const envPath = join(root, ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const BASE = process.env.CONTENT_API_URL || "http://localhost:8080/api/v1";
const KEY = process.env.CONTENT_API_KEY || "";

async function get(path) {
  const res = await fetch(`${BASE}${path}`, { headers: { "X-API-Key": KEY } });
  if (!res.ok) throw new Error(`${path} -> ${res.status}`);
  return (await res.json()).data;
}

function buildFull(a) {
  if (!a) return "";
  return `${a.street}, ${a.city}-${a.postalCode}. ${a.state} (${a.countryFull})`;
}

try {
  const [nav, settings] = await Promise.all([get("/navigation"), get("/settings")]);
  const current = JSON.parse(readFileSync(OUT, "utf8"));

  const out = {
    nav: (nav || []).map((n) => ({ label: n.label, href: n.url })),
    languages: settings.languages || current.languages,
    footer: {
      quickLinks: settings.footer?.quickLinks || current.footer.quickLinks,
      corporateLinks: settings.footer?.corporateLinks || current.footer.corporateLinks,
    },
    contact: settings.contact || current.contact,
    address: {
      ...current.address,
      ...(settings.address || {}),
      full: settings.address?.full || buildFull(settings.address) || current.address.full,
    },
    socials: { ...current.socials, ...(settings.socials || {}) },
    site: {
      name: settings.site?.name || current.site.name,
      shortDescription: settings.site?.shortDescription || current.site.shortDescription,
    },
  };

  writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
  console.log("✓ site-data.json regenerated from API");
} catch (e) {
  console.warn("⚠ site-data generation skipped (using committed fallback):", e.message);
}
