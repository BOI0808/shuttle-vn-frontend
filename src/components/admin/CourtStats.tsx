import { Court } from "@/types";
import { cn } from "@/utils";

interface CourtStatsProps {
  courts: Court[];
}

export function CourtStats({ courts }: CourtStatsProps) {
  const totalCourts = courts.length;
  const activeCourts = courts.filter((c) => c.status === "Active").length;
  const maintenanceCourts = courts.filter((c) => c.status === "Maintenance").length;
  const closedCourts = courts.filter((c) => c.status === "Closed").length;
  const inactiveCourts = maintenanceCourts + closedCourts;

  const stats = [
    {
      label: "Tổng số sân",
      value: totalCourts,
      hint: `${totalCourts} sân trong hệ thống`,
      cardBg: "bg-status-info-soft",
      valueColor: "text-status-info",
    },
    {
      label: "Đang hoạt động",
      value: activeCourts,
      hint:
        activeCourts === 0
          ? "Chưa có sân đang hoạt động"
          : `${activeCourts} sân sẵn sàng phục vụ`,
      cardBg: "bg-brand-soft",
      valueColor: "text-brand-strong",
    },
    {
      label: "Bảo trì / Đóng",
      value: inactiveCourts,
      hint: `${maintenanceCourts} bảo trì · ${closedCourts} đóng cửa`,
      cardBg: "bg-status-warning-soft",
      valueColor: "text-status-warning",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn(
            "flex min-h-[128px] flex-col justify-between rounded-[12px] border border-line p-[19px]",
            stat.cardBg
          )}
        >
          <p className="font-sans text-[14px] font-normal leading-[20px] text-ink-secondary">
            {stat.label}
          </p>
          <p
            className={cn(
              "font-sans text-[32px] font-semibold leading-[40px] tracking-normal tabular-nums",
              stat.valueColor
            )}
          >
            {stat.value}
          </p>
          <p className="font-sans text-[12px] font-normal leading-[16px] text-ink-secondary">
            {stat.hint}
          </p>
        </div>
      ))}
    </div>
  );
}
