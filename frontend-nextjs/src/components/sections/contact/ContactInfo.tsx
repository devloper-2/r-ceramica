import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
} from "lucide-react";
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
    headquarters = `Opp. Ceramic City, B/h. Meldi Ma Temple, Lalpar, Morbi-363642
Gujarat (INDIA)`,
    officeHoursDays = "Mon — Sat",
    officeHoursTime = "09:00 AM — 07:00 PM",
    mapEmbed = DEFAULT_MAP,
    whatsapp,
  } = settings;

  const hqLines = headquarters.split("\n");

  const contactItems = [
    {
      icon: MapPin,
      number: "01",
      label: "Headquarters",
      content: (
        <address className="not-italic text-[13px] leading-6 text-white/60">
          {hqLines.map((line, index) => (
            <span key={index} className="block">
              <a href="https://www.google.com/maps/place/R+CERAMICA/@22.8102538,70.864844,17z/data=!4m16!1m9!3m8!1s0x39598dcd562cce57:0xfc120b911b2d75ab!2sR+CERAMICA!8m2!3d22.8102489!4d70.8674189!9m1!1b1!16s%2Fg%2F11y5hw547j!3m5!1s0x39598dcd562cce57:0xfc120b911b2d75ab!8m2!3d22.8102489!4d70.8674189!16s%2Fg%2F11y5hw547j" target="_blank">{line}</a>
            </span>
          ))}
        </address>
      ),
    },

    {
      icon: Phone,
      number: "02",
      label: "Support Line",
      content: (
        <div className="flex flex-col items-start gap-1">
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="
              whitespace-nowrap
              text-[13px]
              text-white/65
              transition-colors
              duration-300
              hover:text-white
            "
          >
            {phone}
          </a>

          {phone2 && (
            <a
              href={`tel:${phone2.replace(/\s/g, "")}`}
              className="
                whitespace-nowrap
                text-[13px]
                text-white/40
                transition-colors
                duration-300
                hover:text-white
              "
            >
              {phone2}
            </a>
          )}
        </div>
      ),
    },

    {
      icon: Mail,
      number: "03",
      label: "Business Email",
      content: (
        <a
          href={`mailto:${email}`}
          className="
            inline-flex
            items-center
            gap-2
            break-all
            text-[13px]
            text-white/65
            transition-colors
            duration-300
            hover:text-white
          "
        >
          {email}

          <ArrowUpRight
            size={12}
            className="
              shrink-0
              text-white/30
              transition-all
              duration-300
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          />
        </a>
      ),
    },

    {
      icon: Clock,
      number: "04",
      label: "Office Hours",
      content: (
        <div className="text-[13px] leading-6 text-white/60">
          <p>{officeHoursDays}</p>
          <p className="text-white/40">{officeHoursTime}</p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      {/* =====================================================
          CONTACT INFORMATION
      ====================================================== */}

      <div
        className="
          overflow-hidden
          rounded-xl
          border
          border-white/[0.08]
          bg-white/[0.015]
        "
      >
        {contactItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className={`
                group
                relative
                grid
                grid-cols-[44px_1fr]
                items-center
                gap-5
                px-5
                py-6

                sm:grid-cols-[48px_150px_1fr]
                sm:gap-5
                sm:px-6

                transition-colors
                duration-500
                hover:bg-white/[0.025]

                ${
                  index !== contactItems.length - 1
                    ? "border-b border-white/[0.07]"
                    : ""
                }
              `}
            >
              {/* =================================================
                  ICON
              ================================================== */}

              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/[0.1]
                  bg-white/[0.025]
                  text-white/45

                  transition-all
                  duration-500

                  group-hover:border-white/20
                  group-hover:bg-white
                  group-hover:text-black
                "
              >
                <Icon
                  size={17}
                  strokeWidth={1.5}
                />
              </div>

              {/* =================================================
                  LABEL

                  items-center keeps this exactly centered
                  vertically with the icon.
              ================================================== */}

              <div
                className="
                  flex
                  items-center
                  sm:self-center
                "
              >
                <p
                  className="
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.35em]
                    text-white/40
                  "
                >
                  {item.label}
                </p>
              </div>

              {/* =================================================
                  CONTENT
              ================================================== */}

              <div
                className="
                  col-start-2
                  min-w-0

                  sm:col-start-auto
                "
              >
                {item.content}
              </div>

              {/* =================================================
                  NUMBER
              ================================================== */}

              <span
                className="
                  pointer-events-none
                  absolute
                  bottom-3
                  right-5
                  text-[8px]
                  tracking-[0.3em]
                  text-white/[0.08]
                "
              >
                {item.number}
              </span>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          GOOGLE MAP
      ====================================================== */}

      <div className="mt-8">
        <div
          className="
            overflow-hidden
            rounded-xl
            border
            border-white/[0.08]
            bg-white/[0.015]
          "
        >
          {/* Map Header */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-white/[0.07]
              px-5
              py-4
              sm:px-6
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/[0.08]
                  bg-white/[0.025]
                "
              >
                <MapPin
                  size={14}
                  strokeWidth={1.5}
                  className="text-white/50"
                />
              </div>

              <div>
                <p
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.3em]
                    text-white/30
                  "
                >
                  Find Us
                </p>

                <p className="mt-0.5 text-[12px] text-white/55">
                  Morbi, Gujarat
                </p>
              </div>
            </div>

            <span
              className="
                hidden
                text-[8px]
                uppercase
                tracking-[0.3em]
                text-white/20
                sm:block
              "
            >
              R Ceramica
            </span>
          </div>

          {/* =================================================
              GOOGLE MAP

              Google embed itself is NOT modified.
          ================================================== */}

          <div
            className="
              relative
              aspect-[4/3]
              w-full
              sm:aspect-[16/9]
            "
          >
            <iframe
              src={mapEmbed}
              title="R Ceramica location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="
                absolute
                inset-0
                h-full
                w-full
              "
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          WHATSAPP
      ====================================================== */}

      <div className="mt-8">
        <WhatsAppCard whatsapp={whatsapp} />
      </div>
    </div>
  );
}