"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Zap, CreditCard } from "lucide-react";
import {
  billing as billingApi,
  type BillingInfo,
  type PlanDetails,
} from "@/lib/api";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

const planOrder = ["hobby", "pro", "team"] as const;
type PlanId = (typeof planOrder)[number];

const PAID_PLANS = new Set(["pro", "team"]);

function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) { resolve(); return; }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Razorpay"));
    document.body.appendChild(s);
  });
}

function BillingContent() {
  const params = useSearchParams();
  const [info, setInfo] = useState<BillingInfo | null>(null);
  const [plans, setPlans] = useState<Record<string, PlanDetails>>({});
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const upgradeParam = params.get("upgrade");

  useEffect(() => {
    Promise.all([billingApi.current(), billingApi.plans()])
      .then(([b, p]) => {
        setInfo(b);
        setPlans(p);
        if (upgradeParam && p[upgradeParam] && upgradeParam !== b.current_plan) {
          startRazorpay(upgradeParam, b);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 4000);
  }

  async function startRazorpay(planId: string, currentInfo?: BillingInfo) {
    const resolvedInfo = currentInfo ?? info;
    if (!resolvedInfo) return;

    if (planId === "hobby") {
      await handleFreeDowngrade();
      return;
    }

    setPaying(planId);
    try {
      await loadRazorpayScript();
      const order = await billingApi.createOrder(planId);
      const userRaw = localStorage.getItem("quell_user");
      const user = userRaw ? JSON.parse(userRaw) : {};

      const rzp = new window.Razorpay({
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: "Quell",
        description: `${plans[planId]?.name ?? planId} Plan — monthly`,
        order_id: order.order_id,
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          try {
            await billingApi.verifyPayment({ ...response, plan: planId });
            if (userRaw) {
              const u = JSON.parse(userRaw);
              u.plan = planId;
              localStorage.setItem("quell_user", JSON.stringify(u));
            }
            setInfo((prev) =>
              prev ? { ...prev, current_plan: planId, details: plans[planId] } : prev
            );
            showToast(`You're now on ${plans[planId]?.name}!`);
          } catch {
            showToast("Payment received but plan update failed. Contact support.", false);
          } finally {
            setPaying(null);
          }
        },
        modal: { ondismiss: () => setPaying(null) },
        prefill: { email: user.email ?? "", name: user.name ?? "" },
        theme: { color: "#0070f3" },
      });
      rzp.open();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Payment failed", false);
      setPaying(null);
    }
  }

  async function handleFreeDowngrade() {
    setPaying("hobby");
    try {
      await billingApi.upgrade("hobby");
      const userRaw = localStorage.getItem("quell_user");
      if (userRaw) {
        const u = JSON.parse(userRaw);
        u.plan = "hobby";
        localStorage.setItem("quell_user", JSON.stringify(u));
      }
      setInfo((prev) =>
        prev ? { ...prev, current_plan: "hobby", details: plans["hobby"] } : prev
      );
      showToast("Downgraded to Hobby plan.");
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Downgrade failed", false);
    } finally {
      setPaying(null);
    }
  }

  const currentPlan = info?.current_plan ?? "hobby";

  function planAction(planId: string): "current" | "upgrade" | "downgrade" | "contact" {
    if (planId === currentPlan) return "current";
    if (planId === "team") return "contact";
    const currentIdx = planOrder.indexOf(currentPlan as PlanId);
    const targetIdx = planOrder.indexOf(planId as PlanId);
    return targetIdx > currentIdx ? "upgrade" : "downgrade";
  }

  const planTone: Record<string, "default" | "blue" | "purple"> = {
    hobby: "default",
    pro: "blue",
    team: "purple",
  };

  return (
    <div className="animate-fade-in">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 border rounded-xl px-4 py-3 text-sm shadow-2xl animate-slide-up ${
            toast.ok
              ? "bg-[#0a0a0a] border-[#1f1f1f] text-white"
              : "bg-red-950/80 border-red-900/50 text-red-300"
          }`}
        >
          {toast.msg}
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white">Billing</h1>
        <p className="text-sm text-[#555] mt-0.5">Manage your subscription and plan</p>
      </div>

      {/* Current plan banner */}
      {!loading && info && (
        <Card className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-lg bg-[#111] border border-[#1a1a1a] flex items-center justify-center shrink-0">
                <CreditCard size={16} className="text-[#555]" />
              </div>
              <div>
                <p className="text-xs text-[#444] mb-1">Current plan</p>
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold capitalize">{currentPlan}</span>
                  <Badge tone={planTone[currentPlan] ?? "default"}>
                    {info.details.price === 0
                      ? "Free"
                      : `₹${info.details.price === 19 ? "1,599" : "6,599"}/mo`}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#444] text-xs mb-0.5">Monthly fixes</p>
              <p className="text-white font-medium text-sm">
                {info.details.fixes_per_month === -1
                  ? "Unlimited"
                  : info.details.fixes_per_month.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Plan cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {planOrder.map((planId) => {
          const plan = plans[planId];
          if (!plan && loading) {
            return (
              <div key={planId} className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl h-72 animate-pulse" />
            );
          }
          if (!plan) return null;

          const action = planAction(planId);
          const isPro = planId === "pro";
          const isPaying = paying === planId;

          return (
            <div
              key={planId}
              className={`relative bg-[#0a0a0a] border rounded-xl p-6 flex flex-col transition-all ${
                isPro
                  ? "border-[#0070f3]"
                  : action === "current"
                  ? "border-[#282828]"
                  : "border-[#1f1f1f] hover:border-[#2a2a2a]"
              }`}
              style={isPro ? { boxShadow: "0 0 0 1px rgba(0,112,243,0.2), 0 0 24px rgba(0,112,243,0.08)" } : undefined}
            >
              {isPro && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0070f3] text-white text-[11px] font-semibold px-3 py-0.5 rounded-full">
                  Most popular
                </div>
              )}
              {action === "current" && (
                <div className="absolute top-3 right-3">
                  <Badge tone={planTone[planId] ?? "default"}>Current</Badge>
                </div>
              )}

              <div className="mb-5">
                <h3 className="font-semibold text-white text-base mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  {plan.price === 0 ? (
                    <span className="text-3xl font-bold text-white">Free</span>
                  ) : (
                    <>
                      <span className="text-3xl font-bold text-white">
                        ₹{plan.price === 19 ? "1,599" : "6,599"}
                      </span>
                      <span className="text-[#555] text-sm">/ month</span>
                    </>
                  )}
                </div>
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={13} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-[#888]">{f}</span>
                  </li>
                ))}
              </ul>

              {action === "current" ? (
                <div className="py-2.5 text-center text-sm text-[#444] border border-[#1a1a1a] rounded-lg">
                  Current plan
                </div>
              ) : action === "contact" ? (
                <a
                  href="mailto:hello@quell.dev"
                  className="py-2.5 text-center text-sm border border-[#1f1f1f] text-[#666] rounded-lg hover:text-white hover:border-[#333] transition-colors block"
                >
                  Contact sales
                </a>
              ) : (
                <Button
                  variant={isPro ? "blue" : action === "upgrade" ? "outline" : "secondary"}
                  size="md"
                  fullWidth
                  loading={isPaying}
                  disabled={!!paying}
                  onClick={() => startRazorpay(planId)}
                >
                  {!isPaying && PAID_PLANS.has(planId) && action === "upgrade" && <Zap size={13} />}
                  {action === "upgrade"
                    ? `Upgrade${PAID_PLANS.has(planId) ? " with Razorpay" : ""}`
                    : "Downgrade"}
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {/* Payment info */}
      <Card>
        <p className="text-[#555] text-sm leading-relaxed">
          <span className="text-white font-medium">Payments via Razorpay</span>{" "}
          — Supports UPI, cards, net banking, and wallets. Prices are in INR.
          Subscriptions are managed manually for now; contact{" "}
          <a href="mailto:hello@quell.dev" className="text-[#0070f3] hover:underline">
            hello@quell.dev
          </a>{" "}
          to cancel or change your plan.
        </p>
      </Card>
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense>
      <BillingContent />
    </Suspense>
  );
}
