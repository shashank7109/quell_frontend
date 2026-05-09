"use client";
import { useState, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import GoogleButton from "@/components/GoogleButton";
import { buildGoogleOAuthURL } from "@/lib/google-oauth";

const API = process.env.NEXT_PUBLIC_API_URL || "";

interface PkceParams {
  redirect_uri: string;
  state: string;
  code_challenge: string;
  code_challenge_method: string;
  client_id: string;
}

function OAuthLoginForm() {
  const params = useSearchParams();
  const pkce: PkceParams = {
    redirect_uri: params.get("redirect_uri") ?? "",
    state: params.get("state") ?? "",
    code_challenge: params.get("code_challenge") ?? "",
    code_challenge_method: params.get("code_challenge_method") ?? "S256",
    client_id: params.get("client_id") ?? "",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function authorizeAndRedirect(accessToken: string) {
    const authRes = await fetch(`${API}/api/auth/authorize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        code_challenge: pkce.code_challenge,
        code_challenge_method: pkce.code_challenge_method,
        client_id: pkce.client_id,
        redirect_uri: pkce.redirect_uri,
      }),
    });
    if (!authRes.ok) throw new Error("Failed to generate authorization code");
    const { code } = await authRes.json();

    setDone(true);
    const callbackUrl = new URL(pkce.redirect_uri);
    callbackUrl.searchParams.set("code", code);
    callbackUrl.searchParams.set("state", pkce.state);
    window.location.href = callbackUrl.toString();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
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
      await authorizeAndRedirect(access_token);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication failed");
      setLoading(false);
    }
  }

  function handleGoogleSignIn() {
    try {
      sessionStorage.setItem("cli_pkce_params", JSON.stringify(pkce));
      window.location.href = buildGoogleOAuthURL("cli_pkce");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Google sign-in unavailable");
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
        <p className="text-[#888] text-sm">Redirecting back to the CLI…</p>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-[#0a0a0a] border border-[#222] rounded-lg px-3 py-1.5 mb-5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
          </svg>
          <span className="font-mono text-xs text-[#888]">quell-cli</span>
        </div>
        <h1 className="text-xl font-bold text-[#e2e2e2] mb-2">Authorize CLI access</h1>
        <p className="text-sm text-[#888] leading-relaxed max-w-xs mx-auto">
          Sign in to grant <span className="font-mono text-[#aaa]">quell</span> access
          to your account. You only need to do this once per machine.
        </p>
      </div>

      {/* Google */}
      <GoogleButton onClick={handleGoogleSignIn} label="Continue with Google" />

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-[#1f1f1f]" />
        <span className="text-xs text-[#555] select-none">or continue with email</span>
        <div className="flex-1 h-px bg-[#1f1f1f]" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-medium text-[#aaa] mb-1.5 uppercase tracking-wider">
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
            className="w-full bg-[#0d0d0d] border border-[#222] rounded-lg px-3.5 py-2.5 text-sm text-[#e2e2e2] placeholder-[#3a3a3a] focus:outline-none focus:border-[#444] transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#aaa] mb-1.5 uppercase tracking-wider">
            Password
          </label>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-[#0d0d0d] border border-[#222] rounded-lg px-3.5 py-2.5 text-sm text-[#e2e2e2] placeholder-[#3a3a3a] focus:outline-none focus:border-[#444] transition-colors"
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

      <p className="mt-5 text-center text-xs text-[#555]">
        No account?{" "}
        <Link href="/auth/sign-up" className="text-[#888] hover:text-[#bbb] transition-colors">
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
        <Suspense fallback={<p className="text-[#666] text-sm text-center">Loading…</p>}>
          <OAuthLoginForm />
        </Suspense>
      </div>

      <p className="mt-6 text-[11px] text-[#3a3a3a] text-center leading-relaxed max-w-xs">
        This page was opened by the Quell CLI via PKCE OAuth 2.0.
        Your password is sent only to Quell — never to the CLI process.
      </p>
    </div>
  );
}
