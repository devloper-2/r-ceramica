import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import {
  FOOTER_QUICK_LINKS,
  FOOTER_CORPORATE_LINKS,
  CONTACT,
  ADDRESS,
  SOCIALS,
  SITE,
  digits,
} from "@/lib/services/site-data";

const FacebookIcon = () => (
 <svg className="w-[20px] h-[20px] fill-current" viewBox="38.657999999999994 12.828 207.085 207.085" xmlns="http://www.w3.org/2000/svg"><path d="M158.232 219.912v-94.461h31.707l4.747-36.813h-36.454V65.134c0-10.658 2.96-17.922 18.245-17.922l19.494-.009V14.278c-3.373-.447-14.944-1.449-28.406-1.449-28.106 0-47.348 17.155-47.348 48.661v27.149H88.428v36.813h31.788v94.461l38.016-.001z" fill="#3c5a9a"/></svg>
);

const InstagramIcon = () => (
  <svg className="w-[20px] h-[20px] fill-current" viewBox="0 0 3364.7 3364.7"><defs><radialGradient id="0" cx="217.76" cy="3290.99" r="4271.92" gradientUnits="userSpaceOnUse"><stop offset=".09" stop-color="#fa8f21"/><stop offset=".78" stop-color="#d82d7e"/></radialGradient><radialGradient id="1" cx="2330.61" cy="3182.95" r="3759.33" gradientUnits="userSpaceOnUse"><stop offset=".64" stop-color="#8c3aaa" stop-opacity="0"/><stop offset="1" stop-color="#8c3aaa"/></radialGradient></defs><path d="M853.2,3352.8c-200.1-9.1-308.8-42.4-381.1-70.6-95.8-37.3-164.1-81.7-236-153.5S119.7,2988.6,82.6,2892.8c-28.2-72.3-61.5-181-70.6-381.1C2,2295.4,0,2230.5,0,1682.5s2.2-612.8,11.9-829.3C21,653.1,54.5,544.6,82.5,472.1,119.8,376.3,164.3,308,236,236c71.8-71.8,140.1-116.4,236-153.5C544.3,54.3,653,21,853.1,11.9,1069.5,2,1134.5,0,1682.3,0c548,0,612.8,2.2,829.3,11.9,200.1,9.1,308.6,42.6,381.1,70.6,95.8,37.1,164.1,81.7,236,153.5s116.2,140.2,153.5,236c28.2,72.3,61.5,181,70.6,381.1,9.9,216.5,11.9,281.3,11.9,829.3,0,547.8-2,612.8-11.9,829.3-9.1,200.1-42.6,308.8-70.6,381.1-37.3,95.8-81.7,164.1-153.5,235.9s-140.2,116.2-236,153.5c-72.3,28.2-181,61.5-381.1,70.6-216.3,9.9-281.3,11.9-829.3,11.9-547.8,0-612.8-1.9-829.1-11.9" fill="url(#0)"/><path d="M853.2,3352.8c-200.1-9.1-308.8-42.4-381.1-70.6-95.8-37.3-164.1-81.7-236-153.5S119.7,2988.6,82.6,2892.8c-28.2-72.3-61.5-181-70.6-381.1C2,2295.4,0,2230.5,0,1682.5s2.2-612.8,11.9-829.3C21,653.1,54.5,544.6,82.5,472.1,119.8,376.3,164.3,308,236,236c71.8-71.8,140.1-116.4,236-153.5C544.3,54.3,653,21,853.1,11.9,1069.5,2,1134.5,0,1682.3,0c548,0,612.8,2.2,829.3,11.9,200.1,9.1,308.6,42.6,381.1,70.6,95.8,37.1,164.1,81.7,236,153.5s116.2,140.2,153.5,236c28.2,72.3,61.5,181,70.6,381.1,9.9,216.5,11.9,281.3,11.9,829.3,0,547.8-2,612.8-11.9,829.3-9.1,200.1-42.6,308.8-70.6,381.1-37.3,95.8-81.7,164.1-153.5,235.9s-140.2,116.2-236,153.5c-72.3,28.2-181,61.5-381.1,70.6-216.3,9.9-281.3,11.9-829.3,11.9-547.8,0-612.8-1.9-829.1-11.9" fill="url(#1)"/><path d="M1269.25,1689.52c0-230.11,186.49-416.7,416.6-416.7s416.7,186.59,416.7,416.7-186.59,416.7-416.7,416.7-416.6-186.59-416.6-416.7m-225.26,0c0,354.5,287.36,641.86,641.86,641.86s641.86-287.36,641.86-641.86-287.36-641.86-641.86-641.86S1044,1335,1044,1689.52m1159.13-667.31a150,150,0,1,0,150.06-149.94h-0.06a150.07,150.07,0,0,0-150,149.94M1180.85,2707c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28,7.27-505.15c5.55-121.87,26-188,43-232.13,22.72-58.36,49.78-100,93.5-143.78s85.32-70.88,143.78-93.5c44-17.16,110.26-37.46,232.13-43,131.76-6.06,171.34-7.27,505-7.27S2059.13,666,2191,672c121.87,5.55,188,26,232.13,43,58.36,22.62,100,49.78,143.78,93.5s70.78,85.42,93.5,143.78c17.16,44,37.46,110.26,43,232.13,6.06,131.87,7.27,171.34,7.27,505.15s-1.21,373.28-7.27,505.15c-5.55,121.87-25.95,188.11-43,232.13-22.72,58.36-49.78,100-93.5,143.68s-85.42,70.78-143.78,93.5c-44,17.16-110.26,37.46-232.13,43-131.76,6.06-171.34,7.27-505.15,7.27s-373.28-1.21-505-7.27M1170.5,447.09c-133.07,6.06-224,27.16-303.41,58.06-82.19,31.91-151.86,74.72-221.43,144.18S533.39,788.47,501.48,870.76c-30.9,79.46-52,170.34-58.06,303.41-6.16,133.28-7.57,175.89-7.57,515.35s1.41,382.07,7.57,515.35c6.06,133.08,27.16,223.95,58.06,303.41,31.91,82.19,74.62,152,144.18,221.43s139.14,112.18,221.43,144.18c79.56,30.9,170.34,52,303.41,58.06,133.35,6.06,175.89,7.57,515.35,7.57s382.07-1.41,515.35-7.57c133.08-6.06,223.95-27.16,303.41-58.06,82.19-32,151.86-74.72,221.43-144.18s112.18-139.24,144.18-221.43c30.9-79.46,52.1-170.34,58.06-303.41,6.06-133.38,7.47-175.89,7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2586.8,537.06,2504.71,505.15c-79.56-30.9-170.44-52.1-303.41-58.06C2068,441,2025.41,439.52,1686,439.52s-382.1,1.41-515.45,7.57" fill="#ffffff"/></svg>
);

const LinkedinIcon = () => (
  <svg className="w-[20px] h-[20px] fill-current" version="1.1" id="Layer_1" viewBox="0 0 382 382"><path d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889
	C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056 H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806
	c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1
	s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73
	c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079
	c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426
	c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472
	L341.91,330.654L341.91,330.654z" fill="#0077B7" /></svg>
);

const YoutubeIcon = () => (
  <svg className="w-[20px] h-[20px] fill-current" version="1.1" id="Layer_1" viewBox="0 0 461.001 461.001">
<g><path d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728 c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137 C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607 c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z" fill="#F61C0D" /></g></svg>
);

type WhatsAppIconProps = {
  className?: string;
};

const WhatsAppIcon = ({
  className = "w-[20px] h-[20px] text-[#67C15E]",
}: WhatsAppIconProps) => (
  <svg
    className={`${className} fill-current`}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.046c0 2.121.554 4.191 1.606 6.034L0 24l6.117-1.604a11.803 11.803 0 005.93 1.587h.005c6.634 0 12.043-5.413 12.046-12.049a11.796 11.796 0 00-3.417-8.412z"
      fill="currentColor"
      />
  </svg>
);

export default function Footer() {
  console.log("SOCIALS", SOCIALS);
  return (
   <footer className="site-footer relative overflow-hidden bg-[#080808] border-t border-white/[0.06]">
  {/* Subtle ambient glow */}
  <div
    className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full
               bg-[#C8954D]/[0.035] blur-[120px]"
  />

  {/* Animated top line */}
  <div className="absolute left-0 top-0 h-px w-full overflow-hidden">
    <div className="footer-gold-line h-full w-1/3 bg-gradient-to-r from-transparent via-[#C8954D]/60 to-transparent" />
  </div>

  <div className="relative mx-auto max-w-content px-[var(--section-px)] py-16 md:py-20 lg:py-24">

    {/* ================= MAIN FOOTER ================= */}
    <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-x-16 md:gap-y-20 lg:grid-cols-4 lg:gap-x-16">

      {/* ================= BRAND ================= */}
      <div className="footer-reveal group text-left max-md:flex max-md:flex-col max-md:items-center max-md:text-center">

        <div className="relative inline-block">
          <Image
            src="/images/logo.webp"
            alt="R Ceramica Logo"
            width={160}
            height={64}
            className="
              h-16 w-auto object-contain
              transition-all duration-700 ease-out
              group-hover:scale-[1.03]
              group-hover:brightness-110
            "
          />

          {/* Logo underline */}
          <span
            className="
              absolute -bottom-3 left-0 h-px w-0
              bg-[#C8954D]
              transition-all duration-700
              group-hover:w-full
            "
          />
        </div>

        <p
          className="
            mt-8 max-w-sm
            text-[13px] font-light leading-[1.9]
            tracking-wide text-white/35
            transition-colors duration-500
            group-hover:text-white/50
          "
        >
          {SITE.shortDescription}
        </p>

        {/* =========================
                SOCIAL LINKS
            ========================= */}
            <div className="mt-9">
              <p className="mb-4 text-[9px] font-medium uppercase tracking-[0.35em] text-white/25">
                Follow Us
              </p>

              <div className="flex flex-wrap items-center gap-2.5">
                {[
                  {
                    href: SOCIALS.facebook,
                    icon: <FacebookIcon />,
                    label: "Facebook",
                    color: "#3c5a9a",
                  },
                  {
                    href: SOCIALS.instagram,
                    icon: <InstagramIcon />,
                    label: "Instagram",
                    color: "#E1306C",
                  },
                  {
                    href: SOCIALS.linkedin,
                    icon: <LinkedinIcon />,
                    label: "LinkedIn",
                    color: "#0077B7",
                  },
                  {
                    href: SOCIALS.youtube,
                    icon: <YoutubeIcon />,
                    label: "YouTube",
                    color: "#F61C0D",
                  },
                  {
                    href: SOCIALS.whatsapp,
                    icon: <WhatsAppIcon />,
                    label: "WhatsApp",
                    color: "#67C15E",
                  },
                ]
                  .filter((social) => social.href)
                  .map((social, index) => (
                    <Link
                      key={social.label}
                      href={social.href}
                      aria-label={`Visit our ${social.label}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        footer-social
                        group
                        relative
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-xl
                        border
                        border-white/[0.08]
                        bg-white/[0.025]
                        text-white/45
                  
                        transition-all
                        duration-500
                        ease-out
                  
                        hover:-translate-y-1
                        hover:border-white/[0.18]
                        hover:bg-white/[0.06]
                        hover:text-white
                  
                        active:translate-y-0
                        active:scale-95
                      "
                      style={
                        {
                          "--social-color": social.color,
                          animationDelay: `${index * 70}ms`,
                        } as React.CSSProperties
                      }
                    >
                      {/* Soft hover glow */}
                      {/* <span
                        className="
                          pointer-events-none
                          absolute
                          -inset-4
                          rounded-full
                          opacity-0
                          blur-xl
                          transition-opacity
                          duration-500
                          group-hover:opacity-20
                        "
                        style={{
                          backgroundColor: social.color,
                        }}
                      /> */}

                      {/* Bottom accent */}
                      <span
                        className="
                          pointer-events-none
                          absolute
                          bottom-0
                          left-1/2
                          h-[2px]
                          w-0
                          -translate-x-1/2
                          rounded-full
                          transition-all
                          duration-500
                          group-hover:w-5
                        "
                        style={{
                          backgroundColor: social.color,
                          boxShadow: `0 0 10px ${social.color}`,
                        }}
                      />

                      {/* Icon */}
                      <span
                        className="
                          relative
                          z-10
                          flex
                          h-[21px]
                          w-[21px]
                          items-center
                          justify-center
                      
                          transition-all
                          duration-500
                          ease-out
                      
                          group-hover:scale-110
                          group-hover:-rotate-3
                        "
                      >
                        {social.icon}
                      </span>
                      
                      {/* Shine */}
                      {/* <span
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          -translate-x-full
                          bg-gradient-to-r
                          from-transparent
                          via-white/[0.08]
                          to-transparent
                          transition-transform
                          duration-700
                          group-hover:translate-x-full
                        "
                      /> */}
                    </Link>
                  ))}
              </div>
            </div>
            </div>

      {/* ================= QUICK LINKS ================= */}
      <div className="footer-reveal">
        <h4
          className="
            mb-8
            font-display text-[15px] font-light
            uppercase tracking-[0.18em]
            text-[#F4F0E8]
          "
        >
          Quick Links
        </h4>

        <ul className="space-y-4">
          {FOOTER_QUICK_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="
                  footer-link
                  group relative inline-flex
                  items-center
                  text-[12px] font-light
                  uppercase tracking-[0.12em]
                  text-white/35
                  transition-all duration-400
                  hover:text-[#D6A765]
                "
              >
                <span
                  className="
                    absolute -left-4 h-px w-0
                    bg-[#C8954D]
                    transition-all duration-400
                    group-hover:w-2
                  "
                />

                <span className="transition-transform duration-400 group-hover:translate-x-2">
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ================= CORPORATE ================= */}
      <div className="footer-reveal">
        <h4
          className="
            mb-8
            font-display text-[15px] font-light
            uppercase tracking-[0.18em]
            text-[#F4F0E8]
          "
        >
          Corporate
        </h4>

        <ul className="space-y-4">
          {FOOTER_CORPORATE_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="
                  footer-link
                  group relative inline-flex
                  items-center
                  text-[12px] font-light
                  uppercase tracking-[0.12em]
                  text-white/35
                  transition-all duration-400
                  hover:text-[#D6A765]
                "
              >
                <span
                  className="
                    absolute -left-4 h-px w-0
                    bg-[#C8954D]
                    transition-all duration-400
                    group-hover:w-2
                  "
                />

                <span className="transition-transform duration-400 group-hover:translate-x-2">
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ================= CONTACT ================= */}
      <address className="footer-reveal not-italic">
        <h4
          className="
            mb-7
            font-display text-[15px] font-light
            uppercase tracking-[0.18em]
            text-[#F4F0E8]
          "
        >
          Contact Us
        </h4>

        <div className="divide-y divide-white/[0.10]">

          {/* ADDRESS */}
          <a
            href="https://www.google.com/maps/place/R+CERAMICA/@22.8102538,70.864844,17z/data=!4m16!1m9!3m8!1s0x39598dcd562cce57:0xfc120b911b2d75ab!2sR+CERAMICA!8m2!3d22.8102489!4d70.8674189!9m1!1b1!16s%2Fg%2F11y5hw547j!3m5!1s0x39598dcd562cce57:0xfc120b911b2d75ab!8m2!3d22.8102489!4d70.8674189!16s%2Fg%2F11y5hw547j"
            target="_blank"
            rel="noopener noreferrer"
            className="
              contact-row
              group flex items-start gap-4
              py-5
              text-[13px] font-light
              leading-[1.8]
              text-white/40
              transition-all duration-500
              hover:text-[#D6A765]
            "
          >
            <span
              className="
                mt-0.5 flex h-7 w-7 shrink-0
                items-center justify-center
                text-[#C8954D]/80
                transition-all duration-500
                group-hover:scale-110
              "
            >
              <MapPin size={18} strokeWidth={1.4} />
            </span>

            <span className="transition-transform duration-500 group-hover:translate-x-1  hover:text-[#D6A765]">
              {ADDRESS.full}
            </span>
          </a>

          {/* PHONE */}
          <a
            href={`tel:+${digits(CONTACT.phone)}`}
            className="
              contact-row
              group flex items-center gap-4
              py-5
              text-[13px] font-light
              text-white/40
              transition-all duration-500
              hover:text-[#D6A765]
            "
          >
            <span
              className="
                flex h-7 w-7 shrink-0
                items-center justify-center
                text-[#C8954D]/80
                transition-all duration-500
                group-hover:scale-110
                group-hover:text-[#D6A765]
              "
            >
              <Phone size={17} strokeWidth={1.4} />
            </span>

            <span className="transition-transform duration-500 group-hover:translate-x-1  hover:text-[#D6A765]">
              PH: {CONTACT.phone}
            </span>
          </a>

          {/* WHATSAPP */}
          <a
            href={`https://wa.me/${digits(CONTACT.whatsapp)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              contact-row
              group flex items-center gap-4
              py-5
              text-[13px] font-light
              text-white/40
              transition-all duration-500
              hover:text-[#D6A765]
            "
          >
            <span
              className="
                flex h-7 w-7 shrink-0
                items-center justify-center
                text-[#C8954D]/80
                transition-all duration-500
                group-hover:scale-110
                group-hover:text-[#D6A765]
              "
            >
              <WhatsAppIcon className="h-[17px] w-[17px]" />
            </span>

            <span className="transition-transform duration-500 group-hover:translate-x-1  hover:text-[#D6A765]">
              {CONTACT.whatsapp}
            </span>
          </a>

          {/* EMAIL */}
          <a
            href={`mailto:${CONTACT.email}`}
            className="
              contact-row
              group flex items-center gap-4
              py-5
              text-[13px] font-light
              text-white/40
              transition-all duration-500
              hover:text-[#D6A765]
            "
          >
            <span
              className="
                flex h-7 w-7 shrink-0
                items-center justify-center
                text-[#C8954D]/80
                transition-all duration-500
                group-hover:scale-110
                group-hover:text-[#D6A765]
              "
            >
              <Mail size={17} strokeWidth={1.4} />
            </span>

            <span className="transition-transform duration-500 group-hover:translate-x-1  hover:text-[#D6A765]">
              {CONTACT.email}
            </span>
          </a>

        </div>
      </address>
    </div>

    {/* ================= BOTTOM BAR ================= */}
    <div
      className="
        mt-16 border-t border-white/[0.07]
        pt-7
        md:mt-20
      "
    >
      <div
        className="
          flex flex-col
          items-center justify-between
          gap-5
          md:flex-row
        "
      >

        {/* Copyright */}
        <p
          className="
            text-center
            text-[9px]
            font-medium
            uppercase
            tracking-[0.25em]
            text-white/20
            md:text-left
          "
        >
          © {new Date().getFullYear()} R Ceramica Global.
          <span className="ml-1">
            All Rights Reserved.
          </span>
        </p>

        {/* Legal links */}
        <div className="flex items-center gap-3">
          <Link
            href="/privacy"
            className="
              group relative
              flex items-center gap-3
              border border-white/[0.10]
              bg-white/[0.015]
              px-5 py-3
              overflow-hidden
              text-[9px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-white/35
              transition-all duration-500
              hover:border-[#C8954D]/50
              hover:text-[#D6A765]
            "
          >
            {/* Gold hover fill */}
            <span
              className="
                absolute inset-0
                origin-left scale-x-0
                bg-[#C8954D]/[0.06]
                transition-transform duration-500
                group-hover:scale-x-100
              "
            />
        
            <span className="relative z-10">
              Privacy Policy
            </span>
                
            <span
              className="
                relative z-10
                text-[#C8954D]/50
                transition-all duration-500
                group-hover:translate-x-1
                group-hover:text-[#D6A765]
              "
            >
              →
            </span>
          </Link>
                
          <Link
            href="/terms"
            className="
              group relative
              flex items-center gap-3
              border border-white/[0.10]
              bg-white/[0.015]
              px-5 py-3
              overflow-hidden
              text-[9px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-white/35
              transition-all duration-500
              hover:border-[#C8954D]/50
              hover:text-[#D6A765]
            "
          >
            <span
              className="
                absolute inset-0
                origin-left scale-x-0
                bg-[#C8954D]/[0.06]
                transition-transform duration-500
                group-hover:scale-x-100
              "
            />
        
            <span className="relative z-10">
              Terms of Service
            </span>
                
            <span
              className="
                relative z-10
                text-[#C8954D]/50
                transition-all duration-500
                group-hover:translate-x-1
                group-hover:text-[#D6A765]
              "
            >
              →
            </span>
          </Link>
        </div>
      </div>

      {/* Developed by */}
      <div className="mt-7 text-center">
        <a
          href="https://codezpark.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            group
            inline-flex items-center gap-2
            text-[8px]
            font-light
            uppercase
            tracking-[0.35em]
            text-white/25
            transition-colors duration-500
            hover:text-white
          "
        >
          <span>Developed by</span>

          <span
            className="
              relative text-white/30
              transition-colors duration-500
              group-hover:text-[#C8954D]
            "
          >
            CODEZPARK

            <span
              className="
                absolute -bottom-1 left-0
                h-px w-0
                bg-[#C8954D]
                transition-all duration-500
                group-hover:w-full
              "
            />
          </span>
        </a>
      </div>
    </div>
  </div>

</footer>
  );
}
