import { cn, formatCurrency, formatRevenuePeriod } from "@/utils";
import type { RevenueGroupBy, RevenuePeriod } from "@/types";

interface RevenueReportTableProps {
  periods: RevenuePeriod[];
  groupBy: RevenueGroupBy;
  totalInvoices: number;
  totalRevenue: number;
}

const HEAD_CELL_CLASS =
  "sticky top-0 h-[40px] border-y border-line bg-status-info-soft px-5 font-sans text-[12px] font-semibold leading-[16px] text-ink-secondary";
const FOOT_CELL_CLASS =
  "sticky bottom-0 h-[44px] border-t border-line bg-white px-5 font-sans text-[14px] leading-[20px] text-ink";

export function RevenueReportTable({
  periods,
  groupBy,
  totalInvoices,
  totalRevenue,
}: RevenueReportTableProps) {
  return (
    <div className="overflow-hidden rounded-[12px] border border-line bg-white">
      <div className="px-5 py-4">
        <h3 className="font-display text-[18px] font-medium leading-[26px] text-ink">
          Bảng doanh thu
        </h3>
      </div>
      <div className="max-h-[420px] overflow-auto">
        <table className="w-full min-w-[480px] border-separate border-spacing-0 text-left">
          <thead>
            <tr>
              <th scope="col" className={HEAD_CELL_CLASS}>
                {groupBy === "Month" ? "Tháng" : "Ngày"}
              </th>
              <th scope="col" className={cn(HEAD_CELL_CLASS, "text-right")}>
                Hóa đơn đã thu
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
                className="transition-colors duration-100 hover:bg-surface-bg"
              >
                <td className="h-[44px] border-b border-line px-5 font-sans text-[14px] font-medium leading-[20px] text-ink tabular-nums">
                  {formatRevenuePeriod(period.periodStart, groupBy)}
                </td>
                <td className="h-[44px] border-b border-line px-5 text-right font-sans text-[14px] font-medium leading-[20px] text-ink tabular-nums">
                  {period.invoiceCount}
                </td>
                <td className="h-[44px] border-b border-line px-5 text-right font-sans text-[14px] font-medium leading-[20px] text-ink tabular-nums">
                  {formatCurrency(period.revenue)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className={cn(FOOT_CELL_CLASS, "font-semibold")}>Tổng</td>
              <td className={cn(FOOT_CELL_CLASS, "text-right font-medium tabular-nums")}>
                {totalInvoices}
              </td>
              <td className={cn(FOOT_CELL_CLASS, "text-right font-medium tabular-nums")}>
                {formatCurrency(totalRevenue)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}