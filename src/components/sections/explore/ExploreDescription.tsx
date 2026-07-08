interface ExploreDescriptionProps {
  children: React.ReactNode;
}

export default function ExploreDescription({
  children,
}: ExploreDescriptionProps) {
  return (
    <p className="text-white/40 text-[12px] md:text-[13px] uppercase tracking-[0.3em] mb-12 max-w-md leading-relaxed">
      {children}
    </p>
  );
}