import type { MetadataRoute } from "next";
import { getAllDocSlugs } from "@/lib/docs";

const BASE_URL = "https://quell.buildsbyshashank.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  const docSlugs = getAllDocSlugs();
  const docPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/docs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...docSlugs.map((slug) => ({
      url: `${BASE_URL}/docs/${slug.join("/")}`,
      lastModified: new Date() as Date,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/auth/sign-up`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/auth/sign-in`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...docPages,
  ];
}
