import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";

import {
  ACCOUNT_STATUS_LABEL,
  BOOKING_STATUS_LABEL,
  INVOICE_STATUS_LABEL,
  NO_INVOICE_LABEL,
} from "@/config/app";
import type { BookingListItem, CustomerListItem, QuickLookupResult } from "@/types";
import { formatCurrency, formatDate } from "@/utils";

const HEADERS = [
  "Mã đơn",
  "Sân",
  "Ngày giờ",
  "Tổng tiền",
  "Trạng thái",
  "Thanh toán",
];

interface QuickLookupResultsProps {
  result: QuickLookupResult;
  onSelectBooking: (bookingId: string) => void;
  onPageChange: (pageNumber: number) => void;
}

function CustomerCard({ customer }: { customer: CustomerListItem }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-[12px] border border-line bg-white px-5 py-4">
      <div>
        <p className="font-sans text-[14px] font-semibold leading-[20px] text-ink">
          {customer.fullName}
        </p>
        <p className="font-sans text-[12px] leading-[16px] text-ink-secondary tabular-nums">
          {customer.phone}
        </p>
        <p className="font-sans text-[12px] leading-[16px] text-ink-secondary">
          {customer.email}
        </p>
      </div>
      {customer.accountStatus ? (
        <Badge status={customer.accountStatus}>
          {ACCOUNT_STATUS_LABEL[customer.accountStatus] ?? "—"}
        </Badge>
      ) : (
        <span className="font-sans text-[14px] text-ink-secondary">—</span>
      )}
    </div>
  );
}

function PaymentCell({ status }: { status: BookingListItem["paymentStatus"] }) {
  if (!status) {
    return <Badge status="NoInvoice">{NO_INVOICE_LABEL}</Badge>;
  }
  return <Badge status={status}>{INVOICE_STATUS_LABEL[status] ?? "—"}</Badge>;
}

export function QuickLookupResults({
  result,
  onSelectBooking,
  onPageChange,
}: QuickLookupResultsProps) {
  const { customers, bookings } = result;

  return (
    <div className="flex flex-col gap-5">
      {customers.length > 0 && (
        <section className="flex flex-col gap-2">
          <h3 className="font-sans text-[12px] font-semibold leading-[16px] text-ink-secondary">
            Khách hàng
          </h3>
          {customers.map((customer) => (
            <CustomerCard key={customer.customerId} customer={customer} />
          ))}
        </section>
      )}

      <section className="flex flex-col gap-2">
        <h3 className="font-sans text-[12px] font-semibold leading-[16px] text-ink-secondary">
          Đặt sân
        </h3>
        {bookings.items.length === 0 ? (
          <p className="rounded-[12px] border border-line bg-white px-5 py-6 text-center font-sans text-[14px] text-ink-secondary">
            Chưa có đặt sân nào.
          </p>
        ) : (
          <div className="overflow-hidden rounded-[12px] border border-line bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="h-[40px] border-b border-line bg-status-info-soft font-sans text-[12px] font-semibold leading-[16px] text-ink-secondary">
                    {HEADERS.map((header) => (
                      <th
                        key={header}
                        scope="col"
                        className={
                          header === "Tổng tiền"
                            ? "whitespace-nowrap px-4 text-right"
                            : "whitespace-nowrap px-4"
                        }
                      >
                        {header}
                      </th>
                    ))}
                    <th scope="col" className="whitespace-nowrap px-4 text-right">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {bookings.items.map((booking) => (
                    <tr
                      key={booking.bookingId}
                      className="transition-colors duration-100 hover:bg-surface-bg"
                    >
                      <td className="whitespace-nowrap px-4 py-3 font-sans text-[14px] font-semibold text-brand-strong tabular-nums">
                        {booking.bookingCode}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-sans text-[14px] text-ink">
                        {booking.courtName}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-sans text-[14px] text-ink-secondary tabular-nums">
                        {formatDate(booking.date)} · {booking.startTime}–
                        {booking.endTime}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right font-sans text-[14px] font-semibold text-ink tabular-nums">
                        {formatCurrency(booking.totalCost)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <Badge status={booking.status}>
                          {BOOKING_STATUS_LABEL[booking.status] ?? "—"}
                        </Badge>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <PaymentCell status={booking.paymentStatus} />
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          aria-label={`Xem chi tiết đơn ${booking.bookingCode}`}
                          className="whitespace-nowrap"
                          onClick={() => onSelectBooking(booking.bookingId)}
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
        )}
        <Pagination page={bookings} onPageChange={onPageChange} />
      </section>
    </div>
  );
}