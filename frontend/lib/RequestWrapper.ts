// lib/request-wrapper.ts
import { AxiosError, AxiosRequestConfig, Method } from "axios";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { ApiResponse, QueryObject } from "./models";
import { buildMediaQueryParams } from "./params";
import { createServerAxios } from "./axios-server";

export async function RequestWrapper<T>(
  method: Method,
  url: string,
  options: {
    data?: any;
    config?: AxiosRequestConfig;
    query?: QueryObject;
    skipAuthRedirect?: boolean;
  },
): Promise<ApiResponse<T>> {
  const { data, config, query, skipAuthRedirect } = options;
  const params = buildMediaQueryParams(query);
  url = params ? `${url}?${params}` : url;

  console.dir(method);
  console.dir(url);
  console.dir(query);

  const isAuthRequest = url.includes("auth/") || url.startsWith("auth");

  try {
    // Create server axios instance with cookies
    const axiosInstance = await createServerAxios();

    const res = await axiosInstance({
      method,
      url,
      data,
      headers: {
        ...(config?.headers || {}),
      },
      ...config,
    });

    return res.data;
  } catch (error: unknown) {
    console.dir(error);

    // 🚨 Required: rethrow Next.js redirects
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AxiosError) {
      const status = error.response?.status;
      console.dir(error);
      // =====================
      // AUTH
      // =====================
      if (status === 401) {
        if (isAuthRequest || skipAuthRedirect) {
          return {
            data: null,
            success: false,
            statusCode: 401,
            message: error.response?.data?.message || "Unauthorized",
          } as ApiResponse<T>;
        }
        redirect("/error/unauthorised");
      }

      // =====================
      // NOT FOUND
      // =====================
      if (status === 404) {
        return {
          data: null,
          success: false,
          statusCode: 404,
          message: "Request API not found (RequestWrapper)",
        } as ApiResponse<T>;
      }

      // =====================
      // SERVER ERRORS
      // =====================
      if (status && status >= 500) {
        return {
          data: null,
          success: false,
          statusCode: 500,
          message: "Request failed (RequestWrapper)",
        } as ApiResponse<T>;
      }

      // =====================
      // NO RESPONSE (server down, CORS, timeout)
      // =====================
      if (!error.response && error.request) {
        return {
          data: null,
          success: false,
          statusCode: 500,
          message: "Server down, unreachable or CORS (RequestWrapper)",
        } as ApiResponse<T>;
      }

      console.error("Axios error:", error);
    }

    // =====================
    // FALLBACK RESPONSE
    // =====================
    return {
      data: null,
      success: false,
      statusCode: 400,
      message: "Request failed",
    } as ApiResponse<T>;
  }
}
