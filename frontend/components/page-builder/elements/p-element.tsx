import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEditor } from "@/context/editor-context";
import { DEFAULT_STYLES, ElementNode } from "@/lib/page-builder/types";
import StyleResetButton from "../style-reset-button";

export default function PElement({ element }: { element: ElementNode }) {
  const { updateElement } = useEditor();

  const updateProp = (key: string, value: string) => {
    updateElement(element.id, { props: { ...element.props, [key]: value } });
  };

  const updateStyle = (key: string, value: string) => {
    updateElement(element.id, { styles: { ...element.styles, [key]: value } });
  };

  if (element.type != "p") return;
  return (
    <section className="space-y-3">
      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Content
      </h3>
      <div className="space-y-2">
        <Label htmlFor="content" className="text-xs">
          Text
        </Label>
        <Textarea
          id="content"
          value={element.props.content || ""}
          onChange={(e) => updateProp("content", e.target.value)}
          className="text-sm min-h-24"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="lineHeight" className="text-xs">
            Line Height
          </Label>
          <StyleResetButton element={element} styleKey={"lineHeight"} />
        </div>
        <Select
          value={element.styles.lineHeight || DEFAULT_STYLES.p.lineHeight}
          onValueChange={(value) => updateStyle("lineHeight", value)}
        >
          <SelectTrigger className="h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1.2">Tight</SelectItem>
            <SelectItem value="1.4">Normal</SelectItem>
            <SelectItem value="1.6">Relaxed</SelectItem>
            <SelectItem value="2">Loose</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="maxWidth" className="text-xs">
            Max Width
          </Label>
          <StyleResetButton element={element} styleKey={"maxWidth"} />
        </div>

        <Select
          value={element.styles.maxWidth || "none"}
          onValueChange={(value) =>
            updateStyle("maxWidth", value === "none" ? "" : value)
          }
        >
          <SelectTrigger className="h-8 text-sm">
            <SelectValue placeholder="None" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="400px">Small (400px)</SelectItem>
            <SelectItem value="600px">Medium (600px)</SelectItem>
            <SelectItem value="800px">Large (800px)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
