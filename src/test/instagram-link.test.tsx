import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { InstagramLink } from "@/components/InstagramLink";

describe("Instagram no rodapé", () => {
  it("links the official Instagram logo to @mikaelnexmaia", () => {
    render(<InstagramLink />);

    const link = screen.getByRole("link", { name: /@mikaelnexmaia/ });
    expect(link).toHaveAttribute("href", "https://instagram.com/mikaelnexmaia");
    expect(link).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("img", { name: "Instagram" })).toBeInTheDocument();
  });

  it("shows the handle exactly as the user wrote it", () => {
    render(<InstagramLink />);

    expect(screen.getByText("@mikaelnexmaia")).toBeInTheDocument();
  });
});
