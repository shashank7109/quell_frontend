import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  // Vercel injects geo.country on edge; fall back to IN (primary market)
  const country = (request as NextRequest & { geo?: { country?: string } }).geo?.country ?? "IN";
  response.headers.set("x-geo-country", country);
  return response;
}

export const config = {
  matcher: ["/api/geo"],
};
