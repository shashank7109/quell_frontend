import fs from "fs";
import path from "path";
import matter from "gray-matter";

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

export interface NavItem {
  title: string;
  href?: string;
  items?: NavItem[];
}

export const NAV: NavItem[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Quickstart", href: "/docs/quickstart" },
      { title: "Installation", href: "/docs/installation" },
      { title: "How It Works", href: "/docs/how-it-works" },
    ],
  },
  {
    title: "CLI Reference",
    items: [
      { title: "Overview", href: "/docs/cli" },
      { title: "quell scan", href: "/docs/cli/scan" },
      { title: "quell fix", href: "/docs/cli/fix" },
      { title: "quell auto", href: "/docs/cli/auto" },
      { title: "quell ci", href: "/docs/cli/ci" },
      { title: "quell score", href: "/docs/cli/score" },
      { title: "quell repair", href: "/docs/cli/repair" },
      { title: "quell report", href: "/docs/cli/report" },
      { title: "quell github-comment", href: "/docs/cli/github-comment" },
    ],
  },
  {
    title: "Guides",
    items: [
      { title: "Kill Your First Mutant", href: "/docs/guides/first-kill" },
      { title: "CI/CD Integration", href: "/docs/guides/ci-integration" },
      { title: "GitHub Actions", href: "/docs/guides/github-actions" },
      { title: "AI Agents (MCP)", href: "/docs/guides/ai-agents" },
    ],
  },
  {
    title: "SDK",
    items: [
      { title: "Overview", href: "/docs/sdk" },
      { title: "API Reference", href: "/docs/sdk/api-reference" },
    ],
  },
  {
    title: "MCP Server",
    items: [{ title: "Overview", href: "/docs/mcp" }],
  },
  {
    title: "Configuration",
    items: [
      { title: "pyproject.toml", href: "/docs/configuration/pyproject" },
      { title: "LLM Providers", href: "/docs/configuration/llm-providers" },
    ],
  },
  {
    title: "Adapters",
    items: [
      { title: "mutmut", href: "/docs/adapters/mutmut" },
      { title: "Stryker", href: "/docs/adapters/stryker" },
    ],
  },
  {
    title: "Reference",
    items: [
      { title: "Mutation Operators", href: "/docs/reference/operators" },
      { title: "Changelog", href: "/docs/reference/changelog" },
    ],
  },
];

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
