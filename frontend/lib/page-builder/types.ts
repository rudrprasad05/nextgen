export type ElementType =
  | "h1"
  | "h2"
  | "h3"
  | "p"
  | "image"
  | "section"
  | "body";

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
  maxHeight?: string;
  minWidth?: string;
  minHeight?: string;
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

export type ElementPropsMap = {
  body: {
    background?: string;
    fontFamily?: string;
  };

  section: {};

  h1: { content: string };
  h2: { content: string };
  h3: { content: string };
  p: { content: string };

  image: {
    src: string;
    alt?: string;
  };
};

interface BaseElementNode {
  id: string;
  children?: ElementNode[];
  styles: ElementStyles;
}

export type ViewportMode = "desktop" | "tablet" | "mobile";

export const VIEWPORT_WIDTHS: Record<ViewportMode, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

export interface MetaData {
  title: string;
  description?: string;
  slug?: string;
  createdOn?: string;
  updatedOn?: string;
}

export type ElementNode =
  | (BaseElementNode & {
      type: "body";
      props: ElementPropsMap["body"];
    })
  | (BaseElementNode & {
      type: "section";
      props: ElementPropsMap["section"];
    })
  | (BaseElementNode & {
      type: "h1";
      props: ElementPropsMap["h1"];
    })
  | (BaseElementNode & {
      type: "h2";
      props: ElementPropsMap["h2"];
    })
  | (BaseElementNode & {
      type: "h3";
      props: ElementPropsMap["h3"];
    })
  | (BaseElementNode & {
      type: "p";
      props: ElementPropsMap["p"];
    })
  | (BaseElementNode & {
      type: "image";
      props: ElementPropsMap["image"];
    });

export interface PageSchema {
  root: ElementNode;
  meta: MetaData;
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
  body: {},
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
  body: {
    height: "100%",
    background: "#fff",
  },
};

export const ELEMENT_LABELS: Record<ElementType, string> = {
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  p: "Paragraph",
  image: "Image",
  section: "Section",
  body: "Body",
};
