import Image from "next/image";
import Link from "next/link";

interface FootprintProps {
  eyebrow: string;
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
  image: string;
  imageAlt?: string;
}

export default function Footprint({
  eyebrow,
  title,
  description,
  cta,
  image,
  imageAlt = "Global Footprint",
}: FootprintProps) {
  return (
    <section className="py-12 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-24 items-center">
        
        {/* Left Content */}
        <div className="lg:col-span-4 space-y-6 md:space-y-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-px bg-white/30" />

            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">
              {eyebrow}
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-display font-light text-white uppercase tracking-tight whitespace-pre-line">
            {title}
          </h2>

          <p className="text-sm text-white/40 font-light leading-relaxed uppercase tracking-widest">
            {description}
          </p>

          <div className="pt-4 md:pt-6">
            <Link
              href={cta.href}
              className="inline-flex items-center gap-6 group text-[10px] uppercase tracking-[0.3em] text-white/60 hover:text-white transition-all"
            >
              {cta.label}

              <div className="w-12 h-px bg-white/20 group-hover:w-20 transition-all duration-500" />
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:col-span-8">
          <div className="relative aspect-video rounded-sm overflow-hidden border border-white/10 group shadow-2xl">

            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2s]"
            />

            <div className="absolute inset-0 bg-[#111]/40 group-hover:bg-transparent transition-all" />

            {/* Strategic Nodes */}
            <div className="absolute top-1/4 left-[30%] w-2 h-2 bg-blue-500 rounded-full animate-ping" />

            <div className="absolute top-1/2 left-[55%] w-2 h-2 bg-amber-500 rounded-full animate-pulse" />

            <div className="absolute top-[40%] left-[65%] w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}