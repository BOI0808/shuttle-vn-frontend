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
import { cn, formatCurrency, formatDate, formatDateTimeVN } from "@/utils";

interface BookingDetailViewProps {
  booking: BookingAdminDetail;
  layout?: "grid" | "stack";
}

interface SectionProps {
  title: string;
  children: ReactNode;
  bordered?: boolean;
}

interface InfoRowProps {
  label: string;
  children: ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="space-y-2.5">
      <h3 className="font-sans text-[12px] font-semibold leading-[16px] text-ink-secondary">
        {title}
      </h3>
      <div className="rounded-[8px] border border-line bg-surface-bg p-4">
        {children}
      </div>
    </section>
  );
}

function FieldGrid({ children }: { children: ReactNode }) {
  return (
    <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">{children}</dl>
  );
}

function InfoRow({ label, children }: InfoRowProps) {
  return (
    <div className="min-w-0">
      <dt className="font-sans text-[12px] leading-[16px] text-ink-secondary">
        {label}
      </dt>
      <dd className="mt-0.5 whitespace-pre-wrap break-words font-sans text-[14px] font-medium leading-[20px] text-ink tabular-nums">
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
      <ol className="space-y-3 border-l-2 border-line pl-4">
        {history.map((entry, index) => (
          <li key={`${entry.changedAt}-${index}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[21px] top-1.5 size-[8px] rounded-full bg-brand"
            />
            <p className="font-sans text-[14px] font-semibold leading-[20px] text-ink">
              {formatTransition(entry)}
            </p>
            <p className="font-sans text-[12px] leading-[16px] text-ink-secondary tabular-nums">
              {formatDateTimeVN(entry.changedAt)} ·{" "}
              {ACTOR_TYPE_LABEL[entry.actorType]}
              {entry.actorName ? ` · ${entry.actorName}` : ""}
            </p>
            {entry.reason && (
              <p className="mt-1 font-sans text-[12px] leading-[16px] text-ink-secondary">
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
      <Section title="Hóa đơn liên quan">
        <Badge status="NoInvoice">{NO_INVOICE_LABEL}</Badge>
        <p className="mt-2 font-sans text-[12px] leading-[16px] text-ink-secondary">
          Hóa đơn chỉ được hệ thống tự động lập khi đơn được xác nhận hoặc hoàn thành.
        </p>
      </Section>
    );
  }

  return (
    <Section title="Hóa đơn liên quan">
      <FieldGrid>
        <InfoRow label="Mã hóa đơn">{invoice.invoiceCode}</InfoRow>
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
      </FieldGrid>
    </Section>
  );
}

export function BookingDetailView({ booking }: BookingDetailViewProps) {
  return (
    <article className="space-y-5">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Badge status={booking.status}>
          {BOOKING_STATUS_LABEL[booking.status]}
        </Badge>
        <p className="font-sans text-[14px] text-ink-secondary">
          Mã đơn:{" "}
          <span className="font-semibold text-ink tabular-nums">
            {booking.bookingCode}
          </span>
        </p>
      </div>

      <Section title="Thông tin đặt sân">
        <FieldGrid>
          <InfoRow label="Tên sân">{booking.courtName}</InfoRow>
          <InfoRow label="Tổng tiền">{formatCurrency(booking.totalCost)}</InfoRow>
          <InfoRow label="Ngày chơi">{formatDate(booking.date)}</InfoRow>
          <InfoRow label="Khung giờ">
            {booking.startTime}–{booking.endTime}
          </InfoRow>
          <InfoRow label="Ngày tạo">{formatDateTimeVN(booking.createdAt)}</InfoRow>
        </FieldGrid>
      </Section>

      <Section title="Thông tin khách hàng">
        <FieldGrid>
          <InfoRow label="Họ tên">{booking.customerName}</InfoRow>
          <InfoRow label="Số điện thoại">{booking.customerPhone}</InfoRow>
          <InfoRow label="Email">{booking.customerEmail}</InfoRow>
        </FieldGrid>
      </Section>

      <InvoiceSection invoice={booking.invoice} />
      <StatusTimeline history={booking.statusHistory} />
    </article>
  );
}