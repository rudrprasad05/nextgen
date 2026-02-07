"use client";

import { useSite } from "@/context/SiteContext";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function SettingPenal() {
  const { site, currentPage } = useSite();
  return (
    <div>
      <section>
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Site
        </h3>
        <div className="space-y-2">
          <Label htmlFor="content" className="text-xs">
            URL
          </Label>

          <Input
            id="content"
            value={element.props.content || ""}
            onChange={(e) => updateProp("content", e.target.value)}
            className="h-8 text-sm"
          />
        </div>
      </section>
    </div>
  );
}
