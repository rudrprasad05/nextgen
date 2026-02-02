import { HeadingProps, ParagraphProps } from "@/lib/page-builder/element-types";
import {
  ElementNode,
  ElementStyles,
  PageSchema,
} from "@/lib/page-builder/types";

export function generatePage(schema: PageSchema): string {
  return `
export default function Page() {
  return (
    <main>
      ${schema.elements.map(renderNode).join("\n")}
    </main>
  )
}
`;
}

function renderNode(node: ElementNode): string {
  switch (node.type) {
    case "h1":
      return `<h1 style={${generateReactStyleObject(node.styles)}}>${(node.props as HeadingProps).content}</h1>`;
    case "h2":
      return `<h2 style={${generateReactStyleObject(node.styles)}}>${(node.props as HeadingProps).content}</h2>`;
    case "h3":
      return `<h3 style={${generateReactStyleObject(node.styles)}}>${(node.props as HeadingProps).content}</h3>`;
    case "p":
      return `<p style={${generateReactStyleObject(node.styles)}}>${(node.props as ParagraphProps).content}</p>`;

    case "section":
      return `
        <div style={${generateReactStyleObject(node.styles)}}>
        ${node.children?.map(renderNode).join("\n") ?? ""}
        </div>
        `;

    default:
      return "";
  }
}
function generateReactStyleObject(styles: ElementStyles): string {
  const entries = Object.entries(styles)
    .filter(([, value]) => value !== undefined && value !== "")
    .map(([key, value]) => {
      const jsKey = key; // already camelCase
      const jsValue = typeof value === "number" ? value : `"${value}"`;

      return `${jsKey}: ${jsValue}`;
    });

  return `{ ${entries.join(", ")} }`;
}
