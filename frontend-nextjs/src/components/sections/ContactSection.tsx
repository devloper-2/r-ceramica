import ContactForm from "./contact/ContactForm";
import ContactInfo from "./contact/ContactInfo";

export default function ContactSection() {
  return (
    <section className="relative z-20 px-6 md:px-16 max-w-[1440px] mx-auto pb-24 mt-12 md:mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
        {/* Left */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        {/* Right */}
        <div className="lg:col-span-5">
          <ContactInfo />
        </div>
      </div>
    </section>
  );
}