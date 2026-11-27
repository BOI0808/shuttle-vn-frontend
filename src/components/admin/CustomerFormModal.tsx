"use client";

import { useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
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
        onClose();
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
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-[520px] overflow-hidden rounded-[12px] border border-line bg-white shadow-xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
          <div>
            <h2
              id={titleId}
              className="font-display text-[18px] font-medium leading-[26px] text-ink"
            >
              Thêm khách hàng mới
            </h2>
            <p className="mt-1 font-sans text-[12px] leading-[16px] text-ink-secondary">
              Tạo hồ sơ và gửi liên kết kích hoạt tài khoản qua email.
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
                placeholder="Nguyễn Văn A"
                error={errors.fullName?.message}
                {...register("fullName")}
              />
            </div>
            <div>
              <Label htmlFor="customer-phone" required>
                Số điện thoại
              </Label>
              <Input
                id="customer-phone"
                type="tel"
                placeholder="0912345678"
                error={errors.phone?.message}
                {...register("phone")}
              />
            </div>
            <div>
              <Label htmlFor="customer-email" required>
                Email
              </Label>
              <Input
                id="customer-email"
                type="email"
                placeholder="khachhang@gmail.com"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>
            <div className="flex items-start gap-2.5 rounded-[8px] border border-status-info/30 bg-status-info-soft px-4 py-3 font-sans text-[12px] leading-[18px] text-status-info">
              <span
                className="material-symbols-outlined mt-0.5 text-[18px]"
                aria-hidden="true"
              >
                mail
              </span>
              <p>
                Hệ thống gửi email thiết lập mật khẩu (liên kết hiệu lực 24 giờ)
                tới khách hàng. Tài khoản ở trạng thái &quot;Chờ kích hoạt&quot;
                cho đến khi khách đặt mật khẩu.
              </p>
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
              Tạo khách hàng
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
