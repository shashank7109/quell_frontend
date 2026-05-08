import type { Metadata } from "next";
import DocsHeader from "@/components/docs/DocsHeader";
import DocsSidebar from "@/components/docs/DocsSidebar";

export const metadata: Metadata = {
  title: {
    default: "Documentation | Quell",
    template: "%s | Quell Docs",
  },
  description:
    "Complete documentation for Quell — the mutation testing tool that auto-generates verified killing tests.",
  robots: { index: true, follow: true },
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <DocsHeader />
      <div className="flex pt-[57px]">
        <DocsSidebar />
        <main className="flex-1 ml-[240px] min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
