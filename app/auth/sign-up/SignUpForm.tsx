"use client";
import { useState, FormEvent, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/api";
import AuthLayout from "@/components/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import GoogleButton from "@/components/GoogleButton";
import { buildGoogleOAuthURL } from "@/lib/google-oauth";

function SignUpForm() {
  const router = useRouter();
  const params = useSearchParams();
  const plan = params.get("plan") ?? "hobby";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.includes("@")) e.email = "Enter a valid email";
    if (password.length < 8) e.password = "Must be at least 8 characters";
    return e;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      const res = await auth.register(email, password, name);
      localStorage.setItem("quell_token", res.access_token);
      localStorage.setItem("quell_user", JSON.stringify(res.user));
      router.push(plan !== "hobby" ? `/dashboard/billing?upgrade=${plan}` : "/dashboard");
    } catch (err: unknown) {
      setErrors({ form: err instanceof Error ? err.message : "Registration failed" });
    } finally {
      setLoading(false);
    }
  }

  const planLabel = plan !== "hobby"
    ? `${plan.charAt(0).toUpperCase() + plan.slice(1)} plan selected`
    : undefined;

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start killing surviving mutants in minutes"
      badge={planLabel}
      footer={
        <>
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="text-white hover:underline underline-offset-4">
            Sign in
          </Link>
        </>
      }
    >
      {/* Google */}
      <GoogleButton onClick={() => {
        try {
          window.location.href = buildGoogleOAuthURL(plan);
        } catch (e) {
          setErrors({ form: e instanceof Error ? e.message : "Google sign-in unavailable" });
        }
      }} />

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-[#1f1f1f]" />
        <span className="text-xs text-[#3a3a3a] select-none">or continue with email</span>
        <div className="flex-1 h-px bg-[#1f1f1f]" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Full name"
          type="text"
          required
          autoFocus
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          error={errors.name}
        />
        <Input
          label="Email address"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          error={errors.email}
        />
        <Input
          label="Password"
          type="password"
          required
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Min. 8 characters"
          error={errors.password}
          hint="At least 8 characters"
        />

        {errors.form && (
          <p className="text-xs text-red-400 bg-red-950/30 border border-red-900/30 rounded-lg px-3 py-2">
            {errors.form}
          </p>
        )}

        <Button
          type="submit"
          variant="blue"
          size="md"
          fullWidth
          loading={loading}
          className="mt-1"
        >
          Create account
        </Button>
      </form>

      <p className="mt-5 text-xs text-[#3a3a3a] text-center leading-relaxed">
        By creating an account you agree to our{" "}
        <a href="#" className="text-[#555] hover:text-[#888]">Terms</a>{" "}
        and{" "}
        <a href="#" className="text-[#555] hover:text-[#888]">Privacy Policy</a>.
      </p>
    </AuthLayout>
  );
}

export default function SignUp() {
  return (
    <Suspense>
      <SignUpForm />
    </Suspense>
  );
}
