import type { Metadata } from "next";
import DocsLayoutClient from "@/components/docs/DocsLayoutClient";

export const metadata: Metadata = {
  title: {
    default: "Documentation | Quell",
    template: "%s | Quell Docs",
  },
  description:
    "Complete documentation for Quell v2.0.0 — edge case finder, three-bucket output, 5-gate pipeline, Production Readiness Score.",
  robots: { index: true, follow: true },
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <DocsLayoutClient>{children}</DocsLayoutClient>;
}
