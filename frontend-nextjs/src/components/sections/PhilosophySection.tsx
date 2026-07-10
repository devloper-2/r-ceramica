import Image from "next/image";

interface PhilosophySectionProps {
  title: string;
  highlight: string;
  intro: string;
  description: string;
  image: string;
  imageAlt?: string;
  badgeTitle?: string;
  badgeText?: string;
}

export default function PhilosophySection({
  title,
  highlight,
  intro,
  description,
  image,
  imageAlt = "Philosophy",
  badgeTitle = "Technical Analysis",
  badgeText = "0.05% Water Absorption Certified",
}: PhilosophySectionProps) {
  return (
    <section className="py-16 md:py-24 lg:py-40 bg-[#111]">
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 md:p-10 md:gap-16 lg:gap-20 items-center">

        {/* Content */}
        <div className="space-y-8 md:space-y-12">
          <h2 className="text-3xl md:text-5xl font-display font-light text-white leading-tight uppercase">
            {title}
             <span className="italic text-white/40 font-display font-light">
    {highlight}
  </span>
          </h2>

          <div className="space-y-8 text-white/40 font-light leading-relaxed max-w-xl">
            <p className="text-base md:text-lg">
              {intro}
            </p>

            <p>
              {description}
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="relative group aspect-[4/5] rounded-sm overflow-hidden border border-white/5">

          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />

          {/* Floating Card */}
          <div className="absolute bottom-8 right-8 p-8 bg-black/60 backdrop-blur-xl border border-blue-500/20 max-w-[200px] hidden md:block group-hover:border-blue-500/50 transition-all">

            <span className="text-[8px] uppercase tracking-[0.3em] text-blue-400 block mb-2">
              {badgeTitle}
            </span>

            <div className="h-px w-full bg-blue-500/20 mb-4 group-hover:bg-blue-500/50" />

            <p className="text-[10px] text-white/80 leading-relaxed uppercase tracking-wider">
              {badgeText}
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}