import { RevenueChart } from "@/components/admin/RevenueChart";
import { RevenueReportTable } from "@/components/admin/RevenueReportTable";

import type { RevenueReport } from "@/types";
import { formatCurrency } from "@/utils";

interface RevenueReportViewProps {
  data: RevenueReport;
}

export function RevenueReportView({ data }: RevenueReportViewProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-sans text-[14px] text-ink-secondary">
        Tổng doanh thu:{" "}
        <span className="font-semibold text-ink tabular-nums">
          {formatCurrency(data.totalRevenue)}
        </span>{" "}
        ·{" "}
        <span className="font-semibold text-ink tabular-nums">
          {data.totalInvoices}
        </span>{" "}
        hóa đơn đã thu
      </p>

      <RevenueChart
        title="Doanh thu thực thu"
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
    </div>
  );
}

