import { describe, expect, it } from "vitest";
import { NAV_LINKS } from "@/components/navigation";
import { coreServices } from "@/lib/ecommerceContent";

describe("main navigation", () => {
  it("keeps the calculator directory accessible from the main navigation", () => {
    expect(NAV_LINKS.map((link) => link.label)).toEqual([
      "Services",
      "About",
      "Resources",
      "Calculators",
      "Contact",
    ]);
  });

  it("links each core service to its existing detail page", () => {
    expect(NAV_LINKS[0].children).toEqual(
      coreServices.map(({ href, title }) => ({ href, label: title })),
    );
  });
});
