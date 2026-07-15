"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import type { NarrativeContent } from "@/lib/types";

/**
 * NarrativeSection — a long-form editorial text block with an expand/collapse
 * "Discover More" control.
 *
 * REUSABLE: homepage uses it for "The Legacy of Architectural Surfaces";
 * About page uses it for "Our Story". Client component because it holds the
 * expanded/collapsed UI state.
 */
export default function NarrativeSection({
  eyebrow,
  title,
  lead,
  paragraphs,
  cta,
  watermark,
}: NarrativeContent) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      className="py-12 md:py-48 bg-[var(--color-bg)] relative overflow-hidden border-t border-white/5"
      aria-label={title.replace(/\n/g, " ")}
    >
      {watermark && (
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-display font-black text-white/[0.015] whitespace-nowrap pointer-events-none uppercase tracking-tighter select-none"
          aria-hidden="true"
        >
          {watermark}
        </div>
      )}

      <div className="max-w-content mx-auto px-[var(--section-px)] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-24 items-start">
          {/* Left — heading */}
          <div className="lg:col-span-5">
            <div className="space-y-12">
              <div className="group inline-flex items-center gap-6">
                <div className="w-12 h-px bg-white/20 group-hover:w-20 transition-all duration-500" />
                <span className="text-[10px] uppercase tracking-[0.5em] text-white/30">
                  {eyebrow}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-light text-white leading-[1.5] tracking-tighter uppercase whitespace-pre-line">
                {title}
              </h2>

              {cta && (
                <div className="pt-8 hidden lg:block">
                  <Button as="link" href={cta.href} variant="solid" size="lg">
                    {cta.label}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Right — body copy */}
          <div className="lg:col-span-7">
            <div className="relative space-y-10">
              <h3 className="text-2xl sm:text-3xl md:text-5xl leading-[0.9] font-display font-light text-white/90 leading-snug max-w-2xl">
                {lead}
              </h3>

              <div className="relative">
                <div
                  className="text-sm md:text-base text-white/40 font-light leading-relaxed space-y-8 overflow-hidden transition-all duration-1000 ease-in-out"
                  style={{ maxHeight: expanded ? "1000px" : "160px" }}
                >
                  {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div
                  className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/80 to-transparent z-10 transition-opacity duration-700 pointer-events-none"
                  style={{ opacity: expanded ? 0 : 1 }}
                  aria-hidden="true"
                />
              </div>

              <div className="flex items-center gap-12 pt-4">
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className="group flex items-center gap-6 text-[9px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all cursor-pointer"
                  aria-expanded={expanded}
                >
                  <span>{expanded ? "Show Less" : "Discover More"}</span>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 transition-all">
                    <ChevronDown
                      size={16}
                      className="transition-transform duration-700"
                      style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </div>
                </button>
              </div>

              {cta && (
                <div className="lg:hidden pt-8">
                  <Button
                    as="link"
                    href={cta.href}
                    variant="solid"
                    size="lg"
                    className="w-full text-center"
                  >
                    {cta.label}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
