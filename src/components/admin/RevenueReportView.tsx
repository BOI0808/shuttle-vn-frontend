import { RevenueChart } from "@/components/admin/RevenueChart";
import { RevenueReportTable } from "@/components/admin/RevenueReportTable";

import type { RevenueReport } from "@/types";
import { formatCurrency } from "@/utils";

interface RevenueReportViewProps {
  data: RevenueReport;
}

export function RevenueReportView({ data }: RevenueReportViewProps) {
  return (
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
              Doanh thu tính theo thời điểm thu của hóa đơn Đã thanh toán hợp
              lệ, không gồm hóa đơn đã hủy/hoàn. Hoàn tiền hoặc hủy hóa đơn sau
              đó có thể làm thay đổi doanh thu của kỳ cũ. Đây không phải báo cáo
              dòng tiền thu/hoàn.
            </p>
            {data.groupBy === "Month" && (
              <p>Tháng đầu/cuối chỉ tính phần nằm trong khoảng đã chọn.</p>
            )}
          </div>
        </>
      )}
    </>
  );
}

