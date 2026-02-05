"use client";

import { useEditor } from "@/context/editor-context";
import { VIEWPORT_WIDTHS } from "@/lib/page-builder/types";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { buildInlineStyles, CanvasElement } from "./canvas-element";
import ViewPortToggle from "./viewport-toggle";

export function EditorCanvas() {
  const { schema, setSelectedId, viewportMode } = useEditor();

  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-root",
    data: { type: "canvas" },
  });

  const handleCanvasClick = (e: React.MouseEvent) => {
    // setSelectedId(null);
    // if (e.target === e.currentTarget) {
    setSelectedId("body"); // select the root
    // }
  };

  return (
    <div className="flex-1 bg-muted/30 p-6 overflow-y-auto">
      <div
        className="mx-auto transition-all duration-300"
        style={{ width: VIEWPORT_WIDTHS[viewportMode] }}
      >
        <ViewPortToggle />
        <div
          ref={setNodeRef}
          onClick={handleCanvasClick}
          className={cn(
            "rounded-lg transition-colors", // optional default styling
            isOver && "border-primary border-2 bg-primary/5",
          )}
          style={{
            ...buildInlineStyles(schema.root.styles),
          }}
        >
          {!schema.root.children || schema.root.children?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 text-muted-foreground">
              <p className="text-lg font-medium">Your canvas is empty</p>
              <p className="text-sm">
                Drag elements from the left panel to get started
              </p>
            </div>
          ) : (
            <SortableContext
              items={schema.root.children.map((el) => el.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-4">
                {schema.root.children?.map((element) => (
                  <CanvasElement
                    key={element.id}
                    element={element}
                    parentId={schema.root.id}
                  />
                ))}
              </div>
            </SortableContext>
          )}
        </div>
      </div>
    </div>
  );
}
