import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

interface ExploreSectionProps {
  eyebrow: string;
  title: string;
  italicLine?: string;
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
}

export default function ExploreSection({
  eyebrow,
  title,
  italicLine,
  description,
  image,
  imageAlt = "",
  imageOpacity = 40,
  bg = "#0c0c0c",
  overlayClass = "bg-black/30 group-hover:bg-black/10 transition-all",
  contentPosition = "bottom",
  titleTracking = "wide",
  href,
  linkLabel = "Explore Models",
  linkVariant = "chevron",
  isH1 = false,
}: ExploreSectionProps) {
  const contentJustify =
    contentPosition === "center"
      ? "justify-end md:justify-center"
      : "justify-end";

  const titleClass = `text-4xl md:text-7xl lg:text-8xl font-display font-light uppercase leading-[1.1] md:leading-[1] mb-8 ${
    titleTracking === "tight" ? "tracking-tight" : "tracking-widest"
  }`;

  const lines = title.split("\n");
  const TitleTag = isH1 ? "h1" : "h2";

  const descArr = Array.isArray(description) ? description : [description];

  return (
    <section
      className="relative group overflow-hidden h-screen w-full snap-start border-t border-white/5"
      style={{ backgroundColor: bg }}
    >
      {/* Background image */}
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority={isH1}
        sizes="100vw"
        className="object-cover object-center transition-transform duration-[4000ms] group-hover:scale-[1.08] explore-img"
        style={{ opacity: imageOpacity / 100 }}
      />

      {/* Gradient overlay */}
      <div className={`absolute inset-0 ${overlayClass}`} />

      {/* Content */}
      <div
        className={`absolute inset-0 flex flex-col ${contentJustify} p-8 md:p-24`}
      >
        <div className="max-w-[1720px] mx-auto w-full">
          <div className={contentPosition === "center" ? "w-full md:w-auto" : "max-w-2xl"}>
            {/* Eyebrow */}
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.6em] text-[#c5a059] mb-6 block font-medium opacity-80">
              {eyebrow}
            </span>

            {/* Title */}
            <TitleTag className={titleClass}>
              {lines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < lines.length - 1 && <br />}
                </span>
              ))}
              {italicLine && (
                <>
                  <br />
                  <span className="italic font-normal opacity-30">
                    {italicLine}
                  </span>
                </>
              )}
            </TitleTag>

            {/* Description */}
            {descArr.length === 1 ? (
              <p className="text-white/40 text-[12px] md:text-[13px] uppercase tracking-[0.3em] mb-12 max-w-md leading-relaxed">
                {descArr[0]}
              </p>
            ) : (
              <div className="mb-12">
                {descArr.map((line, i) => (
                  <p key={i} className="text-[14px] text-white/50 font-light tracking-[0.3em] uppercase">
                    {line}
                  </p>
                ))}
              </div>
            )}

            {/* Link */}
            {linkVariant === "button" ? (
              <Link
                href={href}
                className="inline-block py-5 px-4 md:px-8 lg:px-16 border border-white/10 hover:bg-white hover:text-black transition-all text-[12px] uppercase tracking-[0.5em] font-medium"
              >
                {linkLabel}
              </Link>
            ) : linkVariant === "gold-arrow" ? (
              <Link
                href={href}
                className="inline-flex items-center gap-8 group/link"
              >
                <span className="text-[12px] uppercase tracking-[0.6em] border-b border-white/20 pb-3 group-hover/link:border-[#c5a059] transition-all">
                  {linkLabel}
                </span>
                <ArrowRight
                  size={20}
                  className="group-hover/link:translate-x-3 transition-transform text-[#c5a059]"
                />
              </Link>
            ) : linkVariant === "arrow" ? (
              <Link
                href={href}
                className="inline-flex items-center gap-6 group/link"
              >
                <span className="text-[11px] uppercase tracking-[0.5em] border-b border-white/20 pb-2 group-hover/link:border-white transition-all">
                  {linkLabel}
                </span>
                <ArrowRight
                  size={18}
                  className="group-hover/link:translate-x-2 transition-transform"
                />
              </Link>
            ) : (
              <Link
                href={href}
                className="inline-flex items-center gap-6 text-[11px] uppercase tracking-[0.5em] text-white/60 hover:text-white transition-all font-medium border-b border-white/10 pb-2 hover:border-white"
              >
                {linkLabel}
                <ChevronRight size={16} className="mt-0.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
