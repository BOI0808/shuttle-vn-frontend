"use client";

import { useState } from "react";
import Link from "next/link";

import { CourtUsageTable } from "@/components/admin/CourtUsageTable";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { BookingDetailModal } from "@/components/booking/BookingDetailModal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

import { useDashboardSummary } from "@/hooks";

import { BOOKING_STATUS_LABEL } from "@/config/app";
import { formatCurrency, formatDate, getErrorMessage } from "@/utils";

function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="h-[104px] animate-pulse rounded-xl bg-slate-200/60"
          />
        ))}
      </div>
      <div className="h-[220px] animate-pulse rounded-xl bg-slate-200/60" />
      <div className="h-[220px] animate-pulse rounded-xl bg-slate-200/60" />
    </div>
  );
}

export default function DashboardClient() {
  const { data: summary, isLoading, isError, error, refetch } =
    useDashboardSummary();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (isLoading) return <DashboardSkeleton />;

  if (isError || !summary) {
    return (
      <div
        role="alert"
        className="flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
      >
        <span>{getErrorMessage(error)}</span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-auto"
          onClick={() => refetch()}
        >
          Thử lại
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="font-mono text-[12px] text-slate-500">
        Số liệu ngày {formatDate(summary.date)}
      </p>

      <DashboardStats summary={summary} />

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-[15px] font-bold text-slate-900">
          Tình trạng sử dụng sân hôm nay
        </h2>
        <CourtUsageTable
          labelHeader="Sân"
          rows={summary.courts.map((court) => ({
            key: String(court.courtId),
            label: court.courtName,
            bookingCount: court.bookingCount,
            bookedHours: court.bookedHours,
            completedCount: court.completedCount,
            completedHours: court.completedHours,
          }))}
          totals={summary}
        />
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-5 py-4">
          <h2 className="text-sm font-bold text-slate-900">
            Đơn cần xử lý gấp
          </h2>
          <Badge status="Pending">{summary.pendingCount}</Badge>
        </div>
        <div className="divide-y divide-slate-100">
          {summary.pendingBookings.map((booking) => (
            <button
              key={booking.bookingId}
              type="button"
              onClick={() => setSelectedId(booking.bookingId)}
              className="flex w-full items-start justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-slate-50"
            >
              <div>
                <p className="text-[13px] font-semibold text-slate-900">
                  {booking.customerName}
                </p>
                <p className="font-mono text-[11px] text-slate-500">
                  {booking.bookingCode} · {booking.courtName} ·{" "}
                  {formatDate(booking.date)} · {booking.startTime} –{" "}
                  {booking.endTime}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge status={booking.status}>
                  {BOOKING_STATUS_LABEL[booking.status]}
                </Badge>
                <span className="font-mono text-[12px] font-bold text-slate-900">
                  {formatCurrency(booking.totalCost)}
                </span>
              </div>
            </button>
          ))}
          {summary.pendingBookings.length === 0 && (
            <div className="px-5 py-8 text-center font-mono text-[12px] text-slate-400">
              Không có đơn chờ xác nhận
            </div>
          )}
        </div>
        <Link
          href="/booking-requests"
          className="block border-t border-slate-100 py-3 text-center font-mono text-[11px] font-bold text-blue-600 transition-colors hover:bg-blue-50"
        >
          Xem tất cả →
        </Link>
      </section>

      {selectedId && (
        <BookingDetailModal
          bookingId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
