"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services";
import { QUERY_KEYS } from "@/config/app";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/utils";
import {BookingStatus} from "@/types";

const STATUS_LABELS: Record<BookingStatus, string> = {
  PENDING: "Chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  COMPLETED: "Hoàn thành",
  CANCELLED: "Đã huỷ",
};

export default function DashboardClient() {
  const { data: summary, isLoading } = useQuery({
    queryKey: QUERY_KEYS.dashboard,
    queryFn: () => dashboardService.getSummary(),
  });

  if (isLoading || !summary) return <div className="p-8 text-center text-slate-500 font-mono">Đang tải...</div>;

  return (
    <div className="flex flex-col gap-6">
      <DashboardStats summary={summary} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={summary.revenueChart} />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-sm font-bold text-slate-900">Chờ xác nhận</h3>
            <Badge status="PENDING">{summary.pendingBookings}</Badge>
          </div>
          <div className="divide-y divide-slate-100">
            {summary.pendingBookingsList.map((booking) => (
              <div key={booking.bookingId} className="px-5 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-[13px] font-semibold text-slate-900">{booking.customerName}</p>
                  <Badge status="PENDING">Chờ</Badge>
                </div>
                <p className="text-[11px] text-slate-500 font-mono">
                  {booking.courtName} · {booking.startTime} – {booking.endTime} · Hôm nay
                </p>
              </div>
            ))}
            {summary.pendingBookingsList.length === 0 && (
              <div className="px-5 py-8 text-center text-[12px] text-slate-400 font-mono">
                Không có đơn chờ
              </div>
            )}
          </div>
          <button className="w-full py-3 text-[11px] font-mono font-bold text-blue-600 hover:bg-blue-50 transition-colors border-t border-slate-100">
            Xem tất cả →
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-900">Đặt sân gần đây</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                <th className="px-5 py-3 border-b border-slate-100 font-semibold">Mã đơn</th>
                <th className="px-5 py-3 border-b border-slate-100 font-semibold">Khách hàng</th>
                <th className="px-5 py-3 border-b border-slate-100 font-semibold">Sân</th>
                <th className="px-5 py-3 border-b border-slate-100 font-semibold">Thời gian</th>
                <th className="px-5 py-3 border-b border-slate-100 font-semibold">Trạng thái</th>
                <th className="px-5 py-3 border-b border-slate-100 font-semibold text-right">Tổng tiền</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {summary.recentBookings.map((booking) => (
                <tr key={booking.bookingId} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-[12px] font-mono font-bold text-blue-600">{booking.bookingCode}</td>
                  <td className="px-5 py-4 text-[13px] font-medium text-slate-900">{booking.customerName}</td>
                  <td className="px-5 py-4 text-[13px] text-slate-600">{booking.courtName}</td>
                  <td className="px-5 py-4 text-[11px] font-mono text-slate-500">
                    {new Date(booking.date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })} · {booking.startTime}
                  </td>
                  <td className="px-5 py-4">
                    <Badge status={booking.status}>
                      {STATUS_LABELS[booking.status]}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-[12px] font-mono font-bold text-slate-900 text-right">{formatCurrency(booking.totalCost)}</td>
                </tr>
              ))}
              {summary.recentBookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-slate-500 font-mono">Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
