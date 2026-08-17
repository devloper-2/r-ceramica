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
