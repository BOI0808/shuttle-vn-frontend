"use client";

import { useEffect, useState } from "react";

import { BookingDetailModal } from "@/components/booking/BookingDetailModal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Pagination } from "@/components/ui/Pagination";
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
const HEADERS = [
  "Mã đơn",
  "Khách hàng",
  "Sân",
  "Ngày giờ",
  "Tổng tiền",
  "Trạng thái",
  "Thanh toán",
];
const LABEL_CLASS = "grid gap-1 text-xs font-semibold text-slate-600";
const SELECT_CLASS =
  "rounded-[7px] border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500";

interface Filters {
  fromDate: string;
  toDate: string;
  courtId: string;
  status: string;
}

const EMPTY_FILTERS: Filters = {
  fromDate: "",
  toDate: "",
  courtId: "",
  status: "",
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
  onSelect: (bookingId: string) => void;
}

function PaymentCell({ status }: { status: BookingListItem["paymentStatus"] }) {
  if (!status) {
    return <span className="text-[12px] text-slate-500">{NO_INVOICE_LABEL}</span>;
  }
  return <Badge status={status}>{INVOICE_STATUS_LABEL[status]}</Badge>;
}

function AllBookingsTable({
  items,
  isLoading,
  isError,
  error,
  onRetry,
  onSelect,
}: AllBookingsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-slate-50/50 font-mono text-[10px] uppercase tracking-wider text-slate-400">
              {HEADERS.map((header) => (
                <th
                  key={header}
                  className="border-b border-slate-100 px-5 py-3 font-semibold"
                >
                  {header}
                </th>
              ))}
              <th className="border-b border-slate-100 px-5 py-3 text-right font-semibold">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading && (
              <tr>
                <td
                  colSpan={HEADERS.length + 1}
                  className="px-5 py-8 text-center font-mono text-slate-500"
                >
                  Đang tải...
                </td>
              </tr>
            )}
            {isError && (
              <tr>
                <td
                  colSpan={HEADERS.length + 1}
                  className="px-5 py-8 text-center text-sm text-red-600"
                >
                  <p>{getErrorMessage(error)}</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mx-auto mt-3 inline-flex w-auto"
                    onClick={onRetry}
                  >
                    Thử lại
                  </Button>
                </td>
              </tr>
            )}
            {!isLoading && !isError && items.length === 0 && (
              <tr>
                <td
                  colSpan={HEADERS.length + 1}
                  className="px-5 py-8 text-center text-sm text-slate-500"
                >
                  Không có đơn đặt sân nào khớp bộ lọc.
                </td>
              </tr>
            )}
            {items.map((booking) => (
              <tr
                key={booking.bookingId}
                className="transition-colors hover:bg-slate-50"
              >
                <td className="px-5 py-4 font-mono text-[12px] font-bold text-blue-600">
                  {booking.bookingCode}
                </td>
                <td className="px-5 py-4">
                  <p className="text-[13px] font-semibold text-slate-900">
                    {booking.customerName}
                  </p>
                  <p className="font-mono text-[11px] text-slate-500">
                    {booking.customerPhone}
                  </p>
                </td>
                <td className="px-5 py-4 text-[13px] text-slate-700">
                  {booking.courtName}
                </td>
                <td className="px-5 py-4 font-mono text-[11px] text-slate-500">
                  {formatDate(booking.date)} · {booking.startTime} –{" "}
                  {booking.endTime}
                </td>
                <td className="px-5 py-4 font-mono text-[12px] font-bold text-slate-900">
                  {formatCurrency(booking.totalCost)}
                </td>
                <td className="px-5 py-4">
                  <Badge status={booking.status}>
                    {BOOKING_STATUS_LABEL[booking.status]}
                  </Badge>
                </td>
                <td className="px-5 py-4">
                  <PaymentCell status={booking.paymentStatus} />
                </td>
                <td className="px-5 py-4 text-right">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="inline-flex w-auto"
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
    </div>
  );
}

export default function AllBookingsClient({
  initialCustomerId,
}: AllBookingsClientProps) {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [customerId, setCustomerId] = useState(initialCustomerId);
  const [searchInput, setSearchInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setKeyword(searchInput.trim());
      setPageNumber(1);
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const isRangeInvalid =
    filters.fromDate !== "" &&
    filters.toDate !== "" &&
    filters.fromDate > filters.toDate;

  const params: BookingAdminQueryParams = {
    fromDate: filters.fromDate || undefined,
    toDate: filters.toDate || undefined,
    courtId: filters.courtId ? Number(filters.courtId) : undefined,
    status: filters.status || undefined,
    customerId,
    keyword: keyword || undefined,
    pageNumber,
    pageSize: PAGE_SIZE,
  };

  const { data, isLoading, isError, error, refetch } = useAllBookings(
    params,
    !isRangeInvalid
  );
  const { data: courts } = useCourts();

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
    setPageNumber(1);
  };

  const handleClearCustomer = () => {
    setCustomerId(undefined);
    setPageNumber(1);
  };

  const handleClearFilters = () => {
    setFilters(EMPTY_FILTERS);
    setCustomerId(undefined);
    setSearchInput("");
    setKeyword("");
    setPageNumber(1);
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="text-[13px] text-slate-500">
        Ngày tính theo ngày sử dụng sân (giờ Việt Nam), gồm cả hai ngày.
      </p>

      <div className="flex flex-wrap items-end gap-3">
        <label className={LABEL_CLASS}>
          Từ ngày
          <Input
            type="date"
            className="py-2"
            value={filters.fromDate}
            onChange={(event) =>
              handleFilterChange("fromDate", event.target.value)
            }
          />
        </label>
        <label className={LABEL_CLASS}>
          Đến ngày
          <Input
            type="date"
            className="py-2"
            value={filters.toDate}
            onChange={(event) =>
              handleFilterChange("toDate", event.target.value)
            }
          />
        </label>
        <label className={LABEL_CLASS}>
          Sân
          <select
            className={SELECT_CLASS}
            value={filters.courtId}
            onChange={(event) =>
              handleFilterChange("courtId", event.target.value)
            }
          >
            <option value="">Tất cả</option>
            {(courts ?? []).map((court) => (
              <option key={court.courtId} value={court.courtId}>
                {court.name}
              </option>
            ))}
          </select>
        </label>
        <label className={LABEL_CLASS}>
          Trạng thái đơn
          <select
            className={SELECT_CLASS}
            value={filters.status}
            onChange={(event) =>
              handleFilterChange("status", event.target.value)
            }
          >
            <option value="">Tất cả</option>
            {Object.entries(BOOKING_STATUS_LABEL).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className={`${LABEL_CLASS} min-w-[240px] flex-1`}>
          Từ khóa
          <input
            className={SELECT_CLASS}
            placeholder="Mã đơn, tên, SĐT, email khách..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </label>
        <Button
          type="button"
          variant="outline"
          className="w-auto"
          onClick={handleClearFilters}
        >
          Xóa lọc
        </Button>
      </div>

      {customerId && (
        <div className="flex items-center gap-3 text-[13px] text-slate-600">
          <span>Đang lọc theo một khách hàng.</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-auto"
            onClick={handleClearCustomer}
          >
            Bỏ lọc khách hàng
          </Button>
        </div>
      )}

      {isRangeInvalid ? (
        <p role="alert" className="text-sm text-red-600">
          Từ ngày không được lớn hơn Đến ngày.
        </p>
      ) : (
        <>
          <AllBookingsTable
            items={data?.items ?? []}
            isLoading={isLoading}
            isError={isError}
            error={error}
            onRetry={() => refetch()}
            onSelect={setSelectedId}
          />
          {data && <Pagination page={data} onPageChange={setPageNumber} />}
        </>
      )}

      {selectedId && (
        <BookingDetailModal
          bookingId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}