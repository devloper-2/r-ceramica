interface OfficeCardProps {
  title: string;
  address: string;
  contacts: string[];
}

export default function OfficeCard({
  title,
  address,
  contacts,
}: OfficeCardProps) {
  return (
    <div className="group">
      <h4 className="text-[9px] uppercase tracking-[0.5em] text-white/40 mb-4 group-hover:text-white transition-colors">
        {title}
      </h4>

      <p className="text-[11px] text-white/30 leading-relaxed uppercase tracking-[0.2em] mb-4">
        {address}
      </p>

      <div className="flex flex-col gap-2">
        {contacts.map((contact) => {
          const isEmail = contact.includes("@");

          return (
            <a
              key={contact}
              href={isEmail ? `mailto:${contact}` : `tel:${contact.replace(/\s/g, "")}`}
              className="text-[10px] text-white/50 hover:text-white transition-colors font-sans italic tracking-widest"
            >
              {contact}
            </a>
          );
        })}
      </div>
    </div>
  );
}