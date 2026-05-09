"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye, TrendingUp, Users, FileText, ExternalLink, RefreshCw,
} from "lucide-react";
import Card from "@/components/ui/Card";

const ADMIN_EMAIL = "bindalshashank.89@gmail.com";
const GA4_URL = "https://analytics.google.com/analytics/web/#/p{propertyId}/reports/intelligenthome";
const GA4_DASHBOARD = "https://analytics.google.com";
const API = process.env.NEXT_PUBLIC_API_URL || "";

interface BlogViewRecord {
  slug: string;
  views: number;
  last_viewed_at: string | null;
}

function StatCard({
  label, value, sub, icon: Icon, accent = false,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
  icon: React.ElementType;
  accent?: boolean;
}) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#555] font-medium uppercase tracking-wider">{label}</span>
        <Icon size={14} className={accent ? "text-green-500" : "text-[#333]"} />
      </div>
      <div>
        <div className="text-3xl font-semibold text-white tracking-tight">{value}</div>
        {sub && <p className="text-xs text-[#444] mt-1">{sub}</p>}
      </div>
    </Card>
  );
}

function slug2title(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [blogViews, setBlogViews] = useState<BlogViewRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  useEffect(() => {
    const raw = localStorage.getItem("quell_user");
    if (!raw) { router.replace("/auth/sign-in"); return; }
    const user = JSON.parse(raw);
    if (user.email !== ADMIN_EMAIL) { setAllowed(false); return; }
    setAllowed(true);
  }, [router]);

  function fetchData() {
    setLoading(true);
    fetch(`${API}/api/blog/views/`)
      .then((r) => r.ok ? r.json() : [])
      .then((data) => { setBlogViews(data); setLastRefreshed(new Date()); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (allowed) fetchData();
  }, [allowed]);

  if (allowed === null) return null;

  if (!allowed) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <p className="text-[#444] text-sm">Access restricted to site administrators.</p>
      </div>
    );
  }

  const totalViews = blogViews.reduce((s, r) => s + r.views, 0);
  const topPost = blogViews[0];
  const maxViews = Math.max(...blogViews.map((r) => r.views), 1);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Site Analytics</h1>
          <p className="text-sm text-[#555] mt-0.5">
            Blog view counts (real-time from DB) + Google Analytics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs text-[#444] hover:text-[#888] transition-colors border border-[#1a1a1a] px-3 py-1.5 rounded-lg"
          >
            <RefreshCw size={11} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <a
            href={GA4_DASHBOARD}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs bg-white text-black font-medium px-3 py-1.5 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            <ExternalLink size={11} />
            Open GA4
          </a>
        </div>
      </div>

      {/* GA4 banner */}
      <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl px-5 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#161616] rounded-lg flex items-center justify-center">
            <TrendingUp size={14} className="text-orange-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Google Analytics 4</p>
            <p className="text-xs text-[#444]">
              Property ID: G-T6MZDNY8R3 · Full session, bounce, and acquisition data
            </p>
          </div>
        </div>
        <a
          href={GA4_DASHBOARD}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 flex items-center gap-1.5 text-xs text-[#555] hover:text-white border border-[#1a1a1a] hover:border-[#2a2a2a] px-3 py-1.5 rounded-lg transition-colors"
        >
          View reports <ExternalLink size={10} />
        </a>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatCard
          label="Total blog views"
          value={loading ? <span className="w-16 h-8 bg-[#111] rounded animate-pulse block" /> : totalViews.toLocaleString()}
          sub="All posts, all time"
          icon={Eye}
          accent
        />
        <StatCard
          label="Blog posts"
          value={loading ? <span className="w-8 h-8 bg-[#111] rounded animate-pulse block" /> : blogViews.length}
          sub="Published"
          icon={FileText}
        />
        <StatCard
          label="Top post views"
          value={loading ? <span className="w-12 h-8 bg-[#111] rounded animate-pulse block" /> : (topPost?.views ?? 0).toLocaleString()}
          sub={topPost ? slug2title(topPost.slug) : "—"}
          icon={Users}
        />
      </div>

      {/* Blog post view table */}
      <Card>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Eye size={14} className="text-[#444]" />
            <span className="text-sm font-medium text-white">Blog post views</span>
          </div>
          <span className="text-xs text-[#333] font-mono">
            Updated {lastRefreshed.toLocaleTimeString()}
          </span>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 bg-[#0d0d0d] rounded-lg animate-pulse" />
            ))}
          </div>
        ) : blogViews.length === 0 ? (
          <p className="text-xs text-[#333] text-center py-8">
            No views recorded yet. Views appear after the first page load.
          </p>
        ) : (
          <div className="space-y-3">
            {blogViews.map((post) => {
              const pct = Math.round((post.views / maxViews) * 100);
              return (
                <div key={post.slug} className="group">
                  <div className="flex items-center justify-between mb-1">
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-[#888] hover:text-white transition-colors truncate max-w-[320px]"
                    >
                      {slug2title(post.slug)}
                    </a>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-[#555] font-mono">
                        {post.views.toLocaleString()} views
                      </span>
                      {post.last_viewed_at && (
                        <span className="text-[10px] text-[#333] font-mono hidden sm:block">
                          Last: {new Date(post.last_viewed_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="h-1 bg-[#111] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0070f3]/60 group-hover:bg-[#0070f3] rounded-full transition-colors duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* GA4 embed note */}
      <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl px-5 py-4">
        <p className="text-xs font-medium text-white mb-1">Full traffic analytics</p>
        <p className="text-xs text-[#444] leading-relaxed mb-3">
          Session counts, acquisition channels, device breakdown, and conversion tracking
          are available in Google Analytics. Sign in with{" "}
          <span className="text-[#666] font-mono">{ADMIN_EMAIL}</span> to view the full dashboard.
        </p>
        <a
          href={GA4_DASHBOARD}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-[#555] hover:text-white transition-colors"
        >
          analytics.google.com <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
}
