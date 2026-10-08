"use client";

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
  const createMutation = useCreateCourt();
  const updateMutation = useUpdateCourt();
  const schedule = court?.courtSchedules?.find((item) => item.isAvailable);
  const price = court?.pricingRules?.[0]?.pricePerHour;
  const mutation = court ? updateMutation : createMutation;
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: court?.name ?? "",
      description: court?.description ?? "",
      defaultOpenTime: schedule?.openTime.slice(0, 5) ?? "05:00",
      defaultCloseTime: schedule?.closeTime.slice(0, 5) ?? "22:00",
      defaultPricePerHour: price ?? 60000,
    },
  });

  const onSubmit = (values: FormData) => {
    const options = {
      onSuccess: () => {
        toast.success(court ? "Đã cập nhật sân" : "Đã thêm sân");
        onClose();
      },
      onError: (error: Error) => toast.error(getErrorMessage(error)),
    };

    if (court) {
      updateMutation.mutate({
        id: court.courtId,
        payload: { name: values.name, description: values.description },
      }, options);
      return;
    }
    createMutation.mutate(values, options);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-[2px]">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg rounded-xl border border-gray-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="font-bold text-gray-900">{court ? "Chỉnh sửa sân" : "Thêm sân mới"}</h2>
          <button type="button" onClick={onClose} aria-label="Đóng" className="text-gray-400 hover:text-gray-700">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="grid gap-4 p-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label required>Tên sân</Label>
            <Input {...register("name")} error={errors.name?.message} />
          </div>
          <div className="sm:col-span-2">
            <Label>Mô tả</Label>
            <textarea {...register("description")} rows={3} className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500" />
          </div>
          {!court && (
            <>
              <div><Label required>Giờ mở cửa</Label><Input type="time" {...register("defaultOpenTime")} /></div>
              <div><Label required>Giờ đóng cửa</Label><Input type="time" {...register("defaultCloseTime")} /></div>
              <div className="sm:col-span-2"><Label required>Giá mặc định / giờ</Label><Input type="number" min={1} {...register("defaultPricePerHour")} error={errors.defaultPricePerHour?.message} /></div>
            </>
          )}
        </div>
        <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
          <Button type="button" variant="outline" onClick={onClose}>Huỷ</Button>
          <Button type="submit" loading={mutation.isPending}>{court ? "Lưu thay đổi" : "Thêm sân"}</Button>
        </div>
      </form>
    </div>
  );
}
