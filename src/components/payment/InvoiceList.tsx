"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Pagination } from "@/components/ui/Pagination";
import { INVOICE_STATUS_LABEL } from "@/config/app";
import { useInvoice, useInvoiceHistory, useInvoices } from "@/hooks";
import type { InvoiceQuery } from "@/types";
import { cn, formatCurrency, getErrorMessage } from "@/utils";
import { InvoiceEvidence } from "./InvoiceEvidence";
import { InvoicePaymentForm } from "./InvoicePaymentForm";

const PAGE_SIZE = 20;
const LABEL_CLASS =
  "grid gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-slate-500";
const SELECT_CLASS =
  "w-full rounded-[7px] border border-gray-300 bg-gray-50 px-3 py-[11px] text-sm text-[#1a1a2e] outline-none transition-[border-color,box-shadow] duration-150 focus:border-emerald-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(16,185,129,0.12)]";
const HEADERS = [
  { label: "Mã hóa đơn", align: "left" },
  { label: "Mã đơn", align: "left" },
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
                  "h-4 animate-pulse rounded-md bg-slate-200/60",
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

function DetailSkeleton() {
  return (
    <div role="status" aria-label="Đang tải chi tiết hóa đơn" className="space-y-3">
      {["w-full", "w-3/4", "w-2/3"].map((width) => (
        <div
          key={width}
          className={cn("h-4 animate-pulse rounded-md bg-slate-200/60", width)}
        />
      ))}
    </div>
  );
}

function ErrorBanner({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      <span className="material-symbols-outlined text-[18px]">error</span>
      <p className="flex-1">{message}</p>
      {onRetry && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-auto shrink-0"
          onClick={onRetry}
        >
          Thử lại
        </Button>
      )}
    </div>
  );
}

function InvoiceDetail({ id, onSelect }: { id: string; onSelect: (id: string) => void }) {
  const detail = useInvoice(id);
  const history = useInvoiceHistory(id);

  return (
    <section
      aria-labelledby="invoice-detail-title"
      className="min-w-0 space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id="invoice-detail-title"
          className="font-display text-[15px] font-bold text-slate-900"
        >
          Chi tiết hóa đơn
        </h2>
        <Button
          variant="outline"
          size="sm"
          className="inline-flex w-auto"
          onClick={() => {
            void detail.refetch();
            void history.refetch();
          }}
        >
          Tải lại
        </Button>
      </div>

      {detail.isPending && <DetailSkeleton />}
      {detail.isError && (
        <ErrorBanner
          message={getErrorMessage(detail.error)}
          onRetry={() => void detail.refetch()}
        />
      )}
      {detail.data && (
        <>
          <InvoiceEvidence invoice={detail.data} onSelect={onSelect} />
          <InvoicePaymentForm key={id} invoice={detail.data} />
        </>
      )}

      <div className="space-y-4 border-t border-slate-200 pt-5">
        <div className="space-y-1">
          <h3 className="font-display text-[15px] font-bold text-slate-900">
            Lịch sử hóa đơn
          </h3>
          <p className="text-xs text-slate-500">
            Hóa đơn thay thế tham chiếu ngược đến hóa đơn tiền nhiệm trong chuỗi.
          </p>
        </div>
        {history.isPending && <DetailSkeleton />}
        {history.isError && (
          <ErrorBanner
            message={getErrorMessage(history.error)}
            onRetry={() => void history.refetch()}
          />
        )}
        {history.data?.length === 0 && (
          <p className="text-sm text-slate-500">Không có lịch sử hóa đơn.</p>
        )}
        {history.data?.map((invoice, index) => {
          const isCurrent = invoice.invoiceId === id;
          return (
            <details
              key={invoice.invoiceId ?? index}
              className={cn(
                "group rounded-lg border bg-slate-50/40",
                isCurrent ? "border-emerald-200 bg-emerald-50/40" : "border-slate-200"
              )}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden">
                <span className="font-mono text-[12px] font-bold text-slate-900">
                  {invoice.invoiceCode ?? invoice.invoiceId ?? "Hóa đơn"}
                </span>
                <span className="flex items-center gap-2">
                  {invoice.status && (
                    <Badge status={invoice.status}>
                      {INVOICE_STATUS_LABEL[invoice.status]}
                    </Badge>
                  )}
                  <span className="material-symbols-outlined text-[18px] text-slate-400 transition-transform group-open:rotate-180">
                    expand_more
                  </span>
                </span>
              </summary>
              <div className="space-y-4 border-t border-slate-200 bg-white p-4">
                <InvoiceEvidence invoice={invoice} onSelect={onSelect} />
                {invoice.invoiceId && !isCurrent && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="inline-flex w-auto"
                    onClick={() => onSelect(invoice.invoiceId!)}
                  >
                    Mở hóa đơn này
                  </Button>
                )}
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}

export function InvoiceList() {
  const [query, setQuery] = useState<InvoiceQuery>({ pageNumber: 1, pageSize: 20 });
  const [code, setCode] = useState("");
  const [selected, setSelected] = useState("");
  const list = useInvoices(query);
  const loading = list.isPending || list.isFetching;
  const items = list.data?.items ?? [];

  return (
    <div className="flex flex-col gap-6">
      <form
        className="grid gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] md:grid-cols-[minmax(0,1fr)_220px_auto] md:items-end"
        onSubmit={(event) => {
          event.preventDefault();
          setQuery({ ...query, code: code.trim() || undefined, pageNumber: 1 });
        }}
      >
        <label className={LABEL_CLASS}>
          Mã hóa đơn
          <Input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="VD: HD-20260814-002"
          />
        </label>
        <label className={LABEL_CLASS}>
          Trạng thái
          <select
            className={SELECT_CLASS}
            value={query.status ?? ""}
            onChange={(event) =>
              setQuery({
                ...query,
                status: (event.target.value || undefined) as InvoiceQuery["status"],
                pageNumber: 1,
              })
            }
          >
            <option value="">Tất cả trạng thái</option>
            {Object.entries(INVOICE_STATUS_LABEL).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <div className="flex gap-2">
          <Button type="submit" className="inline-flex w-auto" loading={loading}>
            Tìm kiếm
          </Button>
          <Button
            type="button"
            variant="outline"
            className="inline-flex w-auto"
            onClick={() => {
              setCode("");
              setQuery({ pageNumber: 1, pageSize: PAGE_SIZE });
            }}
          >
            Xóa lọc
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
        className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50/50 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                {HEADERS.map((header) => (
                  <th
                    key={header.label}
                    scope="col"
                    className={cn(
                      "border-b border-slate-100 px-5 py-3 font-semibold",
                      header.align === "right" && "text-right"
                    )}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && !list.isError && <TableSkeletonRows />}
              {!loading && !list.isError && items.length === 0 && (
                <tr>
                  <td colSpan={HEADERS.length} className="px-5 py-10 text-center">
                    <span className="material-symbols-outlined block text-[40px] text-gray-300">
                      receipt_long
                    </span>
                    <p className="mt-1 text-sm font-medium text-slate-600">
                      Không tìm thấy hóa đơn nào.
                    </p>
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
                        "transition-colors hover:bg-slate-50",
                        isSelected && "bg-emerald-50/40"
                      )}
                    >
                      <td className="px-5 py-4 font-mono text-[12px] font-bold text-slate-900">
                        {invoice.invoiceCode ?? "—"}
                      </td>
                      <td className="px-5 py-4 font-mono text-[12px] text-blue-600">
                        {invoice.bookingCode ?? "—"}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-right font-mono text-[12px] font-bold text-slate-900">
                        {invoice.totalCost == null ? "—" : formatCurrency(invoice.totalCost)}
                      </td>
                      <td className="px-5 py-4">
                        {invoice.status ? (
                          <Badge status={invoice.status}>
                            {INVOICE_STATUS_LABEL[invoice.status]}
                          </Badge>
                        ) : (
                          <span className="text-[13px] text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="inline-flex w-auto"
                          disabled={!invoice.invoiceId}
                          aria-label={`Xem chi tiết hóa đơn ${invoice.invoiceCode ?? ""}`}
                          onClick={() => setSelected(invoice.invoiceId!)}
                        >
                          Chi tiết
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {list.data && (
          <div className="px-5 pb-3">
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

      <p className="text-xs text-slate-500">
        Hóa đơn do hệ thống tự lập khi xác nhận đơn. Hóa đơn Đã hủy chỉ để tra cứu, không thu
        tiền được.
      </p>

      {selected ? (
        <InvoiceDetail key={selected} id={selected} onSelect={setSelected} />
      ) : (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white/60 px-5 py-8 text-center">
          <span className="material-symbols-outlined block text-[32px] text-gray-300">
            description
          </span>
          <p className="mt-1 text-sm text-slate-500">
            Chọn một hóa đơn để xem chứng cứ thanh toán và lịch sử thay thế.
          </p>
        </div>
      )}
    </div>
  );
}
