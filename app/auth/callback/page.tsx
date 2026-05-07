"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/api";

function CallbackHandler() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const code = params.get("code");
    const state = params.get("state"); // plan passed via state param
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

    auth
      .googleCallback(code, redirectUri)
      .then((res) => {
        localStorage.setItem("quell_token", res.access_token);
        localStorage.setItem("quell_user", JSON.stringify(res.user));
        // If a plan was passed via state, send to billing for upgrade
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
          <a
            href="/auth/sign-in"
            className="text-sm text-[#0070f3] hover:underline"
          >
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
