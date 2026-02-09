"use client";

import { useEditor } from "@/context/editor-context";
import { ViewportMode } from "@/lib/page-builder/types";
import { cn } from "@/lib/utils";
import { Laptop, Phone, Smartphone, TabletSmartphone } from "lucide-react";
import React, { useState } from "react";

export default function ViewPortToggle() {
  const { viewportMode, changeViewportMode } = useEditor();

  function handleIcon(mode: ViewportMode) {
    switch (mode) {
      case "desktop":
        return <Laptop className="w-4 h-4" />;
      case "tablet":
        return <TabletSmartphone className="w-4 h-4" />;
      case "mobile":
        return <Smartphone className="w-4 h-4" />;
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      {(["desktop", "tablet", "mobile"] as ViewportMode[]).map((mode) => (
        <button
          key={mode}
          onClick={() => changeViewportMode(mode)}
          className={cn(
            "px-3 py-1.5 text-sm rounded-md border transition-colors flex gap-2 items-center",
            viewportMode === mode
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-muted-foreground border-border hover:bg-muted",
          )}
        >
          {handleIcon(mode)}
          {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </button>
      ))}
    </div>
  );
}
