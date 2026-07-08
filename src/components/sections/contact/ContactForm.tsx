import ContactInput from "./ContactInput";
import ContactSelect from "./ContactSelect";
import ContactTextarea from "./ContactTextarea";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import OfficeLocations from "./OfficeLocations";

export default function ContactForm() {
  return (
    <div className="bg-white/[0.03] backdrop-blur-3xl p-8 md:p-10 border border-white/10 rounded-sm shadow-2xl relative overflow-hidden">

      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-30" />

      <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 blur-[80px] rounded-full" />

      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-display font-light text-white uppercase tracking-wider mb-3">
          Send a Message
        </h2>

        <p className="text-xs text-white/40 uppercase tracking-widest leading-relaxed">
          Fill out the form below and an R Ceramica expert
          will reach out to you within 24 hours.
        </p>
      </div>

      <form className="space-y-10">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          <ContactInput
            id="name"
            name="name"
            label="Full Name"
            required
          />

          <ContactInput
            id="email"
            name="email"
            type="email"
            label="Email Address"
            required
          />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          <ContactInput
            id="phone"
            name="phone"
            type="tel"
            label="Phone Number"
          />
            <ContactSelect
  label="Subject"
  placeholder="Select Project Type"
  options={[
    {
      label: "Residential",
      value: "residential",
    },
    {
      label: "Commercial",
      value: "commercial",
    },
    {
      label: "Industrial",
      value: "industrial",
    },
    {
      label: "Dealer Inquiry",
      value: "dealer",
    },
  ]}
/>
        </div>
            <ContactTextarea
  id="message"
  name="message"
  label="Message / Requirements"
/>
<div className="pt-6">
  <Button
    type="submit"
    variant="solid"
    size="lg"
    className="w-full md:w-auto flex items-center justify-center gap-4 font-bold tracking-[0.4em]"
  >
    Submit Inquiry
    <ArrowRight
      size={18}
      className="transition-transform group-hover:translate-x-1"
    />
  </Button>
</div>
      </form>
<OfficeLocations />
    </div>
  );
}