"use client";

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
  const confirmClass =
    variant === "danger"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-amber-500 hover:bg-amber-600";

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-[2px] flex items-center justify-center z-[110]">
      <div className="bg-white border border-gray-200 rounded-xl w-[420px] max-w-[95vw] shadow-2xl">
        <div className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <span className="material-symbols-outlined text-amber-500 text-[26px]">
              warning
            </span>
            <div>
              <p className="font-bold text-[15px] text-gray-900">{title}</p>
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>
          </div>
          <div className="flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="border border-gray-300 text-gray-600 rounded-[7px] px-4 py-2 text-[13px] font-mono font-medium hover:bg-gray-50 disabled:opacity-60"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={`text-white rounded-[7px] px-4 py-2 text-[13px] font-mono font-medium disabled:opacity-60 ${confirmClass}`}
            >
              {isLoading ? "Đang xử lý..." : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
