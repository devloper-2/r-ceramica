import OfficeCard from "./OfficeCard";

export interface Office {
  title: string;
  address: string;
  contacts: string[];
}

const DEFAULT_OFFICES: Office[] = [
  {
    title: "Corporate Headquarters",
    address: "Opp. Ceramic City, Lalpar, 8-A National Highway, Morbi-363642, Gujarat, India.",
    contacts: ["+91 94274 10127", "+91 99985 28523"],
  },
  {
    title: "Experience Center",
    address: "Luxury Hub, S.G. Highway, Near Thaltej Cross Roads, Ahmedabad-380054, Gujarat.",
    contacts: ["+91 98765 43210", "info@rceramica.com"],
  },
  {
    title: "International Desk",
    address: "Suite 1204, Architecture Tower, Business Bay, Dubai, UAE.",
    contacts: ["+971 50 123 4567"],
  },
  {
    title: "Logistic Hub",
    address: "Plot 45, Port Industrial Park, Mundra SEZ, Kutch, Gujarat.",
    contacts: ["+91 99985 28523"],
  },
];

interface Props {
  offices?: Office[];
}

export default function OfficeLocations({ offices = DEFAULT_OFFICES }: Props) {
  return (
    <div className="mt-20 border-t border-white/10 pt-12">
      <h3 className="text-[10px] uppercase tracking-[0.6em] text-white/20 mb-12">
        Our Regional Presences
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {offices.map((office) => (
          <OfficeCard key={office.title} {...office} />
        ))}
      </div>
    </div>
  );
}
