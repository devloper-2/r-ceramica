import Image from "next/image";

interface ExploreBackgroundProps {
  image: string;
  alt?: string;
}

export default function ExploreBackground({
  image,
  alt = "",
}: ExploreBackgroundProps) {
  return (
    <>
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-30 transition-transform duration-[4000ms] group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-black/30 transition-all duration-700 group-hover:bg-black/10" />
    </>
  );
}