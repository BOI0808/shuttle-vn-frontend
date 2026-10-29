"use client";

import { useEffect, useRef, useState } from "react";
import { isAxiosError } from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { useRescheduleBooking } from "@/hooks/useBooking";
import { useCourts } from "@/hooks/useCourt";
import { bookingService } from "@/services";
import type { BookingAdminDetail, BookingDetail, PaymentMethod, RescheduleBookingRequest, ReschedulePreview } from "@/types";
import { canRescheduleBooking, formatCurrency, getErrorMessage, isBeforeBookingChangeDeadline } from "@/utils";

interface RescheduleBookingModalProps {
  booking: BookingDetail | BookingAdminDetail;
  isStaff?: boolean;
  onClose: () => void;
}

export function RescheduleBookingModal({ booking, isStaff = false, onClose }: RescheduleBookingModalProps) {
  const [courtId, setCourtId] = useState(booking.courtId);
  const [date, setDate] = useState(booking.date);
  const [startTime, setStartTime] = useState(booking.startTime.slice(0, 5));
  const [endTime, setEndTime] = useState(booking.endTime.slice(0, 5));
  const [reason, setReason] = useState("");
  const [refundMethod, setRefundMethod] = useState<PaymentMethod>("Cash");
  const [refundedAt, setRefundedAt] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [refundConfirmed, setRefundConfirmed] = useState(false);
  const [preview, setPreview] = useState<ReschedulePreview | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [error, setError] = useState("");
  const [uncertain, setUncertain] = useState(false);
  const attempt = useRef<{ payload: RescheduleBookingRequest; idempotencyKey: string } | null>(null);
  const { data: courts = [], isLoading: courtsLoading, isError: courtsError } = useCourts();
  const reschedule = useRescheduleBooking();
  const busy = loadingPreview || reschedule.isPending;
  const eligible = canRescheduleBooking(booking, isStaff);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    return () => previous?.focus();
  }, []);

  function handleDialogKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape" && !busy && !uncertain) onClose();
    if (event.key !== "Tab") return;
    const controls = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]'
    ) ?? []).filter((element) => !element.closest("fieldset:disabled"));
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  async function getPreview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!eligible || endTime <= startTime ||
      !isBeforeBookingChangeDeadline(date, startTime)) {
      setError("Lịch cũ và mới phải cách hiện tại ít nhất 1 giờ; giờ kết thúc phải sau giờ bắt đầu.");
      return;
    }
    setLoadingPreview(true);
    try {
      const result = await bookingService.getReschedulePreview(booking.bookingId, { courtId, date, startTime, endTime });
      if (!result.expectedState || typeof result.quote?.totalCost !== "number" || !result.quote.quoteFingerprint) {
        setError("Báo giá không đầy đủ. Vui lòng tải lại.");
        return;
      }
      setPreview(result);
      setRefundConfirmed(false);
    } catch (cause) {
      setError(getErrorMessage(cause));
    } finally {
      setLoadingPreview(false);
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!preview || (preview.requiresRefund && (!isStaff || !refundConfirmed))) return;
    setError("");
    if (!attempt.current) {
      attempt.current = {
        idempotencyKey: crypto.randomUUID(),
        payload: {
          courtId, date, startTime, endTime, reason: reason.trim() || undefined,
          totalCost: preview.quote!.totalCost,
          quoteFingerprint: preview.quote!.quoteFingerprint,
          expectedState: preview.expectedState,
          ...(preview.requiresRefund ? { refund: {
            amount: booking.totalCost,
            method: refundMethod,
            refundedAt: new Date(`${refundedAt}+07:00`).toISOString(),
            reason: refundReason.trim(),
          } } : {}),
        },
      };
    }
    try {
      await reschedule.mutateAsync({ id: booking.bookingId, ...attempt.current });
      toast.success("Đã đổi lịch đặt sân.");
      onClose();
    } catch (cause) {
      const retrySame = !isAxiosError(cause) || !cause.response || cause.response.status >= 500;
      setUncertain(retrySame);
      if (!retrySame) {
        attempt.current = null;
        setPreview(null);
      }
      setError(retrySame
        ? "Chưa xác định kết quả. Thử lại để kiểm tra cùng yêu cầu, không hoàn tiền lần nữa."
        : `${getErrorMessage(cause)} Vui lòng xem lại báo giá và xác nhận lại.`);
    }
  }

  const fieldClass = "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900";
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 p-4">
      <section ref={dialogRef} tabIndex={-1} onKeyDown={handleDialogKeyDown} role="dialog" aria-modal="true" aria-labelledby="reschedule-title" className="max-h-[90dvh] w-full max-w-xl overflow-y-auto rounded-xl border border-gray-200 bg-white p-6">
        <h2 id="reschedule-title" className="text-xl font-semibold text-gray-900">Đổi lịch đặt sân</h2>
        <p className="mt-2 text-sm text-gray-600">{booking.bookingCode}: {booking.courtName}, {booking.date}, {booking.startTime} - {booking.endTime}</p>
        <p className="mt-2 text-sm text-gray-600">Đổi lịch có hiệu lực ngay. Lịch cũ và mới phải cách hiện tại ít nhất 1 giờ.</p>
        {!eligible && <p role="alert" className="mt-3 text-sm text-red-700">Đơn không đủ điều kiện đổi lịch. Đơn đã thanh toán cần liên hệ nhân viên.</p>}
        <form className="mt-5 space-y-4" onSubmit={preview ? submit : getPreview}>
          <fieldset disabled={busy || !!preview || !eligible} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="space-y-1 text-sm sm:col-span-2"><span>Sân</span><select required value={courtId} onChange={(event) => setCourtId(Number(event.target.value))} className={fieldClass}>{courts.filter((court) => court.status === "Active").map((court) => <option key={court.courtId} value={court.courtId}>{court.name}</option>)}</select></label>
            <label className="space-y-1 text-sm sm:col-span-2"><span>Ngày chơi</span><input required type="date" value={date} onChange={(event) => setDate(event.target.value)} className={fieldClass} /></label>
            <label className="space-y-1 text-sm"><span>Giờ bắt đầu</span><input required type="time" step="1800" value={startTime} onChange={(event) => setStartTime(event.target.value)} className={fieldClass} /></label>
            <label className="space-y-1 text-sm"><span>Giờ kết thúc</span><input required type="time" step="1800" value={endTime} onChange={(event) => setEndTime(event.target.value)} className={fieldClass} /></label>
            <label className="space-y-1 text-sm sm:col-span-2"><span>Lý do đổi lịch</span><textarea value={reason} onChange={(event) => setReason(event.target.value)} className={fieldClass} /></label>
          </fieldset>
          {courtsLoading && <p className="text-sm text-gray-600">Đang tải danh sách sân...</p>}
          {courtsError && <p role="alert" className="text-sm text-red-700">Không thể tải danh sách sân. Vui lòng mở lại.</p>}
          {preview && <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm"><p>Tổng tiền cũ: {formatCurrency(booking.totalCost)}</p><p className="mt-2 font-semibold">Tổng tiền mới: {formatCurrency(preview.quote!.totalCost!)}</p>{preview.requiresRefund && <p className="mt-2 text-amber-800">Phải hoàn đủ {formatCurrency(booking.totalCost)} ngoài hệ thống. Hóa đơn thay thế chưa thanh toán; thu mới là thao tác riêng.</p>}</div>}
          {preview?.requiresRefund && isStaff && <fieldset disabled={busy || uncertain} className="space-y-3">
            <legend className="mb-2 font-medium">Chứng cứ hoàn tiền</legend>
            <label className="block space-y-1 text-sm"><span>Phương thức hoàn</span><select value={refundMethod} onChange={(event) => setRefundMethod(event.target.value as PaymentMethod)} className={fieldClass}><option value="Cash">Tiền mặt</option><option value="Bank">Chuyển khoản</option></select></label>
            <label className="block space-y-1 text-sm"><span>Thời điểm hoàn (giờ Việt Nam)</span><input required type="datetime-local" value={refundedAt} onChange={(event) => setRefundedAt(event.target.value)} className={fieldClass} /></label>
            <label className="block space-y-1 text-sm"><span>Lý do hoàn</span><input required value={refundReason} onChange={(event) => setRefundReason(event.target.value)} className={fieldClass} /></label>
            <label className="flex items-start gap-2 text-sm"><input required type="checkbox" checked={refundConfirmed} onChange={(event) => setRefundConfirmed(event.target.checked)} />Đã hoàn đủ tiền ngoài hệ thống; nếu lưu thất bại phải đối chiếu, không hoàn lần nữa.</label>
          </fieldset>}
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <div className="flex flex-wrap justify-end gap-2">
            <Button type="button" variant="outline" className="w-auto" disabled={busy || uncertain} onClick={onClose}>Đóng</Button>
            {preview && <Button type="button" variant="outline" className="w-auto" disabled={busy || uncertain} onClick={() => { setPreview(null); attempt.current = null; setError(""); }}>Sửa lịch</Button>}
            <Button type="submit" className="w-auto" disabled={busy || (!uncertain && (!eligible || courtsLoading || courtsError || !courts.some((court) => court.courtId === courtId && court.status === "Active"))) || (!!preview?.requiresRefund && (!isStaff || !refundConfirmed))}>{busy ? "Đang xử lý..." : uncertain ? "Thử lại" : preview ? "Xác nhận tổng tiền" : "Xem báo giá"}</Button>
          </div>
        </form>
      </section>
    </div>
  );
}
