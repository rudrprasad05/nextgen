"use client";

import React from "react";

import { ELEMENT_LABELS, ElementType } from "@/lib/page-builder/types";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  LayoutGrid,
  Type,
} from "lucide-react";

type ElementTypeWithoutBody = Exclude<ElementType, ElementType.Body>;

const ELEMENT_ICONS: Record<ElementTypeWithoutBody, React.ReactNode> = {
  H1: <Heading1 className="h-5 w-5" />,
  H2: <Heading2 className="h-5 w-5" />,
  H3: <Heading3 className="h-5 w-5" />,
  P: <Type className="h-5 w-5" />,
  Image: <ImageIcon className="h-5 w-5" />,
  Section: <LayoutGrid className="h-5 w-5" />,
};

interface DraggableElementProps {
  type: ElementTypeWithoutBody;
}

function DraggableElement({ type }: DraggableElementProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `palette-${type}`,
      data: { type, isNew: true },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg cursor-grab hover:border-primary/50 hover:bg-accent transition-colors"
    >
      <div className="text-muted-foreground">{ELEMENT_ICONS[type]}</div>
      <span className="text-sm font-medium text-foreground">
        {ELEMENT_LABELS[type]}
      </span>
    </div>
  );
}

export function ElementsPalette() {
  return (
    <div className="w-56 bg-background border-r border-border p-4 flex flex-col gap-2 overflow-y-auto">
      <h2 className="text-sm font-semibold text-foreground mb-2">Elements</h2>
      <div className="flex flex-col gap-2">
        {Object.values(ElementType)
          .filter((type) => type !== ElementType.Body)
          .map((type) => (
            <DraggableElement key={type} type={type} />
          ))}
      </div>
    </div>
  );
}
