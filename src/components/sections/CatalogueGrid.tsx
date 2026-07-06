"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, Eye } from "lucide-react";

export interface CatalogueBook {
  title: string;
  titleLine2?: string;
  eyebrow: string;
  spine: string;
  pages: string;
  size: string;
  subtitle: string;
  image: string;
  /** Space-separated filter categories (e.g. "all tiles bathroom"). */
  categories: string;
  badge?: { label: string; accent?: boolean };
  status?: { label: string; color: string };
}

const FILTERS = [
  { id: "all", label: "All" },
  { id: "tiles", label: "Tiles" },
  { id: "bathroom", label: "Bathrooms" },
  { id: "kitchen", label: "Kitchen" },
  { id: "slabs", label: "Large Format" },
  { id: "outdoor", label: "Outdoor" },
  { id: "technical", label: "Technical" },
];

/**
 * CatalogueGrid — filterable grid of downloadable catalogue "books" for the
 * /catalogue page. Filtering is client-side over the book categories.
 */
export default function CatalogueGrid({ books }: { books: CatalogueBook[] }) {
  const [active, setActive] = useState("all");

  const visible =
    active === "all" ? books : books.filter((b) => b.categories.split(" ").includes(active));

  return (
    <>
      {/* Filter pills */}
      <section className="sticky top-[120px] md:top-[148px] z-40 bg-[var(--color-bg)]/95 backdrop-blur-xl border-b border-white/5 py-5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActive(f.id)}
                className={`shrink-0 px-5 py-2 border text-[9px] uppercase tracking-[0.3em] font-medium transition-all rounded-sm ${
                  active === f.id
                    ? "border-white/30 text-white bg-white/5"
                    : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <main className="py-20 md:py-28 bg-[var(--color-bg)]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="flex items-center justify-between mb-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
              Showing <span className="text-white">{visible.length}</span> Catalogues
            </p>
            <div className="w-24 h-px bg-white/5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1">
            {visible.map((book) => (
              <article
                key={book.title}
                className="cat-card group relative border border-white/5 hover:border-white/15 overflow-hidden"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-bg-card)]">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Spine */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center border-r ${
                      book.badge?.accent
                        ? "bg-[var(--color-gold)]/10 border-[var(--color-gold)]/20"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    <span
                      className={`book-spine text-[7px] uppercase tracking-[0.3em] font-medium ${
                        book.badge?.accent ? "text-[var(--color-gold)]/60" : "text-white/30"
                      }`}
                    >
                      {book.spine}
                    </span>
                  </div>

                  {book.badge && (
                    <div className="absolute top-6 right-6">
                      <span
                        className={`text-[7px] uppercase tracking-[0.3em] font-bold px-3 py-1.5 ${
                          book.badge.accent
                            ? "bg-[var(--color-gold)] text-black"
                            : "bg-white/10 backdrop-blur-md border border-white/10 text-white"
                        }`}
                      >
                        {book.badge.label}
                      </span>
                    </div>
                  )}

                  <div className="absolute top-6 left-14 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5">
                    <span className="text-[8px] uppercase tracking-[0.2em] text-white/60">{book.pages}</span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 pl-12">
                    <span className="text-[8px] uppercase tracking-[0.5em] text-[var(--color-gold)] block mb-3">
                      {book.eyebrow}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display font-light uppercase tracking-widest text-white mb-2 leading-tight">
                      {book.title}
                      {book.titleLine2 && (
                        <>
                          <br />
                          {book.titleLine2}
                        </>
                      )}
                    </h3>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/40 mb-6">{book.subtitle}</p>
                    <div className="flex items-center gap-3">
                      <a
                        href="#"
                        className="flex-1 flex items-center justify-center gap-2 bg-white text-black py-3.5 text-[8px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-200 transition-all"
                      >
                        <Download size={12} /> Download PDF
                      </a>
                      <a
                        href="#"
                        className="flex items-center justify-center w-12 h-12 border border-white/10 hover:border-white/40 text-white/60 hover:text-white transition-all"
                        aria-label="Preview"
                      >
                        <Eye size={14} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="px-8 pl-12 py-5 border-t border-white/5 flex items-center justify-between bg-[#0d0d0d]">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: book.status?.color ?? "#4ade80" }}
                    />
                    <span className="text-[8px] uppercase tracking-[0.2em] text-white/30">
                      {book.status?.label ?? "Available"}
                    </span>
                  </div>
                  <span className="text-[8px] uppercase tracking-[0.25em] text-white/20">{book.size}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
