"use client";

import { useEffect, useId } from "react";
import { toast } from "sonner";

import { InvoicePaymentForm } from "@/components/payment/InvoicePaymentForm";
import { Button } from "@/components/ui/Button";
import { useInvoice } from "@/hooks";
import { cn, getErrorMessage } from "@/utils";

interface InvoicePaymentModalProps {
  id: string;
  onClose: () => void;
}

export function InvoicePaymentModal({ id, onClose }: InvoicePaymentModalProps) {
  const titleId = useId();
  const detail = useInvoice(id);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-[12px] border border-line bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2
            id={titleId}
            className="font-display text-[18px] font-medium leading-[26px] text-ink"
          >
            Xác nhận thu tiền
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="flex size-[36px] items-center justify-center rounded-[8px] text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          {detail.isPending && (
            <div role="status" aria-label="Đang tải thông tin hóa đơn" className="space-y-3">
              {["w-full", "w-3/4", "w-2/3"].map((width) => (
                <div
                  key={width}
                  className={cn("h-4 animate-pulse rounded-[4px] bg-surface-soft", width)}
                />
              ))}
            </div>
          )}

          {detail.isError && (
            <div className="space-y-4">
              <div
                role="alert"
                className="flex items-center gap-2.5 rounded-[8px] border border-line bg-status-danger-soft px-4 py-3 font-sans text-[14px] text-status-danger"
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  error
                </span>
                <p>{getErrorMessage(detail.error)}</p>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Đóng
                </Button>
                <Button type="button" onClick={() => void detail.refetch()}>
                  Thử lại
                </Button>
              </div>
            </div>
          )}

          {detail.data && (
            <InvoicePaymentForm
              key={id}
              invoice={detail.data}
              onCancel={onClose}
              onSuccess={() => {
                toast.success("Đã ghi nhận thu đủ tiền");
                onClose();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

