import { useEditor } from "@/context/editor-context";
import { DEFAULT_STYLES, ElementNode } from "@/lib/page-builder/types";
import { Trash } from "lucide-react";

interface Props<K extends keyof ElementNode["styles"]> {
  element: ElementNode;
  styleKey: K;
}

export default function StyleResetButton<
  K extends keyof ElementNode["styles"],
>({ element, styleKey }: Props<K>) {
  const { updateElement } = useEditor();

  const value = element.styles[styleKey];
  const defaultValue = DEFAULT_STYLES[element.type][styleKey];

  const updateStyle = (key: K, value: ElementNode["styles"][K]) => {
    updateElement(element.id, {
      styles: {
        ...element.styles,
        [key]: value,
      },
    });
  };

  if (value === defaultValue) return null;

  return (
    <Trash
      onClick={() => updateStyle(styleKey, defaultValue!)}
      className="w-4 h-4 text-muted-foreground hover:cursor-pointer"
    />
  );
}
