"use client";

import { Button } from "@/components/ui/button";
import { useEditor } from "@/context/editor-context";
import {
  downloadFile,
  exportJSON,
  exportNextJS,
} from "@/lib/page-builder/export";
import { ArrowLeft, FileJson, RotateCcw } from "lucide-react";
import { ExportButton } from "./export-button";

export function TopBar() {
  const { schema, resetSchema } = useEditor();

  const handleExportJSON = () => {
    const json = exportJSON(schema);
    downloadFile(json, "page.json", "application/json");
  };

  const handleExportNextJS = () => {
    const code = exportNextJS(schema);
    downloadFile(code, "page.tsx", "text/typescript");
  };

  const handleReset = () => {
    if (
      confirm(
        "Are you sure you want to clear the canvas? This cannot be undone.",
      )
    ) {
      resetSchema();
    }
  };

  return (
    <header className="h-14 bg-background border-b border-border px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="p-0 rounded-full">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </Button>
        <h1 className="text-lg font-semibold text-foreground">Page Builder</h1>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
          {schema.elements.length} elements
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="text-muted-foreground bg-transparent"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Clear
        </Button>
        <Button variant="outline" size="sm" onClick={handleExportJSON}>
          <FileJson className="h-4 w-4 mr-2" />
          Export JSON
        </Button>
        <ExportButton schema={schema} />
      </div>
    </header>
  );
}
