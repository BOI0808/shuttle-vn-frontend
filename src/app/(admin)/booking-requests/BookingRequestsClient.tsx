"use client";

import { useState } from "react";

import { BookingDetailModal } from "@/components/booking/BookingDetailModal";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { usePendingBookings } from "@/hooks";
import { formatCurrency, formatDate, formatDateTimeVN, getErrorMessage } from "@/utils";

const PAGE_SIZE = 20;

const HEADERS = [
  "Mã đơn",
  "Thời điểm tạo",
  "Khách hàng",
  "Sân & giờ",
  "Tổng tiền",
];

export default function BookingRequestsClient() {
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data, isLoading, isError, error } = usePendingBookings({
    pageNumber,
    pageSize: PAGE_SIZE,
  });

  const items = data?.items ?? [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Yêu cầu đặt sân</h2>
        <p className="mt-1 text-[13px] text-slate-500">
          Các đơn đang chờ xác nhận, đơn cũ nhất xếp trước.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50/50 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                {HEADERS.map((header) => (
                  <th
                    key={header}
                    className="border-b border-slate-100 px-5 py-3 font-semibold"
                  >
                    {header}
                  </th>
                ))}
                <th className="border-b border-slate-100 px-5 py-3 text-right font-semibold">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading && (
                <tr>
                  <td
                    colSpan={HEADERS.length + 1}
                    className="px-5 py-8 text-center font-mono text-slate-500"
                  >
                    Đang tải...
                  </td>
                </tr>
              )}
              {isError && (
                <tr>
                  <td
                    colSpan={HEADERS.length + 1}
                    className="px-5 py-8 text-center text-sm text-red-600"
                  >
                    {getErrorMessage(error)}
                  </td>
                </tr>
              )}
              {data && items.length === 0 && (
                <tr>
                  <td
                    colSpan={HEADERS.length + 1}
                    className="px-5 py-8 text-center text-sm text-slate-500"
                  >
                    Không có yêu cầu đặt sân nào đang chờ xác nhận.
                  </td>
                </tr>
              )}
              {items.map((booking) => (
                <tr
                  key={booking.bookingId}
                  className="transition-colors hover:bg-slate-50"
                >
                  <td className="px-5 py-4 font-mono text-[12px] font-bold text-blue-600">
                    {booking.bookingCode}
                  </td>
                  <td className="px-5 py-4 font-mono text-[11px] text-slate-500">
                    {formatDateTimeVN(booking.createdAt)}
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-[13px] font-semibold text-slate-900">
                      {booking.customerName}
                    </p>
                    <p className="font-mono text-[11px] text-slate-500">
                      {booking.customerPhone}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-[13px] text-slate-700">
                      {booking.courtName}
                    </p>
                    <p className="font-mono text-[11px] text-slate-500">
                      {formatDate(booking.date)} · {booking.startTime} –{" "}
                      {booking.endTime}
                    </p>
                  </td>
                  <td className="px-5 py-4 font-mono text-[12px] font-bold text-slate-900">
                    {formatCurrency(booking.totalCost)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="inline-flex w-auto"
                      onClick={() => setSelectedId(booking.bookingId)}
                    >
                      Chi tiết
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {data && <Pagination page={data} onPageChange={setPageNumber} />}

      {selectedId && (
        <BookingDetailModal
          bookingId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}