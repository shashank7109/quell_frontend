import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Quell",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
