import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section
      className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center"
      aria-label="Page not found"
    >
      <p className="font-display text-sm uppercase tracking-[0.2em] text-[var(--color-gold)]">
        404
      </p>
      <h1 className="font-display text-4xl font-light md:text-6xl">
        Page Not Found
      </h1>
      <p className="max-w-md text-white/60">
        The page you are looking for may have been moved, renamed, or no longer
        exists.
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
