"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

type PricingRegion = "IN" | "INTL";

const PLANS_INR = [
  {
    id: "hobby",
    name: "Hobby",
    price: "Free",
    sub: "forever",
    highlight: false,
    features: [
      "500 requirements / month",
      "1 API key",
      "Rule-based generation — no LLM key needed",
      "Docstring, Pydantic & PySpark scanning",
      "Diagnostic report (.quell/report.json)",
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
      "PR comment reports",
      "Usage analytics dashboard",
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
    href: "mailto:hello@queltest.dev",
  },
];

const PLANS_USD = [
  {
    id: "hobby",
    name: "Hobby",
    price: "Free",
    sub: "forever",
    highlight: false,
    features: [
      "500 requirements / month",
      "1 API key",
      "Rule-based generation — no LLM key needed",
      "Docstring, Pydantic & PySpark scanning",
      "Diagnostic report (.quell/report.json)",
      "Community support",
    ],
    cta: "Get started",
    href: "/auth/sign-up",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19",
    sub: "/ month",
    highlight: true,
    features: [
      "Unlimited requirements",
      "5 API keys",
      "LLM fallback (Claude & GPT-4)",
      "Unlimited projects",
      "PR comment reports",
      "Usage analytics dashboard",
      "Email support",
    ],
    cta: "Start free trial",
    href: "/auth/sign-up?plan=pro",
  },
  {
    id: "team",
    name: "Team",
    price: "$79",
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
    href: "mailto:hello@queltest.dev",
  },
];

export default function PricingSection() {
  const [region, setRegion] = useState<PricingRegion>("IN");
  const [geoLoaded, setGeoLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/geo")
      .then((r) => r.json())
      .then((data: { country?: string }) => {
        setRegion(data.country === "IN" ? "IN" : "INTL");
        setGeoLoaded(true);
      })
      .catch(() => setGeoLoaded(true));
  }, []);

  const plans = region === "IN" ? PLANS_INR : PLANS_USD;
  const priceNote =
    region === "IN"
      ? "Prices in INR. Payments via Razorpay — UPI, cards, net banking."
      : "Prices in USD. Payments via Stripe.";

  return (
    <>
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
                <span className={`text-3xl font-bold text-[#e2e2e2] transition-opacity duration-300 ${geoLoaded ? "opacity-100" : "opacity-0"}`}>
                  {plan.price}
                </span>
                <span className="text-[#555] text-sm">{plan.sub}</span>
              </div>
            </div>

            <ul className="space-y-2.5 mb-7 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check size={12} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-[#888] text-sm">{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href={plan.href}
              className={`w-full text-center py-2.5 rounded-lg text-sm font-medium transition-colors ${
                plan.highlight
                  ? "bg-[#0070f3] text-white hover:bg-[#0060df]"
                  : "border border-[#1a1a1a] text-[#777] hover:text-white hover:border-[#2a2a2a]"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <p className="text-[#444] text-xs mt-6 text-center">
        {geoLoaded ? priceNote : "Loading pricing for your region…"}
      </p>
    </>
  );
}
