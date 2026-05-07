import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
}

const sizes = {
  sm: { w: 64,  h: 22,  cls: "h-[22px]" },
  md: { w: 80,  h: 28,  cls: "h-7" },
  lg: { w: 96,  h: 32,  cls: "h-8" },
};

export default function Logo({ size = "md", href = "/" }: LogoProps) {
  const { w, h, cls } = sizes[size];
  const img = (
    <Image
      src="/quell_logo.png"
      alt="Quell"
      width={w}
      height={h}
      className={`${cls} w-auto`}
      priority
    />
  );
  return href ? <Link href={href}>{img}</Link> : img;
}
