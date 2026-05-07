import Logo from "./Logo";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  badge,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Subtle top gradient */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-[#111]">
        <Logo size="md" />
        <a
          href="https://github.com/shashank7109/quell"
          target="_blank"
          rel="noreferrer"
          className="text-xs text-[#555] hover:text-[#888] transition-colors"
        >
          Documentation →
        </a>
      </header>

      {/* Center content */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-[400px]">
          {/* Header */}
          <div className="mb-8">
            {badge && (
              <span className="inline-block text-xs bg-[#111] border border-[#222] text-[#666] rounded-full px-3 py-1 mb-4">
                {badge}
              </span>
            )}
            <h1 className="text-2xl font-semibold text-white tracking-tight mb-1.5">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-[#555]">{subtitle}</p>
            )}
          </div>

          {/* Form card */}
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-7 shadow-xl shadow-black/40">
            {children}
          </div>

          {/* Footer links */}
          {footer && (
            <div className="mt-6 text-center text-sm text-[#555]">{footer}</div>
          )}
        </div>
      </main>
    </div>
  );
}
