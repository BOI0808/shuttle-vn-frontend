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
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4">
      <div>
        <p className="text-[13px] font-bold text-slate-900">{customer.fullName}</p>
        <p className="font-mono text-[11px] text-slate-500">{customer.phone}</p>
        <p className="text-[11px] text-slate-500">{customer.email}</p>
      </div>
      {customer.accountStatus ? (
        <Badge status={customer.accountStatus}>
          {ACCOUNT_STATUS_LABEL[customer.accountStatus] ?? "—"}
        </Badge>
      ) : (
        <span className="text-[13px] text-slate-500">—</span>
      )}
    </div>
  );
}

function PaymentCell({ status }: { status: BookingListItem["paymentStatus"] }) {
  if (!status) {
    return <span className="text-[12px] text-slate-500">{NO_INVOICE_LABEL}</span>;
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
          <h3 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Khách hàng
          </h3>
          {customers.map((customer) => (
            <CustomerCard key={customer.customerId} customer={customer} />
          ))}
        </section>
      )}

      <section className="flex flex-col gap-2">
        <h3 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Đặt sân
        </h3>
        {bookings.items.length === 0 ? (
          <p className="rounded-xl border border-slate-200 bg-white px-5 py-6 text-center text-sm text-slate-500">
            Chưa có đặt sân nào.
          </p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-slate-50/50 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                    {HEADERS.map((header) => (
                      <th
                        key={header}
                        scope="col"
                        className="border-b border-slate-100 px-4 py-3 font-semibold"
                      >
                        {header}
                      </th>
                    ))}
                    <th
                      scope="col"
                      className="border-b border-slate-100 px-4 py-3 text-right font-semibold"
                    >
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.items.map((booking) => (
                    <tr
                      key={booking.bookingId}
                      className="transition-colors hover:bg-slate-50"
                    >
                      <td className="px-4 py-3 font-mono text-[12px] font-bold text-blue-600">
                        {booking.bookingCode}
                      </td>
                      <td className="px-4 py-3 text-[13px] text-slate-700">
                        {booking.courtName}
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-slate-500">
                        {formatDate(booking.date)} · {booking.startTime} –{" "}
                        {booking.endTime}
                      </td>
                      <td className="px-4 py-3 font-mono text-[12px] font-bold text-slate-900">
                        {formatCurrency(booking.totalCost)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge status={booking.status}>
                          {BOOKING_STATUS_LABEL[booking.status] ?? "—"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <PaymentCell status={booking.paymentStatus} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="inline-flex w-auto"
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