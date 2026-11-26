"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { isAxiosError } from "axios";
import { toast } from "sonner";

import { BookingDetailView } from "@/components/booking/BookingDetailView";
import { ConfirmBookingModal } from "@/components/booking/ConfirmBookingModal";
import { RejectBookingModal } from "@/components/booking/RejectBookingModal";
import { RescheduleBookingModal } from "@/components/booking/RescheduleBookingModal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { BOOKING_STATUS_LABEL } from "@/config/app";
import { useBookingDetail, useCompleteBooking } from "@/hooks";
import {
  canRescheduleBooking,
  formatCurrency,
  formatDate,
  getErrorMessage,
  hasBookingEnded,
} from "@/utils";

type ActiveModal =
  | "confirm"
  | "reject"
  | "reschedule"
  | "completePending"
  | "completeConfirmed"
  | null;

interface BookingDetailClientProps {
  id: string;
}

export default function BookingDetailClient({ id }: BookingDetailClientProps) {
  const [modal, setModal] = useState<ActiveModal>(null);
  const idempotencyKey = useRef<string | null>(null);
  const { data: booking, isLoading, error } = useBookingDetail(id);
  const completeMutation = useCompleteBooking();

  const handleCompleteConfirmed = () => {
    idempotencyKey.current ??= crypto.randomUUID();
    completeMutation.mutate(
      { id, idempotencyKey: idempotencyKey.current },
      {
        onSuccess: () => {
          toast.success("Đã ghi nhận hoàn thành đơn");
          setModal(null);
        },
        onError: (mutationError) => {
          if (isAxiosError(mutationError) && mutationError.response) {
            idempotencyKey.current = null;
          }
          toast.error(getErrorMessage(mutationError));
          setModal(null);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6" aria-busy="true">
        <div className="h-[88px] animate-pulse rounded-[12px] border border-line bg-white" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[200px] animate-pulse rounded-[12px] border border-line bg-white"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!booking) {
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
          Không thể tải chi tiết đơn đặt sân
        </h2>
        <p className="mt-2 font-sans text-[14px] text-ink-secondary">
          {getErrorMessage(error)}
        </p>
        <div className="mt-5">
          <Link
            href="/booking-requests"
            className="inline-flex h-[44px] items-center justify-center rounded-[8px] border border-line-strong bg-white px-4 font-sans text-[14px] font-semibold text-ink-secondary hover:bg-surface-bg hover:text-ink"
          >
            Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  const isPending = booking.status === "Pending";
  const canComplete =
    (isPending || booking.status === "Confirmed") &&
    hasBookingEnded(booking.date, booking.endTime);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-[24px] font-semibold leading-[32px] text-ink">
            Chi tiết đơn đặt sân
          </h1>
          <p className="mt-1 font-sans text-[14px] leading-[20px] text-ink-secondary">
            <Link
              href="/booking-requests"
              className="font-medium text-brand-strong hover:underline"
            >
              Yêu cầu đặt sân
            </Link>{" "}
            <span aria-hidden="true">/</span>{" "}
            <span className="tabular-nums">{booking.bookingCode}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {isPending && (
            <>
              <Button type="button" onClick={() => setModal("confirm")}>
                Xác nhận
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-status-danger/40 text-status-danger hover:border-status-danger hover:bg-status-danger-soft hover:text-status-danger"
                onClick={() => setModal("reject")}
              >
                Từ chối
              </Button>
            </>
          )}
          {canRescheduleBooking(booking, true) && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setModal("reschedule")}
            >
              Đổi lịch
            </Button>
          )}
          {canComplete && (
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setModal(isPending ? "completePending" : "completeConfirmed")
              }
            >
              Hoàn thành
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[12px] border border-line bg-white p-5">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-display text-[18px] font-medium leading-[26px] text-ink tabular-nums">
              {booking.bookingCode}
            </span>
            <Badge status={booking.status}>
              {BOOKING_STATUS_LABEL[booking.status]}
            </Badge>
          </div>
          <p className="mt-1.5 font-sans text-[14px] leading-[20px] text-ink-secondary tabular-nums">
            {booking.courtName} · {formatDate(booking.date)} ·{" "}
            {booking.startTime}–{booking.endTime}
          </p>
        </div>
        <p className="font-sans text-[28px] font-semibold leading-[36px] text-ink tabular-nums">
          {formatCurrency(booking.totalCost)}
        </p>
      </div>

      <BookingDetailView booking={booking} layout="grid" />

      {booking.status === "Cancelled" && (
        <div className="rounded-[8px] bg-surface-soft px-4 py-3 font-sans text-[14px] leading-[20px] text-ink-secondary">
          Đơn đã hủy không thể xác nhận, đổi lịch hoặc ghi nhận hoàn thành.
        </div>
      )}

      {modal === "confirm" && (
        <ConfirmBookingModal
          booking={booking}
          action="confirm"
          onClose={() => setModal(null)}
        />
      )}
      {modal === "reschedule" && (
        <RescheduleBookingModal
          booking={booking}
          isStaff
          onClose={() => setModal(null)}
        />
      )}
      {modal === "reject" && (
        <RejectBookingModal booking={booking} onClose={() => setModal(null)} />
      )}
      {modal === "completePending" && (
        <ConfirmBookingModal
          booking={booking}
          action="complete"
          onClose={() => setModal(null)}
        />
      )}
      {modal === "completeConfirmed" && (
        <ConfirmDialog
          title="Ghi nhận hoàn thành"
          description={`Xác nhận khách đã sử dụng sân cho đơn ${booking.bookingCode}?`}
          confirmLabel="Ghi nhận"
          isLoading={completeMutation.isPending}
          onConfirm={handleCompleteConfirmed}
          onCancel={() => setModal(null)}
        />
      )}
    </div>
  );
}