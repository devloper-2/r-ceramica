export default function GlobalLoading() {
  return (
    <div
      className="flex min-h-[70vh] items-center justify-center"
      aria-label="Loading"
      role="status"
    >
      <span className="sr-only">Loading…</span>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[var(--color-gold)]" />
    </div>
  );
}
