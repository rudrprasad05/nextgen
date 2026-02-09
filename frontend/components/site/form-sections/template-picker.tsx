"use client"

import { cn } from "@/lib/utils"
import { LayoutTemplate, FileText, ShoppingBag, BookOpen, Check } from "lucide-react"

const templates = [
  {
    id: "blank",
    name: "Blank Canvas",
    description: "Start from scratch with an empty page",
    icon: FileText,
  },
  {
    id: "landing",
    name: "Landing Page",
    description: "Hero, features, testimonials, CTA",
    icon: LayoutTemplate,
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Showcase your work with a gallery layout",
    icon: LayoutTemplate,
  },
  {
    id: "blog",
    name: "Blog",
    description: "Posts, categories, and author pages",
    icon: BookOpen,
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    description: "Product listings and shop pages",
    icon: ShoppingBag,
  },
  {
    id: "docs",
    name: "Documentation",
    description: "Sidebar navigation and content pages",
    icon: BookOpen,
  },
]

interface TemplatePickerProps {
  selectedTemplate: string
  onTemplateSelect: (templateId: string) => void
}

export function TemplatePicker({ selectedTemplate, onTemplateSelect }: TemplatePickerProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-2 border-b border-border">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
          <LayoutTemplate className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Start With a Template</h2>
          <p className="text-sm text-muted-foreground">Choose a starting point for your site</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {templates.map((template) => {
          const Icon = template.icon
          const isSelected = selectedTemplate === template.id

          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onTemplateSelect(template.id)}
              className={cn(
                "relative flex flex-col items-center p-4 rounded-lg border-2 transition-all text-left",
                "hover:border-primary/50 hover:bg-accent/50",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card"
              )}
            >
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                </div>
              )}
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-lg mb-3",
                  isSelected ? "bg-primary/10" : "bg-muted"
                )}
              >
                <Icon className={cn("w-5 h-5", isSelected ? "text-primary" : "text-muted-foreground")} />
              </div>
              <span className={cn("text-sm font-medium", isSelected ? "text-primary" : "text-foreground")}>
                {template.name}
              </span>
              <span className="text-xs text-muted-foreground text-center mt-1">
                {template.description}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
