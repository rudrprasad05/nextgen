import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const BASE_DOMAIN = process.env.BASE_DOMAIN || "test.home";
  const host = req.headers.get("host") || "";
  const { pathname } = req.nextUrl;

  // Skip static files and Next.js internal routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2)$/)
  ) {
    return NextResponse.next();
  }

  // Extract subdomain
  const hostWithoutPort = host.split(":")[0]; // Remove port if present
  const parts = hostWithoutPort.split(".");

  // Check if this is the base domain (e.g., test.home or www.test.home)
  const isBaseDomain =
    hostWithoutPort === BASE_DOMAIN || hostWithoutPort === `www.${BASE_DOMAIN}`;

  if (isBaseDomain) {
    return NextResponse.next(); // Let base domain routes work normally
  }

  // Extract subdomain (everything before the base domain)
  const baseDomainParts = BASE_DOMAIN.split(".");
  const subdomainParts = parts.slice(0, parts.length - baseDomainParts.length);

  if (subdomainParts.length === 0) {
    return NextResponse.next();
  }

  const subdomain = subdomainParts.join(".");

  // Rewrite to [subdomain] dynamic route
  const url = new URL(req.url);
  url.pathname = `/${subdomain}${pathname}`;

  return NextResponse.rewrite(url);
}
