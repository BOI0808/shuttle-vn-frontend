"use client";

import { useEffect, useState } from "react";

import { BookingDetailModal } from "@/components/booking/BookingDetailModal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CustomDatePicker } from "@/components/ui/CustomDatePicker";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Pagination } from "@/components/ui/Pagination";
import { Select } from "@/components/ui/Select";
import {
  BOOKING_STATUS_LABEL,
  BookingAdminQueryParams,
  INVOICE_STATUS_LABEL,
  NO_INVOICE_LABEL,
} from "@/config/app";
import { useAllBookings, useCourts } from "@/hooks";
import type { BookingListItem } from "@/types";
import { formatCurrency, formatDate, getErrorMessage } from "@/utils";

const PAGE_SIZE = 20;
const SEARCH_DEBOUNCE_MS = 400;

interface Filters {
  fromDate: string;
  toDate: string;
  courtId: string;
  status: string;
  keyword: string;
}

const EMPTY_FILTERS: Filters = {
  fromDate: "",
  toDate: "",
  courtId: "",
  status: "",
  keyword: "",
};

interface AllBookingsClientProps {
  initialCustomerId?: string;
}

interface AllBookingsTableProps {
  items: BookingListItem[];
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  onRetry: () => void;
  onClearFilters: () => void;
  onSelect: (bookingId: string) => void;
}

function PaymentCell({ status }: { status: BookingListItem["paymentStatus"] }) {
  if (!status) {
    return <Badge status="NoInvoice">{NO_INVOICE_LABEL}</Badge>;
  }
  return <Badge status={status}>{INVOICE_STATUS_LABEL[status]}</Badge>;
}

function AllBookingsTable({
  items,
  isLoading,
  isError,
  error,
  onRetry,
  onClearFilters,
  onSelect,
}: AllBookingsTableProps) {
  return (
    <section className="overflow-hidden rounded-[12px] border border-line bg-white">
      <div className="px-5 py-4">
        <h2 className="font-display text-[18px] font-medium leading-[26px] text-ink">
          Danh sách đơn đặt sân
        </h2>
        <p className="mt-1 font-sans text-[12px] leading-[16px] text-ink-secondary">
          Ngày tính theo ngày sử dụng sân (giờ Việt Nam), gồm cả hai ngày.
        </p>
      </div>

      {isLoading ? (
        <div aria-busy="true">
          <div className="hidden h-[44px] grid-cols-6 items-center border-y border-line bg-status-info-soft px-5 font-sans text-[12px] font-semibold text-ink-secondary md:grid">
            <span>Mã đơn</span>
            <span>Khách hàng</span>
            <span>Sân</span>
            <span>Ngày giờ</span>
            <span>Tổng tiền</span>
            <span>Trạng thái</span>
          </div>
          <div className="space-y-4 p-5">
            {[0, 1, 2, 3].map((row) => (
              <div
                key={row}
                className="grid grid-cols-1 gap-3 py-1.5 animate-pulse md:grid-cols-6"
              >
                <div className="h-[16px] w-24 rounded-[8px] bg-surface-soft" />
                <div className="h-[16px] w-36 rounded-[8px] bg-surface-soft" />
                <div className="h-[16px] w-20 rounded-[8px] bg-surface-soft" />
                <div className="h-[16px] w-40 rounded-[8px] bg-surface-soft" />
                <div className="h-[16px] w-24 rounded-[8px] bg-surface-soft" />
                <div className="h-[16px] w-24 rounded-[8px] bg-surface-soft" />
              </div>
            ))}
            <p className="border-t border-line pt-4 font-sans text-[12px] leading-[16px] text-ink-secondary">
              Đang tải dữ liệu…
            </p>
          </div>
        </div>
      ) : isError ? (
        <div role="alert" className="border-t border-line p-6">
          <div className="flex size-[40px] items-center justify-center rounded-[8px] bg-status-danger-soft text-status-danger">
            <span
              className="material-symbols-outlined text-[24px]"
              aria-hidden="true"
            >
              warning
            </span>
          </div>
          <h3 className="mt-4 font-display text-[18px] font-medium leading-[26px] text-ink">
            Không thể tải dữ liệu
          </h3>
          <div className="mt-2 space-y-0.5 font-sans text-[14px] leading-[20px] text-ink-secondary">
            <p>{getErrorMessage(error)}</p>
            <p>Dữ liệu chưa tải được, không phải dữ liệu bằng 0.</p>
          </div>
          <div className="mt-4">
            <Button type="button" variant="outline" onClick={onRetry}>
              Thử lại
            </Button>
          </div>
          <div className="mt-5 border-t border-line pt-4">
            <p className="font-sans text-[12px] leading-[16px] text-ink-secondary">
              Giữ nguyên ngữ cảnh và các lựa chọn khi tải lại.
            </p>
          </div>
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center border-t border-line px-6 py-12 text-center">
          <div className="flex size-[48px] items-center justify-center rounded-[12px] bg-brand-soft text-brand-strong">
            <span
              className="material-symbols-outlined text-[24px]"
              aria-hidden="true"
            >
              check_circle
            </span>
          </div>
          <p className="mt-4 font-sans text-[14px] font-semibold text-ink">
            Không tìm thấy kết quả phù hợp
          </p>
          <p className="mt-1 max-w-md font-sans text-[14px] text-ink-secondary">
            Thử thay đổi từ khóa hoặc bộ lọc.
          </p>
          <div className="mt-4">
            <Button type="button" variant="outline" onClick={onClearFilters}>
              Xóa bộ lọc
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="h-[44px] border-y border-line bg-status-info-soft font-sans text-[12px] font-semibold leading-[16px] text-ink-secondary">
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Mã đơn
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Khách hàng
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Sân
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Ngày giờ
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-right font-semibold"
                  >
                    Tổng tiền
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Trạng thái
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Thanh toán
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-right font-semibold"
                  >
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
                    <td className="px-5 py-4 align-middle font-sans text-[14px] font-semibold text-brand-strong tabular-nums">
                      {booking.bookingCode}
                    </td>
                    <td className="px-5 py-4 align-middle">
                      <p className="font-sans text-[14px] font-semibold leading-[20px] text-ink">
                        {booking.customerName}
                      </p>
                      <p className="font-sans text-[12px] leading-[16px] text-ink-secondary tabular-nums">
                        {booking.customerPhone}
                      </p>
                    </td>
                    <td className="px-5 py-4 align-middle font-sans text-[14px] text-ink">
                      {booking.courtName}
                    </td>
                    <td className="px-5 py-4 align-middle font-sans text-[12px] leading-[16px] text-ink-secondary tabular-nums">
                      {formatDate(booking.date)} · {booking.startTime}–
                      {booking.endTime}
                    </td>
                    <td className="px-5 py-4 text-right align-middle font-sans text-[14px] font-medium text-ink tabular-nums">
                      {formatCurrency(booking.totalCost)}
                    </td>
                    <td className="px-5 py-4 align-middle">
                      <Badge status={booking.status}>
                        {BOOKING_STATUS_LABEL[booking.status]}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 align-middle">
                      <PaymentCell status={booking.paymentStatus} />
                    </td>
                    <td className="px-5 py-4 text-right align-middle">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => onSelect(booking.bookingId)}
                      >
                        Chi tiết
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-line border-t border-line md:hidden">
            {items.map((booking) => (
              <div key={booking.bookingId} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-sans text-[14px] font-semibold text-brand-strong tabular-nums">
                      {booking.bookingCode}
                    </p>
                    <p className="mt-0.5 truncate font-sans text-[14px] font-semibold text-ink">
                      {booking.customerName}
                    </p>
                    <p className="font-sans text-[12px] text-ink-secondary tabular-nums">
                      {booking.customerPhone}
                    </p>
                    <p className="mt-1 font-sans text-[12px] text-ink-secondary tabular-nums">
                      {booking.courtName} · {formatDate(booking.date)} ·{" "}
                      {booking.startTime}–{booking.endTime}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <Badge status={booking.status}>
                      {BOOKING_STATUS_LABEL[booking.status]}
                    </Badge>
                    <PaymentCell status={booking.paymentStatus} />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="font-sans text-[14px] font-medium text-ink tabular-nums">
                    {formatCurrency(booking.totalCost)}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onSelect(booking.bookingId)}
                  >
                    Chi tiết
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-line px-5 py-3 font-sans text-[12px] leading-[16px] text-ink-secondary tabular-nums">
            {items.length} đơn đang hiển thị
          </div>
        </>
      )}
    </section>
  );
}

export default function AllBookingsClient({
  initialCustomerId,
}: AllBookingsClientProps) {
  const [draft, setDraft] = useState<Filters>(EMPTY_FILTERS);
  const [applied, setApplied] = useState<Filters>(EMPTY_FILTERS);
  const [customerId, setCustomerId] = useState(initialCustomerId);
  const [pageNumber, setPageNumber] = useState(1);
  const [dateError, setDateError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const params: BookingAdminQueryParams = {
    fromDate: applied.fromDate || undefined,
    toDate: applied.toDate || undefined,
    courtId: applied.courtId ? Number(applied.courtId) : undefined,
    status: applied.status || undefined,
    customerId,
    keyword: applied.keyword.trim() || undefined,
    pageNumber,
    pageSize: PAGE_SIZE,
  };

  const { data, isLoading, isError, error, refetch } = useAllBookings(
    params,
    true
  );
  const { data: courts } = useCourts();

  const handleDraftChange = (key: keyof Filters, value: string) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const applyFilters = () => {
    if (draft.fromDate !== "" && draft.toDate !== "" && draft.fromDate > draft.toDate) {
      setDateError("Từ ngày không được lớn hơn Đến ngày.");
      return;
    }
    setDateError(null);
    const isSame =
      draft.fromDate === applied.fromDate &&
      draft.toDate === applied.toDate &&
      draft.courtId === applied.courtId &&
      draft.status === applied.status &&
      draft.keyword.trim() === applied.keyword.trim() &&
      pageNumber === 1;
    const normalized: Filters = { ...draft, keyword: draft.keyword.trim() };
    setApplied(normalized);
    setPageNumber(1);
    if (isSame) {
      void refetch();
    }
  };

  const handleClearCustomer = () => {
    setCustomerId(undefined);
    setPageNumber(1);
  };

  const handleClearFilters = () => {
    setDraft(EMPTY_FILTERS);
    setApplied(EMPTY_FILTERS);
    setCustomerId(undefined);
    setDateError(null);
    setPageNumber(1);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-[24px] font-semibold leading-[32px] text-ink">
          Đặt sân toàn hệ thống
        </h1>
        <p className="mt-1 font-sans text-[14px] font-normal leading-[20px] text-ink-secondary">
          Tra cứu và theo dõi vòng đời đơn đặt sân
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          applyFilters();
        }}
        className="rounded-[12px] border border-line bg-white p-5"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Label htmlFor="filter-from-date">Từ ngày</Label>
            <CustomDatePicker
              id="filter-from-date"
              className="relative"
              fullWidth
              allowClear
              placeholder="Chọn ngày"
              value={draft.fromDate}
              onChange={(dateStr) => handleDraftChange("fromDate", dateStr)}
            />
          </div>

          <div>
            <Label htmlFor="filter-to-date">Đến ngày</Label>
            <CustomDatePicker
              id="filter-to-date"
              className="relative"
              fullWidth
              allowClear
              placeholder="Chọn ngày"
              value={draft.toDate}
              onChange={(dateStr) => handleDraftChange("toDate", dateStr)}
            />
          </div>

          <div>
            <Label htmlFor="filter-court">Sân</Label>
            <Select
              id="filter-court"
              value={draft.courtId}
              onChange={(event) =>
                handleDraftChange("courtId", event.target.value)
              }
            >
              <option value="">Tất cả sân</option>
              {(courts ?? []).map((court) => (
                <option key={court.courtId} value={court.courtId}>
                  {court.name}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="filter-status">Trạng thái</Label>
            <Select
              id="filter-status"
              value={draft.status}
              onChange={(event) =>
                handleDraftChange("status", event.target.value)
              }
            >
              <option value="">Tất cả</option>
              {Object.entries(BOOKING_STATUS_LABEL).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-end gap-4">
          <div className="min-w-[240px] flex-1">
            <Label htmlFor="filter-keyword">Từ khóa</Label>
            <Input
              id="filter-keyword"
              icon={
                <span
                  className="material-symbols-outlined text-[20px]"
                  aria-hidden="true"
                >
                  search
                </span>
              }
              placeholder="Mã đơn, tên, SĐT, email khách..."
              value={draft.keyword}
              onChange={(event) =>
                handleDraftChange("keyword", event.target.value)
              }
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClearFilters}
            >
              Xóa lọc
            </Button>
            <Button type="submit" variant="primary">
              Tìm kiếm
            </Button>
          </div>
        </div>

        {dateError && (
          <p
            role="alert"
            className="mt-3 font-sans text-[12px] leading-[16px] text-status-danger"
          >
            {dateError}
          </p>
        )}

        {customerId && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-[8px] border border-line bg-surface-soft px-4 py-2.5">
            <span className="font-sans text-[13px] text-ink-secondary">
              Đang lọc theo một khách hàng.
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClearCustomer}
            >
              Bỏ lọc khách hàng
            </Button>
          </div>
        )}
      </form>

      <AllBookingsTable
        items={data?.items ?? []}
        isLoading={isLoading}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
        onClearFilters={handleClearFilters}
        onSelect={setSelectedId}
      />
      {data && <Pagination page={data} onPageChange={setPageNumber} />}

      {selectedId && (
        <BookingDetailModal
          bookingId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
