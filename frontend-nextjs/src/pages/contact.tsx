import Head from "next/head";
import type { GetStaticProps } from "next";
import { contactPageSchema } from "@/lib/schemas";
import { siteConfig } from "@/config/site";
import { api, sectionsByType, type ApiPage } from "@/lib/services/api";
import ContactHero from "@/components/sections/ContactHero";
import ContactSection, { type ContactSectionData } from "@/components/sections/ContactSection";

const DEFAULT_TITLE = `Contact Us | ${siteConfig.name}`;
const DEFAULT_DESCRIPTION =
  "Get in touch with R Ceramica — sales, support and studio enquiries.";

interface Props {
  page: ApiPage | null;
  contactSection: ContactSectionData | null;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  let page: ApiPage | null = null;
  let contactSection: ContactSectionData | null = null;

  try {
    page = await api.getPage("contact");
    const s = page ? sectionsByType(page.sections) : null;
    contactSection = s?.contactSection ?? null;
  } catch {
    console.error("[contact] Failed to fetch contact page from API");
  }

  return { props: { page, contactSection } };
};

export default function ContactUs({ page, contactSection }: Props) {
  const s = page ? sectionsByType(page.sections) : null;
  const hero = s?.contactHero ?? {};

  const title       = page?.meta_title       ?? DEFAULT_TITLE;
  const description = page?.meta_description ?? DEFAULT_DESCRIPTION;

  return (
    <div className="page-contact">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${siteConfig.url}/contact/`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
        />
      </Head>

      <ContactHero {...hero} />
      <ContactSection contactSection={contactSection ?? undefined} />
    </div>
  );
}
