"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Site } from "@/lib/dashboard/types";
import { useRouter } from "next/navigation";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

interface SiteCardProps {
  site: Site;
}

export function SiteCard({ site }: SiteCardProps) {
  const router = useRouter();

  return (
    <Card
      className="group cursor-pointer p-4 transition-shadow hover:shadow-md"
      onClick={() => router.push(`/?site=${site.id}`)}
    >
      <div className="mb-3 flex aspect-video items-center justify-center rounded-md bg-muted">
        <span className="text-2xl font-semibold text-muted-foreground/40">
          {site.name.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className="space-y-1">
        <h3 className="truncate font-medium text-foreground group-hover:text-primary">
          {site.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {formatDate(site.updatedAt)}
          </span>
          <Badge
            variant={site.status === "published" ? "default" : "secondary"}
            className="text-xs"
          >
            {site.status === "published" ? "Published" : "Draft"}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
