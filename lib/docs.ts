import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NAV } from "./docs-nav";

export type { NavItem } from "./docs-nav";
export { NAV } from "./docs-nav";

const DOCS_DIR = path.join(process.cwd(), "content", "docs");

export interface DocMeta {
  title: string;
  description: string;
  slug: string[];
  href: string;
}

export interface DocPage {
  meta: DocMeta;
  content: string;
}

function getAllDocFiles(dir: string, base = ""): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const e of entries) {
    const rel = base ? `${base}/${e.name}` : e.name;
    if (e.isDirectory()) {
      files.push(...getAllDocFiles(path.join(dir, e.name), rel));
    } else if (e.name.endsWith(".mdx")) {
      files.push(rel);
    }
  }
  return files;
}

export function getDocPage(slug: string[]): DocPage | null {
  const joined = slug.length ? slug.join("/") : "index";
  const candidates = [
    path.join(DOCS_DIR, `${joined}.mdx`),
    path.join(DOCS_DIR, joined, "index.mdx"),
  ];

  for (const filePath of candidates) {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      return {
        meta: {
          title: data.title ?? "Docs",
          description: data.description ?? "",
          slug,
          href: "/docs" + (slug.length ? "/" + slug.join("/") : ""),
        },
        content,
      };
    }
  }
  return null;
}

export function getAllDocSlugs(): string[][] {
  const files = getAllDocFiles(DOCS_DIR);
  return files.map((f) => {
    const noExt = f.replace(/\.mdx$/, "");
    const parts = noExt.split("/");
    return parts[parts.length - 1] === "index" ? parts.slice(0, -1) : parts;
  });
}

export function flattenNav(): { title: string; href: string }[] {
  const pages: { title: string; href: string }[] = [];
  function walk(items: typeof NAV) {
    for (const item of items) {
      if (item.href) pages.push({ title: item.title, href: item.href });
      if (item.items) walk(item.items);
    }
  }
  walk(NAV);
  return pages;
}
