"use client";

import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Badge } from "@/components/ui/Badge";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useCreateCustomer } from "@/hooks/useCustomer";
import { getErrorMessage } from "@/utils";

const createCustomerSchema = z.object({
  fullName: z.string().trim().min(2, "Họ tên tối thiểu 2 ký tự"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?\d{8,15}$/, "Số điện thoại gồm 8–15 chữ số"),
  email: z.string().trim().email("Email không hợp lệ"),
});

type CreateCustomerFormData = z.infer<typeof createCustomerSchema>;

interface CustomerFormModalProps {
  onClose: () => void;
}

export function CustomerFormModal({ onClose }: CustomerFormModalProps) {
  const titleId = useId();
  const [createdEmail, setCreatedEmail] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCustomerFormData>({
    resolver: zodResolver(createCustomerSchema),
  });

  const createMutation = useCreateCustomer();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !createMutation.isPending) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [createMutation.isPending, onClose]);

  const onSubmit = (data: CreateCustomerFormData) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success(
          "Đã tạo tài khoản và gửi email thiết lập mật khẩu cho khách hàng"
        );
        setCreatedEmail(data.email);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 p-4 backdrop-blur-xs"
      onClick={(event) => {
        if (event.target === event.currentTarget && !createMutation.isPending) {
          onClose();
        }
      }}
    >
      {createdEmail ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="w-full max-w-[448px] rounded-[12px] border border-line bg-brand-soft p-6 shadow-xl"
        >
          <div className="flex items-start gap-3">
            <div className="flex size-[40px] shrink-0 items-center justify-center rounded-[8px] bg-white text-brand-strong">
              <span
                className="material-symbols-outlined text-[22px]"
                aria-hidden="true"
              >
                mark_email_read
              </span>
            </div>
            <div>
              <h2
                id={titleId}
                className="font-display text-[18px] font-medium leading-[26px] text-brand-strong"
              >
                Đã tạo tài khoản
              </h2>
              <p className="mt-2 font-sans text-[14px] leading-[20px] text-ink-secondary">
                Email kích hoạt đã được gửi tới{" "}
                <span className="font-semibold text-ink">{createdEmail}</span>.
                Tài khoản chờ khách hàng kích hoạt.
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Đóng
            </Button>
          </div>
        </div>
      ) : (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="w-full max-w-[480px] overflow-hidden rounded-[12px] border border-line bg-white shadow-xl"
        >
          <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
            <div>
              <h2
                id={titleId}
                className="font-display text-[18px] font-medium leading-[26px] text-ink"
              >
                Thêm khách hàng
              </h2>
              <p className="mt-1 font-sans text-[12px] leading-[16px] text-ink-secondary">
                Tạo tài khoản và gửi email kích hoạt.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={createMutation.isPending}
              aria-label="Đóng"
              className="inline-flex size-[36px] shrink-0 items-center justify-center rounded-[8px] text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink disabled:opacity-50"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                aria-hidden="true"
              >
                close
              </span>
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 p-6">
              <div>
                <Label htmlFor="customer-fullName" required>
                  Họ và tên
                </Label>
                <Input
                  id="customer-fullName"
                  placeholder="Nhập họ và tên"
                  error={errors.fullName?.message}
                  {...register("fullName")}
                />
              </div>
              <div>
                <Label htmlFor="customer-email" required>
                  Email
                </Label>
                <Input
                  id="customer-email"
                  type="email"
                  placeholder="Nhập email"
                  error={errors.email?.message}
                  {...register("email")}
                />
              </div>
              <div>
                <Label htmlFor="customer-phone" required>
                  Số điện thoại
                </Label>
                <Input
                  id="customer-phone"
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  error={errors.phone?.message}
                  {...register("phone")}
                />
              </div>
              <div className="flex items-center justify-between gap-3 pt-1">
                <Badge status="PendingActivation">Chờ kích hoạt</Badge>
                <span className="font-sans text-[12px] leading-[16px] text-ink-secondary">
                  Liên kết kích hoạt hiệu lực 24 giờ
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-line bg-surface-bg px-6 py-4">
              <Button
                type="button"
                variant="outline"
                disabled={createMutation.isPending}
                onClick={onClose}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={createMutation.isPending}
              >
                Tạo &amp; gửi email
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
