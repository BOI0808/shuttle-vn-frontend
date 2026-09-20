import { formatCurrency } from "@/utils";
import type { DashboardSummary } from "@/types";

export function DashboardStats({ summary }: { summary: DashboardSummary }) {
  const stats = [
    {
      label: "Doanh thu hôm nay",
      value: formatCurrency(summary.todayRevenue),
      color: "text-blue-600",
      trend: summary.revenueTrend || "--",
      icon: "trending_up",
    },
    {
      label: "Đặt sân hôm nay",
      value: summary.todayBookings.toString(),
      color: "text-purple-600",
      trend: summary.bookingsTrend || "--",
      icon: "trending_up",
    },
    {
      label: "Chờ xác nhận",
      value: summary.pendingBookings.toString(),
      color: "text-amber-600",
      trend: "Cần xử lý",
      icon: "warning",
    },
    {
      label: "Tỷ lệ lấp đầy",
      value: `${summary.occupancyRateToday}%`,
      color: "text-emerald-600",
      trend: summary.occupancyTrend || "--",
      icon: "trending_up",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((s, i) => (
        <div key={i} className="bg-white border border-slate-200 rounded-xl p-[18px] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <p className="text-[11px] text-slate-500 uppercase tracking-wider font-mono mb-1.5">{s.label}</p>
          <p className={`text-2xl font-bold font-mono tracking-tight ${s.color}`}>{s.value}</p>
          <div className="flex items-center gap-1 mt-1 text-[11px] font-mono text-emerald-600">
            <span className="material-symbols-outlined text-[13px]">{s.icon}</span>
            {s.trend}
          </div>
        </div>
      ))}
    </div>
  );
}
