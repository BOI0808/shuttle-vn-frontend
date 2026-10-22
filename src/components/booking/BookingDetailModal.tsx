"use client";

import Link from "next/link";

import { BookingDetailView } from "@/components/booking/BookingDetailView";
import { Button } from "@/components/ui/Button";
import { useBookingDetail } from "@/hooks";
import { getErrorMessage } from "@/utils";

interface BookingDetailModalProps {
  bookingId: string;
  onClose: () => void;
}

export function BookingDetailModal({
  bookingId,
  onClose,
}: BookingDetailModalProps) {
  const {
    data: booking,
    isLoading,
    isError,
    error,
  } = useBookingDetail(bookingId);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-[2px]">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Chi tiết đặt sân"
        className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-xl border border-gray-200 bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="font-bold text-gray-900">Chi tiết đặt sân</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="text-gray-400 hover:text-gray-700"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          {isLoading && (
            <p className="py-8 text-center font-mono text-sm text-slate-500">
              Đang tải chi tiết đơn...
            </p>
          )}
          {isError && (
            <p className="py-8 text-center text-sm text-red-600">
              {getErrorMessage(error)}
            </p>
          )}
          {booking && <BookingDetailView booking={booking} />}
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
          <Button
            type="button"
            variant="outline"
            className="w-auto"
            onClick={onClose}
          >
            Đóng
          </Button>
          <Link
            href={`/bookings/${bookingId}`}
            className="inline-flex items-center rounded-[7px] bg-emerald-500 px-4 py-3 font-mono text-[13px] font-medium tracking-[0.05em] text-white transition-colors hover:bg-emerald-600"
          >
            Mở trang xử lý
          </Link>
        </div>
      </div>
    </div>
  );
}