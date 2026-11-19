import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

interface SectionProps {
  title: string;
  titleAlign?: "left" | "center" | undefined;
  link?: { text: string; href: string };
  children: ReactNode;
  className?: string | undefined;
}

export function Section({ title, titleAlign = "left", link, children, className = "" }: SectionProps) {
  return (
    <section className={className}>
      <div className={`mb-5 flex items-center gap-4 ${titleAlign === "center" ? "justify-center" : "justify-between"}`}>
        <h2 className="text-lg font-bold text-dark-gray-2 lg:text-2xl">{title}</h2>
        {link && titleAlign === "left" && (
          <Link to={link.href} className="inline-flex items-center gap-2 text-sm text-primary hover:underline lg:text-lg">
            {link.text} <ArrowRight className="size-4" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
