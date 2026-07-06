"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";

const SEO_PARAGRAPHS = [
  "R Ceramica — an exclusive porcelain and ceramic brand, has established its presence through decades of innovation, merging traditional craftsmanship with cutting-edge nanotechnology production. Our manufacturing units in key industrial hubs are equipped with first-for-industry thermal efficiency systems, ensuring every slab meets the highest architectural standards.",
  "With a curated network of over 200+ exclusive studios across international markets, we bring a sensory-driven approach to architectural surfaces. Our commitment to sustainability isn't just a corporate statement; it's embedded in our supply chain, from raw material extraction to the final tactile finish of our large-format porcelain slabs.",
  "Whether you are designing a high-traffic commercial space or a minimalist private residence, R Ceramica provides the technical data and aesthetic versatility required to transcend the limits of traditional design. Our portfolio spans the world's most prestigious projects, reflecting our status as a cornerstone of modern architectural surface engineering.",
];

export default function LegacySection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      className="py-32 md:py-48 bg-[var(--color-bg)] relative overflow-hidden border-t border-white/5"
      aria-label="R Ceramica heritage and legacy"
    >
      {/* Background watermark */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-display font-black text-white/[0.015] whitespace-nowrap pointer-events-none uppercase tracking-tighter select-none"
        aria-hidden="true"
      >
        Excellence Through Innovation
      </div>

      <div className="max-w-content mx-auto px-[var(--section-px)] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
          {/* Left */}
          <div className="lg:col-span-5">
            <div className="space-y-12">
              <div className="group inline-flex items-center gap-6">
                <div className="w-12 h-px bg-white/20 group-hover:w-20 transition-all duration-500" />
                <span className="text-[10px] uppercase tracking-[0.5em] text-white/30">
                  Insight & Heritage
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl font-display font-light text-white leading-[0.95] tracking-tighter uppercase">
                The Legacy of <br />
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
                >
                  Architectural
                </span>{" "}
                <br />
                Surfaces
              </h2>

              <div className="pt-8 hidden lg:block">
                <Button as="link" href="/contact" variant="solid" size="lg">
                  Enquire Now
                </Button>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-7">
            <div className="relative space-y-10">
              <h3 className="text-2xl md:text-3xl font-display font-light text-white/90 leading-snug max-w-2xl">
                Merging traditional craftsmanship with state-of-the-art
                nanotechnology to redefine modern porcelain engineering.
              </h3>

              <div className="relative">
                <div
                  className="text-sm md:text-base text-white/40 font-light leading-relaxed space-y-8 overflow-hidden transition-all duration-1000 ease-in-out"
                  style={{ maxHeight: expanded ? "1000px" : "160px" }}
                >
                  {SEO_PARAGRAPHS.map((p, i) => (
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

              <div className="lg:hidden pt-8">
                <Button as="link" href="/contact" variant="solid" size="lg" className="w-full text-center">
                  Enquire Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
