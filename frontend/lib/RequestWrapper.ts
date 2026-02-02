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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
    config?: AxiosRequestConfig;
    query?: QueryObject;
  },
): Promise<ApiResponse<T>> {
  const { data, config, query } = options;
  //   const token = await GetToken();
  const params = buildMediaQueryParams(query);

  url = `${url}?${params}`;

  try {
    const res = await axiosGlobal({
      method,
      url,
      data,
      headers: {
        // Authorization: `Bearer ${token}`,
        ...(config?.headers || {}),
      },
      ...config,
    });

    if (res.status === 401) {
      console.log("401", res);
      redirect("/error/unauthorised");
    }

    return res.data;
  } catch (error: unknown) {
    if (isRedirectError(error)) {
      console.log("401", error);
      console.dir(error);
      throw error;
    }

    if (error instanceof Error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 401) {
        redirect("/error/unauthorised");
      }

      console.error(axiosError);
    }

    return {
      data: null,
      success: false,
      statusCode: 400,
    } as ApiResponse<T>;
  }
}
