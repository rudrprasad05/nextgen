"use server";

import { ApiResponse, Page, QueryObject } from "@/lib/models";
import { RequestWrapper } from "@/lib/RequestWrapper";

export async function GetPagesForOneSite(
  query: QueryObject,
): Promise<ApiResponse<Page[]>> {
  console.log("GetPagesForOneSite query", query);
  return RequestWrapper<Page[]>("GET", `pages/get-all`, { query });
}
