// lib/axios-server.ts
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function createServerAxios() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const cookieHeader = allCookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 100000,
    headers: {
      Cookie: cookieHeader,
    },
    withCredentials: true,
  });
}

// lib/axios-route-
