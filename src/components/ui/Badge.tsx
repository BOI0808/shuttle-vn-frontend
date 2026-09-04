import { HTMLAttributes } from "react";
import { cn } from "@/utils";

type BadgeStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: BadgeStatus;
}

const STATUS_CLASSES: Record<BadgeStatus, string> = {
  PENDING: "bg-amber-50 text-amber-600 border-amber-200",
  CONFIRMED: "bg-blue-50 text-blue-600 border-blue-200",
  COMPLETED: "bg-green-50 text-green-600 border-green-200",
  CANCELLED: "bg-red-50 text-red-600 border-red-200",
};

export function Badge({ status, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-[3px] rounded-full text-[11px] font-mono font-semibold tracking-[0.03em] border whitespace-nowrap",
        STATUS_CLASSES[status],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
