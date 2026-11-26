import { SelectHTMLAttributes } from "react";
import { cn } from "@/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  containerClassName?: string;
}

export function Select({
  error,
  className,
  containerClassName,
  children,
  ...props
}: SelectProps) {
  return (
    <div className={cn("w-full", containerClassName)}>
      <select
        className={cn(
          "h-[44px] w-full rounded-[8px] border border-line-strong bg-white px-3.5 font-sans text-[14px] leading-[20px] text-ink",
          "outline-none transition-colors duration-150",
          "focus:border-brand focus:ring-2 focus:ring-brand/20",
          "disabled:cursor-not-allowed disabled:border-line disabled:bg-surface-soft disabled:text-ink-muted",
          error &&
            "border-status-danger focus:border-status-danger focus:ring-status-danger/20",
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="mt-1 font-sans text-[12px] leading-[16px] text-status-danger">
          {error}
        </p>
      )}
    </div>
  );
}

