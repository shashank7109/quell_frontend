import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getDocPage, getAllDocSlugs, NAV } from "@/lib/docs";
import { components } from "@/components/docs/MdxComponents";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface Props {
  params: { slug?: string[] };
}

export async function generateStaticParams() {
  const slugs = getAllDocSlugs();
  return [
    { slug: undefined },
    ...slugs.map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug ?? [];
  const page = getDocPage(slug);
  if (!page) return {};
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: page.meta.href },
  };
}

function flattenNav() {
  const pages: { title: string; href: string }[] = [];
  function walk(items: typeof NAV) {
    for (const item of items) {
      if (item.href) pages.push({ title: item.title, href: item.href });
      if (item.items) walk(item.items);
    }
  }
  walk(NAV);
  return pages;
}

export default function DocsPage({ params }: Props) {
  const slug = params.slug ?? [];
  const page = getDocPage(slug);
  if (!page) notFound();

  const allPages = flattenNav();
  const currentIndex = allPages.findIndex((p) => p.href === page.meta.href);
  const prev = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const next = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-[#444] mb-8">
        <Link href="/docs" className="hover:text-[#888] transition-colors">Docs</Link>
        {slug.map((s, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <ChevronRight size={12} />
            <span className={i === slug.length - 1 ? "text-[#888]" : "hover:text-[#888]"}>
              {s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " ")}
            </span>
          </span>
        ))}
      </div>

      {/* Content */}
      <article className="prose-custom">
        <MDXRemote
          source={page.content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </article>

      {/* Prev / Next */}
      {(prev || next) && (
        <div className="mt-16 pt-8 border-t border-[#111] flex items-center justify-between gap-4">
          {prev ? (
            <Link
              href={prev.href}
              className="group flex items-center gap-2 text-sm text-[#555] hover:text-white transition-colors"
            >
              <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              <div>
                <p className="text-[11px] text-[#333] mb-0.5">Previous</p>
                <p className="font-medium">{prev.title}</p>
              </div>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              href={next.href}
              className="group flex items-center gap-2 text-sm text-[#555] hover:text-white transition-colors text-right"
            >
              <div>
                <p className="text-[11px] text-[#333] mb-0.5">Next</p>
                <p className="font-medium">{next.title}</p>
              </div>
              <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ) : <div />}
        </div>
      )}
    </div>
  );
}
