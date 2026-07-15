import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Download, Eye, Package, Truck, RefreshCw, Send } from "lucide-react";
import { siteConfig } from "@/config/site";

const TITLE       = `Catalogue | ${siteConfig.name}`;
const DESCRIPTION = "Explore R Ceramica's complete library of architectural surface catalogues, technical data sheets, and collection lookbooks.";

/* ── Catalogue data ─────────────────────────────────────────── */
type CatEntry = {
  id: number;
  title: string;
  titleLine2: string;
  eyebrow: string;
  sub: string;
  pages: number;
  size: string;
  badge?: { label: string; gold?: boolean };
  spineGold?: boolean;
  spineLabel: string;
  img: string;
  imgOpacity: number;
  availability: "green" | "yellow";
  availLabel: string;
  categories: string[];
  technical?: boolean;
};

const CATALOGUES: CatEntry[] = [
  {
    id: 1, title: "Master", titleLine2: "Collection 2024",
    eyebrow: "Complete Collection", sub: "Tiles · Bathrooms · Kitchen · Accessories",
    pages: 148, size: "24 MB",
    badge: { label: "New Edition", gold: true }, spineGold: true, spineLabel: "R Ceramica · 2024",
    img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800",
    imgOpacity: 50, availability: "green", availLabel: "Available",
    categories: ["all", "tiles", "bathroom", "kitchen", "slabs", "outdoor", "technical"],
  },
  {
    id: 2, title: "Architectural", titleLine2: "Tiles",
    eyebrow: "Surface Studio", sub: "Floor · Wall · Large Format · Mosaic",
    pages: 96, size: "18 MB",
    spineLabel: "R Ceramica · Tiles",
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
    imgOpacity: 50, availability: "green", availLabel: "Available",
    categories: ["tiles"],
  },
  {
    id: 3, title: "Bathroom", titleLine2: "Collection",
    eyebrow: "Sanctuary Series", sub: "Faucets · Showers · Basins · Accessories",
    pages: 112, size: "21 MB",
    badge: { label: "Updated" }, spineLabel: "R Ceramica · Bath",
    img: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=800",
    imgOpacity: 50, availability: "green", availLabel: "Available",
    categories: ["bathroom"],
  },
  {
    id: 4, title: "Kitchen", titleLine2: "Concepts",
    eyebrow: "Culinary Studio", sub: "Counter Tops · Backsplash · Sinks",
    pages: 64, size: "12 MB",
    spineLabel: "R Ceramica · Kitchen",
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=800",
    imgOpacity: 50, availability: "green", availLabel: "Available",
    categories: ["kitchen"],
  },
  {
    id: 5, title: "Large Format", titleLine2: "Slabs",
    eyebrow: "Monolith Series", sub: "1200×2400 · 1600×3200 · Bookmatch",
    pages: 80, size: "32 MB",
    badge: { label: "Exclusive", gold: true }, spineGold: true, spineLabel: "R Ceramica · Slabs",
    img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=800",
    imgOpacity: 50, availability: "green", availLabel: "Available",
    categories: ["slabs", "tiles"],
  },
  {
    id: 6, title: "Outdoor", titleLine2: "Porcelain",
    eyebrow: "Terrace & Garden", sub: "R11 Anti-Slip · Pool Copings · Pavers",
    pages: 72, size: "15 MB",
    spineLabel: "R Ceramica · Outdoor",
    img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800",
    imgOpacity: 50, availability: "green", availLabel: "Available",
    categories: ["outdoor", "tiles"],
  },
  {
    id: 7, title: "Technical", titleLine2: "Data Sheets",
    eyebrow: "Engineering Specs", sub: "ISO Ratings · Certifications · Dimensions",
    pages: 48, size: "8 MB",
    spineLabel: "R Ceramica · Technical",
    img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800",
    imgOpacity: 30, availability: "green", availLabel: "Available",
    categories: ["technical"], technical: true,
  },
  {
    id: 8, title: "Lookbook", titleLine2: "2024",
    eyebrow: "Visual Inspiration", sub: "Lifestyle · Interiors · Project Showcase",
    pages: 56, size: "28 MB",
    badge: { label: "Limited" }, spineGold: true, spineLabel: "R Ceramica · Look",
    img: "https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&q=80&w=800",
    imgOpacity: 50, availability: "yellow", availLabel: "Limited Run",
    categories: ["all"],
  },
];

const FILTER_PILLS = [
  { id: "all",       label: "All" },
  { id: "tiles",     label: "Tiles" },
  { id: "bathroom",  label: "Bathrooms" },
  { id: "kitchen",   label: "Kitchen" },
  { id: "slabs",     label: "Large Format" },
  { id: "outdoor",   label: "Outdoor" },
  { id: "technical", label: "Technical" },
];

const BENEFITS = [
  { icon: Package,   title: "Premium Print Quality",  body: "Printed on 170gsm art paper with true-to-life colour reproduction." },
  { icon: Truck,     title: "Worldwide Delivery",      body: "Free dispatch to architects and trade professionals across the globe." },
  { icon: RefreshCw, title: "Always Up-to-Date",       body: "Subscribe to receive new editions and seasonal collections automatically." },
];

export default function CataloguePage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const visible = CATALOGUES.filter((c) =>
    activeFilter === "all" ? true : c.categories.includes(activeFilter)
  );

  return (
    <div className="page-catalogue">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${siteConfig.url}/catalogue`} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* ══ HERO ════════════════════════════════════════════════ */}
      <header className="relative pt-40 md:pt-56 pb-24 md:pb-32 bg-[#080808] overflow-hidden">

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="catalogue-watermark font-display font-black uppercase tracking-tighter">
            CATALOGUE
          </span>
        </div>

        {/* Decorative side lines */}
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent ml-8 md:ml-24" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent mr-8 md:mr-24" />

        <div className="relative max-w-[1440px] mx-auto px-6 md:px-16 text-center cat-fade-up">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-6 mb-8">
            <div className="w-12 h-px bg-[#c5a059]/60" />
            <span className="text-[9px] uppercase tracking-[0.6em] text-[#c5a059] font-medium">
              Collection Archive
            </span>
            <div className="w-12 h-px bg-[#c5a059]/60" />
          </div>

          {/* H1 */}
          <h1 className="text-4xl md:text-7xl font-display font-light uppercase tracking-[0.2em] text-white mb-6 leading-[1.05]">
            Product<br />
            <span className="catalogue-ghost">Catalogue</span>
          </h1>

          <p className="text-[11px] text-white/40 uppercase tracking-[0.35em] max-w-xl mx-auto leading-relaxed mt-8">
            Explore our complete library of architectural surface catalogues, technical data sheets, and collection lookbooks.
          </p>
        </div>

        {/* Stats bar */}
        <div className="relative max-w-[1440px] mx-auto px-6 md:px-16 mt-20 cat-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 border border-white/5 divide-x divide-white/5">
            {[
              { val: "08",   label: "Collections" },
              { val: "500+", label: "Products" },
              { val: "2024", label: "Edition" },
            ].map(({ val, label }) => (
              <div key={label} className="py-8 text-center">
                <p className="text-4xl md:text-3xl font-display font-light text-white mb-1">{val}</p>
                <p className="text-[8px] uppercase tracking-[0.4em] text-white/30">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ══ STICKY FILTER PILLS ═════════════════════════════════ */}
      <div className="sticky top-[80px] md:top-[105px] z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
            {FILTER_PILLS.map(({ id, label }) => {
              const active = activeFilter === id;
              return (
                <button key={id} onClick={() => setActiveFilter(id)}
                  className={`shrink-0 px-5 py-2 border text-[9px] uppercase tracking-[0.3em] font-medium transition-all rounded-sm
                    ${active
                      ? "filter-pill-active border-white bg-white text-black"
                      : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                    }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══ CATALOGUE GRID ══════════════════════════════════════ */}
      <main className="py-16 md:py-28 bg-[#0a0a0a]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">

          {/* Count */}
          <div className="flex items-center justify-between mb-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
              Showing <span className="text-white">{visible.length}</span> Catalogues
            </p>
            <div className="w-24 h-px bg-white/5" />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1">
            {visible.map((cat, i) => (
              <CatalogueCard key={cat.id} cat={cat} index={i} />
            ))}
          </div>
        </div>
      </main>

      {/* ══ REQUEST SECTION ═════════════════════════════════════ */}
      <section className="py-16 md:py-32 bg-[#0c0c0c] border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-6">
                <div className="w-8 h-px bg-[#c5a059]/60" />
                <span className="text-[9px] uppercase tracking-[0.5em] text-[#c5a059]/80">Bespoke Service</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-display font-light uppercase tracking-wider leading-tight">
                Request a<br />
                <span className="catalogue-ghost">Physical</span><br />
                Catalogue
              </h2>

              <p className="text-[11px] text-white/40 uppercase tracking-[0.25em] leading-relaxed max-w-md">
                Request our premium printed catalogues delivered to your studio or showroom. Available for architects, interior designers, and trade professionals.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/contact"
                  className="flex items-center justify-center gap-3 bg-white text-black px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-200 transition-all">
                  <Send size={14} /> Request Copy
                </Link>
                <Link href="/contact"
                  className="flex items-center justify-center gap-3 border border-white/10 text-white/60 hover:text-white hover:border-white/30 px-10 py-5 text-[10px] uppercase tracking-[0.3em] transition-all">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right: Benefits */}
            <div className="space-y-0">
              {BENEFITS.map(({ icon: Icon, title, body }, i) => (
                <div key={i}
                  className={`flex items-start gap-6 py-7 group ${i < BENEFITS.length - 1 ? "border-b border-white/5" : ""}`}>
                  <div className="w-10 h-10 border border-white/10 group-hover:border-[#c5a059]/40 flex items-center justify-center shrink-0 transition-colors">
                    <Icon size={16} className="text-white/30 group-hover:text-[#c5a059] transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-[11px] uppercase tracking-[0.2em] text-white mb-1">{title}</h4>
                    <p className="text-[10px] text-white/30 tracking-[0.1em] leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Catalogue Card ─────────────────────────────────────────── */
function CatalogueCard({ cat, index }: { cat: CatEntry; index: number }) {
  return (
    <div className="cat-card group relative border border-white/5 hover:border-white/15 overflow-hidden cat-fade-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Image area */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#111]">
        <Image
          src={cat.img} alt={cat.title}
          fill sizes="(max-width:768px) 100vw,(max-width:1280px) 50vw,33vw"
          className={`cat-img object-cover opacity-${cat.imgOpacity}`}
          style={{ opacity: cat.imgOpacity / 100 }}
        />

        {/* Technical grid overlay */}
        {cat.technical && (
          <div className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Book spine */}
        <div className={`absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center
          ${cat.spineGold ? "bg-[#c5a059]/10 border-r border-[#c5a059]/20" : "bg-white/5 border-r border-white/10"}`}>
          <span className={`book-spine text-[7px] uppercase tracking-[0.3em] font-medium
            ${cat.spineGold ? "text-[#c5a059]/60" : "text-white/30"}`}>
            {cat.spineLabel}
          </span>
        </div>

        {/* Badge top-right */}
        {cat.badge && (
          <div className="absolute top-6 right-6">
            <span className={`text-[7px] uppercase tracking-[0.3em] font-bold px-3 py-1.5 leading-3 ${cat.badge.gold ? "bg-[#c5a059] text-black" : "bg-white/10 backdrop-blur-md border border-white/10 text-white"}`}>
              {cat.badge.label}
            </span>
          </div>
        )}

        {/* Pages count */}
        <div className="absolute top-6 left-4 md:left-14 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 leading-3">
          <span className="text-[8px] uppercase tracking-[0.2em] text-white/60">{cat.pages} Pages</span>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 pl-8 md:pl-12">
          <span className="text-[8px] uppercase tracking-[0.5em] text-[#c5a059] block mb-3">
            {cat.eyebrow}
          </span>
          <h3 className="text-2xl md:text-3xl font-display font-light uppercase tracking-widest text-white mb-2 leading-tight">
            {cat.title}<br />{cat.titleLine2}
          </h3>
          <p className="text-[9px] uppercase tracking-[0.25em] text-white/40 mb-6">{cat.sub}</p>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 bg-white text-black py-3.5 text-[8px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-200 transition-all">
              <Download size={12} /> Download PDF
            </button>
            <button className="flex items-center justify-center w-12 h-12 border border-white/10 hover:border-white/40 text-white/60 hover:text-white transition-all">
              <Eye size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Card footer */}
      <div className="px-8 pl-12 py-5 border-t border-white/5 flex items-center justify-between bg-[#0d0d0d]">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${cat.availability === "green" ? "bg-green-400" : "bg-yellow-400"}`} />
          <span className="text-[8px] uppercase tracking-[0.2em] text-white/30">{cat.availLabel}</span>
        </div>
        <span className="text-[8px] uppercase tracking-[0.25em] text-white/20">PDF · {cat.size}</span>
      </div>
    </div>
  );
}
