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
}

const HEAD_CELL_CLASS =
  "sticky top-0 border-b border-slate-100 bg-slate-50 px-5 py-3 font-semibold";
const FOOT_CELL_CLASS =
  "sticky bottom-0 border-t border-slate-200 bg-slate-50 px-5 py-3";
const BODY_CELL_CLASS =
  "border-b border-slate-100 px-5 py-3 font-mono text-[12px] text-slate-700";

export function CourtUsageTable({
  labelHeader,
  rows,
  totals,
}: CourtUsageTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="max-h-[420px] overflow-auto">
        <table className="w-full border-separate border-spacing-0 text-left">
          <thead>
            <tr className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
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
                className="transition-colors hover:bg-slate-50"
              >
                <td className={BODY_CELL_CLASS}>{row.label}</td>
                <td className={cn(BODY_CELL_CLASS, "text-right")}>
                  {row.bookingCount}
                </td>
                <td className={cn(BODY_CELL_CLASS, "text-right font-bold text-slate-900")}>
                  {formatHours(row.bookedHours)}
                </td>
                <td className={cn(BODY_CELL_CLASS, "text-right")}>
                  {row.completedCount}
                </td>
                <td className={cn(BODY_CELL_CLASS, "text-right")}>
                  {formatHours(row.completedHours)}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-8 text-center font-mono text-[12px] text-slate-400"
                >
                  Không có dữ liệu.
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="font-mono text-[12px] font-bold text-slate-900">
              <td className={FOOT_CELL_CLASS}>Tổng</td>
              <td className={cn(FOOT_CELL_CLASS, "text-right")}>
                {totals.bookingCount}
              </td>
              <td className={cn(FOOT_CELL_CLASS, "text-right")}>
                {formatHours(totals.bookedHours)}
              </td>
              <td className={cn(FOOT_CELL_CLASS, "text-right")}>
                {totals.completedCount}
              </td>
              <td className={cn(FOOT_CELL_CLASS, "text-right")}>
                {formatHours(totals.completedHours)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

