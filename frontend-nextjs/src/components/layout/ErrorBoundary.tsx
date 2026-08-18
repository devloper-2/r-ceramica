import { Component, type ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";

/**
 * ErrorBoundary — catches render/lifecycle errors in the page tree.
 *
 * Without one, any uncaught client error blanks the whole document and shows
 * Next's raw "Application error: a client-side exception has occurred", which
 * tells a customer nothing and loses the navigation. With it, the chrome stays
 * put and the visitor gets the same wording as the 500 page plus a way out.
 *
 * The real error is still logged to the console (and re-thrown by React in
 * development) so it stays debuggable.
 */
export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    console.error("[ErrorBoundary] page render failed:", error);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <section
        className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center"
        aria-label="Page error"
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
          This page could not be displayed. Please try again, or contact us if
          the problem persists.
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
}
