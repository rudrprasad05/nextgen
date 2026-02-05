"use server";

import { createServerAxios } from "@/lib/axios-server";
import { Page, Site } from "@/lib/models";
import { ApiResponse, QueryObject, User } from "@/lib/models";
import { RequestWrapper } from "@/lib/RequestWrapper";

export async function GetPagesForOneSite(
  query: QueryObject,
): Promise<ApiResponse<Page[]>> {
  console.log("GetPagesForOneSite query", query);
  return RequestWrapper<Page[]>("GET", `pages/get-all`, { query });
}
