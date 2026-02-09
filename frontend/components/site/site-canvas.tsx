"use client";

import { GetSiteJson } from "@/actions/site";
import { useSite } from "@/context/SiteContext";
import { FIVE_MINUTE_CACHE, Site } from "@/lib/models";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import SiteRenderer from "./renderer/site-renderer";

export default function SiteCanvas({ subdomain }: { subdomain: string }) {
  const { site, setInitialSite } = useSite();

  const query = useQuery({
    queryKey: ["site", subdomain],
    queryFn: () => GetSiteJson(subdomain),
    staleTime: FIVE_MINUTE_CACHE,
  });
  if (query.isError) {
    return <div className="text-red-500">Error loading sites.</div>;
  }

  if (query.isLoading) {
    return <Loader2 className="animate-spin w-8 h-8 mx-auto my-4" />;
  }
  const data = query.data?.data as Site;
  const meta = query.data?.meta;

  setInitialSite(data);

  let mainPage = data.pages.filter((x) => x.slug.toLowerCase() == "home")[0];

  return <SiteRenderer schema={mainPage.schema} />;
}
