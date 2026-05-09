import type { MDXComponents } from "mdx/types";

function Callout({ type = "info", children }: { type?: "info" | "warning" | "danger" | "tip"; children: React.ReactNode }) {
  const styles = {
    info:    { border: "#1a3a5c", bg: "#0a1929", icon: "ℹ", color: "#60a5fa" },
    warning: { border: "#4a3a00", bg: "#1a1500", icon: "⚠", color: "#fbbf24" },
    danger:  { border: "#4a1a1a", bg: "#1a0909", icon: "✕", color: "#f87171" },
    tip:     { border: "#1a4a2a", bg: "#091a10", icon: "✓", color: "#34d399" },
  };
  const s = styles[type];
  return (
    <div style={{ borderColor: s.border, backgroundColor: s.bg }} className="rounded-lg border px-4 py-3 my-4 flex gap-3">
      <span style={{ color: s.color }} className="text-sm font-bold mt-0.5 shrink-0">{s.icon}</span>
      <div style={{ color: s.color }} className="text-sm leading-relaxed [&>p]:m-0">{children}</div>
    </div>
  );
}

function Card({ title, children, icon }: { title: string; children: React.ReactNode; icon?: string }) {
  return (
    <div className="rounded-lg border border-[#1a1a1a] bg-[#0a0a0a] p-4 my-3">
      <div className="flex items-center gap-2 mb-2">
        {icon && <span className="text-lg">{icon}</span>}
        <h4 className="text-white font-semibold text-sm m-0">{title}</h4>
      </div>
      <div className="text-[#888] text-sm leading-relaxed [&>p]:m-0">{children}</div>
    </div>
  );
}

function CardGroup({ children }: { children: React.ReactNode }) {
  return <div className="grid md:grid-cols-2 gap-3 my-4">{children}</div>;
}

function Steps({ children }: { children: React.ReactNode }) {
  return <div className="relative pl-6 border-l border-[#1a1a1a] space-y-6 my-4">{children}</div>;
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-[#0070f3] flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </div>
      <h4 className="text-white font-semibold text-sm mb-1 mt-0">{title}</h4>
      <div className="text-[#888] text-sm leading-relaxed [&>p]:m-0">{children}</div>
    </div>
  );
}

function Tabs({ items, children }: { items: string[]; children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-lg border border-[#1a1a1a] overflow-hidden">
      <div className="flex border-b border-[#1a1a1a] bg-[#0a0a0a]">
        {items.map((item, i) => (
          <button key={i} className={`px-4 py-2 text-sm font-medium transition-colors ${i === 0 ? "text-white border-b-2 border-[#0070f3]" : "text-[#555] hover:text-white"}`}>
            {item}
          </button>
        ))}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export const components: MDXComponents = {
  Callout,
  Card,
  CardGroup,
  Steps,
  Step,
  Tabs,

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
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm border-collapse" {...p} />
    </div>
  ),
  thead: (p) => <thead className="border-b border-[#1a1a1a]" {...p} />,
  th: (p) => <th className="text-left text-[#555] font-medium px-4 py-2 text-xs uppercase tracking-wider" {...p} />,
  td: (p) => <td className="text-[#888] px-4 py-2.5 border-b border-[#0d0d0d]" {...p} />,
  tr: (p) => <tr className="hover:bg-[#0a0a0a] transition-colors" {...p} />,
  code: (p) => {
    if ((p as { className?: string }).className) return <code {...p} />;
    return <code className="font-mono text-[#e879f9] bg-[#1a0a1a] px-1.5 py-0.5 rounded text-xs" {...p} />;
  },
  pre: (p) => (
    <pre className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4 overflow-x-auto text-xs font-mono leading-6 my-4 [&>code]:text-[#ccc] [&>code]:bg-transparent [&>code]:p-0" {...p} />
  ),
};
