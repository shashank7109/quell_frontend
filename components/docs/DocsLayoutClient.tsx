"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV, NavItem } from "@/lib/docs-nav";
import { Menu, X } from "lucide-react";

function NavGroup({ item, onClose }: { item: NavItem; onClose?: () => void }) {
  const pathname = usePathname();

  if (!item.items) {
    const active = pathname === item.href;
    return (
      <Link
        href={item.href!}
        onClick={onClose}
        className={[
          "block px-3 py-1.5 rounded-md text-sm transition-colors",
          active
            ? "bg-[#0070f3]/10 text-[#0070f3] font-medium"
            : "text-[#888] hover:text-white hover:bg-[#111]",
        ].join(" ")}
      >
        {item.title}
      </Link>
    );
  }

  return (
    <div className="mb-5">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-[#444] px-3 mb-1.5">
        {item.title}
      </p>
      <div className="space-y-0.5">
        {item.items.map((child) => (
          <NavGroup key={child.href ?? child.title} item={child} onClose={onClose} />
        ))}
      </div>
    </div>
  );
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  return (
    <div className="py-6 px-3">
      {NAV.map((group) => (
        <NavGroup key={group.title} item={group} onClose={onClose} />
      ))}
    </div>
  );
}

export default function DocsLayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[57px] border-b border-[#111] bg-black/95 backdrop-blur-md flex items-center px-4 md:px-6">
        <div className="flex items-center gap-3 w-full max-w-[1400px] mx-auto">

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#555] hover:text-white transition-colors p-1 -ml-1"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>

          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image src="/quell_logo.png" alt="Quell" width={72} height={24} className="h-6 w-auto" />
            <span className="text-[#333] text-sm font-medium border-l border-[#222] pl-3">Docs</span>
          </Link>

          <div className="flex-1" />

          <nav className="hidden md:flex items-center gap-5 text-sm text-[#555]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <a href="https://pypi.org/project/quelltest/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">PyPI</a>
            <a href="https://github.com/quelltest/quelltest-lib" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <Link href="/auth/sign-up" className="bg-[#0070f3] text-white text-xs font-medium px-3.5 py-1.5 rounded-md hover:bg-[#0060df] transition-colors">
              Get started
            </Link>
          </nav>

          {/* Mobile: get started */}
          <Link href="/auth/sign-up" className="md:hidden bg-[#0070f3] text-white text-xs font-medium px-3 py-1.5 rounded-md hover:bg-[#0060df] transition-colors">
            Start
          </Link>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside
        className={[
          "fixed top-0 left-0 h-full w-[280px] z-50 bg-black border-r border-[#111] overflow-y-auto transition-transform duration-200 md:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-4 h-[57px] border-b border-[#111]">
          <Link href="/" onClick={() => setSidebarOpen(false)}>
            <Image src="/quell_logo.png" alt="Quell" width={64} height={20} className="h-5 w-auto" />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-[#555] hover:text-white transition-colors"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>
        <SidebarContent onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Desktop layout */}
      <div className="flex pt-[57px]">

        {/* Desktop sidebar */}
        <aside className="hidden md:block w-[240px] shrink-0 fixed h-[calc(100vh-57px)] overflow-y-auto border-r border-[#111] top-[57px]">
          <SidebarContent />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 md:ml-[240px]">
          {children}
        </main>
      </div>
    </div>
  );
}
