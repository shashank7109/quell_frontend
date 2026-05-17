import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import CopyCommand from "@/components/CopyCommand";
import FaqItem from "@/components/FaqItem";
import PricingSection from "@/components/PricingSection";

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

const FAQS = [
  {
    q: "Do I need an LLM API key to use Quelltest?",
    a: "No. The rule-based engine covers ~75% of real-world requirements — MUST_RAISE, MUST_RETURN, BOUNDARY, ENUM_VALID, NOT_NULL, TYPE_CHECK — with zero network calls. An LLM key is optional and only used as a fallback for complex cases the rule engine cannot handle.",
  },
  {
    q: "What Python versions are supported?",
    a: "Quelltest requires Python 3.11 or later. It works on Linux, macOS, and Windows. Install via pip: pip install quelltest.",
  },
  {
    q: "Does my source code ever leave my machine?",
    a: "Never, unless you explicitly configure an LLM provider. The rule engine operates entirely locally — pure AST analysis. If LLM fallback is enabled, only the specific function signature and docstring are sent, never your full codebase. The diagnostic report (.quell/report.json) contains no source code and is safe to share.",
  },
  {
    q: "How is Quelltest different from coverage.py or pytest-cov?",
    a: "Coverage tools measure which lines of code were executed during tests — not whether the tests actually prove anything meaningful. Quelltest measures requirement coverage: how many of the testable claims in your docstrings, Pydantic models, and schemas have a verified test. A line can be covered while the test catches nothing.",
  },
  {
    q: "What does 'verified' mean exactly?",
    a: "Every generated test goes through two phases before it's written to disk. Phase 1: the test must PASS on the original, correct code. Phase 2: Quelltest injects a targeted violation (comments out the raise, weakens a Field bound, flips nullable) and the test must FAIL on that mutated code. A test that passes both phases is verified — it proves the requirement, not just executes it.",
  },
  {
    q: "Can I run Quelltest in CI/CD?",
    a: "Yes — and it's the primary use case. quell install --action writes a ready-made GitHub Actions workflow in one command. On every PR it runs quell find --format github, posts inline annotations on untested lines, and comments a PRS summary with a tier emoji (🟢/🟡/🔴). No API key or LLM needed.",
  },
  {
    q: "What is QuellGraph and do I need it?",
    a: "QuellGraph is a persistent SQLite code-intelligence graph built from your project's AST. It tracks which functions transitively depend on infrastructure (postgres, redis, localstack, etc.) via BFS across call chains — even when sqlalchemy is 3 hops away. Run `quell graph build src/` once; subsequent runs are incremental (only changed files re-parsed). QuellGraph is optional — `quell find` works without it, but `--with-containers` requires it.",
  },
  {
    q: "What does --with-containers do?",
    a: "When you pass `quell find src/ --with-containers`, Quell reads the QuellGraph to find which functions need infrastructure, auto-starts throwaway Docker containers (postgres, redis, localstack, etc.) with hardcoded ephemeral credentials, injects connection URLs into the test subprocess, and tears everything down after the run. Your real DATABASE_URL and credentials are never read — Quell uses its own short-lived containers only.",
  },
  {
    q: "Does Quelltest work with FastAPI or async code?",
    a: "quell scan detects guard clauses in all Python functions including FastAPI route handlers. Async functions are currently scanned for guard patterns but test generation stubs them as synchronous — a known limitation for complex async dependencies. Support for full async test generation is on the roadmap.",
  },
  {
    q: "What is the GitHub App and how is it different from the GitHub Action?",
    a: "The GitHub Action is a YAML workflow you add to a single repository. The GitHub App is a webhook server you deploy once and install org-wide — every repository gets automatic PR reviews with no per-repo YAML file. Both use the same AST-based scanner. The App fetches changed files via the GitHub Contents API (no clone), scans them, and posts a PR comment. Self-hosted — your code never leaves your infrastructure.",
  },
  {
    q: "What is the difference between Quell and Quelltest?",
    a: "They are the same product. The tool was originally released as Quell and is now rebranded as Quelltest. The PyPI package (pip install quelltest), the CLI command (quell), and all functionality remain identical.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 w-full z-50 border-b border-[#111] bg-black/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Image src="/quell_logo.png" alt="Quelltest" width={76} height={24} className="h-6 w-auto" priority />
          <div className="hidden md:flex items-center gap-7 text-sm text-[#777]">
            <Link href="#how-it-works" className="hover:text-white transition-colors">How it works</Link>
            <Link href="#github" className="hover:text-white transition-colors">GitHub</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/changelog" className="hover:text-white transition-colors">Changelog</Link>
            <a href="https://github.com/quelltest/quelltest-lib" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">★ Star</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/sign-in" className="text-sm text-[#777] hover:text-white transition-colors">Sign in</Link>
            <Link href="/auth/sign-up" className="text-sm bg-white text-black font-medium px-4 py-1.5 rounded-md hover:bg-neutral-100 transition-colors">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      <main>

        {/* ── Hero ── */}
        <section className="pt-24 pb-0 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.05fr] gap-10 items-start pt-10">

            {/* Left */}
            <div className="py-6">
              <div className="inline-flex items-center gap-2 text-xs text-[#777] border border-[#1a1a1a] rounded-full px-3.5 py-1.5 mb-8 bg-[#0a0a0a]">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                quelltest 1.0.0 — QuellGraph · container engine · confidence scorer
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-5">
                Your specs say what
                <br />
                <span className="text-[#555]">your code should do.</span>
                <br />
                Quelltest proves it.
              </h1>

              <p className="text-[#888] text-base leading-relaxed mb-8 max-w-[430px]">
                Quelltest reads your Python docstrings, Pydantic models, and PySpark schemas —
                extracts every testable requirement — generates verified pytest tests that
                actually prove each one. Two-phase verification before anything touches disk.
                Now with infrastructure-aware testing: auto-start ephemeral containers, graph-based
                infra detection, and per-test confidence scores. No LLM key required.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  href="/auth/sign-up"
                  className="inline-flex items-center justify-center gap-2 bg-white text-black font-medium px-5 py-2.5 rounded-lg hover:bg-neutral-100 transition-colors text-sm"
                >
                  Start for free <ArrowRight size={13} />
                </Link>
                <a
                  href="https://github.com/quelltest/quelltest-lib"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-[#1a1a1a] text-[#777] font-medium px-5 py-2.5 rounded-lg hover:text-white hover:border-[#2a2a2a] transition-colors text-sm"
                >
                  GitHub
                </a>
              </div>

              <CopyCommand />

              <div className="mt-8 flex items-center gap-5 text-xs text-[#444]">
                <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#444]" />no LLM needed</span>
                <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#444]" />zero false positives</span>
                <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#444]" />v2.0.0 · MIT license</span>
              </div>
            </div>

            {/* Right — Terminal */}
            <div className="bg-[#080808] border border-[#1a1a1a] rounded-xl overflow-hidden font-mono text-xs md:sticky md:top-20">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#111]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#222]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#222]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#222]" />
                <span className="ml-3 text-[#444] text-[11px]">quell — bash</span>
              </div>
              <div className="p-5 space-y-1 leading-[1.8]">
                <p>
                  <span className="text-[#333]">$ </span>
                  <span className="text-[#e2e2e2]">quell find src/ --fix</span>
                </p>
                <p className="text-[#3a3a3a]">  scanning 12 file(s)...</p>
                <p className="text-[#2a2a2a] pt-1">  ─────────────────────────────────────</p>
                <p>
                  <span className="text-green-600">✓ WRITTEN  </span>
                  <span className="text-[#555]">(8)   Passed all 5 gates.</span>
                </p>
                <p className="text-[#3a3a3a] pl-4">→ tests/test_payments.py  confidence: 94% [HIGH]</p>
                <p className="text-[#3a3a3a] pl-4">→ tests/test_auth.py      confidence: 88% [HIGH]</p>
                <p className="pt-1">
                  <span className="text-yellow-600">⚠ SCAFFOLDED </span>
                  <span className="text-[#555]">(3)  Complete the assertion.</span>
                </p>
                <p className="text-[#3a3a3a] pl-4">→ tests/scaffold/test_billing.py</p>
                <p className="pt-1">
                  <span className="text-red-800">✗ FLAGGED  </span>
                  <span className="text-[#555]">(2)  Cannot auto-test.</span>
                </p>
                <p className="text-[#3a3a3a] pl-4">→ src/billing.py:142  external API</p>
                <p className="text-[#2a2a2a] pt-1">  ─────────────────────────────────────</p>
                <p>
                  <span className="text-green-600">PRS  84/100  🟢 </span>
                  <span className="text-[#555]">Production Ready</span>
                </p>
                <p className="text-[#2a2a2a]">  Your code never left your machine.</p>
                <p className="pt-2 text-[#333]">$ <span className="animate-pulse">▋</span></p>
              </div>
            </div>

          </div>
        </section>

        {/* ── Works with strip ── */}
        <div className="border-t border-[#111] mt-12">
          <div className="max-w-5xl mx-auto px-6 py-5 flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="text-xs text-[#444] uppercase tracking-widest font-medium">Works with</span>
            {[
              { label: "pytest" },
              { label: "Pydantic" },
              { label: "PySpark" },
              { label: "libcst" },
              { label: "GitHub Actions" },
              { label: "GitHub App" },
              { label: "Claude" },
              { label: "GPT-4" },
            ].map((t) => (
              <span key={t.label} className="text-sm font-mono text-[#666]">
                {t.label}
              </span>
            ))}
          </div>
        </div>

        {/* ── What Quelltest reads ── */}
        <section className="py-16 px-6 border-t border-[#111]">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <p className="text-xs font-medium tracking-widest text-[#444] uppercase mb-3">Spec sources</p>
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

                  <div className="px-5 py-4">
                    <p className="font-mono text-[11px] text-[#555] bg-[#060606] border border-[#111] rounded px-3 py-2 mb-4 leading-relaxed">
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
              <p className="text-xs font-medium tracking-widest text-[#444] uppercase mb-3">How it works</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#e2e2e2] tracking-tight max-w-md">
                From spec to verified test in seconds.
              </h2>
            </div>

            <div className="divide-y divide-[#111]">
              {[
                {
                  n: "01",
                  title: "Read specs from three sources",
                  body: "Quelltest scans Python docstrings (Raises:, Returns:, Args: sections), Pydantic models (Field validators, Literal type annotations), and PySpark StructType definitions — all via AST, no imports, no test execution.",
                  snippet: [
                    { t: "dim", v: "$ " },
                    { t: "white", v: "quell find src/" },
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
                  body: "Every generated test must PASS on correct code AND FAIL on violated code. Quelltest injects targeted violations per constraint kind — comments out the raise, weakens the Field bound, flips nullable — then runs both phases in subprocess isolation.",
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
                    <p className="text-[#888] text-sm leading-relaxed">{step.body}</p>
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
              <p className="text-xs font-medium tracking-widest text-[#444] uppercase mb-4">Design principle</p>
              <h2 className="text-2xl font-bold text-[#e2e2e2] tracking-tight mb-4">
                Rule-based first.<br />LLM as last resort.
              </h2>
              <p className="text-[#888] text-sm leading-relaxed">
                Most test generation tools send your code to an LLM and hope for the best.
                Quelltest inverts this. Every constraint kind has a deterministic rule-based generator —
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
                        : "border-[#1a1a1a] text-[#666]"
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
              <p className="text-xs font-medium tracking-widest text-[#444] uppercase mb-3">CLI</p>
              <h2 className="text-2xl font-bold text-[#e2e2e2] tracking-tight">
                One tool, a few commands.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                {
                  cmd: "quell scan src/",
                  desc: "Find untested guard clauses (if/raise patterns). No docstrings needed.",
                },
                {
                  cmd: "quell scan src/ --fix",
                  desc: "Generate and verify failing tests for every untested guard clause.",
                },
                {
                  cmd: "quell find src/",
                  desc: "Find all untested edge cases — shows WRITTEN / SCAFFOLDED / FLAGGED buckets.",
                },
                {
                  cmd: "quell find src/ --fix",
                  desc: "Write WRITTEN tests to disk. Each test passed all 5 gates.",
                },
                {
                  cmd: "quell find src/ --fix --auto",
                  desc: "Skip confirmation prompts — use in CI pipelines.",
                },
                {
                  cmd: "quell score --badge",
                  desc: "Print Production Readiness Score and SVG badge.",
                },
                {
                  cmd: "quell install --action",
                  desc: "Write the GitHub Actions workflow — posts PRS comment on every PR.",
                },
              ].map((item) => (
                <div key={item.cmd} className="bg-[#080808] border border-[#111] rounded-xl px-5 py-4">
                  <p className="font-mono text-[12px] text-[#7cc2ff] mb-1.5">{item.cmd}</p>
                  <p className="text-[#888] text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Diagnostic report ── */}
        <section className="py-16 px-6 border-t border-[#111]">
          <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.4fr] gap-12 items-start">
            <div>
              <p className="text-xs font-medium tracking-widest text-[#444] uppercase mb-4">Privacy-safe feedback loop</p>
              <h2 className="text-2xl font-bold text-[#e2e2e2] tracking-tight mb-4">
                Every run generates a diagnostic report.
              </h2>
              <p className="text-[#888] text-sm leading-relaxed">
                After every <code className="text-[#aaa] font-mono text-xs">--fix</code> run, Quelltest writes{" "}
                <code className="text-[#aaa] font-mono text-xs">.quell/report.json</code> — a
                privacy-safe file recording where the rule engine succeeded, what it skipped,
                and which argument types it couldn&apos;t stub. No source code. Safe to share.
              </p>
            </div>
            <div className="bg-[#080808] border border-[#111] rounded-xl px-5 py-4 font-mono text-xs leading-[1.9]">
              <p className="text-[#333]">{"{"}</p>
              <p className="pl-4"><span className="text-[#555]">&quot;quell_version&quot;</span><span className="text-[#333]">: </span><span className="text-[#888]">&quot;1.0.0&quot;</span><span className="text-[#333]">,</span></p>
              <p className="pl-4"><span className="text-[#555]">&quot;target&quot;</span><span className="text-[#333]">: </span><span className="text-[#888]">&quot;quell&quot;</span><span className="text-[#333]">,</span></p>
              <p className="pl-4"><span className="text-[#555]">&quot;total_requirements&quot;</span><span className="text-[#333]">: </span><span className="text-[#888]">58</span><span className="text-[#333]">,</span></p>
              <p className="pl-4"><span className="text-[#555]">&quot;verified_and_written&quot;</span><span className="text-[#333]">: </span><span className="text-green-600">12</span><span className="text-[#333]">,</span></p>
              <p className="pl-4"><span className="text-[#555]">&quot;rejected_fails_on_correct&quot;</span><span className="text-[#333]">: </span><span className="text-yellow-700">7</span><span className="text-[#333]">,</span></p>
              <p className="pl-4"><span className="text-[#555]">&quot;rejected_no_catch&quot;</span><span className="text-[#333]">: </span><span className="text-yellow-700">8</span><span className="text-[#333]">,</span></p>
              <p className="pl-4"><span className="text-[#555]">&quot;spec_sources&quot;</span><span className="text-[#333]">: [</span><span className="text-[#888]">&quot;docstring&quot;, &quot;pydantic&quot;, &quot;code_guard&quot;</span><span className="text-[#333]">],</span></p>
              <p className="pl-4 text-[#333]">&quot;_note&quot;: &quot;No source code. Safe to share.&quot;</p>
              <p className="text-[#333]">{"}"}</p>
            </div>
          </div>
        </section>

        {/* ── GitHub Integration ── */}
        <section id="github" className="py-20 px-6 border-t border-[#111]">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <p className="text-xs font-medium tracking-widest text-[#444] uppercase mb-3">GitHub Integration</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#e2e2e2] tracking-tight max-w-xl">
                Every pull request reviewed automatically.
              </h2>
              <p className="text-[#888] text-sm mt-3 max-w-lg leading-relaxed">
                Quelltest scans every changed Python file for untested guard clauses —
                if/raise patterns, try/except/raise, assert — and posts inline diff annotations
                and a PR comment. No docstrings needed. Purely AST-based.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              {/* GitHub Action card */}
              <div className="border border-[#1a1a1a] rounded-xl overflow-hidden bg-[#080808]">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-[#111]">
                  <div className="w-8 h-8 rounded-lg bg-[#111] flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#e2e2e2] text-sm font-semibold">GitHub Action</p>
                    <p className="text-[#666] text-xs">Per-repo · one YAML file · inline annotations</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[#888] text-xs leading-relaxed mb-4">
                    Add to any repo in under a minute. The action runs on every PR, emits
                    inline diff warnings, and posts an idempotent summary comment.
                  </p>
                  <div className="bg-[#060606] border border-[#111] rounded-lg px-4 py-3 font-mono text-[11px] text-[#444] leading-[1.8] mb-4">
                    <p className="text-[#2a2a2a]"># generated by: quell install --action</p>
                    <p><span className="text-[#555]">uses</span>: quelltest/quelltest-lib@v2.0.0</p>
                    <p className="pl-2"><span className="text-[#555]">with</span>:</p>
                    <p className="pl-4">source-dir: <span className="text-[#888]">&apos;src/&apos;</span></p>
                    <p className="pl-4">prs-threshold: <span className="text-[#888]">&apos;60&apos;</span></p>
                  </div>
                  <div className="text-[#555] text-[11px] mb-4 space-y-1">
                    <p className="flex items-center gap-2"><span className="text-green-700">✓</span> Inline diff annotations per guard clause</p>
                    <p className="flex items-center gap-2"><span className="text-green-700">✓</span> PR comment with gap table</p>
                    <p className="flex items-center gap-2"><span className="text-green-700">✓</span> Optional merge block with fail-on-gaps</p>
                  </div>
                  <Link href="/docs/guides/github-actions" className="text-xs text-[#0070f3] hover:text-[#60a5fa] transition-colors">
                    Setup guide →
                  </Link>
                </div>
              </div>

              {/* GitHub App card */}
              <div className="border border-[#1a1a1a] rounded-xl overflow-hidden bg-[#080808]">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-[#111]">
                  <div className="w-8 h-8 rounded-lg bg-[#111] flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2l9 4.9V17L12 22l-9-4.9V7z"/><path d="M12 22V12"/><path d="M21 7l-9 5-9-5"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#e2e2e2] text-sm font-semibold">GitHub App</p>
                    <p className="text-[#666] text-xs">Org-wide · zero per-repo config · self-hosted</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[#888] text-xs leading-relaxed mb-4">
                    Install once at the organisation level. Every repo gets automatic PR
                    reviews with no YAML to add or maintain. Runs the same AST scanner
                    against files fetched via the GitHub Contents API — no clone needed.
                  </p>
                  <div className="bg-[#060606] border border-[#111] rounded-lg px-4 py-3 font-mono text-[11px] text-[#444] leading-[1.8] mb-4">
                    <p className="text-[#2a2a2a]"># Deploy the FastAPI webhook server</p>
                    <p>pip install quelltest fastapi uvicorn PyJWT</p>
                    <p>uvicorn quell.github.app:app <span className="text-[#2a2a2a]">\</span></p>
                    <p className="pl-4">--host 0.0.0.0 --port <span className="text-[#888]">$PORT</span></p>
                  </div>
                  <div className="text-[#555] text-[11px] mb-4 space-y-1">
                    <p className="flex items-center gap-2"><span className="text-green-700">✓</span> One install covers all repos in the org</p>
                    <p className="flex items-center gap-2"><span className="text-green-700">✓</span> No repository clone — uses GitHub API</p>
                    <p className="flex items-center gap-2"><span className="text-green-700">✓</span> Idempotent PR comment per push</p>
                  </div>
                  <Link href="/docs/guides/github-app" className="text-xs text-[#0070f3] hover:text-[#60a5fa] transition-colors">
                    Setup guide →
                  </Link>
                </div>
              </div>

            </div>

            {/* PR comment preview */}
            <div className="mt-8 border border-[#1a1a1a] rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-[#111] bg-[#080808]">
                <span className="text-[#444] text-xs font-mono">PR comment preview</span>
                <span className="ml-auto text-[10px] text-[#2a2a2a] border border-[#1a1a1a] rounded px-2 py-0.5">markdown</span>
              </div>
              <div className="bg-[#060606] px-6 py-5 font-mono text-xs text-[#444] leading-[1.9]">
                <p><span className="text-yellow-700">🟡</span> <span className="text-[#666] font-semibold">Quell — Guard Clause Scan</span></p>
                <p className="mt-2"><span className="text-[#777]">3 untested guard clauses found</span> <span className="text-[#444]">— 40% covered (2/5)</span></p>
                <div className="mt-3 border border-[#111] rounded overflow-hidden">
                  <div className="grid grid-cols-4 gap-0 border-b border-[#111] px-3 py-1.5 text-[#2a2a2a]">
                    <span>File</span><span>Function</span><span className="col-span-2">Guard</span>
                  </div>
                  <div className="grid grid-cols-4 gap-0 px-3 py-1.5 border-b border-[#111]">
                    <span className="text-[#555]">payments.py:32</span>
                    <span className="text-[#444]">process_payment</span>
                    <span className="col-span-2 text-[#333]">if amount &lt;= 0:</span>
                  </div>
                  <div className="grid grid-cols-4 gap-0 px-3 py-1.5 border-b border-[#111]">
                    <span className="text-[#555]">sessions.py:18</span>
                    <span className="text-[#444]">create_session</span>
                    <span className="col-span-2 text-[#333]">if not user:</span>
                  </div>
                  <div className="grid grid-cols-4 gap-0 px-3 py-1.5">
                    <span className="text-[#555]">auth.py:44</span>
                    <span className="text-[#444]">require_auth</span>
                    <span className="col-span-2 text-[#333]">if not is_authenticated:</span>
                  </div>
                </div>
                <p className="mt-3 text-[#444]">Fix locally: <span className="text-[#777]">quell scan . --fix</span></p>
              </div>
            </div>

          </div>
        </section>

        {/* ── Pricing ── */}
        <section id="pricing" className="py-20 px-6 border-t border-[#111]">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <p className="text-xs font-medium tracking-widest text-[#444] uppercase mb-3">Pricing</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#e2e2e2] tracking-tight">
                Free to start. Scale when you need to.
              </h2>
              <p className="text-[#666] text-sm mt-2">
                Rule-based generation is free forever. LLM fallback and CI features are Pro.
              </p>
            </div>
            <PricingSection />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="py-20 px-6 border-t border-[#111]">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12">
              <p className="text-xs font-medium tracking-widest text-[#444] uppercase mb-3">FAQ</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#e2e2e2] tracking-tight">
                Frequently asked questions.
              </h2>
            </div>
            <div>
              {FAQS.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
            <p className="text-[#666] text-sm mt-10">
              More questions?{" "}
              <a
                href="https://github.com/quelltest/quelltest-lib/discussions"
                target="_blank"
                rel="noreferrer"
                className="text-[#888] hover:text-white transition-colors underline underline-offset-2"
              >
                Open a discussion on GitHub
              </a>{" "}
              or{" "}
              <a href="mailto:hello@queltest.dev" className="text-[#888] hover:text-white transition-colors underline underline-offset-2">
                email us
              </a>
              .
            </p>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="py-10 px-6 border-t border-[#111]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5">
              <Image src="/quell_icon.png" alt="Quelltest" width={16} height={16} className="opacity-40" />
              <span className="text-[#555] text-sm">© 2026 Quelltest. MIT License.</span>
            </div>
            <span className="text-[#333] text-xs pl-6">Formerly Quell.</span>
          </div>
          <nav aria-label="Footer navigation">
            <div className="flex items-center gap-6 text-sm text-[#666]">
              <a href="https://github.com/quelltest/quelltest-lib" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
              <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
              <Link href="/auth/sign-in" className="hover:text-white transition-colors">Sign in</Link>
            </div>
          </nav>
        </div>
      </footer>

    </div>
  );
}
