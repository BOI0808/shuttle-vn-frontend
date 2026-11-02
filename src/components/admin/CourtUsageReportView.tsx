import { CourtUsageTable } from "@/components/admin/CourtUsageTable";

import type { CourtUsageReport } from "@/types";
import { formatHours, formatRevenuePeriod } from "@/utils";

interface CourtUsageReportViewProps {
  data: CourtUsageReport;
}

export function CourtUsageReportView({ data }: CourtUsageReportViewProps) {
  if (data.bookingCount === 0) {
    return (
      <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        Không có dữ liệu trong khoảng đã chọn.
      </p>
    );
  }

  return (
    <>
      <p className="text-[13px] text-slate-600">
        Tổng:{" "}
        <span className="font-mono font-bold text-slate-900">
          {data.bookingCount}
        </span>{" "}
        lượt đặt ·{" "}
        <span className="font-mono font-bold text-slate-900">
          {formatHours(data.bookedHours)}
        </span>{" "}
        giờ đặt ·{" "}
        <span className="font-mono font-bold text-slate-900">
          {data.completedCount}
        </span>{" "}
        lượt hoàn thành ·{" "}
        <span className="font-mono font-bold text-slate-900">
          {formatHours(data.completedHours)}
        </span>{" "}
        giờ hoàn thành
      </p>

      <CourtUsageTable
        labelHeader={data.groupBy === "Month" ? "Tháng" : "Ngày"}
        rows={data.periods.map((period) => ({
          key: period.periodStart,
          label: formatRevenuePeriod(period.periodStart, data.groupBy),
          bookingCount: period.bookingCount,
          bookedHours: period.bookedHours,
          completedCount: period.completedCount,
          completedHours: period.completedHours,
        }))}
        totals={data}
      />

      <CourtUsageTable
        labelHeader="Sân"
        rows={data.courts.map((court) => ({
          key: String(court.courtId),
          label: court.courtName,
          bookingCount: court.bookingCount,
          bookedHours: court.bookedHours,
          completedCount: court.completedCount,
          completedHours: court.completedHours,
        }))}
        totals={data}
      />

      <div className="flex flex-col gap-1 text-xs text-slate-500">
        <p>
          Đặt sân tính theo ngày sử dụng, gồm mọi trạng thái trừ Đã hủy.
          Hoàn thành gồm cả chốt tự động của hệ thống, không là bằng chứng khách
          có mặt.
        </p>
        {data.groupBy === "Month" && (
          <p>Tháng đầu/cuối chỉ tính phần nằm trong khoảng đã chọn.</p>
        )}
      </div>
    </>
  );
}

