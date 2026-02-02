import type { ElementNode, ElementStyles, PageSchema } from "./types";

export function exportJSON(schema: PageSchema): string {
  return JSON.stringify(schema, null, 2);
}

function stylesToTailwind(styles: ElementStyles): string {
  const classes: string[] = [];

  // Map common style patterns to Tailwind
  if (styles.textAlign === "center") classes.push("text-center");
  if (styles.textAlign === "right") classes.push("text-right");
  if (styles.textAlign === "left") classes.push("text-left");

  if (styles.fontWeight === "700" || styles.fontWeight === "bold")
    classes.push("font-bold");
  if (styles.fontWeight === "600") classes.push("font-semibold");

  if (styles.fontStyle === "italic") classes.push("italic");
  if (styles.textDecoration === "underline") classes.push("underline");

  if (styles.flexDirection === "row") classes.push("flex-row");
  if (styles.flexDirection === "column") classes.push("flex-col");

  if (styles.justifyContent === "center") classes.push("justify-center");
  if (styles.justifyContent === "flex-end") classes.push("justify-end");
  if (styles.justifyContent === "space-between")
    classes.push("justify-between");
  if (styles.justifyContent === "space-around") classes.push("justify-around");

  if (styles.alignItems === "center") classes.push("items-center");
  if (styles.alignItems === "flex-start") classes.push("items-start");
  if (styles.alignItems === "flex-end") classes.push("items-end");

  return classes.join(" ");
}

function stylesToInline(styles: ElementStyles): Record<string, string> {
  const inline: Record<string, string> = {};

  if (styles.padding) inline.padding = styles.padding;
  if (styles.margin) inline.margin = styles.margin;
  if (styles.color) inline.color = styles.color;
  if (styles.background && styles.background !== "transparent")
    inline.background = styles.background;
  if (styles.fontSize) inline.fontSize = styles.fontSize;
  if (styles.lineHeight) inline.lineHeight = styles.lineHeight;
  if (styles.maxWidth) inline.maxWidth = styles.maxWidth;
  if (styles.width) inline.width = styles.width;
  if (styles.height) inline.height = styles.height;
  if (styles.objectFit) inline.objectFit = styles.objectFit;
  if (styles.borderRadius) inline.borderRadius = styles.borderRadius;
  if (styles.gap) inline.gap = styles.gap;

  // Parse custom CSS
  if (styles.customCss) {
    const declarations = styles.customCss.split(";").filter(Boolean);
    for (const declaration of declarations) {
      const [property, value] = declaration.split(":").map((s) => s.trim());
      if (property && value) {
        const camelCase = property.replace(/-([a-z])/g, (_, letter) =>
          letter.toUpperCase(),
        );
        inline[camelCase] = value;
      }
    }
  }

  return inline;
}

function generateStyleProp(styles: ElementStyles): string {
  const inline = stylesToInline(styles);
  if (Object.keys(inline).length === 0) return "";

  const entries = Object.entries(inline)
    .map(([key, value]) => `${key}: "${value}"`)
    .join(", ");

  return ` style={{ ${entries} }}`;
}

function generateClassName(
  styles: ElementStyles,
  additionalClasses: string = "",
): string {
  const tailwind = stylesToTailwind(styles);
  const combined = [tailwind, additionalClasses].filter(Boolean).join(" ");
  return combined ? ` className="${combined}"` : "";
}

function elementToJSX(element: ElementNode, indent: number = 2): string {
  const spaces = " ".repeat(indent);
  const className = generateClassName(element.styles);
  const styleProp = generateStyleProp(element.styles);

  switch (element.type) {
    case "h1":
      return `${spaces}<h1${className}${styleProp}>${escapeJSX(element.props.content || "")}</h1>`;
    case "h2":
      return `${spaces}<h2${className}${styleProp}>${escapeJSX(element.props.content || "")}</h2>`;
    case "h3":
      return `${spaces}<h3${className}${styleProp}>${escapeJSX(element.props.content || "")}</h3>`;
    case "p":
      return `${spaces}<p${className}${styleProp}>${escapeJSX(element.props.content || "")}</p>`;
    case "image":
      const imgClass = generateClassName(element.styles, "max-w-full");
      return `${spaces}<img${imgClass}${styleProp} src="${element.props.src || ""}" alt="${element.props.alt || ""}" />`;
    case "section":
      const sectionClass = generateClassName(element.styles, "flex");
      if (!element.children || element.children.length === 0) {
        return `${spaces}<section${sectionClass}${styleProp} />`;
      }
      const childrenJSX = element.children
        .map((child) => elementToJSX(child, indent + 2))
        .join("\n");
      return `${spaces}<section${sectionClass}${styleProp}>\n${childrenJSX}\n${spaces}</section>`;
    default:
      return "";
  }
}

function escapeJSX(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function exportNextJS(schema: PageSchema): string {
  const elementsJSX = schema.root.children
    ?.map((el) => elementToJSX(el, 4))
    .join("\n");

  return `export default function Page() {
  return (
    <main className="min-h-screen p-6">
${elementsJSX || "      {/* Your content here */}"}
    </main>
  )
}
`;
}

export function downloadFile(
  content: string,
  filename: string,
  type: string = "application/json",
) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
