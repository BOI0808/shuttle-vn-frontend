"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useCreateEmployee, useUpdateEmployee } from "@/hooks/useEmployee";
import {Employee, UserAccount} from "@/types";
import { getErrorMessage } from "@/utils";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

const createSchema = z.object({
  fullName: z.string().min(2, "Họ tên tối thiểu 2 ký tự"),
  phone: z.string().regex(/^0\d{9}$/, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu tối thiểu 8 ký tự"),
  isAdmin: z.boolean(),
});

const editSchema = createSchema.omit({ password: true });

type CreateFormData = z.infer<typeof createSchema>;
type EditFormData = z.infer<typeof editSchema>;

interface EmployeeFormModalProps {
  userAccount: UserAccount | null; // null = tạo mới
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
  const employee = userAccount?.employee ?? null;
  const isEditing = employee !== null;
  const schema = isEditing ? editSchema : createSchema;

  const {
    register,
    handleSubmit,
    reset,
    watch, // <-- Thêm watch
    setValue, // <-- Thêm setValue
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: zodResolver(schema),
    defaultValues: toFormValues(employee)
  });

  const isAdmin = watch("isAdmin");
  const [showAdminConfirm, setShowAdminConfirm] = useState(false);
  const fullName = watch("fullName");

  function handleSelectAdmin() {
    if (!isAdmin) {
      setShowAdminConfirm(true);
    }
  }

  function onConfirmAdmin() {
    setValue("isAdmin", true);
    setShowAdminConfirm(false);
  }

  function onCancelAdmin() {
    setValue("isAdmin", false);
    setShowAdminConfirm(false);
  }

  useEffect(() => {
    reset(toFormValues(employee));
  }, [employee, reset]);

  const createMutation = useCreateEmployee();
  const updateMutation = useUpdateEmployee();
  const isPending = createMutation.isPending || updateMutation.isPending;

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
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-[2px] flex items-center justify-center z-[100]">
      <div className="bg-white border border-gray-200 rounded-xl w-[540px] max-w-[95vw] max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-start justify-between px-6 py-[18px] border-b border-gray-200">
          <div>
            <p className="font-bold text-[16px] text-gray-900">
              {isEditing ? "Chỉnh sửa hồ sơ nhân viên" : "Thêm nhân viên mới"}
            </p>
            {isEditing && employee && (
              <p className="font-mono text-[11px] text-gray-500 mt-0.5">
                {employee.employeeId}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex flex-col gap-[18px]">
            <div>
              <Label required>Họ và tên</Label>
              <Input
                placeholder="Nguyễn Văn A"
                error={errors.fullName?.message}
                {...register("fullName")}
              />
            </div>
            <div>
              <Label required>Số điện thoại</Label>
              <Input
                placeholder="0911000001"
                error={errors.phone?.message}
                {...register("phone")}
              />
            </div>
            <div>
              <Label required>Email</Label>
              <Input
                type="email"
                placeholder="nhanvien@shuttlevn.com"
                disabled={isEditing}
                error={errors.email?.message}
                {...register("email")}
              />
            </div>
            {!isEditing && (
              <div>
                <Label required>Mật khẩu</Label>
                <Input
                  type="password"
                  placeholder="Tối thiểu 8 ký tự"
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
            {!isEditing && (
              <div className="flex flex-col gap-2 pt-1">
                <Label>Vai trò tài khoản</Label>

                {/* Nút công tắc 2 bên */}
                <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                  <button
                    type="button"
                    onClick={() => setValue("isAdmin", false)}
                    className={`flex-1 py-2 text-xs font-medium rounded-md flex items-center justify-center gap-1.5 transition-all ${
                      !isAdmin
                        ? "bg-white text-blue-600 shadow-sm font-semibold"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      badge
                    </span>
                    Nhân viên
                  </button>

                  <button
                    type="button"
                    onClick={handleSelectAdmin}
                    className={`flex-1 py-2 text-xs font-medium rounded-md flex items-center justify-center gap-1.5 transition-all ${
                      isAdmin
                        ? "bg-purple-600 text-white shadow-sm font-semibold"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      admin_panel_settings
                    </span>
                    Quản trị viên
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="px-6 py-[14px] border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-36 whitespace-nowrap"
            >
              Huỷ
            </Button>
            <Button
              type="submit"
              loading={isPending}
              className="w-36 whitespace-nowrap"
            >
              {isEditing ? "Lưu thay đổi" : "Thêm nhân viên"}
            </Button>
          </div>
        </form>
        {/* Popup cảnh báo khi chọn Quản trị viên */}
        {showAdminConfirm && (
          <ConfirmDialog
            title="Cấp quyền Quản trị viên"
            description={
              fullName
                ? `Bạn sắp cấp quyền Admin cho "${fullName}". Hành động này không thể hoàn tác (chưa có chức năng thu hồi quyền Admin).`
                : "Bạn sắp cấp quyền Admin cho nhân viên này. Hành động này không thể hoàn tác (chưa có chức năng thu hồi quyền Admin)."
            }
            confirmLabel="Cấp quyền Admin"
            variant="danger"
            onConfirm={onConfirmAdmin}
            onCancel={onCancelAdmin}
          />
        )}
      </div>
    </div>
  );
}
