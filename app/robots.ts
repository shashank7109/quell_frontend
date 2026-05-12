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
        // Googlebot gets explicit allow for the IndexNow key file
        userAgent: "Googlebot",
        allow: ["/q8f3a2b9c4d6e1f7.txt"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
