import { InputHTMLAttributes } from "react";

interface ContactInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function ContactInput({
  label,
  id,
  ...props
}: ContactInputProps) {
  return (
    <div className="relative">
      <input
        id={id}
        placeholder=" "
        className="peer w-full bg-transparent border-b border-white/10 text-white py-3 focus:outline-none focus:border-white transition-all text-sm tracking-widest uppercase"
        {...props}
      />

      <label
        htmlFor={id}
        className="absolute left-0 top-3 text-[10px] text-white/30 uppercase tracking-[0.3em] transition-all pointer-events-none
        peer-focus:-top-4
        peer-focus:text-white/60
        peer-[:not(:placeholder-shown)]:-top-4"
      >
        {label}
      </label>
    </div>
  );
}