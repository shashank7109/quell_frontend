import { InputHTMLAttributes, forwardRef, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = "", id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[#ccc] select-none"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            "h-9 w-full rounded-lg px-3 text-sm",
            "bg-[#0a0a0a] border text-white placeholder-[#444]",
            "outline-none transition-colors duration-150",
            error
              ? "border-red-500/70 focus:border-red-500"
              : "border-[#2a2a2a] focus:border-[#444] hover:border-[#333]",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-400 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-xs text-[#555]">{hint}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
