"use server";

import { ApiResponse, DashboardData, QueryObject } from "@/lib/models";
import { RequestWrapper } from "@/lib/RequestWrapper";

export async function GetDashboardData(
  query?: QueryObject,
): Promise<ApiResponse<DashboardData>> {
  return RequestWrapper<any>("GET", `dashboard/admin-dashboard`, { query });
}
