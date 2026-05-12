/**
 * IndexNow submission endpoint.
 *
 * Pings Bing, Yandex, Seznam, and Naver simultaneously with every public URL
 * on the site. Trigger this after each deployment:
 *
 *   curl -X POST https://quell.buildsbyshashank.tech/api/indexnow \
 *        -H "Authorization: Bearer $INDEXNOW_SECRET"
 *
 * Add INDEXNOW_SECRET to Vercel environment variables.
 * In Vercel → Project Settings → Git → Deploy Hooks, create a hook that POSTs
 * to this endpoint after every successful production deployment.
 */
import { NextRequest, NextResponse } from "next/server";
import { getAllDocSlugs } from "@/lib/docs";
import { getAllBlogSlugs } from "@/lib/blog";

const HOST = "quell.buildsbyshashank.tech";
const BASE = `https://${HOST}`;
const INDEXNOW_KEY = "b455a2db597341278f81e8d38f901747";
const KEY_LOCATION = `${BASE}/${INDEXNOW_KEY}.txt`;

// IndexNow is supported by Bing, Yandex, Seznam, Naver.
// They cross-share submissions with each other.
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

function allPublicUrls(): string[] {
  const docSlugs = getAllDocSlugs();
  const blogSlugs = getAllBlogSlugs();

  return [
    BASE,
    `${BASE}/blog`,
    `${BASE}/docs`,
    `${BASE}/auth/sign-up`,
    ...docSlugs.map((s) => `${BASE}/docs/${s.join("/")}`),
    ...blogSlugs.map((s) => `${BASE}/blog/${s}`),
  ];
}

export async function POST(request: NextRequest) {
  // Protect against unauthorised triggers
  const secret = process.env.INDEXNOW_SECRET;
  if (secret) {
    const auth = request.headers.get("Authorization") ?? "";
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const urlList = allPublicUrls();

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList,
      }),
    });

    return NextResponse.json({
      submitted: urlList.length,
      indexnow_status: res.status,
      urls: urlList,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "IndexNow submission failed", detail: String(err) },
      { status: 500 }
    );
  }
}

// GET — let Vercel's deploy webhook trigger via a simple URL if preferred
export async function GET(request: NextRequest) {
  const secret = process.env.INDEXNOW_SECRET;
  if (secret) {
    const key = new URL(request.url).searchParams.get("secret");
    if (key !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
  return POST(request);
}
