"use client";

import { Badge } from "@/components/ui/Badge";
import { cn, formatCurrency } from "@/utils";
import { BOOKING_STATUS_LABEL } from "@/config/app";
import type { Booking } from "@/types";

interface BookingCardProps {
  booking: Booking;
  onViewDetail: (id: string) => void;
  onReschedule: (id: string) => void;
  onCancel: (id: string) => void;
  onViewInvoice: (id: string) => void;
}

export function BookingCard({
  booking,
  onViewDetail,
  onReschedule,
  onCancel,
  onViewInvoice,
}: BookingCardProps) {
  const muted =
    booking.status === "COMPLETED" || booking.status === "CANCELLED";

  const canReschedule =
    booking.status === "PENDING" || booking.status === "CONFIRMED";
  const canCancel =
    booking.status === "PENDING" || booking.status === "CONFIRMED";
  const canViewInvoice = booking.status === "COMPLETED";

  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-slate-100 px-5 py-[18px] transition-shadow duration-150",
        "shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_3px_10px_rgba(0,0,0,0.08)]",
        muted && "opacity-65"
      )}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex flex-col gap-2.5 flex-1 min-w-[260px]">
          {/* Badge + code */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <Badge status={booking.status}>
              {BOOKING_STATUS_LABEL[booking.status]}
            </Badge>
            <span className="text-xs font-mono text-gray-400">
              {booking.bookingCode}
            </span>
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-3 gap-x-7 gap-y-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.07em] font-mono font-semibold text-gray-400 mb-0.5">
                Sân
              </p>
              <p
                className={cn(
                  "text-sm font-semibold text-gray-900",
                  muted && "text-gray-400"
                )}
              >
                Sân {booking.courtId}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.07em] font-mono font-semibold text-gray-400 mb-0.5">
                Ngày
              </p>
              <p
                className={cn(
                  "text-sm font-semibold text-gray-900",
                  muted && "text-gray-400"
                )}
              >
                {booking.date}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.07em] font-mono font-semibold text-gray-400 mb-0.5">
                Giờ
              </p>
              <p
                className={cn(
                  "text-sm font-semibold font-mono text-gray-900",
                  muted && "text-gray-400"
                )}
              >
                {booking.startTime} – {booking.endTime}
              </p>
            </div>
          </div>

          {/* Payment row */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-400">Tổng tiền ·</span>
            <span className="text-xs font-semibold font-mono text-blue-600">
              {formatCurrency(booking.totalCost)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-[7px] items-center flex-wrap">
          <button
            onClick={() => onViewDetail(booking.bookingId)}
            className="inline-flex items-center gap-1 px-[13px] py-[7px] rounded-md text-xs font-medium border border-gray-200 text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-700 hover:border-gray-300 transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">info</span>
            Chi tiết
          </button>

          {canViewInvoice && (
            <button
              onClick={() => onViewInvoice(booking.bookingId)}
              className="inline-flex items-center gap-1 px-[13px] py-[7px] rounded-md text-xs font-medium border border-gray-200 text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-700 hover:border-gray-300 transition-colors"
            >
              <span className="material-symbols-outlined text-[15px]">
                receipt_long
              </span>
              Hóa đơn
            </button>
          )}

          {canReschedule && (
            <button
              onClick={() => onReschedule(booking.bookingId)}
              className="inline-flex items-center gap-1 px-[13px] py-[7px] rounded-md text-xs font-medium border border-amber-200 text-amber-600 bg-amber-50 hover:bg-amber-100 hover:border-amber-300 transition-colors"
            >
              <span className="material-symbols-outlined text-[15px]">
                schedule
              </span>
              Đổi lịch
            </button>
          )}

          {canCancel && (
            <button
              onClick={() => onCancel(booking.bookingId)}
              className="inline-flex items-center gap-1 px-[13px] py-[7px] rounded-md text-xs font-medium border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 hover:border-red-300 transition-colors"
            >
              <span className="material-symbols-outlined text-[15px]">
                cancel
              </span>
              Hủy đặt
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
