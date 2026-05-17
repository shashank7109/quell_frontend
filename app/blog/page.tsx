import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getAllBlogPosts } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog — Python Testing, Edge Cases, and Production Readiness",
  description:
    "Practical articles on Python edge case testing, Production Readiness Score, the 5-gate pipeline, PySpark schema testing, and test generation. Written by the team behind Quell.",
  alternates: { canonical: "https://quell.buildsbyshashank.tech/blog" },
  openGraph: {
    title: "Quell Blog — Python Testing & Production Readiness",
    description:
      "Practical articles on Python edge case testing, Production Readiness Score, the 5-gate pipeline, and test generation. Written by the team behind Quell.",
    url: "https://quell.buildsbyshashank.tech/blog",
    type: "website",
  },
};

/* ── Per-category card header styles ── */
const CATEGORY_STYLE: Record<string, { bg: string; icon: React.ReactNode }> = {
  "Case Study": {
    bg: "bg-[#c1440e]",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#e8724a]/60">
        <circle cx="21" cy="21" r="12"/><line x1="30" y1="30" x2="42" y2="42"/>
        <line x1="16" y1="21" x2="26" y2="21"/><line x1="21" y1="16" x2="21" y2="26"/>
      </svg>
    ),
  },
  "Product": {
    bg: "bg-[#1b5e3b]",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4ade80]/50">
        <path d="M24 6l18 10v16L24 42 6 32V16z"/>
        <path d="M24 42V26"/><path d="M42 16L24 26 6 16"/>
      </svg>
    ),
  },
  "Engineering": {
    bg: "bg-[#1e3a5f]",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#60a5fa]/50">
        <polyline points="14,18 6,24 14,30"/><polyline points="34,18 42,24 34,30"/>
        <line x1="20" y1="8" x2="28" y2="40"/>
      </svg>
    ),
  },
  "Tutorial": {
    bg: "bg-[#3b1f6b]",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#c084fc]/50">
        <rect x="8" y="6" width="32" height="36" rx="3"/>
        <line x1="16" y1="16" x2="32" y2="16"/><line x1="16" y1="22" x2="32" y2="22"/>
        <line x1="16" y1="28" x2="24" y2="28"/>
      </svg>
    ),
  },
  "Data Engineering": {
    bg: "bg-[#1a4a4a]",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2dd4bf]/50">
        <ellipse cx="24" cy="14" rx="14" ry="5"/>
        <path d="M10 14v8c0 2.76 6.27 5 14 5s14-2.24 14-5v-8"/>
        <path d="M10 22v8c0 2.76 6.27 5 14 5s14-2.24 14-5v-8"/>
      </svg>
    ),
  },
  "Article": {
    bg: "bg-[#2a2a2a]",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#888]/50">
        <rect x="8" y="6" width="32" height="36" rx="3"/>
        <line x1="16" y1="16" x2="32" y2="16"/><line x1="16" y1="22" x2="32" y2="22"/>
        <line x1="16" y1="28" x2="24" y2="28"/>
      </svg>
    ),
  },
};

function getCategoryStyle(category: string) {
  return CATEGORY_STYLE[category] ?? CATEGORY_STYLE["Article"];
}

function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const style = getCategoryStyle(post.meta.category);

  return (
    <Link
      href={`/blog/${post.meta.slug}`}
      className={[
        "group flex flex-col rounded-2xl overflow-hidden border border-[#1a1a1a]",
        "hover:border-[#2a2a2a] transition-all duration-200 bg-[#0d0d0d]",
        featured ? "md:col-span-2" : "",
      ].join(" ")}
    >
      {/* Coloured header */}
      <div className={`relative flex items-center justify-center ${style.bg} ${featured ? "h-52" : "h-36"} shrink-0`}>
        {style.icon}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-[10px] font-semibold tracking-widest text-[#555] uppercase mb-3">
          {post.meta.category}
        </p>
        <h2 className={[
          "font-bold text-[#e2e2e2] leading-snug mb-3 group-hover:text-[#bbb] transition-colors",
          featured ? "text-xl md:text-2xl" : "text-base",
        ].join(" ")}>
          {post.meta.title}
        </h2>
        {featured && (
          <p className="text-[#555] text-sm leading-relaxed mb-4 line-clamp-2">
            {post.meta.description}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#111]">
          <time className="text-xs text-[#333] font-mono">
            {new Date(post.meta.date).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </time>
          <span className="text-xs text-[#333] group-hover:text-[#888] transition-colors flex items-center gap-1">
            Read more <ArrowRight size={11} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-[#111] bg-black/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/">
            <Image src="/quell_logo.png" alt="Quell" width={76} height={24} className="h-6 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-7 text-sm text-[#555]">
            <Link href="/#how-it-works" className="hover:text-white transition-colors">How it works</Link>
            <Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <Link href="/blog" className="text-white">Blog</Link>
          </div>
          <Link href="/auth/sign-up" className="text-sm bg-white text-black font-medium px-4 py-1.5 rounded-md hover:bg-neutral-100 transition-colors">
            Get started
          </Link>
        </div>
      </nav>

      <main className="pt-20 md:pt-24 pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <p className="text-xs font-medium tracking-widest text-[#333] uppercase mb-3">Blog</p>
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-[#e8e8e8]">
              Python Testing, Edge Cases & Production Readiness
            </h1>
            <p className="text-[#555] text-sm">
              Engineering decisions, tutorials, and product updates from the Quell team.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="text-[#333] text-sm">No posts yet.</p>
          ) : (
            <div className="space-y-4">
              {/* Featured post + first sidebar */}
              {posts.length >= 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <BlogCard post={posts[0]} featured={false} />
                  <BlogCard post={posts[1]} featured={false} />
                </div>
              )}

              {/* Remaining posts — 3-column grid */}
              {posts.length > 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {posts.slice(2).map((post) => (
                    <BlogCard key={post.meta.slug} post={post} />
                  ))}
                </div>
              )}

              {/* Single post fallback */}
              {posts.length === 1 && <BlogCard post={posts[0]} />}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
