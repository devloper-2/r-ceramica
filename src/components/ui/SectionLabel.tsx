interface SectionLabelProps {
  text: string;
  color?: "gold" | "muted";
  className?: string;
}

export default function SectionLabel({
  text,
  color = "gold",
  className = "",
}: SectionLabelProps) {
  const colorClass =
    color === "gold" ? "text-[var(--color-gold)]" : "text-white/30";
  return (
    <span
      className={`text-[9px] uppercase tracking-[0.5em] font-medium ${colorClass} ${className}`}
    >
      {text}
    </span>
  );
}
