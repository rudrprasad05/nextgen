"use server";

import { ApiResponse, User } from "@/lib/models";
import { RequestWrapper } from "@/lib/RequestWrapper";

export async function CreateUser(data: any): Promise<ApiResponse<User>> {
  return RequestWrapper<any>("POST", `users`, { data });
}
