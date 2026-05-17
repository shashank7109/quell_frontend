import Link from "next/link";
import Image from "next/image";

const SOCIAL = [
  {
    label: "GitHub",
    href: "https://github.com/quelltest/quelltest-lib",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/quelltest",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "PyPI",
    href: "https://pypi.org/project/quelltest/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M11.535 0C8.28 0 8.47 1.408 8.47 1.408l.004 1.459h3.118v.438H5.264S3.27 3.077 3.27 6.363c0 3.285 1.816 3.168 1.816 3.168h1.085v-1.524s-.058-1.817 1.787-1.817h3.087s1.727.028 1.727-1.669V1.674S13.057 0 11.535 0zM9.703 1.012a.592.592 0 1 1 0 1.184.592.592 0 0 1 0-1.184z" />
        <path d="M12.465 24c3.255 0 3.065-1.408 3.065-1.408l-.004-1.459h-3.118v-.438h6.328s1.993.228 1.993-3.058c0-3.285-1.816-3.168-1.816-3.168h-1.085v1.524s.058 1.817-1.787 1.817h-3.087s-1.727-.028-1.727 1.669v2.815S10.943 24 12.465 24zm1.832-1.012a.592.592 0 1 1 0-1.184.592.592 0 0 1 0 1.184z" />
      </svg>
    ),
  },
];

const LINKS = [
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
  { label: "Changelog", href: "/changelog" },
  { label: "Quickstart", href: "/docs/quickstart" },
  { label: "How it works", href: "/docs/how-it-works" },
  { label: "CLI reference", href: "/docs/cli" },
  { label: "GitHub Action", href: "/docs/guides/github-actions" },
  { label: "Configuration", href: "/docs/configuration/pyproject" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#111] bg-black">
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 mb-10">

          {/* Brand + tagline */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 mb-3">
              <Image src="/quell_icon.png" alt="Quell" width={20} height={20} className="opacity-70" />
              <Image src="/quell_logo.png" alt="Quell" width={72} height={22} className="h-[22px] w-auto opacity-70" />
            </Link>
            <p className="text-[#444] text-sm leading-relaxed max-w-xs">
              Find untested edge cases in your Python code. Write verified tests. Track production readiness.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="text-[#333] hover:text-white transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-2.5">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-[#555] hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-[#0d0d0d] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#333]">
          <span>© 2026 Quelltest. MIT License.</span>
          <div className="flex items-center gap-5">
            <a href="https://pypi.org/project/quelltest/" target="_blank" rel="noreferrer" className="hover:text-[#555] transition-colors">
              pip install quelltest
            </a>
            <span>v2.0.0</span>
            <a href="https://github.com/quelltest/quelltest-lib" target="_blank" rel="noreferrer" className="hover:text-[#555] transition-colors">
              ★ Star on GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
