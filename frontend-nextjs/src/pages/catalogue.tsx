import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GetStaticProps } from "next";
import { Download, Eye, Package, Truck, RefreshCw, Send } from "lucide-react";
import { siteConfig } from "@/config/site";
import { api, sectionsByType, type ApiCatalogue, type ApiPage } from "@/lib/services/api";
import { iconByName } from "@/lib/utils/icons";

const DEFAULT_TITLE       = `Catalogue | ${siteConfig.name}`;
const DEFAULT_DESCRIPTION = "Explore R Ceramica's complete library of architectural surface catalogues, technical data sheets, and collection lookbooks.";

/* ── Catalogue card shape ───────────────────────────────────── */
type CatEntry = {
  id: number | string;
  title: string;
  titleLine2: string;
  eyebrow: string;
  sub: string;
  pages: number;
  size: string;
  badge?: { label: string; gold?: boolean } | null;
  spineGold?: boolean;
  spineLabel: string;
  img: string;
  imgOpacity: number;
  availability: "green" | "yellow";
  availLabel: string;
  categories: string[];
  technical?: boolean;
  pdf?: string | null;
};

function toCatEntry(c: ApiCatalogue): CatEntry {
  return {
    id: c.id,
    title: c.title,
    titleLine2: c.title_line2 ?? "",
    eyebrow: c.eyebrow ?? "",
    sub: c.sub ?? "",
    pages: Number(c.pages ?? 0),
    size: c.size ?? "",
    badge: c.badge_label ? { label: c.badge_label, gold: Number(c.badge_gold) === 1 } : null,
    spineGold: Number(c.spine_gold) === 1,
    spineLabel: c.spine_label ?? "R Ceramica",
    img: c.image ?? "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800",
    imgOpacity: Number(c.img_opacity ?? 50),
    availability: c.availability === "yellow" ? "yellow" : "green",
    availLabel: c.avail_label ?? "Available",
    categories: Array.isArray(c.tags) ? c.tags : [],
    technical: Number(c.technical) === 1,
    pdf: c.pdf_path ?? null,
  };
}

const STATIC_CATALOGUES: CatEntry[] = [
  { id: 1, title: "Master", titleLine2: "Collection 2024", eyebrow: "Complete Collection", sub: "Tiles · Bathrooms · Kitchen · Accessories", pages: 148, size: "24 MB", badge: { label: "New Edition", gold: true }, spineGold: true, spineLabel: "R Ceramica · 2024", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800", imgOpacity: 50, availability: "green", availLabel: "Available", categories: ["all", "tiles", "bathroom", "kitchen", "slabs", "outdoor", "technical"] },
  { id: 2, title: "Architectural", titleLine2: "Tiles", eyebrow: "Surface Studio", sub: "Floor · Wall · Large Format · Mosaic", pages: 96, size: "18 MB", spineLabel: "R Ceramica · Tiles", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800", imgOpacity: 50, availability: "green", availLabel: "Available", categories: ["tiles"] },
  { id: 3, title: "Bathroom", titleLine2: "Collection", eyebrow: "Sanctuary Series", sub: "Faucets · Showers · Basins · Accessories", pages: 112, size: "21 MB", badge: { label: "Updated" }, spineLabel: "R Ceramica · Bath", img: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=800", imgOpacity: 50, availability: "green", availLabel: "Available", categories: ["bathroom"] },
  { id: 4, title: "Kitchen", titleLine2: "Concepts", eyebrow: "Culinary Studio", sub: "Counter Tops · Backsplash · Sinks", pages: 64, size: "12 MB", spineLabel: "R Ceramica · Kitchen", img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=800", imgOpacity: 50, availability: "green", availLabel: "Available", categories: ["kitchen"] },
  { id: 5, title: "Large Format", titleLine2: "Slabs", eyebrow: "Monolith Series", sub: "1200×2400 · 1600×3200 · Bookmatch", pages: 80, size: "32 MB", badge: { label: "Exclusive", gold: true }, spineGold: true, spineLabel: "R Ceramica · Slabs", img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=800", imgOpacity: 50, availability: "green", availLabel: "Available", categories: ["slabs", "tiles"] },
  { id: 6, title: "Outdoor", titleLine2: "Porcelain", eyebrow: "Terrace & Garden", sub: "R11 Anti-Slip · Pool Copings · Pavers", pages: 72, size: "15 MB", spineLabel: "R Ceramica · Outdoor", img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800", imgOpacity: 50, availability: "green", availLabel: "Available", categories: ["outdoor", "tiles"] },
  { id: 7, title: "Technical", titleLine2: "Data Sheets", eyebrow: "Engineering Specs", sub: "ISO Ratings · Certifications · Dimensions", pages: 48, size: "8 MB", spineLabel: "R Ceramica · Technical", img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800", imgOpacity: 30, availability: "green", availLabel: "Available", categories: ["technical"], technical: true },
  { id: 8, title: "Lookbook", titleLine2: "2024", eyebrow: "Visual Inspiration", sub: "Lifestyle · Interiors · Project Showcase", pages: 56, size: "28 MB", badge: { label: "Limited" }, spineGold: true, spineLabel: "R Ceramica · Look", img: "https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&q=80&w=800", imgOpacity: 50, availability: "yellow", availLabel: "Limited Run", categories: ["all"] },
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

const STATIC_BENEFITS = [
  { icon: Package,   title: "Premium Print Quality",  body: "Printed on 170gsm art paper with true-to-life colour reproduction." },
  { icon: Truck,     title: "Worldwide Delivery",      body: "Free dispatch to architects and trade professionals across the globe." },
  { icon: RefreshCw, title: "Always Up-to-Date",       body: "Subscribe to receive new editions and seasonal collections automatically." },
];

/* ── Default hero / request content ────────────────────────── */
const STATIC_HERO = {
  eyebrow: "Collection Archive",
  title: "Product",
  titleLine2: "Catalogue",
  description: "Explore our complete library of architectural surface catalogues, technical data sheets, and collection lookbooks.",
  stats: [
    { val: "08",   label: "Collections" },
    { val: "500+", label: "Products" },
    { val: "2024", label: "Edition" },
  ],
};

const STATIC_REQUEST = {
  eyebrow: "Bespoke Service",
  title: "Request a",
  titleGhost: "Physical",
  titleLine3: "Catalogue",
  description: "Request our premium printed catalogues delivered to your studio or showroom. Available for architects, interior designers, and trade professionals.",
  ctaPrimary: { label: "Request Copy", href: "/contact" },
  ctaSecondary: { label: "Contact Us", href: "/contact" },
};

/* ── Props ──────────────────────────────────────────────────── */
interface Props {
  catalogues: CatEntry[];
  page: ApiPage | null;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  let catalogues: CatEntry[] = STATIC_CATALOGUES;
  let page: ApiPage | null = null;

  try {
    const [rows, fetchedPage] = await Promise.all([
      api.getCatalogues(),
      api.getPage("catalogue"),
    ]);
    if (rows.length) catalogues = rows.map(toCatEntry);
    page = fetchedPage;
  } catch (err) {
    console.error("[catalogue] API failed, using static fallback:", err);
  }

  return { props: { catalogues, page } };
};

export default function CataloguePage({ catalogues, page }: Props) {
  const [activeFilter, setActiveFilter] = useState("all");
  const source = catalogues?.length ? catalogues : STATIC_CATALOGUES;

  const visible = source.filter((c) =>
    activeFilter === "all" ? true : c.categories.includes(activeFilter)
  );

  /* ── Section data from CMS, with static fallbacks ─────────── */
  const s = page ? sectionsByType(page.sections) : null;

  const hero    = s?.catalogueHero    ?? STATIC_HERO;
  const request = s?.catalogueRequest ?? STATIC_REQUEST;

  const heroStats   = hero.stats   ?? STATIC_HERO.stats;
  const benefits    = request.benefits
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (request.benefits as any[]).map((b: { icon: string; title: string; body: string }) => ({
        icon: iconByName(b.icon),
        title: b.title,
        body: b.body,
      }))
    : STATIC_BENEFITS;

  const ctaPrimary   = request.ctaPrimary   ?? STATIC_REQUEST.ctaPrimary;
  const ctaSecondary = request.ctaSecondary ?? STATIC_REQUEST.ctaSecondary;

  const title       = page?.meta_title       ?? DEFAULT_TITLE;
  const description = page?.meta_description ?? DEFAULT_DESCRIPTION;

  return (
    <div className="page-catalogue">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${siteConfig.url}/catalogue`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
{/* ══ HERO ════════════════════════════════════════════════ */}
<header className="relative overflow-hidden bg-[#080808] pt-32 pb-16 md:pt-40 md:pb-20">

  {/* Ambient glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-1/2 top-1/3 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#D6A765]/[0.035] blur-[140px]" />
  </div>

  {/* Large watermark */}
  {/* <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
    <span
      className="
        catalogue-watermark
        font-display font-black uppercase
        tracking-[-0.08em]
        text-white/[0.018]
        whitespace-nowrap
        text-[22vw]
        leading-none
      "
    >
      CATALOGUE
    </span>
  </div> */}

  {/* Vertical borders */}
  <div className="absolute left-4 md:left-12 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/[0.07] to-transparent" />
  <div className="absolute right-4 md:right-12 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/[0.07] to-transparent" />

  {/* Main content */}
  <div
    className="
      relative
      max-w-[1280px]
      mx-auto
      px-6 md:px-12
      text-center
      cat-fade-up
    "
  >

    {/* Eyebrow */}
    <div className="inline-flex items-center gap-4 md:gap-6 mb-7">

      <span className="h-px w-8 md:w-14 bg-[#D6A765]/70" />

      <span className="
        text-[9px]
        md:text-[10px]
        uppercase
        tracking-[0.5em]
        md:tracking-[0.65em]
        text-[#D6A765]
        font-medium
      ">
        {hero.eyebrow}
      </span>

      <span className="h-px w-8 md:w-14 bg-[#D6A765]/70" />

    </div>


    {/* Heading */}
    <h1
      className="
        relative
        font-display
        font-light
        uppercase
        text-white
        leading-[0.95]
        tracking-[0.12em]
        md:tracking-[0.18em]
        mb-7
      "
    >

      <span className="block text-[48px] sm:text-[64px] md:text-[92px]">
        {hero.title}
      </span>

      <span
          className="
            block
            mt-2
            text-[42px]
            sm:text-[58px]
            md:text-[82px]
            text-transparent
            select-none
            [-webkit-text-stroke:1.5px_rgba(214,167,101,0.7)]
          "
        >
          {hero.titleLine2}
        </span>

    </h1>

    {/* Accent line */}
    <div className="mx-auto mb-7 h-px w-16 bg-gradient-to-r from-transparent via-[#D6A765] to-transparent" />

    {/* Description */}
    <p
      className="
        mx-auto
        max-w-[620px]
        text-[10px]
        md:text-[11px]
        uppercase
        tracking-[0.25em]
        md:tracking-[0.35em]
        leading-[2]
        text-white/40
      "
    >
      {hero.description}
    </p>
  </div>

  {/* Stats */}
  <div
    className="
      relative
      max-w-[1180px]
      mx-auto
      px-6 md:px-12
      mt-14 md:mt-20
      cat-fade-up
    "
    style={{ animationDelay: "0.2s" }}
  >
    <div
      className="
        relative
        grid
        grid-cols-3
        overflow-hidden
        rounded-sm
        border
        border-white/[0.08]
        bg-white/[0.015]
        backdrop-blur-sm
      "
    >

      {/* Gold top line */}
      <div className="
        absolute
        left-1/2
        top-0
        h-px
        w-24
        -translate-x-1/2
        bg-[#D6A765]
      " />

      {heroStats.map(
        ({ val, label }: { val: string; label: string }, index) => (
          <div
            key={label}
            className={`
              relative
              flex
              flex-col
              items-center
              justify-center
              px-3
              py-7
              md:py-9
              ${
                index !== heroStats.length - 1
                  ? "border-r border-white/[0.07]"
                  : ""
              }
            `}
          >

            <p
              className="
                font-display
                text-[28px]
                md:text-[38px]
                font-light
                tracking-wide
                text-[#F4F0E8]
              "
            >
              {val}
            </p>
            <div className="mt-2 h-px w-5 bg-[#D6A765]/50" />
            <p
              className="
                mt-2
                text-[7px]
                md:text-[8px]
                uppercase
                tracking-[0.35em]
                md:tracking-[0.45em]
                text-white/30
              "
            >
              {label}
            </p>

          </div>
        )
      )}
    </div>
  </div>

  {/* Bottom scroll indicator */}
  <div className="relative mt-10 flex justify-center">
    <div className="flex flex-col items-center gap-2">
      <span className="text-[7px] uppercase tracking-[0.45em] text-white/20">
        Explore
      </span>
      <span className="h-8 w-px bg-gradient-to-b from-[#D6A765]/60 to-transparent" />
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
                <button key={id} onClick={() => setActiveFilter(id)} className={`group relative shrink-0 overflow-hidden rounded-sm border px-5 py-2.5 text-[9px] font-medium uppercase tracking-[0.3em] backdrop-blur-xl transition-all duration-300 ${
                    active ? ` border-[#c5a059]/70 bg-[#c5a059]/[0.10] text-[#d8b66d] shadow-[0_0_24px_rgba(197,160,89,0.08)]`
                      : ` border-white/[0.10]  bg-white/[0.025]  text-white/45  hover:border-[#c5a059]/35  hover:bg-white/[0.045]  hover:text-white/80`
                  }
                `}
                >
                  {/* Glass highlight */}
                  <span
                    className={` pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-300
                      ${
                        active
                          ? "bg-[#c5a059]/70 opacity-100"
                          : "bg-white/15 opacity-0 group-hover:opacity-100"
                      }
                    `}
                  />
                
                  {/* Active indicator */}
                  {active && (
                    <span className="absolute left-0 top-1/2 h-3 w-px -translate-y-1/2 bg-[#c5a059]" />
                  )}
                
                  <span className="relative z-10">
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══ CATALOGUE GRID ══════════════════════════════════════ */}
      <main className="py-16 md:py-28 bg-[#0a0a0a]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="flex items-center justify-between mb-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
              Showing <span className="text-white">{visible.length}</span> Catalogues
            </p>
            <div className="w-24 h-px bg-white/5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1">
            {visible.map((cat, i) => (
              <CatalogueCard key={cat.id} cat={cat} index={i} />
            ))}
          </div>
        </div>
      </main>

{/* ══ REQUEST SECTION ═════════════════════════════════════ */}
<section className="relative overflow-hidden bg-[#090909] py-20 md:py-28 lg:py-36 border-t border-white/[0.06]">

  {/* ═════════════ BACKGROUND ═════════════ */}
  <div className="pointer-events-none absolute inset-0">

    {/* Soft ambient glow */}
    <div className="absolute -top-52 -left-52 h-[600px] w-[600px] rounded-full bg-[#c5a059]/[0.035] blur-[160px]" />

    <div className="absolute -bottom-52 -right-52 h-[600px] w-[600px] rounded-full bg-[#c5a059]/[0.04] blur-[160px]" />

    {/* Architectural grid */}
    <div
      className="absolute inset-0 opacity-[0.018]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
        backgroundSize: "90px 90px",
      }}
    />

    {/* Subtle vertical architectural lines */}
    <div className="absolute left-[8%] top-0 h-full w-px bg-white/[0.025]" />
    <div className="absolute left-[52%] top-0 h-full w-px bg-white/[0.018]" />
    <div className="absolute right-[8%] top-0 h-full w-px bg-white/[0.025]" />

  </div>


  {/* ═════════════ CONTENT ═════════════ */}
  <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">

    <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">


      {/* ═════════════ LEFT SIDE ═════════════ */}
      <div className="max-w-[720px]">

        {/* Eyebrow */}
        <div className="mb-8 flex items-center gap-4 md:mb-10">

          <span className="h-px w-12 bg-[#c5a059]/70" />

          <span className="text-[10px] font-medium uppercase tracking-[0.38em] text-[#c5a059] md:text-[11px]">
            {request.eyebrow}
          </span>

          <span className="h-px w-8 bg-white/[0.12]" />

        </div>


        {/* ═════════════ MAIN TITLE ═════════════ */}
        <h2
          className="
            font-display
            text-[43px]
            font-light
            uppercase
            leading-[0.94]
            tracking-[-0.015em]
            text-white
            sm:text-[54px]
            md:text-[64px]
            lg:text-[70px]
            xl:text-[78px]
          "
        >

          {/* REQUEST A */}
          <span className="block text-white">
            {request.title}
          </span>


          {/* PHYSICAL */}
          <span
            className="
              block
              mt-1
              text-transparent
              [-webkit-text-stroke:1px_rgba(197,160,89,0.72)]
              transition-all
              duration-500
              hover:[-webkit-text-stroke:1px_rgba(197,160,89,1)]
            "
          >
            {request.titleGhost}
          </span>


          {/* CATALOGUE */}
          <span className="block mt-1 text-white">
            {request.titleLine3}
          </span>

        </h2>


        {/* Gold divider */}
        <div className="mt-9 mb-7 flex items-center gap-3">

          <span className="h-px w-20 bg-[#c5a059]" />

          <span className="h-px w-8 bg-[#c5a059]/30" />

          <span className="h-px w-2 bg-[#c5a059]/15" />

        </div>


        {/* Description */}
        <p
          className="
            max-w-[570px]
            text-[12px]
            leading-[1.9]
            tracking-[0.055em]
            text-white/45
            sm:text-[13px]
            md:text-[14px]
          "
        >
          {request.description}
        </p>


        {/* ═════════════ CTA BUTTONS ═════════════ */}
        <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row">


          {/* ───────── PRIMARY GLASS BUTTON ───────── */}
          <Link
            href={ctaPrimary.href}
            className="
              group
              relative
              inline-flex
              min-h-[58px]
              items-center
              justify-center
              gap-4
              overflow-hidden
              border
              border-[#c5a059]/50
              bg-[#c5a059]/[0.10]
              px-8
              text-[10px]
              font-medium
              uppercase
              tracking-[0.30em]
              text-[#e3c27d]
              backdrop-blur-xl
              transition-all
              duration-500
              hover:-translate-y-0.5
              hover:border-[#c5a059]
              hover:bg-[#c5a059]/[0.16]
              hover:shadow-[0_12px_40px_rgba(197,160,89,0.12)]
              md:min-h-[62px]
              md:px-10
              md:text-[11px]
            "
          >

            {/* Glass highlight */}
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20" />

            {/* Left icon */}
            <Send
              size={15}
              strokeWidth={1.5}
              className="
                text-[#c5a059]
                transition-transform
                duration-500
                group-hover:translate-x-1
                group-hover:-translate-y-0.5
              "
            />

            <span>
              {ctaPrimary.label}
            </span>

            {/* Arrow */}
            <span
              className="
                ml-2
                text-[#c5a059]/70
                transition-transform
                duration-500
                group-hover:translate-x-1
              "
            >
              →
            </span>

            {/* Bottom hover line */}
            <span
              className="
                absolute
                bottom-0
                left-0
                h-px
                w-0
                bg-[#c5a059]
                transition-all
                duration-500
                group-hover:w-full
              "
            />

          </Link>


          {/* ───────── SECONDARY GLASS BUTTON ───────── */}
          <Link
            href={ctaSecondary.href}
            className="
              group
              relative
              inline-flex
              min-h-[58px]
              items-center
              justify-center
              gap-4
              overflow-hidden
              border
              border-white/[0.13]
              bg-white/[0.025]
              px-8
              text-[10px]
              font-medium
              uppercase
              tracking-[0.30em]
              text-white/60
              backdrop-blur-xl
              transition-all
              duration-500
              hover:-translate-y-0.5
              hover:border-white/25
              hover:bg-white/[0.055]
              hover:text-white
              md:min-h-[62px]
              md:px-10
              md:text-[11px]
            "
          >

            {/* Glass highlight */}
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.14]" />

            <span>
              {ctaSecondary.label}
            </span>

            <span
              className="
                text-[#c5a059]
                transition-transform
                duration-500
                group-hover:translate-x-1
              "
            >
              →
            </span>

            {/* Bottom accent */}
            <span
              className="
                absolute
                bottom-0
                left-0
                h-px
                w-0
                bg-[#c5a059]/60
                transition-all
                duration-500
                group-hover:w-full
              "
            />

          </Link>

        </div>


        {/* Reassurance */}
        <div
          className="
            mt-7
            text-[9px]
            uppercase
            tracking-[0.20em]
            text-white/25
            md:text-[10px]
          "
        >
          Premium service
          <span className="mx-2 text-white/10">/</span>
          Direct consultation
          <span className="mx-2 text-white/10">/</span>
          Tailored response
        </div>

      </div>


      {/* ═════════════ RIGHT SIDE ═════════════ */}
      <div className="relative">


        {/* Main glass panel */}
        <div
          className="
            relative
            border
            border-white/[0.08]
            bg-white/[0.015]
            p-2
            backdrop-blur-sm
            md:p-3
          "
        >

          {/* Architectural corner — NO DOT */}
          <span className="absolute left-[-1px] top-[-1px] h-12 w-12 border-l border-t border-[#c5a059]/50" />

          <span className="absolute bottom-[-1px] right-[-1px] h-12 w-12 border-b border-r border-[#c5a059]/30" />


          {/* Inner glass */}
          <div className="border border-white/[0.055] bg-[#0e0e0e]/80 backdrop-blur-xl">


            {/* Panel header */}
            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-white/[0.06]
                px-6
                py-5
                md:px-8
              "
            >

              <span className="text-[9px] uppercase tracking-[0.32em] text-white/35 md:text-[10px]">
                Why work with us
              </span>

              <span className="text-[9px] tracking-[0.22em] text-[#c5a059]/65">
                01 — 0{benefits.length}
              </span>

            </div>


            {/* ═════════════ BENEFITS ═════════════ */}
            <div>

              {benefits.map(
                ({ icon: Icon, title: bTitle, body }, i) => (

                  <div
                    key={i}
                    className={`
                      group
                      relative
                      flex
                      gap-5
                      px-6
                      py-7
                      transition-all
                      duration-500
                      hover:bg-white/[0.025]
                      md:gap-6
                      md:px-8
                      md:py-8
                      ${
                        i < benefits.length - 1
                          ? "border-b border-white/[0.055]"
                          : ""
                      }
                    `}
                  >

                    {/* Number */}
                    <div className="w-5 shrink-0 pt-1 text-[9px] tracking-[0.18em] text-[#c5a059]/40">
                      0{i + 1}
                    </div>


                    {/* Icon glass box */}
                    <div
                      className="
                        relative
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        border
                        border-white/[0.10]
                        bg-white/[0.025]
                        backdrop-blur-md
                        transition-all
                        duration-500
                        group-hover:border-[#c5a059]/40
                        group-hover:bg-[#c5a059]/[0.055]
                      "
                    >

                      <Icon
                        size={17}
                        strokeWidth={1.35}
                        className="
                          text-white/35
                          transition-colors
                          duration-500
                          group-hover:text-[#c5a059]
                        "
                      />

                    </div>


                    {/* Content */}
                    <div className="min-w-0 flex-1">

                      <h4
                        className="
                          text-[11px]
                          font-medium
                          uppercase
                          tracking-[0.20em]
                          text-white
                          md:text-[12px]
                        "
                      >
                        {bTitle}
                      </h4>

                      <p
                        className="
                          mt-2
                          max-w-[430px]
                          text-[10px]
                          leading-[1.8]
                          tracking-[0.035em]
                          text-white/32
                          md:text-[11px]
                        "
                      >
                        {body}
                      </p>

                    </div>


                    {/* Arrow */}
                    <div
                      className="
                        hidden
                        self-center
                        text-[16px]
                        text-white/10
                        transition-all
                        duration-500
                        group-hover:translate-x-1
                        group-hover:text-[#c5a059]
                        sm:block
                      "
                    >
                      →
                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

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
    <div className="cat-card group relative border border-white/5 hover:border-white/15 overflow-hidden cat-fade-up" style={{ animationDelay: `${index * 0.08}s` }} >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#111]">
        <Image
          src={cat.img} alt={cat.title}
          fill sizes="(max-width:768px) 100vw,(max-width:1280px) 50vw,33vw"
          className="cat-img object-cover"
          style={{ opacity: cat.imgOpacity / 100 }}
        />
        {cat.technical && (
          <div className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          {/* <div className={`absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center
          ${cat.spineGold ? "bg-[#c5a059]/10 border-r border-[#c5a059]/20" : "bg-white/5 border-r border-white/10"}`}>
          <span className={`book-spine text-[7px] uppercase tracking-[0.3em] font-medium
            ${cat.spineGold ? "text-[#c5a059]/60" : "text-white/30"}`}>
            {cat.spineLabel}
              </span>
        </div> */}
        {cat.badge && (
          <div className="absolute top-6 right-6">
            <span className={`text-[7px] uppercase tracking-[0.3em] font-bold px-3 py-1.5 leading-3 ${cat.badge.gold ? "bg-[#c5a059] text-black" : "bg-white/10 backdrop-blur-md border border-white/10 text-white"}`}></span>
            <span className={`text-[7px] uppercase tracking-[0.3em] font-bold px-3 py-1.5 ${cat.badge.gold ? "bg-[#c5a059] text-black" : "bg-white/10 backdrop-blur-md border border-white/10 text-white"}`}>
              {cat.badge.label}
            </span>
          </div>
        )}

        {/* Pages count */}
        {/* <div className="absolute top-6 left-4 md:left-14 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 leading-3">
          <span className="text-[8px] uppercase tracking-[0.2em] text-white/60">{cat.pages} Pages</span>
        </div> */}

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 pl-8 md:pl-12">
          <span className="text-[8px] uppercase tracking-[0.5em] text-[#c5a059] block mb-3">
            {cat.eyebrow}
          </span>
        {/* <div className="absolute top-6 left-4 md:left-14 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5">
          <span className="text-[8px] uppercase tracking-[0.2em] text-white/60">{cat.pages} Pages</span>
        </div> */}
        <div className="absolute bottom-0 left-0 right-0 p-8 pl-8 md:pl-12">
          <span className="text-[8px] uppercase tracking-[0.5em] text-[#c5a059] block mb-3">{cat.eyebrow}</span>
          <h3 className="text-2xl md:text-3xl font-display font-light uppercase tracking-widest text-white mb-2 leading-tight">
            {cat.title}<br />{cat.titleLine2}
          </h3>
          <p className="text-[9px] uppercase tracking-[0.25em] text-white/40 mb-6">{cat.sub}</p>
          <div className="flex items-center gap-3 mt-5">
  {/* Download PDF */}
  {cat.pdf ? (
      <a
        href={cat.pdf}
        target="_blank"
        rel="noopener noreferrer"
        download
        className="
          group relative
          flex-1
          h-12
          flex items-center justify-center
          gap-3
          overflow-hidden
          rounded-sm
        
          border border-[#D6A765]/30
          bg-[#D6A765]/[0.035]
          backdrop-blur-md
        
          text-[#D6A765]/80
          text-[9px]
          uppercase
          tracking-[0.3em]
          font-semibold
        
          transition-all duration-500 ease-out
        
          hover:border-[#D6A765]/80
          hover:bg-[#D6A765]/[0.16]
          hover:text-[#F4D9A9]
          hover:shadow-[0_0_30px_rgba(214,167,101,0.18)]
        "
      >
        {/* Animated glass shine */}
        <span
          className="
            absolute inset-y-0 -left-[100%] w-[60%]
            skew-x-[-20deg]
            bg-gradient-to-r
            from-transparent
            via-white/[0.12]
            to-transparent
            transition-all duration-700
            group-hover:left-[130%]
          "
        />
      
        {/* Subtle gold inner glow */}
        <span
          className="
            absolute inset-0
            rounded-sm
            border border-transparent
            transition-all duration-500
            group-hover:border-[#D6A765]/20
          "
        />
      
        <Download
          size={14}
          strokeWidth={1.8}
          className="
            relative z-10
            transition-all duration-500
            group-hover:-translate-y-0.5
            group-hover:scale-110
          "
        />
      
        <span className="relative z-10">
          Download PDF
        </span>
        
        <span
          className="
            relative z-10
            text-[#D6A765]/40
            transition-all duration-500
            group-hover:translate-x-1
            group-hover:text-[#F4D9A9]
          "
        >
          →
        </span>
      </a>
        ) : (
          <button
        type="button"
        className="
          group relative
          flex-1
          h-12
          flex items-center justify-center
          gap-3
          overflow-hidden
          rounded-sm
        
          border border-[#D6A765]/30
          bg-[#D6A765]/[0.035]
          backdrop-blur-md
        
          text-[#D6A765]/80
          text-[9px]
          uppercase
          tracking-[0.3em]
          font-semibold
        
          transition-all duration-500 ease-out
        
          hover:border-[#D6A765]/80
          hover:bg-[#D6A765]/[0.16]
          hover:text-[#F4D9A9]
          hover:shadow-[0_0_30px_rgba(214,167,101,0.18)]
        "
      >
        {/* Animated glass shine */}
        <span
          className="
            absolute inset-y-0 -left-[100%] w-[60%]
            skew-x-[-20deg]
            bg-gradient-to-r
            from-transparent
            via-white/[0.12]
            to-transparent
            transition-all duration-700
            group-hover:left-[130%]
          "
        />
      
        <span
          className="
            absolute inset-0
            rounded-sm
            border border-transparent
            transition-all duration-500
            group-hover:border-[#D6A765]/20
          "
        />
      
        <Download
          size={14}
          strokeWidth={1.8}
          className="
            relative z-10
            transition-all duration-500
            group-hover:-translate-y-0.5
            group-hover:scale-110
          "
        />
      
        <span className="relative z-10">
          Download PDF
        </span>
        
        <span
          className="
            relative z-10
            text-[#D6A765]/40
            transition-all duration-500
            group-hover:translate-x-1
            group-hover:text-[#F4D9A9]
          "
        >
          →
        </span>
      </button>
        )}
      
        {/* Preview */}
      <button
        type="button"
        aria-label="Preview catalogue"
        className="
          group
          relative
          h-12
          w-12
          shrink-0
          flex
          items-center
          justify-center
          overflow-hidden
          rounded-sm
      
          border border-[#D6A765]/30
          bg-[#D6A765]/[0.035]
          backdrop-blur-md
      
          text-[#D6A765]/80
      
          transition-colors
          duration-300
      
          hover:border-[#D6A765]/80
          hover:bg-[#D6A765]/[0.16]
          hover:text-[#F4D9A9]
          hover:shadow-[0_0_25px_rgba(214,167,101,0.16)]
        "
      >
        {/* Shine — plays only on hover-in */}
        <span
          className="
            pointer-events-none
            absolute
            inset-y-0
            -left-[100%]
            w-[55%]
            skew-x-[-20deg]
            bg-gradient-to-r
            from-transparent
            via-white/[0.15]
            to-transparent
            opacity-0
      
            group-hover:animate-[glassShine_700ms_ease-out_forwards]
          "
        />
      
        {/* Inner border glow */}
        <span
          className="
            pointer-events-none
            absolute
            inset-0
            border
            border-[#D6A765]/0
            transition-colors
            duration-300
            group-hover:border-[#D6A765]/20
          "
        />
      
        {/* Eye */}
        <Eye
          size={16}
          strokeWidth={1.5}
          className="
            relative
            z-10
            transition-transform
            duration-300
            group-hover:scale-110
          "
        />
      
        {/* Corner accent */}
        <span
          className="
            absolute
            right-0
            top-0
            h-2
            w-px
            bg-[#D6A765]/60
            transition-all
            duration-300
            group-hover:h-3
            group-hover:bg-[#D6A765]
          "
        />
      
        <span
          className="
            absolute
            right-0
            top-0
            h-px
            w-2
            bg-[#D6A765]/60
            transition-all
            duration-300
            group-hover:w-3
            group-hover:bg-[#D6A765]
          "
        />
      </button>
      </div>
        </div>
      </div>
      <div className="px-8 pl-12 py-5 border-t border-white/5 flex items-center justify-between bg-[#0d0d0d]">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${cat.availability === "green" ? "bg-green-400" : "bg-yellow-400"}`} />
          <span className="text-[8px] uppercase tracking-[0.2em] text-white/30">{cat.availLabel}</span>
        </div>
        {/* <span className="text-[8px] uppercase tracking-[0.25em] text-white/20">PDF · {cat.size}</span> */}
      </div>
    </div>
    </div>
  );
}
