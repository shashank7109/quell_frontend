"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, NavItem } from "@/lib/docs";
import { ChevronRight } from "lucide-react";

function NavGroup({ item }: { item: NavItem }) {
  const pathname = usePathname();

  if (!item.items) {
    const active = pathname === item.href;
    return (
      <Link
        href={item.href!}
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

  const anyActive = item.items.some((i) => pathname === i.href || pathname.startsWith(i.href + "/"));

  return (
    <div className="mb-5">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-[#444] px-3 mb-1.5">
        {item.title}
      </p>
      <div className="space-y-0.5">
        {item.items.map((child) => (
          <NavGroup key={child.href ?? child.title} item={child} />
        ))}
      </div>
    </div>
  );
}

export default function DocsSidebar() {
  return (
    <aside className="w-[240px] shrink-0 fixed h-[calc(100vh-57px)] overflow-y-auto border-r border-[#111] py-6 px-3 top-[57px]">
      {NAV.map((group) => (
        <NavGroup key={group.title} item={group} />
      ))}
    </aside>
  );
}
