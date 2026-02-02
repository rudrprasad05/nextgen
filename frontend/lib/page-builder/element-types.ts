export interface HeadingProps {
  content: string;
}

export interface ParagraphProps {
  content: string;
}

export interface ImageProps {
  src: string;
  alt?: string;
  loading?: "lazy" | "eager";
}

export interface SectionProps {
  as?: "section" | "div" | "main" | "header" | "footer";
}

export interface ElementPropsMap {
  h1: HeadingProps;
  h2: HeadingProps;
  h3: HeadingProps;
  p: ParagraphProps;
  image: ImageProps;
  section: SectionProps;
}
