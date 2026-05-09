"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/api";

const API = process.env.NEXT_PUBLIC_API_URL || "";

interface CliPkceParams {
  redirect_uri: string;
  state: string;
  code_challenge: string;
  code_challenge_method: string;
  client_id: string;
}

function CallbackHandler() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const code = params.get("code");
    const state = params.get("state");
    const oauthError = params.get("error");

    if (oauthError) {
      setError("Google sign-in was cancelled or failed.");
      return;
    }
    if (!code) {
      setError("Missing authorisation code from Google.");
      return;
    }

    const redirectUri = `${window.location.origin}/auth/callback`;

    // CLI PKCE flow — complete the authorization and redirect back to the CLI
    if (state === "cli_pkce") {
      const raw = sessionStorage.getItem("cli_pkce_params");
      if (!raw) {
        setError("CLI session expired. Please run `quell auth login` again.");
        return;
      }
      const pkce: CliPkceParams = JSON.parse(raw);
      sessionStorage.removeItem("cli_pkce_params");

      auth
        .googleCallback(code, redirectUri)
        .then(async (res) => {
          // Exchange Quell JWT for a PKCE auth code
          const authRes = await fetch(`${API}/api/auth/authorize`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${res.access_token}`,
            },
            body: JSON.stringify({
              code_challenge: pkce.code_challenge,
              code_challenge_method: pkce.code_challenge_method,
              client_id: pkce.client_id,
              redirect_uri: pkce.redirect_uri,
            }),
          });
          if (!authRes.ok) throw new Error("Failed to generate CLI authorization code");
          const { code: authCode } = await authRes.json();

          const callbackUrl = new URL(pkce.redirect_uri);
          callbackUrl.searchParams.set("code", authCode);
          callbackUrl.searchParams.set("state", pkce.state);
          window.location.href = callbackUrl.toString();
        })
        .catch((err: unknown) => {
          setError(err instanceof Error ? err.message : "Authentication failed");
        });
      return;
    }

    // Normal web app flow
    auth
      .googleCallback(code, redirectUri)
      .then((res) => {
        localStorage.setItem("quell_token", res.access_token);
        localStorage.setItem("quell_user", JSON.stringify(res.user));
        if (state && state !== "hobby") {
          router.replace(`/dashboard/billing?upgrade=${state}`);
        } else {
          router.replace("/dashboard");
        }
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Authentication failed");
      });
  }, [params, router]);

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <p className="text-red-400 mb-4">{error}</p>
          <a href="/auth/sign-in" className="text-sm text-[#0070f3] hover:underline">
            Back to sign in
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#333] border-t-white rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#888] text-sm">Completing sign in…</p>
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense>
      <CallbackHandler />
    </Suspense>
  );
}
