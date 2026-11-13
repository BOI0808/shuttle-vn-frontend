"use client";

import { useEffect } from "react";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Lỗi render trang:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="material-symbols-outlined text-[48px] text-gray-300">
        error
      </span>
      <h1 className="font-display text-xl font-bold text-gray-900">
        Trang này gặp sự cố
      </h1>
      <p className="max-w-md text-sm text-gray-500">
        Đã có lỗi xảy ra khi hiển thị trang này. Vui lòng thử lại, nếu lỗi vẫn
        tiếp tục hãy liên hệ hotline để được hỗ trợ.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
      >
        Thử lại
      </button>
    </div>
  );
}
