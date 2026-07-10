import Link from "next/link";
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";

type ButtonVariant = "outline" | "solid" | "ghost" | "gold";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

interface ButtonAsButton extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button";
  href?: never;
}

interface ButtonAsLink extends BaseProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  as: "link";
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  outline:
    "bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black",

  solid:
    "bg-white text-black hover:bg-neutral-200",

  ghost:
    "text-white/60 border-b border-white/20 hover:text-white hover:border-white",

  gold:
    "bg-[#C8A97E] border border-[#C8A97E] text-black hover:bg-[#B89463] hover:border-[#B89463]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-[9px] px-6 py-3",
  md: "text-[10px] px-10 py-5",
  lg: "text-[10px] px-12 py-5",
};

export default function Button({
  variant = "outline",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "uppercase tracking-[0.3em] transition-all duration-500 rounded-sm cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (props.as === "link") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { as: _as, ...linkProps } = props;
    return <Link className={classes} {...(linkProps as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })} />;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as: _as, ...btnProps } = props as ButtonAsButton;
  return <button className={classes} {...btnProps} />;
}
