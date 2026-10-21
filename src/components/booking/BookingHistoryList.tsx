"use client";

import { useMemo, useState } from "react";
import { useAllMyBookings, useBooking, useBookingInvoice, useCancelBooking } from "@/hooks/useBooking";
import { BookingListToolbar } from "./BookingListToolBar";
import { BookingCard } from "./BookingCard";
import { formatCurrency, getErrorMessage } from "@/utils";
import { toast } from "sonner";
import type { BookingStatus, BookingDetail } from "@/types";

type TabValue = "all" | BookingStatus;
const PAGE_SIZE = 10;

export function BookingHistoryList() {
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState("");
  const [showInvoice, setShowInvoice] = useState(false);
  const { data: bookings = [], isLoading, isError } = useAllMyBookings();
  const cancel = useCancelBooking();
  const { data: detail, isLoading: detailLoading } = useBooking(selectedId);
  const { data: invoice, isLoading: invoiceLoading, isError: invoiceError } = useBookingInvoice(selectedId, showInvoice);

  const filtered: BookingDetail[] = useMemo(() => bookings.filter((booking) =>
    (activeTab === "all" || booking.status === activeTab) &&
    booking.bookingCode.toLowerCase().includes(search.toLowerCase())
  ), [bookings, activeTab, search]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageBookings = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  async function handleCancel(id: string) {
    if (!window.confirm("Xác nhận hủy đặt sân này?")) return;
    try {
      await cancel.mutateAsync({ id, reason: "Khách yêu cầu hủy trên website", idempotencyKey: crypto.randomUUID() });
      toast.success("Đã hủy đặt sân.");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return <div className="flex flex-col gap-5">
    <BookingListToolbar activeTab={activeTab} onTabChange={(tab) => { setActiveTab(tab); setPage(1); }} search={search} onSearchChange={(value) => { setSearch(value); setPage(1); }} />
    <div className="flex flex-col gap-2.5">
      {isLoading && <div className="py-12 text-center text-sm text-gray-400">Đang tải lịch sử đặt sân...</div>}
      {isError && <div role="alert" className="py-12 text-center text-sm text-red-500">Không thể tải dữ liệu. Vui lòng thử lại.</div>}
      {!isLoading && !isError && filtered.length === 0 && <div className="px-6 py-12 text-center text-gray-400">Không tìm thấy đơn đặt sân nào</div>}
      {pageBookings.map((booking) => <BookingCard key={booking.bookingId} booking={booking} onViewDetail={setSelectedId} onCancel={handleCancel} onViewInvoice={(id) => { setSelectedId(id); setShowInvoice(true); }} />)}
    </div>
    {totalPages > 1 && <nav aria-label="Phân trang lịch sử" className="flex items-center justify-center gap-4 text-sm"><button disabled={page <= 1} onClick={() => setPage(page - 1)} className="rounded border px-3 py-2 disabled:opacity-40">Trang trước</button><span>Trang {page} / {totalPages}</span><button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="rounded border px-3 py-2 disabled:opacity-40">Trang sau</button></nav>}
    <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-800">Đơn chưa thanh toán có thể hủy trước giờ bắt đầu ít nhất 1 tiếng. Đơn đã thanh toán cần liên hệ nhân viên.</p>
    {(selectedId || showInvoice) && <div role="presentation" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => { setSelectedId(""); setShowInvoice(false); }}><section role="dialog" aria-modal="true" aria-label={showInvoice ? "Hóa đơn" : "Chi tiết đặt sân"} className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl" onClick={(event) => event.stopPropagation()}><button aria-label="Đóng" className="float-right text-xl" onClick={() => { setSelectedId(""); setShowInvoice(false); }}>×</button>{showInvoice ? <><h2 className="mb-4 text-xl font-semibold">Hóa đơn</h2>{invoiceLoading ? <p>Đang tải hóa đơn...</p> : invoiceError || !invoice ? <p role="alert">Không thể tải hóa đơn.</p> : <dl className="grid grid-cols-2 gap-3 text-sm"><dt>Mã hóa đơn</dt><dd>{invoice.invoiceCode ?? "—"}</dd><dt>Trạng thái</dt><dd>{invoice.status ?? "—"}</dd><dt>Tổng tiền</dt><dd>{formatCurrency(invoice.totalCost ?? 0)}</dd><dt>Phương thức</dt><dd>{invoice.paymentMethod ?? "—"}</dd><dt>Ngày lập</dt><dd>{invoice.issuedAt ? new Date(invoice.issuedAt).toLocaleString("vi-VN") : "—"}</dd><dt>Ngày thanh toán</dt><dd>{invoice.paidAt ? new Date(invoice.paidAt).toLocaleString("vi-VN") : "—"}</dd></dl>}</> : <><h2 className="mb-4 text-xl font-semibold">Chi tiết đặt sân</h2>{detailLoading || !detail ? <p>Đang tải thông tin...</p> : <dl className="grid grid-cols-2 gap-3 text-sm"><dt>Mã đặt sân</dt><dd>{detail.bookingCode}</dd><dt>Sân</dt><dd>{detail.courtName}</dd><dt>Ngày</dt><dd>{detail.date}</dd><dt>Giờ</dt><dd>{detail.startTime} – {detail.endTime}</dd><dt>Trạng thái</dt><dd>{detail.status}</dd><dt>Thanh toán</dt><dd>{detail.paymentStatus ?? "Chưa có hóa đơn"}</dd><dt>Tổng tiền</dt><dd>{formatCurrency(detail.totalCost)}</dd></dl>}</>}</section></div>}
  </div>;
}
