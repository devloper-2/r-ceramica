import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight, ChevronDown, Plus, Minus, ShoppingCart, Filter, X, ImageOff } from "lucide-react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { siteConfig } from "@/config/site";
import { api, type ApiProductListItem, type ApiSubcategoryDetail } from "@/lib/services/api";
import { getCart, setCartQuantity } from "@/lib/services/cart";

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

// ─── Module-level components — stable identity, no remount on parent render ──

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
    <div className="border border-white/5">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex justify-between items-center bg-[#111] px-6 py-5 hover:bg-[#151515] transition-colors group"
      >
        <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-white/60 cursor-pointer group-hover:text-white">
          {label}
        </span>
        {open ? (
          <Minus size={14} className="text-white/40 group-hover:text-white transition-transform" />
        ) : (
          <Plus size={14} className="text-white/40 group-hover:text-white transition-transform" />
        )}
      </button>
      {open && (
        <div className="px-6 py-8 space-y-4 bg-black/40 filter-content-open">
          {children}
        </div>
      )}
    </div>
  );
}

function CheckboxOption({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer text-[10px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors">
      <input type="checkbox" className="w-3.5 h-3.5 bg-white/5 border border-white/20 accent-white" />
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
    /* blocking fallback */
  }
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{
  subcategory: ApiSubcategoryDetail;
  categorySlug: string;
}> = async ({ params }) => {
  const categorySlug = String(params?.category);
  const subSlug = String(params?.subcategory);
  try {
    const subcategory = await api.getSubcategory(subSlug);
    return { props: { subcategory, categorySlug } };
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

  // Ref for direct DOM slider fill — bypasses React re-render for instant visual response
  const sliderRef = useRef<HTMLInputElement>(null);

  const setSliderFill = (val: number, max: number) => {
    if (!sliderRef.current || max <= 0) return;
    const pct = (val / max) * 100;
    sliderRef.current.style.background =
      `linear-gradient(to right, #c5a059 0%, #c5a059 ${pct}%, rgba(255,255,255,0.12) ${pct}%, rgba(255,255,255,0.12) 100%)`;
  };

  // Initialise slider fill on mount
  useEffect(() => {
    setSliderFill(maxP, maxPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if (sliderRef.current) sliderRef.current.value = String(maxPrice);
    setSliderFill(maxPrice, maxPrice);
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
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className="pt-28 md:pt-40 pb-16">
        <div className="productfileter">

          <h1 className="text-3xl md:text-5xl font-display font-light uppercase tracking-tight text-white mb-10 leading-tight">
            {subcategory.name}
          </h1>

          {/* Breadcrumb + count + sort */}
          <div className="relative z-[70] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="flex items-center w-full gap-3 text-[10px] uppercase tracking-[0.2em] text-white/40">
              <Link href="/explore" className="hover:text-white transition-colors">Explore</Link>
              <ChevronRight size={10} />
              <Link href={`/explore/${categorySlug}`} className="hover:text-white transition-colors">
                {subcategory.category_name || categorySlug}
              </Link>
              <ChevronRight size={10} />
              <span className="text-white">{subcategory.name}</span>
            </div>

            <div className="flex items-center  justify-between md:justify-end w-full gap-8">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                <span className="text-white">{visible.length}</span> Products Found
              </p>
              <div className="relative text-right lg:hidden">
                <button type="button" onClick={() => setMobileFilter(true)} className="flex items-center justify-center bg-white text-black w-12 h-12 rounded-full shadow-2xl active:scale-90 transition-transform">
                  <Filter size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-5 md:gap-10">

            {/* ── Filter sidebar ── */}
            <aside className={`sub-filter ${mobileFilter ? "sub-filter-open" : ""} sub-filter w-full lg:w-64 xl:w-80 shrink-0`}>
              <div className="sub-filter-panel lg:sticky lg:top-40 flex flex-col h-full lg:h-auto">

                {/* Mobile header */}
                <div className="lg:hidden flex justify-between items-center px-6 py-6 border-b border-white/5 sticky top-0 bg-[#0a0a0a] z-10">
                  <h4 className="text-lg font-display uppercase tracking-widest text-[#c5a059]">Refine By</h4>
                  <button type="button" onClick={() => setMobileFilter(false)} className="text-white/60 hover:text-white transition-colors">
                    <X size={24} />
                  </button>
                </div>

                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto px-6 lg:px-0 py-8 lg:py-0 sub-filter-scroll">

                  {/* Selected Options */}
                  <div className="bg-white/5 border border-white/5 p-6 mb-2">
                    <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 mb-4">
                      Selected Options
                    </h4>
                    <div className="flex flex-wrap gap-2 min-h-[26px]">
                      {isPriceFiltered ? (
                        <button
                          type="button"
                          onClick={resetFilters}
                          className="bg-white/10 text-[9px] px-3 py-1.5 uppercase tracking-widest flex items-center gap-2 hover:bg-white/20 transition-colors"
                        >
                          ₹{applied.min.toLocaleString()}–₹{applied.max.toLocaleString()}
                          <X size={10} />
                        </button>
                      ) : (
                        <span className="text-[9px] uppercase tracking-widest text-white/20 leading-[26px]">None</span>
                      )}
                    </div>
                  </div>

                  {/* Budget Range */}
                  <FilterAccordion
                    label="Budget Range"
                    open={accordions.price}
                    onToggle={() => toggleAccordion("price")}
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between text-[9px] uppercase tracking-widest text-white/40">
                        <span>Min: ₹{minP.toLocaleString()}</span>
                        <span>Max: ₹{maxP.toLocaleString()}</span>
                      </div>
                      {/* Uncontrolled slider — browser owns position, ref owns fill */}
                      <input
                        ref={sliderRef}
                        type="range"
                        min={0}
                        max={maxPrice}
                        step={1}
                        defaultValue={maxPrice}
                        onInput={(e) => {
                          const val = Number((e.target as HTMLInputElement).value);
                          setSliderFill(val, maxPrice);
                          setMaxP(val);
                        }}
                        className="sub-range w-full cursor-pointer"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
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
                            onChange={(e) => {
                              const val = Math.max(0, Number(e.target.value));
                              setMaxP(val);
                              setSliderFill(val, maxPrice);
                              if (sliderRef.current) sliderRef.current.value = String(val);
                            }}
                            className="w-full bg-white/5 border border-white/10 pl-6 pr-3 py-3 text-[10px] text-white outline-none focus:border-[#c5a059] transition-colors appearance-none"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={applyRange}
                      className="w-full py-3 mt-4 text-[9px] uppercase tracking-[0.2em] font-bold border border-[#c5a059]/30 text-[#c5a059] hover:bg-[#c5a059] hover:text-white transition-all"
                    >
                      Apply Range
                    </button>
                  </FilterAccordion>

                  <FilterAccordion label="Area" open={accordions.area} onToggle={() => toggleAccordion("area")}>
                    <CheckboxOption label="Basin" />
                    <CheckboxOption label="Shower" />
                    <CheckboxOption label="Kitchen" />
                  </FilterAccordion>

                  <FilterAccordion label="Color Finishes" open={accordions.color} onToggle={() => toggleAccordion("color")}>
                    <CheckboxOption label="Black Chrome" />
                    <CheckboxOption label="Black Matt" />
                    <CheckboxOption label="Blush Gold PVD" />
                    <CheckboxOption label="Chrome" />
                    <CheckboxOption label="Gold Bright PVD" />
                  </FilterAccordion>

                  <FilterAccordion label="Mounting" open={accordions.mounting} onToggle={() => toggleAccordion("mounting")}>
                    <CheckboxOption label="Deck Mounted" />
                    <CheckboxOption label="Wall Mounted" />
                  </FilterAccordion>

                  <FilterAccordion label="Range" open={accordions.range} onToggle={() => toggleAccordion("range")}>
                    <CheckboxOption label="Economy" />
                    <CheckboxOption label="Premium" />
                    <CheckboxOption label="Luxury" />
                  </FilterAccordion>

                  <FilterAccordion label="Shape" open={accordions.shape} onToggle={() => toggleAccordion("shape")}>
                    <CheckboxOption label="Square" />
                    <CheckboxOption label="Round" />
                    <CheckboxOption label="Curved" />
                  </FilterAccordion>

                  {/* Mobile reset inside scroll */}
                  <div className="pt-6 lg:hidden">
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="w-full py-5 text-[10px] uppercase tracking-[0.4em] font-bold border border-white/10 hover:bg-white hover:text-black transition-all"
                    >
                      Reset All
                    </button>
                  </div>
                </div>

                {/* Mobile apply footer */}
                <div className="lg:hidden p-6 border-t border-white/5 bg-[#0a0a0a]">
                  <button
                    type="button"
                    onClick={() => setMobileFilter(false)}
                    className="w-full py-5 text-[10px] uppercase tracking-[0.4em] font-bold bg-[#c5a059] text-white"
                  >
                    Apply Selection
                  </button>
                </div>

                {/* Desktop reset — outside scroll so always visible */}
                <div className="hidden lg:block pt-6">
                  <button
                    type="button"
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
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-16">
                  {visible.map((p) => {
                    const q = qty[p.slug] || 0;
                    return (
                      <div key={p.id} className="product-card group border border-white/10 bg-[#0e0e0e] hover:border-white/20 transition-colors duration-300">
                        {/* Image */}
                        <Link
                          href={`/products/${p.slug}`}
                          className="block relative bg-[#111] overflow-hidden min-h-[240px] max-h-[460px]"
                          style={{ height: "calc(100vh - 430px)" }}
                        >
                          {p.image ? (
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              sizes="(max-width:768px) 100vw,(max-width:1280px) 50vw,33vw"
                              className="product-img object-cover transition-transform duration-[1.5s] ease-out"
                            />
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/20 select-none">
                              <ImageOff size={40} strokeWidth={1} />
                              <span className="text-[9px] uppercase tracking-[0.3em]">No image</span>
                            </div>
                          )}
                          {/* Gold badge */}
                          <div className="absolute top-4 left-4">
                            <span className="bg-[#c5a059] text-black text-[7px] uppercase tracking-[0.3em] font-bold px-2.5 py-1">
                              New
                            </span>
                          </div>
                          {/* Hover dim */}
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </Link>

                        {/* Info — left-aligned, structured */}
                        <div className="p-5 border-t border-white/10">
                          {/* Series */}
                          <p className="text-[8px] text-[#c5a059] uppercase tracking-[0.4em] font-medium mb-1.5">
                            {seriesLabel} Series
                          </p>
                          {/* Name */}
                          <Link href={`/products/${p.slug}`}>
                            <h3 className="text-sm font-display font-semibold uppercase tracking-[0.06em] text-white hover:text-[#c5a059] transition-colors leading-tight mb-1">
                              {p.name}
                            </h3>
                          </Link>
                          {/* Code / short description */}
                          {p.short_description && (
                            <p className="text-[8px] text-white/40 uppercase tracking-[0.1em] truncate mb-4">
                              {p.short_description}
                            </p>
                          )}

                          {/* Price block */}
                          <div className="mb-4">
                            <p className="text-[7px] text-white/40 uppercase tracking-[0.3em] mb-0.5">MRP</p>
                            <p className="text-xl font-display font-light text-[#c5a059] tracking-tight leading-none mb-0.5">
                              {fmtPrice(p.price, p.currency)}
                            </p>
                            <p className="text-[7px] text-white/25 uppercase tracking-[0.2em]">
                              Inclusive of all taxes
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            {q === 0 ? (
                              <button
                                type="button"
                                onClick={() => changeQty(p, 1)}
                                className="w-full py-2.5 bg-white text-black text-[8px] uppercase tracking-[0.35em] font-bold hover:bg-[#c5a059] hover:text-white transition-colors flex items-center justify-center gap-2"
                              >
                                <ShoppingCart size={12} /> Add to Cart
                              </button>
                            ) : (
                              <div className="flex items-center justify-between bg-white text-black h-10 px-4">
                                <button
                                  type="button"
                                  onClick={() => changeQty(p, -1)}
                                  className="w-8 h-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
                                >
                                  <Minus size={11} />
                                </button>
                                <span className="text-[9px] font-bold tracking-[0.2em]">{q}</span>
                                <button
                                  type="button"
                                  onClick={() => changeQty(p, 1)}
                                  className="w-8 h-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
                                >
                                  <Plus size={11} />
                                </button>
                              </div>
                            )}
                            <Link
                              href={`/products/${p.slug}`}
                              className="w-full py-2.5 border border-white/15 text-white/50 text-[8px] uppercase tracking-[0.35em] hover:border-[#c5a059] hover:text-[#c5a059] transition-all text-center"
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

      <style jsx>{`
        /* ── Price range slider ──────────────────────────── */
        .sub-range {
          -webkit-appearance: none;
          height: 2px;
          border-radius: 2px;
          outline: none;
          /* background set via JS ref — no React re-render needed */
          background: rgba(255,255,255,0.12);
        }
        .sub-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #c5a059;
          border: 2px solid #0a0a0a;
          box-shadow: 0 0 0 3px rgba(197,160,89,0.3);
          cursor: grab;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .sub-range:active::-webkit-slider-thumb {
          cursor: grabbing;
          transform: scale(1.3);
          box-shadow: 0 0 0 6px rgba(197,160,89,0.2);
        }
        .sub-range::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #c5a059;
          border: 2px solid #0a0a0a;
          cursor: grab;
        }
        .sub-range::-moz-range-track {
          height: 2px;
          background: transparent;
        }

        /* ── Filter accordion open animation ────────────── */
        .filter-content-open {
          animation: filterIn 0.2s ease-out both;
        }
        @keyframes filterIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Product card image hover zoom ──────────────── */
        .product-card:hover .product-img {
          transform: scale(1.05);
        }

        /* ── Desktop scrollable filter panel ────────────── */
        @media (min-width: 1024px) {
          .sub-filter-scroll {
            max-height: calc(100vh - 240px);
            overflow-y: auto;
            padding-right: 6px;
            scrollbar-width: thin;
            scrollbar-color: #333 transparent;
          }
          .sub-filter-scroll::-webkit-scrollbar { width: 3px; }
          .sub-filter-scroll::-webkit-scrollbar-track { background: transparent; }
          .sub-filter-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
          .sub-filter-scroll > * + * { margin-top: 8px; }
        }

        /* ── Mobile filter drawer ───────────────────────── */
        @media (max-width: 1023px) {
          .sub-filter {
            position: fixed;
            inset: 0;
            z-index: 300;
            background: rgba(0,0,0,0.55);
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
            background: #0a0a0a;
            border-right: 1px solid rgba(255,255,255,0.05);
            transform: translateX(-100%);
            transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
            display: flex;
            flex-direction: column;
          }
          .sub-filter-open .sub-filter-panel {
            transform: translateX(0);
          }
          .sub-filter-scroll > * + * { margin-top: 8px; }
        }
      `}</style>
    </div>
  );
}
