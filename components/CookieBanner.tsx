"use client";
import { useEffect, useState } from "react";

const CONSENT_KEY = "quell_cookie_consent";

export type ConsentState = "granted" | "denied" | null;

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
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#1a1a1a] bg-black/95 backdrop-blur-md px-6 py-4"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-[13px] text-[#888] leading-relaxed">
            We use cookies to understand how visitors use Quell — page views, session length, and
            which docs pages are most helpful.{" "}
            <a
              href="/docs/privacy"
              className="text-[#555] underline underline-offset-2 hover:text-white transition-colors"
            >
              Privacy policy
            </a>
            . No ad tracking, ever.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="text-xs text-[#444] hover:text-[#888] transition-colors px-3 py-1.5"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-xs bg-white text-black font-medium px-4 py-1.5 rounded-md hover:bg-neutral-200 transition-colors"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
