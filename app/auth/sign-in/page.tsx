"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/api";
import AuthLayout from "@/components/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import GoogleButton from "@/components/GoogleButton";

function googleOAuthURL(): string {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
  const redirectUri = `${window.location.origin}/auth/callback`;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
  });
  return `https://accounts.google.com/o/oauth2/auth?${params}`;
}

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await auth.login(email, password);
      localStorage.setItem("quell_token", res.access_token);
      localStorage.setItem("quell_user", JSON.stringify(res.user));
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your Quell account"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/auth/sign-up" className="text-white hover:underline underline-offset-4">
            Sign up
          </Link>
        </>
      }
    >
      {/* Google */}
      <GoogleButton onClick={() => { window.location.href = googleOAuthURL(); }} />

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-[#1f1f1f]" />
        <span className="text-xs text-[#3a3a3a] select-none">or continue with email</span>
        <div className="flex-1 h-px bg-[#1f1f1f]" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Email address"
          type="email"
          required
          autoFocus
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-[#ccc]">Password</label>
            <button
              type="button"
              className="text-xs text-[#555] hover:text-[#888] transition-colors"
            >
              Forgot password?
            </button>
          </div>
          <Input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            error={error || undefined}
          />
        </div>

        <Button
          type="submit"
          variant="blue"
          size="md"
          fullWidth
          loading={loading}
          className="mt-1"
        >
          Sign in
        </Button>
      </form>

      {/* Terms */}
      <p className="mt-5 text-xs text-[#3a3a3a] text-center leading-relaxed">
        By signing in you agree to our{" "}
        <a href="#" className="text-[#555] hover:text-[#888]">Terms</a>{" "}
        and{" "}
        <a href="#" className="text-[#555] hover:text-[#888]">Privacy Policy</a>.
      </p>
    </AuthLayout>
  );
}
