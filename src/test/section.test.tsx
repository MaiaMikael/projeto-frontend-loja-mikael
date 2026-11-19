import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Section } from "@/components/Section";

// Requisito 4.1: título em dark-gray-2 com fonte de 24px (text-2xl), link em primary
// com fonte de 18px (text-lg) à direita, titleAlign com "left" como padrão.
describe("Section (requisito 4.1)", () => {
  it("renders the title in dark-gray-2 at 24px", () => {
    render(
      <Section title="Produtos em alta">
        <p>conteúdo</p>
      </Section>,
    );

    const title = screen.getByRole("heading", { level: 2, name: "Produtos em alta" });
    expect(title).toHaveClass("text-dark-gray-2");
    expect(title).toHaveClass("text-2xl");
  });

  it("keeps the title left by default and centers it when titleAlign is center", () => {
    const { rerender } = render(
      <Section title="Coleções">
        <span />
      </Section>,
    );

    let title = screen.getByRole("heading", { level: 2, name: "Coleções" });
    expect(title.parentElement).toHaveClass("justify-between");
    expect(title.parentElement).not.toHaveClass("justify-center");

    rerender(
      <Section title="Coleções" titleAlign="center">
        <span />
      </Section>,
    );

    title = screen.getByRole("heading", { level: 2, name: "Coleções" });
    expect(title.parentElement).toHaveClass("justify-center");
  });

  it("renders the link on the right in primary at 18px, also beside a centered title", () => {
    render(
      <Section
        title="Coleções em destaque"
        titleAlign="center"
        link={{ text: "Show More", href: "https://redirect.link" }}
      >
        <span />
      </Section>,
    );

    const link = screen.getByRole("link", { name: /Show More/ });
    expect(link).toHaveAttribute("href", "https://redirect.link");
    expect(link).toHaveClass("text-primary");
    expect(link).toHaveClass("text-lg");
    expect(link).toHaveClass("right-0");
    expect(link.parentElement).toBe(screen.getByRole("heading", { level: 2 }).parentElement);
  });

  it("renders every child passed between the tags", () => {
    render(
      <Section title="Novidades">
        <p>primeiro filho</p>
        <p>segundo filho</p>
      </Section>,
    );

    expect(screen.getByText("primeiro filho")).toBeInTheDocument();
    expect(screen.getByText("segundo filho")).toBeInTheDocument();
  });
});
