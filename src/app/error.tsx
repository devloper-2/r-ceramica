"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to an error reporting service in production
    console.error(error);
  }, [error]);

  return (
    <section
      className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center"
      aria-label="An error occurred"
    >
      <p className="font-display text-sm uppercase tracking-[0.2em] text-[var(--color-gold)]">
        Error
      </p>
      <h1 className="font-display text-4xl font-light md:text-6xl">
        Something went wrong
      </h1>
      <p className="max-w-md text-white/60">
        An unexpected error occurred. Please try again, or contact us if the
        problem persists.
      </p>
      <button
        onClick={reset}
        className="mt-2 border border-white/20 px-8 py-3 text-sm uppercase tracking-widest transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
      >
        Try Again
      </button>
    </section>
  );
}
