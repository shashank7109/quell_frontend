"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight, Copy, CheckCheck } from "lucide-react";

const plans = [
  {
    id: "hobby",
    name: "Hobby",
    price: "Free",
    sub: "forever",
    highlight: false,
    features: [
      "500 requirements / month",
      "1 API key",
      "Rule-based generation — no LLM key needed",
      "Docstring, Pydantic & PySpark scanning",
      "Diagnostic report (.quell/report.json)",
      "Community support",
    ],
    cta: "Get started",
    href: "/auth/sign-up",
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹1,599",
    sub: "/ month",
    highlight: true,
    features: [
      "Unlimited requirements",
      "5 API keys",
      "LLM fallback (Claude & GPT-4)",
      "Unlimited projects",
      "PR comment reports",
      "Usage analytics dashboard",
      "Email support",
    ],
    cta: "Start free trial",
    href: "/auth/sign-up?plan=pro",
  },
  {
    id: "team",
    name: "Team",
    price: "₹6,599",
    sub: "/ month",
    highlight: false,
    features: [
      "Everything in Pro",
      "Unlimited API keys",
      "10 team seats",
      "SSO / SAML",
      "Priority support + SLA",
    ],
    cta: "Contact sales",
    href: "mailto:hello@quell.dev",
  },
];

const SPEC_SOURCES = [
  {
    title: "Python Docstrings",
    sub: "Google · NumPy · Sphinx style",
    color: "#1e3a5f",
    accent: "#60a5fa",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="14,2 14,8 20,8"/><path d="M20 20H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10l6 6v12a2 2 0 0 1-2 2z"/>
        <line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/>
      </svg>
    ),
    tags: ["MUST_RAISE", "MUST_RETURN", "BOUNDARY"],
    example: 'Raises: ValueError: If amount is <= 0.',
  },
  {
    title: "Pydantic Models",
    sub: "Field validators · Literal types",
    color: "#1b5e3b",
    accent: "#4ade80",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l9 4.9V17L12 22l-9-4.9V7z"/><path d="M12 22V12"/><path d="M21 7l-9 5-9-5"/>
      </svg>
    ),
    tags: ["BOUNDARY", "ENUM_VALID"],
    example: 'amount: float = Field(gt=0, le=10_000)',
  },
  {
    title: "PySpark Schemas",
    sub: "StructType · StructField",
    color: "#1a4a4a",
    accent: "#2dd4bf",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
        <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6"/>
      </svg>
    ),
    tags: ["NOT_NULL", "TYPE_CHECK"],
    example: 'StructField("amount", DoubleType(), nullable=False)',
  },
];

function CopyCommand() {
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
      className="group flex items-center gap-3 bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#2a2a2a] rounded-lg px-4 py-2.5 transition-colors w-full sm:w-auto"
    >
      <span className="font-mono text-sm text-[#888]">
        <span className="text-[#444]">$ </span>{cmd}
      </span>
      <span className="text-[#444] group-hover:text-[#666] transition-colors ml-auto pl-2 border-l border-[#1a1a1a]">
        {copied ? <CheckCheck size={13} className="text-green-400" /> : <Copy size={13} />}
      </span>
    </button>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 w-full z-50 border-b border-[#111] bg-black/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Image src="/quell_logo.png" alt="Quell" width={76} height={24} className="h-6 w-auto" priority />
          <div className="hidden md:flex items-center gap-7 text-sm text-[#555]">
            <Link href="#how-it-works" className="hover:text-white transition-colors">How it works</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <a href="https://github.com/shashank7109/quelltest_lib" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/sign-in" className="text-sm text-[#555] hover:text-white transition-colors">Sign in</Link>
            <Link href="/auth/sign-up" className="text-sm bg-white text-black font-medium px-4 py-1.5 rounded-md hover:bg-neutral-100 transition-colors">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-24 pb-0 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.05fr] gap-10 items-start pt-10">

          {/* Left */}
          <div className="py-6">
            <div className="inline-flex items-center gap-2 text-xs text-[#555] border border-[#1a1a1a] rounded-full px-3.5 py-1.5 mb-8 bg-[#0a0a0a]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              quelltest 0.5.0 — PySpark schema scanning live
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-5">
              Your specs say what
              <br />
              <span className="text-[#444]">your code should do.</span>
              <br />
              Quell proves it.
            </h1>

            <p className="text-[#666] text-base leading-relaxed mb-8 max-w-[430px]">
              Quell reads your Python docstrings, Pydantic models, and PySpark schemas —
              extracts every testable requirement — generates verified pytest tests that
              actually prove each one. Two-phase verification before anything touches disk.
              No LLM key required.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/auth/sign-up"
                className="inline-flex items-center justify-center gap-2 bg-white text-black font-medium px-5 py-2.5 rounded-lg hover:bg-neutral-100 transition-colors text-sm"
              >
                Start for free <ArrowRight size={13} />
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

            <CopyCommand />

            <div className="mt-8 flex items-center gap-5 text-xs text-[#333]">
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#333]" />no LLM needed</span>
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#333]" />zero false positives</span>
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#333]" />MIT license</span>
            </div>
          </div>

          {/* Right — Terminal */}
          <div className="bg-[#080808] border border-[#1a1a1a] rounded-xl overflow-hidden font-mono text-xs md:sticky md:top-20">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#111]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#222]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#222]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#222]" />
              <span className="ml-3 text-[#333] text-[11px]">quell — bash</span>
            </div>
            <div className="p-5 space-y-1 leading-[1.8]">
              <p>
                <span className="text-[#333]">$ </span>
                <span className="text-[#e2e2e2]">quell check src/ --fix --no-llm</span>
              </p>
              <p className="text-[#3a3a3a]">  scanning 3 spec sources...</p>
              <p className="text-[#2a2a2a] pt-1">  ─────────────────────────────────────</p>
              <p>
                <span className="text-[#444]">  process_payment  </span>
                <span className="text-yellow-700">MUST_RAISE  </span>
                <span className="text-green-600">✓ verified</span>
              </p>
              <p>
                <span className="text-[#444]">  process_payment  </span>
                <span className="text-yellow-700">MUST_RETURN </span>
                <span className="text-green-600">✓ verified</span>
              </p>
              <p>
                <span className="text-[#444]">  PaymentRequest   </span>
                <span className="text-yellow-700">BOUNDARY    </span>
                <span className="text-green-600">✓ verified</span>
              </p>
              <p>
                <span className="text-[#444]">  PaymentRequest   </span>
                <span className="text-yellow-700">ENUM_VALID  </span>
                <span className="text-green-600">✓ verified</span>
              </p>
              <p>
                <span className="text-[#444]">  payment_schema   </span>
                <span className="text-yellow-700">NOT_NULL    </span>
                <span className="text-green-600">✓ verified</span>
              </p>
              <p>
                <span className="text-[#444]">  payment_schema   </span>
                <span className="text-yellow-700">TYPE_CHECK  </span>
                <span className="text-green-600">✓ verified</span>
              </p>
              <p className="text-[#2a2a2a]">  ─────────────────────────────────────</p>
              <p className="text-green-600">  6 tests written → tests/test_payments.py</p>
              <p className="text-[#444]">  Score: 100% (6/6 covered)</p>
              <p className="text-[#2a2a2a]">  Your code never left your machine.</p>
              <p className="pt-2 text-[#333]">$ <span className="animate-pulse">▋</span></p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Works with strip ── */}
      <div className="border-t border-[#111] mt-12">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="text-xs text-[#333] uppercase tracking-widest font-medium">Works with</span>
          {[
            { label: "pytest" },
            { label: "Pydantic" },
            { label: "PySpark" },
            { label: "libcst" },
            { label: "GitHub Actions" },
            { label: "Claude" },
            { label: "GPT-4" },
          ].map((t) => (
            <span key={t.label} className="text-sm font-mono text-[#444]">
              {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── What Quell reads ── */}
      <section className="py-16 px-6 border-t border-[#111]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-medium tracking-widest text-[#333] uppercase mb-3">Spec sources</p>
            <h2 className="text-2xl font-bold text-[#e2e2e2] tracking-tight">
              Three places where requirements already live in your codebase.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {SPEC_SOURCES.map((src) => (
              <div
                key={src.title}
                className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] overflow-hidden"
              >
                {/* colored header */}
                <div
                  className="flex items-center gap-3 px-5 py-4"
                  style={{ backgroundColor: src.color }}
                >
                  <span style={{ color: src.accent }}>{src.icon}</span>
                  <div>
                    <p className="text-[#e2e2e2] font-semibold text-sm">{src.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: src.accent, opacity: 0.7 }}>{src.sub}</p>
                  </div>
                </div>

                {/* body */}
                <div className="px-5 py-4">
                  <p className="font-mono text-[11px] text-[#444] bg-[#060606] border border-[#111] rounded px-3 py-2 mb-4 leading-relaxed">
                    {src.example}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {src.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono font-medium px-2 py-0.5 rounded border"
                        style={{ color: src.accent, borderColor: src.color, backgroundColor: src.color + "33" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-20 px-6 border-t border-[#111]">
        <div className="max-w-5xl mx-auto">

          <div className="mb-16">
            <p className="text-xs font-medium tracking-widest text-[#333] uppercase mb-3">How it works</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#e2e2e2] tracking-tight max-w-md">
              From spec to verified test in seconds.
            </h2>
          </div>

          <div className="divide-y divide-[#111]">
            {[
              {
                n: "01",
                title: "Read specs from three sources",
                body: "Quell scans Python docstrings (Raises:, Returns:, Args: sections), Pydantic models (Field validators, Literal type annotations), and PySpark StructType definitions — all via AST, no imports, no test execution.",
                snippet: [
                  { t: "dim", v: "$ " },
                  { t: "white", v: "quell check src/ --no-llm" },
                  { t: "nl" },
                  { t: "muted", v: "  [docstring]  MUST_RAISE  ValueError: amount <= 0" },
                  { t: "nl" },
                  { t: "muted", v: "  [pydantic]   BOUNDARY    amount: gt=0, le=10000" },
                  { t: "nl" },
                  { t: "muted", v: "  [pydantic]   ENUM_VALID  currency: USD|EUR|GBP" },
                  { t: "nl" },
                  { t: "muted", v: "  [pyspark]    NOT_NULL    amount must not be null" },
                  { t: "nl" },
                  { t: "muted", v: "  [pyspark]    TYPE_CHECK  payment_schema structure" },
                ],
              },
              {
                n: "02",
                title: "Find gaps — no test execution needed",
                body: "An AST-based coverage checker scans your test files and marks each requirement as covered or uncovered. Static, fast, no pytest run required at scan time.",
                snippet: [
                  { t: "muted", v: "  Score: 0% (0/5 covered)" },
                  { t: "nl" },
                  { t: "muted", v: "  5 gap(s) found." },
                  { t: "nl" },
                  { t: "nl" },
                  { t: "muted", v: "  Run --fix to generate tests." },
                ],
              },
              {
                n: "03",
                title: "Verify before writing — the moat",
                body: "Every generated test must PASS on correct code AND FAIL on violated code. Quell injects targeted violations per constraint kind — comments out the raise, weakens the Field bound, flips nullable — then runs both phases in subprocess isolation.",
                snippet: [
                  { t: "green", v: "  ✓ phase 1: passes on original code" },
                  { t: "nl" },
                  { t: "green", v: "  ✓ phase 2: fails on violated code" },
                  { t: "nl" },
                  { t: "muted", v: "  → proven. safe to write." },
                ],
              },
              {
                n: "04",
                title: "Write with libcst. Always restore.",
                body: "Tests are injected using libcst — a lossless concrete syntax tree. Comments, spacing, and formatting are preserved. Source is backed up first and always restored in a finally block, no matter what.",
                snippet: [
                  { t: "muted", v: "  backed up  src/ → .quell/backups/" },
                  { t: "nl" },
                  { t: "green", v: "  ✓ tests/test_payments.py  +6 tests" },
                  { t: "nl" },
                  { t: "muted", v: "  report: .quell/report.json" },
                  { t: "nl" },
                  { t: "muted", v: "  Your code never left your machine." },
                ],
              },
            ].map((step) => (
              <div key={step.n} className="grid md:grid-cols-[1fr_1fr] gap-8 py-10">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#2a2a2a] tracking-widest block mb-4">{step.n}</span>
                  <h3 className="text-[#e0e0e0] font-semibold text-lg mb-3 leading-snug">{step.title}</h3>
                  <p className="text-[#555] text-sm leading-relaxed">{step.body}</p>
                </div>
                <div className="bg-[#080808] border border-[#111] rounded-xl px-5 py-4 font-mono text-xs leading-[1.9] self-start">
                  {step.snippet.map((token, i) => {
                    if (token.t === "nl") return <br key={i} />;
                    const cls =
                      token.t === "white" ? "text-[#e2e2e2]" :
                      token.t === "green" ? "text-green-600" :
                      token.t === "dim"   ? "text-[#444]" :
                      "text-[#444]";
                    return <span key={i} className={cls}>{token.v}</span>;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Rule-based first ── */}
      <section className="py-16 px-6 border-t border-[#111]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.4fr] gap-12 items-start">
          <div>
            <p className="text-xs font-medium tracking-widest text-[#333] uppercase mb-4">Design principle</p>
            <h2 className="text-2xl font-bold text-[#e2e2e2] tracking-tight mb-4">
              Rule-based first.<br />LLM as last resort.
            </h2>
            <p className="text-[#555] text-sm leading-relaxed">
              Most test generation tools send your code to an LLM and hope for the best.
              Quell inverts this. Every constraint kind has a deterministic rule-based generator —
              no network call, no hallucinations, no API key. The rule engine covers ~75% of
              real requirements. LLM handles the rest — only if you configure one.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              "MUST_RAISE",
              "MUST_RETURN",
              "BOUNDARY",
              "ENUM_VALID",
              "NOT_NULL",
              "TYPE_CHECK",
              { label: "CUSTOM →  LLM", dim: true },
            ].map((op) => {
              const label = typeof op === "string" ? op : op.label;
              const dim   = typeof op === "string" ? false : op.dim;
              return (
                <div
                  key={label}
                  className={`border rounded-lg px-3 py-2 font-mono text-[11px] ${
                    dim
                      ? "border-[#111] text-[#2a2a2a]"
                      : "border-[#1a1a1a] text-[#555]"
                  }`}
                >
                  {label}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CLI reference ── */}
      <section className="py-16 px-6 border-t border-[#111]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-medium tracking-widest text-[#333] uppercase mb-3">CLI</p>
            <h2 className="text-2xl font-bold text-[#e2e2e2] tracking-tight">
              One tool, a few commands.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              {
                cmd: "quell check src/ --no-llm",
                desc: "Scan for requirement gaps — no LLM, no network.",
              },
              {
                cmd: "quell check src/ --fix --no-llm",
                desc: "Generate and verify tests for every uncovered requirement.",
              },
              {
                cmd: "quell check src/ --ci --threshold 0.80",
                desc: "Fail CI if requirement coverage drops below 80%.",
              },
              {
                cmd: "quell pr <PR_NUMBER> --comment",
                desc: "Post a coverage gap report as a PR comment.",
              },
              {
                cmd: "quell score --badge",
                desc: "Print the current requirement coverage score.",
              },
              {
                cmd: "quell install --pr",
                desc: "Write the GitHub Actions workflow to your repo.",
              },
            ].map((item) => (
              <div key={item.cmd} className="bg-[#080808] border border-[#111] rounded-xl px-5 py-4">
                <p className="font-mono text-[12px] text-[#7cc2ff] mb-1.5">{item.cmd}</p>
                <p className="text-[#555] text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Diagnostic report ── */}
      <section className="py-16 px-6 border-t border-[#111]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.4fr] gap-12 items-start">
          <div>
            <p className="text-xs font-medium tracking-widest text-[#333] uppercase mb-4">Privacy-safe feedback loop</p>
            <h2 className="text-2xl font-bold text-[#e2e2e2] tracking-tight mb-4">
              Every run generates a diagnostic report.
            </h2>
            <p className="text-[#555] text-sm leading-relaxed">
              After every <code className="text-[#888] font-mono text-xs">--fix</code> run, Quell writes{" "}
              <code className="text-[#888] font-mono text-xs">.quell/report.json</code> — a
              privacy-safe file recording where the rule engine succeeded, what it skipped,
              and which argument types it couldn&apos;t stub. No source code. Safe to share.
            </p>
          </div>
          <div className="bg-[#080808] border border-[#111] rounded-xl px-5 py-4 font-mono text-xs leading-[1.9]">
            <p className="text-[#333]">{"{"}</p>
            <p className="pl-4"><span className="text-[#555]">&quot;quell_version&quot;</span><span className="text-[#333]">: </span><span className="text-[#888]">&quot;0.5.0&quot;</span><span className="text-[#333]">,</span></p>
            <p className="pl-4"><span className="text-[#555]">&quot;written&quot;</span><span className="text-[#333]">: </span><span className="text-green-600">6</span><span className="text-[#333]">,</span></p>
            <p className="pl-4"><span className="text-[#555]">&quot;fails_on_correct&quot;</span><span className="text-[#333]">: </span><span className="text-yellow-700">0</span><span className="text-[#333]">,</span></p>
            <p className="pl-4"><span className="text-[#555]">&quot;doesnt_catch_violation&quot;</span><span className="text-[#333]">: </span><span className="text-green-600">0</span><span className="text-[#333]">,</span></p>
            <p className="pl-4"><span className="text-[#555]">&quot;spec_sources&quot;</span><span className="text-[#333]">: [</span><span className="text-[#888]">&quot;docstring&quot;, &quot;pydantic&quot;, &quot;pyspark&quot;</span><span className="text-[#333]">],</span></p>
            <p className="pl-4 text-[#333]">&quot;_note&quot;: &quot;No source code. Safe to share.&quot;</p>
            <p className="text-[#333]">{"}"}</p>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-20 px-6 border-t border-[#111]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-medium tracking-widest text-[#333] uppercase mb-3">Pricing</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#e2e2e2] tracking-tight">
              Free to start. Scale when you need to.
            </h2>
            <p className="text-[#444] text-sm mt-2">
              Rule-based generation is free forever. LLM fallback and CI features are Pro.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-xl p-7 border flex flex-col ${
                  plan.highlight
                    ? "border-[#0070f3] bg-[#0a0a0a]"
                    : "border-[#1a1a1a] bg-[#0a0a0a] hover:border-[#222] transition-colors"
                }`}
                style={plan.highlight ? { boxShadow: "0 0 0 1px rgba(0,112,243,0.2), 0 0 24px rgba(0,112,243,0.07)" } : undefined}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0070f3] text-white text-[11px] font-semibold px-3 py-0.5 rounded-full">
                    Most popular
                  </span>
                )}

                <div className="mb-6">
                  <p className="text-[#888] text-xs font-medium uppercase tracking-wider mb-3">{plan.name}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-[#e2e2e2]">{plan.price}</span>
                    <span className="text-[#444] text-sm">{plan.sub}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-7 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check size={12} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-[#666] text-sm">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`w-full text-center py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    plan.highlight
                      ? "bg-[#0070f3] text-white hover:bg-[#0060df]"
                      : "border border-[#1a1a1a] text-[#555] hover:text-white hover:border-[#2a2a2a]"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-[#333] text-xs mt-6 text-center">
            Prices in INR. Payments via Razorpay — UPI, cards, net banking.
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 px-6 border-t border-[#111]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Image src="/quell_icon.png" alt="Quell" width={16} height={16} className="opacity-40" />
            <span className="text-[#333] text-sm">© 2026 Quell. MIT License.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-[#333]">
            <a href="https://github.com/shashank7109/quelltest_lib" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/auth/sign-in" className="hover:text-white transition-colors">Sign in</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
