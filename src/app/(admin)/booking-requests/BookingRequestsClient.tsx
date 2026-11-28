"use client";

import { useState } from "react";

import { BookingDetailModal } from "@/components/booking/BookingDetailModal";
import { ConfirmBookingModal } from "@/components/booking/ConfirmBookingModal";
import { RejectBookingModal } from "@/components/booking/RejectBookingModal";
import { Button } from "@/components/ui/Button";
import {
  OperationsEmptyCard,
  OperationsErrorCard,
  OperationsLoadingCard,
} from "@/components/ui/OperationsState";
import { Pagination } from "@/components/ui/Pagination";
import { usePendingBookings } from "@/hooks";
import type { BookingListItem } from "@/types";
import { formatCurrency, formatDate, formatDateTimeVN, getErrorMessage } from "@/utils";

const PAGE_SIZE = 20;

type RowAction = { type: "confirm" | "reject"; booking: BookingListItem };

const HEADERS = [
  "Mã đơn",
  "Thời điểm tạo",
  "Khách hàng",
  "Sân & giờ chơi",
  "Tổng tiền",
];

export default function BookingRequestsClient() {
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [rowAction, setRowAction] = useState<RowAction | null>(null);
  const { data, isLoading, isError, error, refetch } = usePendingBookings({
    pageNumber,
    pageSize: PAGE_SIZE,
  });

  const items = data?.items ?? [];
  const totalPending = data?.totalCount ?? items.length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-[24px] font-semibold leading-[32px] text-ink">
          Yêu cầu đặt sân
        </h1>
        <p className="mt-1 font-sans text-[14px] font-normal leading-[20px] text-ink-secondary">
          Các đơn chờ xác nhận
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[368px_1fr]">
        <div className="flex min-h-[128px] flex-col justify-between rounded-[12px] border border-line bg-status-warning-soft p-[19px]">
          <p className="font-sans text-[14px] leading-[20px] text-ink-secondary">
            Đơn chờ duyệt
          </p>
          <p className="font-sans text-[32px] font-semibold leading-[40px] text-status-warning tabular-nums">
            {isLoading ? "—" : totalPending}
          </p>
          <p className="font-sans text-[12px] leading-[16px] text-ink-secondary">
            Ưu tiên xử lý theo thứ tự cũ nhất
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-[12px] border border-line bg-status-info-soft px-5 py-4 font-sans text-[14px] leading-[22px] text-status-info">
          <p>Xác nhận đơn sẽ tự động lập hóa đơn.</p>
          <p>Chọn đã thu tiền hoặc chưa thu tiền khi duyệt.</p>
        </div>
      </div>

      {isLoading ? (
        <OperationsLoadingCard
          title="Đơn chờ xác nhận"
          subtitle="Đang tải dữ liệu…"
          rows={3}
        />
      ) : isError ? (
        <OperationsErrorCard
          title="Không thể tải danh sách yêu cầu"
          message={getErrorMessage(error)}
          onRetry={() => void refetch()}
        />
      ) : items.length === 0 ? (
        <OperationsEmptyCard
          headerTitle="Đơn chờ xác nhận"
          headerSubtitle="Cũ nhất trước"
          icon="check_circle"
          title="Không có đơn chờ xác nhận"
          description="Các yêu cầu cần xử lý sẽ xuất hiện tại đây."
          actionLabel="Xem lịch sân"
          actionHref="/schedule"
        />
      ) : (
        <div className="overflow-hidden rounded-[12px] border border-line bg-white">
          <div className="px-5 py-4">
            <h2 className="font-display text-[18px] font-medium leading-[26px] text-ink">
              Đơn chờ xác nhận
            </h2>
            <p className="font-sans text-[12px] leading-[16px] text-ink-secondary">
              Cũ nhất trước
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] border-collapse text-left">
              <thead>
                <tr className="h-[40px] border-y border-line bg-status-info-soft font-sans text-[12px] font-semibold leading-[16px] text-ink-secondary">
                  {HEADERS.map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className={
                        header === "Tổng tiền"
                          ? "px-5 text-right"
                          : "px-5"
                      }
                    >
                      {header}
                    </th>
                  ))}
                  <th scope="col" className="px-5 text-right">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {items.map((booking) => (
                  <tr
                    key={booking.bookingId}
                    className="transition-colors duration-100 hover:bg-surface-bg"
                  >
                    <td className="px-5 py-3.5 font-sans text-[14px] font-semibold text-brand-strong tabular-nums">
                      <button
                        type="button"
                        onClick={() => setSelectedId(booking.bookingId)}
                        className="hover:underline"
                      >
                        {booking.bookingCode}
                      </button>
                    </td>
                    <td className="px-5 py-3.5 font-sans text-[12px] text-ink-secondary tabular-nums">
                      {formatDateTimeVN(booking.createdAt)}
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-sans text-[14px] font-semibold leading-[20px] text-ink">
                        {booking.customerName}
                      </p>
                      <p className="font-sans text-[12px] leading-[16px] text-ink-secondary tabular-nums">
                        {booking.customerPhone}
                      </p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-sans text-[14px] leading-[20px] text-ink">
                        {booking.courtName}
                      </p>
                      <p className="font-sans text-[12px] leading-[16px] text-ink-secondary tabular-nums">
                        {formatDate(booking.date)} · {booking.startTime}–
                        {booking.endTime}
                      </p>
                    </td>
                    <td className="px-5 py-3.5 text-right font-sans text-[14px] font-semibold text-ink tabular-nums">
                      {formatCurrency(booking.totalCost)}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedId(booking.bookingId)}
                        >
                          Chi tiết
                        </Button>
                        {booking.status === "Pending" && (
                          <>
                            <Button
                              type="button"
                              size="sm"
                              onClick={() =>
                                setRowAction({ type: "confirm", booking })
                              }
                            >
                              Xác nhận
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="border-status-danger/40 text-status-danger hover:border-status-danger hover:bg-status-danger-soft hover:text-status-danger"
                              onClick={() =>
                                setRowAction({ type: "reject", booking })
                              }
                            >
                              Từ chối
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Pagination
        page={data}
        loading={isLoading}
        onPageChange={setPageNumber}
      />

      {selectedId && (
        <BookingDetailModal
          bookingId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}

      {rowAction?.type === "confirm" && (
        <ConfirmBookingModal
          booking={rowAction.booking}
          action="confirm"
          onClose={() => setRowAction(null)}
        />
      )}
      {rowAction?.type === "reject" && (
        <RejectBookingModal
          booking={rowAction.booking}
          onClose={() => setRowAction(null)}
        />
      )}
    </div>
  );
}