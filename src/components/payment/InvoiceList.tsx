"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  OperationsEmptyCard,
  OperationsErrorCard,
  OperationsLoadingCard,
} from "@/components/ui/OperationsState";
import { Pagination } from "@/components/ui/Pagination";
import { Select } from "@/components/ui/Select";
import { INVOICE_STATUS_LABEL } from "@/config/app";
import { useInvoices } from "@/hooks";
import type { InvoiceQuery } from "@/types";
import { cn, formatCurrency, getErrorMessage } from "@/utils";
import { InvoiceDetailModal } from "./InvoiceDetailModal";
import { InvoicePaymentModal } from "./InvoicePaymentModal";

const PAGE_SIZE = 20;
const SEARCH_DEBOUNCE_MS = 400;
const HEADERS = [
  { label: "Mã hóa đơn", align: "left" },
  { label: "Đơn đặt sân", align: "left" },
  { label: "Tổng tiền", align: "right" },
  { label: "Trạng thái", align: "left" },
  { label: "Thao tác", align: "right" },
] as const;

export function InvoiceList() {
  const [query, setQuery] = useState<InvoiceQuery>({ pageNumber: 1, pageSize: 20 });
  const [code, setCode] = useState("");
  const [draftStatus, setDraftStatus] = useState("");
  const [selected, setSelected] = useState("");
  const [payingId, setPayingId] = useState("");
  const list = useInvoices(query);
  const loading = list.isPending || list.isFetching;
  const items = list.data?.items ?? [];

  useEffect(() => {
    const trimmedCode = code.trim() || undefined;
    const nextStatus = (draftStatus || undefined) as InvoiceQuery["status"];

    if (trimmedCode === query.code && nextStatus === query.status) {
      return;
    }

    const timer = setTimeout(() => {
      setQuery({
        code: trimmedCode,
        status: nextStatus,
        pageNumber: 1,
        pageSize: PAGE_SIZE,
      });
    }, trimmedCode !== query.code ? SEARCH_DEBOUNCE_MS : 0);

    return () => clearTimeout(timer);
  }, [code, draftStatus, query.code, query.status]);

  const hasActiveFilters = Boolean(
    code.trim() || draftStatus || query.code || query.status
  );

  const resetFilters = () => {
    setCode("");
    setDraftStatus("");
    setQuery({ pageNumber: 1, pageSize: PAGE_SIZE });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-[24px] font-semibold leading-[32px] text-ink">
          Thanh toán
        </h1>
        <p className="mt-1 font-sans text-[14px] font-normal leading-[20px] text-ink-secondary">
          Tra cứu hóa đơn và xác nhận thu đủ tiền
        </p>
      </div>

      <form
        className="grid gap-4 rounded-[12px] border border-line bg-white p-5 md:grid-cols-[minmax(0,1fr)_220px_auto] md:items-end"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div>
          <Label htmlFor="invoice-code-filter">Tra cứu hóa đơn</Label>
          <Input
            id="invoice-code-filter"
            icon={
              <span
                className="material-symbols-outlined text-[20px]"
                aria-hidden="true"
              >
                search
              </span>
            }
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Nhập mã hóa đơn (VD: HD-20260814-002)"
          />
        </div>
        <div>
          <Label htmlFor="invoice-status-filter">Trạng thái</Label>
          <Select
            id="invoice-status-filter"
            value={draftStatus}
            onChange={(event) => setDraftStatus(event.target.value)}
          >
            <option value="">Tất cả trạng thái</option>
            {Object.entries(INVOICE_STATUS_LABEL).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={resetFilters}
          >
            Xóa lọc
          </Button>
        </div>
      </form>

      {list.isError ? (
        <OperationsErrorCard
          title="Không thể tải danh sách hóa đơn"
          message={getErrorMessage(list.error)}
          onRetry={() => void list.refetch()}
        />
      ) : loading ? (
        <OperationsLoadingCard
          title="Danh sách hóa đơn"
          subtitle="Đang tải dữ liệu…"
          rows={4}
        />
      ) : items.length === 0 ? (
        <OperationsEmptyCard
          headerTitle="Danh sách hóa đơn"
          headerSubtitle="Theo các bộ lọc hiện tại"
          icon="receipt_long"
          title="Không tìm thấy kết quả phù hợp"
          description="Thử thay đổi từ khóa hoặc bộ lọc."
          actionLabel={hasActiveFilters ? "Xóa bộ lọc" : undefined}
          onAction={hasActiveFilters ? resetFilters : undefined}
        />
      ) : (
        <section
          aria-label="Danh sách hóa đơn"
          className="overflow-hidden rounded-[12px] border border-line bg-white"
        >
          <div className="px-5 py-4">
            <h2 className="font-display text-[18px] font-medium leading-[26px] text-ink">
              Danh sách hóa đơn
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="h-[40px] border-y border-line bg-status-info-soft font-sans text-[12px] font-semibold leading-[16px] text-ink-secondary">
                  {HEADERS.map((header) => (
                    <th
                      key={header.label}
                      scope="col"
                      className={cn(
                        "px-5",
                        header.align === "right" && "text-right"
                      )}
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {items.map((invoice, index) => {
                  const isSelected = selected === invoice.invoiceId;
                  return (
                    <tr
                      key={invoice.invoiceId ?? index}
                      className={cn(
                        "transition-colors duration-100 hover:bg-surface-bg",
                        isSelected && "bg-brand-soft/60"
                      )}
                    >
                      <td className="px-5 py-3.5 font-sans text-[14px] font-semibold text-ink tabular-nums">
                        {invoice.invoiceCode ?? "—"}
                      </td>
                      <td className="px-5 py-3.5 font-sans text-[14px] font-medium text-brand-strong tabular-nums">
                        {invoice.bookingCode ?? "—"}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-right font-sans text-[14px] font-semibold text-ink tabular-nums">
                        {invoice.totalCost == null ? "—" : formatCurrency(invoice.totalCost)}
                      </td>
                      <td className="px-5 py-3.5">
                        {invoice.status ? (
                          <Badge status={invoice.status}>
                            {INVOICE_STATUS_LABEL[invoice.status]}
                          </Badge>
                        ) : (
                          <span className="font-sans text-[14px] text-ink-muted">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={!invoice.invoiceId}
                            aria-label={`Xem chi tiết hóa đơn ${invoice.invoiceCode ?? ""}`}
                            onClick={() => setSelected(invoice.invoiceId!)}
                          >
                            Chi tiết
                          </Button>
                          {invoice.status === "Unpaid" && invoice.invoiceId && (
                            <Button
                              size="sm"
                              aria-label={`Xác nhận thu tiền hóa đơn ${invoice.invoiceCode ?? ""}`}
                              onClick={() => setPayingId(invoice.invoiceId!)}
                            >
                              Xác nhận thu tiền
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {list.data && (
            <div className="px-5 pb-4">
              <Pagination
                page={{
                  pageNumber: list.data.pageNumber ?? query.pageNumber ?? 1,
                  pageSize: list.data.pageSize ?? query.pageSize ?? 20,
                  totalCount: list.data.totalCount ?? 0,
                  totalPages: list.data.totalPages ?? 0,
                }}
                disabled={loading}
                onPageChange={(pageNumber) => {
                  setQuery({ ...query, pageNumber });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </div>
          )}
        </section>
      )}

      {selected && (
        <InvoiceDetailModal
          key={selected}
          id={selected}
          onSelect={setSelected}
          onClose={() => setSelected("")}
        />
      )}

      {payingId && (
        <InvoicePaymentModal
          key={payingId}
          id={payingId}
          onClose={() => setPayingId("")}
        />
      )}
    </div>
  );
}
