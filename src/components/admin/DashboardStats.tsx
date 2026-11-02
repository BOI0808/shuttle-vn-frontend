import Link from "next/link";

import { cn, formatCurrency } from "@/utils";
import type { DashboardSummary } from "@/types";

interface DashboardStat {
  label: string;
  value: string;
  hint: string;
  color: string;
  href?: string;
}

export function DashboardStats({ summary }: { summary: DashboardSummary }) {
  const stats: DashboardStat[] = [
    {
      label: "Doanh thu hôm nay",
      value: formatCurrency(summary.revenue),
      hint: `${summary.paidInvoiceCount} hóa đơn đã thu`,
      color: "text-blue-600",
    },
    {
      label: "Đơn chờ duyệt",
      value: summary.pendingCount.toString(),
      hint: "Xem đơn chờ xác nhận",
      color: "text-amber-600",
      href: "/booking-requests",
    },
    {
      label: "Lượt sân đặt trong ngày",
      value: summary.bookingCount.toString(),
      hint: `${summary.completedCount} lượt hoàn thành`,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => {
        const content = (
          <>
            <p className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-slate-500">
              {stat.label}
            </p>
            <p
              className={cn(
                "font-mono text-2xl font-bold tracking-tight",
                stat.color,
              )}
            >
              {stat.value}
            </p>
            <p className="mt-1 font-mono text-[11px] text-slate-500">
              {stat.hint}
            </p>
          </>
        );
        const className =
          "block rounded-xl border border-slate-200 bg-white p-[18px] shadow-[0_1px_3px_rgba(0,0,0,0.04)]";
        return stat.href ? (
          <Link
            key={stat.label}
            href={stat.href}
            className={cn(className, "transition-colors hover:bg-slate-50")}
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
