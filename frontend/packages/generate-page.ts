import {
  ElementNode,
  ElementStyles,
  ElementType,
  PageSchema,
} from "@/lib/page-builder/types";

export function generatePage(schema: PageSchema): string {
  return `
export default function Page() {
  return (
    <main>
      ${schema.root.children?.map(renderNode).join("\n")}
    </main>
  )
}
`;
}

export function renderNode(node: ElementNode): string {
  switch (node.type) {
    case ElementType.H1:
      return `<h1 style={${generateReactStyleObject(node.styles)}}>${node.props.content}</h1>`;
    case ElementType.H2:
      return `<h2 style={${generateReactStyleObject(node.styles)}}>${node.props.content}</h2>`;
    case ElementType.H3:
      return `<h3 style={${generateReactStyleObject(node.styles)}}>${node.props.content}</h3>`;
    case ElementType.P:
      return `<p style={${generateReactStyleObject(node.styles)}}>${node.props.content}</p>`;

    case ElementType.Section:
      return `
        <div style={${generateReactStyleObject(node.styles)}}>
        ${node.children?.map(renderNode).join("\n") ?? ""}
        </div>
        `;

    default:
      return "";
  }
}
export function generateReactStyleObject(styles: ElementStyles): string {
  const entries = Object.entries(styles)
    .filter(([, value]) => value !== undefined && value !== "")
    .map(([key, value]) => {
      const jsKey = key; // already camelCase
      const jsValue = typeof value === "number" ? value : `"${value}"`;

      return `${jsKey}: ${jsValue}`;
    });

  return `{ ${entries.join(", ")} }`;
}
