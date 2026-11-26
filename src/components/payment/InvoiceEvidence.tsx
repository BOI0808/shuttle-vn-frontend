import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
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
          label: "Người hủy",
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
        <p className="font-sans text-[14px] text-ink-secondary">
          Đặt sân:{" "}
          {invoice.bookingCode ?? invoice.bookingId ? (
            <span className="font-semibold text-ink tabular-nums">
              {invoice.bookingCode ?? invoice.bookingId}
            </span>
          ) : (
            <span className="text-ink-muted">—</span>
          )}
        </p>
      </div>
      {groups.map((group) => (
        <section key={group.title} className="space-y-3">
          <h4 className="font-sans text-[12px] font-semibold leading-[16px] text-ink-secondary">
            {group.title}
          </h4>
          <dl className="grid gap-x-6 gap-y-3 rounded-[8px] border border-line bg-surface-bg p-4 sm:grid-cols-2">
            {group.fields.map((field) => (
              <div key={field.label} className="min-w-0">
                <dt className="font-sans text-[12px] leading-[16px] text-ink-secondary">
                  {field.label}
                </dt>
                <dd className="mt-0.5 whitespace-pre-wrap break-words font-sans text-[14px] font-medium leading-[20px] text-ink tabular-nums">
                  {field.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
      {invoice.replacesInvoiceId && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          icon="arrow_back"
          onClick={() => onSelect(invoice.replacesInvoiceId!)}
        >
          Xem hóa đơn tiền nhiệm
        </Button>
      )}
    </article>
  );
}
