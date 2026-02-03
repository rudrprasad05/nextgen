"use client"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"

interface NewSiteCardProps {
  onCreateSite: () => string
}

export function NewSiteCard({ onCreateSite }: NewSiteCardProps) {
  const router = useRouter()

  const handleClick = () => {
    const newSiteId = onCreateSite()
    router.push(`/?site=${newSiteId}`)
  }

  return (
    <Card
      className="group flex cursor-pointer flex-col items-center justify-center border-2 border-dashed border-border bg-transparent p-4 transition-colors hover:border-primary/50 hover:bg-muted/50"
      onClick={handleClick}
    >
      <div className="mb-3 flex aspect-video w-full items-center justify-center rounded-md">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/30 transition-colors group-hover:border-primary/50">
          <Plus className="h-6 w-6 text-muted-foreground/50 transition-colors group-hover:text-primary" />
        </div>
      </div>
      <div className="space-y-1 text-center">
        <h3 className="font-medium text-muted-foreground group-hover:text-foreground">
          New Site
        </h3>
        <span className="text-xs text-muted-foreground/60">
          Create a new project
        </span>
      </div>
    </Card>
  )
}
