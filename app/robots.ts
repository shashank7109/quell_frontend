import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/auth/sign-in", "/auth/sign-up"],
        disallow: ["/dashboard/", "/api/"],
      },
    ],
    sitemap: "https://quell.buildsbyshashank.tech/sitemap.xml",
    host: "https://quell.buildsbyshashank.tech",
  };
}
