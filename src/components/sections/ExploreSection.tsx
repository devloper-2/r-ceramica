import ExploreBackground from "./explore/ExploreBackground";
import ExploreContent from "./explore/ExploreContent";
import ExploreDescription from "./explore/ExploreDescription";
import ExploreEyebrow from "./explore/ExploreEyebrow";
import ExploreLink from "./explore/ExploreLink";
import ExploreTitle from "./explore/ExploreTitle";

interface ExploreSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  href: string;
  linkLabel?: string;
}

export default function ExploreSection({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  href,
  linkLabel = "Explore Models",
}: ExploreSectionProps) {
  return (
    <section className="relative group overflow-hidden bg-[#0c0c0c] h-screen w-full snap-start border-t border-white/5">

      <ExploreBackground
        image={image}
        alt={imageAlt}
      />

      <ExploreContent>

        <ExploreEyebrow>
          {eyebrow}
        </ExploreEyebrow>

        <ExploreTitle>
          {title}
        </ExploreTitle>

        <ExploreDescription>
          {description}
        </ExploreDescription>

        <ExploreLink
          href={href}
          label={linkLabel}
        />

      </ExploreContent>

    </section>
  );
}