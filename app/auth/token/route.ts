import { NextRequest, NextResponse } from "next/server";

// BACKEND_URL is the server-side env var used in next.config.js rewrites.
// NEXT_PUBLIC_API_URL is a fallback for environments where only the public var is set.
const BACKEND =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "";

/** Proxy CLI PKCE token exchange → FastAPI /api/auth/token */
export async function POST(req: NextRequest) {
  if (!BACKEND) {
    return NextResponse.json(
      { detail: "Auth service not configured. Set BACKEND_URL in environment." },
      { status: 503 }
    );
  }

  const body = await req.text();
  const ct = req.headers.get("content-type") ?? "application/x-www-form-urlencoded";

  try {
    const res = await fetch(`${BACKEND}/api/auth/token`, {
      method: "POST",
      headers: { "Content-Type": ct },
      body,
    });
    const data = await res.json().catch(() => ({ detail: "Backend error" }));
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ detail: `Proxy error: ${msg}` }, { status: 502 });
  }
}
