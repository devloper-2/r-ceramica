import Head from "next/head";

import { ExploreSection, Hero } from "@/components/sections";
import { EXPLORE_HERO, EXPLORE_CATEGORIES } from "@/lib/constants/explore";
import { explorePageSchema } from "@/lib/schemas";
import { siteConfig } from "@/config/site";

const TITLE = `Explore Collections | ${siteConfig.name}`;

const DESCRIPTION =
  "Explore R Ceramica's premium collections of luxury sanitaryware, faucets, showers and designer bathroom solutions.";

export default function ExplorePage() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>

        <meta
          name="description"
          content={DESCRIPTION}
        />

        <link
          rel="canonical"
          href={`${siteConfig.url}/explore`}
        />

        <meta
          property="og:title"
          content={TITLE}
        />

        <meta
          property="og:description"
          content={DESCRIPTION}
        />

        <meta
          property="og:image"
          content={siteConfig.ogImage}
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(explorePageSchema),
          }}
        />
      </Head>
<Hero {...EXPLORE_HERO} />
      <main className="bg-black">
        {EXPLORE_CATEGORIES.map((category) => (
          <ExploreSection
            key={category.href}
            {...category}
          />
        ))}
      </main>
    </>
  );
}