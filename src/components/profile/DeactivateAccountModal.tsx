"use client";

interface DeactivateAccountModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeactivateAccountModal({
  open,
  onClose,
  onConfirm,
}: DeactivateAccountModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-[400px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-50 border border-red-200 mb-3.5">
            <span className="material-symbols-outlined text-[24px] text-red-500">
              warning
            </span>
          </div>
          <h2 className="text-base font-bold text-gray-900 mb-1.5">
            Vô hiệu hóa tài khoản?
          </h2>
          <p className="text-[13px] text-gray-500 leading-relaxed">
            Tài khoản sẽ bị khóa và bạn không thể đăng nhập hoặc đặt sân. Liên
            hệ nhân viên để khôi phục.
          </p>
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={onClose}
            className="flex-1 bg-white border border-gray-300 rounded-[7px] py-[11px] text-gray-500 text-[13px] font-medium"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-red-200 text-red-600 rounded-[7px] py-[11px] text-[13px] font-medium transition-colors duration-150 hover:bg-red-50"
          >
            <span className="material-symbols-outlined text-[15px]">
              no_accounts
            </span>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
