import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const parts = host.split(".");
  const subdomain = parts.length > 1 ? parts[0].toLowerCase() : "";
  const { pathname } = req.nextUrl;

  // Skip base domains
  if (subdomain === "" || subdomain === "www") {
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2)$/)
  ) {
    return NextResponse.next();
  }

  // Preserve the rest of the path and query
  const url = new URL(req.url);
  url.pathname = `/${subdomain}${url.pathname}`;

  return NextResponse.rewrite(url);
}
