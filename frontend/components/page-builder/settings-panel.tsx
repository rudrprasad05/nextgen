"use client";

import { useSite } from "@/context/SiteContext";

export default function SettingPenal() {
  const { site } = useSite();
  return <div>{site?.name}</div>;
}
