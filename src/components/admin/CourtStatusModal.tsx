"use client";

import { useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Badge } from "@/components/ui/Badge";
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

const OPTIONS: { value: CourtStatus; title: string; hint: string }[] = [
  {
    value: "Active",
    title: "Active · Hoạt động",
    hint: "Nhận đặt sân bình thường",
  },
  {
    value: "Maintenance",
    title: "Maintenance · Bảo trì",
    hint: "Tạm ngưng nhận đặt sân mới để bảo trì",
  },
  {
    value: "Closed",
    title: "Closed · Đóng",
    hint: "Ngừng hoạt động, không nhận đặt sân mới",
  },
];

interface CourtStatusModalProps {
  court: Court;
  onClose: () => void;
}

export function CourtStatusModal({ court, onClose }: CourtStatusModalProps) {
  const titleId = useId();
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !mutation.isPending) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mutation.isPending, onClose]);

  const onSubmit = ({ status, reason }: FormData) => {
    mutation.mutate(
      {
        id: court.courtId,
        payload: { status, reason: reason?.trim() || undefined },
      },
      {
        onSuccess: () => {
          toast.success("Đã cập nhật trạng thái sân");
          onClose();
        },
        onError: (error) => toast.error(getErrorMessage(error)),
      }
    );
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
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-[664px] max-h-[90vh] overflow-y-auto rounded-[12px] border border-line bg-white shadow-xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
          <div>
            <h2
              id={titleId}
              className="font-display text-[18px] font-medium leading-[26px] text-ink"
            >
              Đổi trạng thái · {court.name}
            </h2>
            <p className="mt-1 font-sans text-[12px] leading-[16px] text-ink-secondary">
              Trạng thái hiện tại: {COURT_STATUS_LABEL[court.status] || court.status}
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 p-6">
            <div className="flex flex-col gap-2">
              <Label required>Trạng thái mới</Label>
              {OPTIONS.map((o) => {
                const isSelected = selected === o.value;
                return (
                  <label
                    key={o.value}
                    className={cn(
                      "flex min-h-[56px] cursor-pointer items-center justify-between gap-3 rounded-[8px] border px-3.5 py-2.5 transition-colors",
                      isSelected
                        ? "border-brand bg-brand-soft/40"
                        : "border-line bg-surface-bg hover:border-line-strong"
                    )}
                  >
                    <span className="flex items-start gap-3">
                      <input
                        type="radio"
                        value={o.value}
                        className="mt-1 size-4 accent-brand"
                        {...register("status")}
                      />
                      <span>
                        <span className="block font-sans text-[14px] font-semibold leading-[20px] text-ink">
                          {o.title}
                        </span>
                        <span className="block font-sans text-[12px] leading-[16px] text-ink-secondary">
                          {o.hint}
                        </span>
                      </span>
                    </span>
                    <Badge status={o.value}>
                      {COURT_STATUS_LABEL[o.value] || o.value}
                    </Badge>
                  </label>
                );
              })}
            </div>

            {selected !== "Active" && !isUnchanged && (
              <div
                role="status"
                className="rounded-[8px] border border-status-warning/30 bg-status-warning-soft px-3.5 py-2.5 font-sans text-[12px] leading-[18px] text-status-warning"
              >
                Các đơn đặt sân hiện có (Chờ xác nhận / Đã xác nhận) được giữ
                nguyên và không bị hủy tự động. Nhân viên cần chủ động liên hệ
                khách hàng.
              </div>
            )}

            <div>
              <Label htmlFor="court-status-reason">Lý do (tùy chọn)</Label>
              <textarea
                id="court-status-reason"
                rows={3}
                placeholder="VD: Thay lưới, sửa sàn..."
                className="w-full resize-none rounded-[8px] border border-line-strong bg-white px-3.5 py-2.5 font-sans text-[14px] leading-[20px] text-ink placeholder:text-ink-muted outline-none transition-colors duration-150 focus:border-brand focus:ring-2 focus:ring-brand/20"
                {...register("reason")}
              />
              {errors.reason && (
                <p className="mt-1 font-sans text-[12px] leading-[16px] text-status-danger">
                  {errors.reason.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-b-[12px] border-t border-line bg-surface-bg px-6 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={mutation.isPending}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={mutation.isPending}
              disabled={isUnchanged}
            >
              Lưu trạng thái
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
