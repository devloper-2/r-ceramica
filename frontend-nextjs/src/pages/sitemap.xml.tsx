import type { GetServerSideProps } from "next";
import { siteConfig } from "@/config/site";

/**
 * sitemap.xml.tsx — generates /sitemap.xml on request (Pages Router).
 * Replaces the App Router sitemap.ts route handler. Add new routes to the
 * `paths` array below (or fetch dynamic product slugs from a CMS).
 */
const paths = ["/", "/about", "/explore", "/bathrooms", "/contact", "/products", "/cart", "/catalogue", "/checkout", "/login", "/tracking", "/orders", "/privacy", "/terms"];

function buildSitemap(): string {
  const urls = paths
    .map(
      (path) => `  <url>
    <loc>${siteConfig.url}${path}</loc>
    <changefreq>weekly</changefreq>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/xml");
  res.write(buildSitemap());
  res.end();
  return { props: {} };
};

// Never rendered — getServerSideProps streams the XML directly.
export default function Sitemap() {
  return null;
}
