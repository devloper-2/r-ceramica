import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";

export interface ExploreCategory {
  eyebrow: string;
  title: string;
  /** Optional second line of the heading. */
  titleLine2?: string;
  /** Render the second line italic + muted (as on the first band). */
  italicAccent?: boolean;
  description: string;
  image: string;
  alt: string;
  cta: { label: string; href: string; variant?: "arrow" | "button" };
}

/**
 * ExploreCategories — full-viewport, snap-scrolling category bands for the
 * /tiles ("Explore") page. Data-driven so the same layout serves every band.
 */
export default function ExploreCategories({
  items,
  ariaLabel,
}: {
  items: ExploreCategory[];
  ariaLabel: string;
}) {
  return (
    <div className="explore-scroll" aria-label={ariaLabel}>
      {items.map((item, i) => (
        <section
          key={item.title}
          className="explore-item relative overflow-hidden w-full h-screen border-t border-white/5 first:border-t-0"
        >
          <Image
            src={item.image}
            alt={item.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-24">
            <div className="max-w-[1720px] mx-auto w-full">
              <div className="max-w-2xl">
                <span className="text-[10px] md:text-[11px] uppercase tracking-[0.6em] text-[var(--color-gold)] mb-6 block font-medium">
                  {item.eyebrow}
                </span>
                <h2 className="text-4xl md:text-7xl lg:text-8xl font-display font-light uppercase tracking-tight leading-[1.1] md:leading-[1] mb-8">
                  {item.title}
                  {item.titleLine2 && (
                    <>
                      <br />
                      <span
                        className={
                          item.italicAccent ? "italic font-normal opacity-30" : ""
                        }
                      >
                        {item.titleLine2}
                      </span>
                    </>
                  )}
                </h2>
                <p className="text-white/40 text-[12px] md:text-[13px] uppercase tracking-[0.3em] mb-12 max-w-md leading-relaxed">
                  {item.description}
                </p>
                {item.cta.variant === "button" ? (
                  <Link
                    href={item.cta.href}
                    className="inline-block py-5 px-16 border border-white/10 hover:bg-white hover:text-black transition-all text-[12px] uppercase tracking-[0.5em] font-medium"
                  >
                    {item.cta.label}
                  </Link>
                ) : (
                  <Link href={item.cta.href} className="inline-flex items-center gap-6 group/link">
                    <span className="text-[11px] uppercase tracking-[0.5em] border-b border-white/20 pb-2 group-hover/link:border-white transition-all">
                      {item.cta.label}
                    </span>
                    {item.cta.variant === "arrow" ? (
                      <ArrowRight size={18} className="text-[var(--color-gold)] group-hover/link:translate-x-2 transition-transform" />
                    ) : (
                      <ChevronRight size={16} className="group-hover/link:translate-x-2 transition-transform" />
                    )}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
