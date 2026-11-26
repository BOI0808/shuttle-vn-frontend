import { LabelHTMLAttributes } from "react";
import { cn } from "@/utils";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({ className, children, required, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "mb-1.5 block font-sans text-[12px] font-semibold leading-[16px] text-ink-secondary",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-status-danger">*</span>}
    </label>
  );
}
