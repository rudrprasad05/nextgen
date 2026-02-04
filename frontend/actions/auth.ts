// lib/api/auth.ts

import { ApiResponse, User } from "@/lib/models";
import { RequestWrapper } from "@/lib/RequestWrapper";

export async function GetMe(): Promise<ApiResponse<User>> {
  return RequestWrapper<User>("GET", "auth/me", {});
}

export async function LoginRequest(email: string, password: string) {
  return RequestWrapper<User>("POST", "auth/login", {
    data: { email, password },
  });
}

export async function LogoutRequest() {
  return RequestWrapper<null>("POST", "auth/logout", {});
}
