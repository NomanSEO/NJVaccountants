import type { AuthorExperience } from "@/types";

interface OptionalAuthorSections {
  expertise?: string[];
  education?: string[];
  experience?: AuthorExperience[];
  achievements?: string[];
}

function hasTextItems(items: string[] | undefined): boolean {
  return Boolean(items?.some((item) => item.trim()));
}

function hasExperience(items: AuthorExperience[] | undefined): boolean {
  return Boolean(
    items?.some((item) =>
      [item.title, item.organization, item.period, item.description].some(
        (value) => value?.trim(),
      ),
    ),
  );
}

export function getAuthorSectionVisibility(author: OptionalAuthorSections) {
  return {
    expertise: hasTextItems(author.expertise),
    education: hasTextItems(author.education),
    experience: hasExperience(author.experience),
    achievements: hasTextItems(author.achievements),
  };
}
