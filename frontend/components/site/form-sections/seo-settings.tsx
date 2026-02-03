"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search } from "lucide-react"

interface SeoSettingsProps {
  seoTitle: string
  seoDescription: string
  onSeoTitleChange: (value: string) => void
  onSeoDescriptionChange: (value: string) => void
}

export function SeoSettings({
  seoTitle,
  seoDescription,
  onSeoTitleChange,
  onSeoDescriptionChange,
}: SeoSettingsProps) {
  const titleLength = seoTitle.length
  const descriptionLength = seoDescription.length

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-2 border-b border-border">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
          <Search className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Default SEO</h2>
          <p className="text-sm text-muted-foreground">Set default meta tags for your site</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="seo-title">Default Page Title</Label>
            <span className={`text-xs ${titleLength > 60 ? "text-destructive" : "text-muted-foreground"}`}>
              {titleLength}/60
            </span>
          </div>
          <Input
            id="seo-title"
            placeholder="My Website | Build Amazing Things"
            value={seoTitle}
            onChange={(e) => onSeoTitleChange(e.target.value)}
            className="h-11"
            maxLength={70}
          />
          <p className="text-xs text-muted-foreground">
            Appears in browser tabs and search results
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="seo-description">Default Meta Description</Label>
            <span className={`text-xs ${descriptionLength > 160 ? "text-destructive" : "text-muted-foreground"}`}>
              {descriptionLength}/160
            </span>
          </div>
          <Textarea
            id="seo-description"
            placeholder="A brief description of your website for search engines..."
            value={seoDescription}
            onChange={(e) => onSeoDescriptionChange(e.target.value)}
            rows={3}
            className="resize-none"
            maxLength={200}
          />
          <p className="text-xs text-muted-foreground">
            Shown in search engine results. Keep it under 160 characters.
          </p>
        </div>

        {/* Preview */}
        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Search Preview</p>
          <div className="space-y-1">
            <p className="text-sm font-medium text-primary truncate">
              {seoTitle || "Your Page Title"}
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 truncate">
              yoursite.com
            </p>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {seoDescription || "Your meta description will appear here. It helps search engines understand what your page is about."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
