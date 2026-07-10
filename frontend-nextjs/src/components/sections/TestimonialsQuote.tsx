import Image from "next/image";

interface ChairmanQuoteSectionProps {
  backgroundText?: string;
  heading?: string;
  quote: string;
  name: string;
  designation: string;
  image: string;
  imageAlt?: string;
}

export default function ChairmanQuoteSection({
  backgroundText = "VISIONARY",
  heading = "Chairman's Perspective",
  quote,
  name,
  designation,
  image,
  imageAlt = "Chairman",
}: ChairmanQuoteSectionProps) {
  return (
    <section className="py-16 md:py-24 lg:py-40 bg-[#0d0d0d] relative overflow-hidden">
      {/* Background Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[50vw] md:text-[30vw] font-display font-black text-white/[0.015] whitespace-nowrap pointer-events-none uppercase tracking-tighter select-none">
        {backgroundText}
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          {/* Avatar */}
          <div className="relative w-24 h-24 rounded-full overflow-hidden mb-8 md:mb-12 border border-white/20 transition-all duration-700 hover:scale-110">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>

          {/* Section Label */}
          <h4 className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-8">
            {heading}
          </h4>

          {/* Quote */}
          <p className="text-2xl md:text-4xl font-display font-light text-white leading-relaxed italic">
            "{quote}"
          </p>

          {/* Author */}
          <div className="mt-8 md:mt-12">
            <div className="text-sm uppercase tracking-widest text-white mb-2 font-display">
              {name}
            </div>

            <div className="text-[9px] uppercase tracking-[0.3em] text-white/30">
              {designation}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}