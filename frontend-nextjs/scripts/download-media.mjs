import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "..");
const publicMediaDir = path.join(root, "public", "media");
const mapFile = path.join(root, "src", "lib", "generated", "media-map.json");

// Ensure directories exist
if (!fs.existsSync(publicMediaDir)) fs.mkdirSync(publicMediaDir, { recursive: true });
if (!fs.existsSync(path.dirname(mapFile))) fs.mkdirSync(path.dirname(mapFile), { recursive: true });

// Minimal .env.local loader
const envPath = path.join(root, ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const BASE = process.env.CONTENT_API_URL || "http://localhost:8080/api/v1";
const KEY = process.env.CONTENT_API_KEY || "";

// The API and its media sit behind Hostinger's WAF, which drops requests with
// no browser User-Agent.
const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

async function get(path) {
  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: { "X-API-Key": KEY, "User-Agent": BROWSER_UA, Accept: "application/json" },
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (err) {
    return null;
  }
}

// Media Map (Original URL -> Local URL)
let mediaMap = {};
if (fs.existsSync(mapFile)) {
  try {
    mediaMap = JSON.parse(fs.readFileSync(mapFile, "utf8"));
  } catch (e) {}
}

const videoExtensions = [".mp4", ".webm", ".mov"];
let downloadedCount = 0;

async function downloadFile(url) {
  // Only process external URLs
  if (!url || typeof url !== "string" || !url.startsWith("http")) return;
  
  // Only process video extensions (can be expanded to images if needed)
  const isVideo = videoExtensions.some(ext => {
    const urlWithoutQuery = url.split("?")[0].toLowerCase();
    return urlWithoutQuery.endsWith(ext);
  });
  
  if (!isVideo) return;

  if (mediaMap[url]) {
    // Check if file actually exists
    const localPath = path.join(root, "public", mediaMap[url]);
    if (fs.existsSync(localPath)) return; // Already mapped and exists
  }

  const hash = crypto.createHash("md5").update(url).digest("hex").substring(0, 8);
  const ext = path.extname(url.split("?")[0]) || ".mp4";
  const filename = `${hash}${ext}`;
  const localPath = path.join(publicMediaDir, filename);
  const localUrl = `/media/${filename}`;

  try {
    console.log(`Downloading: ${url}`);
    const response = await fetch(url, { headers: { "User-Agent": BROWSER_UA } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(localPath, buffer);
    
    mediaMap[url] = localUrl;
    downloadedCount++;
  } catch (err) {
    console.error(`Failed to download ${url}:`, err.message);
  }
}

async function findAndDownloadUrls(obj) {
  if (!obj) return;
  if (typeof obj === "string") {
    await downloadFile(obj);
  } else if (Array.isArray(obj)) {
    for (const item of obj) await findAndDownloadUrls(item);
  } else if (typeof obj === "object") {
    for (const key of Object.keys(obj)) {
      await findAndDownloadUrls(obj[key]);
    }
  }
}

async function run() {
  console.log("Starting build-time media download...");
  
  // 1. Fetch pages list, then fetch each page detail
  const pagesList = await get("/pages");
  if (pagesList && Array.isArray(pagesList)) {
    for (const page of pagesList) {
      if (page.slug) {
        const pageData = await get(`/pages/${page.slug}`);
        await findAndDownloadUrls(pageData);
      }
    }
  }
  
  // 2. Fetch categories & subcategories & products
  const categories = await get("/categories");
  await findAndDownloadUrls(categories);
  
  // Note: /products returns all products if no category is provided
  const products = await get("/products");
  await findAndDownloadUrls(products);
  
  const catalogues = await get("/catalogues");
  await findAndDownloadUrls(catalogues);
  
  const settings = await get("/settings");
  await findAndDownloadUrls(settings);

  // Save the mapping
  fs.writeFileSync(mapFile, JSON.stringify(mediaMap, null, 2) + "\n");
  console.log(`✓ Media download complete. Downloaded ${downloadedCount} new videos.`);
}

run();
