"use server";

import { createServerAxios } from "@/lib/axios-server";
import { Site } from "@/lib/models";
import { ApiResponse, QueryObject, User } from "@/lib/models";
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
