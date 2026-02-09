"use client";

import { generateSiteAction } from "@/actions/generateSite";
import { PageSchema } from "@/lib/page-builder/types";
import { Upload } from "lucide-react";
import { Button } from "../ui/button";

export function ExportButton({ schema }: { schema: PageSchema }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={async () => {
        await generateSiteAction(schema);
        alert("Site generated");
      }}
    >
      <Upload className="h-4 w-4 mr-2" />
      Export
    </Button>
  );
}
