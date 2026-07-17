import { FaWhatsapp } from "react-icons/fa";

interface Props {
  whatsapp?: string;
}

export default function WhatsAppCard({ whatsapp = "919427410127" }: Props) {
  const number = whatsapp.replace(/\D/g, "");
  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-4 p-8 rounded-sm border border-[#25D366]/20 bg-[#25D366]/5 hover:bg-[#25D366]/10 transition-all"
    >
      <div className="flex items-center gap-3">
        <FaWhatsapp size={28} className="text-[#25D366]" />
        <span className="text-xs uppercase tracking-[0.3em] text-[#25D366]">
          Express Support
        </span>
      </div>
      <span className="text-[10px] uppercase tracking-widest text-white/40">
        Start a WhatsApp conversation now
      </span>
    </a>
  );
}
