import React from "react";

interface StatItem {
  number: string;
  label: string;
  accent?: "amber" | "blue" | "emerald" | "purple";
}

interface StatsGridProps {
  items: StatItem[];
  ariaLabel?: string;
}

const accentClasses = {
  amber:
    "hover:border-amber-500/30 hover:bg-amber-500/[0.03] group-hover:text-amber-500",
  blue:
    "hover:border-blue-500/30 hover:bg-blue-500/[0.03] group-hover:text-blue-500",
  emerald:
    "hover:border-emerald-500/30 hover:bg-emerald-500/[0.03] group-hover:text-emerald-500",
  purple:
    "hover:border-purple-500/30 hover:bg-purple-500/[0.03] group-hover:text-purple-500",
};

export default function StatsGrid({
  items,
  ariaLabel = "Statistics",
}: StatsGridProps) {
  return (
    <section
      className="py-16 md:py-24 bg-[#0d0d0d] border-y border-white/5"
      aria-label={ariaLabel}
    >
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {items.map((item) => (
            <article
              key={item.label}
              className={`group p-6 md:p-12 bg-white/[0.02] border border-white/5 rounded-sm transition-all ${
                accentClasses[item.accent || "amber"]
              }`}
            >
              <div
                className={`text-4xl md:text-5xl font-display font-light text-white mb-4 transition-colors ${
                  accentClasses[item.accent || "amber"]
                }`}
              >
                {item.number}
              </div>

              <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 group-hover:text-white/60 transition-colors">
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}