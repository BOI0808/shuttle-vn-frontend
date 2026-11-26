"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { PAYMENT_METHOD_LABEL } from "@/config/app";
import { usePayInvoice } from "@/hooks";
import type { InvoiceDetail, PaymentAttempt } from "@/types";
import { buildPaymentPayload, clearPaymentAttempt, formatCurrency, formatDateTimeVN, getErrorMessage, getPaymentAttempt, savePaymentAttempt } from "@/utils";

interface InvoicePaymentFormProps {
  invoice: InvoiceDetail;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export function InvoicePaymentForm({
  invoice,
  onCancel,
  onSuccess,
}: InvoicePaymentFormProps) {
  const pay = usePayInvoice();
  const submitting = useRef(false);
  const [method, setMethod] = useState<"Cash" | "Bank">("Cash");
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
      <div className="space-y-4">
        <div
          role="status"
          className="flex items-center gap-2.5 rounded-[8px] border border-line bg-brand-soft px-4 py-3 font-sans text-[14px] font-semibold text-brand-strong"
        >
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            check_circle
          </span>
          Đã ghi nhận thu đủ tiền.
        </div>
        {onCancel && (
          <div className="flex justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Đóng
            </Button>
          </div>
        )}
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
        if (!confirmed || invoice.totalCost == null) {
          throw new Error("Cần xác nhận đã thực thu đủ tiền.");
        }
        const payload = buildPaymentPayload(
          invoice,
          invoice.totalCost,
          method,
          new Date().toISOString()
        );
        current = { id: invoice.invoiceId!, payload, idempotencyKey: crypto.randomUUID() };
        savePaymentAttempt(current);
        setAttempt(current);
      }
      await pay.mutateAsync(current);
      clearPaymentAttempt(current.id);
      setAttempt(null);
      setSuccess(true);
      onSuccess?.();
    } catch (failure) {
      setError(getErrorMessage(failure));
    } finally {
      submitting.current = false;
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="rounded-[8px] border border-line bg-surface-bg px-4 py-3">
        <p className="font-sans text-[12px] font-semibold leading-[16px] text-ink-secondary">
          Tổng tiền phải thu ({invoice.invoiceCode ?? invoice.bookingCode ?? "Hóa đơn"})
        </p>
        <p className="mt-1 font-sans text-[24px] font-semibold leading-[32px] text-ink tabular-nums">
          {invoice.totalCost == null ? "—" : formatCurrency(invoice.totalCost)}
        </p>
      </div>

      {attempt ? (
        <div className="space-y-2 rounded-[8px] border border-line bg-status-warning-soft px-4 py-3 font-sans text-[14px] text-status-warning">
          <p className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              hourglass_top
            </span>
            Lần thu đang chờ xác minh. Thử lại giữ nguyên chứng cứ và khóa giao dịch, không ghi
            nhận khoản thu mới.
          </p>
          <p className="font-sans text-[12px] font-medium tabular-nums">
            {formatCurrency(attempt.payload.amount ?? 0)} ·{" "}
            {attempt.payload.paymentMethod
              ? PAYMENT_METHOD_LABEL[attempt.payload.paymentMethod]
              : "—"}{" "}
            · {attempt.payload.paidAt ? formatDateTimeVN(attempt.payload.paidAt) : "—"}
          </p>
        </div>
      ) : (
        <>
          <div>
            <Label required>Phương thức thu tiền</Label>
            <div className="flex flex-wrap gap-2.5">
              {(["Cash", "Bank"] as const).map((option) => (
                <Button
                  key={option}
                  type="button"
                  variant={method === option ? "primary" : "outline"}
                  disabled={pay.isPending}
                  onClick={() => setMethod(option)}
                >
                  {PAYMENT_METHOD_LABEL[option]}
                </Button>
              ))}
            </div>
          </div>

          <label className="flex cursor-pointer items-start gap-2.5 rounded-[8px] border border-line bg-white px-3.5 py-3 font-sans text-[14px] leading-[20px] text-ink">
            <input
              type="checkbox"
              checked={confirmed}
              disabled={pay.isPending}
              onChange={(event) => setConfirmed(event.target.checked)}
              required
              className="mt-1 h-4 w-4 rounded border-line-strong accent-brand"
            />
            Tôi xác nhận đã thực thu đủ 100% tổng tiền hóa đơn.
          </label>
        </>
      )}

      <p className="font-sans text-[12px] leading-[16px] text-ink-secondary">
        Chỉ thu đủ 100%, không hỗ trợ thu một phần · Thao tác không thể hoàn tác.
      </p>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-[8px] border border-line bg-status-danger-soft px-4 py-3 font-sans text-[14px] text-status-danger"
        >
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            error
          </span>
          <p className="flex-1">{error}</p>
        </div>
      )}

      <div className="flex justify-end gap-3 border-t border-line pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={pay.isPending}>
            Quay lại
          </Button>
        )}
        <Button
          type="submit"
          loading={pay.isPending}
          disabled={
            !ready ||
            (!attempt && (!confirmed || !invoice.expectedState || invoice.totalCost == null))
          }
        >
          {attempt ? "Thử lại giao dịch cũ" : "Xác nhận đã thu đủ"}
        </Button>
      </div>
    </form>
  );
}
