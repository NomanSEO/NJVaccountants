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
});
