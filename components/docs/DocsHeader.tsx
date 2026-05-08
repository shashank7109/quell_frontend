import Link from "next/link";
import Image from "next/image";

export default function DocsHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[57px] border-b border-[#111] bg-black/95 backdrop-blur-md flex items-center px-6">
      <div className="flex items-center gap-6 w-full max-w-[1400px] mx-auto">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image src="/quell_logo.png" alt="Quell" width={72} height={24} className="h-6 w-auto" />
          <span className="text-[#333] text-sm font-medium border-l border-[#222] pl-3">Docs</span>
        </Link>

        <div className="flex-1" />

        <nav className="hidden md:flex items-center gap-5 text-sm text-[#555]">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <a href="https://pypi.org/project/quelltest/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">PyPI</a>
          <a href="https://github.com/shashank7109/quell" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <Link href="/auth/sign-up" className="bg-[#0070f3] text-white text-xs font-medium px-3.5 py-1.5 rounded-md hover:bg-[#0060df] transition-colors">
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
}
