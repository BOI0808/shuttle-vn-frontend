"use client";

import { InputHTMLAttributes, ReactNode, useState } from "react";
import { cn } from "@/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  error?: string;
  containerClassName?: string;
}

export function Input({
  icon,
  error,
  className,
  containerClassName,
  type,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={cn("w-full", containerClassName)}>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 flex -translate-y-1/2 items-center text-ink-muted">
            {icon}
          </span>
        )}
        <input
          type={resolvedType}
          className={cn(
            "h-[44px] w-full rounded-[8px] border border-line-strong bg-white font-sans text-[14px] leading-[20px] text-ink",
            "pr-3.5 outline-none transition-colors duration-150",
            "placeholder:text-ink-muted",
            icon ? "pl-10" : "pl-3.5",
            isPassword && "pr-11",
            "focus:border-brand focus:ring-2 focus:ring-brand/20",
            "disabled:cursor-not-allowed disabled:border-line disabled:bg-surface-soft disabled:text-ink-muted",
            error &&
              "border-status-danger focus:border-status-danger focus:ring-status-danger/20",
            className
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2 top-1/2 flex size-[32px] -translate-y-1/2 items-center justify-center rounded-[6px] text-ink-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            tabIndex={-1}
            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 flex items-center gap-1 font-sans text-[12px] leading-[16px] text-status-danger">
          {error}
        </p>
      )}
    </div>
  );
}
