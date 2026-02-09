// app/api/auth/logout/route.ts
import { ApiResponse } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get("cookie") ?? "";
    const tokenMatch = cookieHeader.match(/token=([^;]+)/);
    const accessToken = tokenMatch ? tokenMatch[1] : null;

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          statusCode: 401,
          message: "No authentication cookie found",
          data: null,
        },
        { status: 401 },
      );
    }

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${apiBaseUrl}auth/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    const data: ApiResponse<string> = await response.json();

    // Extract set-cookie headers
    const setCookieHeader = response.headers.get("set-cookie");
    const headers = new Headers();
    if (setCookieHeader) {
      headers.append("Set-Cookie", setCookieHeader);
    }

    return NextResponse.json(data, {
      status: response.status,
      headers,
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message: "Internal server error",
        data: null,
      },
      { status: 500 },
    );
  }
}
