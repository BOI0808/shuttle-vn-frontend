"use client";

import { format, parseISO } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "@/utils";
import type { RevenueChartPoint, RevenueGroupBy } from "@/types";

interface RevenueChartProps {
  data: RevenueChartPoint[];
  title: string;
  description?: string;
  groupBy: RevenueGroupBy;
  emptyMessage?: string;
}

function formatAxisLabel(date: string, groupBy: RevenueGroupBy): string {
  return format(parseISO(date), groupBy === "Month" ? "MM/yyyy" : "dd/MM");
}

export function RevenueChart({
  data,
  title,
  description = "Chỉ hóa đơn Paid, theo thời điểm thu tiền.",
  groupBy,
  emptyMessage = "Không có doanh thu trong khoảng đã chọn",
}: RevenueChartProps) {
  const chartData = data.map((item) => ({
    name: formatAxisLabel(item.date, groupBy),
    revenue: item.revenue,
  }));

  const hasRevenue = chartData.some((item) => item.revenue > 0);

  return (
    <div className="flex flex-col rounded-[12px] border border-line bg-white p-5">
      <div className="mb-4">
        <h3 className="font-display text-[18px] font-medium leading-[26px] text-ink">
          {title}
        </h3>
        <p className="font-sans text-[12px] leading-[16px] text-ink-secondary">
          {description}
        </p>
      </div>

      <p className="mb-1 font-sans text-[12px] text-ink-secondary">VND</p>

      {hasRevenue ? (
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDF2F6" />
              <XAxis
                dataKey="name"
                axisLine={{ stroke: "#DCE5ED" }}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#40556B", fontFamily: "var(--font-inter)" }}
                dy={8}
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
        <div className="relative flex h-[150px] flex-col justify-end pb-2">
          <div className="flex items-center">
            <span className="mr-3 font-sans text-[12px] text-ink-secondary tabular-nums">
              0
            </span>
            <div className="h-px flex-1 bg-line" />
          </div>
          {chartData[0] && (
            <p className="mt-3 text-center font-sans text-[12px] text-ink-secondary tabular-nums">
              {chartData[0].name}
            </p>
          )}
          <p className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-sans text-[14px] text-ink-secondary">
            {emptyMessage}
          </p>
        </div>
      )}
    </div>
  );
}
