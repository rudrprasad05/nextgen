"use server";

import { ApiResponse, QueryObject, User } from "@/lib/models";
import { RequestWrapper } from "@/lib/RequestWrapper";

export async function CreateUser(data: any): Promise<ApiResponse<User>> {
  return RequestWrapper<any>("POST", `users`, { data });
}

export async function ChangePfp(
  data: FormData,
  query: QueryObject,
): Promise<ApiResponse<User>> {
  return RequestWrapper<User>("POST", `users/profile-picture`, { query, data });
}

export async function RequestPasswordReset(
  email: string,
): Promise<ApiResponse<User>> {
  return RequestWrapper<User>("POST", `users/request-password-reset`, {
    data: { email },
  });
}

export async function ChangeUsername(
  data: { newUsername: string },
  query?: QueryObject,
): Promise<ApiResponse<User>> {
  return RequestWrapper<User>("POST", `users/change-username`, { query, data });
}

export async function GetOneUser(
  query?: QueryObject,
): Promise<ApiResponse<User>> {
  return RequestWrapper<User>("GET", `users/get-user-by-uuid`, { query });
}
