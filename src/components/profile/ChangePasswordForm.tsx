"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { getErrorMessage } from "@/utils";

const schema = z
  .object({
    oldPassword: z.string().min(1, "Mật khẩu hiện tại không đúng"),
    newPassword: z.string().min(8, "Mật khẩu mới phải có ít nhất 8 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

const STRENGTH_COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e"];
const STRENGTH_LABELS = ["Quá yếu", "Yếu", "Trung bình", "Mạnh"];

function calcStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

export function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const newPassword = watch("newPassword") ?? "";
  const strength = useMemo(() => calcStrength(newPassword), [newPassword]);

  const onSubmit = (data: FormData) => {
    try {
      // TODO: gọi useChangePassword() mutation khi có endpoint
      console.log("Đổi mật khẩu", data);
      reset();
      toast.success("Mật khẩu đã được cập nhật");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6">
      <div className="mb-[22px]">
        <h2 className="text-[15px] font-bold text-gray-900 mb-0.5">
          Đổi mật khẩu
        </h2>
        <p className="text-xs text-gray-500">
          Nên dùng mật khẩu mạnh, ít nhất 8 ký tự
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[18px]"
      >
        {/* Mật khẩu hiện tại */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-gray-500 mb-1.5 font-mono">
            Mật khẩu hiện tại
          </label>
          <Input
            type="password"
            placeholder="Nhập mật khẩu hiện tại"
            icon={
              <span className="material-symbols-outlined text-[17px]">
                lock
              </span>
            }
            error={errors.oldPassword?.message}
            {...register("oldPassword")}
          />
        </div>

        {/* Mật khẩu mới */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-gray-500 mb-1.5 font-mono">
            Mật khẩu mới
          </label>
          <Input
            type="password"
            placeholder="Ít nhất 8 ký tự"
            icon={
              <span className="material-symbols-outlined text-[17px]">
                lock_reset
              </span>
            }
            error={errors.newPassword?.message}
            {...register("newPassword")}
          />
          <div className="mt-2">
            <div className="flex gap-1 mb-1">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-1 flex-1 rounded-full transition-colors duration-200"
                  style={{
                    background:
                      i < strength ? STRENGTH_COLORS[strength - 1] : "#e5e7eb",
                  }}
                />
              ))}
            </div>
            <p
              className="font-mono text-[11px] m-0"
              style={{
                color: newPassword ? STRENGTH_COLORS[strength - 1] : "#9ca3af",
              }}
            >
              {newPassword ? STRENGTH_LABELS[strength - 1] ?? "" : ""}
            </p>
          </div>
        </div>

        {/* Xác nhận mật khẩu */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-gray-500 mb-1.5 font-mono">
            Xác nhận mật khẩu mới
          </label>
          <Input
            type="password"
            placeholder="Nhập lại mật khẩu mới"
            icon={
              <span className="material-symbols-outlined text-[17px]">
                lock_reset
              </span>
            }
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </div>

        <div className="pt-1">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 bg-emerald-500 text-white rounded-[7px] px-5 py-[10px] text-[13px] font-mono font-medium tracking-[0.04em] transition-colors duration-150 hover:bg-emerald-600"
          >
            <span className="material-symbols-outlined text-[16px]">
              lock_reset
            </span>
            Cập nhật mật khẩu
          </button>
        </div>
      </form>
    </div>
  );
}
