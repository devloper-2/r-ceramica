interface ExploreEyebrowProps {
  children: React.ReactNode;
}

export default function ExploreEyebrow({
  children,
}: ExploreEyebrowProps) {
  return (
    <span className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-[#C8A97E] mb-6 block font-medium opacity-80">
      {children}
    </span>
  );
}