"use client";

import { InputHTMLAttributes, ReactNode, useState } from "react";
import { cn } from "@/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  error?: string;
}

export function Input({ icon, error, className, type, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full">
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center">
            {icon}
          </span>
        )}
        <input
          type={resolvedType}
          className={cn(
            "w-full bg-gray-50 border border-gray-300 rounded-[7px] text-[#1a1a2e] text-sm",
            "py-[11px] pr-3 outline-none transition-[border-color,box-shadow] duration-150",
            "placeholder:text-gray-400 font-sans",
            icon ? "pl-10" : "pl-3",
            isPassword && "pr-10",
            "focus:border-emerald-500 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.12)] focus:bg-white",
            error &&
              "border-red-400 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]",
            className
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 flex"
            tabIndex={-1}
            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          >
            <span className="material-symbols-outlined text-[18px]">
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
