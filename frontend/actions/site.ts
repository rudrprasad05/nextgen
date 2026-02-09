"use server";

import { ApiResponse, QueryObject, Site } from "@/lib/models";
import { PageSchema } from "@/lib/page-builder/types";
import { RequestWrapper } from "@/lib/RequestWrapper";

export async function GetAllSites(
  query: QueryObject,
): Promise<ApiResponse<Site[]>> {
  console.log("GetAllSites query", query);
  return RequestWrapper<any>("GET", `sites/get-all`, { query });
}

export async function CreateSite(data: FormData): Promise<ApiResponse<Site>> {
  return RequestWrapper<any>("POST", `sites/create`, { data });
}
export async function GetSiteJson(
  subdomain: string,
): Promise<ApiResponse<Site>> {
  return RequestWrapper<Site>("GET", `sites/get-json/${subdomain}`, {});
}

export async function GetOneSiteWithPagesBySlug(
  slug: string,
): Promise<ApiResponse<Site>> {
  console.log("GetPagesForOneSite query", slug);
  return RequestWrapper<Site>("GET", `sites/get-site-with-pages`, {
    query: { slug },
  });
}

export async function SaveSiteAsync(
  siteSlug: string,
  pageId: string,
  schema: PageSchema,
): Promise<ApiResponse<Site>> {
  return RequestWrapper<Site>("POST", `sites/save-schema`, {
    query: { slug: siteSlug, uuid: pageId },
    data: schema,
  });
}
