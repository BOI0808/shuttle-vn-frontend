"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { isAxiosError } from "axios";
import { toast } from "sonner";

import { BookingDetailView } from "@/components/booking/BookingDetailView";
import { ConfirmBookingModal } from "@/components/booking/ConfirmBookingModal";
import { RejectBookingModal } from "@/components/booking/RejectBookingModal";
import { RescheduleBookingModal } from "@/components/booking/RescheduleBookingModal";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useBookingDetail, useCompleteBooking } from "@/hooks";
import { canRescheduleBooking, getErrorMessage, hasBookingEnded } from "@/utils";

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
      <p className="py-8 text-center font-mono text-sm text-slate-500">
        Đang tải chi tiết đơn...
      </p>
    );
  }

  if (!booking) {
    return (
      <p className="py-8 text-center text-sm text-red-600">
        {getErrorMessage(error)}
      </p>
    );
  }

  const isPending = booking.status === "Pending";
  const canComplete =
    (isPending || booking.status === "Confirmed") &&
    hasBookingEnded(booking.date, booking.endTime);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Chi tiết đặt sân</h2>
          <Link
            href="/booking-requests"
            className="text-[13px] text-emerald-700 hover:underline"
          >
            ← Về yêu cầu đặt sân
          </Link>
        </div>
        <div className="flex gap-2">
          {isPending && (
            <>
              <Button
                type="button"
                className="w-auto"
                onClick={() => setModal("confirm")}
              >
                Xác nhận
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-auto border-red-300 text-red-600 hover:bg-red-50"
                onClick={() => setModal("reject")}
              >
                Từ chối
              </Button>
            </>
          )}
          {canRescheduleBooking(booking, true) && (
            <Button type="button" variant="outline" className="w-auto" onClick={() => setModal("reschedule")}>
              Đổi lịch
            </Button>
          )}
          {canComplete && (
            <Button
              type="button"
              variant="outline"
              className="w-auto"
              onClick={() =>
                setModal(isPending ? "completePending" : "completeConfirmed")
              }
            >
              Hoàn thành
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <BookingDetailView booking={booking} />
      </div>

      {modal === "confirm" && (
        <ConfirmBookingModal
          booking={booking}
          action="confirm"
          onClose={() => setModal(null)}
        />
      )}
      {modal === "reschedule" && (
        <RescheduleBookingModal booking={booking} isStaff onClose={() => setModal(null)} />
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