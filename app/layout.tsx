import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Quell — Kill Surviving Mutants",
  description:
    "Auto-generate verified killing tests for survived mutants from mutmut and Stryker.",
  icons: {
    icon: [{ url: "/quell_icon.png", type: "image/png" }],
    apple: "/quell_icon.png",
    shortcut: "/quell_icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-white antialiased font-sans">{children}</body>
    </html>
  );
}
