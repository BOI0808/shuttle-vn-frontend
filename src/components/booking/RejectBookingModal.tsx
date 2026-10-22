"use client";

import { useRef } from "react";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { useRejectBooking } from "@/hooks";
import type { BookingListItem } from "@/types";
import { getErrorMessage } from "@/utils";

const schema = z.object({
  reason: z.string().trim().min(5, "Lý do từ chối tối thiểu 5 ký tự"),
});
type FormData = z.infer<typeof schema>;

interface RejectBookingModalProps {
  booking: BookingListItem;
  onClose: () => void;
}

export function RejectBookingModal({
  booking,
  onClose,
}: RejectBookingModalProps) {
  const idempotencyKey = useRef<string | null>(null);
  const mutation = useRejectBooking();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { reason: "" },
  });

  const onSubmit = (values: FormData) => {
    idempotencyKey.current ??= crypto.randomUUID();
    mutation.mutate(
      {
        id: booking.bookingId,
        payload: { reason: values.reason },
        idempotencyKey: idempotencyKey.current,
      },
      {
        onSuccess: () => {
          toast.success(`Đã từ chối đơn ${booking.bookingCode}`);
          onClose();
        },
        onError: (error) => {
          if (isAxiosError(error) && error.response) {
            idempotencyKey.current = null;
          }
          toast.error(getErrorMessage(error));
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-[2px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        role="dialog"
        aria-modal="true"
        aria-label="Từ chối đặt sân"
        className="w-full max-w-lg rounded-xl border border-gray-200 bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="font-bold text-gray-900">Từ chối đặt sân</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="text-gray-400 hover:text-gray-700"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-4 p-6">
          <p className="text-[13px] text-gray-700">
            Từ chối đơn{" "}
            <span className="font-mono font-bold text-gray-900">
              {booking.bookingCode}
            </span>
            . Đơn sẽ chuyển sang trạng thái Đã huỷ.
          </p>
          <div>
            <Label required htmlFor="reason">
              Lý do từ chối
            </Label>
            <textarea
              id="reason"
              rows={4}
              {...register("reason")}
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
            {errors.reason && (
              <p className="mt-1 text-xs text-red-500">
                {errors.reason.message}
              </p>
            )}
          </div>
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
          <Button
            type="submit"
            className="w-auto bg-red-600 hover:bg-red-700 hover:shadow-none disabled:bg-red-300"
            loading={mutation.isPending}
          >
            Từ chối đơn
          </Button>
        </div>
      </form>
    </div>
  );
}