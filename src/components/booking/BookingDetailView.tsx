import type { ReactNode } from "react";

import { Badge } from "@/components/ui/Badge";
import {
  ACTOR_TYPE_LABEL,
  BOOKING_STATUS_LABEL,
  INVOICE_STATUS_LABEL,
  NO_INVOICE_LABEL,
  PAYMENT_METHOD_LABEL,
} from "@/config/app";
import type { BookingAdminDetail, BookingStatusHistory } from "@/types";
import { formatCurrency, formatDate, formatDateTimeVN } from "@/utils";

interface BookingDetailViewProps {
  booking: BookingAdminDetail;
}

interface SectionProps {
  title: string;
  children: ReactNode;
}

interface InfoRowProps {
  label: string;
  children: ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <section>
      <h3 className="mb-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-gray-400">
        {title}
      </h3>
      <dl className="divide-y divide-gray-100">{children}</dl>
    </section>
  );
}

function InfoRow({ label, children }: InfoRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <dt className="text-[12px] text-gray-500">{label}</dt>
      <dd className="text-right text-[13px] font-medium text-gray-900">
        {children}
      </dd>
    </div>
  );
}

function formatTransition(entry: BookingStatusHistory): string {
  const next = BOOKING_STATUS_LABEL[entry.newStatus];
  if (!entry.oldStatus) return `Tạo mới → ${next}`;
  return `${BOOKING_STATUS_LABEL[entry.oldStatus]} → ${next}`;
}

function StatusTimeline({ history }: { history: BookingStatusHistory[] }) {
  return (
    <Section title="Lịch sử trạng thái">
      <ol className="space-y-3 border-l border-gray-200 pl-4 pt-2">
        {history.map((entry, index) => (
          <li key={`${entry.changedAt}-${index}`}>
            <p className="text-[13px] font-semibold text-gray-900">
              {formatTransition(entry)}
            </p>
            <p className="font-mono text-[11px] text-gray-500">
              {formatDateTimeVN(entry.changedAt)} ·{" "}
              {ACTOR_TYPE_LABEL[entry.actorType]}
              {entry.actorName ? ` · ${entry.actorName}` : ""}
            </p>
            {entry.reason && (
              <p className="mt-0.5 text-[12px] text-gray-600">
                Lý do: {entry.reason}
              </p>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}

function InvoiceSection({ invoice }: { invoice: BookingAdminDetail["invoice"] }) {
  if (!invoice) {
    return (
      <Section title="Hóa đơn">
        <p className="py-2 text-[13px] text-gray-500">{NO_INVOICE_LABEL}</p>
      </Section>
    );
  }

  return (
    <Section title="Hóa đơn">
      <InfoRow label="Mã hóa đơn">
        <span className="font-mono">{invoice.invoiceCode}</span>
      </InfoRow>
      <InfoRow label="Trạng thái">
        <Badge status={invoice.status}>
          {INVOICE_STATUS_LABEL[invoice.status]}
        </Badge>
      </InfoRow>
      <InfoRow label="Phương thức">
        {invoice.paymentMethod ? PAYMENT_METHOD_LABEL[invoice.paymentMethod] : "—"}
      </InfoRow>
      <InfoRow label="Thời điểm thu">
        {invoice.paidAt ? formatDateTimeVN(invoice.paidAt) : "—"}
      </InfoRow>
    </Section>
  );
}

export function BookingDetailView({ booking }: BookingDetailViewProps) {
  return (
    <div className="flex flex-col gap-5">
      <Section title="Thông tin đơn">
        <InfoRow label="Mã đơn">
          <span className="font-mono">{booking.bookingCode}</span>
        </InfoRow>
        <InfoRow label="Ngày tạo">
          <span className="font-mono">{formatDateTimeVN(booking.createdAt)}</span>
        </InfoRow>
        <InfoRow label="Trạng thái">
          <Badge status={booking.status}>
            {BOOKING_STATUS_LABEL[booking.status]}
          </Badge>
        </InfoRow>
        <InfoRow label="Sân">{booking.courtName}</InfoRow>
        <InfoRow label="Ngày chơi">
          <span className="font-mono">{formatDate(booking.date)}</span>
        </InfoRow>
        <InfoRow label="Khung giờ">
          <span className="font-mono">
            {booking.startTime} – {booking.endTime}
          </span>
        </InfoRow>
        <InfoRow label="Tổng tiền">
          <span className="font-mono">{formatCurrency(booking.totalCost)}</span>
        </InfoRow>
      </Section>

      <Section title="Khách hàng">
        <InfoRow label="Họ tên">{booking.customerName}</InfoRow>
        <InfoRow label="Số điện thoại">
          <span className="font-mono">{booking.customerPhone}</span>
        </InfoRow>
        <InfoRow label="Email">{booking.customerEmail}</InfoRow>
      </Section>

      <InvoiceSection invoice={booking.invoice} />
      <StatusTimeline history={booking.statusHistory} />
    </div>
  );
}