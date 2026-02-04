import { NextRequest, NextResponse } from "next/server";

// This is required
export function proxy(req: NextRequest) {
  const host = req.headers.get("host") || "";
  // Split by dot
  const parts = host.split(".");
  const subdomain = parts.length > 1 ? parts[0].toLowerCase() : "";

  // Skip base domains (main domain, localhost, 127.0.0.1)
  if (subdomain === "" || subdomain === "www") {
    return NextResponse.next();
  }

  // Internal rewrite to your tenant route
  return NextResponse.rewrite(new URL(`/${subdomain}`, req.url));
}
