"use client";

import { useEffect, useId } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils";

interface ConfirmDialogProps {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning";
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  title,
  description,
  confirmLabel = "Xác nhận",
  cancelLabel = "Huỷ",
  variant = "warning",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isLoading) {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLoading, onCancel]);

  const isDanger = variant === "danger";

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/40 p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) onCancel();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="w-[420px] max-w-[95vw] rounded-[12px] border border-line bg-white p-6 shadow-xl"
      >
        <div className="mb-5 flex items-start gap-3.5">
          <div
            className={cn(
              "flex size-[40px] shrink-0 items-center justify-center rounded-[8px]",
              isDanger
                ? "bg-status-danger-soft text-status-danger"
                : "bg-status-warning-soft text-status-warning"
            )}
          >
            <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
              warning
            </span>
          </div>
          <div>
            <h2
              id={titleId}
              className="font-display text-[18px] font-medium leading-[26px] text-ink"
            >
              {title}
            </h2>
            <p
              id={descId}
              className="mt-1 font-sans text-[14px] leading-[20px] text-ink-secondary"
            >
              {description}
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-2.5">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={isDanger ? "danger" : "primary"}
            onClick={onConfirm}
            loading={isLoading}
            className={
              !isDanger
                ? "bg-status-warning text-white hover:bg-[#8A4A09] active:bg-[#733D07]"
                : undefined
            }
          >
            {isLoading ? "Đang xử lý..." : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
