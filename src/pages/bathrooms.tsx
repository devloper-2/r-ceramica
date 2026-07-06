import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  BATHROOMS_HERO,
  FUSION_COLLECTIONS,
  SHOWER_TILES,
  SANITARY_TILES,
} from "@/lib/constants/bathrooms";
import { webPageSchema } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const TITLE = `Bathrooms & Faucets | ${siteConfig.name}`;
const DESCRIPTION =
  "Precision-engineered faucet collections, showers and sanitaryware where architectural geometry meets the sensory experience of water.";

/**
 * Bathrooms page → "/bathrooms" (ported from static-html/faucets.html).
 */
export default function BathroomsPage() {
  return (
    <div className="page-bathrooms">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${siteConfig.url}/bathrooms`} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webPageSchema("/bathrooms", "Bathrooms & Faucets", DESCRIPTION)),
          }}
        />
      </Head>

      {/* Hero */}
      <section className="relative h-[80vh] w-full flex items-center overflow-hidden bg-[#080808]">
        <div className="absolute inset-0 z-0">
          <Image
            src={BATHROOMS_HERO.image}
            alt={BATHROOMS_HERO.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[var(--color-bg)]" />
        </div>
        <div className="relative z-10 max-w-[1720px] mx-auto px-8 md:px-24 w-full pt-32">
          <div className="max-w-4xl">
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.6em] text-[var(--color-gold)] mb-6 block font-medium">
              {BATHROOMS_HERO.eyebrow}
            </span>
            <h1 className="text-5xl md:text-8xl font-display font-light text-white leading-[0.9] uppercase tracking-tighter mb-10">
              {BATHROOMS_HERO.title} <br /> {BATHROOMS_HERO.titleLine2}
            </h1>
            <p className="text-white/40 text-xs md:text-sm uppercase tracking-[0.3em] font-light max-w-xl leading-relaxed">
              {BATHROOMS_HERO.description}
            </p>
            <div className="mt-12 flex gap-10">
              <a
                href="#fusion"
                className="text-[10px] uppercase tracking-[0.4em] text-white border-b border-white/20 pb-2 hover:border-white transition-all"
              >
                Fusion Collection
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="bg-[var(--color-bg)]">
        {/* Fusion Collection */}
        <section id="fusion" className="py-24 md:py-32 px-8 md:px-24 max-w-[1720px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-10">
            <h2 className="text-4xl md:text-6xl font-display font-light uppercase tracking-widest">
              Fusion <br />Collection
            </h2>
            <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] max-w-sm">
              A curated selection of signature series designed for contemporary high-end environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {FUSION_COLLECTIONS.map((item) => (
              <Link
                key={item.id}
                href={`/products?category=${item.id}`}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] overflow-hidden bg-[var(--color-bg-card)] mb-6 relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="px-8 py-3 border border-white/30 text-[9px] uppercase tracking-[0.5em] scale-90 group-hover:scale-100 transition-all duration-500 bg-white/5 backdrop-blur-md">
                      Shop Collection
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-display font-light uppercase tracking-[0.2em] group-hover:text-[var(--color-gold)] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[9px] text-white/30 uppercase tracking-[0.3em]">Architectural Series</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Showers & Wellness */}
        <section className="py-24 md:py-32 px-8 md:px-24 max-w-[1720px] mx-auto border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-10">
            <h2 className="text-4xl md:text-6xl font-display font-light uppercase tracking-widest text-[var(--color-gold)]">
              Showers <br />& Wellness
            </h2>
            <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] max-w-sm">
              Immersive hydro-therapy systems that transform the daily ritual into an architectural experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SHOWER_TILES.map((tile) => (
              <Link
                key={tile.title}
                href={tile.href}
                className="group cursor-pointer relative aspect-video overflow-hidden"
              >
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-display font-light uppercase tracking-widest text-white">
                    {tile.title}
                  </h3>
                  <p className="text-[9px] text-[var(--color-gold)] uppercase tracking-[0.4em] mt-2">
                    {tile.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Sanitary & Basins */}
        <section className="py-24 md:py-32 px-8 md:px-24 max-w-[1720px] mx-auto border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-10">
            <h2 className="text-4xl md:text-6xl font-display font-light uppercase tracking-widest">
              Sanitary <br />& Basins
            </h2>
            <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] max-w-sm">
              Ergonomic forms connecting hygiene and sustainability with minimalist aesthetic precision.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {SANITARY_TILES.map((tile) => (
              <Link
                key={tile.title}
                href={tile.href}
                className="group cursor-pointer relative h-[400px] overflow-hidden"
              >
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-50 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-12">
                  <h3 className="text-3xl font-display font-light uppercase tracking-widest text-white">
                    {tile.title}
                  </h3>
                  <p className="text-[9px] text-[var(--color-gold)] uppercase tracking-[0.4em] mt-4">
                    {tile.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
