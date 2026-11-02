"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PAYMENT_METHOD_LABEL } from "@/config/app";
import { usePayInvoice } from "@/hooks";
import type { InvoiceDetail, PaymentAttempt } from "@/types";
import { buildPaymentPayload, clearPaymentAttempt, formatCurrency, formatDateTimeVN, getErrorMessage, getPaymentAttempt, savePaymentAttempt } from "@/utils";

const LABEL_CLASS =
  "grid gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-slate-500";
const SELECT_CLASS =
  "w-full rounded-[7px] border border-gray-300 bg-gray-50 px-3 py-[11px] text-sm text-[#1a1a2e] outline-none transition-[border-color,box-shadow] duration-150 focus:border-emerald-500 focus:bg-white disabled:bg-gray-100 disabled:text-gray-400";

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

  if (success)
    return (
      <div
        role="status"
        className="flex items-center gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
      >
        <span className="material-symbols-outlined text-[18px]">check_circle</span>
        Đã ghi nhận thu tiền thành công.
      </div>
    );
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
    <form
      onSubmit={submit}
      className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4"
    >
      <div className="space-y-1">
        <h3 className="font-display text-[15px] font-bold text-slate-900">Ghi nhận thu tiền</h3>
        <p className="text-xs text-slate-500">
          Thu đủ {invoice.totalCost == null ? "—" : formatCurrency(invoice.totalCost)}. Không hỗ
          trợ thu một phần. Máy chủ kiểm tra thời điểm và trạng thái đặt sân.
        </p>
      </div>

      {attempt ? (
        <div className="space-y-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <p className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[18px]">hourglass_top</span>
            Lần thu đang chờ xác minh. Thử lại giữ nguyên chứng cứ và khóa giao dịch, không ghi
            nhận khoản thu mới.
          </p>
          <p className="font-mono text-[12px]">
            {formatCurrency(attempt.payload.amount ?? 0)} ·{" "}
            {attempt.payload.paymentMethod
              ? PAYMENT_METHOD_LABEL[attempt.payload.paymentMethod]
              : "—"}{" "}
            · {attempt.payload.paidAt ? formatDateTimeVN(attempt.payload.paidAt) : "—"}
          </p>
        </div>
      ) : (
        <>
          <label className={LABEL_CLASS}>
            Số tiền thực thu (VND)
            <Input
              type="number"
              min="0"
              step="any"
              required
              value={amount}
              disabled={pay.isPending}
              onChange={(event) => setAmount(event.target.value)}
            />
          </label>
          <label className={LABEL_CLASS}>
            Phương thức
            <select
              className={SELECT_CLASS}
              value={method}
              disabled={pay.isPending}
              onChange={(event) => setMethod(event.target.value as "Cash" | "Bank")}
            >
              <option value="Cash">Tiền mặt</option>
              <option value="Bank">Chuyển khoản</option>
            </select>
          </label>
          <label className={LABEL_CLASS}>
            Thời điểm thực thu (giờ máy hiện tại)
            <Input
              type="datetime-local"
              step="1"
              required
              value={paidAt}
              disabled={pay.isPending}
              onChange={(event) => setPaidAt(event.target.value)}
            />
          </label>
          <label className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-[13px] text-slate-700">
            <input
              type="checkbox"
              checked={confirmed}
              disabled={pay.isPending}
              onChange={(event) => setConfirmed(event.target.checked)}
              required
              className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-emerald-500"
            />
            Tôi xác nhận đã thực thu đủ tổng tiền hóa đơn.
          </label>
        </>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          className="w-auto"
          loading={pay.isPending}
          disabled={
            !ready ||
            (!attempt && (!confirmed || !invoice.expectedState || invoice.totalCost == null))
          }
        >
          {attempt ? "Thử lại giao dịch cũ" : "Xác nhận thu đủ"}
        </Button>
        <p className="font-mono text-[11px] text-slate-400">
          Thao tác không thể hoàn tác · Trạng thái đặt sân không tự đổi
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <span className="material-symbols-outlined text-[18px]">error</span>
          <p className="flex-1">{error}</p>
        </div>
      )}
    </form>
  );
}
