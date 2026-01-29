"use server";

import { generateSite } from "@/packages/generator";
import fs from "fs/promises";
import path from "path";

export async function generateSiteAction(schema: any) {
  const outputDir = path.join(process.cwd(), "generated");

  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.mkdir(outputDir, { recursive: true });

  const files = generateSite(schema);

  for (const file of files) {
    const fullPath = path.join(outputDir, file.path);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, file.content, "utf8");
  }

  return { success: true };
}
