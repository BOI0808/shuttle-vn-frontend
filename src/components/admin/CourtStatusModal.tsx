"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { useUpdateCourtStatus } from "@/hooks/useCourt";
import { Court, CourtStatus } from "@/types";
import { COURT_STATUS_LABEL } from "@/config/app";
import { cn, getErrorMessage } from "@/utils";

const schema = z.object({
  status: z.enum(["Active", "Maintenance", "Closed"]),
  reason: z.string().max(200, "Tối đa 200 ký tự").optional(),
});
type FormData = z.infer<typeof schema>;

const OPTIONS: { value: CourtStatus; hint: string }[] = [
  { value: "Active", hint: "Nhận đặt sân bình thường" },
  { value: "Maintenance", hint: "Tạm ngưng nhận đặt sân mới để bảo trì" },
  { value: "Closed", hint: "Ngừng hoạt động, không nhận đặt sân mới" },
];

interface CourtStatusModalProps {
  court: Court;
  onClose: () => void;
}

export function CourtStatusModal({ court, onClose }: CourtStatusModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: court.status, reason: "" },
  });

  const mutation = useUpdateCourtStatus();
  const selected = watch("status");
  const isUnchanged = selected === court.status;

  const onSubmit = ({ status, reason }: FormData) => {
    mutation.mutate(
      {
        id: String(court.courtId),
        payload: { status, reason: reason?.trim() || undefined },
      },
      {
        onSuccess: ({ affectedUpcomingBookingsCount: n }) => {
          if (n > 0) {
            toast.warning(
              `Đã cập nhật. Còn ${n} đơn đặt sân sắp tới trên sân này, vui lòng liên hệ khách hàng để xử lý.`
            );
          } else {
            toast.success("Đã cập nhật trạng thái sân");
          }
          onClose();
        },
        onError: (error) => toast.error(getErrorMessage(error)),
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-[2px] flex items-center justify-center z-[100]">
      <div className="bg-white border border-gray-200 rounded-xl w-[480px] max-w-[95vw] max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-start justify-between px-6 py-[18px] border-b border-gray-200">
          <div>
            <p className="font-bold text-[16px] text-gray-900">
              Đổi trạng thái sân
            </p>
            <p className="font-mono text-[11px] text-gray-500 mt-0.5">
              {court.name}
            </p>
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
            <div className="flex flex-col gap-2">
              <Label required>Trạng thái</Label>
              {OPTIONS.map((o) => (
                <label
                  key={o.value}
                  className={cn(
                    "flex items-start gap-3 rounded-lg border px-3 py-2.5 cursor-pointer transition-colors",
                    selected === o.value
                      ? "border-emerald-500 bg-emerald-50/50"
                      : "border-gray-200 hover:bg-gray-50"
                  )}
                >
                  <input
                    type="radio"
                    value={o.value}
                    className="mt-1 accent-emerald-500"
                    {...register("status")}
                  />
                  <span>
                    <span className="block text-[13px] font-semibold text-gray-900">
                      {COURT_STATUS_LABEL[o.value]}
                      {o.value === court.status && (
                        <span className="ml-2 font-mono text-[10px] text-gray-400">
                          hiện tại
                        </span>
                      )}
                    </span>
                    <span className="block text-[12px] text-gray-500">
                      {o.hint}
                    </span>
                  </span>
                </label>
              ))}
            </div>

            {selected !== "Active" && !isUnchanged && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[12px] text-amber-700">
                Các đơn đặt sân hiện có (Chờ xác nhận / Đã xác nhận) được giữ
                nguyên và không bị huỷ tự động. Nhân viên cần chủ động liên hệ
                khách hàng.
              </div>
            )}

            <div>
              <Label>Lý do (tuỳ chọn)</Label>
              <textarea
                rows={3}
                placeholder="VD: Thay lưới, sửa sàn..."
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] outline-none focus:border-emerald-500 resize-none"
                {...register("reason")}
              />
              {errors.reason && (
                <p className="text-[12px] text-red-500 mt-1">
                  {errors.reason.message}
                </p>
              )}
            </div>
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
              loading={mutation.isPending}
              disabled={isUnchanged}
              className="w-36 whitespace-nowrap"
            >
              Cập nhật
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
