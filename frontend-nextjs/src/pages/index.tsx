import Head from "next/head";
import type { GetStaticProps } from "next";
import {
  Hero,
  MediaGrid,
  ProductCarousel,
  FeatureCards,
  NarrativeSection,
  SocialFeed,
} from "@/components/sections";
import {
  HOME_HERO,
  SPACE_CARDS,
  CAROUSEL_SLIDES,
  HOME_FEATURES,
  HOME_NARRATIVE,
  SOCIAL_POSTS,
} from "@/lib/constants/home";
import { api, sectionsByType, type ApiPage } from "@/lib/services/api";
import { resolveCardIcons } from "@/lib/utils/icons";
import { homePageSchema } from "@/lib/schemas";
import { siteConfig } from "@/config/site";

/**
 * Home page → "/".
 *
 * Content is fetched from the CodeIgniter CMS at build time (getStaticProps).
 * If the API is unreachable during a build, the page falls back to the static
 * constants in @/lib/constants/home so a build never produces an empty site.
 * Layout is composed from the same reusable @/components/sections either way.
 */

interface HomeProps {
  page: ApiPage | null;
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const page = await api.getPage("home");
    console.log("[home] getStaticProps: fetched from API, sections:", page?.sections?.length ?? 0);
    return { props: { page } };
  } catch (err) {
    console.error("[home] getStaticProps: API fetch failed — using static fallback:", err instanceof Error ? err.message : String(err));
    return { props: { page: null } };
  }
};

export default function HomePage({ page }: HomeProps) {
  const s = page ? sectionsByType(page.sections) : null;

  // When the API is reachable (page !== null), only show sections returned by the API
  // (i.e. those with is_active=1). Static fallbacks are used only when the API is down.
  const apiOk = page !== null;
  const hero       = s?.hero                            ?? HOME_HERO;
  const spaceCards = s?.mediaGrid?.cards                ?? (apiOk ? null : SPACE_CARDS);
  const slides          = s?.productCarousel?.slides    ?? (apiOk ? null : CAROUSEL_SLIDES);
  const carouselEyebrow = s?.productCarousel?.eyebrow  ?? "Spotlight Collection";
  const features   = resolveCardIcons(s?.featureCards?.cards ?? (apiOk ? [] : HOME_FEATURES));
  const narrative  = s?.narrative                       ?? (apiOk ? null : HOME_NARRATIVE);
  const posts      = s?.socialFeed?.posts               ?? (apiOk ? null : SOCIAL_POSTS);

  const title = page?.meta_title ?? `${siteConfig.name} | ${siteConfig.tagline}`;
  const description =
    page?.meta_description ??
    "Explore R Ceramica's premium collection of porcelain tiles, luxury bathrooms, and architectural surfaces. Redefining spaces through innovation and craftsmanship.";

  return (
    <div className="page-home">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${siteConfig.url}/`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={siteConfig.shortDescription} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
        />
      </Head>

      <Hero {...hero} />
      {spaceCards  && <MediaGrid items={spaceCards} ariaLabel="Architectural Spaces" />}
      {slides      && <ProductCarousel slides={slides} eyebrow={carouselEyebrow} />}
      {features.length > 0 && <FeatureCards items={features} ariaLabel="Business services and support" />}
      {narrative   && <NarrativeSection {...narrative} />}
      {posts       && <SocialFeed posts={posts} />}
    </div>
  );
}
