import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import ArrowLink from "@/components/ui/ArrowLink";
import type { SpaceCard } from "@/lib/types";

interface MediaGridProps {
  items: SpaceCard[];
  /** Describes the section for screen readers, e.g. "Architectural Spaces". */
  ariaLabel: string;
  /** Link text shown on each card. */
  ctaLabel?: string;
}

/**
 * MediaGrid — a full-bleed grid of image cards with a label, title and link.
 *
 * REUSABLE: the homepage uses it for "Architectural Spaces"; the About page
 * uses the very same component for "Our Values". Only the `items` differ.
 */
export default function MediaGrid({
  items,
  ariaLabel,
  ctaLabel = "View Collection",
}: MediaGridProps) {
  return (
    <section aria-label={ariaLabel} className="w-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 bg-[var(--color-bg)]">
        {items.map((card) => (
          <div
            key={card.title}
            className="md:col-span-6 group relative overflow-hidden bg-[var(--color-bg)] min-h-[500px] md:min-h-[70vh]"
          >
            <Image
              src={card.imageSrc}
              alt={card.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-40 transition-transform duration-[2000ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700 flex flex-col justify-end p-12">
              <SectionLabel text={card.label} color="gold" className="mb-4 block" />
              <h2 className="text-3xl md:text-4xl font-display font-light uppercase tracking-widest mb-6 whitespace-pre-line">
                {card.title}
              </h2>
              <ArrowLink href={card.href} label={ctaLabel} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
