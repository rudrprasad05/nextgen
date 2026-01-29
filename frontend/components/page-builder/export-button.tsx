"use client";

import { generateSiteAction } from "@/actions/generateSite";
import { PageSchema } from "@/lib/page-builder/types";

export function ExportButton({ schema }: { schema: PageSchema }) {
  return (
    <button
      onClick={async () => {
        await generateSiteAction(schema);
        alert("Site generated");
      }}
    >
      Export Next.js Site
    </button>
  );
}
