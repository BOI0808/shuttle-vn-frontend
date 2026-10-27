import { cn, formatCurrency, formatRevenuePeriod } from "@/utils";
import type { RevenueGroupBy, RevenuePeriod } from "@/types";

interface RevenueReportTableProps {
  periods: RevenuePeriod[];
  groupBy: RevenueGroupBy;
  totalInvoices: number;
  totalRevenue: number;
}

const HEAD_CELL_CLASS =
  "sticky top-0 border-b border-slate-100 bg-slate-50 px-5 py-3 font-semibold";
const FOOT_CELL_CLASS =
  "sticky bottom-0 border-t border-slate-200 bg-slate-50 px-5 py-3";

export function RevenueReportTable({
  periods,
  groupBy,
  totalInvoices,
  totalRevenue,
}: RevenueReportTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="max-h-[420px] overflow-auto">
        <table className="w-full border-separate border-spacing-0 text-left">
          <thead>
            <tr className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
              <th scope="col" className={HEAD_CELL_CLASS}>
                Kỳ
              </th>
              <th scope="col" className={cn(HEAD_CELL_CLASS, "text-right")}>
                Số hóa đơn đã thu
              </th>
              <th scope="col" className={cn(HEAD_CELL_CLASS, "text-right")}>
                Doanh thu
              </th>
            </tr>
          </thead>
          <tbody>
            {periods.map((period) => (
              <tr
                key={period.periodStart}
                className="transition-colors hover:bg-slate-50"
              >
                <td className="border-b border-slate-100 px-5 py-3 font-mono text-[12px] text-slate-700">
                  {formatRevenuePeriod(period.periodStart, groupBy)}
                </td>
                <td className="border-b border-slate-100 px-5 py-3 text-right font-mono text-[12px] text-slate-700">
                  {period.invoiceCount}
                </td>
                <td className="border-b border-slate-100 px-5 py-3 text-right font-mono text-[12px] font-bold text-slate-900">
                  {formatCurrency(period.revenue)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-mono text-[12px] font-bold text-slate-900">
              <td className={FOOT_CELL_CLASS}>Tổng</td>
              <td className={cn(FOOT_CELL_CLASS, "text-right")}>{totalInvoices}</td>
              <td className={cn(FOOT_CELL_CLASS, "text-right")}>
                {formatCurrency(totalRevenue)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}