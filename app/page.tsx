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
      "250 mutations / month",
      "1 API key",
      "Rule-based generation",
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
      "10,000 mutations / month",
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
      "Unlimited mutations",
      "Unlimited API keys",
      "LLM fallback",
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
            <a href="https://github.com/shashank7109/quell" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/sign-in" className="text-sm text-[#555] hover:text-white transition-colors">Sign in</Link>
            <Link href="/auth/sign-up" className="text-sm bg-white text-black font-medium px-4 py-1.5 rounded-md hover:bg-neutral-100 transition-colors">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero — split layout ── */}
      <section className="pt-24 pb-0 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.05fr] gap-10 items-start pt-10">

          {/* Left */}
          <div className="py-6">
            <div className="inline-flex items-center gap-2 text-xs text-[#555] border border-[#1a1a1a] rounded-full px-3.5 py-1.5 mb-8 bg-[#0a0a0a]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              quelltest 0.1.0 — live on PyPI
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-5">
              Your survived mutants
              <br />
              <span className="text-[#444]">don&apos;t have to stay that way.</span>
            </h1>

            <p className="text-[#666] text-base leading-relaxed mb-8 max-w-[400px]">
              Quell reads your mutmut or Stryker output, generates pytest assertions
              for each surviving mutant, verifies they actually kill it, then writes
              them into your test files.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/auth/sign-up"
                className="inline-flex items-center justify-center gap-2 bg-white text-black font-medium px-5 py-2.5 rounded-lg hover:bg-neutral-100 transition-colors text-sm"
              >
                Start for free <ArrowRight size={13} />
              </Link>
              <a
                href="https://github.com/shashank7109/quell"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[#1a1a1a] text-[#555] font-medium px-5 py-2.5 rounded-lg hover:text-white hover:border-[#2a2a2a] transition-colors text-sm"
              >
                GitHub
              </a>
            </div>

            <CopyCommand />

            <div className="mt-8 flex items-center gap-5 text-xs text-[#333]">
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#333]" />9 operators</span>
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#333]" />zero false positives</span>
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#333]" />MIT</span>
            </div>
          </div>

          {/* Right — Terminal */}
          <div className="bg-[#080808] border border-[#1a1a1a] rounded-xl overflow-hidden font-mono text-xs md:sticky md:top-20">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#111]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#222]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#222]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#222]" />
              <span className="ml-3 text-[#333] text-[11px]">quell — bash</span>
            </div>
            <div className="p-5 space-y-1 leading-[1.8]">
              <p>
                <span className="text-[#333]">$ </span>
                <span className="text-white">quell scan --source mutmut</span>
              </p>
              <p className="text-[#3a3a3a]">  scanning .mutmut-cache ...</p>
              <p className="text-[#555]">
                {"  "}SURVIVED{"   "}
                <span className="text-white">14</span> mutants in calculator.py
              </p>
              <p className="text-[#2a2a2a] pt-1">{"  "}─────────────────────────</p>
              <p className="text-[#444]">{"  "}calculator.py:20{"  "}BOUNDARY_SHIFT{"  "}<span className="text-[#555]">&gt; ≥</span></p>
              <p className="text-[#444]">{"  "}calculator.py:34{"  "}ARITHMETIC_OP{"  "}<span className="text-[#555]">+ -</span></p>
              <p className="text-[#444]">{"  "}calculator.py:41{"  "}RETURN_VALUE{"   "}<span className="text-[#555]">x None</span></p>
              <p className="text-[#333]">{"  "}... 11 more</p>
              <p className="pt-2">
                <span className="text-[#333]">$ </span>
                <span className="text-white">quell fix</span>
              </p>
              <p className="text-[#555]">{"  "}[1/14]{"  "}BOUNDARY_SHIFT{"  "}line 20{"  "}<span className="text-green-500">✓ killed</span></p>
              <p className="text-[#555]">{"  "}[2/14]{"  "}ARITHMETIC_OP{"  "}line 34{"  "}<span className="text-green-500">✓ killed</span></p>
              <p className="text-[#555]">{"  "}[3/14]{"  "}RETURN_VALUE{"  "}{"  "}line 41{"  "}<span className="text-green-500">✓ killed</span></p>
              <p className="text-[#555]">{"  "}...</p>
              <p className="text-[#555]">{"  "}[13/14]{"  "}UNKNOWN{"  "}<span className="text-[#444]">→ LLM fallback</span>{"  "}<span className="text-green-500">✓ killed</span></p>
              <p className="text-[#555]">{"  "}[14/14]{"  "}UNKNOWN{"  "}<span className="text-[#333]">→ skipped</span></p>
              <p className="text-[#222] pt-1">{"  "}─────────────────────────</p>
              <p className="text-green-500">{"  "}12 tests written → test_calculator.py</p>
              <p className="text-[#333]">{"  "}1 mutant skipped (no rule, no LLM key)</p>
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
            { label: "mutmut", href: "https://github.com/boxed/mutmut" },
            { label: "Stryker", href: "https://stryker-mutator.io" },
            { label: "pytest", href: "https://pytest.org" },
            { label: "libcst", href: "https://libcst.readthedocs.io" },
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
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight max-w-sm">
              From scan to merged test in under a minute.
            </h2>
          </div>

          {/* Vertical step list */}
          <div className="divide-y divide-[#111]">
            {[
              {
                n: "01",
                title: "Scan your mutation results",
                body: "Run quell scan against your mutmut cache or Stryker JSON output. Both parse in under 50 ms. No configuration files required.",
                snippet: [
                  { t: "dim", v: "$ " },
                  { t: "white", v: "quell scan --source mutmut" },
                  { t: "nl" },
                  { t: "muted", v: "  SURVIVED  14 mutants in calculator.py" },
                ],
              },
              {
                n: "02",
                title: "Generate killing assertions",
                body: "Nine mutation operators have deterministic rule-based generators — no network call, no latency, no hallucinations. LLM is the fallback for the rare UNKNOWN case.",
                snippet: [
                  { t: "dim", v: "$ " },
                  { t: "white", v: "quell fix" },
                  { t: "nl" },
                  { t: "muted", v: "  12 / 14 handled by rule engine" },
                  { t: "nl" },
                  { t: "muted", v: "  2 / 14 sent to LLM fallback" },
                ],
              },
              {
                n: "03",
                title: "Verify before writing anything",
                body: "Every test is run against the live mutant in an isolated subprocess. The original suite must pass. The generated test must fail on the mutant. Both conditions required.",
                snippet: [
                  { t: "green", v: "  ✓ original suite passes" },
                  { t: "nl" },
                  { t: "green", v: "  ✓ mutant confirmed killed by test" },
                  { t: "nl" },
                  { t: "muted", v: "  → safe to inject" },
                ],
              },
              {
                n: "04",
                title: "Inject with the CST, not regex",
                body: "Tests are inserted using libcst — a lossless concrete syntax tree parser. Your comments, spacing, and formatting are preserved exactly. Source files are backed up first with a finally-block restore on any failure.",
                snippet: [
                  { t: "muted", v: "  backed up  calculator.py → .quell/backups/" },
                  { t: "nl" },
                  { t: "green", v: "  ✓ test_calculator.py  +12 assertions" },
                  { t: "nl" },
                  { t: "muted", v: "  formatting preserved by libcst" },
                ],
              },
            ].map((step) => (
              <div key={step.n} className="grid md:grid-cols-[1fr_1fr] gap-8 py-10 group">
                {/* Left */}
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#2a2a2a] tracking-widest block mb-4">{step.n}</span>
                  <h3 className="text-white font-semibold text-lg mb-3 leading-snug">{step.title}</h3>
                  <p className="text-[#555] text-sm leading-relaxed">{step.body}</p>
                </div>
                {/* Right — inline code block */}
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
              Most mutation testing tools default to sending all your code to an LLM and hoping
              for the best. Quell inverts this. Nine operators have hardcoded, deterministic
              generators. LLM is only invoked when the rule engine genuinely has no answer —
              and only if you&apos;ve configured a key.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              "BOUNDARY_SHIFT",
              "ARITHMETIC_OP",
              "LOGICAL_OP",
              "COMPARISON_OP",
              "RETURN_VALUE",
              "STATEMENT_DEL",
              "CONSTANT_MUTATION",
              "DECORATOR_REMOVAL",
              "COLLECTION_OP",
              { label: "UNKNOWN →  LLM", dim: true },
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
            <a href="https://github.com/shashank7109/quell" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <Link href="/auth/sign-in" className="hover:text-white transition-colors">Sign in</Link>
            <Link href="/auth/sign-up" className="hover:text-white transition-colors">Sign up</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
