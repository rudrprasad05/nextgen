import { axiosGlobal } from "@/lib/axios";
import { AxiosError, AxiosRequestConfig, Method } from "axios";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { ApiResponse, QueryObject } from "./models";
import { buildMediaQueryParams } from "./params";

export async function RequestWrapper<T>(
  method: Method,
  url: string,
  options: {
    data?: any;
    config?: AxiosRequestConfig;
    query?: QueryObject;
  },
): Promise<ApiResponse<T>> {
  const { data, config, query } = options;
  const params = buildMediaQueryParams(query);
  url = params ? `${url}?${params}` : url;

  try {
    const res = await axiosGlobal({
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
    // 🚨 Required: rethrow Next.js redirects
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AxiosError) {
      const status = error.response?.status;

      // =====================
      // AUTH
      // =====================
      if (status === 401) {
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
