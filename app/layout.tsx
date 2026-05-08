import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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

const BASE_URL = "https://quell.buildsbyshashank.tech";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Quell — Kill Surviving Mutants",
    template: "%s | Quell",
  },
  description:
    "Quell auto-generates verified killing tests for survived mutants from mutmut and Stryker. Rule-based first, LLM as last resort. Zero false positives.",
  keywords: [
    "mutation testing",
    "mutmut",
    "stryker",
    "pytest",
    "test generation",
    "survived mutants",
    "killing tests",
    "quell",
    "quelltest",
    "python testing",
    "mutation score",
    "code quality",
  ],
  authors: [{ name: "Shashank Bindal", url: BASE_URL }],
  creator: "Shashank Bindal",
  publisher: "Quell",
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
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Quell",
    title: "Quell — Kill Surviving Mutants",
    description:
      "Auto-generate verified killing tests for survived mutants from mutmut and Stryker. Rule-based first, LLM as last resort.",
    images: [
      {
        url: "/quell_logo.png",
        width: 1200,
        height: 630,
        alt: "Quell — Kill Surviving Mutants",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quell — Kill Surviving Mutants",
    description:
      "Auto-generate verified killing tests for survived mutants from mutmut and Stryker.",
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
    // Add Google Search Console and Bing verification tokens here when available
    // google: "your-google-verification-token",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Quell",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Linux, macOS, Windows",
  url: BASE_URL,
  description:
    "Auto-generate verified killing tests for survived mutants from mutmut and Stryker. Rule-based first, LLM as last resort. Zero false positives.",
  softwareVersion: "0.3.0",
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      name: "Hobby",
      description: "250 mutations per month, free forever",
    },
    {
      "@type": "Offer",
      price: "1599",
      priceCurrency: "INR",
      name: "Pro",
      description: "10,000 mutations per month with LLM fallback",
    },
  ],
  author: {
    "@type": "Person",
    name: "Shashank Bindal",
  },
  downloadUrl: "https://pypi.org/project/quelltest/",
  installUrl: "https://pypi.org/project/quelltest/",
  featureList: [
    "Mutmut and Stryker adapter",
    "Rule-based test generation — 9 mutation operators",
    "LLM fallback for unknown operators",
    "Verified tests that actually kill the mutant",
    "libcst-based injection preserves formatting",
    "CI integration with diff-only mode",
    "GitHub PR comment integration",
    "MCP server for AI agents",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-white antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
