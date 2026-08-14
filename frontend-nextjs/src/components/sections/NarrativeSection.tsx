"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
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
      className="py-16 md:py-28 lg:py-36 bg-[var(--color-bg,#0a0a0a)] text-white relative overflow-hidden border-t border-white/10 select-none"
      aria-label={title.replace(/\n/g, " ")}
    >
      {/* Background Watermark */}
      {/* {watermark && (
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 text-[22vw] lg:text-[18vw] font-display font-black text-white/[0.015] leading-none whitespace-nowrap pointer-events-none uppercase tracking-tighter select-none z-0"
          aria-hidden="true"
        >
          {watermark}
        </div>
      )} */}

      {/* Grid Pattern Overlay (Matches reference design) */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column — Header & CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 lg:space-y-12">
            <div className="space-y-6">
              
              {/* Eyebrow Line */}
              <div className="group inline-flex items-center gap-4">
              <div className="w-8 sm:w-12 h-px bg-[rgba(214,167,101,0.7)] group-hover:w-16 transition-all duration-500" />
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.4em] text-[rgba(214,167,101,0.7)]">
                    {eyebrow}
                  </span>
              </div>

              {/* Display Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-white leading-[1.15] tracking-tight uppercase whitespace-pre-line">
                {title}
              </h2>
            </div>

            {/* Desktop Glass Button */}
            {cta && (
              <div className="hidden lg:block pt-4">
                <a
                  href={cta.href}
                  className="group relative inline-flex items-center justify-center gap-4 px-8 py-4 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-amber-500/40 text-xs font-mono uppercase tracking-[0.25em] text-white/90 hover:text-white transition-all duration-300 shadow-2xl hover:shadow-amber-500/5 active:scale-95"
                >
                  <span>{cta.label}</span>
                  <ArrowRight size={14} className="text-[rgba(214,167,101,0.7)] group-hover:translate-x-1.5 transition-transform duration-300" />
                </a>
              </div>
            )}
          </div>

          {/* Right Column — Body & Accordion Copy */}
          <div className="lg:col-span-7">
            <div className="relative space-y-8 bg-white/[0.015] backdrop-blur-md border border-white/5 rounded-2xl p-6 sm:p-10 shadow-2xl">
              
              {/* Lead Text */}
              {lead && (
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-light text-white/90 leading-relaxed font-display">
                  {lead}
                </h3>
              )}

              {/* Expandable Paragraph Copy */}
              <div className="relative">
                <div
                  className="text-sm sm:text-base text-white/50 font-light leading-relaxed space-y-6 overflow-hidden transition-all duration-700 ease-in-out"
                  style={{ maxHeight: expanded ? "1200px" : "140px" }}
                >
                  {paragraphs.map((p, i) => (
                    <p key={i} className="hover:text-white/70 transition-colors duration-300">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Fade-out Gradient Overlay */}
                <div
                  className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[var(--color-bg,#0a0a0a)] via-[var(--color-bg,#0a0a0a)]/70 to-transparent z-10 transition-opacity duration-500 pointer-events-none"
                  style={{ opacity: expanded ? 0 : 1 }}
                  aria-hidden="true"
                />
              </div>

              {/* Show More / Glass Toggle Control */}
                <div className="pt-2 flex items-center justify-end sm:justify-start">
                  <button
                    onClick={() => setExpanded((v) => !v)}
                    className="group inline-flex items-center gap-3 sm:gap-4 text-xs font-mono uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors cursor-pointer"
                    aria-expanded={expanded}
                  >
                    <span className="text-[10px] sm:text-xs">
                      {expanded ? "Show Less" : "Discover More"}
                    </span>

                    {/* Circular Arrow Container with Glass Effect */}
                    <div className="w-8 h-8 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:border-amber-500/40 group-hover:bg-white/10 transition-all">
                      <ChevronDown
                        size={14}
                        className="text-white/80 transition-transform duration-500"
                        style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    </div>
                  </button>
                </div>

                {/* Mobile / Tablet Full-Width Glass CTA Button */}
                {cta && (
                  <div className="lg:hidden pt-4 border-t border-white/10 mt-6">
                    <a
                      href={cta.href}
                      className="group w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] backdrop-blur-md border border-white/10 hover:border-amber-500/40 text-xs font-mono uppercase tracking-[0.25em] text-white transition-all duration-300 active:scale-95 shadow-xl"
                    >
                      <span>{cta.label}</span>
                      <ArrowRight size={14} className="text-amber-500 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
