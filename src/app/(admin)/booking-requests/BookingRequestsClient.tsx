"use client";

import { useState } from "react";

import { BookingDetailModal } from "@/components/booking/BookingDetailModal";
import { ConfirmBookingModal } from "@/components/booking/ConfirmBookingModal";
import { RejectBookingModal } from "@/components/booking/RejectBookingModal";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { usePendingBookings } from "@/hooks";
import type { BookingListItem } from "@/types";
import { formatCurrency, formatDate, formatDateTimeVN, getErrorMessage } from "@/utils";

const PAGE_SIZE = 20;

type RowAction = { type: "confirm" | "reject"; booking: BookingListItem };

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
  const [rowAction, setRowAction] = useState<RowAction | null>(null);
  const { data, isLoading, isError, error } = usePendingBookings({
    pageNumber,
    pageSize: PAGE_SIZE,
  });

  const items = data?.items ?? [];

  return (
    <div className="flex flex-col gap-6">
      <p className="text-[13px] text-slate-500">
        Các đơn đang chờ xác nhận, đơn cũ nhất xếp trước.
      </p>

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
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="inline-flex w-auto"
                        onClick={() => setSelectedId(booking.bookingId)}
                      >
                        Chi tiết
                      </Button>
                      {booking.status === "Pending" && (
                        <>
                          <Button
                            type="button"
                            size="sm"
                            className="inline-flex w-auto"
                            onClick={() =>
                              setRowAction({ type: "confirm", booking })
                            }
                          >
                            Xác nhận
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="inline-flex w-auto border-red-300 text-red-600 hover:bg-red-50"
                            onClick={() =>
                              setRowAction({ type: "reject", booking })
                            }
                          >
                            Từ chối
                          </Button>
                        </>
                      )}
                    </div>
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

      {rowAction?.type === "confirm" && (
        <ConfirmBookingModal
          booking={rowAction.booking}
          action="confirm"
          onClose={() => setRowAction(null)}
        />
      )}
      {rowAction?.type === "reject" && (
        <RejectBookingModal
          booking={rowAction.booking}
          onClose={() => setRowAction(null)}
        />
      )}
    </div>
  );
}