"use client";

import { useEffect, useId } from "react";
import { toast } from "sonner";

import { InvoicePaymentForm } from "@/components/payment/InvoicePaymentForm";
import {
  OperationsErrorCard,
  OperationsLoadingCard,
} from "@/components/ui/OperationsState";
import { useInvoice } from "@/hooks";
import { getErrorMessage } from "@/utils";

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
          {detail.isPending && <OperationsLoadingCard embedded rows={3} />}

          {detail.isError && (
            <OperationsErrorCard
              embedded
              title="Không thể tải thông tin hóa đơn"
              message={getErrorMessage(detail.error)}
              onRetry={() => void detail.refetch()}
            />
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

