"use client";

import { useEffect, useId } from "react";

import { InvoiceEvidence } from "@/components/payment/InvoiceEvidence";
import { Button } from "@/components/ui/Button";
import { useInvoice } from "@/hooks";
import { cn, getErrorMessage } from "@/utils";

interface InvoiceDetailModalProps {
  id: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}

function DetailSkeleton() {
  return (
    <div role="status" aria-label="Đang tải chi tiết hóa đơn" className="space-y-3">
      {["w-full", "w-3/4", "w-2/3"].map((width) => (
        <div
          key={width}
          className={cn("h-3.5 animate-pulse rounded-[4px] bg-surface-soft", width)}
        />
      ))}
    </div>
  );
}

export function InvoiceDetailModal({
  id,
  onSelect,
  onClose,
}: InvoiceDetailModalProps) {
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
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[12px] border border-line bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2
            id={titleId}
            className="font-display text-[18px] font-medium leading-[26px] text-ink"
          >
            Chi tiết hóa đơn
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

        <div className="space-y-5 overflow-y-auto p-6">
          {detail.isPending && <DetailSkeleton />}
          {detail.isError && (
            <div
              role="alert"
              className="flex flex-wrap items-center justify-between gap-3 rounded-[8px] border border-line bg-status-danger-soft px-4 py-3 font-sans text-[14px] text-status-danger"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  error
                </span>
                <p>{getErrorMessage(detail.error)}</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => void detail.refetch()}
              >
                Thử lại
              </Button>
            </div>
          )}
          {detail.data && (
            <InvoiceEvidence invoice={detail.data} onSelect={onSelect} />
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-line bg-surface-bg px-6 py-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
}

