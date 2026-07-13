// sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { table } from "@sanity/table";
import { schemaTypes } from "./src/sanity/schema";

export default defineConfig({
  name: "njv-accountants",
  title: "NJV Accountants",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  plugins: [structureTool(), table()],
  schema: { types: schemaTypes },
});
