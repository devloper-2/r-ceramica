interface ExploreTitleProps {
  children: React.ReactNode;
}

export default function ExploreTitle({
  children,
}: ExploreTitleProps) {
  return (
    <h2 className="text-4xl md:text-7xl lg:text-8xl font-display font-light uppercase tracking-widest mb-8 leading-tight whitespace-pre-line">
      {children}
    </h2>
  );
}