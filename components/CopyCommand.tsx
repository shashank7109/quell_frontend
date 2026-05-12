"use client";
import { useState } from "react";
import { Copy, CheckCheck } from "lucide-react";

export default function CopyCommand() {
  const [copied, setCopied] = useState(false);
  const cmd = "pip install quelltest";

  function copy() {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={copy}
      aria-label="Copy install command"
      className="group flex items-center gap-3 bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#2a2a2a] rounded-lg px-4 py-2.5 transition-colors w-full sm:w-auto"
    >
      <span className="font-mono text-sm text-[#888]">
        <span className="text-[#555]">$ </span>{cmd}
      </span>
      <span className="text-[#555] group-hover:text-[#777] transition-colors ml-auto pl-2 border-l border-[#1a1a1a]">
        {copied ? <CheckCheck size={13} className="text-green-400" /> : <Copy size={13} />}
      </span>
    </button>
  );
}
