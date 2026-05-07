import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "blue" | "secondary" | "outline" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-white text-black hover:bg-neutral-100 border border-transparent",
  blue:
    "bg-[#0070f3] text-white hover:bg-[#0060df] border border-transparent",
  secondary:
    "bg-[#111] text-white hover:bg-[#1a1a1a] border border-[#2a2a2a]",
  outline:
    "bg-transparent text-[#888] hover:text-white border border-[#2a2a2a] hover:border-[#444]",
  ghost:
    "bg-transparent text-[#888] hover:text-white border border-transparent",
  destructive:
    "bg-red-600 text-white hover:bg-red-700 border border-transparent",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-xs rounded-lg",
  md: "h-9 px-4 text-sm rounded-lg",
  lg: "h-11 px-5 text-sm rounded-xl",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={[
          "inline-flex items-center justify-center gap-2 font-medium",
          "transition-colors duration-150 cursor-pointer select-none",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth ? "w-full" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {loading && (
          <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
