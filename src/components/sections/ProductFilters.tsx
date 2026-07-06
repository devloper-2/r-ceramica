"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Plus, Minus, Check } from "lucide-react";

interface CheckGroup {
  id: string;
  title: string;
  options: string[];
}

const CHECK_GROUPS: CheckGroup[] = [
  { id: "area-filter", title: "Area", options: ["Basin", "Shower", "Kitchen"] },
  { id: "mounting-filter", title: "Mounting", options: ["Deck Mounted", "Wall Mounted"] },
  { id: "range-filter", title: "Range", options: ["Economy", "Premium", "Luxury"] },
  { id: "shape-filter", title: "Shape", options: ["Square", "Round", "Curved"] },
];

const COLOR_FINISHES = [
  { name: "Black Chrome", img: "https://rceramica.com/img/finishes/black_chrome.jpg" },
  { name: "Black Matt", color: "#1a1a1a" },
  { name: "Blush Gold Bright PVD", color: "#7c5e42" },
  { name: "Chrome", gradient: "linear-gradient(135deg,#dfdfdf,#999)" },
  { name: "Gold Bright PVD", color: "#b89552" },
];

/**
 * ProductFilters — the /products refine-by sidebar. Filters are presentational
 * (they mirror the static mockup and don't mutate the demo product list); the
 * accordions, price range, and colour selection are interactive.
 */
export default function ProductFilters({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const [open, setOpen] = useState<Set<string>>(new Set(["color-filter"]));
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(50000);
  const [selectedColor, setSelectedColor] = useState("Gold Bright PVD");

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const AccordionHeader = ({ id, title }: { id: string; title: string }) => (
    <button
      onClick={() => toggle(id)}
      className="w-full flex justify-between items-center bg-[var(--color-bg-card)] px-6 py-5 hover:bg-[#151515] transition-colors group"
      aria-expanded={open.has(id)}
    >
      <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-white/80 group-hover:text-white">
        {title}
      </span>
      {open.has(id) ? (
        <Minus size={14} className="text-white/40 group-hover:text-white" />
      ) : (
        <Plus size={14} className="text-white/40 group-hover:text-white" />
      )}
    </button>
  );

  return (
    <aside
      className={`filter-sidebar w-full lg:w-80 shrink-0 ${
        mobileOpen ? "filter-open" : ""
      }`}
    >
      <div className="lg:sticky lg:top-48 flex flex-col h-full lg:h-auto bg-[var(--color-bg)] lg:bg-transparent">
        {/* Mobile header */}
        <div className="lg:hidden flex justify-between items-center px-6 py-6 border-b border-white/5 sticky top-0 bg-[var(--color-bg)] z-10">
          <h4 className="text-lg font-display uppercase tracking-widest text-[var(--color-gold)]">
            Refine By
          </h4>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors" aria-label="Close filters">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 lg:px-0 py-8 lg:py-0 lg:space-y-2">
          {/* Selected options */}
          <div className="bg-white/5 border border-white/5 p-6 mb-6">
            <h4 className="text-[10px] font-display font-medium uppercase tracking-[0.2em] text-white/40 mb-4">
              Selected Options
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white/10 text-[9px] px-3 py-1.5 uppercase tracking-widest flex items-center gap-2 hover:bg-white/20 cursor-pointer">
                {selectedColor} <X size={10} />
              </span>
            </div>
          </div>

          {/* Budget range */}
          <div className="border border-white/5 overflow-hidden">
            <AccordionHeader id="price-filter" title="Budget Range" />
            {open.has("price-filter") && (
              <div className="px-6 py-10 space-y-8 bg-black/40">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-white/40">
                    <span>Min: ₹{priceMin.toLocaleString()}</span>
                    <span>Max: ₹{priceMax.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100000}
                    step={500}
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full cursor-pointer accent-[var(--color-gold)]"
                    aria-label="Maximum budget"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[8px] uppercase tracking-widest text-white/30">Min Budget</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] text-white/40">₹</span>
                      <input
                        type="number"
                        value={priceMin}
                        onChange={(e) => setPriceMin(Number(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 pl-6 pr-3 py-3 text-[10px] text-white outline-none focus:border-[var(--color-gold)] transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[8px] uppercase tracking-widest text-white/30">Max Budget</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] text-white/40">₹</span>
                      <input
                        type="number"
                        value={priceMax}
                        onChange={(e) => setPriceMax(Number(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 pl-6 pr-3 py-3 text-[10px] text-white outline-none focus:border-[var(--color-gold)] transition-colors"
                      />
                    </div>
                  </div>
                </div>
                <button className="w-full py-3 text-[9px] uppercase tracking-[0.2em] font-bold border border-[var(--color-gold)]/20 text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-white transition-all">
                  Apply Range
                </button>
              </div>
            )}
          </div>

          {/* Area (first check group placed before color to match source order) */}
          <div className="border border-white/5 overflow-hidden">
            <AccordionHeader id="area-filter" title="Area" />
            {open.has("area-filter") && (
              <div className="px-6 py-8 space-y-4 bg-black/40">
                {CHECK_GROUPS[0].options.map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-3 cursor-pointer text-[10px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors"
                  >
                    <input type="checkbox" className="w-3.5 h-3.5 rounded-sm bg-white/5 border border-white/10 accent-white" />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Color finishes (open by default) */}
          <div className="border border-white/5 overflow-hidden">
            <AccordionHeader id="color-filter" title="Color Finishes" />
            {open.has("color-filter") && (
              <div className="px-6 py-8 space-y-6 bg-black/40">
                {COLOR_FINISHES.map((c) => {
                  const active = selectedColor === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className="flex items-center gap-4 cursor-pointer group w-full text-left"
                    >
                      <div
                        className={`relative w-10 h-10 border overflow-hidden ${
                          active ? "border-[var(--color-gold)]" : "border-white/10"
                        }`}
                        style={
                          c.gradient
                            ? { background: c.gradient }
                            : c.color
                            ? { background: c.color }
                            : undefined
                        }
                      >
                        {c.img && (
                          <Image src={c.img} alt={c.name} fill sizes="40px" className="object-cover" />
                        )}
                        {active && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <Check size={12} className="text-black" />
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-[10px] uppercase tracking-widest transition-colors ${
                          active ? "text-white" : "text-white/50 group-hover:text-white"
                        }`}
                      >
                        {c.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Remaining check groups */}
          {CHECK_GROUPS.slice(1).map((group) => (
            <div key={group.id} className="border border-white/5 overflow-hidden">
              <AccordionHeader id={group.id} title={group.title} />
              {open.has(group.id) && (
                <div className="px-6 py-8 space-y-4 bg-black/40">
                  {group.options.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-3 cursor-pointer text-[10px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors"
                    >
                      <input type="checkbox" className="w-3.5 h-3.5 rounded-sm bg-white/5 border border-white/10 accent-white" />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="pt-8 hidden lg:block">
            <button className="w-full py-5 text-[10px] uppercase tracking-[0.4em] font-bold border border-white/10 hover:bg-white hover:text-black transition-all">
              Reset Filters
            </button>
          </div>
        </div>

        {/* Mobile apply footer */}
        <div className="lg:hidden p-6 border-t border-white/5 bg-[var(--color-bg)] sticky bottom-0">
          <button
            onClick={onClose}
            className="w-full py-5 text-[10px] uppercase tracking-[0.4em] font-bold bg-[var(--color-gold)] text-white transition-all shadow-2xl"
          >
            Apply Selection
          </button>
        </div>
      </div>
    </aside>
  );
}
