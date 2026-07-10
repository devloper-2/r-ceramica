import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ArrowLinkProps {
  href: string;
  label: string;
  className?: string;
}

export default function ArrowLink({ href, label, className = "" }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={`w-fit flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-white hover:gap-10 transition-all duration-300 ${className}`}
    >
      {label}
      <ChevronRight size={14} />
    </Link>
  );
}
