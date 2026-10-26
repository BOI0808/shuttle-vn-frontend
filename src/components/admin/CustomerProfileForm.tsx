"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useUpdateCustomer } from "@/hooks";
import type { CustomerListItem } from "@/types";
import { getErrorMessage } from "@/utils";

const PHONE_PATTERN = /^\+?\d{8,15}$/;

const schema = z.object({
  fullName: z.string().trim().min(1, "Vui lòng nhập họ và tên"),
  phone: z
    .string()
    .refine(
      (value) => PHONE_PATTERN.test(value.replace(/[\s-]/g, "")),
      "Số điện thoại gồm 8–15 chữ số, có thể bắt đầu bằng +"
    ),
});

type FormData = z.infer<typeof schema>;

interface CustomerProfileFormProps {
  customer: CustomerListItem;
}

function toFormValues(customer: CustomerListItem): FormData {
  return { fullName: customer.fullName, phone: customer.phone };
}

export function CustomerProfileForm({ customer }: CustomerProfileFormProps) {
  const updateMutation = useUpdateCustomer();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: toFormValues(customer),
  });

  useEffect(() => {
    reset(toFormValues(customer));
  }, [customer, reset]);

  const handleSave = (data: FormData) => {
    updateMutation.mutate(
      { id: customer.customerId, payload: data },
      {
        onSuccess: () => toast.success("Đã cập nhật hồ sơ khách hàng"),
        onError: (error) => toast.error(getErrorMessage(error)),
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(handleSave)}
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
    >
      <h3 className="mb-4 text-[15px] font-bold text-slate-900">
        Thông tin khách hàng
      </h3>
      <div className="flex flex-col gap-[18px]">
        <div>
          <Label required>Họ và tên</Label>
          <Input error={errors.fullName?.message} {...register("fullName")} />
        </div>
        <div>
          <Label required>Số điện thoại</Label>
          <Input
            type="tel"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" value={customer.email} readOnly disabled />
          <p className="mt-1 text-xs text-slate-500">Email không thể thay đổi.</p>
        </div>
      </div>
      <div className="mt-5 flex gap-2.5">
        <Button
          type="submit"
          className="w-auto"
          loading={updateMutation.isPending}
          disabled={!isDirty}
        >
          Lưu thay đổi
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-auto"
          disabled={!isDirty || updateMutation.isPending}
          onClick={() => reset(toFormValues(customer))}
        >
          Hủy
        </Button>
      </div>
    </form>
  );
}