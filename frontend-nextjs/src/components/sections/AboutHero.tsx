import Image from "next/image";

interface AboutHeroProps {
  imageSrc: string;
  imageAlt: string;
  eyebrow?: string;
  titleLine1: string;
  titleLine2: string;
}

export default function AboutHero({
  imageSrc,
  imageAlt,
  eyebrow = "Since 1994",
  titleLine1,
  titleLine2,
}: AboutHeroProps) {
  return (
    <header className="about-hero relative min-h-screen md:min-h-[100vh] flex items-center justify-center pt-20 md:pt-24 pb-20 overflow-hidden group/hero">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60 transition-all duration-[2s] group-hover/hero:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111]/90 via-[#111]/20 to-[#111] group-hover/hero:via-transparent transition-all duration-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] px-6 text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-4 mb-8 about-hero__blur-in">
          <div className="w-12 h-px bg-white/20" />
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/40">
            {eyebrow}
          </span>
          <div className="w-12 h-px bg-white/20" />
        </div>

        {/* Title */}
        <h1 className="about-hero__blur-in text-4xl md:text-8xl font-display font-light text-white uppercase tracking-[-0.02em] leading-tight">
          {titleLine1}
          <br />
          <span className="about-hero__outline-text">{titleLine2}</span>
        </h1>
      </div>
    </header>
  );
}
