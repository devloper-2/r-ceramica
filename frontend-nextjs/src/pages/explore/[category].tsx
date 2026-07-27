import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import { siteConfig } from "@/config/site";
import { api, type ApiCategory } from "@/lib/services/api";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1600";

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const categories = await api.getCategories();
    return {
      paths: categories.map((c) => ({ params: { category: c.slug } })),
      fallback: false,
    };
  } catch {
    return { paths: [], fallback: false };
  }
};

export const getStaticProps: GetStaticProps<{ category: ApiCategory }> = async ({ params }) => {
  const slug = String(params?.category);
  try {
    const category = await api.getCategory(slug);
    return { props: { category } };
  } catch {
    return { notFound: true };
  }
};

export default function CategoryPage({ category }: { category: ApiCategory }) {
  const subs = (category.subcategories ?? []).filter((s) => s.status !== "draft");
  const heroImage = category.hero_image || category.image || FALLBACK_IMAGE;
  const heroTitle = category.hero_title || category.title || category.name;
  const title = `${category.name} | ${siteConfig.name}`;
  const description =
    category.hero_subtitle || category.description || `Explore the ${category.name} collection by R Ceramica.`;

  return (
    <div className="page-category bg-[#0a0a0a] text-white font-light">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${siteConfig.url}/explore/${category.slug}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={heroImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* ══ HERO ════════════════════════════════════════════════ */}
      <section className="relative h-[80vh] w-full flex items-center overflow-hidden bg-[#080808]">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt={heroTitle}
            fill
            priority
            sizes="100vw"
            className="object-cover scale-110"
            style={{ opacity: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a0a0a]" />
        </div>

        <div className="relative z-10 max-w-[1720px] mx-auto px-8 md:px-24 w-full pt-32">
          <div className="max-w-4xl cat-fade-in">
            {category.hero_eyebrow && (
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.6em] text-[#c5a059] mb-6 block font-medium">
                {category.hero_eyebrow}
              </span>
            )}
            <h1 className="text-5xl md:text-8xl font-display font-light text-white leading-[0.9] uppercase tracking-tighter mb-10">
              {heroTitle}
            </h1>
            {category.hero_subtitle && (
              <p className="text-white/40 text-xs md:text-sm uppercase tracking-[0.3em] font-light max-w-xl leading-relaxed">
                {category.hero_subtitle}
              </p>
            )}
            {subs.length > 0 && (
              <div className="mt-12 flex gap-10">
                <a href="#collections" className="text-[10px] uppercase tracking-[0.4em] text-white border-b border-white/20 pb-2 hover:border-white transition-all">
                  View Collections
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══ SUBCATEGORY LIST ════════════════════════════════════ */}
      <main className="bg-[#0a0a0a]">
        <section id="collections" className="py-24 md:py-28 px-8 md:px-24 max-w-[1720px] mx-auto">
          {subs.length === 0 ? (
            <p className="text-white/40 text-[10px] uppercase tracking-[0.3em]">No collections yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {subs.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/explore/${category.slug}/${sub.slug}`}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-[#111] mb-6 relative">
                    <Image
                      src={sub.image || FALLBACK_IMAGE}
                      alt={sub.name}
                      fill
                      sizes="(max-width:768px) 100vw,(max-width:1280px) 50vw,25vw"
                      className="object-cover transition-all duration-1000 group-hover:scale-[1.08]"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="px-8 py-3 border border-white/30 text-[9px] uppercase tracking-[0.5em] scale-90 group-hover:scale-100 transition-all duration-500 bg-white/5 backdrop-blur-md">
                        View Products
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-lg md:text-xl font-display font-light uppercase tracking-[0.2em] group-hover:text-[#c5a059] transition-colors">
                      {sub.name}
                    </h2>
                    <p className="text-[9px] text-white/30 uppercase tracking-[0.3em]">
                      {sub.subtitle || `${category.name} Series`}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <style jsx>{`
        .cat-fade-in {
          animation: catFadeIn 1.5s ease-out forwards;
        }
        @keyframes catFadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
