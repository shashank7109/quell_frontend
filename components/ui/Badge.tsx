import { HTMLAttributes } from "react";

type Tone = "default" | "success" | "warning" | "error" | "blue" | "purple";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  dot?: boolean;
}

const toneClasses: Record<Tone, string> = {
  default: "bg-[#1a1a1a] text-[#888] border-[#2a2a2a]",
  success: "bg-green-950/40 text-green-400 border-green-900/40",
  warning: "bg-yellow-950/40 text-yellow-400 border-yellow-900/40",
  error:   "bg-red-950/40 text-red-400 border-red-900/40",
  blue:    "bg-blue-950/40 text-blue-400 border-blue-900/40",
  purple:  "bg-purple-950/40 text-purple-400 border-purple-900/40",
};

const dotColors: Record<Tone, string> = {
  default: "bg-[#555]",
  success: "bg-green-400",
  warning: "bg-yellow-400",
  error:   "bg-red-400",
  blue:    "bg-blue-400",
  purple:  "bg-purple-400",
};

export default function Badge({
  tone = "default",
  dot = false,
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 text-xs font-medium",
        "border rounded-full px-2.5 py-0.5",
        toneClasses[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[tone]}`} />
      )}
      {children}
    </span>
  );
}
