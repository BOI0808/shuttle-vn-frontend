"use client";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCustomerFormData>({
    resolver: zodResolver(createCustomerSchema),
  });

  const createMutation = useCreateCustomer();

  const onSubmit = (data: CreateCustomerFormData) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Đã thêm khách hàng thành công");
        onClose();
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-gray-200 rounded-xl w-[500px] max-w-[95vw] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <p className="font-bold text-[16px] text-gray-900">Thêm khách hàng mới</p>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex flex-col gap-4">
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
                type="tel"
                placeholder="0912345678"
                error={errors.phone?.message}
                {...register("phone")}
              />
            </div>
            <div>
              <Label required>Email</Label>
              <Input
                type="email"
                placeholder="khachhang@gmail.com"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              disabled={createMutation.isPending}
              onClick={onClose}
            >
              Hủy
            </Button>
            <Button type="submit" loading={createMutation.isPending}>
              Tạo khách hàng
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}