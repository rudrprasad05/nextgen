"use client";

import React from "react";

import { useEditor } from "@/context/editor-context";
import type { ElementNode, ElementStyles } from "@/lib/page-builder/types";
import { ELEMENT_LABELS } from "@/lib/page-builder/types";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";

interface CanvasElementProps {
  element: ElementNode;
  parentId?: string;
  children?: ElementNode;
}

function parseCustomCss(cssString: string | undefined): React.CSSProperties {
  if (!cssString) return {};

  const styles: Record<string, string> = {};
  const declarations = cssString.split(";").filter(Boolean);

  for (const declaration of declarations) {
    const [property, value] = declaration.split(":").map((s) => s.trim());
    if (property && value) {
      const camelCase = property.replace(/-([a-z])/g, (_, letter) =>
        letter.toUpperCase(),
      );
      styles[camelCase] = value;
    }
  }

  return styles;
}

export function buildInlineStyles(styles: ElementStyles): React.CSSProperties {
  const inline: React.CSSProperties = {};

  if (styles.padding) inline.padding = styles.padding;
  if (styles.margin) inline.margin = styles.margin;
  if (styles.color) inline.color = styles.color;
  if (styles.background && styles.background !== "transparent")
    inline.background = styles.background;
  if (styles.fontSize) inline.fontSize = styles.fontSize;
  if (styles.fontWeight) inline.fontWeight = styles.fontWeight;
  if (styles.fontStyle)
    inline.fontStyle = styles.fontStyle as React.CSSProperties["fontStyle"];
  if (styles.textDecoration) inline.textDecoration = styles.textDecoration;
  if (styles.textAlign)
    inline.textAlign = styles.textAlign as React.CSSProperties["textAlign"];
  if (styles.lineHeight) inline.lineHeight = styles.lineHeight;
  if (styles.maxWidth) inline.maxWidth = styles.maxWidth;
  if (styles.width) inline.width = styles.width;
  if (styles.height) inline.height = styles.height;
  if (styles.objectFit)
    inline.objectFit = styles.objectFit as React.CSSProperties["objectFit"];
  if (styles.borderRadius) inline.borderRadius = styles.borderRadius;
  if (styles.flexDirection)
    inline.flexDirection =
      styles.flexDirection as React.CSSProperties["flexDirection"];
  if (styles.justifyContent) inline.justifyContent = styles.justifyContent;
  if (styles.alignItems) inline.alignItems = styles.alignItems;
  if (styles.gap) inline.gap = styles.gap;

  return { ...inline, ...parseCustomCss(styles.customCss) };
}

function ElementContent({ element }: { element: ElementNode }) {
  const styles = buildInlineStyles(element.styles);

  switch (element.type) {
    case "h1":
      return <h1 style={styles}>{element.props.content}</h1>;
    case "h2":
      return <h2 style={styles}>{element.props.content}</h2>;
    case "h3":
      return <h3 style={styles}>{element.props.content}</h3>;
    case "p":
      return <p style={styles}>{element.props.content}</p>;
    case "image":
      return (
        <img
          src={element.props.src || "/placeholder.svg"}
          alt={element.props.alt}
          style={styles}
          className="max-w-full"
        />
      );
    default:
      return null;
  }
}
function SectionDropZone({
  element,
}: {
  element: Extract<ElementNode, { type: "section" | "body" }>;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: element.id,
    data: {
      nodeId: element.id,
      accepts: "children",
    },
  });

  const styles = buildInlineStyles(element.styles);

  return (
    <div
      ref={setNodeRef}
      style={{
        ...styles,
        display: "flex",
        flexDirection: "column",
        minHeight: "60px",
      }}
      className={cn(
        "border border-dashed border-border rounded",
        isOver && "border-primary bg-primary/5",
      )}
    >
      {element.children?.length === 0 && (
        <div className="flex items-center justify-center w-full text-xs text-muted-foreground">
          Drop elements here
        </div>
      )}

      {element.children?.map((child) => (
        <CanvasElement key={child.id} element={child} parentId={element.id} />
      ))}
    </div>
  );
}

export function CanvasElement({
  element,
  parentId,
  children,
}: CanvasElementProps) {
  const { selectedId, setSelectedId, deleteElement } = useEditor();
  const isSelected = selectedId === element.id;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: element.id,
    data: { type: element.type, parentId },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedId(element.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteElement(element.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      className={cn(
        "group relative rounded",
        isSelected && "ring-2 ring-primary",
        !isSelected && "hover:ring-1 hover:ring-muted-foreground/30",
      )}
    >
      {/* Drag handle and delete button */}
      <div
        className={cn(
          "absolute -top-0 -left-0 -translate-y-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10",
          isSelected && "opacity-100",
        )}
      >
        <button
          {...attributes}
          {...listeners}
          className="p-1 bg-muted rounded cursor-grab hover:bg-accent"
        >
          <GripVertical className="h-3 w-3 text-muted-foreground" />
        </button>
        <span className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
          {ELEMENT_LABELS[element.type]}
        </span>
        <button
          onClick={handleDelete}
          className="p-1 bg-destructive/10 rounded hover:bg-destructive/20"
        >
          <Trash2 className="h-3 w-3 text-destructive" />
        </button>
      </div>

      {/* Element content */}
      <div className="p-1">
        {element.type === "section" ? (
          <SectionDropZone element={element} />
        ) : (
          <ElementContent element={element} />
        )}
      </div>
    </div>
  );
}
