"use client";

import { FormEvent, useState } from "react";

import { differenceInCalendarDays, parseISO } from "date-fns";

import { RevenueChart } from "@/components/admin/RevenueChart";
import { RevenueReportTable } from "@/components/admin/RevenueReportTable";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { useRevenueStats } from "@/hooks";

import type { RevenueGroupBy, RevenueReportParams } from "@/types";
import { formatCurrency, getErrorMessage, getTodayVN } from "@/utils";

const MAX_RANGE_DAYS = 366;
const LABEL_CLASS = "grid gap-1 text-xs font-semibold text-slate-600";
const SELECT_CLASS =
  "rounded-[7px] border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500";
const GROUP_BY_OPTIONS: { value: RevenueGroupBy; label: string }[] = [
  { value: "Day", label: "Ngày" },
  { value: "Month", label: "Tháng" },
];

function createDefaultFilters(): RevenueReportParams {
  const today = getTodayVN();
  return {
    fromDate: `${today.slice(0, 8)}01`,
    toDate: today,
    groupBy: "Day",
  };
}

function validateRange(fromDate: string, toDate: string): string | null {
  if (!fromDate || !toDate) return "Vui lòng chọn khoảng thời gian.";
  if (fromDate > toDate) return "Từ ngày không được sau Đến ngày.";
  if (differenceInCalendarDays(parseISO(toDate), parseISO(fromDate)) >= MAX_RANGE_DAYS) {
    return "Khoảng thời gian tối đa 366 ngày.";
  }
  return null;
}

function isSameFilters(a: RevenueReportParams, b: RevenueReportParams): boolean {
  return (
    a.fromDate === b.fromDate && a.toDate === b.toDate && a.groupBy === b.groupBy
  );
}

function ReportSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true">
      <div className="h-[350px] animate-pulse rounded-xl bg-slate-200/60" />
      <div className="h-[220px] animate-pulse rounded-xl bg-slate-200/60" />
    </div>
  );
}

export default function StatisticsClient() {
  const [draft, setDraft] = useState<RevenueReportParams>(createDefaultFilters);
  const [applied, setApplied] = useState<RevenueReportParams | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { data, isLoading, isFetching, isError, error, refetch } =
    useRevenueStats(applied);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = validateRange(draft.fromDate, draft.toDate);
    setValidationError(message);
    if (message) return;
    if (applied && isSameFilters(applied, draft)) {
      refetch();
      return;
    }
    setApplied(draft);
  };

  const handleGroupByChange = (value: string) => {
    const option = GROUP_BY_OPTIONS.find((item) => item.value === value);
    if (option) setDraft((current) => ({ ...current, groupBy: option.value }));
  };

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap items-end gap-3"
      >
        <label className={LABEL_CLASS}>
          Từ ngày
          <Input
            type="date"
            className="py-2"
            min="2000-01-01"
            max="2100-12-31"
            value={draft.fromDate}
            onChange={(event) =>
              setDraft((current) => ({ ...current, fromDate: event.target.value }))
            }
          />
        </label>
        <label className={LABEL_CLASS}>
          Đến ngày
          <Input
            type="date"
            className="py-2"
            min="2000-01-01"
            max="2100-12-31"
            value={draft.toDate}
            onChange={(event) =>
              setDraft((current) => ({ ...current, toDate: event.target.value }))
            }
          />
        </label>
        <label className={LABEL_CLASS}>
          Nhóm theo
          <select
            className={SELECT_CLASS}
            value={draft.groupBy}
            onChange={(event) => handleGroupByChange(event.target.value)}
          >
            {GROUP_BY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <Button type="submit" className="w-auto" loading={isFetching}>
          Xem báo cáo
        </Button>
      </form>

      {validationError && (
        <p role="alert" className="text-sm text-red-600">
          {validationError}
        </p>
      )}

      {!applied && (
        <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          Chọn khoảng thời gian rồi bấm Xem báo cáo.
        </p>
      )}

      {applied && isLoading && <ReportSkeleton />}

      {applied && isError && (
        <div
          role="alert"
          className="flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <span>{getErrorMessage(error)}</span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-auto"
            onClick={() => refetch()}
          >
            Thử lại
          </Button>
        </div>
      )}

      {data && !isError && (
        <>
          <p className="text-[13px] text-slate-600">
            Tổng doanh thu:{" "}
            <span className="font-mono font-bold text-slate-900">
              {formatCurrency(data.totalRevenue)}
            </span>{" "}
            ·{" "}
            <span className="font-mono font-bold text-slate-900">
              {data.totalInvoices}
            </span>{" "}
            hóa đơn đã thu
          </p>

          {data.totalInvoices === 0 ? (
            <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              Không có dữ liệu trong khoảng đã chọn.
            </p>
          ) : (
            <>
              <RevenueChart
                title={
                  data.groupBy === "Month"
                    ? "Doanh thu theo tháng"
                    : "Doanh thu theo ngày"
                }
                groupBy={data.groupBy}
                data={data.periods.map((period) => ({
                  date: period.periodStart,
                  revenue: period.revenue,
                }))}
              />
              <RevenueReportTable
                periods={data.periods}
                groupBy={data.groupBy}
                totalInvoices={data.totalInvoices}
                totalRevenue={data.totalRevenue}
              />
              <div className="flex flex-col gap-1 text-xs text-slate-500">
                <p>
                  Doanh thu tính theo thời điểm thu của hóa đơn Đã thanh toán
                  hợp lệ, không gồm hóa đơn đã hủy/hoàn. Hoàn tiền hoặc hủy hóa
                  đơn sau đó có thể làm thay đổi doanh thu của kỳ cũ. Đây không
                  phải báo cáo dòng tiền thu/hoàn.
                </p>
                {data.groupBy === "Month" && (
                  <p>Tháng đầu/cuối chỉ tính phần nằm trong khoảng đã chọn.</p>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}