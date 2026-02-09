import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function PageCardSkeleton() {
  return (
    <Card className="p-4">
      <Skeleton className="mb-3 aspect-video w-full rounded-md" />
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1 space-y-1">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>
    </Card>
  )
}
