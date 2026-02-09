"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { ELEMENT_LABELS, ElementType } from "@/lib/page-builder/types";
import { cn } from "@/lib/utils";
import { Bold, Italic, Trash, Underline } from "lucide-react";
import PElement from "./elements/p-element";
import StyleResetButton from "./style-reset-button";

export function InspectorPanel() {
  const {
    selectedId,
    setSelectedId,
    getElement,
    updateElement,
    deleteElement,
  } = useEditor();

  const element = selectedId ? getElement(selectedId) : null;
  const isRoot = selectedId === "body";

  if (!element) {
    setSelectedId("body");
    return (
      <div className="w-72 bg-background border-l border-border p-4">
        <h2 className="text-sm font-semibold text-foreground mb-4">
          Inspector
        </h2>
        <p className="text-sm text-muted-foreground">
          Select an element on the canvas to edit its properties.
        </p>
      </div>
    );
  }

  const updateProp = (key: string, value: string) => {
    updateElement(element.id, { props: { ...element.props, [key]: value } });
  };

  const updateStyle = (key: string, value: string) => {
    updateElement(element.id, { styles: { ...element.styles, [key]: value } });
  };

  const toggleStyle = (key: string, onValue: string, offValue: string) => {
    const current = element.styles[key as keyof typeof element.styles];
    updateStyle(key, current === onValue ? offValue : onValue);
  };

  return (
    <div className="w-72 bg-background border-l border-border p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-2 w-full grow">
          <h2 className="text-sm font-semibold text-foreground">
            {ELEMENT_LABELS[element.type]}
          </h2>
          <div className="relative w-full">
            <p className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              #
            </p>
            <Input
              id="content"
              value={element.id || ""}
              onChange={(e) => updateProp("id", e.target.value)}
              className="h-8 text-sm w-full"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Element-specific controls */}
        {(element.type === "H1" ||
          element.type === "H2" ||
          element.type === "H3") && (
          <section className="space-y-3">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Content
            </h3>
            <div className="space-y-2">
              <Label htmlFor="content" className="text-xs">
                Text
              </Label>

              <Input
                id="content"
                value={element.props.content || ""}
                onChange={(e) => updateProp("content", e.target.value)}
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="fontSize" className="text-xs">
                  Font Size
                </Label>
                <StyleResetButton element={element} styleKey={"fontSize"} />
              </div>
              <Select
                value={element.styles.fontSize || "2rem"}
                onValueChange={(value) => updateStyle("fontSize", value)}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.5rem">Small</SelectItem>
                  <SelectItem value="2rem">Medium</SelectItem>
                  <SelectItem value="2.5rem">Large</SelectItem>
                  <SelectItem value="3rem">Extra Large</SelectItem>
                  <SelectItem value="4rem">Huge</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-xs">Text Align</Label>
                <StyleResetButton element={element} styleKey={"textAlign"} />
              </div>
              <div className="flex gap-1">
                {(["left", "center", "right"] as const).map((align) => (
                  <Button
                    key={align}
                    variant="outline"
                    size="sm"
                    onClick={() => updateStyle("textAlign", align)}
                    className={cn(
                      "flex-1 h-8 text-xs capitalize",
                      element.styles.textAlign === align && "border-primary",
                    )}
                  >
                    {align}
                  </Button>
                ))}
              </div>
            </div>
          </section>
        )}

        <PElement element={element} />

        {element.type === "Image" && (
          <section className="space-y-3">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Image
            </h3>
            <div className="space-y-2">
              <Label htmlFor="src" className="text-xs">
                Image URL
              </Label>
              <Input
                id="src"
                value={element.props.src || ""}
                onChange={(e) => updateProp("src", e.target.value)}
                className="h-8 text-sm"
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alt" className="text-xs">
                Alt Text
              </Label>
              <Input
                id="alt"
                value={element.props.alt || ""}
                onChange={(e) => updateProp("alt", e.target.value)}
                className="h-8 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="width" className="text-xs">
                  Width
                </Label>
                <Input
                  id="width"
                  value={element.styles.width || "100%"}
                  onChange={(e) => updateStyle("width", e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height" className="text-xs">
                  Height
                </Label>
                <Input
                  id="height"
                  value={element.styles.height || "auto"}
                  onChange={(e) => updateStyle("height", e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="objectFit" className="text-xs">
                Object Fit
              </Label>
              <Select
                value={element.styles.objectFit || "cover"}
                onValueChange={(value) => updateStyle("objectFit", value)}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cover">Cover</SelectItem>
                  <SelectItem value="contain">Contain</SelectItem>
                  <SelectItem value="fill">Fill</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="borderRadius" className="text-xs">
                Border Radius
              </Label>
              <Select
                value={element.styles.borderRadius || "0"}
                onValueChange={(value) => updateStyle("borderRadius", value)}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">None</SelectItem>
                  <SelectItem value="0.25rem">Small</SelectItem>
                  <SelectItem value="0.5rem">Medium</SelectItem>
                  <SelectItem value="1rem">Large</SelectItem>
                  <SelectItem value="9999px">Full</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>
        )}

        {element.type === "Section" && (
          <section className="space-y-3">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Layout
            </h3>
            <div className="space-y-2">
              <Label className="text-xs">Direction</Label>
              <div className="flex gap-1">
                {(["column", "row"] as const).map((dir) => (
                  <Button
                    key={dir}
                    variant="outline"
                    size="sm"
                    onClick={() => updateStyle("flexDirection", dir)}
                    className={cn(
                      "flex-1 h-8 text-xs capitalize",
                      element.styles.flexDirection === dir && "bg-accent",
                    )}
                  >
                    {dir}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="justifyContent" className="text-xs">
                Justify Content
              </Label>
              <Select
                value={element.styles.justifyContent || "flex-start"}
                onValueChange={(value) => updateStyle("justifyContent", value)}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flex-start">Start</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="flex-end">End</SelectItem>
                  <SelectItem value="space-between">Space Between</SelectItem>
                  <SelectItem value="space-around">Space Around</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="alignItems" className="text-xs">
                Align Items
              </Label>
              <Select
                value={element.styles.alignItems || "stretch"}
                onValueChange={(value) => updateStyle("alignItems", value)}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stretch">Stretch</SelectItem>
                  <SelectItem value="flex-start">Start</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="flex-end">End</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gap" className="text-xs">
                Gap
              </Label>
              <Select
                value={element.styles.gap || "1rem"}
                onValueChange={(value) => updateStyle("gap", value)}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">None</SelectItem>
                  <SelectItem value="0.5rem">Small</SelectItem>
                  <SelectItem value="1rem">Medium</SelectItem>
                  <SelectItem value="1.5rem">Large</SelectItem>
                  <SelectItem value="2rem">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>
        )}

        {/* Common controls */}
        <section className="space-y-3 pt-4 border-t border-border">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Spacing
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="padding" className="text-xs">
                Padding
              </Label>
              <Input
                id="padding"
                value={element.styles.padding || ""}
                onChange={(e) => updateStyle("padding", e.target.value)}
                className="h-8 text-sm"
                placeholder="e.g. 1rem"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="margin" className="text-xs">
                Margin
              </Label>
              <Input
                id="margin"
                value={element.styles.margin || ""}
                onChange={(e) => updateStyle("margin", e.target.value)}
                className="h-8 text-sm"
                placeholder="e.g. 1rem"
              />
            </div>
          </div>
        </section>

        <section className="space-y-3 pt-4 border-t border-border">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Colors
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="color" className="text-xs">
                Text Color
              </Label>
              <div className="flex gap-1">
                <Input
                  id="color"
                  type="color"
                  value={element.styles.color || "#000000"}
                  onChange={(e) => updateStyle("color", e.target.value)}
                  className="h-8 w-10 p-1"
                />
                <Input
                  value={element.styles.color || ""}
                  onChange={(e) => updateStyle("color", e.target.value)}
                  className="h-8 text-sm flex-1"
                  placeholder="#000000"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="background" className="text-xs">
                Background
              </Label>
              <div className="flex gap-1">
                <Input
                  id="background"
                  type="color"
                  value={element.styles.background || "#ffffff"}
                  onChange={(e) => updateStyle("background", e.target.value)}
                  className="h-8 w-10 p-1"
                />
                <Input
                  value={element.styles.background || ""}
                  onChange={(e) => updateStyle("background", e.target.value)}
                  className="h-8 text-sm flex-1"
                  placeholder="transparent"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3 pt-4 border-t border-border">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Text Style
          </h3>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleStyle("fontWeight", "700", "400")}
              className={cn(
                "h-8",
                element.styles.fontWeight === "700" && "bg-accent",
              )}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleStyle("fontStyle", "italic", "normal")}
              className={cn(
                "h-8",
                element.styles.fontStyle === "italic" && "bg-accent",
              )}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleStyle("textDecoration", "underline", "none")}
              className={cn(
                "h-8",
                element.styles.textDecoration === "underline" && "bg-accent",
              )}
            >
              <Underline className="h-4 w-4" />
            </Button>
          </div>
        </section>

        <section className="space-y-3 pt-4 border-t border-border">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Custom CSS
          </h3>
          <Textarea
            value={element.styles.customCss || ""}
            onChange={(e) => updateStyle("customCss", e.target.value)}
            className="text-sm font-mono min-h-20"
            placeholder="property: value; ..."
          />
          <p className="text-xs text-muted-foreground">
            Add custom CSS properties (e.g., box-shadow: 0 2px 4px
            rgba(0,0,0,0.1);)
          </p>
        </section>
        {element.type != ElementType.Body && (
          <section className="space-y-3 pt-4 border rounded-lg border-rose-500 bg-rose-400/20 border-dashed p-4">
            <h3 className="text-xs font-medium text-rose-500 uppercase tracking-wider">
              Danger Zone
            </h3>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteElement(element.id)}
              disabled={isRoot}
            >
              <Trash />
              Delete Element
            </Button>
          </section>
        )}
      </div>
    </div>
  );
}
