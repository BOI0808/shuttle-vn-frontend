"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ResendSetupLinkButton } from "@/components/auth/ResendSetupLinkButton";

import { useAuth } from "@/hooks/useAuth";

import { getErrorMessage, hasApiFieldError } from "@/utils";

const setPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Mật khẩu tối thiểu 8 ký tự")
      .max(128, "Mật khẩu tối đa 128 ký tự"),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

type SetPasswordFormData = z.infer<typeof setPasswordSchema>;

interface SetPasswordFormProps {
  email: string;
  token: string;
}

export function SetPasswordForm({ email, token }: SetPasswordFormProps) {
  const { setPassword, isSettingPassword } = useAuth();
  const [isLinkInvalid, setIsLinkInvalid] = useState(!email || !token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetPasswordFormData>({
    resolver: zodResolver(setPasswordSchema),
  });

  useEffect(() => {
    if (!token) return;
    const url = new URL(window.location.href);
    url.searchParams.delete("token");
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  }, [token]);

  const onSubmit = (data: SetPasswordFormData) => {
    setPassword(
      {
        email,
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
      {
        onError: (error) => {
          if (hasApiFieldError(error, "Token")) {
            setIsLinkInvalid(true);
            return;
          }
          toast.error(getErrorMessage(error));
        },
      }
    );
  };

  if (isLinkInvalid) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="material-symbols-outlined text-[40px] text-red-500">
          link_off
        </span>
        <div role="alert">
          <p className="font-display text-[15px] font-bold text-gray-900">
            Liên kết không hợp lệ hoặc đã hết hạn
          </p>
          <p className="mt-1.5 text-[13px] text-gray-500">
            Liên kết thiết lập mật khẩu chỉ có hiệu lực 24 giờ và dùng được một
            lần. Hồ sơ và lịch sử đặt sân của bạn vẫn được giữ nguyên.
          </p>
        </div>
        {email && <ResendSetupLinkButton email={email} />}
        <p className="text-[13px] text-gray-500">
          Đã đặt mật khẩu rồi?
          <Link
            href="/login"
            className="ml-1 font-semibold text-emerald-500 transition-colors hover:text-emerald-600"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="text-center">
        <p className="font-display text-[15px] font-bold text-gray-900">
          Đặt mật khẩu tài khoản
        </p>
        <p className="mt-1.5 break-all text-[13px] text-gray-500">{email}</p>
      </div>

      <div>
        <Label htmlFor="password" required>
          Mật khẩu mới
        </Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="8–128 ký tự"
          icon={
            <span className="material-symbols-outlined text-[18px]">lock</span>
          }
          error={errors.password?.message}
          {...register("password")}
        />
      </div>

      <div>
        <Label htmlFor="confirmPassword" required>
          Xác nhận mật khẩu
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Nhập lại mật khẩu"
          icon={
            <span className="material-symbols-outlined text-[18px]">
              lock_reset
            </span>
          }
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
      </div>

      <Button type="submit" loading={isSettingPassword} className="mt-1">
        ĐẶT MẬT KHẨU
      </Button>
    </form>
  );
}
