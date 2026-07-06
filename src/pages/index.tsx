import Head from "next/head";
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
import { homePageSchema } from "@/lib/schemas";
import { siteConfig } from "@/config/site";

const TITLE = `${siteConfig.name} | ${siteConfig.tagline}`;
const DESCRIPTION =
  "Explore R Ceramica's premium collection of porcelain tiles, luxury bathrooms, and architectural surfaces. Redefining spaces through innovation and craftsmanship.";

/**
 * Home page → "/"  (Pages Router: the filename `index` maps to the root URL).
 * Content comes from @/lib/constants/home, styling from styles/homepage.css,
 * layout is composed from reusable @/components/sections.
 */
export default function HomePage() {
  return (
    <div className="page-home">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${siteConfig.url}/`} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={siteConfig.shortDescription} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
        />
      </Head>

      <Hero {...HOME_HERO} />
      <MediaGrid items={SPACE_CARDS} ariaLabel="Architectural Spaces" />
      <ProductCarousel slides={CAROUSEL_SLIDES} />
      <FeatureCards items={HOME_FEATURES} ariaLabel="Business services and support" />
      <NarrativeSection {...HOME_NARRATIVE} />
      <SocialFeed posts={SOCIAL_POSTS} />
    </div>
  );
}
