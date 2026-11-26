import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  icon?: string;
  children: ReactNode;
}

const variantClasses = {
  primary:
    "bg-brand-strong text-white hover:bg-[#05523A] active:bg-[#04402D] disabled:bg-surface-soft disabled:text-ink-muted",
  ghost:
    "bg-transparent text-ink-secondary hover:bg-surface-soft hover:text-ink disabled:opacity-50",
  outline:
    "bg-white border border-line-strong text-ink-secondary hover:bg-surface-bg hover:text-ink hover:border-ink-muted active:bg-surface-soft disabled:border-line disabled:text-ink-muted",
  danger:
    "bg-status-danger text-white hover:bg-[#991B28] disabled:opacity-50",
};

const sizeClasses = {
  sm: "h-[36px] px-3 py-1.5 text-[13px] rounded-[6px]",
  md: "h-[44px] px-4 py-3 text-[14px] leading-[20px] rounded-[8px]",
  lg: "h-[48px] px-6 py-3.5 text-[15px] rounded-[8px]",
};

export function Button({
  loading = false,
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "items-center justify-center gap-2 font-sans font-semibold",
        "transition-all duration-150 ease-out active:scale-[0.98] cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:active:scale-100",
        fullWidth ? "flex w-full" : "inline-flex",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current/30 border-t-current"
        />
      )}
      {!loading && icon && (
        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </button>
  );
}
