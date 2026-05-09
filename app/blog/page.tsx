import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Python Testing, Docstrings, and Requirement Coverage",
  description:
    "Practical articles on spec-first Python testing, requirement coverage, PySpark schema testing, and test generation. Written by the team behind Quell.",
  alternates: { canonical: "https://quell.buildsbyshashank.tech/blog" },
  openGraph: {
    title: "Quell Blog — Python Testing Insights",
    description:
      "Practical articles on spec-first Python testing, requirement coverage, PySpark schema testing, and test generation.",
    url: "https://quell.buildsbyshashank.tech/blog",
    type: "website",
  },
};

const TAG_COLORS: Record<string, string> = {
  python: "bg-blue-950 text-blue-400",
  pytest: "bg-green-950 text-green-400",
  pyspark: "bg-orange-950 text-orange-400",
  testing: "bg-purple-950 text-purple-400",
  quelltest: "bg-[#1a1a1a] text-[#888]",
  "test generation": "bg-[#1a1a1a] text-[#888]",
  "code quality": "bg-[#1a1a1a] text-[#888]",
  "data engineering": "bg-yellow-950 text-yellow-400",
};

function TagBadge({ tag }: { tag: string }) {
  const cls = TAG_COLORS[tag.toLowerCase()] ?? "bg-[#1a1a1a] text-[#555]";
  return (
    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${cls}`}>
      {tag}
    </span>
  );
}

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

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

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-medium tracking-widest text-[#333] uppercase mb-3">Blog</p>
            <h1 className="text-3xl font-bold tracking-tight mb-3">
              Python Testing & Requirement Coverage
            </h1>
            <p className="text-[#555] text-sm leading-relaxed">
              Practical articles on spec-first testing, docstring-driven test generation,
              PySpark schema validation, and building test suites that actually prove requirements.
            </p>
          </div>

          <div className="divide-y divide-[#0f0f0f]">
            {posts.map((post) => (
              <article key={post.meta.slug} className="py-8 group">
                <Link href={`/blog/${post.meta.slug}`} className="block">
                  <div className="flex items-center gap-3 mb-3">
                    <time className="text-xs text-[#333] font-mono">
                      {new Date(post.meta.date).toLocaleDateString("en-US", {
                        year: "numeric", month: "long", day: "numeric",
                      })}
                    </time>
                    <span className="text-[#222]">·</span>
                    <span className="text-xs text-[#333] font-mono">{post.meta.readTime} min read</span>
                  </div>
                  <h2 className="text-lg font-semibold text-white group-hover:text-[#ccc] transition-colors mb-2 leading-snug">
                    {post.meta.title}
                  </h2>
                  <p className="text-[#555] text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.meta.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.meta.tags.map((tag) => (
                      <TagBadge key={tag} tag={tag} />
                    ))}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
