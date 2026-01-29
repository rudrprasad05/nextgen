import { PageSchema } from "@/lib/page-builder/types";
import { generateGitignore, generateNextConfig } from "./generate-config";
import { generateDockerfile } from "./generate-docker";
import { generateLayout } from "./generate-layout";
import { generatePage } from "./generate-page";
import { generatePackageJson } from "./generate-pk-json";

export type GeneratedFile = {
  path: string;
  content: string;
};

export function generateSite(schema: PageSchema): GeneratedFile[] {
  return [
    {
      path: "app/page.tsx",
      content: generatePage(schema),
    },
    {
      path: "app/layout.tsx",
      content: generateLayout(),
    },
    {
      path: "package.json",
      content: generatePackageJson(),
    },
    {
      path: "next.config.ts",
      content: generateNextConfig(),
    },
    {
      path: "Dockerfile",
      content: generateDockerfile(),
    },
    {
      path: ".gitignore",
      content: generateGitignore(),
    },
  ];
}
