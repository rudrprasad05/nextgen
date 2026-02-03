"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Link2 } from "lucide-react";

interface BasicDetailsProps {
  name: string;
  slug: string;
  description: string;
  onNameChange: (value: string) => void;
  onSlugChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  slugError?: string;
}

export function BasicDetails({
  name,
  slug,
  description,
  onNameChange,
  onSlugChange,
  onDescriptionChange,
  slugError,
}: BasicDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-2 border-b border-border">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
          <Globe className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Basic Details
          </h2>
          <p className="text-sm text-muted-foreground">
            Give your site a name and URL
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="site-name">
            Site Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="site-name"
            placeholder="My Awesome Website"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">
            This is the display name for your site in the dashboard
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="site-slug">
            URL Slug <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Link2 className="w-4 h-4 text-muted-foreground" />
            </div>
            <Input
              id="site-slug"
              placeholder="my-awesome-website"
              value={slug}
              onChange={(e) => onSlugChange(e.target.value)}
              className={`h-11 pl-9 ${slugError ? "border-destructive focus-visible:ring-destructive" : ""}`}
            />
          </div>
          {slugError ? (
            <p className="text-xs text-destructive">{slugError}</p>
          ) : (
            <p className="text-xs flex gap-2 items-baseline text-muted-foreground">
              Your site will be available at:
              <span className="font-mono text-foreground">
                {slug}.procyonfiji.com
              </span>
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="site-description">Description</Label>
          <Textarea
            id="site-description"
            placeholder="A brief description of your website..."
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            rows={3}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground">
            Optional. Used for internal reference only.
          </p>
        </div>
      </div>
    </div>
  );
}
