import Head from "next/head";
import ExploreCategories from "@/components/sections/ExploreCategories";
import { TILES_CATEGORIES } from "@/lib/constants/tiles";
import { webPageSchema } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const TITLE = `Tiles & Surfaces | ${siteConfig.name}`;
const DESCRIPTION =
  "Explore R Ceramica's architectural surfaces — porcelain tiles, luxury showers, artisan faucets, sanitary forms and minimal basins.";

/**
 * Tiles page → "/tiles" (ported from static-html/explore.html). Full-screen
 * snap-scrolling category bands via the reusable <ExploreCategories> section.
 */
export default function TilesPage() {
  return (
    <div className="page-tiles">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${siteConfig.url}/tiles`} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webPageSchema("/tiles", "Tiles & Surfaces", DESCRIPTION)),
          }}
        />
      </Head>

      <ExploreCategories items={TILES_CATEGORIES} ariaLabel="Explore our collections" />
    </div>
  );
}
