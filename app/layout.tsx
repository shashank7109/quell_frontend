import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Crimson_Pro } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieBanner from "@/components/CookieBanner";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson",
  display: "swap",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const BASE_URL = "https://quell.buildsbyshashank.tech";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Quell — Find untested edge cases in your Python code",
    template: "%s | Quell",
  },
  description:
    "Quell finds untested edge cases in Python codebases — docstrings, Pydantic models, guard clauses. Three-bucket output: WRITTEN, SCAFFOLDED, FLAGGED. 5-gate pipeline. Production Readiness Score. No LLM key required.",
  keywords: [
    "quell",
    "quelltest",
    "python edge case testing",
    "python test generation",
    "pytest",
    "docstring testing",
    "edge case finder",
    "guard clause testing",
    "github actions python testing",
    "github pr review bot python",
    "untested code detector",
    "pyspark schema testing",
    "test automation python",
    "production readiness score",
    "pydantic testing",
    "python code quality",
    "automated testing",
    "python testing tool",
    "CI test generation",
    "five gate pipeline",
    "automated pr review python",
  ],
  authors: [{ name: "Shashank Bindal", url: "https://shashankbindal.me" }],
  creator: "Shashank Bindal",
  publisher: "Quelltest",
  category: "Developer Tools",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-US": `${BASE_URL}`,
      "en-IN": `${BASE_URL}`,
      "en-GB": `${BASE_URL}`,
      "x-default": `${BASE_URL}`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Quell",
    title: "Quell — Untested edge cases will bite you in production.",
    description:
      "Quell finds them first. Three-bucket output (WRITTEN/SCAFFOLDED/FLAGGED), 5-gate pipeline, Production Readiness Score. pip install quelltest",
    images: [
      {
        url: "/quell_logo.png",
        width: 1200,
        height: 630,
        alt: "Quelltest — Verified Test Generation for Python",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quell — Untested edge cases will bite you in production.",
    description:
      "Quell finds them first. Three-bucket output, 5-gate pipeline, Production Readiness Score. No LLM key needed.",
    images: ["/quell_logo.png"],
    creator: "@shashank7109",
    site: "@quelldotbuild",
  },
  icons: {
    icon: [
      { url: "/quell_icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/quell_icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/quell_icon.png",
  },
  manifest: "/manifest.json",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "NEFrOAkEZ_aACfCOjz3Roe4novytmcZ4vyU1JmJck74",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#000000" },
  ],
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Quell",
    alternateName: "quelltest",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Linux, macOS, Windows",
    url: BASE_URL,
    description:
      "Quell finds untested edge cases in Python codebases — docstrings, Pydantic models, guard clauses. Three-bucket output: WRITTEN, SCAFFOLDED, FLAGGED. 5-gate pipeline. Production Readiness Score. No LLM key required.",
    softwareVersion: "2.0.0",
    offers: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
        name: "Hobby",
        description: "500 requirements per month, rule-based generation, no LLM key needed",
      },
      {
        "@type": "Offer",
        price: "1599",
        priceCurrency: "INR",
        name: "Pro",
        description: "Unlimited requirements, LLM fallback with Claude & GPT-4, usage analytics",
      },
      {
        "@type": "Offer",
        price: "6599",
        priceCurrency: "INR",
        name: "Team",
        description: "Everything in Pro, 10 team seats, SSO/SAML, priority support",
      },
    ],
    author: {
      "@type": "Person",
      name: "Shashank Bindal",
      url: "https://shashankbindal.me",
    },
    downloadUrl: "https://pypi.org/project/quelltest/",
    installUrl: "https://pypi.org/project/quelltest/",
    featureList: [
      "quell find — scans docstrings, Pydantic models, PySpark schemas, guard clauses for untested edge cases",
      "Three-bucket output: WRITTEN (passed all 5 gates), SCAFFOLDED (stub written), FLAGGED (reason given)",
      "5-gate pipeline: AST validity, originality, security, passes on correct code, fails on violated code",
      "Production Readiness Score (PRS) — 0-100 score with tier emojis (🟢/🟡/🔴)",
      "Deterministic rule engine — no LLM, no network, no API key (~75% of edge cases)",
      "LLM fallback (opt-in) — only called for complex cases the rule engine cannot handle",
      "libcst-based test injection preserves your comments, formatting, and blank lines",
      "SCAFFOLDED stubs written to tests/scaffold/ with # TODO comments",
      "quell score — Production Readiness Score per file and project",
      "quell ci — CI gate, exits non-zero if PRS below threshold",
      "quell install --action — writes GitHub Actions workflow in one command",
      "GitHub Action — per-repo PR review, PRS comment, inline annotations",
      "GitHub App — org-wide PR review, no per-repo YAML, no repo clone",
      "quell auth — secure key storage via OS keyring",
      "Privacy-safe diagnostic report (quell-report.json) — no source code",
      "quell reproduce — turn bug descriptions into failing tests (requires LLM auth)",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Quelltest",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/docs?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Quell",
    url: BASE_URL,
    logo: `${BASE_URL}/quell_logo.png`,
    sameAs: [
      "https://github.com/quelltest/quelltest-lib",
      "https://pypi.org/project/quelltest/",
      "https://www.linkedin.com/company/quelltest",
    ],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrainsMono.variable} ${crimsonPro.variable}`}
    >
      <head>
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="bg-background text-white antialiased font-sans">
        <GoogleAnalytics />
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
