import Head from "next/head";
import type { GetStaticProps } from "next";
import { contactPageSchema } from "@/lib/schemas";
import { siteConfig } from "@/config/site";
import { api, type ApiPage } from "@/lib/services/api";
import ContactHero from "@/components/sections/ContactHero";
import ContactSection from "@/components/sections/ContactSection";

const DEFAULT_TITLE = `Contact Us | ${siteConfig.name}`;
const DEFAULT_DESCRIPTION =
  "Discover the R Ceramica story — two decades of design-led porcelain manufacturing, sustainable production, and surfaces trusted in 40+ countries.";

export const getStaticProps: GetStaticProps<{ page: ApiPage | null }> = async () => {
  try {
    return { props: { page: await api.getPage("contact") } };
  } catch {
    return { props: { page: null } };
  }
};

/**
 * Contact Us page → "/contact"  (Pages Router: filename `contact` maps to /contact).
 *
 * A teaching example of REUSE: every section here (Hero, NarrativeSection,
 * MediaGrid, FeatureCards) is the SAME component used on the home page — only
 * the data (@/lib/constants/contact) and styles (styles/contactpage.css) differ.
 */
export default function ContactUs({ page }: { page: ApiPage | null }) {
  const title = page?.meta_title ?? DEFAULT_TITLE;
  const description = page?.meta_description ?? DEFAULT_DESCRIPTION;
  return (
    <div className="page-contact">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${siteConfig.url}/contact`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(contactPageSchema),
  }}
/>
      </Head>

      <ContactHero />
      <ContactSection />
    </div>
  );
}
