"use client";

import { useSite } from "@/context/SiteContext";

export default function SettingPenal() {
  const { site, currentPage } = useSite();
  return (
    <div>
      {site?.name} {currentPage?.slug}
    </div>
  );
}
