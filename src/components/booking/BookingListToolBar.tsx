"use client";

import { cn } from "@/utils";
import type { BookingStatus } from "@/types";

type TabValue = "all" | BookingStatus;

interface Tab {
  value: TabValue;
  label: string;
}

const TABS: Tab[] = [
  { value: "all", label: "Tất cả" },
  { value: "PENDING", label: "Chờ xác nhận" },
  { value: "CONFIRMED", label: "Đã xác nhận" },
  { value: "COMPLETED", label: "Hoàn thành" },
  { value: "CANCELLED", label: "Đã hủy" },
];

interface BookingListToolbarProps {
  activeTab: TabValue;
  onTabChange: (tab: TabValue) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export function BookingListToolbar({
  activeTab,
  onTabChange,
  search,
  onSearchChange,
}: BookingListToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      {/* Tabs */}
      <div className="flex gap-0.5 bg-slate-100 rounded-[9px] p-[3px]">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={cn(
              "px-[15px] py-[7px] text-xs font-mono font-medium rounded-[7px] transition-all duration-150 whitespace-nowrap",
              activeTab === tab.value
                ? "bg-white text-gray-900 shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                : "text-slate-500 hover:text-gray-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <span className="material-symbols-outlined text-[16px] text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
          search
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm theo mã đặt sân..."
          className="w-60 bg-white border border-gray-200 rounded-lg text-[#1a1a2e] text-[13px] pl-[34px] pr-3 py-2 outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-gray-400 focus:border-emerald-500 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]"
        />
      </div>
    </div>
  );
}
