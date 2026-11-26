"use client";

import { useEffect, useId, useRef } from "react";
import { isAxiosError } from "axios";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { BOOKING_STATUS_LABEL, PAYMENT_METHOD_LABEL } from "@/config/app";
import { useCompleteBooking, useConfirmBooking } from "@/hooks";
import type { BookingListItem, ConfirmBookingRequest } from "@/types";
import { formatCurrency, formatDate, getErrorMessage } from "@/utils";

const DATETIME_LOCAL_FORMAT = "yyyy-MM-dd'T'HH:mm";

const schema = z
  .object({
    paymentState: z.enum(["Unpaid", "Paid"]),
    paymentMethod: z.enum(["Cash", "Bank"]),
    paidAt: z.string(),
    note: z.string().trim(),
  })
  .superRefine((values, ctx) => {
    if (values.paymentState !== "Paid") return;
    const paidAt = new Date(values.paidAt);
    if (Number.isNaN(paidAt.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["paidAt"],
        message: "Vui lòng chọn thời điểm thu tiền",
      });
    } else if (paidAt.getTime() > Date.now()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["paidAt"],
        message: "Thời điểm thu tiền không được ở tương lai",
      });
    }
  });
type FormData = z.infer<typeof schema>;

const COPY = {
  confirm: {
    title: "Xác nhận đặt sân",
    submit: "Xác nhận đơn",
    success: "Đã xác nhận đơn",
  },
  complete: {
    title: "Ghi nhận hoàn thành",
    submit: "Ghi nhận hoàn thành",
    success: "Đã ghi nhận hoàn thành đơn",
  },
} as const;

interface ConfirmBookingModalProps {
  booking: BookingListItem;
  action: keyof typeof COPY;
  onClose: () => void;
}

function toPayload(values: FormData): ConfirmBookingRequest {
  const note = values.note || undefined;
  if (values.paymentState === "Unpaid") return { isPaid: false, note };
  return {
    isPaid: true,
    paymentMethod: values.paymentMethod,
    paidAt: new Date(values.paidAt).toISOString(),
    note,
  };
}

export function ConfirmBookingModal({
  booking,
  action,
  onClose,
}: ConfirmBookingModalProps) {
  const titleId = useId();
  const idempotencyKey = useRef<string | null>(null);
  const confirmMutation = useConfirmBooking();
  const completeMutation = useCompleteBooking();
  const mutation = action === "confirm" ? confirmMutation : completeMutation;
  const copy = COPY[action];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !mutation.isPending) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mutation.isPending, onClose]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      paymentState: "Unpaid",
      paymentMethod: "Cash",
      paidAt: format(new Date(), DATETIME_LOCAL_FORMAT),
      note: "",
    },
  });
  const paymentState = watch("paymentState");
  const isPaid = paymentState === "Paid";

  const onSubmit = (values: FormData) => {
    idempotencyKey.current ??= crypto.randomUUID();
    mutation.mutate(
      {
        id: booking.bookingId,
        payload: toPayload(values),
        idempotencyKey: idempotencyKey.current,
      },
      {
        onSuccess: () => {
          toast.success(`${copy.success} ${booking.bookingCode}`);
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
          <div className="flex items-center gap-3">
            <h2
              id={titleId}
              className="font-display text-[18px] font-medium leading-[26px] text-ink"
            >
              {copy.title}
            </h2>
            <Badge status={booking.status}>
              {BOOKING_STATUS_LABEL[booking.status]}
            </Badge>
          </div>
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
          <div className="rounded-[8px] border border-line bg-surface-bg px-4 py-3 font-sans text-[14px] text-ink-secondary">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-ink tabular-nums">
                {booking.bookingCode}
              </span>
              <span className="font-semibold text-ink tabular-nums">
                {formatCurrency(booking.totalCost)}
              </span>
            </div>
            <p className="mt-1 text-[12px] text-ink-secondary tabular-nums">
              {booking.courtName} · {formatDate(booking.date)} ·{" "}
              {booking.startTime}–{booking.endTime}
            </p>
          </div>

          <fieldset>
            <legend className="mb-2 font-sans text-[12px] font-semibold leading-[16px] text-ink-secondary">
              Tình trạng thu tiền
            </legend>
            <div className="flex flex-wrap gap-2.5">
              <Button
                type="button"
                variant={paymentState === "Unpaid" ? "primary" : "outline"}
                onClick={() => setValue("paymentState", "Unpaid")}
              >
                Chưa thu tiền
              </Button>
              <Button
                type="button"
                variant={paymentState === "Paid" ? "primary" : "outline"}
                onClick={() => setValue("paymentState", "Paid")}
              >
                Đã thu đủ tiền
              </Button>
            </div>
            <p className="mt-2 font-sans text-[12px] leading-[16px] text-ink-secondary">
              Hệ thống tự động tạo hóa đơn khi xác nhận. Chỉ chọn &ldquo;Đã thu đủ tiền&rdquo; sau khi nhận đủ 100%.
            </p>
          </fieldset>

          {isPaid && (
            <>
              <div>
                <Label required htmlFor="paymentMethod">
                  Phương thức
                </Label>
                <Select id="paymentMethod" {...register("paymentMethod")}>
                  <option value="Cash">{PAYMENT_METHOD_LABEL.Cash}</option>
                  <option value="Bank">{PAYMENT_METHOD_LABEL.Bank}</option>
                </Select>
              </div>
              <div>
                <Label required htmlFor="paidAt">
                  Thời điểm thu
                </Label>
                <Input
                  id="paidAt"
                  type="datetime-local"
                  max={format(new Date(), DATETIME_LOCAL_FORMAT)}
                  error={errors.paidAt?.message}
                  {...register("paidAt")}
                />
              </div>
            </>
          )}

          <div>
            <Label htmlFor="note">Ghi chú</Label>
            <textarea
              id="note"
              rows={3}
              {...register("note")}
              className="w-full resize-none rounded-[8px] border border-line-strong bg-white px-3.5 py-2.5 font-sans text-[14px] text-ink placeholder:text-ink-muted outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-line bg-surface-bg px-6 py-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Quay lại
          </Button>
          <Button type="submit" loading={mutation.isPending}>
            {copy.submit}
          </Button>
        </div>
      </form>
    </div>
  );
}