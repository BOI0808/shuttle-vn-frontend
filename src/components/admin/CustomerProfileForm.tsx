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
      className="flex h-full flex-col justify-between rounded-[12px] border border-line bg-white p-5"
    >
      <div>
        <h2 className="font-display text-[18px] font-medium leading-[26px] text-ink">
          Thông tin cá nhân
        </h2>
        <div className="mt-5 flex flex-col gap-4">
          <div>
            <Label htmlFor="profile-fullName" required>
              Họ và tên
            </Label>
            <Input
              id="profile-fullName"
              error={errors.fullName?.message}
              {...register("fullName")}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="profile-email">Email</Label>
              <Input
                id="profile-email"
                type="email"
                value={customer.email}
                readOnly
                disabled
              />
              <p className="mt-1 font-sans text-[12px] leading-[16px] text-ink-secondary">
                Email không thể thay đổi.
              </p>
            </div>

            <div>
              <Label htmlFor="profile-phone" required>
                Số điện thoại
              </Label>
              <Input
                id="profile-phone"
                type="tel"
                error={errors.phone?.message}
                {...register("phone")}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          variant="primary"
          loading={updateMutation.isPending}
          disabled={!isDirty}
        >
          Lưu thay đổi
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={!isDirty || updateMutation.isPending}
          onClick={() => reset(toFormValues(customer))}
        >
          Hủy
        </Button>
      </div>
    </form>
  );
}
