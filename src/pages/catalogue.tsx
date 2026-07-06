import Head from "next/head";
import Link from "next/link";
import { Send, Package, Truck, Award } from "lucide-react";
import CatalogueGrid from "@/components/sections/CatalogueGrid";
import { CATALOGUE_BOOKS, CATALOGUE_STATS } from "@/lib/constants/catalogue";
import { webPageSchema } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const TITLE = `Product Catalogue | ${siteConfig.name}`;
const DESCRIPTION =
  "Explore R Ceramica's complete library of architectural surface catalogues, technical data sheets, and collection lookbooks.";

const BENEFITS = [
  {
    icon: Package,
    title: "Premium Print Quality",
    text: "Printed on 170gsm art paper with true-to-life color reproduction.",
  },
  {
    icon: Truck,
    title: "Worldwide Delivery",
    text: "Free dispatch to architects and trade professionals across the globe.",
  },
  {
    icon: Award,
    title: "Trade Exclusive Access",
    text: "Priority editions reserved for architects, designers, and specifiers.",
  },
];

/**
 * Catalogue page → "/catalogue" (ported from static-html/catalogue.html).
 */
export default function CataloguePage() {
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webPageSchema("/catalogue", "Product Catalogue", DESCRIPTION)),
          }}
        />
      </Head>

      {/* Hero */}
      <header className="relative pt-40 md:pt-56 pb-24 md:pb-32 bg-[#080808] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[22vw] font-display font-medium text-white/[0.02] uppercase tracking-tighter whitespace-nowrap">
            CATALOGUE
          </span>
        </div>
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent ml-8 md:ml-24" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent mr-8 md:mr-24" />

        <div className="relative max-w-[1440px] mx-auto px-6 md:px-16 text-center">
          <div className="inline-flex items-center gap-6 mb-8">
            <div className="w-12 h-px bg-[var(--color-gold)]/60" />
            <span className="text-[9px] uppercase tracking-[0.6em] text-[var(--color-gold)] font-medium">
              Collection Archive
            </span>
            <div className="w-12 h-px bg-[var(--color-gold)]/60" />
          </div>
          <h1 className="text-4xl md:text-7xl font-display font-light uppercase tracking-[0.2em] text-white mb-6 leading-[1.05]">
            Product
            <br />
            <span className="cat-outline-text">Catalogue</span>
          </h1>
          <p className="text-[11px] text-white/40 uppercase tracking-[0.35em] max-w-xl mx-auto leading-relaxed mt-8">
            Explore our complete library of architectural surface catalogues, technical data sheets, and collection lookbooks.
          </p>
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 md:px-16 mt-20">
          <div className="grid grid-cols-3 border border-white/5 divide-x divide-white/5">
            {CATALOGUE_STATS.map((s) => (
              <div key={s.label} className="py-8 text-center">
                <p className="text-2xl md:text-3xl font-display font-light text-white mb-1">{s.value}</p>
                <p className="text-[8px] uppercase tracking-[0.4em] text-white/30">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <CatalogueGrid books={CATALOGUE_BOOKS} />

      {/* Request physical catalogue */}
      <section className="py-24 md:py-32 bg-[var(--color-bg-alt)] border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-6">
                <div className="w-8 h-px bg-[var(--color-gold)]/60" />
                <span className="text-[9px] uppercase tracking-[0.5em] text-[var(--color-gold)]/80">
                  Bespoke Service
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-light text-white uppercase tracking-wider leading-tight">
                Request a<br />
                <span className="cat-outline-text">Physical</span>
                <br />
                Catalogue
              </h2>
              <p className="text-[11px] text-white/40 uppercase tracking-[0.25em] leading-relaxed max-w-md">
                Request our premium printed catalogues delivered to your studio or showroom. Available for architects, interior designers, and trade professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-3 bg-white text-black px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-200 transition-all"
                >
                  <Send size={14} /> Request Copy
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-3 border border-white/10 text-white/60 hover:text-white hover:border-white/30 px-10 py-5 text-[10px] uppercase tracking-[0.3em] transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="space-y-0">
              {BENEFITS.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-start gap-6 py-7 border-b border-white/5 group">
                  <div className="w-10 h-10 border border-white/10 group-hover:border-[var(--color-gold)]/40 flex items-center justify-center shrink-0 transition-colors">
                    <Icon size={16} className="text-white/30 group-hover:text-[var(--color-gold)] transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-[11px] uppercase tracking-[0.2em] text-white mb-1">{title}</h4>
                    <p className="text-[10px] text-white/30 tracking-[0.1em] leading-relaxed">{text}</p>
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
