"use client";

import { useRef, useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { useMyBookings } from "@/hooks/useBooking";
import { formatCurrency } from "@/utils";
import { ACCOUNT_STATUS_LABEL } from "@/config/app";

interface ProfileSidebarProps {
  onRequestDeactivate: () => void;
}

export function ProfileSidebar({ onRequestDeactivate }: ProfileSidebarProps) {
  const { user } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const { data: bookingsResponse } = useMyBookings();
  const bookings = bookingsResponse?.items ?? [];

  const totalBookings = bookings.length;
  const completedCount = bookings.filter(
    (b) => b.status === "COMPLETED"
  ).length;
  const cancelledCount = bookings.filter(
    (b) => b.status === "CANCELLED"
  ).length;
  const totalSpent = bookings
    .filter((b) => b.status === "COMPLETED")
    .reduce((sum, b) => sum + b.totalCost, 0);

  const fullName =
    user?.customer?.fullName ?? user?.employee?.fullName ?? "Người dùng";
  const initials = fullName.trim().charAt(0).toUpperCase();
  const accountStatus = user?.status ?? "ACTIVE";
  const createdAt = user?.customer?.createdAt ?? user?.createdAt;
  const memberSinceLabel = createdAt
    ? new Date(createdAt).toLocaleDateString("vi-VN", {
        month: "2-digit",
        year: "numeric",
      })
    : "--";

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
    // TODO: upload thật lên BE khi có endpoint /customers/avatar
  }

  return (
    <div className="flex flex-col gap-3.5">
      {/* Avatar card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] px-5 py-6 text-center">
        <div className="relative inline-block mb-3">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto"
            style={{
              background: avatarPreview
                ? `url(${avatarPreview}) center/cover`
                : "linear-gradient(135deg,#10b981,#059669)",
            }}
          >
            {!avatarPreview && initials}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[13px] text-white">
              photo_camera
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        <p className="text-base font-bold text-gray-900 mb-0.5">{fullName}</p>
        <p className="font-mono text-xs text-gray-400 mb-3.5">Khách hàng</p>

        <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-2.5 py-[3px]">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
          <span className="font-mono text-[11px] text-green-700">
            {ACCOUNT_STATUS_LABEL[accountStatus]}
          </span>
        </div>

        <p className="font-mono text-[11px] text-gray-400 mt-3">
          Thành viên từ {memberSinceLabel}
        </p>
      </div>

      {/* Stats */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] px-[18px] py-[18px]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-gray-500 font-mono mb-3">
          Thống kê
        </p>
        <div className="flex flex-col gap-2.5">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="material-symbols-outlined text-[14px]">
                sports_tennis
              </span>
              Tổng đặt sân
            </span>
            <span className="font-mono text-[15px] font-bold text-blue-600">
              {totalBookings}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="material-symbols-outlined text-[14px]">
                check_circle
              </span>
              Hoàn thành
            </span>
            <span className="font-mono text-[15px] font-bold text-green-600">
              {completedCount}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="material-symbols-outlined text-[14px]">
                cancel
              </span>
              Đã hủy
            </span>
            <span className="font-mono text-[15px] font-bold text-red-600">
              {cancelledCount}
            </span>
          </div>
          <div className="flex justify-between items-center border-t border-gray-100 pt-2.5">
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="material-symbols-outlined text-[14px]">
                payments
              </span>
              Tổng chi tiêu
            </span>
            <span className="font-mono text-sm font-bold text-emerald-600">
              {formatCurrency(totalSpent)}
            </span>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] px-[18px] py-[18px]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-red-600 font-mono mb-3">
          Vùng nguy hiểm
        </p>
        <button
          onClick={onRequestDeactivate}
          className="w-full flex items-center justify-center gap-1.5 bg-white border border-red-200 text-red-600 rounded-[7px] py-[9px] text-xs font-mono font-medium transition-colors duration-150 hover:bg-red-50"
        >
          <span className="material-symbols-outlined text-[15px]">
            no_accounts
          </span>
          Vô hiệu hóa tài khoản
        </button>
      </div>
    </div>
  );
}
