import { formatDate, formatHours } from "@/utils";
import type { DashboardSummary } from "@/types";

const MAX_DAILY_HOURS = 17; // 05:00 – 22:00 operating window

export function DashboardCourtUsageCard({
  summary,
}: {
  summary: DashboardSummary;
}) {
  const maxHours = Math.max(
    MAX_DAILY_HOURS,
    ...summary.courts.map((c) => Math.max(c.bookedHours, c.completedHours))
  );
  const hasAnyHours = summary.bookedHours > 0 || summary.completedHours > 0;

  return (
    <section className="flex flex-col overflow-hidden rounded-[12px] border border-line bg-white">
      <div className="border-b border-line px-5 py-4">
        <h2 className="font-display text-[18px] font-medium leading-[26px] text-ink">
          Giờ sử dụng sân
        </h2>
        <p className="font-sans text-[12px] font-normal leading-[16px] text-ink-secondary">
          Trong ngày {formatDate(summary.date)}
        </p>
      </div>

      <div className="flex-1 divide-y divide-line px-5">
        {summary.courts.length === 0 ? (
          <p className="py-6 text-center font-sans text-[14px] text-ink-secondary">
            Chưa có dữ liệu sân.
          </p>
        ) : (
          summary.courts.map((court) => {
            const bookedPct = Math.min(100, (court.bookedHours / maxHours) * 100);
            const completedPct = Math.min(100, (court.completedHours / maxHours) * 100);

            return (
              <div key={court.courtId} className="space-y-2.5 py-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-sans text-[14px] font-semibold leading-[20px] text-ink">
                    {court.courtName}
                  </span>
                  <span className="font-sans text-[14px] font-medium leading-[20px] text-ink tabular-nums">
                    {formatHours(court.bookedHours)} giờ
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-[72px] shrink-0 font-sans text-[12px] leading-[16px] text-ink-secondary">
                    Giờ đặt
                  </span>
                  <div className="relative h-[6px] flex-1 rounded-[3px] bg-surface-soft">
                    {court.bookedHours > 0 ? (
                      <div
                        className="h-full rounded-[3px] bg-ink-muted transition-all duration-200"
                        style={{ width: `${bookedPct}%` }}
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-1/2 h-[10px] w-[2px] -translate-y-1/2 rounded-[1px] bg-ink-muted"
                      />
                    )}
                  </div>
                  <span className="w-8 text-right font-sans text-[14px] font-medium leading-[20px] text-ink-secondary tabular-nums">
                    {formatHours(court.bookedHours)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-[72px] shrink-0 font-sans text-[12px] leading-[16px] text-ink-secondary">
                    Hoàn thành
                  </span>
                  <div className="relative h-[6px] flex-1 rounded-[3px] bg-surface-soft">
                    {court.completedHours > 0 ? (
                      <div
                        className="h-full rounded-[3px] bg-brand transition-all duration-200"
                        style={{ width: `${completedPct}%` }}
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-1/2 h-[10px] w-[2px] -translate-y-1/2 rounded-[1px] bg-brand"
                      />
                    )}
                  </div>
                  <span className="w-8 text-right font-sans text-[14px] font-medium leading-[20px] text-ink-secondary tabular-nums">
                    {formatHours(court.completedHours)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="border-t border-line px-5 py-3">
        <p className="font-sans text-[12px] font-normal leading-[16px] text-ink-secondary">
          {hasAnyHours
            ? `${summary.bookingCount} lượt đặt · ${summary.completedCount} lượt hoàn thành`
            : "Chưa có giờ đặt hoặc giờ hoàn thành."}
        </p>
      </div>
    </section>
  );
}

