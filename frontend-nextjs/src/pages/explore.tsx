import Head from "next/head";
import type { GetStaticProps } from "next";
import ExploreSection from "@/components/sections/ExploreSection";
import { EXPLORE_SECTIONS } from "@/lib/constants/explore";
import { explorePageSchema } from "@/lib/schemas";
import { siteConfig } from "@/config/site";
import { api, sectionsByType, type ApiPage } from "@/lib/services/api";

const TITLE = `Explore Collections | ${siteConfig.name}`;
const DESCRIPTION =
  "Explore R Ceramica's premium collections of luxury sanitaryware, faucets, showers and designer bathroom solutions.";

export const getStaticProps: GetStaticProps<{ page: ApiPage | null }> = async () => {
  try {
    return { props: { page: await api.getPage("explore") } };
  } catch {
    return { props: { page: null } };
  }
};

export default function ExplorePage({ page }: { page: ApiPage | null }) {
  const sections = (page ? sectionsByType(page.sections).exploreGrid?.items : null) ?? EXPLORE_SECTIONS;
  return (
    <div className="page-explore">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${siteConfig.url}/explore`} />
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
        {sections.map((section: (typeof EXPLORE_SECTIONS)[number], i: number) => (
          <ExploreSection key={i} {...section} />
        ))}
      </main>
    </div>
  );
}
