import Head from "next/head";
import type { GetStaticProps } from "next";
import ExploreSection from "@/components/sections/ExploreSection";
import { EXPLORE_SECTIONS } from "@/lib/constants/explore";
import { explorePageSchema } from "@/lib/schemas";
import { siteConfig } from "@/config/site";
import { api, type ApiCategory } from "@/lib/services/api";
import { cmsRequiredProps } from "@/lib/utils/static-paths";

const TITLE = `Explore Collections | ${siteConfig.name}`;
const DESCRIPTION =
  "Explore R Ceramica's premium collections of luxury sanitaryware, faucets, showers and designer bathroom solutions.";

/**
 * Luxe styling presets cycled across the CMS categories, so an admin only sets
 * the title/subtitle/image while the editorial look stays consistent.
 */
const STYLE_PRESETS = [
  { bg: "#080808", imageOpacity: 50, overlayClass: "bg-gradient-to-t from-black via-transparent to-transparent", titleTracking: "tight" as const, linkVariant: "arrow" as const },
  { bg: "#0c0c0c", imageOpacity: 30, overlayClass: "bg-black/30 group-hover:bg-black/10 transition-all", titleTracking: "wide" as const, linkVariant: "chevron" as const },
  { bg: "#0a0a0a", imageOpacity: 50, overlayClass: "bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/40 to-transparent", titleTracking: "tight" as const, linkVariant: "gold-arrow" as const },
  { bg: "#0c0c0c", imageOpacity: 40, overlayClass: "bg-gradient-to-b from-black/20 to-black/80", titleTracking: "wide" as const, linkVariant: "button" as const },
  { bg: "#080808", imageOpacity: 40, overlayClass: "bg-gradient-to-t from-black/60 to-transparent", titleTracking: "wide" as const, linkVariant: "button" as const },
  { bg: "#060606", imageOpacity: 30, overlayClass: "bg-gradient-to-b from-transparent to-black/90", titleTracking: "wide" as const, linkVariant: "gold-arrow" as const },
];

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1600";

type ExploreItem = (typeof EXPLORE_SECTIONS)[number];

/** Map a CMS category onto the ExploreSection prop shape. */
function categoryToSection(cat: ApiCategory, i: number): ExploreItem {
  const preset = STYLE_PRESETS[i % STYLE_PRESETS.length];
  return {
    eyebrow: cat.hero_eyebrow || cat.name,
    title: cat.title || cat.name,
    italicLine: cat.subtitle || null,
    description: cat.description || "",
    image: cat.image || cat.hero_image || FALLBACK_IMAGE,
    imageAlt: cat.name,
    href: `/explore/${cat.slug}`,
    linkLabel: "View Collection",
    isH1: i === 0,
    ...preset,
  } as ExploreItem;
}

export const getStaticProps: GetStaticProps<{ sections: ExploreItem[] }> = async () =>
  cmsRequiredProps(
    "/explore",
    async () => {
      const categories = await api.getCategories();
      // 0 published categories means the page would render nothing useful —
      // treat that as a build failure rather than publishing an empty /explore.
      if (!Array.isArray(categories) || categories.length === 0) {
        throw new Error(
          "content API returned no published categories — check that at least one " +
            "category has status = published"
        );
      }
      return { sections: categories.map(categoryToSection) };
    },
    // next dev only — a production build throws above instead of using this.
    () => ({ sections: EXPLORE_SECTIONS as unknown as ExploreItem[] })
  );

export default function ExplorePage({ sections }: { sections: ExploreItem[] }) {
  return (
    <div className="page-explore">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${siteConfig.url}/explore/`} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(explorePageSchema) }}
        />
      </Head>

      <main className="snap-y snap-proximity scroll-smooth">
        {sections.map((section, i) => (
          <ExploreSection key={i} {...section} />
        ))}
      </main>
    </div>
  );
}
