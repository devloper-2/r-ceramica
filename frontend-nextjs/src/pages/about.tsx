import Head from "next/head";
import type { GetStaticProps } from "next";
import { PhilosophySection, StatsGrid, ManufacturingSection, TestimonialsQuote, Footprint } from "@/components/sections";
import AboutHero from "@/components/sections/AboutHero";
import {
  ABOUT_HERO_STATIC,
  ABOUT_PHILOSOPHY,
  ABOUT_TECHNOLOGY,
  ABOUT_STATS,
  ABOUT_CHAIRMAN,
  ABOUT_FOOTPRINT,
} from "@/lib/constants/about";
import { api, sectionsByType, type ApiPage } from "@/lib/services/api";
import { aboutPageSchema } from "@/lib/schemas";
import { siteConfig } from "@/config/site";

/**
 * About Us page → "/about".
 *
 * Content is fetched from the CMS at build time (getStaticProps) and mapped
 * onto the same reusable section components the page has always used. If the
 * API is unreachable at build time, it falls back to @/lib/constants/about.
 */

interface AboutProps {
  page: ApiPage | null;
}

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
  try {
    const page = await api.getPage("about");
    return { props: { page } };
  } catch {
    return { props: { page: null } };
  }
};

export default function AboutPage({ page }: AboutProps) {
  const s = page ? sectionsByType(page.sections) : null;

  const hero = s?.aboutHero ?? ABOUT_HERO_STATIC;
  const philosophy = s?.philosophy ?? ABOUT_PHILOSOPHY;
  const stats = s?.stats?.items ?? ABOUT_STATS;
  const technology = s?.technology?.items ?? ABOUT_TECHNOLOGY;
  const chairman = s?.chairman ?? ABOUT_CHAIRMAN;
  const footprint = s?.footprint ?? ABOUT_FOOTPRINT;

  const title = page?.meta_title ?? `About Us | ${siteConfig.name}`;
  const description =
    page?.meta_description ??
    "Discover the R Ceramica story — two decades of design-led porcelain manufacturing, sustainable production, and surfaces trusted in 40+ countries.";

  return (
    <div className="page-about">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${siteConfig.url}/about`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
        />
      </Head>

      <AboutHero {...hero} />
      <PhilosophySection {...philosophy} />
      <StatsGrid items={stats} />
      <ManufacturingSection title="Our Manufacturing Process" items={technology} />
      <TestimonialsQuote {...chairman} />
      <Footprint {...footprint} />
    </div>
  );
}
