"use client";
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "";

interface Props {
  slug: string;
  initialViews?: number;
}

export default function BlogViewCounter({ slug, initialViews = 0 }: Props) {
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    // Increment on mount, update displayed count
    fetch(`${API}/api/blog/views/${slug}/increment`, { method: "POST" })
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data?.views) setViews(data.views); })
      .catch(() => {});
  }, [slug]);

  return (
    <span className="inline-flex items-center gap-1 text-xs text-[#333] font-mono">
      <Eye size={11} className="text-[#333]" />
      {views.toLocaleString()} {views === 1 ? "view" : "views"}
    </span>
  );
}
