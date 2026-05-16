import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Changelog — Quelltest",
  description:
    "Full release history of Quelltest — from v0.1.0 initial release to v1.0.0 infrastructure-aware verified testing.",
  alternates: { canonical: "https://quell.buildsbyshashank.tech/changelog" },
  openGraph: {
    title: "Quelltest Changelog",
    description: "Every release from v0.1.0 to v1.0.0 with what changed and why.",
    url: "https://quell.buildsbyshashank.tech/changelog",
    type: "website",
  },
};

/* ── Version badge colours ── */
function VersionBadge({ v, highlight }: { v: string; highlight?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-mono font-semibold ${
        highlight
          ? "bg-white text-black"
          : "bg-[#111] text-[#888] border border-[#222]"
      }`}
    >
      {v}
    </span>
  );
}

/* ── Single release entry ── */
interface ReleaseProps {
  version: string;
  date: string;
  tag?: "major" | "minor" | "patch";
  highlight?: boolean;
  children: React.ReactNode;
}

function Release({ version, date, tag, highlight, children }: ReleaseProps) {
  const tagColor =
    tag === "major"
      ? "text-white bg-[#1a3a1a] border-[#2d5a2d]"
      : tag === "minor"
      ? "text-[#60a5fa] bg-[#0d1f33] border-[#1a3a5c]"
      : "text-[#888] bg-[#0a0a0a] border-[#1a1a1a]";

  return (
    <div
      className={`relative pl-8 pb-10 border-l ${
        highlight ? "border-[#333]" : "border-[#111]"
      }`}
    >
      {/* Timeline dot */}
      <span
        className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full border ${
          highlight ? "bg-white border-white" : "bg-[#1a1a1a] border-[#333]"
        }`}
      />

      <div className="flex flex-wrap items-center gap-3 mb-3">
        <VersionBadge v={version} highlight={highlight} />
        {tag && (
          <span
            className={`text-[10px] font-medium uppercase tracking-widest px-2 py-0.5 rounded border ${tagColor}`}
          >
            {tag}
          </span>
        )}
        <span className="text-xs text-[#444] font-mono">{date}</span>
      </div>

      <div className="text-[#888] text-sm leading-relaxed space-y-1.5">
        {children}
      </div>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex gap-2">
      <span className="text-[#333] select-none shrink-0">—</span>
      <span>{children}</span>
    </p>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-[#aaa] text-xs bg-[#0d0d0d] border border-[#1a1a1a] rounded px-1.5 py-0.5">
      {children}
    </code>
  );
}

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-[#111] bg-black/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-sm text-[#777] hover:text-white transition-colors">
            ← quelltest
          </Link>
          <div className="flex items-center gap-6 text-sm text-[#777]">
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <a
              href="https://github.com/quelltest/quelltest-lib"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-14">
            <p className="text-xs font-medium tracking-widest text-[#444] uppercase mb-3">
              Release History
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#e2e2e2] mb-4">
              Changelog
            </h1>
            <p className="text-[#666] text-sm leading-relaxed max-w-lg">
              Every release from first commit to v1.0.0. Dates are UTC.
              Source on{" "}
              <a
                href="https://github.com/quelltest/quelltest-lib"
                target="_blank"
                rel="noreferrer"
                className="text-[#888] underline underline-offset-2 hover:text-white"
              >
                GitHub
              </a>
              .
            </p>
          </div>

          {/* ── Timeline ── */}
          <div>

            {/* v1.0.0 */}
            <Release version="v1.0.0" date="2026-05-16" tag="major" highlight>
              <p className="text-[#e2e2e2] font-medium mb-2">Infrastructure-Aware Verified Testing</p>
              <Bullet>
                <strong className="text-[#ccc]">QuellGraph</strong> — persistent SQLite code-intelligence graph at{" "}
                <Code>.quellgraph/graph.db</Code>; incremental sha256-based AST builder; BFS infra-tag
                propagation across call chains (3-hop verified); <Code>quell graph build / show / why / stale / stats</Code>
              </Bullet>
              <Bullet>
                <strong className="text-[#ccc]">Ephemeral container engine</strong> — auto-starts throwaway
                Docker containers (postgres, redis, localstack, mongo, smtp, rabbitmq, elasticsearch);
                hardcoded ephemeral creds only; keep-alive lockfile; <Code>quell teardown</Code>;
                pytest fixture injection into conftest.py
              </Bullet>
              <Bullet>
                <strong className="text-[#ccc]">6-factor confidence scorer</strong> — annotation coverage,
                constraint clarity, dependency clarity, graph coverage, docstring quality, mutation strength;
                tiers HIGH≥85 / MEDIUM≥70 / LOW≥50 / SKIP&lt;50; write gate + CI gate
              </Bullet>
              <Bullet>
                <strong className="text-[#ccc]">New CLI flags</strong> — <Code>--with-containers</Code>,{" "}
                <Code>--min-confidence</Code>, <Code>--ci-confidence</Code>, <Code>--keep-containers</Code>,{" "}
                <Code>--graph-rebuild</Code>
              </Bullet>
              <Bullet>
                Environment detection: 8 runtime types (LOCAL_DOCKER, GITHUB_ACTIONS, GITLAB_CI,
                CIRCLECI, DEVCONTAINER, DOCKER_IN_DOCKER, KUBERNETES_POD, NO_DOCKER) with per-env strategy
              </Bullet>
              <Bullet>
                Self-scan: quelltest scanned itself — 58 requirements found, 12 verified tests written
              </Bullet>
            </Release>

            {/* v0.9.9.4 */}
            <Release version="v0.9.9.4" date="2026-05-14" tag="patch">
              <Bullet>Engine accuracy: nested function scanning, syntax fixes, bare return violation, silent_fail stubs</Bullet>
              <Bullet>Skip functions where all required params are unknown types — no more guaranteed-failing stubs</Bullet>
              <Bullet>CI: ruff E501, mypy arg-type and no-untyped-def fixes</Bullet>
            </Release>

            {/* v0.9.8 */}
            <Release version="v0.9.8" date="2026-05-12" tag="minor">
              <Bullet>
                <strong className="text-[#ccc]">GitHub Action</strong> — composite action{" "}
                (<Code>uses: shashank7109/quelltest_lib@main</Code>); scans PRs, posts inline annotations,
                idempotent PR comment; <Code>fail-on-gaps: true</Code> blocks merges
              </Bullet>
              <Bullet>GitHub App rewrite — webhook server; no per-repo YAML; fetches changed files via Contents API</Bullet>
              <Bullet><Code>--format github</Code> flag — outputs GitHub Actions annotation syntax</Bullet>
              <Bullet><Code>source_line</Code> added to <Code>Requirement</Code> model</Bullet>
            </Release>

            {/* v0.9.6.1 */}
            <Release version="v0.9.6.1" date="2026-05-12" tag="patch">
              <Bullet>CUSTOM guard rules — assert statements now generate concrete stubs</Bullet>
              <Bullet>Concrete class preference — picks non-abstract implementors over base classes</Bullet>
              <Bullet>Assert violation injection — comments out assert line for Phase 2</Bullet>
            </Release>

            {/* v0.9.5 */}
            <Release version="v0.9.5" date="2026-05-12" tag="patch">
              <Bullet><Code>PYTHONPATH=src/</Code> auto-set in pytest subprocess — fixes src-layout projects</Bullet>
              <Bullet>Builtin exception guard — <Code>ValueError</Code>, <Code>TypeError</Code>, etc. handled directly</Bullet>
              <Bullet>Skip abstract stubs — never instantiates ABC classes</Bullet>
            </Release>

            {/* v0.9.4 */}
            <Release version="v0.9.4" date="2026-05-12" tag="minor">
              <Bullet>Detects <Code>try/except/raise</Code> patterns — generates must_raise tests</Bullet>
              <Bullet>Detects standalone <Code>raise</Code> statements in guard branches</Bullet>
            </Release>

            {/* v0.9.3 */}
            <Release version="v0.9.3" date="2026-05-12" tag="patch">
              <Bullet>Auto-detects pytest when not in <Code>sys.executable</Code> environment (conda, venv, pipx)</Bullet>
            </Release>

            {/* v0.9.2 */}
            <Release version="v0.9.2" date="2026-05-11" tag="minor">
              <Bullet>Auto-loads <Code>.env</Code> family files into pytest subprocess — no more missing env vars in tests</Bullet>
              <Bullet>Loads <Code>.env.example</Code>, <Code>.env.template</Code>, <Code>.env.local</Code>, <Code>.env.secrets</Code></Bullet>
              <Bullet>Surfaces real failure reason for rejected tests in the report</Bullet>
            </Release>

            {/* v0.9.0 */}
            <Release version="v0.9.0" date="2026-05-11" tag="minor">
              <Bullet>
                <strong className="text-[#ccc]">Dual-engine architecture</strong> — rule engine handles
                known patterns deterministically; framework engine handles FastAPI / Flask route guards
              </Bullet>
              <Bullet>Word-boundary check eliminates false stub injections on framework endpoints</Bullet>
              <Bullet>Root-cause Windows encoding bug fixed — <Code>sys.executable</Code> + UTF-8 subprocess</Bullet>
            </Release>

            {/* v0.8.0 */}
            <Release version="v0.8.0" date="2026-05-11" tag="minor">
              <Bullet>Full violation coverage — all <Code>ConstraintKind</Code> types get targeted injection</Bullet>
              <Bullet>Async function support — wraps test body in <Code>asyncio.run()</Code></Bullet>
              <Bullet>Duplicate kwargs fix in <Code>not_null</Code> stubs</Bullet>
            </Release>

            {/* v0.7.0 */}
            <Release version="v0.7.0" date="2026-05-11" tag="minor">
              <Bullet>Fix duplicate kwargs in <Code>not_null</Code> stubs</Bullet>
              <Bullet>Fix <Code>silent_fail</Code> verification — correctly tests None-return paths</Bullet>
            </Release>

            {/* v0.6.9 */}
            <Release version="v0.6.9" date="2026-05-10" tag="patch">
              <Bullet>Pydantic classmethod stubs — correctly handles <Code>@classmethod</Code> validators</Bullet>
              <Bullet>Enum kwarg name fix — uses correct field name in generated stubs</Bullet>
              <Bullet>Optional stub dedup — no more duplicate <Code>Optional[X]</Code> in generated code</Bullet>
            </Release>

            {/* v0.6.1 */}
            <Release version="v0.6.1" date="2026-05-10" tag="patch">
              <Bullet>Fix <Code>asyncio.run()</Code> crash in running event loop (Jupyter / IPython) — thread fallback</Bullet>
              <Bullet><Code>quell scan --fix</Code> is now rule-engine-only by default — no LLM hang</Bullet>
            </Release>

            {/* v0.6.0 */}
            <Release version="v0.6.0" date="2026-05-10" tag="minor">
              <Bullet>
                <strong className="text-[#ccc]">CodeGuardReader</strong> — scans{" "}
                <Code>if/raise</Code>, <Code>assert</Code>, <Code>try/except/raise</Code> patterns
                directly from source; no docstrings or annotations needed
              </Bullet>
              <Bullet><Code>quell scan</Code> command — works on any Python file</Bullet>
              <Bullet>FixSuggester — interactive fix recommendations</Bullet>
              <Bullet>Always writes <Code>quell-report.json</Code> after every run</Bullet>
            </Release>

            {/* v0.5.1 */}
            <Release version="v0.5.1" date="2026-05-09" tag="patch">
              <Bullet>Fix auth login hang — <Code>Connection: close</Code> header, faster token error</Bullet>
            </Release>

            {/* v0.5.0 */}
            <Release version="v0.5.0" date="2026-05-09" tag="minor">
              <Bullet>
                <strong className="text-[#ccc]">Auth system</strong> — <Code>quell auth login</Code> with
                PKCE OAuth; credentials stored in <Code>~/.quell/credentials.json</Code>
              </Bullet>
              <Bullet>
                <strong className="text-[#ccc]">PySpark reader</strong> — extracts requirements from{" "}
                <Code>StructType</Code> schemas (<Code>nullable=False</Code>, <Code>DoubleType</Code>, etc.)
              </Bullet>
              <Bullet><Code>quell pr</Code> — posts scan results as GitHub PR comment</Bullet>
              <Bullet><Code>--no-llm</Code> flag — disables all LLM calls; rule engine only</Bullet>
            </Release>

            {/* v0.4.4 */}
            <Release version="v0.4.4" date="2026-05-08" tag="patch">
              <Bullet>Rule engine improvements — better boundary detection, improved stub generation</Bullet>
              <Bullet><Code>--version</Code> / <Code>-V</Code> flag added to CLI</Bullet>
            </Release>

            {/* v0.4.0 */}
            <Release version="v0.4.0" date="2026-05-08" tag="minor">
              <Bullet>
                <strong className="text-[#ccc]">Spec-first architecture</strong> — unified{" "}
                <Code>Requirement</Code> model; all readers return <Code>list[Requirement]</Code>
              </Bullet>
              <Bullet>Signature inspection — real parameter names and types used in generated stubs</Bullet>
              <Bullet>Targeted violation injection — each <Code>ConstraintKind</Code> gets a precise mutation</Bullet>
              <Bullet>Diagnostic report — <Code>quell-report.json</Code> records per-requirement outcomes</Bullet>
            </Release>

            {/* v0.3.0 */}
            <Release version="v0.3.0" date="2026-05-07" tag="minor">
              <Bullet>GitHub integration — PR comment poster, webhook listener</Bullet>
              <Bullet>VS Code extension scaffold</Bullet>
              <Bullet>First PyPI release — <Code>pip install quelltest</Code></Bullet>
            </Release>

            {/* v0.2.0 */}
            <Release version="v0.2.0" date="2026-05-07" tag="minor">
              <Bullet>CI score tracking — <Code>quell score --badge</Code> generates a coverage badge</Bullet>
              <Bullet>Repair mode — auto-writes verified tests to disk</Bullet>
              <Bullet>MCP server — exposes quelltest as a tool for Claude Desktop</Bullet>
              <Bullet>SDK — <Code>from quell import Quell; q = Quell(); q.check("src/")</Code></Bullet>
            </Release>

            {/* v0.1.0 */}
            <Release version="v0.1.0" date="2026-05-07" tag="minor">
              <Bullet>Initial release — Python 3.11+, Typer CLI, Pydantic v2, libcst</Bullet>
              <Bullet>Docstring reader — extracts <Code>Raises:</Code> / <Code>Returns:</Code> blocks</Bullet>
              <Bullet>Pydantic reader — extracts <Code>Field</Code> constraints and <Code>Literal</Code> types</Bullet>
              <Bullet>Two-phase verifier — Phase 1 pass on correct, Phase 2 fail on violated</Bullet>
              <Bullet>AST-safe writer — libcst injection, backup before write, restore on failure</Bullet>
            </Release>

          </div>

          {/* Footer links */}
          <div className="mt-6 pt-8 border-t border-[#111] flex flex-wrap gap-6 text-xs text-[#444]">
            <a
              href="https://github.com/quelltest/quelltest-lib/releases"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#888] transition-colors"
            >
              GitHub Releases ↗
            </a>
            <a
              href="https://pypi.org/project/quelltest/#history"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#888] transition-colors"
            >
              PyPI history ↗
            </a>
            <Link href="/docs" className="hover:text-[#888] transition-colors">
              Docs
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
