export enum ElementType {
  H1 = "H1",
  H2 = "H2",
  H3 = "H3",
  P = "P",
  Image = "Image",
  Section = "Section",
  Body = "Body",
}

export type ElementPropsMap = {
  Body: {
    background?: string;
    fontFamily?: string;
  };

  Section: {};

  H1: { content: string };
  H2: { content: string };
  H3: { content: string };
  P: { content: string };

  Image: {
    src: string;
    alt?: string;
  };
};

export interface PageSchema {
  root: ElementNode;
  metadata: MetaData;
}

export interface MetaData {
  title: string;
  description?: string;
  slug?: string;
  createdOn?: string;
  updatedOn?: string;
}

interface BaseElementNode {
  id: string;
  children?: ElementNode[];
  styles: ElementStyles;
}

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

export type ElementNode =
  | (BaseElementNode & {
      type: "Body";
      props: ElementPropsMap["Body"];
    })
  | (BaseElementNode & {
      type: "Section";
      props: ElementPropsMap["Section"];
    })
  | (BaseElementNode & {
      type: "H1";
      props: ElementPropsMap["H1"];
    })
  | (BaseElementNode & {
      type: "H2";
      props: ElementPropsMap["H2"];
    })
  | (BaseElementNode & {
      type: "H3";
      props: ElementPropsMap["H3"];
    })
  | (BaseElementNode & {
      type: "P";
      props: ElementPropsMap["P"];
    })
  | (BaseElementNode & {
      type: "Image";
      props: ElementPropsMap["Image"];
    });

export type ViewportMode = "desktop" | "tablet" | "mobile";

export const VIEWPORT_WIDTHS: Record<ViewportMode, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

export interface DragItem {
  type: ElementType;
  id?: string;
  isNew?: boolean;
}

export const DEFAULT_PROPS: Record<ElementType, Record<string, any>> = {
  H1: { content: "Heading 1" },
  H2: { content: "Heading 2" },
  H3: { content: "Heading 3" },
  P: {
    content:
      "This is a paragraph of text. Edit this content in the inspector panel.",
  },
  Image: { src: "https://placehold.co/400x300", alt: "Placeholder image" },
  Section: {},
  Body: {},
};

export const DEFAULT_STYLES: Record<ElementType, ElementStyles> = {
  H1: { fontSize: "2.5rem", fontWeight: "700", textAlign: "left" },
  H2: { fontSize: "2rem", fontWeight: "600", textAlign: "left" },
  H3: { fontSize: "1.5rem", fontWeight: "600", textAlign: "left" },
  P: { fontSize: "1rem", lineHeight: "1.6", textAlign: "left" },
  Image: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
    borderRadius: "0",
  },
  Section: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    gap: "1rem",
    padding: "1rem",
    background: "transparent",
  },
  Body: {
    height: "100%",
    background: "#fff",
  },
};

export const ELEMENT_LABELS: Record<ElementType, string> = {
  H1: "Heading 1",
  H2: "Heading 2",
  H3: "Heading 3",
  P: "Paragraph",
  Image: "Image",
  Section: "Section",
  Body: "Body",
};
