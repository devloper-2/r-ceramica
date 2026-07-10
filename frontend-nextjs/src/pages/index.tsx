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
    return { props: { page } };
  } catch {
    return { props: { page: null } };
  }
};

export default function HomePage({ page }: HomeProps) {
  const s = page ? sectionsByType(page.sections) : null;

  // CMS content with static fallback per section.
  const hero = s?.hero ?? HOME_HERO;
  const spaceCards = s?.mediaGrid?.cards ?? SPACE_CARDS;
  const slides = s?.productCarousel?.slides ?? CAROUSEL_SLIDES;
  const features = resolveCardIcons(s?.featureCards?.cards ?? HOME_FEATURES);
  const narrative = s?.narrative ?? HOME_NARRATIVE;
  const posts = s?.socialFeed?.posts ?? SOCIAL_POSTS;

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
      <MediaGrid items={spaceCards} ariaLabel="Architectural Spaces" />
      <ProductCarousel slides={slides} />
      <FeatureCards items={features} ariaLabel="Business services and support" />
      <NarrativeSection {...narrative} />
      <SocialFeed posts={posts} />
    </div>
  );
}
