"use client";

import { useState } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useRevenueStats } from "@/hooks";
import type { RevenueGroupBy } from "@/types";
import { formatCurrency, formatDate } from "@/utils";

interface DashboardRevenueCardProps {
  summaryDate: string;
  todayRevenue: number;
}

export function DashboardRevenueCard({
  summaryDate,
  todayRevenue,
}: DashboardRevenueCardProps) {
  const [groupBy, setGroupBy] = useState<RevenueGroupBy>("Day");

  const { data: revenueReport } = useRevenueStats({
    fromDate: summaryDate,
    toDate: summaryDate,
    groupBy,
  });

  const periods = revenueReport?.periods ?? [
    {
      periodStart: summaryDate,
      invoiceCount: 0,
      revenue: todayRevenue,
    },
  ];

  const displayedRevenue = revenueReport?.totalRevenue ?? todayRevenue;
  const hasRevenue = displayedRevenue > 0 && periods.some((p) => p.revenue > 0);

  const chartData = periods.map((item) => ({
    name: format(parseISO(item.periodStart), groupBy === "Month" ? "MM/yyyy" : "dd/MM"),
    revenue: item.revenue,
  }));

  return (
    <section className="flex flex-col overflow-hidden rounded-[12px] border border-line bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div>
          <h2 className="font-display text-[18px] font-medium leading-[26px] text-ink">
            Doanh thu thực thu
          </h2>
          <p className="font-sans text-[12px] font-normal leading-[16px] text-ink-secondary">
            Chỉ tính hóa đơn đã thu tiền
          </p>
        </div>
        <Link
          href="/statistics"
          className="inline-flex items-center gap-1.5 font-sans text-[14px] font-semibold leading-[20px] text-brand-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-[4px]"
        >
          Xem báo cáo
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            arrow_forward
          </span>
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-3.5">
        <p className="font-display text-[18px] font-medium leading-[26px] text-ink tabular-nums">
          {formatCurrency(displayedRevenue)}
        </p>

        <div className="inline-flex h-[32px] items-center gap-3 rounded-[8px] border border-line bg-surface-bg px-3 font-sans text-[12px] text-ink-secondary">
          <span className="tabular-nums">{formatDate(summaryDate)}</span>
          <span aria-hidden="true" className="h-[20px] w-px bg-line" />
          <label htmlFor="dashboard-revenue-group" className="sr-only">
            Kiểu nhóm doanh thu
          </label>
          <select
            id="dashboard-revenue-group"
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value as RevenueGroupBy)}
            className="bg-transparent font-sans text-[12px] text-ink-secondary focus:outline-none cursor-pointer"
          >
            <option value="Day">Theo ngày</option>
            <option value="Month">Theo tháng</option>
          </select>
        </div>
      </div>

      <div className="relative px-5 pb-4 pt-2">
        <p className="mb-1 font-sans text-[12px] text-ink-secondary">VND</p>
        {hasRevenue ? (
          <div className="h-[110px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 6, right: 8, left: -12, bottom: 0 }}>
                <CartesianGrid stroke="#EDF2F6" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={{ stroke: "#DCE5ED" }}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#40556B", fontFamily: "var(--font-inter)" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#40556B", fontFamily: "var(--font-inter)" }}
                  tickFormatter={(val: number) =>
                    val >= 1000000 ? `${val / 1000000}M` : `${val / 1000}K`
                  }
                />
                <Tooltip
                  cursor={{ fill: "#FDF8F8" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #DCE5ED",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.08)",
                    fontSize: "12px",
                    fontFamily: "var(--font-inter)",
                  }}
                  formatter={(val: number) => [formatCurrency(val), "Doanh thu"]}
                />
                <Bar dataKey="revenue" fill="#087F5B" radius={[4, 4, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="relative flex h-[110px] flex-col justify-between pt-3">
            <div className="h-px w-full bg-surface-soft" />
            <div className="h-px w-full bg-surface-soft" />
            <div className="relative flex items-center">
              <span className="mr-3 font-sans text-[12px] text-ink-secondary tabular-nums">
                0
              </span>
              <div className="relative h-px flex-1 bg-line">
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 size-[8px] -translate-x-1/2 -translate-y-1/2 rounded-[4px] bg-brand"
                />
              </div>
            </div>
            <p className="text-center font-sans text-[12px] text-ink-secondary tabular-nums">
              {format(parseISO(summaryDate), "dd/MM")}
            </p>
            <p className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-sans text-[14px] text-ink-secondary">
              Chưa có doanh thu trong ngày
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

