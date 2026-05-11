import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const headersList = await headers();
  // Set by middleware from Vercel geo; defaults to "IN" when running locally
  const country = headersList.get("x-geo-country") ?? "IN";
  return NextResponse.json({ country }, {
    headers: {
      "Cache-Control": "public, max-age=86400",
    },
  });
}
