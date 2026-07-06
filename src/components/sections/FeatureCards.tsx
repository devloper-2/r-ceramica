import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { FeatureCard } from "@/lib/types";

interface FeatureCardsProps {
  items: FeatureCard[];
  /** Describes the section for screen readers. */
  ariaLabel: string;
}

/**
 * FeatureCards — a responsive row of icon + title + description + link cards.
 *
 * REUSABLE: homepage uses it for "Business Support"; About page uses it for
 * "Our Capabilities". Icons are lucide-react components passed in the data
 * (see lib/constants/*), so this file never hardcodes any content.
 */
export default function FeatureCards({ items, ariaLabel }: FeatureCardsProps) {
  return (
    <section
      className="py-24 md:py-32 bg-[var(--color-bg)] border-t border-white/5"
      aria-label={ariaLabel}
    >
      <div className="max-w-content mx-auto px-[var(--section-px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {items.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className={`group flex flex-col items-center text-center p-8 rounded-sm transition-all duration-500 ${
                  card.inverted
                    ? "bg-white text-black"
                    : "border border-white/5 hover:border-white/20"
                }`}
              >
                <div
                  className={`w-16 h-16 mb-8 flex items-center justify-center transition-colors duration-500 ${
                    card.inverted
                      ? "text-black/40 group-hover:text-black"
                      : "text-white/40 group-hover:text-white"
                  }`}
                >
                  <Icon size={40} strokeWidth={0.75} aria-hidden="true" />
                </div>
                <h3
                  className={`text-xl md:text-2xl font-display font-light mb-4 uppercase tracking-wider whitespace-pre-line ${
                    card.inverted ? "text-black" : "text-white"
                  }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`text-[10px] mb-8 uppercase tracking-[0.2em] leading-relaxed max-w-[200px] ${
                    card.inverted ? "text-black/40" : "text-white/40"
                  }`}
                >
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className={`text-[9px] uppercase tracking-[0.3em] flex items-center gap-2 transition-colors ${
                    card.inverted
                      ? "font-bold text-black border-b border-black/20 hover:border-black"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {card.linkLabel}
                  {!card.inverted && <ArrowRight size={12} aria-hidden="true" />}
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
