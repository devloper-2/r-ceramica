import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Mouse } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ExploreSectionProps {
  eyebrow: string;
  title: string;
  italicLine?: string | null;
  description: string | string[];
  image: string;
  imageAlt?: string;

  imageOpacity?: number;
  bg?: string;
  overlayClass?: string;

  contentPosition?: "bottom" | "center";
  titleTracking?: "tight" | "wide";

  href: string;
  linkLabel?: string;

  linkVariant?: "chevron" | "arrow" | "gold-arrow" | "button";

  isH1?: boolean;

  index?: number;
  total?: number;
}

export default function ExploreSection({
  eyebrow,
  title,
  italicLine,
  description,
  image,
  imageAlt = "",

  imageOpacity = 45,
  bg = "#0c0c0c",

  overlayClass,

  contentPosition = "bottom",
  titleTracking = "wide",

  href,
  linkLabel = "Explore Models",
  linkVariant = "chevron",

  isH1 = false,

  index = 0,
  total = 1,
}: ExploreSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);

  /*
   * Detect when this collection enters the viewport.
   */
  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.25,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const lines = title.split("\n");

  const descArr = Array.isArray(description) ? description : [description];

  const TitleTag = isH1 ? "h1" : "h2";

  const number = String(index + 1).padStart(2, "0");

  const totalNumber = String(total).padStart(2, "0");

  const titleTrackingClass =
    titleTracking === "tight" ? "tracking-[-0.045em]" : "tracking-[0.035em]";

  /*
   * Default overlay if CMS/static data doesn't provide one.
   */
  const finalOverlay =
    overlayClass || "bg-gradient-to-b from-black/10 via-black/10 to-black/80";

  return (
    <section
      ref={sectionRef}
      className="explore-section group relative isolate h-[100svh] min-h-[640px] w-full snap-start overflow-hidden border-t border-white/[0.06] bg-black"
      style={{
        backgroundColor: bg,
      }}
    >
      {/* =========================================================
          BACKGROUND IMAGE
      ========================================================= */}

      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={image}
          alt={imageAlt || title}
          fill
          priority={isH1}
          sizes="100vw"
          className={[
            "object-cover",
            "object-center",
            "will-change-transform",
            "transition-all",
            "duration-[1800ms]",
            "ease-[cubic-bezier(0.22,1,0.36,1)]",
            isVisible
              ? "scale-100 opacity-100 blur-0"
              : "scale-[1.12] opacity-0 blur-[4px]",
            "group-hover:scale-[1.045]",
          ].join(" ")}
          style={{
            opacity: isVisible ? imageOpacity / 100 : 0,
          }}
        />
      </div>

      {/* =========================================================
          MAIN OVERLAY
      ========================================================= */}

      <div className={`pointer-events-none absolute inset-0 ${finalOverlay}`} />

      {/* =========================================================
          LEFT CINEMATIC SHADOW
      ========================================================= */}

      <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/55 via-black/20 to-transparent md:w-[70%]" />

      {/* =========================================================
          BOTTOM CINEMATIC SHADOW
      ========================================================= */}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

      {/* =========================================================
          SOFT LIGHT
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(255,255,255,0.07),transparent_35%)]" />

      {/* =========================================================
          VIGNETTE
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.3)_100%)]" />

      {/* =========================================================
          TOP BAR
      ========================================================= */}

      <div className="absolute left-0 right-0 top-0 z-30 px-5 pt-6 sm:px-7 sm:pt-7 md:px-10 md:pt-9 lg:px-16">
        <div className="flex items-center justify-between">
          {/* Number */}
          <div
            className={[
              "flex items-center gap-3",
              "transition-all duration-1000 ease-out",
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-6 opacity-0",
            ].join(" ")}
          >
            <span
              className={[
                "block h-px bg-[#c5a059]",
                "transition-all duration-1000",
                isVisible ? "w-10 sm:w-14" : "w-0",
              ].join(" ")}
            />
          </div>
        </div>
      </div>

      {/* =========================================================
          HUGE EDITORIAL NUMBER
      ========================================================= */}

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none",
          "absolute right-[-4vw] top-[34%] z-10",
          "select-none",
          "font-display font-light leading-none",
          "text-[42vw] tracking-[-0.1em]",
          "text-white/[0.035]",
          "transition-all duration-[1600ms]",
          "ease-[cubic-bezier(0.22,1,0.36,1)]",
          "sm:text-[35vw]",
          "md:text-[30vw]",
          isVisible
            ? "translate-x-0 opacity-100"
            : "translate-x-[10%] opacity-0",
        ].join(" ")}
      >
        {number}
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <div
        className={[
          "absolute inset-0 z-20 flex flex-col",
          contentPosition === "center"
            ? "justify-end md:justify-center"
            : "justify-end",
          "px-5 pb-16",
          "sm:px-7 sm:pb-20",
          "md:px-10 md:pb-20",
          "lg:px-16 lg:pb-24",
        ].join(" ")}
      >
        <div className="mx-auto w-full max-w-[1720px]">
          <div
            className={
              contentPosition === "center" ? "w-full max-w-5xl" : "max-w-4xl"
            }
          >
            {/* =====================================================
                EYEBROW
            ===================================================== */}

            <div
              className={[
                "mb-4 flex items-center gap-3 sm:mb-5",
                "transition-all duration-1000 ease-out",
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0",
              ].join(" ")}
            >
              <span className="h-px w-7 bg-[#c5a059] sm:w-9" />

              <span className="text-[8px] font-medium uppercase tracking-[0.45em] text-[#c5a059] sm:text-[10px] sm:tracking-[0.5em]">
                {eyebrow}
              </span>
            </div>

            {/* =====================================================
                TITLE
            ===================================================== */}

            <TitleTag
              className={[
                "m-0 max-w-5xl",
                "font-display font-light uppercase",
                "text-[clamp(2.8rem,10vw,9rem)]",
                "leading-[0.88] text-white",
                titleTrackingClass,
              ].join(" ")}
            >
              {lines.map((line, i) => (
                <span key={`${line}-${i}`} className="block overflow-hidden">
                  <span
                    className={[
                      "block will-change-transform",
                      "transition-all duration-[1100ms]",
                      "ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isVisible
                        ? "translate-y-0 opacity-100 blur-0"
                        : "translate-y-[115%] opacity-0 blur-[7px]",
                    ].join(" ")}
                    style={{
                      transitionDelay: `${180 + i * 120}ms`,
                    }}
                  >
                    {line}
                  </span>
                </span>
              ))}

              {/* ===================================================
                  ITALIC LINE
              =================================================== */}

              {italicLine && (
                <span className="mt-2 block overflow-hidden sm:mt-3">
                  <span
                    className={[
                      "block font-serif",
                      "text-[0.42em]",
                      "font-normal italic normal-case",
                      "leading-tight tracking-normal",
                      "text-white/55",
                      "transition-all duration-[1200ms]",
                      "ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-[110%] opacity-0",
                    ].join(" ")}
                    style={{
                      transitionDelay: `${220 + lines.length * 120}ms`,
                    }}
                  >
                    {italicLine}
                  </span>
                </span>
              )}
            </TitleTag>

            {/* =====================================================
                DESCRIPTION
            ===================================================== */}

            <div
              className={[
                "mt-6 sm:mt-7 md:mt-8",
                "transition-all duration-1000 ease-out",
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-7 opacity-0",
              ].join(" ")}
              style={{
                transitionDelay: "520ms",
              }}
            >
              {descArr.length === 1 ? (
                <p className="max-w-xl text-[9px] font-light uppercase leading-6 tracking-[0.25em] text-white/50 sm:text-[11px] sm:leading-7 md:text-[12px]">
                  {descArr[0]}
                </p>
              ) : (
                <div className="space-y-1">
                  {descArr.map((line, i) => (
                    <p
                      key={i}
                      className="text-[9px] font-light uppercase leading-5 tracking-[0.25em] text-white/50 sm:text-[11px] md:text-[12px]"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* =====================================================
                CTA
            ===================================================== */}

            <div
              className={[
                "mt-7 sm:mt-8 md:mt-9",
                "transition-all duration-1000 ease-out",
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-7 opacity-0",
              ].join(" ")}
              style={{
                transitionDelay: "700ms",
              }}
            >
              {/* =================================================
                  BUTTON
              ================================================= */}

              {linkVariant === "button" && (
                <Link
                  href={href}
                  className="group/link inline-flex items-center gap-5 border border-white/20 bg-black/20 px-5 py-4 backdrop-blur-md transition-all duration-500 hover:border-white hover:bg-white hover:text-black sm:px-7 sm:py-5 md:px-9"
                >
                  <span className="text-[9px] font-medium uppercase tracking-[0.4em] sm:text-[10px]">
                    {linkLabel}
                  </span>

                  <ArrowRight
                    size={15}
                    strokeWidth={1.5}
                    className="transition-transform duration-500 group-hover/link:translate-x-1.5"
                  />
                </Link>
              )}

              {/* =================================================
                  GOLD ARROW
              ================================================= */}

              {linkVariant === "gold-arrow" && (
                <Link
                  href={href}
                  className="group/link inline-flex items-center gap-5 sm:gap-7"
                >
                  <span className="relative pb-3 text-[9px] uppercase tracking-[0.45em] text-white sm:text-[10px] md:text-[11px]">
                    {linkLabel}

                    <span className="absolute bottom-0 left-0 h-px w-full origin-left bg-[#c5a059] transition-transform duration-500 group-hover/link:scale-x-50" />
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c5a059]/50 text-[#c5a059] transition-all duration-500 group-hover/link:translate-x-2 group-hover/link:bg-[#c5a059] group-hover/link:text-black sm:h-10 sm:w-10">
                    <ArrowRight size={14} strokeWidth={1.5} />
                  </span>
                </Link>
              )}

              {/* =================================================
                  NORMAL ARROW
              ================================================= */}

              {linkVariant === "arrow" && (
                <Link
                  href={href}
                  className="group/link inline-flex items-center gap-5 sm:gap-6"
                >
                  <span className="relative pb-2 text-[9px] uppercase tracking-[0.45em] text-white sm:text-[10px] md:text-[11px]">
                    {linkLabel}

                    <span className="absolute bottom-0 left-0 h-px w-full bg-white/25 transition-all duration-500 group-hover/link:bg-white" />
                  </span>

                  <ArrowRight
                    size={16}
                    strokeWidth={1.4}
                    className="transition-transform duration-500 group-hover/link:translate-x-2"
                  />
                </Link>
              )}

              {/* =================================================
                  CHEVRON
              ================================================= */}

              {linkVariant === "chevron" && (
                <Link
                  href={href}
                  className="group/link inline-flex items-center gap-4 border-b border-white/20 pb-3 text-[9px] font-medium uppercase tracking-[0.45em] text-white/65 transition-all duration-500 hover:border-white hover:text-white sm:text-[10px] md:text-[11px]"
                >
                  {linkLabel}

                  <ChevronRight
                    size={14}
                    strokeWidth={1.5}
                    className="transition-transform duration-500 group-hover/link:translate-x-1"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          SCROLL INDICATOR
      ========================================================= */}

      <div
        className={[
          "absolute bottom-7 left-1/2 z-30 hidden",
          "-translate-x-1/2 flex-col items-center gap-2",
          "transition-opacity duration-1000 md:flex",
          isVisible ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        <Mouse size={16} strokeWidth={1} className="text-white/35" />

        <div className="relative h-8 w-px overflow-hidden bg-white/15">
          <span className="absolute left-0 top-0 h-3 w-px animate-[exploreScroll_2s_ease-in-out_infinite] bg-[#c5a059]" />
        </div>
      </div>

      {/* =========================================================
          SIDE DECORATION
      ========================================================= */}

      <div className="pointer-events-none absolute bottom-10 right-6 z-30 hidden h-px w-20 bg-white/15 lg:block" />

      {/* =========================================================
          ANIMATION
      ========================================================= */}

      <style jsx>{`
        @keyframes exploreScroll {
          0% {
            transform: translateY(-120%);
          }

          50% {
            transform: translateY(180%);
          }

          100% {
            transform: translateY(180%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .explore-section *,
          .explore-section *::before,
          .explore-section *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
