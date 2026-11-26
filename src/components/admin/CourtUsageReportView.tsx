import { CourtUsageTable } from "@/components/admin/CourtUsageTable";

import type { CourtUsageReport } from "@/types";
import { formatHours, formatRevenuePeriod } from "@/utils";

interface CourtUsageReportViewProps {
  data: CourtUsageReport;
}

export function CourtUsageReportView({ data }: CourtUsageReportViewProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-sans text-[14px] text-ink-secondary">
        Tổng:{" "}
        <span className="font-semibold text-ink tabular-nums">
          {data.bookingCount}
        </span>{" "}
        lượt đặt ·{" "}
        <span className="font-semibold text-ink tabular-nums">
          {formatHours(data.bookedHours)}
        </span>{" "}
        giờ đặt ·{" "}
        <span className="font-semibold text-ink tabular-nums">
          {data.completedCount}
        </span>{" "}
        lượt hoàn thành ·{" "}
        <span className="font-semibold text-ink tabular-nums">
          {formatHours(data.completedHours)}
        </span>{" "}
        giờ hoàn thành
      </p>

      <CourtUsageTable
        title={`Tần suất theo ${data.groupBy === "Month" ? "tháng" : "ngày"}`}
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
        title="Tần suất sử dụng theo sân"
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
    </div>
  );
}

