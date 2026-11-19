import { Link } from "@tanstack/react-router";
import logoMark from "@/assets/icons/logo-mark.svg";
import logoMarkWhite from "@/assets/icons/logo-mark-white.svg";

export function Logo({ variant = "default" }: { variant?: "default" | "white" }) {
  return (
    <Link
      to="/"
      aria-label="Loja Mikael Maia - página inicial"
      className="inline-flex shrink-0 items-center gap-3"
    >
      <img
        src={variant === "white" ? logoMarkWhite : logoMark}
        alt=""
        width={34}
        height={34}
        className="h-8 w-auto lg:h-10"
      />
      <span className="flex flex-col leading-none">
        <span
          className={`text-lg font-extrabold tracking-tight lg:text-2xl ${
            variant === "white" ? "text-primary-foreground" : "text-dark-gray"
          }`}
        >
          Loja <span className="text-primary">Mikael Maia</span>
        </span>
        <span className="mt-1 text-[10px] font-semibold tracking-[0.18em] text-light-gray uppercase">
          Projeto Front End
        </span>
      </span>
    </Link>
  );
}
