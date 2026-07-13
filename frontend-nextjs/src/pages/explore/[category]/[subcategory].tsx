import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronRight, ChevronDown, Plus, Minus, ShoppingCart, Filter, X } from "lucide-react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { siteConfig } from "@/config/site";
import { api, type ApiProductListItem, type ApiSubcategoryDetail } from "@/lib/services/api";
import { getCart, setCartQuantity } from "@/lib/services/cart";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1200";

const CURRENCY_SYMBOLS: Record<string, string> = { INR: "₹", USD: "$", EUR: "€" };
const fmtPrice = (price: number | string, currency: string) =>
  `${CURRENCY_SYMBOLS[currency] ?? currency} ${Number(price).toLocaleString()}`;

type SortKey = "recommended" | "price-low" | "price-high" | "newest";
const SORT_LABELS: Record<SortKey, string> = {
  recommended: "Recommended",
  "price-low": "Price: Low to High",
  "price-high": "Price: High to Low",
  newest: "Newest Arrivals",
};

// ── Sub-components defined at MODULE level so React never re-mounts them ────────
function FilterAccordion({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-white/5 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center bg-[#111] px-6 py-5 hover:bg-[#151515] transition-colors group"
      >
        <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-white/80 group-hover:text-white">
          {label}
        </span>
        {open ? (
          <Minus size={14} className="text-white/40 group-hover:text-white" />
        ) : (
          <Plus size={14} className="text-white/40 group-hover:text-white" />
        )}
      </button>
      {open && (
        <div className="px-6 py-8 space-y-4 bg-black/40">{children}</div>
      )}
    </div>
  );
}

function CheckboxOption({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-3 group cursor-pointer text-[10px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors">
      <input
        type="checkbox"
        className="w-3.5 h-3.5 rounded-sm bg-white/5 border border-white/10 accent-white"
      />
      <span>{label}</span>
    </label>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { category: string; subcategory: string } }[] = [];
  try {
    const categories = await api.getCategories();
    for (const cat of categories) {
      const full = await api.getCategory(cat.slug);
      for (const sub of full.subcategories ?? []) {
        paths.push({ params: { category: cat.slug, subcategory: sub.slug } });
      }
    }
  } catch {
    /* blocking fallback resolves paths on demand */
  }
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<{
  subcategory: ApiSubcategoryDetail;
  categorySlug: string;
}> = async ({ params }) => {
  const categorySlug = String(params?.category);
  const subSlug = String(params?.subcategory);
  try {
    const subcategory = await api.getSubcategory(subSlug);
    return { props: { subcategory, categorySlug }, revalidate: 60 };
  } catch {
    return { notFound: true };
  }
};

type AccordionKey = "price" | "area" | "color" | "mounting" | "range" | "shape";

export default function SubcategoryProductsPage({
  subcategory,
  categorySlug,
}: {
  subcategory: ApiSubcategoryDetail;
  categorySlug: string;
}) {
  const products = subcategory.products ?? [];
  const seriesLabel = subcategory.name;

  const maxPrice = useMemo(
    () => Math.max(1000, ...products.map((p) => Number(p.price) || 0)),
    [products]
  );

  const [sort, setSort] = useState<SortKey>("recommended");
  const [sortOpen, setSortOpen] = useState(false);
  const [minP, setMinP] = useState(0);
  const [maxP, setMaxP] = useState(maxPrice);
  const [applied, setApplied] = useState({ min: 0, max: maxPrice });
  const [accordions, setAccordions] = useState<Record<AccordionKey, boolean>>({
    price: false,
    area: false,
    color: false,
    mounting: false,
    range: false,
    shape: false,
  });
  const [mobileFilter, setMobileFilter] = useState(false);
  const [qty, setQty] = useState<Record<string, number>>({});

  const toggleAccordion = (key: AccordionKey) =>
    setAccordions((a) => ({ ...a, [key]: !a[key] }));

  useEffect(() => {
    const map: Record<string, number> = {};
    for (const line of getCart()) map[line.slug] = line.quantity;
    setQty(map);
  }, []);

  const visible = useMemo(() => {
    let list = products.filter((p) => {
      const pr = Number(p.price) || 0;
      return pr >= applied.min && pr <= applied.max;
    });
    if (sort === "price-low") list = [...list].sort((a, b) => Number(a.price) - Number(b.price));
    else if (sort === "price-high") list = [...list].sort((a, b) => Number(b.price) - Number(a.price));
    else if (sort === "newest") list = [...list].reverse();
    return list;
  }, [products, sort, applied]);

  const isPriceFiltered = applied.min > 0 || applied.max < maxPrice;
  const sliderPct = maxPrice > 0 ? (maxP / maxPrice) * 100 : 100;

  const changeQty = (p: ApiProductListItem, delta: number) => {
    const next = Math.max(0, (qty[p.slug] || 0) + delta);
    setQty((q) => ({ ...q, [p.slug]: next }));
    setCartQuantity({
      slug: p.slug,
      name: p.name,
      price: Number(p.price),
      image: p.image || undefined,
      quantity: next,
    });
  };

  const applyRange = () => {
    setApplied({ min: Math.min(minP, maxP), max: Math.max(minP, maxP) });
    setMobileFilter(false);
  };

  const resetFilters = () => {
    setMinP(0);
    setMaxP(maxPrice);
    setApplied({ min: 0, max: maxPrice });
    setSort("recommended");
  };

  const title = `${subcategory.name} | ${siteConfig.name}`;
  const description =
    subcategory.description ||
    subcategory.subtitle ||
    `Browse ${subcategory.name} products by R Ceramica.`;

  return (
    <div className="page-subcategory bg-[#0a0a0a] text-white font-light min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${siteConfig.url}/explore/${categorySlug}/${subcategory.slug}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className="pt-32 md:pt-48 pb-24">
        <div className="max-w-[1720px] mx-auto px-6 md:px-12 lg:px-24">

          {/* ── Breadcrumb + count + sort ── */}
          <div className="relative z-[70] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/40">
              <Link href="/explore" className="hover:text-white transition-colors">Explore</Link>
              <ChevronRight size={10} />
              <Link href={`/explore/${categorySlug}`} className="hover:text-white transition-colors">
                {subcategory.category_name || categorySlug}
              </Link>
              <ChevronRight size={10} />
              <span className="text-white">{subcategory.name}</span>
            </div>

            <div className="flex items-center gap-8">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                <span className="text-white">{visible.length}</span> Products Found
              </p>
              <div className="relative">
                <button
                  onClick={() => setSortOpen((o) => !o)}
                  className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/80 hover:text-white pb-1 border-b border-white/10 transition-colors"
                >
                  Sort By: <span>{SORT_LABELS[sort]}</span> <ChevronDown size={12} />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-[#111] border border-white/5 z-[100] shadow-2xl">
                    <div className="flex flex-col py-3">
                      {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
                        <button
                          key={k}
                          onClick={() => { setSort(k); setSortOpen(false); }}
                          className="px-6 py-4 text-[9px] uppercase tracking-[0.3em] text-left text-white/50 hover:text-white hover:bg-white/5 transition-all"
                        >
                          {SORT_LABELS[k]}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-16">

            {/* ── Filter sidebar ── */}
            <aside className={`sub-filter ${mobileFilter ? "sub-filter-open" : ""} w-full lg:w-80 shrink-0`}>
              <div className="sub-filter-panel lg:sticky lg:top-40 flex flex-col h-full lg:h-auto bg-[#0a0a0a] lg:bg-transparent">

                {/* Mobile header */}
                <div className="lg:hidden flex justify-between items-center px-6 py-6 border-b border-white/5 sticky top-0 bg-[#0a0a0a] z-10">
                  <h4 className="text-lg font-display uppercase tracking-widest text-[#c5a059]">Refine By</h4>
                  <button onClick={() => setMobileFilter(false)} className="text-white/60 hover:text-white transition-colors">
                    <X size={24} />
                  </button>
                </div>

                {/* Scrollable filter panel */}
                <div className="flex-1 overflow-y-auto px-6 lg:px-0 py-8 lg:py-0 lg:space-y-2 sub-filter-scroll">

                  {/* Selected Options */}
                  <div className="bg-white/5 border border-white/5 p-6 mb-6">
                    <h4 className="text-[10px] font-display font-medium uppercase tracking-[0.2em] text-white/40 mb-4">
                      Selected Options
                    </h4>
                    <div className="flex flex-wrap gap-2 min-h-[28px]">
                      {isPriceFiltered ? (
                        <span
                          onClick={resetFilters}
                          className="bg-white/10 text-[9px] px-3 py-1.5 uppercase tracking-widest flex items-center gap-2 cursor-pointer hover:bg-white/20 transition-colors"
                        >
                          ₹{applied.min.toLocaleString()}–₹{applied.max.toLocaleString()}
                          <X size={10} />
                        </span>
                      ) : (
                        <span className="text-[9px] uppercase tracking-widest text-white/20 leading-7">None</span>
                      )}
                    </div>
                  </div>

                  {/* Budget Range */}
                  <FilterAccordion
                    label="Budget Range"
                    open={accordions.price}
                    onToggle={() => toggleAccordion("price")}
                  >
                    <div className="space-y-4 pb-4">
                      <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-white/40">
                        <span>Min: ₹{minP.toLocaleString()}</span>
                        <span>Max: ₹{maxP.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={maxPrice}
                        step={Math.max(1, Math.round(maxPrice / 100))}
                        value={maxP}
                        onChange={(e) => setMaxP(Number(e.target.value))}
                        style={{
                          background: `linear-gradient(to right, #c5a059 0%, #c5a059 ${sliderPct}%, rgba(255,255,255,0.12) ${sliderPct}%, rgba(255,255,255,0.12) 100%)`,
                        }}
                        className="sub-range cursor-pointer"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[8px] uppercase tracking-widest text-white/30">Min Budget</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] text-white/40">₹</span>
                          <input
                            type="number"
                            min={0}
                            value={minP}
                            onChange={(e) => setMinP(Math.max(0, Number(e.target.value)))}
                            className="w-full bg-white/5 border border-white/10 pl-6 pr-3 py-3 text-[10px] text-white outline-none focus:border-[#c5a059] transition-colors appearance-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[8px] uppercase tracking-widest text-white/30">Max Budget</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] text-white/40">₹</span>
                          <input
                            type="number"
                            min={0}
                            value={maxP}
                            onChange={(e) => setMaxP(Math.max(0, Number(e.target.value)))}
                            className="w-full bg-white/5 border border-white/10 pl-6 pr-3 py-3 text-[10px] text-white outline-none focus:border-[#c5a059] transition-colors appearance-none"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={applyRange}
                      className="w-full py-3 text-[9px] uppercase tracking-[0.2em] font-bold border border-[#c5a059]/20 text-[#c5a059] hover:bg-[#c5a059] hover:text-white transition-all mt-4"
                    >
                      Apply Range
                    </button>
                  </FilterAccordion>

                  {/* Area */}
                  <FilterAccordion label="Area" open={accordions.area} onToggle={() => toggleAccordion("area")}>
                    <CheckboxOption label="Basin" />
                    <CheckboxOption label="Shower" />
                    <CheckboxOption label="Kitchen" />
                  </FilterAccordion>

                  {/* Color Finishes */}
                  <FilterAccordion label="Color Finishes" open={accordions.color} onToggle={() => toggleAccordion("color")}>
                    <CheckboxOption label="Black Chrome" />
                    <CheckboxOption label="Black Matt" />
                    <CheckboxOption label="Blush Gold PVD" />
                    <CheckboxOption label="Chrome" />
                    <CheckboxOption label="Gold Bright PVD" />
                  </FilterAccordion>

                  {/* Mounting */}
                  <FilterAccordion label="Mounting" open={accordions.mounting} onToggle={() => toggleAccordion("mounting")}>
                    <CheckboxOption label="Deck Mounted" />
                    <CheckboxOption label="Wall Mounted" />
                  </FilterAccordion>

                  {/* Range */}
                  <FilterAccordion label="Range" open={accordions.range} onToggle={() => toggleAccordion("range")}>
                    <CheckboxOption label="Economy" />
                    <CheckboxOption label="Premium" />
                    <CheckboxOption label="Luxury" />
                  </FilterAccordion>

                  {/* Shape */}
                  <FilterAccordion label="Shape" open={accordions.shape} onToggle={() => toggleAccordion("shape")}>
                    <CheckboxOption label="Square" />
                    <CheckboxOption label="Round" />
                    <CheckboxOption label="Curved" />
                  </FilterAccordion>

                  {/* Mobile reset inside scroll */}
                  <div className="pt-8 block lg:hidden">
                    <button
                      onClick={resetFilters}
                      className="w-full py-5 text-[10px] uppercase tracking-[0.4em] font-bold border border-white/10 hover:bg-white hover:text-black transition-all"
                    >
                      Reset All
                    </button>
                  </div>
                </div>

                {/* Mobile apply footer */}
                <div className="lg:hidden p-6 border-t border-white/5 bg-[#0a0a0a] sticky bottom-0">
                  <button
                    onClick={() => setMobileFilter(false)}
                    className="w-full py-5 text-[10px] uppercase tracking-[0.4em] font-bold bg-[#c5a059] text-white transition-all"
                  >
                    Apply Selection
                  </button>
                </div>

                {/* Desktop reset below scroll */}
                <div className="hidden lg:block pt-8">
                  <button
                    onClick={resetFilters}
                    className="w-full py-5 text-[10px] uppercase tracking-[0.4em] font-bold border border-white/10 hover:bg-white hover:text-black transition-all"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </aside>

            {/* ── Product grid ── */}
            <div className="flex-1">
              {visible.length === 0 ? (
                <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] py-20 text-center">
                  No products match your selection.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-20">
                  {visible.map((p) => {
                    const q = qty[p.slug] || 0;
                    return (
                      <div key={p.id} className="product-card group">
                        <Link
                          href={`/products/${p.slug}`}
                          className="block relative aspect-[4/5] bg-[#111] overflow-hidden mb-8 cursor-pointer"
                        >
                          <Image
                            src={p.image || FALLBACK_IMAGE}
                            alt={p.name}
                            fill
                            sizes="(max-width:768px) 100vw,(max-width:1280px) 50vw,33vw"
                            className="product-img object-cover transition-transform duration-[1.5s] ease-out"
                          />
                          <div className="absolute top-6 left-6">
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1 text-[8px] uppercase tracking-[0.2em] font-medium text-white/80">
                              New Arrival
                            </div>
                          </div>
                        </Link>

                        <div className="space-y-6 text-center px-4">
                          <div className="space-y-2">
                            <p className="text-[9px] text-[#c5a059] uppercase tracking-[0.4em] font-medium">
                              {seriesLabel} Series
                            </p>
                            <Link href={`/products/${p.slug}`}>
                              <h3 className="text-lg md:text-xl font-display font-light uppercase tracking-[0.15em] group-hover:text-white/80 transition-colors leading-snug">
                                {p.name}
                              </h3>
                            </Link>
                            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] truncate">
                              {p.subcategory_name ?? seriesLabel}
                            </p>
                            <p className="text-sm font-sans tracking-[0.1em] text-white/80">
                              {fmtPrice(p.price, p.currency)}
                            </p>
                          </div>

                          <div className="flex flex-col gap-3 pt-2">
                            {q === 0 ? (
                              <button
                                onClick={() => changeQty(p, 1)}
                                className="w-full py-4 bg-white text-black text-[9px] uppercase tracking-[0.4em] font-bold hover:bg-neutral-200 transition-all flex items-center justify-center gap-3"
                              >
                                <ShoppingCart size={14} /> Add to Cart
                              </button>
                            ) : (
                              <div className="flex items-center justify-between bg-white text-black h-12 px-4 shadow-xl">
                                <button
                                  onClick={() => changeQty(p, -1)}
                                  className="w-10 h-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="text-[10px] font-bold tracking-[0.2em]">{q}</span>
                                <button
                                  onClick={() => changeQty(p, 1)}
                                  className="w-10 h-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                            )}
                            <Link
                              href={`/products/${p.slug}`}
                              className="w-full py-4 border border-white/10 text-white/60 text-[9px] uppercase tracking-[0.4em] hover:bg-white/5 hover:text-white transition-all text-center"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile filter toggle */}
      <div className="lg:hidden fixed bottom-8 right-6 z-[80]">
        <button
          onClick={() => setMobileFilter(true)}
          className="flex items-center justify-center bg-white text-black w-12 h-12 rounded-full shadow-2xl active:scale-90 transition-all"
        >
          <Filter size={18} />
        </button>
      </div>

      <style jsx>{`
        .sub-range {
          -webkit-appearance: none;
          width: 100%;
          height: 2px;
          outline: none;
          border-radius: 2px;
          transition: background 0.05s linear;
        }
        .sub-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          background: #c5a059;
          cursor: grab;
          border-radius: 50%;
          border: 2px solid #0a0a0a;
          box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.25);
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .sub-range::-webkit-slider-thumb:hover,
        .sub-range::-webkit-slider-thumb:active {
          transform: scale(1.25);
          box-shadow: 0 0 0 6px rgba(197, 160, 89, 0.2);
          cursor: grabbing;
        }
        .sub-range::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: #c5a059;
          cursor: grab;
          border-radius: 50%;
          border: 2px solid #0a0a0a;
          box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.25);
        }
        .product-card:hover .product-img {
          transform: scale(1.05);
        }
        .sub-filter-scroll {
          scrollbar-width: thin;
          scrollbar-color: #333 #0a0a0a;
        }
        .sub-filter-scroll::-webkit-scrollbar {
          width: 3px;
        }
        .sub-filter-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .sub-filter-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        @media (min-width: 1024px) {
          .sub-filter-scroll {
            max-height: calc(100vh - 220px);
            overflow-y: auto;
            padding-right: 8px;
            margin-right: -8px;
          }
        }
        @media (max-width: 1023px) {
          .sub-filter {
            position: fixed;
            inset: 0;
            z-index: 300;
            background: rgba(0, 0, 0, 0.6);
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition: opacity 0.3s ease, visibility 0.3s ease;
          }
          .sub-filter-open {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
          }
          .sub-filter-panel {
            width: 85%;
            max-width: 360px;
            height: 100%;
            border-right: 1px solid rgba(255, 255, 255, 0.05);
            transform: translateX(-100%);
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .sub-filter-open .sub-filter-panel {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
