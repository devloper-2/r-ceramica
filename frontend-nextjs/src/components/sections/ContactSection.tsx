import ContactForm from "./contact/ContactForm";
import ContactInfo, { type ContactSettings } from "./contact/ContactInfo";
import { type Office } from "./contact/OfficeLocations";

export interface ContactSectionData extends ContactSettings {
  formTitle?: string;
  formSubtitle?: string;
  offices?: Office[];
}

interface Props {
  contactSection?: ContactSectionData;
}

export default function ContactSection({ contactSection = {} }: Props) {
  const { formTitle, formSubtitle, offices, ...infoSettings } = contactSection;

  return (
    <section className="relative z-20 px-6 md:px-16 max-w-[1440px] mx-auto pb-24 mt-12 md:mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
        <div className="lg:col-span-7">
          <ContactForm formTitle={formTitle} formSubtitle={formSubtitle} offices={offices} />
        </div>
        <div className="lg:col-span-5">
          <ContactInfo settings={infoSettings} />
        </div>
      </div>
    </section>
  );
}
