import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

const variantClasses = {
  primary:
    "bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-[0_4px_14px_rgba(16,185,129,0.28)] disabled:bg-emerald-300",
  ghost: "bg-transparent text-gray-600 hover:bg-gray-100 disabled:opacity-50",
  outline:
    "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-3 text-[13px]",
  lg: "px-6 py-3.5 text-sm",
};

export function Button({
  loading = false,
  variant = "primary",
  size = "md",
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "w-full flex items-center justify-center gap-1.5 rounded-[7px] font-mono font-medium",
        "tracking-[0.05em] transition-[background,box-shadow] duration-150 cursor-pointer",
        "disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
