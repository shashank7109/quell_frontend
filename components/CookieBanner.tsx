"use client";
import { useEffect, useState } from "react";

const CONSENT_KEY = "quell_cookie_consent";

export type ConsentState = "granted" | "denied" | null;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function setGtagConsent(state: "granted" | "denied") {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("consent", "update", {
    analytics_storage: state,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function getStoredConsent(): ConsentState {
  if (typeof window === "undefined") return null;
  return (localStorage.getItem(CONSENT_KEY) as ConsentState) ?? null;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      setVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      setGtagConsent(stored as "granted" | "denied");
    }
  }, []);

  function dismiss() {
    document.body.style.overflow = "";
    setVisible(false);
  }

  function accept() {
    localStorage.setItem(CONSENT_KEY, "granted");
    setGtagConsent("granted");
    dismiss();
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "denied");
    setGtagConsent("denied");
    dismiss();
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie consent"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-black/60"
    >
      <div className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-2xl p-7 max-w-sm w-full shadow-2xl">
        <div className="mb-1 text-xs font-semibold tracking-widest text-[#333] uppercase">
          Before you continue
        </div>
        <h2 className="text-[#e2e2e2] font-bold text-lg mb-3 leading-snug">
          We use analytics cookies
        </h2>
        <p className="text-[#666] text-sm leading-relaxed mb-6">
          We track page views and which docs sections are actually useful — nothing
          more. No ads, no third-party data brokers, no fingerprinting.{" "}
          <a
            href="/docs/privacy"
            className="text-[#444] underline underline-offset-2 hover:text-[#777] transition-colors"
          >
            Privacy policy
          </a>
        </p>
        <div className="flex flex-col gap-2.5">
          <button
            onClick={accept}
            className="w-full bg-white text-black font-medium py-2.5 rounded-lg text-sm hover:bg-neutral-100 transition-colors"
          >
            Accept analytics
          </button>
          <button
            onClick={decline}
            className="w-full text-[#444] py-2 text-sm hover:text-[#777] transition-colors"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}
