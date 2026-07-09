import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import { ChevronRight, ChevronDown, Plus, Minus, X, Check, Filter, ShoppingCart } from "lucide-react";
import { siteConfig } from "@/config/site";

const TITLE = `Products | ${siteConfig.name}`;
const DESCRIPTION =
  "Browse the full R Ceramica collection — architectural faucets, luxury showers, sanitary forms and tile surfaces.";

/* ── Static product catalogue ──────────────────────────────── */
const ALL_PRODUCTS = [
  { id: 1, name: "Fusion Basin Mixer",  collection: "Fusion",   code: "F10201CL", price: 12450, priceLabel: "12,450", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600" },
  { id: 2, name: "Prime Wall Mixer",    collection: "Fusion",   code: "F10202WM", price: 18200, priceLabel: "18,200", img: "https://images.unsplash.com/photo-1620626011761-9963d7b59675?auto=format&fit=crop&q=80&w=600" },
  { id: 3, name: "Eco High Neck Faucet",collection: "Fusion",   code: "E10301HN", price: 8900,  priceLabel: "8,900",  img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600" },
  { id: 4, name: "Sleek Pillar Cock",   collection: "Fusion",   code: "S10401PC", price: 4650,  priceLabel: "4,650",  img: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=600" },
  { id: 5, name: "Grand Shower Arm",    collection: "Fusion",   code: "G10501SA", price: 14000, priceLabel: "14,000", img: "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?auto=format&fit=crop&q=80&w=600" },
  { id: 6, name: "Urban Bath Spout",    collection: "Fusion",   code: "U10601BS", price: 6200,  priceLabel: "6,200",  img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600" },
  { id: 7, name: "Nova Concealed Valve",collection: "Fusion",   code: "N10701CV", price: 5500,  priceLabel: "5,500",  img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600" },
  { id: 8, name: "Zen Exposed Mixer",   collection: "Fusion",   code: "Z10801EM", price: 22400, priceLabel: "22,400", img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=600" },
  { id: 9, name: "Aero Hand Shower",    collection: "Fusion",   code: "A10901HS", price: 3800,  priceLabel: "3,800",  img: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=600" },
  { id: 10,name: "Minimal Diverter",    collection: "Fusion",   code: "M11001DV", price: 9500,  priceLabel: "9,500",  img: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=600" },
  { id: 11,name: "Artisan Glass Basin", collection: "Sanitary", code: "G20101VB", price: 32000, priceLabel: "32,000", img: "https://images.unsplash.com/photo-1620626014330-f99a0937285d?auto=format&fit=crop&q=80&w=600" },
  { id: 12,name: "Shadow Granite Slab", collection: "Tiles",    code: "SG501",    price: 450,   priceLabel: "450 / sqft", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800" },
];

const CATEGORY_MAP: Record<string, string> = {
  "101": "Rivo Collection",
  "201": "Curve Collection",
  "301": "Eva Collection",
  "401": "Roma Collection",
  "501": "Artiz Collection",
  "fusion": "Fusion Collection",
  "tiles": "Architectural Surfaces",
  "sanitary": "Sanitary Forms",
  "showers": "Luxury Showers",
  "basins": "Minimal Basins",
};

const COLOR_FINISHES = [
  { id: "black-chrome",  label: "Black Chrome",        img: "https://rceramica.com/img/finishes/black_chrome.jpg", fallback: "#333" },
  { id: "black-matt",    label: "Black Matt",           img: "",  fallback: "#1a1a1a" },
  { id: "blush-gold",    label: "Blush Gold Bright PVD",img: "",  fallback: "#7c5e42" },
  { id: "chrome",        label: "Chrome",               img: "",  fallback: "linear-gradient(135deg, #dfdfdf, #999)" },
  { id: "gold-pvd",      label: "Gold Bright PVD",      img: "",  fallback: "#b89552" },
];

type Product = (typeof ALL_PRODUCTS)[number];

function sortProducts(products: Product[], sort: string): Product[] {
  const copy = [...products];
  if (sort === "price-low") return copy.sort((a, b) => a.price - b.price);
  if (sort === "price-high") return copy.sort((a, b) => b.price - a.price);
  if (sort === "newest") return copy.reverse();
  return copy; // recommended — original order
}

/* ── Toast hook ──────────────────────────────────────────────── */
function useToast() {
  const [toast, setToast] = useState({ visible: false, message: "" });
  const showToast = useCallback((message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: "" }), 3000);
  }, []);
  return { toast, showToast };
}

export default function ProductsPage() {
  const router = useRouter();
  const categoryId = (router.query.category as string) || "fusion";
  const categoryLabel = CATEGORY_MAP[categoryId] || "Our Collection";

  /* ── State ─────────────────────────────────────── */
  const [cart, setCart] = useState<Record<number, number>>({});
  const [sortBy, setSortBy] = useState("recommended");
  const [sortLabel, setSortLabel] = useState("Recommended");
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [accordions, setAccordions] = useState<Record<string, boolean>>({ "color-filter": true });
  const [selectedFinish, setSelectedFinish] = useState<string>("gold-pvd");
  const [priceMax, setPriceMax] = useState(50000);
  const [priceMin, setPriceMin] = useState(0);
  const { toast, showToast } = useToast();

  /* ── Derived products ───────────────────────────── */
  const baseProducts =
    categoryId === "tiles"
      ? ALL_PRODUCTS.filter((p) => p.collection === "Tiles")
      : categoryId === "sanitary"
      ? ALL_PRODUCTS.filter((p) => p.collection === "Sanitary")
      : ALL_PRODUCTS;

  const displayProducts = sortProducts(baseProducts, sortBy);

  /* ── Helpers ─────────────────────────────────────── */
  const totalCartItems = Object.values(cart).reduce((a, b) => a + b, 0);

  function updateCart(id: number, delta: number) {
    setCart((prev) => {
      const next = { ...prev };
      next[id] = Math.max(0, (next[id] || 0) + delta);
      if (next[id] === 0) delete next[id];
      return next;
    });
    if (delta > 0) showToast(cart[id] ? "Quantity Updated" : "Item Added to Cart");
  }

  function toggleAccordion(key: string) {
    setAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function applySort(type: string, label: string) {
    setSortBy(type);
    setSortLabel(label);
    setSortMenuOpen(false);
  }

  /* Lock body scroll when mobile filter open */
  useEffect(() => {
    document.body.style.overflow = mobileFilterOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileFilterOpen]);

  /* Close sort menu on outside click */
  useEffect(() => {
    const handler = () => setSortMenuOpen(false);
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  /* ── Filter sidebar content (shared desktop + mobile) ── */
  const FilterContent = (
    <div className="flex-1 overflow-y-auto px-6 lg:px-0 py-8 lg:py-0 lg:space-y-2 filter-panel">

      {/* Mobile Sort accordion */}
      <div className="lg:hidden border border-white/5 overflow-hidden mb-2">
        <button
          onClick={() => toggleAccordion("sort-mobile")}
          className="w-full flex justify-between items-center bg-[#111] px-6 py-5 hover:bg-[#151515] transition-colors group"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-white/80 group-hover:text-white">Sort By</span>
          {accordions["sort-mobile"] ? <Minus size={14} className="text-white/40" /> : <Plus size={14} className="text-white/40" />}
        </button>
        {accordions["sort-mobile"] && (
          <div className="px-6 py-4 space-y-2 bg-black/40">
            {[["recommended","Recommended"],["price-low","Price: Low to High"],["price-high","Price: High to Low"],["newest","Newest Arrivals"]].map(([type, label]) => (
              <button key={type} onClick={() => { applySort(type, label); setMobileFilterOpen(false); }}
                className="w-full text-left py-3 text-[9px] uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Options */}
      <div className="bg-white/5 border border-white/5 p-6 mb-2">
        <h4 className="text-[10px] font-display font-medium uppercase tracking-[0.2em] text-white/40 mb-4">Selected Options</h4>
        <div className="flex flex-wrap gap-2">
          {selectedFinish && (
            <span onClick={() => setSelectedFinish("")}
              className="bg-white/10 text-[9px] px-3 py-1.5 uppercase tracking-widest flex items-center gap-2 cursor-pointer hover:bg-white/20 transition-colors">
              {COLOR_FINISHES.find(f => f.id === selectedFinish)?.label}
              <X size={10} />
            </span>
          )}
        </div>
      </div>

      {/* Budget Range */}
      <Accordion id="price-filter" label="Budget Range" open={!!accordions["price-filter"]} onToggle={() => toggleAccordion("price-filter")}>
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-white/40">
              <span>Min: ₹0</span>
              <span>Max: ₹{priceMax.toLocaleString("en-IN")}</span>
            </div>
            <input
              type="range" className="price-slider cursor-pointer" min={0} max={100000} step={500}
              value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[8px] uppercase tracking-widest text-white/30">Min Budget</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] text-white/40">₹</span>
                <input type="number" value={priceMin} onChange={(e) => setPriceMin(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 pl-6 pr-3 py-3 text-[10px] text-white outline-none focus:border-[#c5a059] transition-colors appearance-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[8px] uppercase tracking-widest text-white/30">Max Budget</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] text-white/40">₹</span>
                <input type="number" value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 pl-6 pr-3 py-3 text-[10px] text-white outline-none focus:border-[#c5a059] transition-colors appearance-none" />
              </div>
            </div>
          </div>
          <button className="w-full py-3 text-[9px] uppercase tracking-[0.2em] font-bold border border-[#c5a059]/20 text-[#c5a059] hover:bg-[#c5a059] hover:text-white transition-all">
            Apply Range
          </button>
        </div>
      </Accordion>

      {/* Area */}
      <Accordion id="area-filter" label="Area" open={!!accordions["area-filter"]} onToggle={() => toggleAccordion("area-filter")}>
        <CheckList items={["Basin", "Shower", "Kitchen"]} />
      </Accordion>

      {/* Color Finishes */}
      <Accordion id="color-filter" label="Color Finishes" open={!!accordions["color-filter"]} onToggle={() => toggleAccordion("color-filter")}>
        <div className="space-y-6">
          {COLOR_FINISHES.map((finish) => (
            <div key={finish.id} onClick={() => setSelectedFinish(finish.id === selectedFinish ? "" : finish.id)}
              className="flex items-center gap-4 cursor-pointer group">
              <div className={`relative w-10 h-10 border overflow-hidden flex-shrink-0 ${selectedFinish === finish.id ? "border-[#c5a059]" : "border-white/10"}`}
                style={finish.img ? undefined : { background: finish.fallback }}>
                {finish.img && (
                  <img src={finish.img} alt={finish.label}
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/40x40/333333/ffffff?text=BC`; }}
                    className="w-full h-full object-cover" />
                )}
                {selectedFinish === finish.id && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check size={12} className="text-black" />
                  </div>
                )}
              </div>
              <span className={`text-[10px] uppercase tracking-widest transition-colors ${selectedFinish === finish.id ? "text-white" : "text-white/50 group-hover:text-white"}`}>
                {finish.label}
              </span>
            </div>
          ))}
        </div>
      </Accordion>

      {/* Mounting */}
      <Accordion id="mounting-filter" label="Mounting" open={!!accordions["mounting-filter"]} onToggle={() => toggleAccordion("mounting-filter")}>
        <CheckList items={["Deck Mounted", "Wall Mounted"]} />
      </Accordion>

      {/* Range */}
      <Accordion id="range-filter" label="Range" open={!!accordions["range-filter"]} onToggle={() => toggleAccordion("range-filter")}>
        <CheckList items={["Economy", "Premium", "Luxury"]} />
      </Accordion>

      {/* Shape */}
      <Accordion id="shape-filter" label="Shape" open={!!accordions["shape-filter"]} onToggle={() => toggleAccordion("shape-filter")}>
        <CheckList items={["Square", "Round", "Curved"]} />
      </Accordion>

      {/* Mobile Reset */}
      <div className="pt-8 block lg:hidden">
        <button className="w-full py-5 text-[10px] uppercase tracking-[0.4em] font-bold border border-white/10 hover:bg-white hover:text-black transition-all">
          Reset All
        </button>
      </div>
    </div>
  );

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
      </Head>

      <main className="pt-32 md:pt-48 pb-24">
        <div className="max-w-[1720px] mx-auto px-6 md:px-12 lg:px-24">

          {/* ── Breadcrumbs + Sort ── */}
          <div className="relative z-[70] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 products-slide-up">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/40">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={10} />
              <Link href="/bathrooms" className="hover:text-white transition-colors">Bathrooms</Link>
              <ChevronRight size={10} />
              <span className="text-white">{categoryLabel}</span>
            </div>

            <div className="flex items-center gap-8">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                <span className="text-white">{displayProducts.length}</span> Products Found
              </p>
              <div className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setSortMenuOpen((o) => !o); }}
                  className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/80 hover:text-white pb-1 border-b border-white/10 transition-colors"
                >
                  Sort By: <span>{sortLabel}</span> <ChevronDown size={12} />
                </button>
                {sortMenuOpen && (
                  <div onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 mt-3 w-56 bg-[#111] border border-white/5 z-[100] shadow-2xl">
                    <div className="flex flex-col py-3">
                      {[["recommended","Recommended"],["price-low","Price: Low to High"],["price-high","Price: High to Low"],["newest","Newest Arrivals"]].map(([type, label]) => (
                        <button key={type} onClick={() => applySort(type, label)}
                          className="px-6 py-4 text-[9px] uppercase tracking-[0.3em] text-left text-white/50 hover:text-white hover:bg-white/5 transition-all">
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-16">

            {/* ── Desktop Filter Sidebar ── */}
            <aside className="hidden lg:block w-full lg:w-80 shrink-0 products-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="lg:sticky lg:top-48 flex flex-col bg-transparent">
                {FilterContent}
                <div className="hidden lg:block pt-8">
                  <button className="w-full py-5 text-[10px] uppercase tracking-[0.4em] font-bold border border-white/10 hover:bg-white hover:text-black transition-all">
                    Reset Filters
                  </button>
                </div>
              </div>
            </aside>

            {/* ── Product Grid ── */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-20">
                {displayProducts.map((item, index) => {
                  const qty = cart[item.id] || 0;
                  return (
                    <div key={item.id} className="product-card group products-slide-up"
                      style={{ animationDelay: `${0.2 + index * 0.05}s` }}>
                      <div className="relative aspect-[4/5] bg-[#111] overflow-hidden mb-8">
                        <Image
                          src={item.img} alt={item.name} fill
                          sizes="(max-width:768px) 100vw,(max-width:1280px) 50vw,33vw"
                          className="product-img object-cover transition-transform duration-[1500ms] ease-out"
                        />
                        <div className="absolute top-6 left-6">
                          <div className="bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1 text-[8px] uppercase tracking-[0.2em] font-medium text-white/80">
                            New Arrival
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6 text-center px-4">
                        <div className="space-y-2">
                          <p className="text-[9px] text-[#c5a059] uppercase tracking-[0.4em] font-medium">
                            {item.collection} Series
                          </p>
                          <h3 className="text-lg md:text-xl font-display font-light uppercase tracking-[0.15em] group-hover:text-white/80 transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">{item.code}</p>
                          <p className="text-sm font-sans tracking-[0.1em] text-white/80 mt-2">₹ {item.priceLabel}</p>
                        </div>

                        <div className="flex flex-col gap-3 pt-2">
                          {qty === 0 ? (
                            <button onClick={() => updateCart(item.id, 1)}
                              className="w-full py-4 bg-white text-black text-[9px] uppercase tracking-[0.4em] font-bold hover:bg-neutral-200 transition-all flex items-center justify-center gap-3">
                              <ShoppingCart size={14} />
                              Add to Cart
                            </button>
                          ) : (
                            <div className="flex items-center justify-between bg-white text-black h-12 px-4">
                              <button onClick={() => updateCart(item.id, -1)}
                                className="w-10 h-full flex items-center justify-center hover:bg-neutral-100 transition-colors">
                                <Minus size={12} />
                              </button>
                              <span className="text-[10px] font-bold tracking-[0.2em]">{qty}</span>
                              <button onClick={() => updateCart(item.id, 1)}
                                className="w-10 h-full flex items-center justify-center hover:bg-neutral-100 transition-colors">
                                <Plus size={12} />
                              </button>
                            </div>
                          )}
                          <Link href={`/products/${item.id}`}
                            className="w-full py-4 border border-white/10 text-white/60 text-[9px] uppercase tracking-[0.4em] hover:bg-white/5 hover:text-white transition-all flex items-center justify-center">
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* ── Mobile Filter Drawer ── */}
      <div
        className={`lg:hidden fixed inset-0 z-[300] transition-all duration-300 ${mobileFilterOpen ? "mobile-filter-visible" : "mobile-filter-hidden"}`}
        style={{ background: "rgba(0,0,0,0.6)" }}
        onClick={() => setMobileFilterOpen(false)}
      >
        <div
          className="filter-drawer-panel w-[85%] h-full bg-[#0a0a0a] border-r border-white/5 flex flex-col transition-transform duration-[400ms] cubic-bezier-ease"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="flex justify-between items-center px-6 py-6 border-b border-white/5 sticky top-0 bg-[#0a0a0a] z-10">
            <h4 className="text-lg font-display uppercase tracking-widest text-[#c5a059]">Refine By</h4>
            <button onClick={() => setMobileFilterOpen(false)} className="text-white/60 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          {FilterContent}

          {/* Drawer Footer */}
          <div className="p-6 border-t border-white/5 bg-[#0a0a0a] sticky bottom-0">
            <button onClick={() => setMobileFilterOpen(false)}
              className="w-full py-5 text-[10px] uppercase tracking-[0.4em] font-bold bg-[#c5a059] text-white transition-all shadow-2xl">
              Apply Selection
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Filter FAB ── */}
      <div className="lg:hidden fixed bottom-8 right-6 z-[80] products-slide-up">
        <button onClick={() => setMobileFilterOpen(true)}
          className="flex items-center justify-center bg-white text-black w-12 h-12 rounded-full shadow-2xl active:scale-90 transition-all duration-300">
          <Filter size={18} />
        </button>
      </div>

      {/* ── Toast Notification ── */}
      <div className={`products-toast fixed top-24 right-6 md:right-12 bg-white text-black pl-6 pr-10 py-5 border-l-4 border-[#c5a059] z-[200] shadow-[0_20px_50px_rgba(0,0,0,0.3)] pointer-events-none ${toast.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
        <div className="flex items-center gap-4">
          <div className="bg-black/5 p-2 rounded-full">
            <Check size={18} className="text-[#c5a059]" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-0.5">Success</p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-black/60">{toast.message}</p>
          </div>
        </div>
      </div>

      {/* ── Cart count badge (header area) ── */}
      {totalCartItems > 0 && (
        <div className="fixed top-6 right-6 z-[500] bg-white text-black text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
          {totalCartItems}
        </div>
      )}
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────────── */

function Accordion({
  id, label, open, onToggle, children,
}: {
  id: string; label: string; open: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="border border-white/5 overflow-hidden">
      <button onClick={onToggle}
        className="w-full flex justify-between items-center bg-[#111] px-6 py-5 hover:bg-[#151515] transition-colors group">
        <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-white/80 group-hover:text-white">{label}</span>
        {open ? <Minus size={14} className="text-white/40 group-hover:text-white" /> : <Plus size={14} className="text-white/40 group-hover:text-white" />}
      </button>
      {open && (
        <div className="px-6 py-8 space-y-4 bg-black/40">
          {children}
        </div>
      )}
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  function toggle(item: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(item) ? next.delete(item) : next.add(item);
      return next;
    });
  }
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <label key={item} className="flex items-center gap-3 group cursor-pointer text-[10px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors">
          <input type="checkbox" className="products-check w-3.5 h-3.5 rounded-sm bg-white/5 border border-white/10"
            checked={checked.has(item)} onChange={() => toggle(item)} />
          <span>{item}</span>
        </label>
      ))}
    </div>
  );
}
