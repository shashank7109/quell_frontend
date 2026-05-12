"use client";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-T6MZDNY8R3";

export default function GoogleAnalytics() {
  return (
    <>
      {/* Consent Mode v2 + restore — afterInteractive so it doesn't block render.
          GA itself is afterInteractive too, so these run first (document order). */}
      <Script id="ga-consent-init" strategy="afterInteractive">
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
          try {
            var consent = localStorage.getItem('quell_cookie_consent');
            if (consent === 'granted') {
              gtag('consent', 'update', { analytics_storage: 'granted' });
            }
          } catch(e) {}
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
