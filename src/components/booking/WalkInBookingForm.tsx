"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useCreateWalkInBooking } from "@/hooks/useBooking";
import { getErrorMessage } from "@/utils";

const schema = z.object({
  guestFullName: z.string().min(2, "Họ tên tối thiểu 2 ký tự"),
  guestPhone: z
    .string()
    .regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Số điện thoại không hợp lệ"),
  guestEmail: z
    .string()
    .email("Email không hợp lệ")
    .optional()
    .or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

const labelClass =
  "block text-[11px] font-semibold uppercase tracking-[0.07em] text-gray-500 mb-1 font-mono";
const inputClass =
  "w-full bg-gray-50 border border-gray-200 rounded-lg text-[#1a1a2e] text-[13px] px-3 py-[9px] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-gray-400 focus:border-emerald-500 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.12)] focus:bg-white";

export function WalkInBookingForm() {
  const { mutate: createWalkIn, isPending } = useCreateWalkInBooking();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    createWalkIn(
      {
        guestFullName: data.guestFullName,
        guestPhone: data.guestPhone,
        guestEmail: data.guestEmail || undefined,
        // courtId, date, startTime, endTime sẽ lấy từ BookingCart store
        courtId: 0,
        date: "",
        startTime: "",
        endTime: "",
      },
      {
        onSuccess: (res) => {
          toast.success(`Đặt sân thành công! Mã: ${res.bookingCode}`);
          reset();
        },
        onError: (error) => toast.error(getErrorMessage(error)),
      }
    );
  };

  return (
    <div
      className="bg-white rounded-2xl px-6 py-[22px]"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4 pb-3.5 border-b border-gray-100">
        <div
          className="w-9 h-9 rounded-[9px] flex items-center justify-center flex-shrink-0 border"
          style={{ background: "#fffbeb", borderColor: "#fde68a" }}
        >
          <span className="material-symbols-outlined text-[18px] text-amber-600">
            person_add
          </span>
        </div>
        <div>
          <p className="font-display text-[14px] font-bold text-gray-900 m-0">
            Đặt sân nhanh – Khách vãng lai
          </p>
          <p className="font-mono text-[11px] text-gray-400 m-0">
            Không cần tài khoản · Nhận mã DS-XXXXX sau khi đặt
          </p>
        </div>
      </div>

      {/* Fields */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-3.5">
          <div>
            <label className={labelClass}>Họ và tên *</label>
            <input
              className={inputClass}
              type="text"
              placeholder="Nguyễn Văn A"
              {...register("guestFullName")}
            />
            {errors.guestFullName && (
              <p className="mt-1 text-[11px] text-red-500">
                {errors.guestFullName.message}
              </p>
            )}
          </div>
          <div>
            <label className={labelClass}>Số điện thoại *</label>
            <input
              className={inputClass}
              type="tel"
              placeholder="090xxxxxxx"
              {...register("guestPhone")}
            />
            {errors.guestPhone && (
              <p className="mt-1 text-[11px] text-red-500">
                {errors.guestPhone.message}
              </p>
            )}
          </div>
          <div>
            <label className={labelClass}>Email (tùy chọn)</label>
            <input
              className={inputClass}
              type="email"
              placeholder="email@gmail.com"
              {...register("guestEmail")}
            />
            {errors.guestEmail && (
              <p className="mt-1 text-[11px] text-red-500">
                {errors.guestEmail.message}
              </p>
            )}
          </div>
        </div>

        {/* Info banner */}
        <div
          className="mt-3 px-3.5 py-2.5 rounded-lg text-[11px] leading-relaxed"
          style={{
            background: "#fffbeb",
            border: "1px solid #fde68a",
            color: "#92400e",
          }}
        >
          Sau khi đặt, bạn sẽ nhận <strong>Mã đặt sân</strong> (ví dụ:{" "}
          <span
            className="font-mono px-1 py-px rounded-sm"
            style={{ background: "#fef3c7" }}
          >
            DS-XXXXX
          </span>
          ) để tra cứu và quản lý đơn hàng.
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-3 w-full py-2.5 rounded-lg text-[13px] font-semibold font-mono tracking-wide text-white transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: isPending ? "#6ee7b7" : "#10b981" }}
        >
          {isPending ? "Đang đặt..." : "ĐẶT SÂN NGAY"}
        </button>
      </form>
    </div>
  );
}
