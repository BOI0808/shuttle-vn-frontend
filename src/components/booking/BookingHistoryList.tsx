"use client";

import { useMemo, useState } from "react";
import { useMyBookings } from "@/hooks/useBooking";
import { BookingListToolbar } from "./BookingListToolBar";
import { BookingCard } from "./BookingCard";
import type { BookingStatus, Booking } from "@/types";

type TabValue = "all" | BookingStatus;

export function BookingHistoryList() {
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const [search, setSearch] = useState("");

  const { data: response, isLoading, isError } = useMyBookings();
  const bookings = response?.items ?? [];

  const filtered: Booking[] = useMemo(() => {
    return bookings.filter((b) => {
      const matchTab = activeTab === "all" || b.status === activeTab;
      const matchSearch = b.bookingCode
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchTab && matchSearch;
    });
  }, [bookings, activeTab, search]);

  function handleViewDetail(id: string) {
    // TODO: mở modal / navigate tới trang chi tiết
    console.log("Xem chi tiết", id);
  }
  function handleReschedule(id: string) {
    // TODO: mở modal đổi lịch
    console.log("Đổi lịch", id);
  }
  function handleCancel(id: string) {
    // TODO: xác nhận + gọi useCancelBooking()
    console.log("Hủy đặt", id);
  }
  function handleViewInvoice(id: string) {
    // TODO: mở modal / navigate tới hóa đơn
    console.log("Xem hóa đơn", id);
  }

  return (
    <div className="flex flex-col gap-5">
      <BookingListToolbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        search={search}
        onSearchChange={setSearch}
      />

      <div className="flex flex-col gap-2.5">
        {isLoading && (
          <div className="text-center py-12 text-sm text-gray-400">
            Đang tải lịch sử đặt sân...
          </div>
        )}

        {isError && (
          <div className="text-center py-12 text-sm text-red-400">
            Không thể tải dữ liệu. Vui lòng thử lại.
          </div>
        )}

        {!isLoading && !isError && filtered.length === 0 && (
          <div className="text-center py-12 px-6 text-gray-400">
            <span className="material-symbols-outlined text-[40px] text-gray-300 block mb-2.5">
              search_off
            </span>
            <p className="text-sm m-0">Không tìm thấy đơn đặt sân nào</p>
          </div>
        )}

        {!isLoading &&
          !isError &&
          filtered.map((booking) => (
            <BookingCard
              key={booking.bookingId}
              booking={booking}
              onViewDetail={handleViewDetail}
              onReschedule={handleReschedule}
              onCancel={handleCancel}
              onViewInvoice={handleViewInvoice}
            />
          ))}
      </div>

      {/* Info note */}
      <div className="flex items-start gap-2.5 px-4 py-3 bg-green-50 border border-green-200 rounded-[10px] text-xs text-green-800 leading-relaxed">
        <span className="material-symbols-outlined text-[16px] text-green-600 flex-shrink-0 mt-px">
          info
        </span>
        <p className="m-0">
          Bạn có thể <strong>hủy</strong> hoặc <strong>đổi lịch</strong> đặt sân
          nếu thực hiện{" "}
          <strong className="text-amber-600">
            trước giờ bắt đầu ít nhất 1 tiếng
          </strong>
          . Vui lòng liên hệ nhân viên nếu cần hỗ trợ.
        </p>
      </div>
    </div>
  );
}
