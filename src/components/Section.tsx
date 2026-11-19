import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface SectionLinkProps {
  text: string;
  href: string;
}

interface SectionProps {
  title: string;
  titleAlign?: "left" | "center";
  link?: SectionLinkProps;
  children: ReactNode;
  className?: string;
}

function isExternalHref(href: string) {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");
}

export function Section({ title, titleAlign = "left", link, children, className }: SectionProps) {
  const isCentered = titleAlign === "center";

  return (
    <section className={className}>
      <div
        className={cn(
          "relative mb-5 flex items-center gap-4",
          isCentered ? "justify-center" : "justify-between",
        )}
      >
        <h2 className="text-2xl font-bold text-dark-gray-2">{title}</h2>

        {link &&
          (isExternalHref(link.href) ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-lg font-medium text-primary hover:underline",
                isCentered && "absolute right-0 top-1/2 -translate-y-1/2",
              )}
            >
              {link.text} <ArrowRight className="size-4" />
            </a>
          ) : (
            <Link
              to={link.href}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-lg font-medium text-primary hover:underline",
                isCentered && "absolute right-0 top-1/2 -translate-y-1/2",
              )}
            >
              {link.text} <ArrowRight className="size-4" />
            </Link>
          ))}
      </div>

      {children}
    </section>
  );
}
