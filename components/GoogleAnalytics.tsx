"use client";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-T6MZDNY8R3";

export default function GoogleAnalytics() {
  return (
    <>
      {/* Google Consent Mode v2 — default denied until user accepts */}
      <Script id="ga-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500,
          });
          gtag('js', new Date());
        `}
      </Script>

      {/* Restore consent from localStorage before GA4 fires */}
      <Script id="ga-consent-restore" strategy="beforeInteractive">
        {`
          (function() {
            try {
              var consent = localStorage.getItem('quell_cookie_consent');
              if (consent === 'granted') {
                gtag('consent', 'update', { analytics_storage: 'granted' });
              }
            } catch(e) {}
          })();
        `}
      </Script>

      <Script
        src={"https://www.googletagmanager.com/gtag/js?id=" + GA_ID}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
          });
        `}
      </Script>
    </>
  );
}
