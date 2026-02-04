"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Site } from "@/lib/models";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const [isImageValid, setIsImageValid] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const goToSubdomainAdmin = () => {
    // Read your base URL from env, e.g. NEXT_PUBLIC_BASE_URL=https://domain.com
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Construct subdomain URL
    const subdomainUrl = new URL(baseUrl);
    subdomainUrl.hostname = `${site.slug}.${subdomainUrl.hostname}`; // site.slug as subdomain
    subdomainUrl.pathname = "/admin"; // path

    // Redirect
    window.location.href = subdomainUrl.toString();
  };

  return (
    <Card
      className="group cursor-pointer p-4 transition-shadow hover:shadow-md"
      onClick={goToSubdomainAdmin}
    >
      <div className="mb-3 flex aspect-video items-center justify-center rounded-md bg-muted">
        {site.screenshot ? (
          <div className="relative w-full h-full aspect-video overflow-hidden rounded-md">
            <Image
              width={100}
              height={100}
              src={site.screenshot.url || "/image.svg"}
              onError={(e) => {
                e.currentTarget.onerror = null; // prevent infinite loop
                setIsImageValid(false);
              }}
              onLoad={() => setIsImageLoaded(true)}
              alt={site.screenshot.altText || site.screenshot.fileName}
              className={cn(
                "w-full h-full object-cover",
                isImageLoaded ? "opacity-100" : "opacity-0",
              )}
            />
            {!isImageLoaded && (
              <div
                className={cn(
                  "absolute top-0 left-0 w-full h-full object-cover bg-gray-300 animate-pulse",
                )}
              ></div>
            )}
          </div>
        ) : (
          <span className="text-2xl font-semibold text-muted-foreground/40">
            {site.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="truncate font-medium text-foreground group-hover:text-primary">
          {site.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {formatDate(site.createdOn)}
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
