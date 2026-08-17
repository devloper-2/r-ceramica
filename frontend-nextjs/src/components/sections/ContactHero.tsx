import Image from "next/image";

interface ContactHeroProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  mediaSrc?: string;
  mediaAlt?: string;
}

export default function ContactHero({
  eyebrow = "Connectivity",
  title = "Get In Touch",
  description = "Experience architectural excellence first hand. Our consultants are ready to assist your vision.",
  mediaSrc = "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80",
  mediaAlt = "Contact Us Background",
}: ContactHeroProps) {
  return (
    <header className="contact-hero relative min-h-screen md:min-h-[100vh] w-full flex items-center justify-center overflow-hidden bg-black pt-20 md:pt-24 group/hero">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={mediaSrc}
          alt={mediaAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50 transition-all duration-[2s] group-hover/hero:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a0a0a] group-hover/hero:from-black/20 transition-all duration-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center contact-hero__fade-in px-6">
        {/* Badge */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-12 h-px bg-white/20" />
          <span className="text-[9px] uppercase tracking-[0.5em] text-white/50">
            {eyebrow}
          </span>
          <div className="w-12 h-px bg-white/20" />
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-8xl font-display tracking-[0.1em] font-light text-white uppercase mb-6">
          {title}
        </h1>

        {/* Description */}
        <p className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-white/40 max-w-lg mx-auto leading-relaxed">
          {description}
        </p>
      </div>
    </header>
  );
}
