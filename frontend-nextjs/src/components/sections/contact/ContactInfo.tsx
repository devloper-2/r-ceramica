import {
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

import WhatsAppCard from "./WhatsAppCard";

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Headquarters",
    content: (
      <>
        Opp. Ceramic City, B/h. Meldi Ma Temple, Lalpar, Morbi-363642
        <br />
        Gujarat (INDIA)
      </>
    ),
  },

  {
    icon: Phone,
    title: "Support Line",
    content: (
      <>
        <a
          href="tel:+919427410127"
          className="block hover:text-white transition-colors"
        >
          +91 94274 10127
        </a>

        <a
          href="tel:+919998528523"
          className="block hover:text-white transition-colors"
        >
          +91 99985 28523
        </a>
      </>
    ),
  },

  {
    icon: Mail,
    title: "Business Email",
    content: (
      <a
        href="mailto:info@rceramica.com"
        className="hover:text-white transition-colors"
      >
        info@rceramica.com
      </a>
    ),
  },

  {
    icon: Clock,
    title: "Office Hours",
    content: (
      <>
        <p>Mon — Sat</p>
        <p>09:00 AM — 07:00 PM</p>
      </>
    ),
  },
];

export default function ContactInfo() {
  return (
    <div className="space-y-16">

      {/* Contact Details */}
      <div className="space-y-8">
        {contactInfo.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-start gap-6 group ctainfoicon"
            >
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

      {/* Google Map */}
      <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 transition-all duration-1000 group">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.341398862413!2d70.86484401150337!3d22.810253824050278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39598dcd562cce57%3A0xfc120b911b2d75ab!2sR%20CERAMICA!5e0!3m2!1sen!2sin!4v1714896000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* WhatsApp Card */}
      <WhatsAppCard />

    </div>
  );
} 