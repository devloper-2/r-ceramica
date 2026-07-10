import { TextareaHTMLAttributes } from "react";

interface Props
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export default function ContactTextarea({
  label,
  id,
  ...props
}: Props) {
  return (
    <div className="relative">
      <textarea
        id={id}
        rows={4}
        placeholder=" "
        className="peer w-full bg-transparent border-b border-white/10 text-white py-3 resize-none focus:outline-none focus:border-white transition-all text-sm tracking-widest uppercase"
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