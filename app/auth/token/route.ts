import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.NEXT_PUBLIC_API_URL || "";

/** Proxy CLI PKCE token exchange → FastAPI /api/auth/token */
export async function POST(req: NextRequest) {
  const body = await req.text();
  const ct = req.headers.get("content-type") ?? "application/x-www-form-urlencoded";

  const res = await fetch(`${BACKEND}/api/auth/token`, {
    method: "POST",
    headers: { "Content-Type": ct },
    body,
  });

  const data = await res.json().catch(() => ({ detail: "Backend error" }));
  return NextResponse.json(data, { status: res.status });
}
