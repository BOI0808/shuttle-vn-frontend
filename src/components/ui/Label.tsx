import { LabelHTMLAttributes } from "react";
import { cn } from "@/utils";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({ className, children, required, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "block text-[11px] font-semibold uppercase tracking-[0.06em] text-gray-500 mb-1.5",
        "font-mono", // JetBrains Mono via tailwind.config
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}
