// lib/api/auth.ts
"use server";
import { ApiResponse, User } from "@/lib/models";
import { RequestWrapper } from "@/lib/RequestWrapper";

export async function GetMe(): Promise<ApiResponse<User>> {
  return RequestWrapper<User>("GET", "auth/me", {});
}
