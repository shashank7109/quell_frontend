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
    default: "Quelltest — Verified Test Generation for Python",
    template: "%s | Quelltest",
  },
  description:
    "Quelltest scans Python code for untested guard clauses, generates verified pytest tests from if/raise patterns, docstrings, and Pydantic models. GitHub Action and GitHub App for automatic PR review. No LLM key required.",
  keywords: [
    "quelltest",
    "python test generation",
    "pytest",
    "docstring testing",
    "spec-first testing",
    "requirement coverage",
    "guard clause testing",
    "github actions python testing",
    "github pr review bot python",
    "untested code detector",
    "pyspark schema testing",
    "test automation python",
    "verified test generation",
    "pydantic testing",
    "python code quality",
    "automated testing",
    "quell",
    "quelltest formerly quell",
    "python testing tool",
    "CI test generation",
    "if raise testing python",
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
    siteName: "Quelltest",
    title: "Quelltest — Verified Test Generation for Python",
    description:
      "Reads docstrings, Pydantic models, and PySpark schemas. Generates pytest tests that prove requirements — not just achieve coverage. No LLM key required.",
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
    title: "Quelltest — Verified Test Generation for Python",
    description:
      "Reads your docstrings and Pydantic models. Generates and verifies pytest tests for every requirement. No LLM key needed.",
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
    name: "Quelltest",
    alternateName: "Quell",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Linux, macOS, Windows",
    url: BASE_URL,
    description:
      "Quelltest scans Python code for untested guard clauses (if/raise patterns, try/except/raise, assert), generates verified pytest tests, and reviews every pull request automatically via GitHub Action or GitHub App. No LLM key required. Formerly known as Quell.",
    softwareVersion: "0.9.8",
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
      "Reads requirements from Python docstrings (Raises:, Returns:, Args:)",
      "Reads requirements from Pydantic models (Field validators, Literal types)",
      "Reads requirements from PySpark StructType schemas",
      "AST-based coverage checker — no test execution at scan time",
      "Deterministic rule engine — no LLM, no network, no API key",
      "Two-phase verification: PASS on original code + FAIL on violated code",
      "libcst-based test injection preserves formatting",
      "quell scan — reads if/raise, try/except/raise, assert patterns from any Python file",
      "quell scan --format github — emits inline GitHub Actions diff annotations",
      "GitHub Action (uses: shashank7109/quelltest_lib@main) — per-repo PR review, zero config",
      "GitHub App — org-wide PR review, no per-repo YAML, no repo clone",
      "quell pr — posts requirement coverage report as PR comment",
      "OAuth 2.0 PKCE authentication",
      "Privacy-safe diagnostic report (quell-report.json)",
      "Async function detection and skipping",
      "FastAPI endpoint scanning",
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
    name: "Quelltest",
    url: BASE_URL,
    logo: `${BASE_URL}/quell_logo.png`,
    sameAs: [
      "https://github.com/shashank7109/quelltest_lib",
      "https://pypi.org/project/quelltest/",
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
