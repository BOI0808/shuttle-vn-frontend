import { HTMLAttributes } from "react";
import { cn } from "@/utils";

type BadgeStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled"
  | "Active"
  | "Disabled"
  | "PendingActivation"
  | "Maintenance"
  | "Closed"
  | "IN_USE"
  | "Unpaid"
  | "Paid"
  | "Refunded"
  | "NoInvoice";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: BadgeStatus;
}

const STATUS_CLASSES: Record<BadgeStatus, string> = {
  Pending: "bg-status-warning-soft text-status-warning",
  Confirmed: "bg-status-info-soft text-status-info",
  Completed: "bg-status-success-soft text-status-success",
  Cancelled: "bg-status-danger-soft text-status-danger",
  Active: "bg-status-success-soft text-status-success",
  Disabled: "bg-status-danger-soft text-status-danger",
  PendingActivation: "bg-status-warning-soft text-status-warning",
  Maintenance: "bg-status-warning-soft text-status-warning",
  Closed: "bg-status-danger-soft text-status-danger",
  IN_USE: "bg-status-info-soft text-status-info",
  Unpaid: "bg-status-warning-soft text-status-warning",
  Paid: "bg-status-success-soft text-status-success",
  Refunded: "bg-surface-soft text-ink-secondary",
  NoInvoice: "bg-surface-soft text-ink-secondary",
};

export function Badge({ status, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-[24px] items-center rounded-full px-[10px] py-[4px] font-sans text-[12px] font-normal leading-[16px] whitespace-nowrap",
        STATUS_CLASSES[status],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
