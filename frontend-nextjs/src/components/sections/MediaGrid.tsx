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
 * MediaGrid
 *
 * Premium editorial image grid for R Ceramica.
 *
 * Desktop:
 * - First item = primary / dominant card
 * - Second item = secondary card
 *
 * Mobile:
 * - Cards stack vertically
 */
export default function MediaGrid({
  items,
  ariaLabel,
  ctaLabel = "View Collection",
}: MediaGridProps) {
  return (
    <section
      aria-label={ariaLabel}
      className="w-full overflow-hidden bg-[var(--color-bg)]"
    >
      <div className="flex flex-col md:flex-row min-h-[720px] lg:min-h-[780px]">
        {items.map((card, index) => {
          const isPrimary = index === 0;

          return (
            <article
              key={card.title}
              className={`
                group relative overflow-hidden
                border-white/10
                ${
                  isPrimary
                    ? "md:w-[64%] md:border-r"
                    : "md:w-[36%]"
                }
                min-h-[620px]
                md:min-h-[720px]
                lg:min-h-[780px]
                transition-[width] duration-1000 ease-[cubic-bezier(.22,1,.36,1)]
              `}
            >
              {/* Image */}
              <Image
                src={card.imageSrc}
                alt={card.imageAlt}
                fill
                priority={index === 0}
                sizes={
                  isPrimary
                    ? "(max-width: 768px) 100vw, 64vw"
                    : "(max-width: 768px) 100vw, 36vw"
                }
                className="
                  object-cover
                  scale-[1.02]
                  brightness-[0.72]
                  transition-all
                  duration-[1800ms]
                  ease-[cubic-bezier(.22,1,.36,1)]
                  group-hover:scale-[1.08]
                  group-hover:brightness-[0.88]
                "
              />

              {/* Base cinematic overlay */}
              <div
                className="
                  absolute inset-0
                  bg-black/20
                  transition-opacity duration-1000
                  group-hover:bg-black/5
                "
              />

              {/* Bottom cinematic gradient */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/85
                  via-black/25
                  to-transparent
                  opacity-90
                  transition-opacity duration-1000
                  group-hover:opacity-75
                "
              />

              {/* Top subtle vignette */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-b
                  from-black/30
                  via-transparent
                  to-transparent
                  opacity-60
                "
              />

              {/* Card number */}
              <div
                className="
                  absolute
                  top-8
                  left-8
                  md:top-10
                  md:left-10
                  flex
                  items-center
                  gap-3
                  text-white/70
                "
              >
                <span className="text-[10px] tracking-[0.35em] font-medium">
                  0{index + 1}
                </span>

                <span className="h-px w-8 bg-white/30" />
              </div>

              {/* Content */}
              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  z-10
                  p-8
                  md:p-10
                  lg:p-14
                  xl:p-16
                "
              >
                <div
                  className="
                    max-w-2xl
                    translate-y-3
                    transition-transform
                    duration-1000
                    ease-[cubic-bezier(.22,1,.36,1)]
                    group-hover:translate-y-0
                  "
                >
                  {/* Label */}
                  <SectionLabel
                    text={card.label}
                    color="gold"
                    className="mb-5 block"
                  />

                  {/* Title */}
                  <h2
                    className={`
                      font-display
                      font-light
                      uppercase
                      text-white
                      leading-[0.95]
                      tracking-[0.08em]
                      whitespace-pre-line
                      ${
                        isPrimary
                          ? "text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                          : "text-3xl md:text-4xl lg:text-5xl"
                      }
                    `}
                  >
                    {card.title}
                  </h2>

                  {/* CTA */}
                  <div
                    className="
                      mt-7
                      opacity-80
                      translate-y-2
                      transition-all
                      duration-700
                      group-hover:opacity-100
                      group-hover:translate-y-0
                    "
                  >
                    <ArrowLink
                      href={card.href}
                      label={ctaLabel}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  h-[2px]
                  w-0
                  bg-[var(--color-gold)]
                  transition-all
                  duration-[1200ms]
                  ease-[cubic-bezier(.22,1,.36,1)]
                  group-hover:w-full
                "
              />

              {/* Corner detail */}
              <div
                className="
                  absolute
                  right-8
                  top-8
                  md:right-10
                  md:top-10
                  h-8
                  w-8
                  border-r
                  border-t
                  border-white/20
                  opacity-0
                  translate-x-2
                  -translate-y-2
                  transition-all
                  duration-700
                  group-hover:opacity-100
                  group-hover:translate-x-0
                  group-hover:translate-y-0
                "
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}