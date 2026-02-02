import { ElementPropsMap } from "./element-types";

export type ElementType = "h1" | "h2" | "h3" | "p" | "image" | "section";

export interface ElementStyles {
  padding?: string;
  margin?: string;
  color?: string;
  background?: string;
  customCss?: string;
  // Text styles
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  fontSize?: string;
  textAlign?: string;
  lineHeight?: string;
  maxWidth?: string;
  // Image styles
  width?: string;
  height?: string;
  objectFit?: string;
  borderRadius?: string;
  // Section/Flex styles
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
}

export type ViewportMode = "desktop" | "tablet" | "mobile";

export const VIEWPORT_WIDTHS: Record<ViewportMode, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

export interface ElementNode<T extends ElementType = ElementType> {
  id: string;
  type: T;
  props: ElementPropsMap[T];
  styles: ElementStyles;
  children?: T extends "section" ? ElementNode[] : never;
}

export interface PageSchema {
  elements: ElementNode[];
}

export interface DragItem {
  type: ElementType;
  id?: string;
  isNew?: boolean;
}

export const DEFAULT_PROPS: Record<ElementType, Record<string, any>> = {
  h1: { content: "Heading 1" },
  h2: { content: "Heading 2" },
  h3: { content: "Heading 3" },
  p: {
    content:
      "This is a paragraph of text. Edit this content in the inspector panel.",
  },
  image: { src: "https://placehold.co/400x300", alt: "Placeholder image" },
  section: {},
};

export const DEFAULT_STYLES: Record<ElementType, ElementStyles> = {
  h1: { fontSize: "2.5rem", fontWeight: "700", textAlign: "left" },
  h2: { fontSize: "2rem", fontWeight: "600", textAlign: "left" },
  h3: { fontSize: "1.5rem", fontWeight: "600", textAlign: "left" },
  p: { fontSize: "1rem", lineHeight: "1.6", textAlign: "left" },
  image: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
    borderRadius: "0",
  },
  section: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    gap: "1rem",
    padding: "1rem",
    background: "transparent",
  },
};

export const ELEMENT_LABELS: Record<ElementType, string> = {
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  p: "Paragraph",
  image: "Image",
  section: "Section",
};
