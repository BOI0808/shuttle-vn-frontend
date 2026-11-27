"use client";

import { useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useCreateEmployee, useUpdateEmployee } from "@/hooks/useEmployee";
import { Employee, UserAccount } from "@/types";
import { getErrorMessage } from "@/utils";

const createSchema = z.object({
  fullName: z.string().min(2, "Họ tên tối thiểu 2 ký tự"),
  phone: z.string().regex(/^0\d{9}$/, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu tối thiểu 8 ký tự"),
  isAdmin: z.boolean().default(false),
});

const editSchema = createSchema.omit({ password: true });

type CreateFormData = z.infer<typeof createSchema>;
type EditFormData = z.infer<typeof editSchema>;

interface EmployeeFormModalProps {
  userAccount: UserAccount | null;
  onClose: () => void;
}

function toFormValues(employee?: Employee | null): Partial<CreateFormData> {
  return employee
    ? {
        fullName: employee.fullName,
        phone: employee.phone,
        email: employee.email,
        isAdmin: employee.isAdmin,
      }
    : { isAdmin: false };
}

export function EmployeeFormModal({
  userAccount,
  onClose,
}: EmployeeFormModalProps) {
  const titleId = useId();
  const employee = userAccount?.employee ?? null;
  const isEditing = employee !== null;
  const schema = isEditing ? editSchema : createSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: zodResolver(schema),
    defaultValues: toFormValues(employee),
  });

  useEffect(() => {
    reset(toFormValues(employee));
  }, [employee, reset]);

  const createMutation = useCreateEmployee();
  const updateMutation = useUpdateEmployee();
  const isPending = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isPending) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPending, onClose]);

  const onSubmit = (data: CreateFormData) => {
    if (isEditing) {
      const { fullName, phone } = data as EditFormData;
      updateMutation.mutate(
        {
          id: employee.employeeId,
          payload: { fullName, phone },
        },
        {
          onSuccess: () => {
            toast.success("Đã cập nhật nhân viên");
            onClose();
          },
          onError: (error) => toast.error(getErrorMessage(error)),
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          toast.success("Đã thêm nhân viên mới");
          onClose();
        },
        onError: (error) => toast.error(getErrorMessage(error)),
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 p-4 backdrop-blur-xs"
      onClick={(event) => {
        if (event.target === event.currentTarget && !isPending) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[90vh] w-full max-w-[500px] overflow-y-auto rounded-[12px] border border-line bg-white shadow-xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
          <div>
            <h2
              id={titleId}
              className="font-display text-[18px] font-medium leading-[26px] text-ink"
            >
              {isEditing ? "Chỉnh sửa nhân viên" : "Thêm nhân viên"}
            </h2>
            <p className="mt-1 font-sans text-[12px] leading-[16px] text-ink-secondary">
              {isEditing && employee
                ? `Mã nhân viên: ${employee.employeeId}`
                : "Tạo tài khoản và mật khẩu trực tiếp."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
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
              <Label htmlFor="employee-fullName" required>
                Họ và tên
              </Label>
              <Input
                id="employee-fullName"
                placeholder="Nhập họ và tên"
                error={errors.fullName?.message}
                {...register("fullName")}
              />
            </div>
            <div>
              <Label htmlFor="employee-email" required>
                Email
              </Label>
              <Input
                id="employee-email"
                type="email"
                placeholder="Nhập email"
                disabled={isEditing}
                error={errors.email?.message}
                {...register("email")}
              />
            </div>
            <div>
              <Label htmlFor="employee-phone" required>
                Số điện thoại
              </Label>
              <Input
                id="employee-phone"
                placeholder="Nhập số điện thoại"
                error={errors.phone?.message}
                {...register("phone")}
              />
            </div>
            {!isEditing && (
              <div>
                <Label htmlFor="employee-password" required>
                  Mật khẩu
                </Label>
                <Input
                  id="employee-password"
                  type="password"
                  placeholder="Nhập mật khẩu (tối thiểu 8 ký tự)"
                  error={
                    (
                      errors as typeof errors & {
                        password?: { message?: string };
                      }
                    ).password?.message
                  }
                  {...register("password")}
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-line bg-surface-bg px-6 py-4">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={onClose}
            >
              Hủy
            </Button>
            <Button type="submit" variant="primary" loading={isPending}>
              {isEditing ? "Lưu thay đổi" : "Thêm nhân viên"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
