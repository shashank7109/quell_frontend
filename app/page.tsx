import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import CopyCommand from "@/components/CopyCommand";
import FaqItem from "@/components/FaqItem";
import PricingSection from "@/components/PricingSection";

export const metadata: Metadata = {
  title: "Quell — Find untested edge cases in your Python code",
  description:
    "Quell finds untested edge cases in Python codebases — docstrings, Pydantic models, guard clauses. Writes verified pytest tests. Free tier, no LLM key required.",
  alternates: { canonical: "https://quell.buildsbyshashank.tech" },
  openGraph: {
    title: "Quell — Untested edge cases will bite you in production.",
    description:
      "Quell finds them first. Three-bucket output, 5-gate pipeline, Production Readiness Score. pip install quelltest",
    url: "https://quell.buildsbyshashank.tech",
    type: "website",
  },
};

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
    q: "Do I need an LLM API key to use Quell?",
    a: "No. The rule-based engine covers ~75% of real-world edge cases — MUST_RAISE, MUST_RETURN, BOUNDARY, ENUM_VALID, NOT_NULL, TYPE_CHECK — with zero network calls. An LLM key is optional and only used as a fallback for complex cases the rule engine cannot handle.",
  },
  {
    q: "What Python versions are supported?",
    a: "Quell requires Python 3.11 or later. It works on Linux, macOS, and Windows. Install via pip: pip install quelltest.",
  },
  {
    q: "Does my source code ever leave my machine?",
    a: "Never, unless you explicitly configure an LLM provider. The rule engine operates entirely locally — pure AST analysis. If LLM fallback is enabled, only the specific function signature and docstring are sent, never your full codebase. The quell-report.json file contains no source code and is safe to share.",
  },
  {
    q: "How is Quell different from coverage.py or pytest-cov?",
    a: "Coverage tools measure which lines of code were executed during tests — not whether the tests actually prove anything meaningful. Quell measures edge case coverage: how many of the testable claims in your docstrings, Pydantic models, and schemas have a verified test that actually catches violations. A line can be covered while the test catches nothing.",
  },
  {
    q: "What does 'WRITTEN' mean exactly?",
    a: "A WRITTEN test passed all 5 gates: it parses as valid Python, isn't a duplicate, contains no forbidden operations, passes on correct code, and fails when the specific violation is injected. Every WRITTEN test has a confidence score. If it can't pass all 5 gates, it becomes a SCAFFOLDED stub instead — never silently dropped.",
  },
  {
    q: "Can I run Quell in CI/CD?",
    a: "Yes — it's the primary use case. quell install --action writes a ready-made GitHub Actions workflow in one command. On every PR it runs quell find, posts inline annotations on untested edge cases, and comments a PRS summary with a tier emoji (🟢/🟡/🔴). No API key or LLM needed.",
  },
  {
    q: "What is the difference between SCAFFOLDED and FLAGGED?",
    a: "SCAFFOLDED means Quell generated a test that failed one of the 5 gates — usually Gate 4 or 5. A stub is written to tests/scaffold/ with the constraint documented and a # TODO comment. You complete the assertion. FLAGGED means Quell couldn't generate a test at all — the constraint depends on live API state, object runtime state, or something else only you can test. A one-line reason is always given.",
  },
  {
    q: "Does Quell work with FastAPI or async code?",
    a: "quell find detects guard clauses in all Python functions including FastAPI route handlers. Async functions are currently scanned for guard patterns but test generation stubs them as synchronous — a known limitation for complex async dependencies. Full async test generation is on the roadmap.",
  },
  {
    q: "What is the difference between Quell and Quelltest?",
    a: "Quell is the product name and brand. quelltest is the PyPI package name — so you run `pip install quelltest` but the CLI command is `quell`. Both refer to the same tool.",
  },
];

const GATES = [
  {
    n: "1",
    label: "AST validity",
    detail: "Parses as valid Python. All imports resolve. No undefined names.",
    color: "#1e3a5f",
    accent: "#60a5fa",
  },
  {
    n: "2",
    label: "Originality",
    detail: "Not a duplicate of an existing test. No boilerplate. AST fingerprint + n-gram check.",
    color: "#1b3a2f",
    accent: "#4ade80",
  },
  {
    n: "3",
    label: "Security",
    detail: "No os.system, no subprocess shell, no file deletion, no credential reads.",
    color: "#2a1a3f",
    accent: "#c084fc",
  },
  {
    n: "4",
    label: "Passes on correct code",
    detail: "Runs in a subprocess against the original source. Must PASS.",
    color: "#1a3a2a",
    accent: "#34d399",
  },
  {
    n: "5",
    label: "Fails on violated code",
    detail: "Violation injected (guard removed, bound weakened). Test must FAIL. Source always restored.",
    color: "#3a1a1a",
    accent: "#f87171",
  },
];

const COMPARISON = [
  { feature: "Finds edge cases automatically", quell: true, copilot: false, qodo: false, hypothesis: "partial" },
  { feature: "Reads existing specs in your code", quell: true, copilot: false, qodo: false, hypothesis: false },
  { feature: "Writes ready-to-run tests", quell: true, copilot: true, qodo: true, hypothesis: false },
  { feature: "Validates test passes on correct code", quell: true, copilot: false, qodo: "partial", hypothesis: true },
  { feature: "Validates test fails on injected bug", quell: true, copilot: false, qodo: false, hypothesis: false },
  { feature: "Originality check (no duplicate tests)", quell: true, copilot: false, qodo: false, hypothesis: false },
  { feature: "Security check on generated tests", quell: true, copilot: false, qodo: false, hypothesis: false },
  { feature: "Per-test confidence score", quell: true, copilot: false, qodo: false, hypothesis: false },
  { feature: "Production Readiness Score", quell: true, copilot: false, qodo: false, hypothesis: false },
  { feature: "Works offline (no LLM required)", quell: true, copilot: false, qodo: false, hypothesis: true },
  { feature: "Your code never leaves your machine", quell: true, copilot: false, qodo: false, hypothesis: true },
  { feature: "Free tier", quell: true, copilot: false, qodo: "partial", hypothesis: true },
];

function ComparisonCell({ val }: { val: boolean | string }) {
  if (val === true) return <span className="text-green-500 text-sm font-bold">✓</span>;
  if (val === false) return <span className="text-[#333] text-sm">✗</span>;
  return <span className="text-yellow-600 text-xs">partial</span>;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 w-full z-50 border-b border-[#111] bg-black/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Image src="/quell_logo.png" alt="Quell" width={76} height={24} className="h-6 w-auto" priority />
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
                Quell v2.0.0 — quell find · three-bucket output · PRS
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-5">
                Untested edge cases
                <br />
                <span className="text-[#555]">will bite you in production.</span>
                <br />
                Quell finds them first.
              </h1>

              <p className="text-[#888] text-base leading-relaxed mb-8 max-w-[430px]">
                Run <code className="text-[#aaa] font-mono text-sm">quell find src/</code> and get three buckets back:
                tests written to disk (WRITTEN), stubs for you to finish (SCAFFOLDED),
                and gaps with a one-line reason why (FLAGGED). Every WRITTEN test passed
                5 gates — including proving it actually catches the bug. No LLM key required.
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
            {["pytest", "Pydantic", "PySpark", "libcst", "GitHub Actions", "Groq", "Claude", "GPT-4"].map((t) => (
              <span key={t} className="text-sm font-mono text-[#666]">{t}</span>
            ))}
          </div>
        </div>

        {/* ── Three Buckets ── */}
        <section className="py-20 px-6 border-t border-[#111]">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <p className="text-xs font-medium tracking-widest text-[#444] uppercase mb-3">Output</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#e2e2e2] tracking-tight max-w-lg">
                Three buckets. Nothing dropped silently.
              </h2>
              <p className="text-[#888] text-sm mt-3 max-w-lg leading-relaxed">
                Every edge case Quell finds ends up in exactly one of three places.
                There is no silent discard — you always know what happened and why.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {/* WRITTEN */}
              <div className="rounded-xl border border-[#1a3a1a] bg-[#070f07] overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 bg-[#0a1f0a] border-b border-[#1a3a1a]">
                  <span className="text-green-500 text-lg font-bold">✓</span>
                  <div>
                    <p className="text-green-400 text-sm font-bold tracking-wide">WRITTEN</p>
                    <p className="text-[#3a6a3a] text-[11px]">Passed all 5 gates → written to disk</p>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <p className="text-[#888] text-xs leading-relaxed">
                    Tests Quell is confident about. Each one passed syntax, originality, security,
                    a live run on your code, and a run against a violation. Injected into your test file via libcst.
                  </p>
                  <div className="bg-[#060606] border border-[#111] rounded-lg px-4 py-3 font-mono text-[11px] text-[#444] leading-[1.8]">
                    <p className="text-green-700">→ tests/test_payments.py</p>
                    <p className="text-[#2a2a2a] pl-2">confidence: 94% [HIGH]</p>
                    <p className="text-green-700">→ tests/test_auth.py</p>
                    <p className="text-[#2a2a2a] pl-2">confidence: 88% [HIGH]</p>
                  </div>
                  <p className="text-[#444] text-[11px]">Backed up before write. Restored on any failure.</p>
                </div>
              </div>

              {/* SCAFFOLDED */}
              <div className="rounded-xl border border-[#3a3a1a] bg-[#0f0f07] overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 bg-[#1a1a0a] border-b border-[#3a3a1a]">
                  <span className="text-yellow-500 text-lg font-bold">⚠</span>
                  <div>
                    <p className="text-yellow-400 text-sm font-bold tracking-wide">SCAFFOLDED</p>
                    <p className="text-[#5a5a2a] text-[11px]">Failed a gate → stub written to tests/scaffold/</p>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <p className="text-[#888] text-xs leading-relaxed">
                    Tests that got stuck at a gate — usually Gate 4 or 5 (the verification gates).
                    A stub is written with the constraint documented. You write the one assertion only you can write.
                  </p>
                  <div className="bg-[#060606] border border-[#111] rounded-lg px-4 py-3 font-mono text-[11px] text-[#444] leading-[1.8]">
                    <p className="text-[#555]"># quell: scaffold — gates passed: 3/5</p>
                    <p className="text-[#555]">def test_quell_scaffold_pay_abc():</p>
                    <p className="text-[#2a2a2a] pl-2"># TODO: complete assertion</p>
                    <p className="text-[#2a2a2a] pl-2">pass</p>
                  </div>
                  <p className="text-[#444] text-[11px]">Auto-added to .gitignore by quell init.</p>
                </div>
              </div>

              {/* FLAGGED */}
              <div className="rounded-xl border border-[#3a1a1a] bg-[#0f0707] overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 bg-[#1a0a0a] border-b border-[#3a1a1a]">
                  <span className="text-red-700 text-lg font-bold">✗</span>
                  <div>
                    <p className="text-red-500 text-sm font-bold tracking-wide">FLAGGED</p>
                    <p className="text-[#5a2a2a] text-[11px]">Cannot synthesize → reason shown, nothing written</p>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <p className="text-[#888] text-xs leading-relaxed">
                    Edge cases Quell cannot auto-test — live API state, object runtime state, env-variable-dependent logic.
                    Always shows a one-line reason with exact source location. Never silent.
                  </p>
                  <div className="bg-[#060606] border border-[#111] rounded-lg px-4 py-3 font-mono text-[11px] text-[#444] leading-[1.8]">
                    <p className="text-red-900">✗ src/billing.py:142</p>
                    <p className="text-[#2a2a2a] pl-2">depends on external API</p>
                    <p className="text-red-900">✗ src/user.py:87</p>
                    <p className="text-[#2a2a2a] pl-2">depends on object state</p>
                  </div>
                  <p className="text-[#444] text-[11px]">Add # quell: flagged comment for +5 PRS bonus.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Production Readiness Score ── */}
        <section className="py-20 px-6 border-t border-[#111]">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-[1fr_1.3fr] gap-12 items-start">
              <div>
                <p className="text-xs font-medium tracking-widest text-[#444] uppercase mb-4">PRS</p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#e2e2e2] tracking-tight mb-4">
                  One number.<br />How production-ready<br />are your edge cases?
                </h2>
                <p className="text-[#888] text-sm leading-relaxed mb-6">
                  After every <code className="text-[#aaa] font-mono text-xs">quell find</code> run, Quell computes a
                  Production Readiness Score — a 0–100 number based on the confidence of your WRITTEN tests
                  across all edge cases found. Post it in CI, drop it in your README badge, watch it climb.
                </p>
                <div className="space-y-3 text-sm">
                  {[
                    { score: "≥ 80", tier: "Production Ready", emoji: "🟢", desc: "Ship it.", color: "text-green-500" },
                    { score: "60–79", tier: "Review Needed", emoji: "🟡", desc: "Some gaps to address.", color: "text-yellow-500" },
                    { score: "< 60", tier: "Needs Work", emoji: "🔴", desc: "Real risk in production.", color: "text-red-500" },
                  ].map((t) => (
                    <div key={t.tier} className="flex items-center gap-3 border border-[#111] rounded-lg px-4 py-3 bg-[#080808]">
                      <span className="text-lg">{t.emoji}</span>
                      <div className="flex-1">
                        <span className={`font-mono text-xs font-bold ${t.color}`}>{t.score}</span>
                        <span className="text-[#666] text-xs ml-2">{t.tier}</span>
                      </div>
                      <span className="text-[#333] text-xs">{t.desc}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-2 text-xs text-[#555]">
                  <p className="flex items-center gap-2"><span className="text-green-700">+5</span> all FLAGGED items documented with # quell: flagged</p>
                  <p className="flex items-center gap-2"><span className="text-red-800">−10</span> any HIGH-confidence test has @pytest.mark.skip</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-[#080808] border border-[#111] rounded-xl px-6 py-6">
                  <p className="text-[#444] text-xs uppercase tracking-widest mb-4 font-medium">quell score src/</p>
                  <div className="flex items-end gap-4 mb-6">
                    <span className="text-7xl font-bold text-green-500 leading-none">84</span>
                    <div className="pb-2">
                      <p className="text-green-400 text-sm font-semibold">🟢 Production Ready</p>
                      <p className="text-[#333] text-xs font-mono">/100</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 font-mono text-xs text-center">
                    <div className="bg-[#060606] border border-[#111] rounded-lg py-3">
                      <p className="text-green-500 text-xl font-bold">8</p>
                      <p className="text-[#444] text-[10px] mt-1">WRITTEN</p>
                    </div>
                    <div className="bg-[#060606] border border-[#111] rounded-lg py-3">
                      <p className="text-yellow-600 text-xl font-bold">3</p>
                      <p className="text-[#444] text-[10px] mt-1">SCAFFOLDED</p>
                    </div>
                    <div className="bg-[#060606] border border-[#111] rounded-lg py-3">
                      <p className="text-[#555] text-xl font-bold">2</p>
                      <p className="text-[#444] text-[10px] mt-1">FLAGGED</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#111] flex justify-between text-xs text-[#444] font-mono">
                    <span>avg confidence: 91%</span>
                    <span>13 edge cases found</span>
                  </div>
                </div>
                <div className="bg-[#080808] border border-[#111] rounded-xl px-5 py-4 font-mono text-[11px] text-[#444] leading-[1.7]">
                  <p className="text-[#2a2a2a] mb-1"># CI gate</p>
                  <p><span className="text-[#555]">quell ci src/</span>  <span className="text-[#2a2a2a]"># exits non-zero if PRS &lt; 60</span></p>
                  <p className="mt-2 text-[#2a2a2a]"># pyproject.toml</p>
                  <p><span className="text-[#555]">prs_threshold</span> = <span className="text-[#888]">80</span>  <span className="text-[#2a2a2a]"># require 🟢</span></p>
                </div>
              </div>
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
                  body: "Quell scans Python docstrings (Raises:, Returns:, Args: sections), Pydantic models (Field validators, Literal type annotations), and PySpark StructType definitions — all via AST, no imports, no test execution.",
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
                  ],
                },
                {
                  n: "02",
                  title: "Rule engine generates candidate tests",
                  body: "A deterministic rule engine generates a candidate test for each uncovered edge case — no LLM, no network, no code leaving your machine. Handles MUST_RAISE, BOUNDARY, ENUM_VALID, NOT_NULL, TYPE_CHECK, MUST_RETURN (~75% of real cases).",
                  snippet: [
                    { t: "muted", v: "  [rule]  MUST_RAISE → test generated (8ms)" },
                    { t: "nl" },
                    { t: "muted", v: "  [rule]  BOUNDARY   → test generated (4ms)" },
                    { t: "nl" },
                    { t: "muted", v: "  [rule]  ENUM_VALID → test generated (3ms)" },
                    { t: "nl" },
                    { t: "muted", v: "  [llm]   BUG_REPRO  → LLM fallback (opt-in)" },
                  ],
                },
                {
                  n: "03",
                  title: "5-gate pipeline — only proven tests advance",
                  body: "Each candidate test passes 5 gates: AST validity, originality, security, passes on correct code, and fails on violated code. Tests that clear all 5 become WRITTEN. Earlier failures become SCAFFOLDED stubs so nothing is silently dropped.",
                  snippet: [
                    { t: "muted", v: "  Gate 1  AST valid  ✓" },
                    { t: "nl" },
                    { t: "muted", v: "  Gate 2  original   ✓" },
                    { t: "nl" },
                    { t: "muted", v: "  Gate 3  secure     ✓" },
                    { t: "nl" },
                    { t: "green", v: "  Gate 4  passes on correct code  ✓" },
                    { t: "nl" },
                    { t: "green", v: "  Gate 5  fails on violated code  ✓" },
                    { t: "nl" },
                    { t: "muted", v: "  → WRITTEN  confidence: 94%" },
                  ],
                },
                {
                  n: "04",
                  title: "Written to disk with libcst. Nothing lost.",
                  body: "WRITTEN tests are injected into your test file using libcst — a lossless concrete syntax tree parser. Your comments, blank lines, and indentation are preserved. A backup is made before write and restored on failure. PRS is written to quell-report.json.",
                  snippet: [
                    { t: "green", v: "  ✓ WRITTEN     (8)  tests/test_payments.py" },
                    { t: "nl" },
                    { t: "muted", v: "  ⚠ SCAFFOLDED  (3)  tests/scaffold/" },
                    { t: "nl" },
                    { t: "muted", v: "  ✗ FLAGGED     (2)  src/billing.py:142" },
                    { t: "nl" },
                    { t: "muted", v: "" },
                    { t: "nl" },
                    { t: "green", v: "  PRS  84/100  🟢 Production Ready" },
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

        {/* ── 5-Gate Pipeline deep dive ── */}
        <section className="py-20 px-6 border-t border-[#111]">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <p className="text-xs font-medium tracking-widest text-[#444] uppercase mb-3">The moat</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#e2e2e2] tracking-tight max-w-xl">
                Every WRITTEN test passes all 5 gates.<br />
                <span className="text-[#555]">Most tools run one.</span>
              </h2>
              <p className="text-[#888] text-sm mt-3 max-w-lg leading-relaxed">
                About 18% of generated tests that look correct are actually wrong — they pass on correct code but
                also pass on violated code, catching nothing. Gate 5 is the one that finds them.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-2 mb-8">
              {GATES.map((gate, idx) => (
                <div key={gate.n} className="relative">
                  <div
                    className="rounded-xl border p-4 h-full"
                    style={{ borderColor: gate.accent + "40", backgroundColor: gate.color + "33" }}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-3"
                      style={{ backgroundColor: gate.accent + "20", color: gate.accent }}
                    >
                      {gate.n}
                    </div>
                    <p className="font-semibold text-xs mb-2" style={{ color: gate.accent }}>{gate.label}</p>
                    <p className="text-[#555] text-[11px] leading-relaxed">{gate.detail}</p>
                  </div>
                  {idx < GATES.length - 1 && (
                    <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                      <span className="text-[#222] text-sm">→</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#080808] border border-[#111] rounded-xl p-5">
                <p className="text-[#555] text-xs uppercase tracking-widest mb-3 font-medium">Gate 4 — passes on correct code</p>
                <div className="font-mono text-[11px] text-[#444] leading-[1.9]">
                  <p className="text-[#2a2a2a]"># subprocess run — no module cache</p>
                  <p><span className="text-[#555]">pytest</span> temp_test.py  <span className="text-[#2a2a2a]"># original source</span></p>
                  <p className="text-green-700">→ PASSED  (test is logically correct)</p>
                </div>
              </div>
              <div className="bg-[#080808] border border-[#111] rounded-xl p-5">
                <p className="text-[#555] text-xs uppercase tracking-widest mb-3 font-medium">Gate 5 — fails on violated code</p>
                <div className="font-mono text-[11px] text-[#444] leading-[1.9]">
                  <p className="text-[#2a2a2a]"># inject: comment out the raise</p>
                  <p><span className="text-[#555]">pytest</span> temp_test.py  <span className="text-[#2a2a2a]"># violated source</span></p>
                  <p className="text-red-700">→ FAILED  (test catches the bug ✓)</p>
                  <p className="text-[#2a2a2a]"># source always restored in finally</p>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-[#050505] border border-[#111] rounded-xl p-5">
              <p className="text-xs text-[#444] mb-3 uppercase tracking-widest font-medium">Violation injection — per constraint kind</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 font-mono text-[11px]">
                {[
                  { kind: "MUST_RAISE", violation: "Comment out raise" },
                  { kind: "BOUNDARY", violation: "Weaken to gt=-9999" },
                  { kind: "MUST_RETURN", violation: "return None" },
                  { kind: "NOT_NULL", violation: "Remove null check" },
                  { kind: "ENUM_VALID", violation: "Remove enum guard" },
                ].map((v) => (
                  <div key={v.kind} className="border border-[#111] rounded-lg px-3 py-2">
                    <p className="text-[#555] text-[10px] mb-1">{v.kind}</p>
                    <p className="text-[#2a2a2a] text-[10px]">{v.violation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Coverage ≠ Safety callout ── */}
        <section className="py-12 px-6 border-t border-[#111]">
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#080808] border border-[#1a1a1a] rounded-2xl px-8 py-8 grid md:grid-cols-[1fr_auto] items-center gap-6">
              <div>
                <p className="text-xs font-medium tracking-widest text-[#444] uppercase mb-3">Hard truth</p>
                <h2 className="text-xl md:text-2xl font-bold text-[#e2e2e2] tracking-tight mb-2">
                  91% line coverage. 52/100 PRS. Both numbers correct.
                </h2>
                <p className="text-[#888] text-sm leading-relaxed max-w-2xl">
                  Coverage tools tell you which lines ran. They don&apos;t tell you whether removing a guard clause
                  would break your tests. We measured: ~18% of generated tests that &quot;pass&quot; are actually wrong —
                  they don&apos;t catch the bug they&apos;re supposed to catch. Gate 5 is the one that finds them.
                </p>
              </div>
              <Link
                href="/blog/production-readiness-score"
                className="shrink-0 inline-flex items-center gap-2 border border-[#1a1a1a] text-[#777] text-sm px-5 py-2.5 rounded-lg hover:text-white hover:border-[#2a2a2a] transition-colors"
              >
                Read the full breakdown <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── What Quell reads ── */}
        <section className="py-16 px-6 border-t border-[#111]">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <p className="text-xs font-medium tracking-widest text-[#444] uppercase mb-3">Spec sources</p>
              <h2 className="text-2xl font-bold text-[#e2e2e2] tracking-tight">
                No annotations needed. Quell reads specs that already exist in your code.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {SPEC_SOURCES.map((src) => (
                <div key={src.title} className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-4" style={{ backgroundColor: src.color }}>
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
                Quell inverts this. Every constraint kind has a deterministic rule-based generator —
                no network call, no hallucinations, no API key. The rule engine covers ~75% of
                real edge cases. LLM handles the rest — only if you configure one.
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
                      dim ? "border-[#111] text-[#2a2a2a]" : "border-[#1a1a1a] text-[#666]"
                    }`}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Comparison table ── */}
        <section className="py-20 px-6 border-t border-[#111]">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <p className="text-xs font-medium tracking-widest text-[#444] uppercase mb-3">Comparison</p>
              <h2 className="text-2xl font-bold text-[#e2e2e2] tracking-tight">
                Most tools run one gate. We run five.
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-[#111]">
                    <th className="text-left py-3 px-4 text-[#444] text-xs font-medium w-1/2">Feature</th>
                    <th className="text-center py-3 px-3 text-[#e2e2e2] text-xs font-bold">Quell</th>
                    <th className="text-center py-3 px-3 text-[#444] text-xs font-medium">Copilot</th>
                    <th className="text-center py-3 px-3 text-[#444] text-xs font-medium">Qodo</th>
                    <th className="text-center py-3 px-3 text-[#444] text-xs font-medium">Hypothesis</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={row.feature} className={`border-b border-[#0d0d0d] ${i % 2 === 0 ? "bg-[#050505]" : ""}`}>
                      <td className="py-2.5 px-4 text-[#666] text-xs">{row.feature}</td>
                      <td className="py-2.5 px-3 text-center"><ComparisonCell val={row.quell} /></td>
                      <td className="py-2.5 px-3 text-center"><ComparisonCell val={row.copilot} /></td>
                      <td className="py-2.5 px-3 text-center"><ComparisonCell val={row.qodo} /></td>
                      <td className="py-2.5 px-3 text-center"><ComparisonCell val={row.hypothesis} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                { cmd: "quell find src/", desc: "Find all untested edge cases — shows WRITTEN / SCAFFOLDED / FLAGGED buckets." },
                { cmd: "quell find src/ --fix", desc: "Write WRITTEN tests to disk. Each one passed all 5 gates." },
                { cmd: "quell find src/ --fix --auto", desc: "Skip confirmation prompts — use in CI pipelines." },
                { cmd: "quell score", desc: "Show Production Readiness Score for your project." },
                { cmd: "quell score --badge", desc: "Print PRS and SVG badge for your README." },
                { cmd: "quell ci src/", desc: "CI gate — exits non-zero if PRS is below prs_threshold." },
                { cmd: "quell install --action", desc: "Write the GitHub Actions workflow — posts PRS comment on every PR." },
                { cmd: "quell init", desc: "Add [tool.quell] to pyproject.toml with v2.0.0 defaults." },
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
                After every <code className="text-[#aaa] font-mono text-xs">quell find</code> run, Quell writes{" "}
                <code className="text-[#aaa] font-mono text-xs">quell-report.json</code> to your project root —
                a privacy-safe file with your PRS, bucket counts, and per-test confidence. No source code.
                Read by <code className="text-[#aaa] font-mono text-xs">quell score</code> and the GitHub Action.
              </p>
            </div>
            <div className="bg-[#080808] border border-[#111] rounded-xl px-5 py-4 font-mono text-xs leading-[1.9]">
              <p className="text-[#333]">{"{"}</p>
              <p className="pl-4"><span className="text-[#555]">&quot;quell_version&quot;</span><span className="text-[#333]">: </span><span className="text-[#888]">&quot;2.0.0&quot;</span><span className="text-[#333]">,</span></p>
              <p className="pl-4"><span className="text-[#555]">&quot;prs_score&quot;</span><span className="text-[#333]">: </span><span className="text-green-600">84</span><span className="text-[#333]">,</span></p>
              <p className="pl-4"><span className="text-[#555]">&quot;tier&quot;</span><span className="text-[#333]">: </span><span className="text-[#888]">&quot;production_ready&quot;</span><span className="text-[#333]">,</span></p>
              <p className="pl-4"><span className="text-[#555]">&quot;written&quot;</span><span className="text-[#333]">: </span><span className="text-green-600">8</span><span className="text-[#333]">,</span></p>
              <p className="pl-4"><span className="text-[#555]">&quot;scaffolded&quot;</span><span className="text-[#333]">: </span><span className="text-yellow-700">3</span><span className="text-[#333]">,</span></p>
              <p className="pl-4"><span className="text-[#555]">&quot;flagged&quot;</span><span className="text-[#333]">: </span><span className="text-yellow-700">2</span><span className="text-[#333]">,</span></p>
              <p className="pl-4"><span className="text-[#555]">&quot;avg_confidence&quot;</span><span className="text-[#333]">: </span><span className="text-[#888]">91</span><span className="text-[#333]">,</span></p>
              <p className="pl-4"><span className="text-[#555]">&quot;gaps_found&quot;</span><span className="text-[#333]">: </span><span className="text-[#888]">13</span><span className="text-[#333]">,</span></p>
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
                Quell scans every changed Python file for untested edge cases, runs them through
                the 5-gate pipeline, and posts a PRS comment with a tier emoji (🟢/🟡/🔴).
                One command to set up: <code className="text-[#aaa] font-mono text-xs">quell install --action</code>.
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
                    Add to any repo in under a minute. Runs <code className="text-[#aaa] font-mono">quell find</code> on every PR,
                    posts inline annotations on untested edge cases and a PRS tier comment (🟢/🟡/🔴). Idempotent — updates the same comment on each push.
                  </p>
                  <div className="bg-[#060606] border border-[#111] rounded-lg px-4 py-3 font-mono text-[11px] text-[#444] leading-[1.8] mb-4">
                    <p className="text-[#2a2a2a]"># generated by: quell install --action</p>
                    <p><span className="text-[#555]">uses</span>: quelltest/quelltest-lib@v2.0.0</p>
                    <p className="pl-2"><span className="text-[#555]">with</span>:</p>
                    <p className="pl-4">source-dir: <span className="text-[#888]">&apos;src/&apos;</span></p>
                    <p className="pl-4">prs-threshold: <span className="text-[#888]">&apos;60&apos;</span></p>
                  </div>
                  <div className="text-[#555] text-[11px] mb-4 space-y-1">
                    <p className="flex items-center gap-2"><span className="text-green-700">✓</span> Inline diff annotations per untested edge case</p>
                    <p className="flex items-center gap-2"><span className="text-green-700">✓</span> PRS comment with tier emoji on every PR</p>
                    <p className="flex items-center gap-2"><span className="text-green-700">✓</span> Gate CI on PRS threshold (prs-threshold: 80)</p>
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
                <span className="ml-auto text-[10px] text-[#2a2a2a] border border-[#1a1a1a] rounded px-2 py-0.5">posted by Quell bot</span>
              </div>
              <div className="bg-[#060606] px-6 py-5 font-mono text-xs text-[#444] leading-[1.9]">
                <p><span className="text-green-700">🟢</span> <span className="text-[#666] font-semibold">Quell Production Readiness Score: 84/100 — Production Ready</span></p>
                <div className="mt-3 border border-[#111] rounded overflow-hidden">
                  <div className="grid grid-cols-2 gap-0 border-b border-[#111] px-3 py-1.5 text-[#2a2a2a]">
                    <span>Metric</span><span>Value</span>
                  </div>
                  <div className="grid grid-cols-2 gap-0 px-3 py-1.5 border-b border-[#111]">
                    <span className="text-[#555]">WRITTEN tests</span><span className="text-green-700">8 (avg confidence: 91%)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-0 px-3 py-1.5 border-b border-[#111]">
                    <span className="text-[#555]">SCAFFOLDED stubs</span><span className="text-yellow-700">3 → tests/scaffold/</span>
                  </div>
                  <div className="grid grid-cols-2 gap-0 px-3 py-1.5 border-b border-[#111]">
                    <span className="text-[#555]">FLAGGED</span><span className="text-[#444]">2 (see annotations)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-0 px-3 py-1.5">
                    <span className="text-[#555]">PRS</span><span className="text-green-600">84/100 🟢</span>
                  </div>
                </div>
                <p className="mt-3 text-[#333] text-[10px]">Generated by Quell v2.0.0 — no code left your machine</p>
              </div>
            </div>

          </div>
        </section>

        {/* ── Upcoming ── */}
        <section className="py-20 px-6 border-t border-[#111]">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <p className="text-xs font-medium tracking-widest text-[#444] uppercase mb-3">Roadmap</p>
              <h2 className="text-2xl font-bold text-[#e2e2e2] tracking-tight">What&apos;s next.</h2>
              <p className="text-[#555] text-sm mt-2">Honest dates, no overpromising.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { when: "Q3 2026", title: "Container execution mode", desc: "Handle edge cases that depend on runtime state (env vars, framework injection). Isolated containers, ephemeral credentials, torn down after the run." },
                { when: "Q3 2026", title: "VS Code extension", desc: "See FLAGGED edge cases inline as squiggles. Run quell find on the file you're editing without leaving the editor." },
                { when: "Q4 2026", title: "QuellGraph — auto-resolve dependencies", desc: "If a method needs an instance with state, Quell builds the instance using your project's existing fixtures. Handles the SCAFFOLDED-to-WRITTEN conversion for complex cases." },
                { when: "Q4 2026", title: "Team dashboard", desc: "PRS trend across all repos. Audit log of every test Quell wrote in your org. Weekly edge case coverage digest." },
                { when: "Q1 2027", title: "Async support", desc: "Full test generation for async def functions and awaitables using pytest-asyncio. Currently stubs as synchronous." },
                { when: "Q1 2027", title: "JavaScript / TypeScript", desc: "Same engine, different AST. Pydantic → Zod. Docstrings → JSDoc. Same 5-gate pipeline." },
              ].map((item) => (
                <div key={item.title} className="border border-[#111] rounded-xl px-5 py-4 bg-[#080808]">
                  <p className="text-[10px] font-mono text-[#333] mb-2">{item.when}</p>
                  <p className="text-[#888] font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-[#444] text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
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
              <a href="mailto:hello@quelltest.dev" className="text-[#888] hover:text-white transition-colors underline underline-offset-2">
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
          <div className="flex items-center gap-2.5">
            <Image src="/quell_icon.png" alt="Quell" width={16} height={16} className="opacity-40" />
            <span className="text-[#555] text-sm">© 2026 Quelltest. MIT License.</span>
          </div>
          <nav aria-label="Footer navigation">
            <div className="flex items-center gap-6 text-sm text-[#666]">
              <a href="https://github.com/quelltest/quelltest-lib" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
              <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <Link href="/changelog" className="hover:text-white transition-colors">Changelog</Link>
              <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
              <Link href="/auth/sign-in" className="hover:text-white transition-colors">Sign in</Link>
            </div>
          </nav>
        </div>
      </footer>

    </div>
  );
}
