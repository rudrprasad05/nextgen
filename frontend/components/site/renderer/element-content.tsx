import { buildInlineStyles } from "@/components/page-builder/canvas-element";
import { ElementNode } from "@/lib/page-builder/types";

export function ElementContent({ element }: { element: ElementNode }) {
  const styles = buildInlineStyles(element.styles);

  switch (element.type) {
    case "H1":
      return <h1 style={styles}>{element.props.content}</h1>;
    case "H2":
      return <h2 style={styles}>{element.props.content}</h2>;
    case "H3":
      return <h3 style={styles}>{element.props.content}</h3>;
    case "P":
      return <p style={styles}>{element.props.content}</p>;
    case "Image":
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
