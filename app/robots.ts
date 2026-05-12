import type { MetadataRoute } from "next";

const BASE = "https://quell.buildsbyshashank.tech";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // All crawlers: allow public content, block private areas
        userAgent: "*",
        allow: ["/", "/blog/", "/docs/", "/auth/sign-up"],
        disallow: [
          "/dashboard/",
          "/api/",
          "/auth/sign-in",   // low-value, wastes crawl budget
          "/_next/",
          "/static/",
        ],
      },
      {
        // All crawlers (Bingbot, Googlebot, etc.) must be able to fetch the
        // IndexNow key verification file.
        userAgent: "*",
        allow: ["/b455a2db597341278f81e8d38f901747.txt"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
