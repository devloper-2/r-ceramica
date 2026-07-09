import Head from "next/head";
import { contactPageSchema } from "@/lib/schemas";
import { siteConfig } from "@/config/site";
import ContactHero from "@/components/sections/ContactHero";
import ContactSection from "@/components/sections/ContactSection";

const TITLE = `Contact Us | ${siteConfig.name}`;
const DESCRIPTION =
  "Discover the R Ceramica story — two decades of design-led porcelain manufacturing, sustainable production, and surfaces trusted in 40+ countries.";

/**
 * Contact Us page → "/contact"  (Pages Router: filename `contact` maps to /contact).
 *
 * A teaching example of REUSE: every section here (Hero, NarrativeSection,
 * MediaGrid, FeatureCards) is the SAME component used on the home page — only
 * the data (@/lib/constants/contact) and styles (styles/contactpage.css) differ.
 */
export default function ContactUs() {
  return (
    <div className="page-contact">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${siteConfig.url}/contact`} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
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
