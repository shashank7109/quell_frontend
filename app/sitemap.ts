import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { getAllDocSlugs } from "@/lib/docs";
import { getAllBlogSlugs } from "@/lib/blog";

const BASE_URL = "https://quell.buildsbyshashank.tech";

function getFileMtime(filePath: string): Date {
  try {
    return fs.statSync(filePath).mtime;
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const docSlugs = getAllDocSlugs();
  const blogSlugs = getAllBlogSlugs();

  const docPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/docs`,
      lastModified: getFileMtime(path.join(process.cwd(), "content/docs/index.mdx")),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...docSlugs.map((slug) => ({
      url: `${BASE_URL}/docs/${slug.join("/")}`,
      lastModified: getFileMtime(
        path.join(process.cwd(), "content/docs", slug.join("/") + ".mdx")
      ),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...blogSlugs.map((slug) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: getFileMtime(
        path.join(process.cwd(), "content/blog", slug + ".mdx")
      ),
      changeFrequency: "monthly" as const,
      priority: 0.75,
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
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/auth/sign-in`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    ...blogPages,
    ...docPages,
  ];
}
