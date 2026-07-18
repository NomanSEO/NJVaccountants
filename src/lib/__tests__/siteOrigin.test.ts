import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import { SITE_URL } from "@/config/site";

describe("production SEO origin", () => {
  it("uses the canonical www domain in shared site configuration", () => {
    expect(SITE_URL).toBe("https://www.njvaccountants.com");
  });

  it("publishes the canonical host and sitemap in robots metadata", () => {
    expect(robots()).toMatchObject({
      host: "https://www.njvaccountants.com",
      sitemap: "https://www.njvaccountants.com/sitemap.xml",
    });
  });

  it("derives root Open Graph metadata from SITE_URL", () => {
    const layoutSource = readFileSync(
      path.join(process.cwd(), "src", "app", "layout.tsx"),
      "utf8",
    );

    expect(layoutSource).toContain("url: SITE_URL");
    expect(layoutSource).not.toContain("njvaccountants.pk");
  });
});
