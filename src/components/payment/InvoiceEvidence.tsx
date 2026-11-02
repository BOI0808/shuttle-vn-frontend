import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ACTOR_TYPE_LABEL, INVOICE_STATUS_LABEL, PAYMENT_METHOD_LABEL } from "@/config/app";
import type { InvoiceDetail } from "@/types";
import { formatCurrency, formatDateTimeVN } from "@/utils";

const money = (value?: number | null) =>
  value == null ? undefined : formatCurrency(value);
const time = (value?: string | null) =>
  value ? formatDateTimeVN(value) : undefined;
const method = (value?: InvoiceDetail["paymentMethod"]) =>
  value ? PAYMENT_METHOD_LABEL[value] : undefined;

interface Field {
  label: string;
  value?: string | null;
}

interface Group {
  title: string;
  fields: Field[];
}

function buildGroups(invoice: InvoiceDetail): Group[] {
  const groups: Group[] = [
    {
      title: "Thông tin hóa đơn",
      fields: [
        { label: "Mã hóa đơn", value: invoice.invoiceCode ?? invoice.invoiceId },
        { label: "Tổng tiền", value: money(invoice.totalCost) },
        { label: "Thời điểm lập", value: time(invoice.issuedAt) },
        { label: "Ghi chú", value: invoice.note },
      ],
    },
  ];

  // ponytail: bỏ các cột *ByEmployee — DTO chỉ trả GUID, không có tên người thực hiện.
  // Thêm lại khi backend trả kèm tên.
  if (invoice.paidAt || invoice.status === "Paid" || invoice.status === "Refunded") {
    groups.push({
      title: "Thu tiền",
      fields: [
        { label: "Số tiền đã thu", value: money(invoice.paidAmount) },
        { label: "Phương thức thu", value: method(invoice.paymentMethod) },
        { label: "Thời điểm thực thu", value: time(invoice.paidAt) },
      ],
    });
  }

  if (invoice.refundedAt || invoice.refundAmount != null) {
    groups.push({
      title: "Hoàn tiền",
      fields: [
        { label: "Số tiền đã hoàn", value: money(invoice.refundAmount) },
        { label: "Phương thức hoàn", value: method(invoice.refundMethod) },
        { label: "Thời điểm hoàn", value: time(invoice.refundedAt) },
        { label: "Lý do hoàn", value: invoice.refundReason },
      ],
    });
  }

  if (invoice.cancelledAt || invoice.cancellationReason) {
    groups.push({
      title: "Hủy hóa đơn",
      fields: [
        { label: "Thời điểm hủy", value: time(invoice.cancelledAt) },
        {
          label: "Tác nhân hủy",
          value: invoice.cancellationActorType
            ? ACTOR_TYPE_LABEL[invoice.cancellationActorType]
            : undefined,
        },
        { label: "Lý do hủy", value: invoice.cancellationReason },
      ],
    });
  }

  return groups
    .map((group) => ({
      ...group,
      fields: group.fields.filter((field) => field.value != null && field.value !== ""),
    }))
    .filter((group) => group.fields.length > 0);
}

export function InvoiceEvidence({ invoice, onSelect }: { invoice: InvoiceDetail; onSelect: (id: string) => void }) {
  const groups = buildGroups(invoice);
  return (
    <article className="space-y-5">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {invoice.status && <Badge status={invoice.status}>{INVOICE_STATUS_LABEL[invoice.status]}</Badge>}
        <p className="text-[13px] text-slate-600">
          Đặt sân:{" "}
          {invoice.bookingId ? (
            <Link className="font-mono text-[12px] font-bold text-emerald-700 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-800" href={`/bookings/${invoice.bookingId}`}>
              {invoice.bookingCode ?? invoice.bookingId}
            </Link>
          ) : (
            <span className="text-slate-400">—</span>
          )}
        </p>
      </div>
      {groups.map((group) => (
        <section key={group.title} className="space-y-3">
          <h4 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">{group.title}</h4>
          <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {group.fields.map((field) => (
              <div key={field.label} className="min-w-0">
                <dt className="text-[11px] text-slate-500">{field.label}</dt>
                <dd className="mt-0.5 whitespace-pre-wrap break-words text-[13px] font-medium text-slate-800">{field.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
      {invoice.replacesInvoiceId && (
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-mono text-[11px] font-medium text-slate-700 transition-colors hover:border-emerald-300 hover:text-emerald-700"
          onClick={() => onSelect(invoice.replacesInvoiceId!)}
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Xem hóa đơn tiền nhiệm
        </button>
      )}
    </article>
  );
}
