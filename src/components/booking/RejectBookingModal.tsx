"use client";

import { useEffect, useId, useRef } from "react";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { useRejectBooking } from "@/hooks";
import type { BookingListItem } from "@/types";
import { cn, getErrorMessage } from "@/utils";

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
  const titleId = useId();
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !mutation.isPending) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mutation.isPending, onClose]);

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
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget && !mutation.isPending) onClose();
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-lg overflow-hidden rounded-[12px] border border-line bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2
            id={titleId}
            className="font-display text-[18px] font-medium leading-[26px] text-ink"
          >
            Từ chối yêu cầu đặt sân
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

        <div className="flex flex-col gap-4 p-6">
          <p className="font-sans text-[14px] leading-[20px] text-ink-secondary">
            Từ chối đơn{" "}
            <span className="font-semibold text-ink tabular-nums">
              {booking.bookingCode}
            </span>
            . Yêu cầu sẽ chuyển sang trạng thái Đã hủy. Vui lòng nhập lý do rõ
            ràng để khách hàng nắm thông tin.
          </p>
          <div>
            <Label required htmlFor="reason">
              Lý do từ chối
            </Label>
            <textarea
              id="reason"
              rows={4}
              placeholder="Nhập lý do từ chối"
              {...register("reason")}
              className={cn(
                "w-full resize-none rounded-[8px] border border-line-strong bg-white px-3.5 py-2.5 font-sans text-[14px] text-ink placeholder:text-ink-muted outline-none transition-colors",
                "focus:border-brand focus:ring-2 focus:ring-brand/20",
                errors.reason &&
                  "border-status-danger focus:border-status-danger focus:ring-status-danger/20"
              )}
            />
            {errors.reason && (
              <p className="mt-1 font-sans text-[12px] leading-[16px] text-status-danger">
                {errors.reason.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-line bg-surface-bg px-6 py-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Quay lại
          </Button>
          <Button
            type="submit"
            variant="danger"
            loading={mutation.isPending}
          >
            Từ chối yêu cầu
          </Button>
        </div>
      </form>
    </div>
  );
}