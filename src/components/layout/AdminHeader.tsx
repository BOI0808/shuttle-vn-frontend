"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { QuickLookupModal } from "@/components/booking/QuickLookupModal";
import { Button } from "@/components/ui/Button";

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname();
  const [isLookupOpen, setIsLookupOpen] = useState(false);

  useEffect(() => {
    setIsLookupOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsLookupOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getTitle = () => {
    if (pathname.startsWith("/employees") || pathname.startsWith("/staff"))
      return "Quản lý nhân viên";
    if (pathname.startsWith("/customers")) return "Quản lý khách hàng";
    if (pathname.startsWith("/manage-courts") || pathname.startsWith("/courts"))
      return "Quản lý sân";
    if (pathname.startsWith("/dashboard")) return null;
    if (pathname.startsWith("/schedule")) return "Lịch sân";
    if (pathname.startsWith("/payments")) return "Xác nhận thanh toán";
    if (pathname.startsWith("/booking-requests")) return "Yêu cầu đặt sân";
    if (pathname.startsWith("/statistics")) return "Báo cáo & Thống kê";
    if (pathname.startsWith("/all-bookings") || pathname.startsWith("/bookings"))
      return "Đặt sân toàn hệ thống";
    if (pathname.startsWith("/audits")) return "Nhật ký hoạt động";
    return null;
  };

  const subTitle = getTitle();

  return (
    <header className="sticky top-0 z-50 flex h-[56px] items-center justify-between gap-4 border-b border-line bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Mở menu điều hướng"
            className="inline-flex size-[40px] shrink-0 items-center justify-center rounded-[8px] border border-line-strong bg-white text-ink-secondary transition-colors hover:bg-surface-bg hover:text-ink lg:hidden"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              menu
            </span>
          </button>
        )}
        <p className="truncate font-sans text-[14px] font-normal leading-[20px] text-ink-secondary">
          Không gian quản trị
          {subTitle ? (
            <span className="text-ink-muted"> / {subTitle}</span>
          ) : null}
        </p>
      </div>

      <div id="admin-header-actions" className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsLookupOpen(true)}
          aria-label="Tra cứu nhanh (Ctrl K)"
          className="flex h-[40px] items-center justify-between gap-3 rounded-[8px] border border-line-strong bg-white px-3 text-left transition-colors hover:border-ink-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:w-[334px]"
        >
          <span className="flex items-center gap-2.5">
            <span
              className="material-symbols-outlined text-[20px] text-ink-secondary"
              aria-hidden="true"
            >
              search
            </span>
            <span className="hidden font-sans text-[14px] leading-[20px] text-ink sm:inline">
              Tra cứu nhanh
            </span>
          </span>
          <kbd className="hidden h-[24px] items-center justify-center rounded-[4px] bg-surface-soft px-3 font-sans text-[12px] font-normal leading-[16px] text-ink-secondary sm:inline-flex">
            Ctrl K
          </kbd>
        </button>
      </div>

      {isLookupOpen && (
        <QuickLookupModal onClose={() => setIsLookupOpen(false)} />
      )}
    </header>
  );
}
