"use client";

import { useEffect, useId } from "react";
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
  const titleId = useId();
  const {
    data: booking,
    isLoading,
    isError,
    error,
  } = useBookingDetail(bookingId);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[12px] border border-line bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2
            id={titleId}
            className="font-display text-[18px] font-medium leading-[26px] text-ink"
          >
            Chi tiết đặt sân
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="flex size-[36px] items-center justify-center rounded-[8px] text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          {isLoading && (
            <p className="py-8 text-center font-sans text-[14px] text-ink-secondary">
              Đang tải chi tiết đơn...
            </p>
          )}
          {isError && (
            <p className="py-8 text-center font-sans text-[14px] text-status-danger">
              {getErrorMessage(error)}
            </p>
          )}
          {booking && <BookingDetailView booking={booking} layout="stack" />}
        </div>

        <div className="flex justify-end gap-3 border-t border-line bg-surface-bg px-6 py-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Đóng
          </Button>
          <Link
            href={`/bookings/${bookingId}`}
            className="inline-flex h-[44px] items-center justify-center rounded-[8px] bg-brand-strong px-4 font-sans text-[14px] font-semibold leading-[20px] text-white transition-colors hover:bg-[#05523A]"
          >
            Mở trang xử lý
          </Link>
        </div>
      </div>
    </div>
  );
}