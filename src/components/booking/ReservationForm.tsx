"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useCreateBooking, useCreateGuestBooking, usePricePreview } from "@/hooks/useBooking";
import { authService } from "@/services";
import type { ApiResponse, PricePreviewDto } from "@/types";
import { formatCurrency } from "@/utils";

export function ReservationForm({ guest = false }: { guest?: boolean }) {
  const params = useSearchParams();
  const router = useRouter();
  const courtId = Number(params.get("courtId"));
  const date = params.get("date") ?? "";
  const startTime = params.get("startTime") ?? "";
  const endTime = params.get("endTime") ?? "";
  const quoteQuery = usePricePreview({ courtId, date, startTime, endTime });
  const createMember = useCreateBooking();
  const createGuest = useCreateGuestBooking();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeRequested, setCodeRequested] = useState(false);
  const [replacementQuote, setReplacementQuote] = useState<PricePreviewDto | null>(null);
  const [error, setError] = useState("");
  const [successCode, setSuccessCode] = useState("");
  const idempotencyKey = useRef<string | null>(null);
  const quote = replacementQuote ?? quoteQuery.data;
  const pending = createMember.isPending || createGuest.isPending;

  async function requestCode() {
    setError("");
    try {
      await authService.sendVerificationCode({ email, type: "QuickBooking" });
      setCodeRequested(true);
    } catch {
      setError("Không thể yêu cầu mã xác minh. Vui lòng thử lại.");
    }
  }

  async function submit(acceptedQuote = quote) {
    if (!acceptedQuote) return;
    setError("");
    const payload = {
      courtId, date, startTime, endTime,
      totalCost: acceptedQuote.totalCost ?? 0,
      quoteFingerprint: acceptedQuote.quoteFingerprint ?? "",
    };
    try {
      idempotencyKey.current ??= crypto.randomUUID();
      const booking = guest
        ? await createGuest.mutateAsync({ payload: { ...payload, fullName: name, phone, email, verificationCode }, idempotencyKey: idempotencyKey.current })
        : await createMember.mutateAsync({ payload, idempotencyKey: idempotencyKey.current });
      setSuccessCode(booking.bookingCode);
      setReplacementQuote(null);
      idempotencyKey.current = null;
    } catch (cause) {
      if (axios.isAxiosError<ApiResponse<PricePreviewDto>>(cause) && cause.response?.status === 409) {
        const nextQuote = cause.response.data?.data;
        if (nextQuote && typeof nextQuote.totalCost === "number") {
          setReplacementQuote(nextQuote);
          idempotencyKey.current = null;
          return;
        }
      }
      setError("Không thể đặt sân. Vui lòng kiểm tra thông tin và thử lại.");
    }
  }

  if (!courtId || !date || !startTime || !endTime) {
    return <section className="mx-auto max-w-xl p-8 text-center">Thông tin khung giờ không hợp lệ. <button className="text-emerald-700 underline" onClick={() => router.push("/courts")}>Quay lại chọn sân</button></section>;
  }

  if (successCode) return <section className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm"><h1 className="text-2xl font-semibold">Đặt sân thành công</h1><p className="mt-3">Mã đặt sân: <strong>{successCode}</strong></p><button className="mt-6 rounded-lg bg-emerald-700 px-5 py-3 text-white" onClick={() => router.push(guest ? "/lookup" : "/my-bookings")}>Xem đặt sân</button></section>;

  return <section className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
    <h1 className="text-2xl font-semibold text-slate-900">{guest ? "Đặt sân nhanh" : "Xác nhận đặt sân"}</h1>
    <dl className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-4 text-sm"><dt className="text-slate-500">Ngày</dt><dd>{date}</dd><dt className="text-slate-500">Khung giờ</dt><dd>{startTime} – {endTime}</dd><dt className="text-slate-500">Tổng tiền</dt><dd className="font-semibold">{quote ? formatCurrency(quote.totalCost ?? 0) : "Đang tính..."}</dd></dl>
    {guest && <div className="mt-5 grid gap-3"><input required value={name} onChange={e => setName(e.target.value)} placeholder="Họ và tên" className="rounded-lg border p-3"/><input required value={phone} onChange={e => setPhone(e.target.value)} placeholder="Số điện thoại" className="rounded-lg border p-3"/><div className="flex gap-2"><input required type="email" value={email} onChange={e => { setEmail(e.target.value); setCodeRequested(false); setVerificationCode(""); }} placeholder="Email" className="min-w-0 flex-1 rounded-lg border p-3"/><button type="button" disabled={!email || codeRequested} onClick={requestCode} className="rounded-lg border px-3 text-sm disabled:opacity-50">{codeRequested ? "Đã yêu cầu" : "Nhận mã"}</button></div>{codeRequested && <input required value={verificationCode} onChange={e => setVerificationCode(e.target.value)} placeholder="Mã xác minh" className="rounded-lg border p-3"/>}</div>}
    {replacementQuote && <div role="alert" className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm">Giá đã thay đổi. Giá mới: <strong>{formatCurrency(replacementQuote.totalCost ?? 0)}</strong>. Xác nhận giá mới để tiếp tục.<button disabled={pending} onClick={() => submit(replacementQuote)} className="mt-3 block rounded-lg bg-amber-700 px-4 py-2 text-white disabled:opacity-50">Đồng ý giá mới</button></div>}
    {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
    {!replacementQuote && <button disabled={!quote || pending || (guest && (!name || !phone || !email || !verificationCode || !codeRequested))} onClick={() => submit()} className="mt-6 w-full rounded-lg bg-emerald-700 px-5 py-3 font-medium text-white disabled:opacity-50">{pending ? "Đang gửi..." : "Xác nhận đặt sân"}</button>}
    {quoteQuery.isError && <p className="mt-3 text-sm text-red-700">Không thể tải giá sân. Vui lòng quay lại thử lại.</p>}
  </section>;
}
