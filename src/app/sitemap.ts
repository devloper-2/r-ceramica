import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/catalogue`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/tiles`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/bathrooms`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/accessories`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
  ];

  // TODO: Add dynamic product routes fetched from your CMS/DB:
  // const products = await fetchProducts();
  // const productRoutes = products.map((p) => ({ url: `${base}/tiles/${p.slug}`, ... }));

  return staticRoutes;
}
