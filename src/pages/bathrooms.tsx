import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const TITLE = `Bathrooms | ${siteConfig.name}`;
const DESCRIPTION =
  "Precision-engineered faucet collections, luxury showers and sanitary solutions where architectural geometry meets the sensory experience of water.";

const FUSION_COLLECTIONS = [
  { id: "101", name: "Rivo Collection", img: "https://images.unsplash.com/photo-1620626011761-9963d7b59675?auto=format&fit=crop&q=80&w=600" },
  { id: "201", name: "Curve Collection", img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600" },
  { id: "301", name: "Eva Collection", img: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=600" },
  { id: "401", name: "Roma Collection", img: "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?auto=format&fit=crop&q=80&w=600" },
  { id: "501", name: "Artiz Collection", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600" },
  { id: "601", name: "Metro Collection", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600" },
  { id: "701", name: "Iris Collection", img: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=600" },
  { id: "801", name: "Cadiz Collection", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=600" },
  { id: "901", name: "Amaze Collection", img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=600" },
  { id: "1001", name: "Rossa Collection", img: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=600" },
];

const SHOWER_SERIES = [
  { name: "Overhead Series", img: "https://images.unsplash.com/photo-1620626014330-f99a0937285d?auto=format&fit=crop&q=80&w=800" },
  { name: "Body Jets", img: "https://images.unsplash.com/photo-1584622781514-f670c2269a84?auto=format&fit=crop&q=80&w=800" },
  { name: "Hand Showers", img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800" },
];

const SANITARY_SERIES = [
  { name: "Water Closets", label: "Explore Series", img: "https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=1200" },
  { name: "Artisan Basins", label: "Explore Series", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200" },
];

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
      </Head>

      {/* ── Hero ── */}
      <section className="relative h-[80vh] w-full flex items-center overflow-hidden bg-[#080808]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80"
            alt="Luxury Faucets"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50 scale-110 hover:scale-100 transition-transform duration-[10s]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a0a0a]" />
        </div>

        <div className="relative z-10 max-w-[1720px] mx-auto px-8 md:px-24 w-full pt-32">
          <div className="max-w-4xl bathrooms-fade-in">
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.6em] text-[#c5a059] mb-6 block font-medium">
              Water Engineering
            </span>
            <h1 className="text-5xl md:text-8xl font-display font-light text-white leading-[0.9] uppercase tracking-tighter mb-10">
              The Art of <br /> Fluidity
            </h1>
            <p className="text-white/40 text-xs md:text-sm uppercase tracking-[0.3em] font-light max-w-xl leading-relaxed">
              Precision-engineered faucet collections where architectural geometry meets the sensory experience of water.
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

      <main className="bg-[#0a0a0a]">

        {/* ── Fusion Collection ── */}
        <section id="fusion" className="py-32 px-8 md:px-24 max-w-[1720px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-10">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-6xl font-display font-light uppercase tracking-widest">
                Fusion <br />Collection
              </h2>
            </div>
            <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] max-w-sm">
              A curated selection of signature series designed for contemporary high-end environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {FUSION_COLLECTIONS.map((item) => (
              <Link
                key={item.id}
                href={`/products?category=${item.id}`}
                className="bathrooms-product-card group cursor-pointer"
              >
                <div className="aspect-[4/5] overflow-hidden bg-[#111] mb-6 relative">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    sizes="(max-width:768px) 100vw,(max-width:1280px) 33vw,25vw"
                    className="object-cover transition-all duration-1000 group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="px-8 py-3 border border-white/30 text-[9px] uppercase tracking-[0.5em] scale-90 group-hover:scale-100 transition-all duration-500 bg-white/5 backdrop-blur-md">
                      Shop Collection
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-display font-light uppercase tracking-[0.2em] group-hover:text-[#c5a059] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[9px] text-white/30 uppercase tracking-[0.3em]">
                    Architectural Series
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Showers & Wellness ── */}
        <section id="showers" className="py-32 px-8 md:px-24 max-w-[1720px] mx-auto border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-10">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-6xl font-display font-light uppercase tracking-widest text-[#c5a059]">
                Showers <br />&amp; Wellness
              </h2>
            </div>
            <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] max-w-sm">
              Immersive hydro-therapy systems that transform the daily ritual into an architectural experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SHOWER_SERIES.map((item) => (
              <Link
                key={item.name}
                href="/products?category=showers"
                className="bathrooms-product-card group cursor-pointer relative aspect-video overflow-hidden"
              >
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  sizes="(max-width:768px) 100vw,(max-width:1280px) 50vw,33vw"
                  className="object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-display font-light uppercase tracking-widest text-white">
                    {item.name}
                  </h3>
                  <p className="text-[9px] text-[#c5a059] uppercase tracking-[0.4em] mt-2">
                    View Models
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Sanitary & Basins ── */}
        <section id="sanitary" className="py-32 px-8 md:px-24 max-w-[1720px] mx-auto border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-10">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-6xl font-display font-light uppercase tracking-widest">
                Sanitary <br />&amp; Basins
              </h2>
            </div>
            <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] max-w-sm">
              Ergonomic forms connecting hygiene and sustainability with minimalist aesthetic precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {SANITARY_SERIES.map((item) => (
              <Link
                key={item.name}
                href="/products?category=sanitary"
                className="bathrooms-product-card group cursor-pointer relative h-[400px] overflow-hidden"
              >
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  sizes="(max-width:768px) 100vw,50vw"
                  className="object-cover opacity-50 transition-all duration-1000 group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-12">
                  <h3 className="text-3xl font-display font-light uppercase tracking-widest text-white">
                    {item.name}
                  </h3>
                  <p className="text-[9px] text-[#c5a059] uppercase tracking-[0.4em] mt-4">
                    {item.label}
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
