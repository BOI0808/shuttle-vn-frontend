"use client";

import { useRef } from "react";
import { isAxiosError } from "axios";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { PAYMENT_METHOD_LABEL } from "@/config/app";
import { useCompleteBooking, useConfirmBooking } from "@/hooks";
import type { BookingListItem, ConfirmBookingRequest } from "@/types";
import { formatCurrency, getErrorMessage } from "@/utils";

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
  const idempotencyKey = useRef<string | null>(null);
  const confirmMutation = useConfirmBooking();
  const completeMutation = useCompleteBooking();
  const mutation = action === "confirm" ? confirmMutation : completeMutation;
  const copy = COPY[action];

  const {
    register,
    handleSubmit,
    watch,
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
  const isPaid = watch("paymentState") === "Paid";

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-[2px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        role="dialog"
        aria-modal="true"
        aria-label={copy.title}
        className="w-full max-w-lg rounded-xl border border-gray-200 bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="font-bold text-gray-900">{copy.title}</h2>
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
          <div className="rounded-lg bg-gray-50 px-4 py-3 text-[13px] text-gray-700">
            <p className="font-mono font-bold text-gray-900">
              {booking.bookingCode}
            </p>
            <p className="mt-1">
              Tổng tiền:{" "}
              <span className="font-mono font-bold">
                {formatCurrency(booking.totalCost)}
              </span>
            </p>
          </div>

          <fieldset>
            <legend className="mb-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-gray-500">
              Trạng thái thu tiền
            </legend>
            <div className="flex gap-6 text-sm text-gray-800">
              <label className="flex items-center gap-2">
                <input type="radio" value="Unpaid" {...register("paymentState")} />
                Chưa thu
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="Paid" {...register("paymentState")} />
                Đã thu đủ
              </label>
            </div>
          </fieldset>

          {isPaid && (
            <>
              <div>
                <Label required htmlFor="paymentMethod">
                  Phương thức
                </Label>
                <select
                  id="paymentMethod"
                  {...register("paymentMethod")}
                  className="w-full rounded-[7px] border border-gray-300 bg-gray-50 px-3 py-[11px] text-sm outline-none focus:border-emerald-500"
                >
                  <option value="Cash">{PAYMENT_METHOD_LABEL.Cash}</option>
                  <option value="Bank">{PAYMENT_METHOD_LABEL.Bank}</option>
                </select>
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
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
          <Button
            type="button"
            variant="outline"
            className="w-auto"
            onClick={onClose}
          >
            Huỷ
          </Button>
          <Button type="submit" className="w-auto" loading={mutation.isPending}>
            {copy.submit}
          </Button>
        </div>
      </form>
    </div>
  );
}