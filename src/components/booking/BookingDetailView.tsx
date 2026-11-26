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

function Section({ title, children, bordered = false }: SectionProps) {
  return (
    <section
      className={cn(
        bordered && "rounded-[12px] border border-line bg-white p-5"
      )}
    >
      <h3 className="mb-3 font-display text-[18px] font-medium leading-[26px] text-ink">
        {title}
      </h3>
      <dl className="divide-y divide-line">{children}</dl>
    </section>
  );
}

function InfoRow({ label, children }: InfoRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <dt className="font-sans text-[14px] leading-[20px] text-ink-secondary">
        {label}
      </dt>
      <dd className="text-right font-sans text-[14px] font-medium leading-[20px] text-ink">
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

function StatusTimeline({
  history,
  bordered,
}: {
  history: BookingStatusHistory[];
  bordered: boolean;
}) {
  return (
    <Section title="Lịch sử trạng thái" bordered={bordered}>
      <ol className="space-y-3 border-l-2 border-line pl-4 pt-1">
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

function InvoiceSection({
  invoice,
  bordered,
}: {
  invoice: BookingAdminDetail["invoice"];
  bordered: boolean;
}) {
  if (!invoice) {
    return (
      <Section title="Hóa đơn liên quan" bordered={bordered}>
        <div className="py-2">
          <Badge status="NoInvoice">{NO_INVOICE_LABEL}</Badge>
          <p className="mt-2 font-sans text-[12px] leading-[16px] text-ink-secondary">
            Hóa đơn chỉ được hệ thống tự động lập khi đơn được xác nhận hoặc hoàn thành.
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section title="Hóa đơn liên quan" bordered={bordered}>
      <InfoRow label="Mã hóa đơn">
        <span className="tabular-nums">{invoice.invoiceCode}</span>
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
        <span className="tabular-nums">
          {invoice.paidAt ? formatDateTimeVN(invoice.paidAt) : "—"}
        </span>
      </InfoRow>
    </Section>
  );
}

export function BookingDetailView({
  booking,
  layout = "stack",
}: BookingDetailViewProps) {
  const isGrid = layout === "grid";

  return (
    <div
      className={cn(
        isGrid ? "grid grid-cols-1 gap-6 lg:grid-cols-2" : "flex flex-col gap-5"
      )}
    >
      <Section title="Thông tin đặt sân" bordered={isGrid}>
        <InfoRow label="Mã đơn">
          <span className="font-semibold tabular-nums">{booking.bookingCode}</span>
        </InfoRow>
        <InfoRow label="Trạng thái">
          <Badge status={booking.status}>
            {BOOKING_STATUS_LABEL[booking.status]}
          </Badge>
        </InfoRow>
        <InfoRow label="Tên sân">{booking.courtName}</InfoRow>
        <InfoRow label="Ngày chơi">
          <span className="tabular-nums">{formatDate(booking.date)}</span>
        </InfoRow>
        <InfoRow label="Khung giờ">
          <span className="tabular-nums">
            {booking.startTime}–{booking.endTime}
          </span>
        </InfoRow>
        <InfoRow label="Tổng tiền">
          <span className="font-semibold tabular-nums">
            {formatCurrency(booking.totalCost)}
          </span>
        </InfoRow>
        <InfoRow label="Ngày tạo">
          <span className="tabular-nums">
            {formatDateTimeVN(booking.createdAt)}
          </span>
        </InfoRow>
      </Section>

      <Section title="Thông tin khách hàng" bordered={isGrid}>
        <InfoRow label="Họ tên">{booking.customerName}</InfoRow>
        <InfoRow label="Số điện thoại">
          <span className="tabular-nums">{booking.customerPhone}</span>
        </InfoRow>
        <InfoRow label="Email">{booking.customerEmail}</InfoRow>
      </Section>

      <InvoiceSection invoice={booking.invoice} bordered={isGrid} />
      <StatusTimeline history={booking.statusHistory} bordered={isGrid} />
    </div>
  );
}