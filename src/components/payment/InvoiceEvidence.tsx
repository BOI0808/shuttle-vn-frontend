import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ACTOR_TYPE_LABEL, INVOICE_STATUS_LABEL, PAYMENT_METHOD_LABEL } from "@/config/app";
import type { InvoiceDetail } from "@/types";
import { formatCurrency, formatDateTimeVN } from "@/utils";

const money = (value?: number | null) => value == null ? "—" : formatCurrency(value);
const time = (value?: string | null) => value ? formatDateTimeVN(value) : "—";

export function InvoiceEvidence({ invoice, onSelect }: { invoice: InvoiceDetail; onSelect: (id: string) => void }) {
  const rows = [
    ["Mã hóa đơn", invoice.invoiceCode ?? invoice.invoiceId],
    ["Tổng tiền", money(invoice.totalCost)],
    ["Nhân viên lập", invoice.issuedByEmployee ?? "Không có nhân viên lập"],
    ["Thời điểm lập", time(invoice.issuedAt)],
    ["Số tiền đã thu", money(invoice.paidAmount)],
    ["Phương thức thu", invoice.paymentMethod ? PAYMENT_METHOD_LABEL[invoice.paymentMethod] : "—"],
    ["Thời điểm thực thu (giờ Việt Nam)", time(invoice.paidAt)],
    ["Người xác nhận thu", invoice.paidByEmployee],
    ["Số tiền đã hoàn", money(invoice.refundAmount)],
    ["Phương thức hoàn", invoice.refundMethod ? PAYMENT_METHOD_LABEL[invoice.refundMethod] : "—"],
    ["Thời điểm hoàn", time(invoice.refundedAt)],
    ["Nhân viên hoàn", invoice.refundedByEmployee],
    ["Lý do hoàn", invoice.refundReason],
    ["Thời điểm hủy", time(invoice.cancelledAt)],
    ["Tác nhân hủy", invoice.cancellationActorType ? ACTOR_TYPE_LABEL[invoice.cancellationActorType] : "—"],
    ["Nhân viên hủy", invoice.cancelledByEmployee],
    ["Khách hàng hủy", invoice.cancelledByCustomer],
    ["Lý do hủy", invoice.cancellationReason],
    ["Ghi chú", invoice.note],
  ];
  return (
    <article className="space-y-4">
      {invoice.status && <Badge status={invoice.status}>{INVOICE_STATUS_LABEL[invoice.status]}</Badge>}
      <p className="text-sm">Đặt sân: {invoice.bookingId ? <Link className="text-emerald-700 underline" href={`/bookings/${invoice.bookingId}`}>{invoice.bookingCode ?? invoice.bookingId}</Link> : "—"}</p>
      <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
        {rows.map(([label, value]) => <div key={label} className="min-w-0"><dt className="text-xs text-slate-500">{label}</dt><dd className="mt-1 whitespace-pre-wrap break-words text-slate-800">{value ?? "—"}</dd></div>)}
      </dl>
      {invoice.replacesInvoiceId && <button type="button" className="break-all text-sm text-emerald-700 underline" onClick={() => onSelect(invoice.replacesInvoiceId!)}>Hóa đơn tiền nhiệm: {invoice.replacesInvoiceId}</button>}
    </article>
  );
}
