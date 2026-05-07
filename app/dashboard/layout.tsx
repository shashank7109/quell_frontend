"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  KeyRound,
  BarChart2,
  CreditCard,
  LogOut,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import type { User } from "@/lib/api";
import Badge from "@/components/ui/Badge";

const nav = [
  { href: "/dashboard",            label: "Overview",  icon: LayoutDashboard, exact: true },
  { href: "/dashboard/api-keys",   label: "API Keys",  icon: KeyRound },
  { href: "/dashboard/usage",      label: "Usage",     icon: BarChart2 },
  { href: "/dashboard/billing",    label: "Billing",   icon: CreditCard },
];

const planTone = { hobby: "default", pro: "blue", team: "purple" } as const;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("quell_token")) {
      router.replace("/auth/sign-in");
      return;
    }
    const cached = localStorage.getItem("quell_user");
    if (cached) setUser(JSON.parse(cached));
  }, [router]);

  function signOut() {
    localStorage.removeItem("quell_token");
    localStorage.removeItem("quell_user");
    router.push("/");
  }

  function isActive(item: (typeof nav)[0]) {
    return item.exact ? pathname === item.href : pathname.startsWith(item.href);
  }

  const pageLabel = pathname === "/dashboard"
    ? "Overview"
    : pathname.split("/").at(-1)?.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div className="min-h-screen bg-black flex">
      {/* ── Sidebar ── */}
      <aside className="w-[220px] shrink-0 border-r border-[#111] flex flex-col fixed h-full z-30">
        {/* Logo */}
        <div className="h-[57px] flex items-center px-5 border-b border-[#111]">
          <Link href="/">
            <Image src="/quell_logo.png" alt="Quell" width={72} height={24} className="h-6 w-auto" />
          </Link>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {nav.map((item) => {
            const Icon    = item.icon;
            const active  = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "group flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
                  active
                    ? "bg-[#161616] text-white"
                    : "text-[#666] hover:text-[#bbb] hover:bg-[#0d0d0d]",
                ].join(" ")}
              >
                <Icon size={15} className={active ? "text-white" : "text-[#444] group-hover:text-[#888]"} />
                {item.label}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-[#111] mt-4">
            <a
              href="https://github.com/shashank7109/quell"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#555] hover:text-[#888] transition-colors"
            >
              <ExternalLink size={14} />
              Documentation
            </a>
          </div>
        </nav>

        {/* User */}
        {user && (
          <div className="border-t border-[#111] p-3">
            <div className="flex items-center gap-2.5 px-2 py-2">
              {/* Avatar initial */}
              <div className="w-7 h-7 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-xs font-medium text-[#888] shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">{user.name}</p>
                <Badge
                  tone={planTone[user.plan as keyof typeof planTone] ?? "default"}
                  className="mt-0.5 text-[10px] px-1.5 py-0"
                >
                  {user.plan}
                </Badge>
              </div>
              <button
                onClick={signOut}
                title="Sign out"
                className="text-[#333] hover:text-[#666] transition-colors shrink-0"
              >
                <LogOut size={13} />
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 ml-[220px] flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-[57px] border-b border-[#111] flex items-center px-8 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-[#444]">
            <span>Dashboard</span>
            {pathname !== "/dashboard" && (
              <>
                <ChevronRight size={12} />
                <span className="text-[#888]">{pageLabel}</span>
              </>
            )}
          </div>
        </header>

        <main className="flex-1 p-8 max-w-5xl w-full">{children}</main>
      </div>
    </div>
  );
}
