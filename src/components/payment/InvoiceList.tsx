"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Pagination } from "@/components/ui/Pagination";
import { INVOICE_STATUS_LABEL } from "@/config/app";
import { useInvoice, useInvoiceHistory, useInvoices } from "@/hooks";
import type { InvoiceQuery } from "@/types";
import { formatCurrency, getErrorMessage } from "@/utils";
import { InvoiceEvidence } from "./InvoiceEvidence";
import { InvoicePaymentForm } from "./InvoicePaymentForm";

function InvoiceDetail({ id, onSelect }: { id: string; onSelect: (id: string) => void }) {
  const detail = useInvoice(id);
  const history = useInvoiceHistory(id);
  return (
    <section aria-labelledby="invoice-detail-title" className="min-w-0 space-y-5 rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between gap-3"><h2 id="invoice-detail-title" className="text-lg font-semibold">Chi tiết hóa đơn</h2><Button variant="outline" size="sm" className="w-auto" onClick={() => { void detail.refetch(); void history.refetch(); }}>Tải lại</Button></div>
      {detail.isPending && <p role="status">Đang tải chi tiết…</p>}
      {detail.isError && <p role="alert" className="text-sm text-red-600">{getErrorMessage(detail.error)}</p>}
      {detail.data && <>
        <InvoiceEvidence invoice={detail.data} onSelect={onSelect} />
        {!detail.isError && <InvoicePaymentForm key={id} invoice={detail.data} />}
      </>}
      <div className="space-y-4 border-t border-slate-200 pt-5">
        <h3 className="font-semibold">Chuỗi hóa đơn và chứng cứ</h3>
        <p className="text-xs text-slate-500">Mỗi hóa đơn hiển thị tiền nhiệm; hóa đơn thay thế tham chiếu ngược đến tiền nhiệm trong chuỗi.</p>
        {history.isPending && <p role="status">Đang tải lịch sử…</p>}
        {history.isError && <p role="alert" className="text-sm text-red-600">{getErrorMessage(history.error)}</p>}
        {history.data?.length === 0 && <p className="text-sm text-slate-500">Không có lịch sử hóa đơn.</p>}
        {history.data?.map((invoice, index) => <details key={invoice.invoiceId ?? index} className="border-t border-slate-100 pt-3"><summary className="cursor-pointer text-sm text-slate-700">{invoice.invoiceCode ?? invoice.invoiceId ?? "Hóa đơn"} · {invoice.status ? INVOICE_STATUS_LABEL[invoice.status] : "—"}</summary><div className="pt-4"><InvoiceEvidence invoice={invoice} onSelect={onSelect} />{invoice.invoiceId && <Button variant="ghost" size="sm" className="mt-3 w-auto" onClick={() => onSelect(invoice.invoiceId!)}>Mở hóa đơn này</Button>}</div></details>)}
      </div>
    </section>
  );
}

export function InvoiceList() {
  const [query, setQuery] = useState<InvoiceQuery>({ pageNumber: 1, pageSize: 20 });
  const [code, setCode] = useState("");
  const [selected, setSelected] = useState("");
  const list = useInvoices(query);
  return (
    <div className="space-y-6">
      <header><h1 className="text-2xl font-semibold tracking-tight text-slate-900">Hóa đơn</h1><p className="mt-1 text-sm text-slate-500">Tra cứu chứng cứ thanh toán và ghi nhận thu đủ tiền.</p></header>
      <form className="flex flex-wrap items-end gap-3" onSubmit={(event) => { event.preventDefault(); setQuery({ ...query, code: code.trim() || undefined, pageNumber: 1 }); }}>
        <label className="min-w-48 flex-1 text-xs text-slate-600">Mã hóa đơn<Input value={code} onChange={(event) => setCode(event.target.value)} placeholder="Nhập mã hóa đơn" /></label>
        <label className="text-xs text-slate-600">Trạng thái<select className="mt-1 block rounded-[7px] border border-gray-300 bg-white p-3 text-sm" value={query.status ?? ""} onChange={(event) => setQuery({ ...query, status: (event.target.value || undefined) as InvoiceQuery["status"], pageNumber: 1 })}><option value="">Tất cả trạng thái</option>{Object.entries(INVOICE_STATUS_LABEL).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
        <label className="text-xs text-slate-600">Mỗi trang<select className="mt-1 block rounded-[7px] border border-gray-300 bg-white p-3 text-sm" value={query.pageSize} onChange={(event) => setQuery({ ...query, pageSize: Number(event.target.value), pageNumber: 1 })}>{[20, 50, 100].map((size) => <option key={size} value={size}>{size}</option>)}</select></label>
        <Button type="submit" variant="outline" className="w-auto">Tìm kiếm</Button>
        <Button type="button" variant="ghost" className="w-auto" onClick={() => { void list.refetch(); }}>Tải lại</Button>
      </form>
      {list.isPending && <p role="status" className="text-sm text-slate-500">Đang tải hóa đơn…</p>}
      {list.isError && <p role="alert" className="text-sm text-red-600">{getErrorMessage(list.error)}</p>}
      {list.data && <section aria-label="Danh sách hóa đơn">
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs text-slate-500"><tr>{["Hóa đơn", "Đặt sân", "Tổng tiền", "Trạng thái", ""].map((label) => <th scope="col" key={label} className="px-5 py-3">{label || "Chi tiết"}</th>)}</tr></thead><tbody>
            {!list.data.items?.length && <tr><td colSpan={5} className="p-8 text-center text-slate-500">Không có hóa đơn phù hợp.</td></tr>}
            {list.data.items?.map((invoice, index) => <tr key={invoice.invoiceId ?? index} className={selected === invoice.invoiceId ? "border-t border-slate-100 bg-emerald-50/40" : "border-t border-slate-100"}><td className="px-5 py-4 font-medium">{invoice.invoiceCode ?? "—"}</td><td className="px-5 py-4">{invoice.bookingCode ?? "—"}</td><td className="whitespace-nowrap px-5 py-4">{invoice.totalCost == null ? "—" : formatCurrency(invoice.totalCost)}</td><td className="px-5 py-4">{invoice.status && <Badge status={invoice.status}>{INVOICE_STATUS_LABEL[invoice.status]}</Badge>}</td><td className="px-5 py-4"><Button variant="ghost" size="sm" disabled={!invoice.invoiceId} aria-label={`Xem hóa đơn ${invoice.invoiceCode ?? ""}`} onClick={() => setSelected(invoice.invoiceId!)}>Xem</Button></td></tr>)}
          </tbody></table>
        </div>
        <Pagination page={{ pageNumber: list.data.pageNumber ?? query.pageNumber ?? 1, pageSize: list.data.pageSize ?? query.pageSize ?? 20, totalCount: list.data.totalCount ?? 0, totalPages: list.data.totalPages ?? 0 }} disabled={list.isFetching} onPageChange={(pageNumber) => setQuery({ ...query, pageNumber })} />
      </section>}
      {selected ? <InvoiceDetail key={selected} id={selected} onSelect={setSelected} /> : <p className="text-sm text-slate-500">Chọn hóa đơn để xem chi tiết, chứng cứ và lịch sử thay thế.</p>}
    </div>
  );
}
