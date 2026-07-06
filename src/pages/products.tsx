import { useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronRight, ChevronDown, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import ProductFilters from "@/components/sections/ProductFilters";
import { CATEGORY_MAP, productsForCategory } from "@/lib/constants/products";
import { webPageSchema } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const TITLE = `Products | ${siteConfig.name}`;
const DESCRIPTION =
  "Browse R Ceramica's collection of faucets, showers, basins and surfaces — filter by finish, mounting, range and shape.";

const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest Arrivals" },
];

/**
 * Products page → "/products" (ported from static-html/products.html).
 * Reads ?category to set the title; the filter sidebar is presentational and
 * the cart quantity is demo/local (matching the source).
 */
export default function ProductsPage() {
  const router = useRouter();
  const categoryId = (router.query.category as string) || "fusion";

  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [sortOpen, setSortOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const products = useMemo(() => productsForCategory(categoryId), [categoryId]);
  const title = CATEGORY_MAP[categoryId] || "Our Collection";

  return (
    <div className="page-products">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${siteConfig.url}/products`} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webPageSchema("/products", "Products", DESCRIPTION)),
          }}
        />
      </Head>

      <main className="pt-32 md:pt-48 pb-24">
        <div className="max-w-[1720px] mx-auto px-6 md:px-12 lg:px-24">
          {/* Breadcrumbs & sort */}
          <div className="relative z-[70] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/40">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={10} />
              <Link href="/bathrooms" className="hover:text-white transition-colors">Bathrooms</Link>
              <ChevronRight size={10} />
              <span className="text-white">{title}</span>
            </div>

            <div className="flex items-center gap-8">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                <span className="text-white">{products.length}</span> Products Found
              </p>
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSortOpen((v) => !v);
                  }}
                  onBlur={() => setTimeout(() => setSortOpen(false), 150)}
                  className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/80 hover:text-white pb-1 border-b border-white/10 transition-colors"
                >
                  Sort By: <span>{sort.label}</span> <ChevronDown size={12} />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-[var(--color-bg-card)] border border-white/5 z-[100] shadow-2xl backdrop-blur-xl">
                    <div className="flex flex-col py-3">
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setSort(opt);
                            setSortOpen(false);
                          }}
                          className="px-6 py-4 text-[9px] uppercase tracking-[0.3em] text-left text-white/50 hover:text-white hover:bg-white/5 transition-all"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-16">
            <ProductFilters mobileOpen={filtersOpen} onClose={() => setFiltersOpen(false)} />

            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-20">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile filter toggle */}
      <button
        onClick={() => setFiltersOpen(true)}
        className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-3 bg-white text-black px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold shadow-2xl rounded-full"
      >
        <SlidersHorizontal size={14} /> Filters
      </button>
    </div>
  );
}
