import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getAuthorSectionVisibility } from "@/lib/authorProfile";

describe("getAuthorSectionVisibility", () => {
  it("only exposes populated optional profile sections", () => {
    expect(
      getAuthorSectionVisibility({
        expertise: ["Tax"],
        education: [],
        experience: [{ title: "Partner" }],
        achievements: undefined,
      }),
    ).toEqual({
      expertise: true,
      education: false,
      experience: true,
      achievements: false,
    });
  });

  it("ignores blank string list items and empty experience records", () => {
    expect(
      getAuthorSectionVisibility({
        expertise: ["  "],
        education: [""],
        experience: [{}],
        achievements: ["\n"],
      }),
    ).toEqual({
      expertise: false,
      education: false,
      experience: false,
      achievements: false,
    });
  });

  it("requires a profile slug in the author editing schema", () => {
    const schemaSource = readFileSync(
      path.resolve(process.cwd(), "src/sanity/schemaTypes/teamMember.ts"),
      "utf8",
    );
    const slugField = schemaSource.match(
      /name:\s*"slug"[\s\S]*?options:\s*\{\s*source:\s*"name",\s*maxLength:\s*96\s*\}[\s\S]*?\}\),/,
    )?.[0];

    expect(slugField).toContain("Rule.required()");
  });
});
