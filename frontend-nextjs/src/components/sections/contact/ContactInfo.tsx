import { MapPin, Phone, Mail, Clock } from "lucide-react";
import WhatsAppCard from "./WhatsAppCard";

export interface ContactSettings {
  phone?: string;
  phone2?: string;
  whatsapp?: string;
  email?: string;
  headquarters?: string;
  officeHoursDays?: string;
  officeHoursTime?: string;
  mapEmbed?: string;
}

interface Props {
  settings?: ContactSettings;
}

const DEFAULT_MAP =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.341398862413!2d70.86484401150337!3d22.810253824050278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39598dcd562cce57%3A0xfc120b911b2d75ab!2sR%20CERAMICA!5e0!3m2!1sen!2sin!4v1714896000000!5m2!1sen!2sin";

export default function ContactInfo({ settings = {} }: Props) {
  const {
    phone = "+91 94274 10127",
    phone2 = "+91 99985 28523",
    email = "info@rceramica.com",
    headquarters = "Opp. Ceramic City, B/h. Meldi Ma Temple, Lalpar, Morbi-363642\nGujarat (INDIA)",
    officeHoursDays = "Mon — Sat",
    officeHoursTime = "09:00 AM — 07:00 PM",
    mapEmbed = DEFAULT_MAP,
    whatsapp,
  } = settings;

  const hqLines = headquarters.split("\n");

  const items = [
    {
      icon: MapPin,
      title: "Our Headquarters",
      content: (
        <>
          {hqLines.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </>
      ),
    },
    {
      icon: Phone,
      title: "Support Line",
      content: (
        <>
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="block hover:text-white transition-colors"
          >
            {phone}
          </a>
          {phone2 && (
            <a
              href={`tel:${phone2.replace(/\s/g, "")}`}
              className="block hover:text-white transition-colors"
            >
              {phone2}
            </a>
          )}
        </>
      ),
    },
    {
      icon: Mail,
      title: "Business Email",
      content: (
        <a
          href={`mailto:${email}`}
          className="hover:text-white transition-colors"
        >
          {email}
        </a>
      ),
    },
    {
      icon: Clock,
      title: "Office Hours",
      content: (
        <>
          <p>{officeHoursDays}</p>
          <p>{officeHoursTime}</p>
        </>
      ),
    },
  ];

  return (
    <div className="space-y-16">
      <div className="space-y-8">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex items-start gap-6 group">
              <div className="mt-1 w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all">
                <Icon size={20} />
              </div>
              <div className="space-y-2">
                <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 block">
                  {item.title}
                </span>
                <div className="text-[13px] text-white/60 leading-relaxed">
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 transition-all duration-1000 group">
        <iframe
          src={mapEmbed}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <WhatsAppCard whatsapp={whatsapp} />
    </div>
  );
}
