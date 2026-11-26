"use client";

import { useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useCreateCourt, useUpdateCourt } from "@/hooks";
import { Court } from "@/types";
import { getErrorMessage } from "@/utils";

const schema = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập tên sân"),
  description: z.string().trim(),
  defaultOpenTime: z.string(),
  defaultCloseTime: z.string(),
  defaultPricePerHour: z.coerce.number().positive("Giá phải lớn hơn 0"),
});
type FormData = z.infer<typeof schema>;

interface CourtFormModalProps {
  court?: Court;
  onClose: () => void;
}

export function CourtFormModal({ court, onClose }: CourtFormModalProps) {
  const titleId = useId();
  const createMutation = useCreateCourt();
  const updateMutation = useUpdateCourt();
  const schedule = court?.courtSchedules?.find((item) => item.isAvailable);
  const price = court?.pricingRules?.[0]?.pricePerHour;
  const mutation = court ? updateMutation : createMutation;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: court?.name ?? "",
      description: court?.description ?? "",
      defaultOpenTime: schedule?.openTime.slice(0, 5) ?? "05:00",
      defaultCloseTime: schedule?.closeTime.slice(0, 5) ?? "22:00",
      defaultPricePerHour: price ?? 60000,
    },
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !mutation.isPending) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mutation.isPending, onClose]);

  const onSubmit = (values: FormData) => {
    const options = {
      onSuccess: () => {
        toast.success(court ? "Đã cập nhật sân" : "Đã thêm sân");
        onClose();
      },
      onError: (error: Error) => toast.error(getErrorMessage(error)),
    };

    if (court) {
      updateMutation.mutate(
        {
          id: court.courtId,
          payload: { name: values.name, description: values.description },
        },
        options
      );
      return;
    }
    createMutation.mutate(values, options);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 p-4 backdrop-blur-xs"
      onClick={(event) => {
        if (event.target === event.currentTarget && !mutation.isPending) {
          onClose();
        }
      }}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[664px] rounded-[12px] border border-line bg-white shadow-xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
          <div>
            <h2
              id={titleId}
              className="font-display text-[18px] font-medium leading-[26px] text-ink"
            >
              {court ? `Chỉnh sửa sân · ${court.name}` : "Thêm sân"}
            </h2>
            <p className="mt-1 font-sans text-[12px] leading-[16px] text-ink-secondary">
              {court
                ? "Cập nhật tên và mô tả hiển thị của sân."
                : "Tạo sân mới và thiết lập giờ mở cửa, giá mặc định ban đầu."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={mutation.isPending}
            aria-label="Đóng"
            className="inline-flex size-[36px] shrink-0 items-center justify-center rounded-[8px] text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="court-name" required>
              Tên sân
            </Label>
            <Input
              id="court-name"
              placeholder="Nhập tên sân"
              {...register("name")}
              error={errors.name?.message}
            />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="court-description">Mô tả</Label>
            <textarea
              id="court-description"
              rows={3}
              placeholder="Nhập mô tả (không bắt buộc)"
              {...register("description")}
              className="w-full resize-none rounded-[8px] border border-line-strong bg-white px-3.5 py-2.5 font-sans text-[14px] leading-[20px] text-ink placeholder:text-ink-muted outline-none transition-colors duration-150 focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>

          {!court && (
            <>
              <div>
                <Label htmlFor="court-open-time" required>
                  Giờ mở cửa
                </Label>
                <Input
                  id="court-open-time"
                  type="time"
                  {...register("defaultOpenTime")}
                />
              </div>
              <div>
                <Label htmlFor="court-close-time" required>
                  Giờ đóng cửa
                </Label>
                <Input
                  id="court-close-time"
                  type="time"
                  {...register("defaultCloseTime")}
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="court-default-price" required>
                  Giá mặc định / giờ (VND)
                </Label>
                <Input
                  id="court-default-price"
                  type="number"
                  min={1}
                  {...register("defaultPricePerHour")}
                  error={errors.defaultPricePerHour?.message}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-line bg-surface-bg px-6 py-4 rounded-b-[12px]">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={mutation.isPending}
          >
            Hủy
          </Button>
          <Button type="submit" variant="primary" loading={mutation.isPending}>
            {court ? "Lưu thay đổi" : "Thêm sân"}
          </Button>
        </div>
      </form>
    </div>
  );
}
