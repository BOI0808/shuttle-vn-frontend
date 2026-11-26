"use client";

import { useState } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

import { CourtUsageTable } from "@/components/admin/CourtUsageTable";
import { DashboardCourtUsageCard } from "@/components/admin/DashboardCourtUsageCard";
import { DashboardRevenueCard } from "@/components/admin/DashboardRevenueCard";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { BookingDetailModal } from "@/components/booking/BookingDetailModal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

import { useDashboardSummary } from "@/hooks";

import { BOOKING_STATUS_LABEL } from "@/config/app";
import { formatCurrency, formatDate } from "@/utils";

function formatVietnameseToday(dateStr: string): string {
  const formatted = format(parseISO(dateStr), "EEEE, dd/MM/yyyy", { locale: vi });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="h-[32px] w-48 animate-pulse rounded-[4px] bg-line" />
          <div className="h-[20px] w-80 animate-pulse rounded-[4px] bg-line" />
        </div>
        <div className="h-[44px] w-full animate-pulse rounded-[8px] bg-white border border-line sm:w-[272px]" />
      </div>

      <div className="overflow-hidden rounded-[12px] border border-line bg-white">
        <div className="border-b border-line px-5 py-4">
          <p className="font-display text-[18px] font-medium leading-[26px] text-ink">
            Bảng điều khiển
          </p>
          <p className="font-sans text-[12px] leading-[16px] text-ink-secondary">
            Đang tải dữ liệu…
          </p>
        </div>
        <div className="space-y-5 p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="h-[88px] animate-pulse rounded-[8px] bg-surface-bg p-3"
              >
                <div className="h-[8px] w-[100px] rounded-[4px] bg-line" />
                <div className="mt-3 h-[24px] w-[56px] rounded-[4px] bg-line" />
                <div className="mt-3 h-[6px] w-[116px] rounded-[3px] bg-line" />
              </div>
            ))}
          </div>
          <div className="space-y-4 rounded-[8px] bg-surface-bg p-4 animate-pulse">
            {[0, 1, 2].map((row) => (
              <div key={row} className="flex items-center justify-between gap-4">
                <div className="h-[8px] w-[164px] rounded-[4px] bg-line" />
                <div className="h-[8px] w-[64px] rounded-[4px] bg-line" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardClient() {
  const { data: summary, isLoading, isError, refetch } =
    useDashboardSummary();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (isLoading) return <DashboardSkeleton />;

  if (isError || !summary) {
    return (
      <div
        role="alert"
        className="max-w-xl rounded-[12px] border border-line bg-white p-5"
      >
        <div className="flex size-[40px] items-center justify-center rounded-[8px] bg-status-danger-soft text-status-danger">
          <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
            warning
          </span>
        </div>
        <h2 className="mt-4 font-display text-[18px] font-medium leading-[26px] text-ink">
          Không thể tải bảng điều khiển
        </h2>
        <div className="mt-2 space-y-0.5 font-sans text-[14px] leading-[20px] text-ink-secondary">
          <p>Vui lòng kiểm tra kết nối và thử lại.</p>
          <p>Dữ liệu chưa tải được, không phải dữ liệu bằng 0.</p>
        </div>
        <div className="mt-5">
          <Button type="button" variant="outline" onClick={() => refetch()}>
            Thử lại
          </Button>
        </div>
        <div className="mt-5 border-t border-line pt-4">
          <p className="font-sans text-[12px] leading-[16px] text-ink-secondary">
            Giữ nguyên ngữ cảnh và các lựa chọn khi tải lại.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-[24px] font-semibold leading-[32px] text-ink">
            Bảng điều khiển
          </h1>
          <p className="mt-1 font-sans text-[14px] font-normal leading-[20px] text-ink-secondary">
            Tổng quan vận hành trong ngày 
          </p>
        </div>

        <div className="flex h-[44px] w-full items-center gap-3 rounded-[8px] border border-line bg-white px-3.5 sm:w-[272px]">
          <span
            className="material-symbols-outlined text-[20px] text-ink"
            aria-hidden="true"
          >
            calendar_month
          </span>
          <span className="font-sans text-[14px] font-medium leading-[20px] text-ink tabular-nums">
            {formatVietnameseToday(summary.date)}
          </span>
        </div>
      </div>

      <DashboardStats summary={summary} />

      <section className="overflow-hidden rounded-[12px] border border-line bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="font-display text-[18px] font-medium leading-[26px] text-ink">
                Đơn cần xử lý gấp
              </h2>
              <span className="inline-flex h-[24px] min-w-[28px] items-center justify-center rounded-[12px] bg-surface-soft px-2 font-sans text-[12px] font-normal leading-[16px] text-ink-secondary tabular-nums">
                {summary.pendingCount}
              </span>
            </div>
            <p className="mt-0.5 font-sans text-[12px] font-normal leading-[16px] text-ink-secondary">
              Ưu tiên theo giờ chơi gần nhất
            </p>
          </div>
          <Link
            href="/booking-requests"
            className="inline-flex items-center gap-1.5 font-sans text-[14px] font-semibold leading-[20px] text-brand-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-[4px]"
          >
            Xem tất cả yêu cầu
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              arrow_forward
            </span>
          </Link>
        </div>

        {summary.pendingBookings.length === 0 ? (
          <div className="flex items-center gap-3 px-5 py-4">
            <div className="flex size-[32px] shrink-0 items-center justify-center rounded-[8px] bg-brand-soft text-brand-strong">
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                check_circle
              </span>
            </div>
            <div>
              <p className="font-sans text-[14px] font-semibold leading-[20px] text-ink">
                Không có đơn chờ xác nhận
              </p>
              <p className="font-sans text-[12px] font-normal leading-[16px] text-ink-secondary">
                Các yêu cầu cần xử lý sẽ xuất hiện tại đây.
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-line">
            {summary.pendingBookings.map((booking) => (
              <button
                key={booking.bookingId}
                type="button"
                onClick={() => setSelectedId(booking.bookingId)}
                className="flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left transition-colors duration-100 hover:bg-surface-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
              >
                <div className="min-w-0">
                  <p className="truncate font-sans text-[14px] font-semibold leading-[20px] text-ink">
                    {booking.customerName}
                  </p>
                  <p className="mt-0.5 truncate font-sans text-[12px] leading-[16px] text-ink-secondary tabular-nums">
                    {booking.bookingCode} · {booking.courtName} ·{" "}
                    {formatDate(booking.date)} · {booking.startTime}–{booking.endTime}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <Badge status={booking.status}>
                    {BOOKING_STATUS_LABEL[booking.status]}
                  </Badge>
                  <span className="font-sans text-[14px] font-medium leading-[20px] text-ink tabular-nums">
                    {formatCurrency(booking.totalCost)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.72fr_1fr]">
        <DashboardRevenueCard
          summaryDate={summary.date}
          todayRevenue={summary.revenue}
        />
        <DashboardCourtUsageCard summary={summary} />
      </div>

      <CourtUsageTable
        title="Tình trạng sử dụng sân hôm nay"
        actionHref="/schedule"
        actionLabel="Xem lịch sân"
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

      {selectedId && (
        <BookingDetailModal
          bookingId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
