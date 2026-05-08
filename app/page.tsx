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
      "Rule-based generation (no LLM key needed)",
      "Diagnostic report",
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
      "Usage analytics",
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
              quelltest 0.4.4 — live on PyPI
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-5">
              Your docstrings say what
              <br />
              <span className="text-[#444]">your code should do.</span>
              <br />
              Quell proves it.
            </h1>

            <p className="text-[#666] text-base leading-relaxed mb-8 max-w-[420px]">
              Quell reads your docstrings, Pydantic models, and bug reports — extracts
              every testable requirement — then generates and verifies tests that actually
              prove each one. No LLM key required.
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
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#333]" />MIT</span>
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
                <span className="text-white">quell check payments.py --fix</span>
              </p>
              <p className="text-[#3a3a3a]">  scanning specifications...</p>
              <p className="text-[#2a2a2a] pt-1">  ─────────────────────────────────────</p>
              <p>
                <span className="text-[#444]">  process_payment  </span>
                <span className="text-yellow-600">MUST_RAISE  </span>
                <span className="text-green-500">✓ verified</span>
              </p>
              <p>
                <span className="text-[#444]">  process_payment  </span>
                <span className="text-yellow-600">MUST_RETURN </span>
                <span className="text-green-500">✓ verified</span>
              </p>
              <p>
                <span className="text-[#444]">  process_payment  </span>
                <span className="text-yellow-600">BOUNDARY    </span>
                <span className="text-green-500">✓ verified</span>
              </p>
              <p>
                <span className="text-[#444]">  PaymentRequest   </span>
                <span className="text-yellow-600">ENUM_VALID  </span>
                <span className="text-green-500">✓ verified</span>
              </p>
              <p className="text-[#2a2a2a]">  ─────────────────────────────────────</p>
              <p className="text-green-500">  4 tests written → tests/test_payments.py</p>
              <p className="text-[#555]">  Score: 100% (4/4 covered)</p>
              <p className="text-[#333]">  Diagnostic report: .quell/report.json</p>
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
            { label: "pytest", href: "https://pytest.org" },
            { label: "Pydantic", href: "https://docs.pydantic.dev" },
            { label: "libcst", href: "https://libcst.readthedocs.io" },
            { label: "Claude", href: "https://anthropic.com" },
            { label: "GPT-4", href: "https://openai.com" },
          ].map((t) => (
            <a
              key={t.label}
              href={t.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-mono text-[#444] hover:text-[#888] transition-colors"
            >
              {t.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-20 px-6 border-t border-[#111]">
        <div className="max-w-5xl mx-auto">

          <div className="mb-16">
            <p className="text-xs font-medium tracking-widest text-[#333] uppercase mb-3">How it works</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight max-w-md">
              From docstring to verified test in seconds.
            </h2>
          </div>

          <div className="divide-y divide-[#111]">
            {[
              {
                n: "01",
                title: "Read your existing specs",
                body: "Quell scans docstrings (Raises:, Returns: blocks), Pydantic models (Field validators, Literal types), and plain-English bug descriptions. No new annotations required.",
                snippet: [
                  { t: "dim", v: "$ " },
                  { t: "white", v: "quell check payments.py" },
                  { t: "nl" },
                  { t: "muted", v: "  MUST_RAISE   — ValueError: amount <= 0" },
                  { t: "nl" },
                  { t: "muted", v: "  MUST_RETURN  — dict with transaction_id" },
                  { t: "nl" },
                  { t: "muted", v: "  BOUNDARY     — amount: gt=0" },
                  { t: "nl" },
                  { t: "muted", v: "  ENUM_VALID   — currency: USD, EUR, GBP" },
                ],
              },
              {
                n: "02",
                title: "Find gaps — no test execution needed",
                body: "An AST-based coverage checker scans your test files and marks each requirement as covered or uncovered. Fast, static, no pytest run required.",
                snippet: [
                  { t: "muted", v: "  Score: 0% (0/4 covered)" },
                  { t: "nl" },
                  { t: "muted", v: "  4 gap(s) found." },
                  { t: "nl" },
                  { t: "muted", v: "  Run with --fix to generate tests." },
                ],
              },
              {
                n: "03",
                title: "Verify before writing — the moat",
                body: "Every generated test must PASS on correct code AND FAIL on violated code. Quell injects targeted violations (removes the raise, weakens the threshold, replaces the return) and runs both phases in subprocess isolation.",
                snippet: [
                  { t: "green", v: "  ✓ test passes on original code" },
                  { t: "nl" },
                  { t: "green", v: "  ✓ test fails on violated code" },
                  { t: "nl" },
                  { t: "muted", v: "  → safe to write" },
                ],
              },
              {
                n: "04",
                title: "Write with libcst. Backup always.",
                body: "Tests are injected using libcst — a lossless concrete syntax tree. Your comments, spacing, and formatting are preserved. Source is backed up first and always restored in a finally block.",
                snippet: [
                  { t: "muted", v: "  backed up  payments.py → .quell/backups/" },
                  { t: "nl" },
                  { t: "green", v: "  ✓ tests/test_payments.py  +4 tests" },
                  { t: "nl" },
                  { t: "muted", v: "  Diagnostic report: .quell/report.json" },
                ],
              },
            ].map((step) => (
              <div key={step.n} className="grid md:grid-cols-[1fr_1fr] gap-8 py-10 group">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#2a2a2a] tracking-widest block mb-4">{step.n}</span>
                  <h3 className="text-white font-semibold text-lg mb-3 leading-snug">{step.title}</h3>
                  <p className="text-[#555] text-sm leading-relaxed">{step.body}</p>
                </div>
                <div className="bg-[#080808] border border-[#111] rounded-xl px-5 py-4 font-mono text-xs leading-[1.9] self-start">
                  {step.snippet.map((token, i) => {
                    if (token.t === "nl") return <br key={i} />;
                    const cls =
                      token.t === "white" ? "text-white" :
                      token.t === "green" ? "text-green-500" :
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
            <h2 className="text-2xl font-bold text-white tracking-tight mb-4">
              Rule-based first.<br />LLM as last resort.
            </h2>
            <p className="text-[#555] text-sm leading-relaxed">
              Most test generation tools send your code to an LLM and hope for the best.
              Quell inverts this. Every constraint kind has a deterministic rule-based generator —
              no network call, no hallucinations, no API key required. LLM is only invoked
              for complex unstructured specs, and only if you configure a key.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              "MUST_RAISE",
              "MUST_RETURN",
              "BOUNDARY",
              "ENUM_VALID",
              "BUG_REPRO",
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

      {/* ── Diagnostic report ── */}
      <section className="py-16 px-6 border-t border-[#111]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.4fr] gap-12 items-start">
          <div>
            <p className="text-xs font-medium tracking-widest text-[#333] uppercase mb-4">Privacy-safe feedback loop</p>
            <h2 className="text-2xl font-bold text-white tracking-tight mb-4">
              Every run generates a diagnostic report.
            </h2>
            <p className="text-[#555] text-sm leading-relaxed">
              After every <code className="text-[#888] font-mono text-xs">--fix</code> run, Quell writes <code className="text-[#888] font-mono text-xs">.quell/report.json</code> — a
              privacy-safe file that records where the rule engine succeeded, where it failed,
              and which argument types it couldn&apos;t stub. No source code, no full paths.
              Safe to share with the Quell maintainer to improve coverage over time.
            </p>
          </div>
          <div className="bg-[#080808] border border-[#111] rounded-xl px-5 py-4 font-mono text-xs leading-[1.9]">
            <p className="text-[#333]">{"{"}</p>
            <p className="pl-4"><span className="text-[#555]">&quot;quell_version&quot;</span><span className="text-[#333]">: </span><span className="text-[#888]">&quot;0.4.4&quot;</span><span className="text-[#333]">,</span></p>
            <p className="pl-4"><span className="text-[#555]">&quot;written&quot;</span><span className="text-[#333]">: </span><span className="text-green-500">41</span><span className="text-[#333]">,</span></p>
            <p className="pl-4"><span className="text-[#555]">&quot;fails_on_correct&quot;</span><span className="text-[#333]">: </span><span className="text-yellow-600">15</span><span className="text-[#333]">,</span></p>
            <p className="pl-4"><span className="text-[#555]">&quot;doesnt_catch_violation&quot;</span><span className="text-[#333]">: </span><span className="text-green-500">0</span><span className="text-[#333]">,</span></p>
            <p className="pl-4"><span className="text-[#555]">&quot;unknown_type_frequency&quot;</span><span className="text-[#333]">: </span><span className="text-[#444]">{"{}"}</span><span className="text-[#333]">,</span></p>
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
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Free to start. Scale when you need to.
            </h2>
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
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    <span className="text-[#444] text-sm">{plan.sub}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-7 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check size={12} className="text-green-500 flex-shrink-0 mt-0.5" />
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
            <Link href="/auth/sign-in" className="hover:text-white transition-colors">Sign in</Link>
            <Link href="/auth/sign-up" className="hover:text-white transition-colors">Sign up</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
