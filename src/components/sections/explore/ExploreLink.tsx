import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ExploreLinkProps {
  href: string;
  label: string;
}

export default function ExploreLink({
  href,
  label,
}: ExploreLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-6 text-[11px] uppercase tracking-[0.5em] text-white/60 hover:text-white transition-all font-medium border-b border-white/10 pb-2 hover:border-white"
    >
      {label}

      <ChevronRight
        size={16}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
}