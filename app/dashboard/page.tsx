"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { KeyRound, Zap, TrendingUp, ArrowRight, Activity } from "lucide-react";
import { usage as usageApi, keys as keysApi, type UsageSummary, type APIKey } from "@/lib/api";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  children,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
  icon: React.ElementType;
  children?: React.ReactNode;
}) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#555] font-medium uppercase tracking-wider">{label}</span>
        <Icon size={14} className="text-[#333]" />
      </div>
      <div>
        <div className="text-3xl font-semibold text-white tracking-tight">{value}</div>
        {sub && <p className="text-xs text-[#444] mt-1">{sub}</p>}
      </div>
      {children}
    </Card>
  );
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<UsageSummary | null>(null);
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([usageApi.summary(), keysApi.list()])
      .then(([s, k]) => { setSummary(s); setApiKeys(k); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const pct = summary && summary.monthly_limit > 0
    ? Math.min((summary.this_month / summary.monthly_limit) * 100, 100)
    : 0;
  const activeKeys = apiKeys.filter((k) => k.is_active).length;
  const maxBar = Math.max(...(summary?.daily.map((d) => d.count) ?? [1]), 1);

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-white">Overview</h1>
        <p className="text-sm text-[#555] mt-0.5">Your mutation testing at a glance</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatCard
          label="Fixes this month"
          value={loading ? <span className="w-16 h-8 bg-[#111] rounded animate-pulse block" /> : summary?.this_month ?? 0}
          sub={summary && summary.monthly_limit > 0 ? `of ${summary.monthly_limit.toLocaleString()} limit` : undefined}
          icon={Zap}
        >
          {summary && summary.monthly_limit > 0 && !loading && (
            <div className="space-y-1">
              <div className="h-1 bg-[#111] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    pct > 90 ? "bg-red-500" : pct > 70 ? "bg-yellow-500" : "bg-[#0070f3]"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-[10px] text-[#333]">{pct.toFixed(0)}% used</p>
            </div>
          )}
        </StatCard>

        <StatCard
          label="Active API keys"
          value={loading ? <span className="w-8 h-8 bg-[#111] rounded animate-pulse block" /> : activeKeys}
          icon={KeyRound}
        />

        <StatCard
          label="All-time fixes"
          value={loading ? <span className="w-12 h-8 bg-[#111] rounded animate-pulse block" /> : summary?.total_all_time ?? 0}
          icon={TrendingUp}
        />
      </div>

      {/* Daily chart */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-[#444]" />
            <span className="text-sm font-medium text-white">Daily fixes</span>
            <span className="text-xs text-[#444]">last 14 days</span>
          </div>
          <Link href="/dashboard/usage" className="text-xs text-[#444] hover:text-[#888] transition-colors flex items-center gap-1">
            All activity <ArrowRight size={11} />
          </Link>
        </div>
        {loading ? (
          <div className="h-20 bg-[#0d0d0d] rounded-lg animate-pulse" />
        ) : (
          <div className="flex items-end gap-1 h-20">
            {(summary?.daily ?? []).map((d) => (
              <div key={d.date} title={`${d.date}: ${d.count}`} className="flex-1 group">
                <div
                  className="w-full rounded-sm bg-[#1a1a1a] group-hover:bg-[#0070f3]/60 transition-colors"
                  style={{
                    height: `${(d.count / maxBar) * 76}px`,
                    minHeight: d.count > 0 ? "3px" : "0",
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 gap-3">
        {[
          {
            href: "/dashboard/api-keys",
            title: "API Keys",
            desc: `${activeKeys} key${activeKeys !== 1 ? "s" : ""} active`,
          },
          {
            href: "/dashboard/billing",
            title: "Billing & plans",
            desc: "Upgrade for more fixes",
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center justify-between bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#2a2a2a] rounded-xl px-5 py-4 transition-colors"
          >
            <div>
              <p className="text-sm font-medium text-white">{item.title}</p>
              <p className="text-xs text-[#444] mt-0.5">{item.desc}</p>
            </div>
            <ArrowRight size={14} className="text-[#333] group-hover:text-[#666] transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
