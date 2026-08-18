import Head from "next/head";
import type { GetStaticProps } from "next";

import {
  PhilosophySection,
  StatsGrid,
  ManufacturingSection,
  TestimonialsQuote,
  Footprint,
} from "@/components/sections";

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
 * About Us page → "/about"
 *
 * Content is fetched from the CMS at build time using getStaticProps.
 * If the API is unavailable, static fallback content is used.
 */

interface AboutProps {
  page: ApiPage | null;
}

/**
 * ============================================================
 * STATIC PROPS
 * ============================================================
 */

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
  try {
    const page = await api.getPage("about");

    console.log(
      "[about] getStaticProps: fetched from API, sections:",
      page?.sections?.length ?? 0,
    );

    return {
      props: {
        page,
      },
    };
  } catch (err) {
    console.error(
      "[about] getStaticProps: API fetch failed — using static fallback:",
      err instanceof Error ? err.message : String(err),
    );

    return {
      props: {
        page: null,
      },
    };
  }
};

/**
 * ============================================================
 * ABOUT PAGE
 * ============================================================
 */

export default function AboutPage({ page }: AboutProps) {
  /**
   * ----------------------------------------------------------
   * CMS DATA
   * ----------------------------------------------------------
   */

  const sections = page ? sectionsByType(page.sections) : null;

  const apiOk = page !== null;

  /**
   * ----------------------------------------------------------
   * SECTION DATA
   * ----------------------------------------------------------
   */

  const hero = sections?.aboutHero ?? ABOUT_HERO_STATIC;

  const philosophy = sections?.philosophy ?? (apiOk ? null : ABOUT_PHILOSOPHY);

  const stats = sections?.stats?.items ?? (apiOk ? null : ABOUT_STATS);

  const technologySection = sections?.technology ?? null;

  const technology =
    technologySection?.items ?? (apiOk ? null : ABOUT_TECHNOLOGY);

  const technologyTitle =
    technologySection?.title ?? "Our Manufacturing Process";

  const technologyEyebrow =
    technologySection?.eyebrow ?? "Industrial Innovation";

  const chairman = sections?.chairman ?? (apiOk ? null : ABOUT_CHAIRMAN);

  const footprint = sections?.footprint ?? (apiOk ? null : ABOUT_FOOTPRINT);

  /**
   * ----------------------------------------------------------
   * SEO
   * ----------------------------------------------------------
   */

  const title = page?.meta_title ?? `About Us | ${siteConfig.name}`;

  const description =
    page?.meta_description ??
    "Discover the R Ceramica story — two decades of design-led porcelain manufacturing, sustainable production, and surfaces trusted in 40+ countries.";

  return (
    <>
      {/* ======================================================
          SEO
      ======================================================= */}

      <Head>
        <title>{title}</title>

        <meta name="description" content={description} />

        <link rel="canonical" href={`${siteConfig.url}/about/`} />

        <meta property="og:title" content={title} />

        <meta property="og:description" content={description} />

        <meta property="og:image" content={siteConfig.ogImage} />

        <meta name="twitter:card" content="summary_large_image" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(aboutPageSchema),
          }}
        />
      </Head>

      {/* ======================================================
          PAGE WRAPPER

          Important:
          - w-full prevents fixed-width expansion
          - max-w-full prevents overflow
          - overflow-x-clip prevents accidental horizontal scroll
          - box-border keeps padding inside width
      ======================================================= */}

      <main
        className="
          page-about
          box-border
          w-full
          max-w-full
          min-w-0
          overflow-x-clip
          bg-[#0d0d0d]
          text-white
        "
      >
        {/* ====================================================
            HERO

            The Hero component handles its own responsive
            typography and image behavior.
        ===================================================== */}

        {hero && (
          <section
            className="
              w-full
              max-w-full
              min-w-0
            "
          >
            <AboutHero {...hero} />
          </section>
        )}

        {/* ====================================================
            PHILOSOPHY
        ===================================================== */}

        {philosophy && (
          <section
            className="
              w-full
              max-w-full
              min-w-0
            "
          >
            <PhilosophySection {...philosophy} />
          </section>
        )}

        {/* ====================================================
            STATS
        ===================================================== */}

        {stats && stats.length > 0 && (
          <section
            className="
              w-full
              max-w-full
              min-w-0
            "
          >
            <StatsGrid
              items={stats}
              ariaLabel="R Ceramica company statistics"
            />
          </section>
        )}

        {/* ====================================================
            MANUFACTURING / TECHNOLOGY
        ===================================================== */}

        {technology && technology.length > 0 && (
          <section
            className="
              w-full
              max-w-full
              min-w-0
            "
          >
            <ManufacturingSection
              title={technologyTitle}
              eyebrow={technologyEyebrow}
              items={technology}
            />
          </section>
        )}

        {/* ====================================================
            CHAIRMAN / TESTIMONIAL
        ===================================================== */}

        {chairman && (
          <section
            className="
              w-full
              max-w-full
              min-w-0
            "
          >
            <TestimonialsQuote {...chairman} />
          </section>
        )}

        {/* ====================================================
            GLOBAL FOOTPRINT
        ===================================================== */}

        {/* {footprint && (
          <section
            className="
              w-full
              max-w-full
              min-w-0
            "
          >
            <Footprint {...footprint} />
          </section>
        )} */}
      </main>
    </>
  );
}
