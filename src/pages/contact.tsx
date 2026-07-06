import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, ChevronDown, ArrowRight } from "lucide-react";
import {
  CONTACT_HERO,
  CONTACT_OFFICES,
  PROJECT_TYPES,
  MAP_EMBED_SRC,
} from "@/lib/constants/contact";
import { webPageSchema } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const TITLE = `Contact Us | ${siteConfig.name}`;
const DESCRIPTION =
  "Get in touch with R Ceramica. Our consultants across Morbi, Ahmedabad and Dubai are ready to assist your architectural vision.";

const WhatsAppGlyph = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.046c0 2.121.554 4.191 1.606 6.034L0 24l6.117-1.604a11.803 11.803 0 005.93 1.587h.005c6.634 0 12.043-5.413 12.046-12.049a11.796 11.796 0 00-3.417-8.412z" />
  </svg>
);

/**
 * Contact page → "/contact" (ported from static-html/contact.html).
 */
export default function ContactPage() {
  const [projectType, setProjectType] = useState<{ value: string; label: string } | null>(null);
  const [selectOpen, setSelectOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Your inquiry has been received. Our luxury consultants will contact you shortly.");
    e.currentTarget.reset();
    setProjectType(null);
  };

  return (
    <div className="page-contact">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${siteConfig.url}/contact`} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webPageSchema("/contact", "Contact Us", DESCRIPTION)),
          }}
        />
      </Head>

      {/* Hero */}
      <header className="relative min-h-[70vh] md:min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-black pt-20 md:pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src={CONTACT_HERO.image}
            alt="Contact R Ceramica"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[var(--color-bg)]" />
        </div>
        <div className="relative z-10 text-center px-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-white/20" />
            <span className="text-[9px] uppercase tracking-[0.5em] text-white/50">{CONTACT_HERO.eyebrow}</span>
            <div className="w-12 h-px bg-white/20" />
          </div>
          <h1 className="text-5xl md:text-8xl font-display tracking-[0.1em] font-light text-white uppercase mb-6">
            {CONTACT_HERO.title}
          </h1>
          <p className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-white/40 max-w-lg mx-auto leading-relaxed">
            {CONTACT_HERO.description}
          </p>
        </div>
      </header>

      <main className="relative z-20 px-6 md:px-16 max-w-[1440px] mx-auto pb-24 mt-12 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-white/[0.03] backdrop-blur-3xl p-8 md:p-10 border border-white/10 rounded-sm shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-30" />
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-display font-light text-white uppercase tracking-wider mb-3">
                Send a Message
              </h2>
              <p className="text-xs text-white/40 uppercase tracking-widest leading-relaxed">
                Fill out the form below and an R Ceramica expert will reach out to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <FloatingInput id="name" label="Full Name" type="text" required />
                <FloatingInput id="email" label="Email Address" type="email" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <FloatingInput id="phone" label="Phone Number" type="tel" />
                {/* Custom select */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectOpen((v) => !v);
                    }}
                    onBlur={() => setTimeout(() => setSelectOpen(false), 150)}
                    className="w-full bg-transparent border-b border-white/10 text-white/80 py-3 focus:outline-none focus:border-white transition-all text-[10px] tracking-widest uppercase text-left flex justify-between items-center group"
                  >
                    <span className={projectType ? "text-white" : "text-white/50"}>
                      {projectType?.label ?? "Select Project Type"}
                    </span>
                    <ChevronDown size={16} className="text-white/20 group-hover:text-white/50 transition-colors" />
                  </button>
                  <label className="absolute left-0 -top-4 text-[10px] text-white/60 uppercase tracking-[0.3em]">
                    Subject
                  </label>
                  {selectOpen && (
                    <div className="absolute left-0 top-full w-full mt-2 bg-black/60 backdrop-blur-xl border border-white/10 p-1.5 rounded-sm shadow-2xl z-30">
                      {PROJECT_TYPES.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setProjectType(opt);
                            setSelectOpen(false);
                          }}
                          className="w-full text-left px-5 py-3 text-[10px] text-white/70 hover:text-white hover:bg-white/10 transition-all uppercase tracking-[0.25em] font-medium"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-white/10 text-white py-3 focus:outline-none focus:border-white transition-all text-sm tracking-widest uppercase resize-none"
                />
                <label
                  htmlFor="message"
                  className="absolute left-0 top-3 text-[10px] text-white/30 uppercase tracking-[0.3em] transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-white/60 peer-[:not(:placeholder-shown)]:-top-4"
                >
                  Message / Requirements
                </label>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full md:w-auto bg-white text-black px-16 py-5 text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-neutral-200 transition-all rounded-sm flex items-center justify-center gap-4 group"
                >
                  Submit Inquiry
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </form>

            {/* Offices */}
            <div className="mt-20 border-t border-white/10 pt-12">
              <h3 className="text-[10px] uppercase tracking-[0.6em] text-white/20 mb-12">Our Regional Presences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                {CONTACT_OFFICES.map((office) => (
                  <div key={office.title} className="group">
                    <h4 className="text-[9px] uppercase tracking-[0.5em] text-white/40 mb-4 group-hover:text-white transition-colors">
                      {office.title}
                    </h4>
                    <p className="text-[11px] text-white/30 leading-relaxed uppercase tracking-[0.2em] mb-4">
                      {office.address}
                    </p>
                    <div className="flex flex-col gap-2">
                      {office.contacts.map((c) => (
                        <a
                          key={c.href}
                          href={c.href}
                          className="text-[10px] text-white/50 hover:text-white transition-colors italic tracking-widest"
                        >
                          {c.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info + map */}
          <div className="lg:col-span-5 space-y-16">
            <div className="space-y-8">
              <InfoRow icon={<MapPin size={20} />} label="Our Headquarters">
                Opp. Ceramic City, B/h. Meldi Ma Temple, Lalpar, 8-A National Highway, Morbi-363642. Gujarat (INDIA)
              </InfoRow>
              <InfoRow icon={<Phone size={20} />} label="Support Line">
                <a href="tel:+919427410127" className="block hover:text-white transition-colors">+91 94274 10127</a>
                <a href="tel:+919998528523" className="block hover:text-white transition-colors">+91 99985 28523</a>
              </InfoRow>
              <InfoRow icon={<Mail size={20} />} label="Business Email">
                <a href="mailto:info@rceramica.com" className="hover:text-white transition-colors">info@rceramica.com</a>
              </InfoRow>
              <InfoRow icon={<Clock size={20} />} label="Office Hours">
                Mon — Sat · 09:00 AM — 07:00 PM
              </InfoRow>
            </div>

            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10">
              <iframe
                src={MAP_EMBED_SRC}
                title="R Ceramica location map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <a
              href="https://wa.me/919427410127"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 p-8 border border-[#25D366]/20 bg-[#25D366]/5 rounded-sm group hover:bg-[#25D366]/10 transition-all"
            >
              <div className="flex items-center gap-3">
                <WhatsAppGlyph className="w-6 h-6 fill-[#25D366]" />
                <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#25D366]">Express Support</span>
              </div>
              <span className="text-[10px] text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">
                Start a WhatsApp conversation now
              </span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

function FloatingInput({
  id,
  label,
  type,
  required,
}: {
  id: string;
  label: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        placeholder=" "
        className="peer w-full bg-transparent border-b border-white/10 text-white py-3 focus:outline-none focus:border-white transition-all text-sm tracking-widest uppercase"
      />
      <label
        htmlFor={id}
        className="absolute left-0 top-3 text-[10px] text-white/30 uppercase tracking-[0.3em] transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-white/60 peer-[:not(:placeholder-shown)]:-top-4"
      >
        {label}
      </label>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-6 group">
      <div className="mt-1 w-12 h-12 bg-white/5 border border-white/10 rounded-full flex shrink-0 items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all">
        {icon}
      </div>
      <div className="space-y-1">
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 block">{label}</span>
        <div className="text-[13px] text-white/50 leading-relaxed italic">{children}</div>
      </div>
    </div>
  );
}
