import { Link } from "@tanstack/react-router";
import logoHeader from "@/assets/icons/logo-header.svg";
import logoFooter from "@/assets/icons/logo-footer.svg";

export function Logo({ variant = "default" }: { variant?: "default" | "white" }) {
  return (
    <Link to="/" aria-label="Digital Store - página inicial" className="inline-flex shrink-0">
      <img
        src={variant === "white" ? logoFooter : logoHeader}
        alt="Digital Store"
        width={253}
        height={44}
        className="h-8 w-auto lg:h-11"
      />
    </Link>
  );
}
