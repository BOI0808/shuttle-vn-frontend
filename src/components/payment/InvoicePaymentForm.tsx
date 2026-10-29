"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { usePayInvoice } from "@/hooks";
import type { InvoiceDetail, PaymentAttempt } from "@/types";
import { buildPaymentPayload, clearPaymentAttempt, formatCurrency, getErrorMessage, getPaymentAttempt, savePaymentAttempt } from "@/utils";

export function InvoicePaymentForm({ invoice }: { invoice: InvoiceDetail }) {
  const pay = usePayInvoice();
  const submitting = useRef(false);
  const [amount, setAmount] = useState(String(invoice.totalCost ?? ""));
  const [method, setMethod] = useState<"Cash" | "Bank">("Cash");
  const [paidAt, setPaidAt] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [attempt, setAttempt] = useState<PaymentAttempt | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    try {
      setAttempt(getPaymentAttempt(invoice.invoiceId!));
      setReady(true);
    } catch {
      setError("Không đọc được chứng cứ lần thu trước. Không thể thu tiền an toàn trong phiên này.");
    }
  }, [invoice.invoiceId]);

  if (success) return <p role="status" className="text-sm text-emerald-700">Đã ghi nhận thu tiền thành công.</p>;
  if (ready && !attempt && invoice.status !== "Unpaid") return null;

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!ready || submitting.current) return;
    submitting.current = true;
    setError("");
    try {
      let current = attempt;
      if (!current) {
        if (!confirmed || !amount.trim()) throw new Error("Cần xác nhận đã thực thu đủ tiền.");
        const payload = buildPaymentPayload(invoice, Number(amount), method, paidAt);
        current = { id: invoice.invoiceId!, payload, idempotencyKey: crypto.randomUUID() };
        savePaymentAttempt(current);
        setAttempt(current);
      }
      await pay.mutateAsync(current);
      clearPaymentAttempt(current.id);
      setAttempt(null);
      setSuccess(true);
    } catch (failure) {
      setError(getErrorMessage(failure));
    } finally {
      submitting.current = false;
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4 border-t border-slate-200 pt-5">
      <h3 className="font-semibold text-slate-900">Ghi nhận thu tiền</h3>
      <p className="text-sm text-slate-500">Thu đủ {invoice.totalCost == null ? "—" : formatCurrency(invoice.totalCost)}. Không hỗ trợ thu một phần. Máy chủ kiểm tra thời điểm và trạng thái đặt sân.</p>
      {success ? <p role="status" className="text-sm text-emerald-700">Đã ghi nhận thu tiền thành công.</p> : <>
        {attempt ? <div className="space-y-2 text-sm text-slate-600"><p>Lần thu đang chờ xác minh. Thử lại giữ nguyên chứng cứ và khóa giao dịch, không ghi nhận khoản thu mới.</p><p>{formatCurrency(attempt.payload.amount!)} · {attempt.payload.paymentMethod === "Cash" ? "Tiền mặt" : "Chuyển khoản"} · {attempt.payload.paidAt}</p></div> : <>
          <label className="block text-sm">Số tiền thực thu (VND)<Input type="number" min="0" step="any" required value={amount} disabled={pay.isPending} onChange={(event) => setAmount(event.target.value)} /></label>
          <label className="block text-sm">Phương thức<select className="mt-1 w-full rounded-[7px] border border-gray-300 p-3" value={method} disabled={pay.isPending} onChange={(event) => setMethod(event.target.value as "Cash" | "Bank")}><option value="Cash">Tiền mặt</option><option value="Bank">Chuyển khoản</option></select></label>
          <label className="block text-sm">Thời điểm thực thu (giờ máy hiện tại)<Input type="datetime-local" step="1" required value={paidAt} disabled={pay.isPending} onChange={(event) => setPaidAt(event.target.value)} /></label>
          <label className="flex items-start gap-2 text-sm"><input type="checkbox" checked={confirmed} disabled={pay.isPending} onChange={(event) => setConfirmed(event.target.checked)} required />Tôi xác nhận đã thực thu đủ tổng tiền hóa đơn.</label>
        </>}
        <Button type="submit" loading={pay.isPending} disabled={!ready || (!attempt && (!confirmed || !invoice.expectedState || invoice.totalCost == null))}>{attempt ? "Thử lại giao dịch cũ" : "Xác nhận thu đủ"}</Button>
      </>}
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
