"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useEditor } from "@/lib/page-builder/editor-context"
import { CanvasElement } from "./canvas-element"
import { cn } from "@/lib/utils"

export function EditorCanvas() {
  const { schema, setSelectedId } = useEditor()
  
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-root",
    data: { type: "canvas" }
  })

  const handleCanvasClick = () => {
    setSelectedId(null)
  }

  return (
    <div className="flex-1 bg-muted/30 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div
          ref={setNodeRef}
          onClick={handleCanvasClick}
          className={cn(
            "min-h-[600px] bg-background border border-border rounded-lg p-6 shadow-sm transition-colors",
            isOver && "border-primary border-2 bg-primary/5"
          )}
        >
          {schema.elements.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 text-muted-foreground">
              <p className="text-lg font-medium">Your canvas is empty</p>
              <p className="text-sm">Drag elements from the left panel to get started</p>
            </div>
          ) : (
            <SortableContext
              items={schema.elements.map((el) => el.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-4">
                {schema.elements.map((element) => (
                  <CanvasElement key={element.id} element={element} />
                ))}
              </div>
            </SortableContext>
          )}
        </div>
      </div>
    </div>
  )
}
