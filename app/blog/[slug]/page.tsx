import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getBlogPost, getAllBlogSlugs } from "@/lib/blog";
import { blogComponents } from "@/components/blog/BlogMdxComponents";
import { sanitizeMdxContent } from "@/lib/mdx-safe";
import { ChevronLeft } from "lucide-react";
import BlogViewCounter from "@/components/BlogViewCounter";


const BASE_URL = "https://quell.buildsbyshashank.tech";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const url = `${BASE_URL}/blog/${slug}`;
  return {
    title: post.meta.title,
    description: post.meta.description,
    keywords: post.meta.tags,
    authors: [{ name: "Shashank Bindal", url: "https://shashankbindal.me" }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.meta.title,
      description: post.meta.description,
      publishedTime: post.meta.date,
      authors: ["Shashank Bindal"],
      tags: post.meta.tags,
      images: [
        {
          url: post.meta.ogImage ?? "/quell_logo.png",
          width: 1200,
          height: 630,
          alt: post.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.description,
      images: [post.meta.ogImage ?? "/quell_logo.png"],
      creator: "@shashank7109",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  // Strip leading H1 (already rendered in header) and sanitize MDX prose
  const contentBody = sanitizeMdxContent(
    post.content.replace(/^#[^\n]*\n+/, "").trimStart()
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    dateModified: post.meta.date,
    author: {
      "@type": "Person",
      name: "Shashank Bindal",
      url: "https://shashankbindal.me",
    },
    publisher: {
      "@type": "Organization",
      name: "Quell",
      url: BASE_URL,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/blog/${slug}` },
    keywords: post.meta.tags.join(", "),
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          </div>
          <Link href="/auth/sign-up" className="text-sm bg-white text-black font-medium px-4 py-1.5 rounded-md hover:bg-neutral-100 transition-colors">
            Get started
          </Link>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-[#444] hover:text-[#888] transition-colors mb-10"
          >
            <ChevronLeft size={12} /> All posts
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-5 text-xs text-[#333] font-mono">
              <time dateTime={post.meta.date}>
                {new Date(post.meta.date).toLocaleDateString("en-US", {
                  year: "numeric", month: "long", day: "numeric",
                })}
              </time>
              <span className="text-[#222]">·</span>
              <span>{post.meta.readTime} min read</span>
              <span className="text-[#222]">·</span>
              <BlogViewCounter slug={slug} />
            </div>
            <h1 className="text-2xl md:text-[2rem] font-bold tracking-tight leading-snug mb-4 text-[#e8e8e8]">
              {post.meta.title}
            </h1>
            <p className="text-[#666] text-base leading-relaxed font-serif">
              {post.meta.description}
            </p>
          </header>

          {/* Content */}
          <article className="prose-custom">
            <MDXRemote
              source={contentBody}
              components={blogComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </article>

          {/* Footer CTA */}
          <div className="mt-16 pt-8 border-t border-[#111]">
            <p className="text-xs text-[#333] uppercase tracking-widest font-medium mb-4">Try Quell</p>
            <p className="text-[#555] text-sm mb-5">
              Install Quell and run it on your codebase — no API key, no configuration.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/docs/quickstart"
                className="inline-flex items-center justify-center gap-2 bg-white text-black font-medium px-5 py-2.5 rounded-lg hover:bg-neutral-100 transition-colors text-sm"
              >
                Read the docs
              </Link>
              <a
                href="https://github.com/shashank7109/quelltest_lib"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[#1a1a1a] text-[#555] font-medium px-5 py-2.5 rounded-lg hover:text-white hover:border-[#2a2a2a] transition-colors text-sm"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
