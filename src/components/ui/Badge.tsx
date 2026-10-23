import { HTMLAttributes } from "react";
import { cn } from "@/utils";

type BadgeStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled"
  | "Active"
  | "Disabled"
  | "Maintenance"
  | "Closed"
  | "IN_USE"
  | "Unpaid"
  | "Paid";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: BadgeStatus;
}

const STATUS_CLASSES: Record<BadgeStatus, string> = {
  Pending: "bg-amber-50 text-amber-600 border-amber-200",
  Confirmed: "bg-blue-50 text-blue-600 border-blue-200",
  Completed: "bg-green-50 text-green-600 border-green-200",
  Cancelled: "bg-red-50 text-red-600 border-red-200",
  Active: "bg-green-50 text-green-600 border-green-200",
  Disabled: "bg-red-50 text-red-600 border-red-200",
  Maintenance: "bg-amber-50 text-amber-600 border-amber-200",
  Closed: "bg-red-50 text-red-600 border-red-200",
  IN_USE: "bg-blue-50 text-blue-600 border-blue-200",
  Unpaid: "bg-amber-50 text-amber-600 border-amber-200",
  Paid: "bg-green-50 text-green-600 border-green-200",
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
