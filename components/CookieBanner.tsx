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
      // Small delay so the banner slides in after the page paint —
      // page content is fully rendered and crawlable before this runs.
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    } else {
      setGtagConsent(stored as "granted" | "denied");
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "granted");
    setGtagConsent("granted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "denied");
    setGtagConsent("denied");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    // Bottom-left floating card — does NOT cover page content, does NOT lock scroll.
    // Googlebot sees the full page before this mounts (SSR + delayed client paint).
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 z-50 max-w-[320px] w-[calc(100vw-2rem)]
                 bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-5 shadow-2xl
                 animate-slide-up"
    >
      <p className="text-[#e2e2e2] text-sm font-semibold mb-1">Analytics cookies</p>
      <p className="text-[#555] text-xs leading-relaxed mb-4">
        We use cookies to track page views — no ads, no third-party brokers.{" "}
        <a
          href="/docs/privacy"
          className="text-[#444] underline underline-offset-2 hover:text-[#777] transition-colors"
        >
          Privacy policy
        </a>
      </p>
      <div className="flex gap-2">
        <button
          onClick={accept}
          className="flex-1 bg-white text-black font-medium py-2 rounded-lg text-xs
                     hover:bg-neutral-100 transition-colors"
        >
          Accept
        </button>
        <button
          onClick={decline}
          className="flex-1 border border-[#1e1e1e] text-[#444] py-2 rounded-lg text-xs
                     hover:text-[#777] hover:border-[#2a2a2a] transition-colors"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
