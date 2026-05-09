"use client";
import { useState, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const API = process.env.NEXT_PUBLIC_API_URL || "";

function OAuthLoginForm() {
  const params = useSearchParams();
  const redirectUri = params.get("redirect_uri") ?? "";
  const state = params.get("state") ?? "";
  const codeChallenge = params.get("code_challenge") ?? "";
  const codeChallengeMethod = params.get("code_challenge_method") ?? "S256";
  const clientId = params.get("client_id") ?? "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Authenticate the user
      const loginRes = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!loginRes.ok) {
        const err = await loginRes.json().catch(() => ({}));
        throw new Error(err.detail ?? "Sign in failed");
      }
      const { access_token } = await loginRes.json();

      // 2. Exchange credentials for a PKCE auth code
      const authRes = await fetch(`${API}/api/auth/authorize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          code_challenge: codeChallenge,
          code_challenge_method: codeChallengeMethod,
          client_id: clientId,
          redirect_uri: redirectUri,
        }),
      });
      if (!authRes.ok) {
        throw new Error("Failed to generate authorization code");
      }
      const { code } = await authRes.json();

      // 3. Redirect back to the CLI's local callback server
      setDone(true);
      const callbackUrl = new URL(redirectUri);
      callbackUrl.searchParams.set("code", code);
      callbackUrl.searchParams.set("state", state);
      window.location.href = callbackUrl.toString();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication failed");
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="text-center">
        <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="text-[#e2e2e2] font-bold text-lg mb-2">Authenticated</h2>
        <p className="text-[#555] text-sm">Redirecting back to the CLI…</p>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-3 py-1.5 mb-5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
          </svg>
          <span className="font-mono text-xs text-[#444]">quell-cli</span>
        </div>
        <h1 className="text-xl font-bold text-[#e2e2e2] mb-2">Authorize CLI access</h1>
        <p className="text-sm text-[#555] leading-relaxed max-w-xs mx-auto">
          Sign in to grant <span className="font-mono text-[#666]">quell</span> access
          to your account. You only need to do this once per machine.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-medium text-[#666] mb-1.5 uppercase tracking-wider">
            Email
          </label>
          <input
            type="email"
            required
            autoFocus
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-[#060606] border border-[#1a1a1a] rounded-lg px-3.5 py-2.5 text-sm text-[#e2e2e2] placeholder-[#2a2a2a] focus:outline-none focus:border-[#2a2a2a] transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#666] mb-1.5 uppercase tracking-wider">
            Password
          </label>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-[#060606] border border-[#1a1a1a] rounded-lg px-3.5 py-2.5 text-sm text-[#e2e2e2] placeholder-[#2a2a2a] focus:outline-none focus:border-[#2a2a2a] transition-colors"
          />
        </div>

        {error && (
          <p className="text-xs text-red-400 bg-red-500/8 border border-red-500/15 rounded-lg px-3 py-2.5">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-medium py-2.5 rounded-lg text-sm hover:bg-neutral-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-1"
        >
          {loading ? "Authenticating…" : "Authorize CLI"}
        </button>
      </form>

      <p className="mt-5 text-center text-xs text-[#333]">
        No account?{" "}
        <Link href="/auth/sign-up" className="text-[#555] hover:text-[#888] transition-colors">
          Sign up free
        </Link>
      </p>
    </>
  );
}

export default function CLILoginPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-16">
      {/* Logo */}
      <Link href="/" className="mb-10">
        <Image src="/quell_logo.png" alt="Quell" width={88} height={28} className="h-6 w-auto opacity-80" />
      </Link>

      <div className="w-full max-w-sm bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-8">
        <Suspense fallback={<p className="text-[#555] text-sm text-center">Loading…</p>}>
          <OAuthLoginForm />
        </Suspense>
      </div>

      {/* Security note */}
      <p className="mt-6 text-[11px] text-[#2a2a2a] text-center leading-relaxed max-w-xs">
        This page was opened by the Quell CLI via PKCE OAuth 2.0.
        Your password is sent only to Quell — never to the CLI process.
      </p>
    </div>
  );
}
