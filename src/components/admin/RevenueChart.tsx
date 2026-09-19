"use client";

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
import type { RevenueStats } from "@/types";

export function RevenueChart({ data }: { data: RevenueStats[] }) {
  const chartData = data.map((item) => ({
    name: new Date(item.date).toLocaleDateString("vi-VN", { weekday: "short" }),
    revenue: item.revenue,
  }));

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] h-[350px]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-[15px] font-bold text-slate-900">Doanh thu 7 ngày gần nhất</h3>
          <p className="text-xs text-slate-500">Dựa trên các hoá đơn đã thanh toán</p>
        </div>
      </div>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#64748b", fontFamily: "var(--font-jetbrains-mono)" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#64748b", fontFamily: "var(--font-jetbrains-mono)" }}
              tickFormatter={(val) => `${val / 1000000}M`}
            />
            <Tooltip
              cursor={{ fill: "#f8fafc" }}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                fontSize: "12px",
              }}
              formatter={(val: number) => [formatCurrency(val), "Doanh thu"]}
            />
            <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
