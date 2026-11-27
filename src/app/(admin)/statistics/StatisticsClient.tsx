"use client";

import { FormEvent, useState } from "react";

import { differenceInCalendarDays, parseISO } from "date-fns";

import { CourtUsageReportView } from "@/components/admin/CourtUsageReportView";
import { ReportSection } from "@/components/admin/ReportSection";
import { RevenueReportView } from "@/components/admin/RevenueReportView";
import { Button } from "@/components/ui/Button";
import { CustomDatePicker } from "@/components/ui/CustomDatePicker";
import { Label } from "@/components/ui/Label";

import { useCourtUsageStats, useRevenueStats } from "@/hooks";

import type { RevenueGroupBy, RevenueReportParams } from "@/types";
import { cn, formatCurrency, formatDate, formatHours, getTodayVN } from "@/utils";

const MAX_RANGE_DAYS = 366;
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

function formatRangeLabel(fromDate: string, toDate: string): string {
  if (fromDate === toDate) return formatDate(fromDate);
  return `${formatDate(fromDate)} – ${formatDate(toDate)}`;
}

export default function StatisticsClient() {
  const [draft, setDraft] = useState<RevenueReportParams>(createDefaultFilters);
  const [applied, setApplied] = useState<RevenueReportParams>(createDefaultFilters);
  const [validationError, setValidationError] = useState<string | null>(null);

  const revenue = useRevenueStats(applied);
  const usage = useCourtUsageStats(applied);
  const isFetching = revenue.isFetching || usage.isFetching;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = validateRange(draft.fromDate, draft.toDate);
    setValidationError(message);
    if (message) return;
    if (isSameFilters(applied, draft)) {
      void revenue.refetch();
      void usage.refetch();
      return;
    }
    setApplied(draft);
  };

  const rangeLabel = formatRangeLabel(applied.fromDate, applied.toDate);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-[24px] font-semibold leading-[32px] text-ink">
          Báo cáo &amp; Thống kê
        </h1>
        <p className="mt-1 font-sans text-[14px] font-normal leading-[20px] text-ink-secondary">
          Doanh thu thực thu và tần suất sử dụng sân
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-[12px] border border-line bg-white p-5"
      >
        <div className="flex flex-wrap items-end gap-4">
          <div className="w-full sm:w-[240px]">
            <Label htmlFor="stats-from-date">Từ ngày</Label>
            <CustomDatePicker
              id="stats-from-date"
              className="relative"
              fullWidth
              value={draft.fromDate}
              onChange={(dateStr) =>
                setDraft((current) => ({ ...current, fromDate: dateStr }))
              }
            />
          </div>

          <div className="w-full sm:w-[240px]">
            <Label htmlFor="stats-to-date">Đến ngày</Label>
            <CustomDatePicker
              id="stats-to-date"
              className="relative"
              fullWidth
              value={draft.toDate}
              onChange={(dateStr) =>
                setDraft((current) => ({ ...current, toDate: dateStr }))
              }
            />
          </div>

          <div>
            <Label>Nhóm theo</Label>
            <div className="flex items-center gap-2">
              {GROUP_BY_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={draft.groupBy === option.value ? "outline" : "ghost"}
                  onClick={() =>
                    setDraft((current) => ({ ...current, groupBy: option.value }))
                  }
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="sm:ml-auto">
            <Button type="submit" variant="primary" loading={isFetching}>
              Xem báo cáo
            </Button>
          </div>
        </div>

        {validationError && (
          <p role="alert" className="mt-3 font-sans text-[12px] text-status-danger">
            {validationError}
          </p>
        )}
      </form>

      {/* Summary KPI cards */}
      {(revenue.data || usage.data) && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex min-h-[128px] flex-col justify-between rounded-[12px] border border-line bg-brand-soft p-[19px]">
            <p className="font-sans text-[14px] leading-[20px] text-ink-secondary">
              Doanh thu thực thu
            </p>
            <p className="font-sans text-[32px] font-semibold leading-[40px] text-brand-strong tabular-nums">
              {revenue.data ? formatCurrency(revenue.data.totalRevenue) : "—"}
            </p>
            <p className="font-sans text-[12px] leading-[16px] text-ink-secondary">
              {rangeLabel} · Chỉ hóa đơn đã thanh toán
            </p>
          </div>

          <div className="flex min-h-[128px] flex-col justify-between rounded-[12px] border border-line bg-status-info-soft p-[19px]">
            <p className="font-sans text-[14px] leading-[20px] text-ink-secondary">
              Lượt đặt sân
            </p>
            <p className="font-sans text-[32px] font-semibold leading-[40px] text-status-info tabular-nums">
              {usage.data ? usage.data.bookingCount : "—"}
            </p>
            <p className="font-sans text-[12px] leading-[16px] text-ink-secondary">
              {rangeLabel} · Không tính đơn hủy
            </p>
          </div>

          <div className="flex min-h-[128px] flex-col justify-between rounded-[12px] border border-line bg-status-info-soft p-[19px]">
            <p className="font-sans text-[14px] leading-[20px] text-ink-secondary">
              Giờ sử dụng sân
            </p>
            <p
              className={cn(
                "font-sans text-[32px] font-semibold leading-[40px] text-status-info tabular-nums"
              )}
            >
              {usage.data ? `${formatHours(usage.data.bookedHours)} giờ` : "—"}
            </p>
            <p className="font-sans text-[12px] leading-[16px] text-ink-secondary">
              {rangeLabel} · Theo lịch đặt sân
            </p>
          </div>
        </div>
      )}

      <ReportSection
        title="Báo cáo doanh thu"
        isLoading={revenue.isLoading}
        isError={revenue.isError}
        error={revenue.error}
        onRetry={() => revenue.refetch()}
      >
        {revenue.data && <RevenueReportView data={revenue.data} />}
      </ReportSection>

      <ReportSection
        title="Thống kê tình trạng sử dụng sân"
        isLoading={usage.isLoading}
        isError={usage.isError}
        error={usage.error}
        onRetry={() => usage.refetch()}
      >
        {usage.data && <CourtUsageReportView data={usage.data} />}
      </ReportSection>
    </div>
  );
}
