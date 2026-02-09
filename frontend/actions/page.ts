"use server";

import { NewPageSchema } from "@/components/site/pages/new-page-button";
import { ApiResponse, Page, QueryObject } from "@/lib/models";
import { RequestWrapper } from "@/lib/RequestWrapper";

export async function GetPagesForOneSite(
  query: QueryObject,
): Promise<ApiResponse<Page[]>> {
  console.log("GetPagesForOneSite query", query);
  return RequestWrapper<Page[]>("GET", `pages/get-all`, { query });
}

export async function CreateNewPage(
  query: QueryObject,
  data: NewPageSchema,
): Promise<ApiResponse<Page>> {
  console.log("GetPagesForOneSite query", query);
  return RequestWrapper<Page>("POST", `pages/create`, { query, data });
}
