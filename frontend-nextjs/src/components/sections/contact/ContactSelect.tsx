import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface ContactSelectProps {
  label: string;
  placeholder: string;
  options: {
    label: string;
    value: string;
  }[];
}

export default function ContactSelect({
  label,
  placeholder,
  options,
}: ContactSelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">

      <label className="absolute left-0 -top-4 text-[10px] text-white/60 uppercase tracking-[0.3em]">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-transparent border-b border-white/10 py-3 text-left flex items-center justify-between text-white/80 text-[10px] uppercase tracking-[0.3em]"
      >
        <span>
          {selected ? selected.label : placeholder}
        </span>

        <ChevronDown
          size={16}
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-full bg-black/70 backdrop-blur-xl border border-white/10 rounded-sm overflow-hidden z-50">

          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className="w-full text-left px-5 py-3 text-[10px] uppercase tracking-[0.25em] text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              {option.label}
            </button>
          ))}

        </div>
      )}
    </div>
  );
}