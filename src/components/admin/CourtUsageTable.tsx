import Link from "next/link";

import { cn, formatHours } from "@/utils";
import type { CourtUsageMetrics } from "@/types";

export interface CourtUsageTableRow extends CourtUsageMetrics {
  key: string;
  label: string;
}

interface CourtUsageTableProps {
  labelHeader: string;
  rows: CourtUsageTableRow[];
  totals: CourtUsageMetrics;
  title?: string;
  actionHref?: string;
  actionLabel?: string;
}

const HEAD_CELL_CLASS =
  "sticky top-0 h-[40px] border-y border-line bg-status-info-soft px-5 font-sans text-[12px] font-semibold leading-[16px] text-ink-secondary";
const FOOT_CELL_CLASS =
  "sticky bottom-0 h-[44px] border-t border-line bg-white px-5 font-sans text-[14px] leading-[20px] text-ink";
const BODY_CELL_CLASS =
  "h-[44px] border-b border-line px-5 font-sans text-[14px] leading-[20px] text-ink";

export function CourtUsageTable({
  labelHeader,
  rows,
  totals,
  title,
  actionHref,
  actionLabel,
}: CourtUsageTableProps) {
  return (
    <div className="overflow-hidden rounded-[12px] border border-line bg-white">
      {title && (
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <h2 className="font-display text-[18px] font-medium leading-[26px] text-ink">
            {title}
          </h2>
          {actionHref && actionLabel && (
            <Link
              href={actionHref}
              className="inline-flex items-center gap-1.5 font-sans text-[14px] font-semibold leading-[20px] text-brand-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-[4px]"
            >
              {actionLabel}
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                arrow_forward
              </span>
            </Link>
          )}
        </div>
      )}

      <div className="max-h-[420px] overflow-auto">
        <table className="w-full min-w-[600px] border-separate border-spacing-0 text-left">
          <thead>
            <tr>
              <th scope="col" className={HEAD_CELL_CLASS}>
                {labelHeader}
              </th>
              <th scope="col" className={cn(HEAD_CELL_CLASS, "text-right")}>
                Lượt đặt
              </th>
              <th scope="col" className={cn(HEAD_CELL_CLASS, "text-right")}>
                Giờ đặt
              </th>
              <th scope="col" className={cn(HEAD_CELL_CLASS, "text-right")}>
                Lượt hoàn thành
              </th>
              <th scope="col" className={cn(HEAD_CELL_CLASS, "text-right")}>
                Giờ hoàn thành
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.key}
                className="transition-colors duration-100 hover:bg-surface-bg"
              >
                <td className={BODY_CELL_CLASS}>{row.label}</td>
                <td className={cn(BODY_CELL_CLASS, "text-right font-medium tabular-nums")}>
                  {row.bookingCount}
                </td>
                <td className={cn(BODY_CELL_CLASS, "text-right font-medium tabular-nums")}>
                  {formatHours(row.bookedHours)}
                </td>
                <td className={cn(BODY_CELL_CLASS, "text-right font-medium tabular-nums")}>
                  {row.completedCount}
                </td>
                <td className={cn(BODY_CELL_CLASS, "text-right font-medium tabular-nums")}>
                  {formatHours(row.completedHours)}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-8 text-center font-sans text-[14px] text-ink-secondary"
                >
                  Không có dữ liệu sử dụng sân trong ngày.
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td className={cn(FOOT_CELL_CLASS, "font-semibold")}>Tổng</td>
              <td className={cn(FOOT_CELL_CLASS, "text-right font-medium tabular-nums")}>
                {totals.bookingCount}
              </td>
              <td className={cn(FOOT_CELL_CLASS, "text-right font-medium tabular-nums")}>
                {formatHours(totals.bookedHours)}
              </td>
              <td className={cn(FOOT_CELL_CLASS, "text-right font-medium tabular-nums")}>
                {totals.completedCount}
              </td>
              <td className={cn(FOOT_CELL_CLASS, "text-right font-medium tabular-nums")}>
                {formatHours(totals.completedHours)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

