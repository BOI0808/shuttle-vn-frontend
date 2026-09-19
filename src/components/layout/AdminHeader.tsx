"use client";

import { usePathname } from "next/navigation";

export function AdminHeader() {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname.startsWith("/staff")) return "Quản lý nhân viên";
    if (pathname.startsWith("/courts")) return "Quản lý sân";
    if (pathname.startsWith("/dashboard")) return "Bảng điều khiển";
    return "Admin Panel";
  };

  const isStaffPage = pathname.startsWith("/staff");

  return (
    <header className="h-[52px] bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      {/* Tiêu đề bên trái */}
      <span className="font-bold text-[16px] text-gray-900">{getTitle()}</span>

      {/* Nút Thêm nhân viên bên góc phải (thiết kế theo mẫu) */}
      {isStaffPage && (
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("open-add-employee"))
          }
          className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-gray-700 bg-white border border-gray-300 rounded-[8px] hover:bg-gray-50 hover:border-gray-400 shadow-sm transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[17px] text-gray-600">
            person_add
          </span>
          Thêm nhân viên
        </button>
      )}
    </header>
  );
}
