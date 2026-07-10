import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import type { HeroContent } from "@/lib/types";

/**
 * Hero — the large banner at the top of a page.
 *
 * REUSABLE: every page passes its own content via props. The homepage uses a
 * full-height video hero; inner pages (About, etc.) use a shorter image hero.
 *
 * @example
 *   <Hero {...HOME_HERO} />           // data lives in lib/constants/home.ts
 *   <Hero {...ABOUT_HERO} />          // data lives in lib/constants/about.ts
 */
export default function Hero({
  eyebrow,
  title,
  description,
  mediaType,
  mediaSrc,
  mediaAlt,
  cta,
  fullHeight = true,
}: HeroContent) {
  return (
    <header
      className={`relative w-full flex items-center justify-center overflow-hidden bg-[#080808] pt-20 md:pt-24 ${
        fullHeight ? "h-screen" : "h-[70vh] min-h-[480px]"
      }`}
      aria-label={`Hero — ${title}`}
    >
      {/* ── Background media ── */}
      <div className="absolute inset-0 z-0">
        {mediaType === "video" ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-center opacity-80"
            aria-hidden="true"
          >
            <source src={mediaSrc} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={mediaSrc}
            alt={mediaAlt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-70"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* ── Overlay content ── */}
      <div className="relative z-10 max-w-content w-full mx-auto px-6 md:px-16 flex flex-col items-center text-center animate-fade-in-up">
        {eyebrow && <SectionLabel text={eyebrow} color="muted" className="mb-6 block" />}
        <h1 className="text-4xl md:text-7xl font-display tracking-[0.3em] font-light text-white uppercase drop-shadow-2xl">
          {title}
        </h1>
        <div className="mt-8 w-16 h-px bg-white/40 mx-auto mb-10" role="presentation" />
        {description && (
    <p className="max-w-2xl text-base md:text-lg text-white/80 leading-relaxed mb-10">
      {description}
    </p>
  )}
        {cta && (
            <Button
  as="link"
  href={cta.href}
  variant={cta.variant ?? "outline"}
>
  {cta.label}
</Button>
          )}
      </div>
    </header>
  );
}
