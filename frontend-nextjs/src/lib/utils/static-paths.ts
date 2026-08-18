/**
 * utils/static-paths.ts — guard for CMS-driven getStaticPaths.
 *
 * Every dynamic route here pre-renders its paths from the content API. When
 * that API was unreachable at build time the old `catch { return { paths: [] } }`
 * swallowed the failure and the build SUCCEEDED with zero pages exported — so
 * the site shipped with every /explore and /products deep link missing. Those
 * URLs then either 404 or, when the host serves a fallback HTML file with a
 * 200, boot the Next client router on a route it has never heard of, which
 * surfaces as "Application error: a client-side exception has occurred".
 *
 * So: fail the build loudly instead. A broken API is caught in CI, not in a
 * customer's browser.
 *
 * Escape hatches:
 *  - `next dev` (NODE_ENV !== "production") warns and continues, so the
 *    frontend still runs with the backend switched off.
 *  - ALLOW_EMPTY_STATIC_PATHS=true forces the old tolerant behaviour for a
 *    deliberate UI-only build.
 */

type Params = Record<string, string>;

const isBuild = process.env.NODE_ENV === "production";
const allowEmpty = process.env.ALLOW_EMPTY_STATIC_PATHS === "true";
const apiUrl = process.env.CONTENT_API_URL ?? "unset (falls back to http://localhost:8080/api/v1)";

function fail(label: string, detail: string): never {
  throw new Error(
    `getStaticPaths(${label}): ${detail}\n` +
      `  CONTENT_API_URL = ${apiUrl}\n` +
      `  Aborting the build — exporting these routes as an empty set would ship a site\n` +
      `  where every ${label} URL is broken. Start the content API (or fix the key/URL)\n` +
      `  and rebuild. To build the UI without a backend on purpose, set\n` +
      `  ALLOW_EMPTY_STATIC_PATHS=true.`
  );
}

/**
 * Load the path list for a dynamic route, refusing to return an empty set on a
 * production build.
 *
 * @param label  route being generated, used in the error message (e.g. "/explore/[category]")
 * @param load   fetches the params for every page that should be pre-rendered
 */
export async function cmsStaticPaths<P extends Params>(
  label: string,
  load: () => Promise<{ params: P }[]>
): Promise<{ paths: { params: P }[]; fallback: false }> {
  let paths: { params: P }[];

  try {
    paths = await load();
  } catch (err) {
    const detail = `content API request failed — ${(err as Error).message}`;
    if (isBuild && !allowEmpty) fail(label, detail);
    console.warn(`[static-paths] ${label}: ${detail} — rendering 0 pages.`);
    return { paths: [], fallback: false };
  }

  if (paths.length === 0) {
    const detail = "content API returned 0 paths";
    if (isBuild && !allowEmpty) fail(label, detail);
    console.warn(`[static-paths] ${label}: ${detail}.`);
  }

  return { paths, fallback: false };
}

/**
 * Load one page's props, refusing to silently drop it from the export.
 *
 * `getStaticProps` used to end in `catch { return { notFound: true } }`. Under
 * `output: export` a notFound page is omitted with NO error, so a content API
 * that 500s on one endpoint quietly deleted those pages from the site while the
 * build still reported success — which is how every subcategory that actually
 * had products vanished from staging while the empty ones shipped fine.
 *
 * A real 404 from the API still means "this page does not exist" and is
 * honoured. Anything else (5xx, network) fails the build with the real status.
 */
export async function cmsStaticProps<T extends object>(
  label: string,
  load: () => Promise<T>
): Promise<{ props: T } | { notFound: true }> {
  try {
    return { props: await load() };
  } catch (err) {
    const status = (err as { status?: number }).status;

    // The API explicitly says this slug is not published — a legitimate 404.
    if (status === 404) return { notFound: true };

    const detail = `content API error — ${(err as Error).message}`;
    if (isBuild && !allowEmpty) {
      throw new Error(
        `getStaticProps(${label}): ${detail}\n` +
          `  CONTENT_API_URL = ${apiUrl}\n` +
          `  Aborting the build. Dropping this page instead would remove it from the\n` +
          `  site with no error at all — fix the endpoint, or set\n` +
          `  ALLOW_EMPTY_STATIC_PATHS=true to build without it on purpose.`
      );
    }
    console.warn(`[static-props] ${label}: ${detail} — page skipped.`);
    return { notFound: true };
  }
}

/**
 * Load props for a page that must ALWAYS exist and must ALWAYS reflect the CMS
 * (e.g. /explore). Unlike cmsStaticProps there is no notFound escape: any
 * failure fails the build.
 *
 * This exists because /explore used to `catch` an API failure and render a
 * hardcoded EXPLORE_SECTIONS constant instead. The build then "succeeded" and
 * published editorial placeholder copy — with dead links — over the real
 * categories. Shipping fake content is worse than not shipping.
 *
 * In `next dev` the caller's fallback is still used so the UI runs with the
 * backend switched off.
 */
export async function cmsRequiredProps<T extends object>(
  label: string,
  load: () => Promise<T>,
  devFallback: () => T
): Promise<{ props: T }> {
  try {
    return { props: await load() };
  } catch (err) {
    const detail = `content API error — ${(err as Error).message}`;
    if (isBuild && !allowEmpty) {
      throw new Error(
        `getStaticProps(${label}): ${detail}\n` +
          `  CONTENT_API_URL = ${apiUrl}\n` +
          `  Aborting the build. Falling back to hardcoded content here would\n` +
          `  publish placeholder copy over the live CMS data without any error.`
      );
    }
    console.warn(`[static-props] ${label}: ${detail} — using local fallback content.`);
    return { props: devFallback() };
  }
}
