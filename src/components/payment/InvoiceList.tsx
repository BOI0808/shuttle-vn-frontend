"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Pagination } from "@/components/ui/Pagination";
import { Select } from "@/components/ui/Select";
import { INVOICE_STATUS_LABEL } from "@/config/app";
import { useInvoices } from "@/hooks";
import type { InvoiceQuery } from "@/types";
import { cn, formatCurrency, getErrorMessage } from "@/utils";
import { InvoiceDetailModal } from "./InvoiceDetailModal";
import { InvoicePaymentModal } from "./InvoicePaymentModal";

const PAGE_SIZE = 20;
const HEADERS = [
  { label: "Mã hóa đơn", align: "left" },
  { label: "Đơn đặt sân", align: "left" },
  { label: "Tổng tiền", align: "right" },
  { label: "Trạng thái", align: "left" },
  { label: "Thao tác", align: "right" },
] as const;

const SKELETON_WIDTHS = ["w-28", "w-24", "w-20", "w-24", "w-16"];

function TableSkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, row) => (
        <tr key={row}>
          {SKELETON_WIDTHS.map((width, column) => (
            <td key={column} className="px-5 py-4">
              <div
                className={cn(
                  "h-3.5 animate-pulse rounded-[4px] bg-surface-soft",
                  width,
                  column >= 2 && "ml-auto"
                )}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function ErrorBanner({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div
      role="alert"
      className="flex flex-wrap items-center justify-between gap-3 rounded-[8px] border border-line bg-status-danger-soft px-4 py-3 font-sans text-[14px] text-status-danger"
    >
      <div className="flex items-center gap-2.5">
        <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
          error
        </span>
        <p>{message}</p>
      </div>
      {onRetry && (
        <Button type="button" variant="outline" size="sm" onClick={onRetry}>
          Thử lại
        </Button>
      )}
    </div>
  );
}

export function InvoiceList() {
  const [query, setQuery] = useState<InvoiceQuery>({ pageNumber: 1, pageSize: 20 });
  const [code, setCode] = useState("");
  const [draftStatus, setDraftStatus] = useState("");
  const [selected, setSelected] = useState("");
  const [payingId, setPayingId] = useState("");
  const list = useInvoices(query);
  const loading = list.isPending || list.isFetching;
  const items = list.data?.items ?? [];

  const applyFilters = () => {
    const nextQuery: InvoiceQuery = {
      code: code.trim() || undefined,
      status: (draftStatus || undefined) as InvoiceQuery["status"],
      pageNumber: 1,
      pageSize: PAGE_SIZE,
    };
    const isSame =
      nextQuery.code === query.code &&
      nextQuery.status === query.status &&
      nextQuery.pageNumber === query.pageNumber;
    setQuery(nextQuery);
    if (isSame) {
      void list.refetch();
    }
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
          applyFilters();
        }}
      >
        <div>
          <Label htmlFor="invoice-code-filter">Tra cứu hóa đơn</Label>
          <Input
            id="invoice-code-filter"
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
            onClick={() => {
              setCode("");
              setDraftStatus("");
              setQuery({ pageNumber: 1, pageSize: PAGE_SIZE });
            }}
          >
            Xóa lọc
          </Button>
          <Button type="submit" loading={loading}>
            Tìm kiếm
          </Button>
        </div>
      </form>

      {list.isError && (
        <ErrorBanner
          message={getErrorMessage(list.error)}
          onRetry={() => void list.refetch()}
        />
      )}

      <section
        aria-label="Danh sách hóa đơn"
        className="overflow-hidden rounded-[12px] border border-line bg-white"
      >
        <div className="px-5 py-4">
          <h2 className="font-display text-[18px] font-medium leading-[26px] text-ink">
            Danh sách hóa đơn
          </h2>
          {loading && (
            <p className="font-sans text-[12px] leading-[16px] text-ink-secondary">
              Đang tải danh sách…
            </p>
          )}
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
              {loading && !list.isError && <TableSkeletonRows />}
              {!loading && !list.isError && items.length === 0 && (
                <tr>
                  <td colSpan={HEADERS.length} className="px-5 py-10">
                    <div className="mx-auto flex max-w-md flex-col items-center text-center">
                      <div className="flex size-[48px] items-center justify-center rounded-[12px] bg-brand-soft text-brand-strong">
                        <span
                          className="material-symbols-outlined text-[24px]"
                          aria-hidden="true"
                        >
                          receipt_long
                        </span>
                      </div>
                      <p className="mt-4 font-sans text-[14px] font-semibold text-ink">
                        Không tìm thấy hóa đơn nào
                      </p>
                      <p className="mt-1 font-sans text-[14px] text-ink-secondary">
                        Thử thay đổi mã hóa đơn hoặc bộ lọc trạng thái.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
              {!loading &&
                items.map((invoice, index) => {
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
