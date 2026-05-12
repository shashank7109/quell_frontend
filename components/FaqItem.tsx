"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#111] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="text-[#ccc] text-sm font-medium group-hover:text-white transition-colors leading-snug">
          {q}
        </span>
        <ChevronDown
          size={15}
          className={`text-[#555] flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="text-[#888] text-sm leading-relaxed pb-5 pr-8">
          {a}
        </p>
      )}
    </div>
  );
}
