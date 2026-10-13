import { describe, expect, it } from "vitest";
import { NAV_LINKS } from "@/components/navigation";
import { coreServices } from "@/lib/ecommerceContent";

describe("main navigation", () => {
  it("offers the four relevant top-level destinations", () => {
    expect(NAV_LINKS.map((link) => link.label)).toEqual([
      "Services",
      "About",
      "Resources",
      "Contact",
    ]);
  });

  it("links each core service to its existing detail page", () => {
    expect(NAV_LINKS[0].children).toEqual(
      coreServices.map(({ href, title }) => ({ href, label: title })),
    );
  });
});
