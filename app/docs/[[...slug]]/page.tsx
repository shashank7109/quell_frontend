import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getDocPage, getAllDocSlugs, flattenNav } from "@/lib/docs";
import { components } from "@/components/docs/MdxComponents";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

// Next.js 15: params is a Promise
interface Props {
  params: Promise<{ slug?: string[] }>;
}

export async function generateStaticParams() {
  const slugs = getAllDocSlugs();
  return [
    { slug: [] },
    ...slugs.map((slug) => ({ slug })),
  ];
}

const BASE_URL = "https://quell.buildsbyshashank.tech";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug = [] } = await params;
  const page = getDocPage(slug);
  if (!page) return {};
  const canonical = `${BASE_URL}${page.meta.href}`;
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical },
    openGraph: {
      title: `${page.meta.title} | Quelltest Docs`,
      description: page.meta.description,
      url: canonical,
      siteName: "Quelltest",
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${page.meta.title} | Quelltest Docs`,
      description: page.meta.description,
    },
  };
}

export default async function DocsPage({ params }: Props) {
  const { slug = [] } = await params;
  const page = getDocPage(slug);
  if (!page) notFound();

  const allPages = flattenNav();
  const currentIndex = allPages.findIndex((p) => p.href === page.meta.href);
  const prev = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const next = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "Docs", item: `${BASE_URL}/docs` },
    ...slug.map((s, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " "),
      item: `${BASE_URL}/docs/${slug.slice(0, i + 1).join("/")}`,
    })),
  ];
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
