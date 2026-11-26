import Link from "next/link";

import { cn, formatCurrency } from "@/utils";
import type { DashboardSummary } from "@/types";

interface DashboardStat {
  label: string;
  value: string;
  hint: string;
  cardBg: string;
  valueColor: string;
  href?: string;
}

export function DashboardStats({ summary }: { summary: DashboardSummary }) {
  const stats: DashboardStat[] = [
    {
      label: "Doanh thu hôm nay",
      value: formatCurrency(summary.revenue),
      hint: `${summary.paidInvoiceCount} hóa đơn đã thu`,
      cardBg: "bg-brand-soft",
      valueColor: "text-brand-strong",
    },
    {
      label: "Đơn chờ duyệt",
      value: summary.pendingCount.toString(),
      hint:
        summary.pendingCount === 0
          ? "Không có đơn chờ xác nhận"
          : `${summary.pendingCount} đơn chờ xác nhận`,
      cardBg: "bg-status-warning-soft",
      valueColor: "text-status-warning",
      href: "/booking-requests",
    },
    {
      label: "Lượt sân đặt trong ngày",
      value: summary.bookingCount.toString(),
      hint: `${summary.completedCount} lượt hoàn thành`,
      cardBg: "bg-status-info-soft",
      valueColor: "text-status-info",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((stat) => {
        const content = (
          <>
            <p className="font-sans text-[14px] font-normal leading-[20px] text-ink-secondary">
              {stat.label}
            </p>
            <p
              className={cn(
                "font-sans text-[32px] font-semibold leading-[40px] tracking-normal tabular-nums",
                stat.valueColor
              )}
            >
              {stat.value}
            </p>
            <p className="font-sans text-[12px] font-normal leading-[16px] text-ink-secondary">
              {stat.hint}
            </p>
          </>
        );
        const className = cn(
          "flex min-h-[128px] flex-col justify-between rounded-[12px] border border-line p-[19px]",
          stat.cardBg
        );
        return stat.href ? (
          <Link
            key={stat.label}
            href={stat.href}
            className={cn(
              className,
              "transition-all duration-150 ease-out hover:border-line-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            )}
          >
            {content}
          </Link>
        ) : (
          <div key={stat.label} className={className}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
