import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import ArrowLink from "@/components/ui/ArrowLink";
import { SPACE_CARDS } from "@/lib/constants/home";

export default function ArchitecturalSpaces() {
  return (
    <section aria-label="Architectural Spaces" className="w-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 bg-[var(--color-bg)]">
        {SPACE_CARDS.map((card) => (
          <div
            key={card.href}
            className="md:col-span-6 group relative overflow-hidden bg-[var(--color-bg)] min-h-[500px] md:min-h-[70vh]"
          >
            <Image
              src={card.imageSrc}
              alt={card.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-40 transition-transform duration-[2000ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700 flex flex-col justify-end p-12">
              <SectionLabel text={card.label} color="gold" className="mb-4 block" />
              <h2 className="text-3xl md:text-4xl font-display font-light uppercase tracking-widest mb-6 whitespace-pre-line">
                {card.title}
              </h2>
              <ArrowLink href={card.href} label="View Collection" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
