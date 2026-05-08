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
      { title: "quell check", href: "/docs/cli/check" },
      { title: "quell reproduce", href: "/docs/cli/reproduce" },
      { title: "quell prove", href: "/docs/cli/prove" },
      { title: "quell score", href: "/docs/cli/score" },
      { title: "quell ci", href: "/docs/cli/ci" },
      { title: "quell init", href: "/docs/cli/init" },
    ],
  },
  {
    title: "Guides",
    items: [
      { title: "Prove Your First Requirement", href: "/docs/guides/first-proof" },
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
    title: "Reference",
    items: [
      { title: "Constraint Kinds", href: "/docs/reference/constraint-kinds" },
      { title: "Changelog", href: "/docs/reference/changelog" },
    ],
  },
];
