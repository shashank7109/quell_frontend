import type { MDXComponents } from "mdx/types";

export const blogComponents: MDXComponents = {
  h1: (p) => <h1 className="text-3xl font-bold text-[#e2e2e2] mb-2 mt-0 tracking-tight font-sans" {...p} />,
  h2: (p) => <h2 className="text-xl font-semibold text-[#e0e0e0] mt-10 mb-3 pb-2 border-b border-[#111] scroll-mt-20 font-sans" {...p} />,
  h3: (p) => <h3 className="text-base font-semibold text-[#d8d8d8] mt-6 mb-2 scroll-mt-20 font-sans" {...p} />,
  h4: (p) => <h4 className="text-sm font-semibold text-[#bbb] mt-4 mb-1 font-sans" {...p} />,
  p: (p) => <p className="text-[#9a9a9a] text-[17px] leading-8 mb-5 font-serif" {...p} />,
  a: (p) => <a className="text-[#4a9eff] hover:text-[#6eb3ff] hover:underline underline-offset-2 transition-colors" {...p} />,
  strong: (p) => <strong className="text-[#e0e0e0] font-semibold" {...p} />,
  em: (p) => <em className="text-[#b0b0b0] italic font-serif" {...p} />,
  ul: (p) => <ul className="text-[#9a9a9a] text-[17px] leading-8 mb-5 pl-5 space-y-1 list-disc marker:text-[#444] font-serif" {...p} />,
  ol: (p) => <ol className="text-[#9a9a9a] text-[17px] leading-8 mb-5 pl-5 space-y-1 list-decimal marker:text-[#444] font-serif" {...p} />,
  li: (p) => <li className="leading-8" {...p} />,
  blockquote: (p) => <blockquote className="border-l-2 border-[#0070f3] pl-4 text-[#707070] italic text-[17px] my-5 font-serif" {...p} />,
  hr: () => <hr className="border-[#111] my-8" />,
  table: (p) => (
    <div className="overflow-x-auto my-5">
      <table className="w-full text-sm border-collapse" {...p} />
    </div>
  ),
  thead: (p) => <thead className="border-b border-[#1a1a1a]" {...p} />,
  th: (p) => <th className="text-left text-[#555] font-medium px-4 py-2 text-xs uppercase tracking-wider" {...p} />,
  td: (p) => <td className="text-[#888] px-4 py-2.5 border-b border-[#0d0d0d]" {...p} />,
  tr: (p) => <tr className="hover:bg-[#0a0a0a] transition-colors" {...p} />,
  code: (p) => {
    if ((p as { className?: string }).className) return <code {...p} />;
    return <code className="font-mono text-[#e879f9] bg-[#1a0a1a] px-1.5 py-0.5 rounded text-[13px]" {...p} />;
  },
  pre: (p) => (
    <pre
      className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4 overflow-x-auto text-xs font-mono leading-6 my-5 [&>code]:text-[#ccc] [&>code]:bg-transparent [&>code]:p-0"
      {...p}
    />
  ),
};
