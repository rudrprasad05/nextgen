"use client";

import { useParams, useRouter } from "next/navigation";
import { MoreHorizontal, Eye, Pencil, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageStatus, type Page } from "@/lib/models";
import { useSite } from "@/context/SiteContext";

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

interface PageCardProps {
  page: Page;
}

export function PageCard({ page }: PageCardProps) {
  const router = useRouter();
  const params = useParams();

  const handleEdit = () => {
    router.push(`/${params.subdomain}/admin/pages/${page.id}`);
  };

  const handleView = () => {
    window.open(`/${params.subdomain}`, "_blank");
  };

  return (
    <Card
      className="group cursor-pointer p-4 transition-shadow hover:shadow-md"
      onClick={handleEdit}
    >
      <div className="mb-3 flex aspect-video items-center justify-center rounded-md bg-muted">
        <span className="text-lg font-medium text-muted-foreground/40">
          {page.title.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-medium text-foreground group-hover:text-primary">
              {page.title}
            </h3>
            <p className="truncate text-xs text-muted-foreground">
              {page.slug}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleView}>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </DropdownMenuItem>
              {page.status === PageStatus.Published && (
                <DropdownMenuItem onClick={handleView}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {formatDate(page.updatedOn)}
          </span>
          <Badge
            variant={
              page.status === PageStatus.Published ? "default" : "secondary"
            }
            className="text-xs"
          >
            {page.status === PageStatus.Published ? "Published" : "Draft"}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
