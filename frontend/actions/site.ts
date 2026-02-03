"use server";

import { Site } from "@/lib/dashboard/types";
import { ApiResponse, QueryObject, User } from "@/lib/models";
import { RequestWrapper } from "@/lib/RequestWrapper";

export async function GetAllSites(
  query: QueryObject,
): Promise<ApiResponse<Site[]>> {
  return RequestWrapper<any>("GET", `sites/get-all`, { query });
}

export async function CreateSite(data: any): Promise<ApiResponse<Site>> {
  return RequestWrapper<any>("POST", `sites/create`, { data });
}
