"use client";

import { useState } from "react";

import { BookingDetailModal } from "@/components/booking/BookingDetailModal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { useCustomerBookings } from "@/hooks";
import {
  BOOKING_STATUS_LABEL,
  INVOICE_STATUS_LABEL,
  NO_INVOICE_LABEL,
} from "@/config/app";
import { formatCurrency, formatDate, getErrorMessage } from "@/utils";

const PAGE_SIZE = 10;
const HEADERS = ["Mã đơn", "Sân & giờ", "Tổng tiền", "Trạng thái", "Thanh toán"];

interface CustomerBookingsCardProps {
  customerId: string;
}

export function CustomerBookingsCard({
  customerId,
}: CustomerBookingsCardProps) {
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data, isLoading, isError, error } = useCustomerBookings(customerId, {
    pageNumber,
    pageSize: PAGE_SIZE,
  });

  const items = data?.items ?? [];

  return (
    <div>
      <h3 className="mb-3 text-[15px] font-bold text-slate-900">
        Lịch sử đặt sân
      </h3>
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
                    Khách hàng chưa có đơn đặt sân nào.
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
                    <Badge status={booking.status}>
                      {BOOKING_STATUS_LABEL[booking.status]}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    {booking.paymentStatus ? (
                      <Badge status={booking.paymentStatus}>
                        {INVOICE_STATUS_LABEL[booking.paymentStatus]}
                      </Badge>
                    ) : (
                      <span className="text-[12px] text-slate-500">
                        {NO_INVOICE_LABEL}
                      </span>
                    )}
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