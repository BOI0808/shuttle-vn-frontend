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

interface CustomerBookingsCardProps {
  customerId: string;
}

export function CustomerBookingsCard({
  customerId,
}: CustomerBookingsCardProps) {
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data, isLoading, isError, error, refetch } = useCustomerBookings(
    customerId,
    {
      pageNumber,
      pageSize: PAGE_SIZE,
    }
  );

  const items = data?.items ?? [];

  return (
    <div className="flex flex-col gap-4">
      <section className="overflow-hidden rounded-[12px] border border-line bg-white">
        <div className="px-5 py-4">
          <h2 className="font-display text-[18px] font-medium leading-[26px] text-ink">
            Lịch sử đặt sân
          </h2>
          <p className="mt-1 font-sans text-[12px] leading-[16px] text-ink-secondary">
            Chỉ hiển thị lịch sử của khách hàng đang xem.
          </p>
        </div>

        {isLoading ? (
          <div aria-busy="true">
            <div className="hidden h-[44px] grid-cols-4 items-center border-y border-line bg-status-info-soft px-5 font-sans text-[12px] font-semibold text-ink-secondary md:grid">
              <span>Sân</span>
              <span>Ngày / Khung giờ</span>
              <span>Trạng thái</span>
              <span>Thanh toán</span>
            </div>
            <div className="space-y-4 p-5">
              {[0, 1].map((row) => (
                <div
                  key={row}
                  className="grid grid-cols-1 gap-3 py-1 animate-pulse md:grid-cols-4"
                >
                  <div className="h-[16px] w-36 rounded-[8px] bg-surface-soft" />
                  <div className="h-[16px] w-52 rounded-[8px] bg-surface-soft" />
                  <div className="h-[16px] w-32 rounded-[8px] bg-surface-soft" />
                  <div className="h-[16px] w-40 rounded-[8px] bg-surface-soft" />
                </div>
              ))}
              <p className="font-sans text-[12px] leading-[16px] text-ink-secondary">
                Đang tải lịch sử đặt sân…
              </p>
            </div>
          </div>
        ) : isError ? (
          <div role="alert" className="border-t border-line p-6">
            <div className="flex size-[40px] items-center justify-center rounded-[8px] bg-status-danger-soft text-status-danger">
              <span
                className="material-symbols-outlined text-[24px]"
                aria-hidden="true"
              >
                warning
              </span>
            </div>
            <p className="mt-3 font-sans text-[14px] font-semibold text-ink">
              Không thể tải lịch sử đặt sân
            </p>
            <p className="mt-1 font-sans text-[14px] text-ink-secondary">
              {getErrorMessage(error)}
            </p>
            <div className="mt-4">
              <Button type="button" variant="primary" onClick={() => refetch()}>
                Thử lại
              </Button>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center border-t border-line px-6 py-10 text-center">
            <div className="flex size-[48px] items-center justify-center rounded-[12px] bg-brand-soft text-brand-strong">
              <span
                className="material-symbols-outlined text-[24px]"
                aria-hidden="true"
              >
                event_note
              </span>
            </div>
            <p className="mt-3 font-sans text-[14px] font-semibold text-ink">
              Khách hàng chưa có đơn đặt sân nào
            </p>
            <p className="mt-1 font-sans text-[12px] text-ink-secondary">
              Các đơn đặt sân của khách hàng sẽ hiển thị tại đây.
            </p>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="h-[44px] border-y border-line bg-status-info-soft font-sans text-[12px] font-semibold leading-[16px] text-ink-secondary">
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Mã đơn
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Sân &amp; giờ
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-right font-semibold"
                    >
                      Tổng tiền
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Trạng thái
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Thanh toán
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-right font-semibold"
                    >
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {items.map((booking) => (
                    <tr
                      key={booking.bookingId}
                      className="transition-colors duration-100 hover:bg-surface-bg"
                    >
                      <td className="px-5 py-4 align-middle font-sans text-[14px] font-semibold text-brand-strong tabular-nums">
                        {booking.bookingCode}
                      </td>
                      <td className="px-5 py-4 align-middle">
                        <p className="font-sans text-[14px] font-medium leading-[20px] text-ink">
                          {booking.courtName}
                        </p>
                        <p className="font-sans text-[12px] leading-[16px] text-ink-secondary tabular-nums">
                          {formatDate(booking.date)} · {booking.startTime} –{" "}
                          {booking.endTime}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-right align-middle font-sans text-[14px] font-medium text-ink tabular-nums">
                        {formatCurrency(booking.totalCost)}
                      </td>
                      <td className="px-5 py-4 align-middle">
                        <Badge status={booking.status}>
                          {BOOKING_STATUS_LABEL[booking.status]}
                        </Badge>
                      </td>
                      <td className="px-5 py-4 align-middle">
                        {booking.paymentStatus ? (
                          <Badge status={booking.paymentStatus}>
                            {INVOICE_STATUS_LABEL[booking.paymentStatus]}
                          </Badge>
                        ) : (
                          <Badge status="NoInvoice">{NO_INVOICE_LABEL}</Badge>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right align-middle">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
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

            <div className="divide-y divide-line border-t border-line md:hidden">
              {items.map((booking) => (
                <div key={booking.bookingId} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-sans text-[14px] font-semibold text-brand-strong tabular-nums">
                        {booking.bookingCode}
                      </p>
                      <p className="mt-0.5 font-sans text-[14px] font-medium text-ink">
                        {booking.courtName}
                      </p>
                      <p className="font-sans text-[12px] text-ink-secondary tabular-nums">
                        {formatDate(booking.date)} · {booking.startTime} –{" "}
                        {booking.endTime}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge status={booking.status}>
                        {BOOKING_STATUS_LABEL[booking.status]}
                      </Badge>
                      {booking.paymentStatus ? (
                        <Badge status={booking.paymentStatus}>
                          {INVOICE_STATUS_LABEL[booking.paymentStatus]}
                        </Badge>
                      ) : (
                        <Badge status="NoInvoice">{NO_INVOICE_LABEL}</Badge>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="font-sans text-[14px] font-medium text-ink tabular-nums">
                      {formatCurrency(booking.totalCost)}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedId(booking.bookingId)}
                    >
                      Chi tiết
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

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
