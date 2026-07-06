import Head from "next/head";
import Link from "next/link";

/**
 * 500.tsx — custom server-error screen (Pages Router convention).
 * Replaces the App Router error.tsx.
 */
export default function ServerError() {
  return (
    <section
      className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center"
      aria-label="Server error"
    >
      <Head>
        <title>Something Went Wrong | R Ceramica</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <p className="font-display text-sm uppercase tracking-[0.2em] text-[var(--color-gold)]">
        Error
      </p>
      <h1 className="font-display text-4xl font-light md:text-6xl">
        Something went wrong
      </h1>
      <p className="max-w-md text-white/60">
        An unexpected error occurred on our side. Please try again, or contact us
        if the problem persists.
      </p>
      <Link
        href="/"
        className="mt-2 border border-white/20 px-8 py-3 text-sm uppercase tracking-widest transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
      >
        Return Home
      </Link>
    </section>
  );
}
