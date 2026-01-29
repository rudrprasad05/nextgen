import { ElementNode, PageSchema } from "@/lib/page-builder/types";

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
      return `<h1>${node.props.text}</h1>`;

    case "p":
      return `<p>${node.props.text}</p>`;

    case "section":
      return `
<div>
  ${node.children?.map(renderNode).join("\n") ?? ""}
</div>
`;

    default:
      return "";
  }
}
