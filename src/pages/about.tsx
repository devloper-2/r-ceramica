import Head from "next/head";
import { Hero, PhilosophySection, StatsGrid, ManufacturingSection, TestimonialsQuote, Footprint  } from "@/components/sections";
import {
  ABOUT_HERO,
  ABOUT_PHILOSOPHY,
  ABOUT_TECHNOLOGY,
  ABOUT_STATS,
  ABOUT_CHAIRMAN,
  ABOUT_FOOTPRINT,
} from "@/lib/constants/about";
import { webPageSchema } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const TITLE = `About Us | ${siteConfig.name}`;
const DESCRIPTION =
  "Discover the R Ceramica story — two decades of design-led porcelain manufacturing, sustainable production, and surfaces trusted in 40+ countries.";

/**
 * About Us page → "/about"  (Pages Router: filename `about` maps to /about).
 *
 * A teaching example of REUSE: every section here (Hero, NarrativeSection,
 * MediaGrid, FeatureCards) is the SAME component used on the home page — only
 * the data (@/lib/constants/about) and styles (styles/aboutpage.css) differ.
 */
export default function AboutPage() {
  return (
    <div className="page-about">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${siteConfig.url}/about`} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Hero {...ABOUT_HERO} />
      <PhilosophySection {...ABOUT_PHILOSOPHY} />
      <StatsGrid items={ABOUT_STATS} />
      <ManufacturingSection title="Our Manufacturing Process" items={ABOUT_TECHNOLOGY} />
      <TestimonialsQuote {...ABOUT_CHAIRMAN} />
      <Footprint {...ABOUT_FOOTPRINT} />
    </div>
  );
}
