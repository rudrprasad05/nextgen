"use client";

import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import { EditorProvider, useEditor } from "@/context/editor-context";
import type { ElementType } from "@/lib/page-builder/types";
import { ELEMENT_LABELS } from "@/lib/page-builder/types";
import { ElementsPalette } from "./elements-palette";
import { EditorCanvas } from "./editor-canvas";
import { InspectorPanel } from "./inspector-panel";
import { TopBar } from "./top-bar";

function DragOverlayContent({ type }: { type: ElementType }) {
  return (
    <div className="px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-lg text-sm font-medium">
      {ELEMENT_LABELS[type]}
    </div>
  );
}

function EditorContent() {
  const { addElement, moveElement } = useEditor();
  const [activeType, setActiveType] = useState<ElementType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const data = active.data.current;

    if (data?.isNew && data?.type) {
      setActiveType(data.type as ElementType);
    } else if (data?.type) {
      setActiveType(data.type as ElementType);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveType(null);

    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    // Dropping a new element from palette
    if (activeData?.isNew && activeData?.type) {
      const type = activeData.type as ElementType;

      // Dropped on canvas root
      if (over.id === "canvas-root") {
        addElement(type);
        return;
      }

      // Dropped on a section
      if (overData?.type === "section" && overData?.sectionId) {
        addElement(type, overData.sectionId);
        return;
      }

      // Dropped on an existing element (add after it)
      addElement(type);
      return;
    }

    // Reordering existing elements
    if (active.id !== over.id && !activeData?.isNew) {
      const activeId = active.id as string;
      const overId = over.id as string;

      // Moving to a section
      if (overData?.type === "section" && overData?.sectionId) {
        moveElement(activeId, overId, overData.sectionId);
        return;
      }

      // Moving within root canvas
      if (over.id === "canvas-root" || overData?.parentId === undefined) {
        moveElement(activeId, overId);
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Can be used for visual feedback during drag
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="flex flex-col h-screen">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <ElementsPalette />
          <EditorCanvas />
          <InspectorPanel />
        </div>
      </div>

      <DragOverlay>
        {activeType && <DragOverlayContent type={activeType} />}
      </DragOverlay>
    </DndContext>
  );
}

export function PageBuilder() {
  return (
    <EditorProvider>
      <EditorContent />
    </EditorProvider>
  );
}
