"use client";
import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { usage as usageApi, type UsageSummary, type UsageRecord } from "@/lib/api";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const actionTone: Record<string, "blue" | "success" | "purple"> = {
  scan: "blue",
  fix: "success",
  verify: "purple",
};

export default function UsagePage() {
  const [summary, setSummary] = useState<UsageSummary | null>(null);
  const [history, setHistory] = useState<UsageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    Promise.all([usageApi.summary(), usageApi.history(1)])
      .then(([s, h]) => { setSummary(s); setHistory(h); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function loadMore() {
    setLoadingMore(true);
    try {
      const next = await usageApi.history(page + 1);
      setHistory((prev) => [...prev, ...next]);
      setPage((p) => p + 1);
    } finally {
      setLoadingMore(false);
    }
  }

  const pct =
    summary && summary.monthly_limit > 0
      ? Math.min((summary.this_month / summary.monthly_limit) * 100, 100)
      : 0;

  const maxBar = Math.max(...(summary?.daily.map((d) => d.count) ?? [1]), 1);

  return (
    <div className="animate-fade-in space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-white">Usage</h1>
        <p className="text-sm text-[#555] mt-0.5">Monitor your mutation fix quota and activity</p>
      </div>

      {/* Monthly quota */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-white">Monthly quota</h2>
          {summary && <span className="text-xs text-[#444]">Resets on the 1st</span>}
        </div>
        {loading ? (
          <div className="space-y-2">
            <div className="h-8 w-32 bg-[#111] rounded animate-pulse" />
            <div className="h-1.5 bg-[#111] rounded animate-pulse" />
          </div>
        ) : (
          <>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl font-bold text-white">{summary?.this_month ?? 0}</span>
              {summary && summary.monthly_limit > 0 && (
                <span className="text-[#555] text-sm">of {summary.monthly_limit.toLocaleString()} fixes used</span>
              )}
              {summary && summary.monthly_limit === -1 && (
                <span className="text-[#555] text-sm">fixes (unlimited)</span>
              )}
            </div>
            {summary && summary.monthly_limit > 0 && (
              <div>
                <div className="h-1.5 bg-[#111] rounded-full overflow-hidden mb-1.5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      pct > 90 ? "bg-red-500" : pct > 70 ? "bg-yellow-500" : "bg-[#0070f3]"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-xs text-[#444]">{pct.toFixed(1)}% used</p>
              </div>
            )}
          </>
        )}
      </Card>

      {/* Bar chart */}
      <Card>
        <div className="flex items-center gap-2 mb-6">
          <Activity size={14} className="text-[#444]" />
          <span className="text-sm font-medium text-white">Daily fixes</span>
          <span className="text-xs text-[#444]">last 14 days</span>
        </div>
        {loading ? (
          <div className="h-32 bg-[#111] rounded-lg animate-pulse" />
        ) : (
          <div className="flex items-end gap-1.5 h-32">
            {(summary?.daily ?? []).map((d) => (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full bg-[#1a1a1a] hover:bg-[#0070f3]/70 rounded-sm transition-colors cursor-default"
                  style={{
                    height: `${(d.count / maxBar) * 112}px`,
                    minHeight: d.count > 0 ? "4px" : "0",
                  }}
                  title={`${d.date}: ${d.count} fixes`}
                />
                <span className="text-[10px] text-[#333] hidden md:block">
                  {new Date(d.date).getDate()}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* History table */}
      <Card padding="none" className="overflow-hidden">
        <div className="px-6 py-4 border-b border-[#1a1a1a]">
          <h2 className="text-sm font-medium text-white">Request history</h2>
        </div>
        {loading ? (
          <div className="p-8 text-center text-[#555] text-sm">Loading…</div>
        ) : history.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-[#555] text-sm">No requests yet</p>
            <p className="text-[#333] text-xs mt-1">Start using Quell to see activity here</p>
          </div>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1a1a1a]">
                  <th className="text-left text-[#444] font-medium px-6 py-3 text-xs uppercase tracking-wider">Action</th>
                  <th className="text-left text-[#444] font-medium px-6 py-3 text-xs uppercase tracking-wider hidden md:table-cell">Mutant ID</th>
                  <th className="text-left text-[#444] font-medium px-6 py-3 text-xs uppercase tracking-wider hidden md:table-cell">API key</th>
                  <th className="text-left text-[#444] font-medium px-6 py-3 text-xs uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody>
                {history.map((r, i) => (
                  <tr
                    key={r.id}
                    className={`${i < history.length - 1 ? "border-b border-[#111]" : ""} hover:bg-[#0d0d0d] transition-colors`}
                  >
                    <td className="px-6 py-3">
                      <Badge tone={actionTone[r.action] ?? "default"}>
                        {r.action}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-[#555] font-mono text-xs hidden md:table-cell">
                      {r.mutant_id ?? "—"}
                    </td>
                    <td className="px-6 py-3 text-[#555] font-mono text-xs hidden md:table-cell">
                      {r.api_key_prefix ?? "—"}
                    </td>
                    <td className="px-6 py-3 text-[#555] text-xs">{formatDateTime(r.timestamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-4 border-t border-[#111]">
              <Button variant="ghost" size="sm" onClick={loadMore} loading={loadingMore}>
                Load more
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
