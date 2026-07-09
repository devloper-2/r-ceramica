import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  ChevronRight, ChevronLeft, ChevronDown,
  ShoppingCart, Heart, Share2, RotateCcw,
  Minus, Plus, Check, Box, Bath
} from "lucide-react";
import { siteConfig } from "@/config/site";

/* ── Lazy-load 3D components (browser-only, no SSR) ─────────── */
const ProductViewer3D = dynamic(
  () => import("@/components/sections/ProductViewer3D"),
  { ssr: false, loading: () => <Loader label="Loading 3D model…" /> }
);
const BathroomVisualizer3D = dynamic(
  () => import("@/components/sections/BathroomVisualizer3D"),
  { ssr: false, loading: () => <Loader label="Building bathroom scene…" /> }
);

function Loader({ label }: { label: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 min-h-[480px]">
      <div className="w-10 h-10 border border-white/10 border-t-[#c5a059] rounded-full animate-spin" />
      <p className="text-[9px] uppercase tracking-[0.4em] text-white/30">{label}</p>
    </div>
  );
}

/* ── Static catalogue (matches products.tsx) ────────────────── */
const CATALOGUE = [
  { id: "1",  name: "Fusion Basin Mixer",   collection: "Fusion",   code: "F10201CL", price: 12450,  priceLabel: "₹ 12,450",  finishes: ["chrome","gold-pvd","black-matt"], description: "A precision-engineered deck-mounted basin mixer with single-lever operation. Machined from solid brass with a quarter-turn ceramic disc cartridge, this piece combines architectural restraint with engineered durability.", specs: { material: "Solid Brass", warranty: "10 Years", flow: "6 L/min", height: "220 mm", spout: "155 mm" }, images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200","https://images.unsplash.com/photo-1620626011761-9963d7b59675?auto=format&fit=crop&q=80&w=1200","https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200","https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=1200"] },
  { id: "2",  name: "Prime Wall Mixer",     collection: "Fusion",   code: "F10202WM", price: 18200,  priceLabel: "₹ 18,200",  finishes: ["chrome","black-chrome","gold-pvd"], description: "Wall-mounted hot and cold mixer with extended spout for concealed plumbing installations. Features diverter for hand shower compatibility.", specs: { material: "Solid Brass", warranty: "10 Years", flow: "8 L/min", height: "180 mm", spout: "220 mm" }, images: ["https://images.unsplash.com/photo-1620626011761-9963d7b59675?auto=format&fit=crop&q=80&w=1200","https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200","https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=1200"] },
  { id: "3",  name: "Eco High Neck Faucet", collection: "Fusion",   code: "E10301HN", price: 8900,   priceLabel: "₹ 8,900",   finishes: ["chrome","gold-pvd"], description: "High-neck single-lever sink faucet with aerated flow and 360° swivel spout. Ideal for kitchen or utility sinks requiring reach clearance.", specs: { material: "Zinc Alloy Body", warranty: "5 Years", flow: "7 L/min", height: "310 mm", spout: "195 mm" }, images: ["https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200","https://images.unsplash.com/photo-1620626014330-f99a0937285d?auto=format&fit=crop&q=80&w=1200"] },
  { id: "8",  name: "Zen Exposed Mixer",    collection: "Fusion",   code: "Z10801EM", price: 22400,  priceLabel: "₹ 22,400",  finishes: ["chrome","gold-pvd","black-chrome","blush-gold"], description: "Statement exposed shower mixer with integrated diverter and hand shower holder. The sculptural form complements both minimalist and industrial interiors.", specs: { material: "Solid Brass", warranty: "15 Years", flow: "12 L/min", height: "385 mm", spout: "N/A" }, images: ["https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=1200","https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?auto=format&fit=crop&q=80&w=1200","https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=1200"] },
  { id: "11", name: "Artisan Glass Basin",  collection: "Sanitary", code: "G20101VB", price: 32000,  priceLabel: "₹ 32,000",  finishes: ["chrome"], description: "Handcrafted vessel basin in tempered glass with hand-blown texture variation. Each piece is unique. Pairs with wall or deck-mounted mixer.", specs: { material: "Tempered Glass", warranty: "5 Years", flow: "N/A", height: "150 mm", spout: "N/A" }, images: ["https://images.unsplash.com/photo-1620626014330-f99a0937285d?auto=format&fit=crop&q=80&w=1200","https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=1200"] },
];

const FINISH_META: Record<string, { label: string; hex: string; gradient?: string }> = {
  "chrome":       { label: "Chrome",            gradient: "linear-gradient(135deg,#dfdfdf,#aaa)" },
  "gold-pvd":     { label: "Gold Bright PVD",   hex: "#b89552" },
  "black-matt":   { label: "Black Matt",         hex: "#1a1a1a" },
  "black-chrome": { label: "Black Chrome",       hex: "#2e2e2e" },
  "blush-gold":   { label: "Blush Gold PVD",    hex: "#c4916e" },
} as any;

const FINISH_LABEL: Record<string, string> = {
  "chrome":       "Chrome",
  "gold-pvd":     "Gold Bright PVD",
  "black-matt":   "Black Matt",
  "black-chrome": "Black Chrome",
  "blush-gold":   "Blush Gold PVD",
};

type ViewTab = "product" | "bathroom";

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const product = CATALOGUE.find((p) => p.id === String(id)) ?? CATALOGUE[0];

  const [mainImg, setMainImg]       = useState(0);
  const [finish, setFinish]         = useState(product.finishes[0]);
  const [qty, setQty]               = useState(1);
  const [viewTab, setViewTab]       = useState<ViewTab>("product");
  const [inCart, setInCart]         = useState(false);
  const [liked, setLiked]           = useState(false);
  const [specsOpen, setSpecsOpen]   = useState(false);

  const TITLE = `${product.name} | ${siteConfig.name}`;

  return (
    <div className="page-product-detail">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={product.description} />
        <link rel="canonical" href={`${siteConfig.url}/products/${product.id}`} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.images[0]} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* ── Breadcrumbs ── */}
      <div className="pt-36 md:pt-48 px-6 md:px-12 lg:px-24 max-w-[1720px] mx-auto pd-slide-up">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/30 mb-12">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link href="/bathrooms" className="hover:text-white transition-colors">Bathrooms</Link>
          <ChevronRight size={10} />
          <Link href="/products?category=fusion" className="hover:text-white transition-colors">Products</Link>
          <ChevronRight size={10} />
          <span className="text-white/60">{product.name}</span>
        </div>
      </div>

      {/* ── Product Section ── */}
      <section className="max-w-[1720px] mx-auto px-6 md:px-12 lg:px-24 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-28">

          {/* ── Left: Image Gallery ── */}
          <div className="flex flex-col gap-6 pd-slide-up">
            {/* Main image */}
            <div className="relative aspect-square bg-[#111] overflow-hidden group">
              <Image
                key={mainImg}
                src={product.images[mainImg]}
                alt={product.name}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.04]"
              />
              {/* Nav arrows */}
              <button
                onClick={() => setMainImg((i) => (i - 1 + product.images.length) % product.images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur flex items-center justify-center hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setMainImg((i) => (i + 1) % product.images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur flex items-center justify-center hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight size={16} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {product.images.map((_, i) => (
                  <button key={i} onClick={() => setMainImg(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === mainImg ? "bg-white w-4" : "bg-white/30 hover:bg-white/60"}`}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>

              {/* Badge */}
              <div className="absolute top-6 left-6 bg-white/5 backdrop-blur border border-white/10 px-3 py-1 text-[8px] uppercase tracking-[0.25em] text-white/80">
                New Arrival
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-3 overflow-x-auto thumb-strip pb-1">
              {product.images.map((src, i) => (
                <button key={i} onClick={() => setMainImg(i)}
                  className={`relative flex-shrink-0 w-20 h-20 overflow-hidden border transition-all ${i === mainImg ? "border-[#c5a059]" : "border-white/10 hover:border-white/30"}`}
                >
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: Product Info ── */}
          <div className="flex flex-col gap-8 pd-slide-up" style={{ animationDelay: "0.15s" }}>

            {/* Collection + Actions */}
            <div className="flex items-start justify-between">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#c5a059] font-medium">
                {product.collection} Series
              </p>
              <div className="flex items-center gap-4">
                <button onClick={() => setLiked((l) => !l)}
                  className={`transition-colors ${liked ? "text-red-400" : "text-white/30 hover:text-white/70"}`}
                  aria-label="Wishlist">
                  <Heart size={18} fill={liked ? "currentColor" : "none"} />
                </button>
                <button className="text-white/30 hover:text-white/70 transition-colors" aria-label="Share">
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* Name */}
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-light uppercase tracking-[0.05em] leading-tight">
                {product.name}
              </h1>
              <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] mt-3">
                Code: {product.code}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-display font-light text-white">{product.priceLabel}</span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">Incl. taxes</span>
            </div>

            {/* Description */}
            <p className="text-white/50 text-sm leading-relaxed font-light">
              {product.description}
            </p>

            <div className="w-full h-px bg-white/5" />

            {/* Finish selector */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">Finish</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">
                  {FINISH_LABEL[finish] ?? finish}
                </p>
              </div>
              <div className="flex gap-3">
                {product.finishes.map((f) => {
                  const meta = FINISH_META[f];
                  return (
                    <button key={f} onClick={() => setFinish(f)}
                      title={FINISH_LABEL[f]}
                      className={`finish-swatch w-10 h-10 border transition-all ${finish === f ? "active border-[#c5a059]" : "border-white/10 hover:border-white/30"}`}
                      style={meta?.gradient
                        ? { background: meta.gradient }
                        : { background: meta?.hex ?? "#888" }
                      }
                      aria-label={FINISH_LABEL[f]}
                    />
                  );
                })}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center justify-center border border-white/10 h-14">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-14 h-full flex items-center justify-center hover:bg-white/5 transition-colors text-white/60 hover:text-white">
                  <Minus size={14} />
                </button>
                <input type="number" value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                  className="qty-spinner w-16 h-full bg-transparent text-center text-sm text-white outline-none" />
                <button onClick={() => setQty((q) => q + 1)}
                  className="w-14 h-full flex items-center justify-center hover:bg-white/5 transition-colors text-white/60 hover:text-white">
                  <Plus size={14} />
                </button>
              </div>

              <button onClick={() => setInCart(true)} className={`flex h-14 md:h-20 flex items-center cursor-pointer justify-center gap-3 text-[10px] uppercase tracking-[0.4em] font-bold transition-all ${inCart ? "bg-[#c5a059] text-white border border-[#c5a059]" : "bg-white text-black hover:bg-neutral-200" }`} >
                {inCart ? <Check size={14} /> : <ShoppingCart size={14} />}
                {inCart ? "Added to Cart" : "Add to Cart"}
              </button>
            </div>

            {/* Specs accordion */}
            <div className="border border-white/5">
              <button onClick={() => setSpecsOpen((o) => !o)}
                className="w-full flex items-center justify-between px-6 py-5 hover:bg-white/[0.02] transition-colors group">
                <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-white/70 group-hover:text-white">
                  Specifications
                </span>
                <ChevronDown size={14} className={`text-white/40 transition-transform ${specsOpen ? "rotate-180" : ""}`} />
              </button>
              {specsOpen && (
                <div className="px-6 pb-6 space-y-3 border-t border-white/5">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                      <span className="text-[9px] uppercase tracking-[0.25em] text-white/30">{key}</span>
                      <span className="text-[10px] uppercase tracking-[0.15em] text-white/70">{val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Certifications */}
            <div className="flex gap-6 pt-2">
              {["ISI Certified", "Lead Free", "Water Efficient"].map((cert) => (
                <div key={cert} className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-[#c5a059]/40 rounded-full flex items-center justify-center">
                    <Check size={8} className="text-[#c5a059]" />
                  </div>
                  <span className="text-[8px] uppercase tracking-[0.2em] text-white/30">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3D Viewer Section ── */}
      <section className="border-t border-white/5 max-w-[1720px] mx-auto px-6 md:px-12 lg:px-24 py-24">

        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#c5a059] mb-3">Immersive Experience</p>
            <h2 className="text-3xl md:text-5xl font-display font-light uppercase tracking-[0.05em]">
              3D Viewer
            </h2>
          </div>

          {/* Tab switcher */}
          <div className="flex gap-0 border border-white/10">
            <button onClick={() => setViewTab("product")}
              className={`flex items-center gap-3 px-6 py-4 text-[10px] uppercase tracking-[0.3em] transition-all
                ${viewTab === "product" ? "bg-white text-black" : "text-white/50 hover:text-white hover:bg-white/5"}`}
            >
              <Box size={14} />
              Product View
            </button>
            <button onClick={() => setViewTab("bathroom")}
              className={`flex items-center gap-3 px-6 py-4 text-[10px] uppercase tracking-[0.3em] transition-all border-l border-white/10
                ${viewTab === "bathroom" ? "bg-white text-black" : "text-white/50 hover:text-white hover:bg-white/5"}`}
            >
              <Bath size={14} />
              Bathroom Visualizer
            </button>
          </div>
        </div>

        {/* Tab descriptions */}
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-8">
          {viewTab === "product"
            ? "Drag to rotate · Scroll to zoom · Double-tap to reset"
            : "Toggle fixtures to compose your ideal bathroom configuration"
          }
        </p>

        {/* 3D Canvas area */}
        <div className="viewer-panel border border-white/5 overflow-hidden"
          style={{ height: viewTab === "product" ? 560 : 620 }}>
          {viewTab === "product" ? (
            <div className="w-full h-full">
              <ProductViewer3D finish={finish} autoRotate />
            </div>
          ) : (
            <BathroomVisualizer3D />
          )}
        </div>

        {/* Tab-specific note */}
        {viewTab === "product" && (
          <div className="mt-6 flex items-center gap-3">
            <RotateCcw size={12} className="text-white/20" />
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
              Currently showing: <span className="text-[#c5a059]">{FINISH_LABEL[finish] ?? finish}</span> finish. Change finish above to update the 3D view.
            </p>
          </div>
        )}
      </section>

      {/* ── Related Products ── */}
      <section className="border-t border-white/5 max-w-[1720px] mx-auto px-6 md:px-12 lg:px-24 py-24">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-2xl md:text-4xl font-display font-light uppercase tracking-widest">
            You May Also Like
          </h2>
          <Link href="/products?category=fusion"
            className="text-[9px] uppercase tracking-[0.4em] text-white/40 hover:text-white border-b border-white/10 pb-1 transition-colors">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATALOGUE.filter((p) => p.id !== product.id).slice(0, 4).map((p, i) => (
            <Link key={p.id} href={`/products/${p.id}`}
              className="group cursor-pointer" style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="relative aspect-[4/5] bg-[#111] overflow-hidden mb-5">
                <Image src={p.images[0]} alt={p.name} fill
                  sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[8px] uppercase tracking-[0.4em] border border-white/30 px-4 py-2 scale-90 group-hover:scale-100 transition-transform duration-300">
                    View Details
                  </span>
                </div>
              </div>
              <p className="text-[9px] text-[#c5a059] uppercase tracking-[0.3em] mb-1">{p.collection}</p>
              <h3 className="text-base font-display font-light uppercase tracking-[0.15em] group-hover:text-white/70 transition-colors">{p.name}</h3>
              <p className="text-[10px] text-white/40 mt-1">{p.priceLabel}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
