import { Court } from "@/types";

interface CourtStatsProps {
  courts: Court[];
  priceRange?: string;
}

// 🟢 SỬA LẠI:
export function CourtStats({
  courts,
  priceRange = "60K–100K",
}: CourtStatsProps) {
  const totalCourts = courts.length;
  const activeCourts = courts.filter((c) => c.status === "ACTIVE").length;
  const maintenanceCourts = courts.filter(
    (c) => c.status === "MAINTENANCE"
  ).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
          <span
            className="material-symbols-outlined text-[22px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            sports_tennis
          </span>
        </div>
        <div>
          <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
            Tổng số sân
          </p>
          <p className="text-2xl font-bold font-display text-slate-900 leading-tight">
            {totalCourts}
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0 text-emerald-600">
          <span
            className="material-symbols-outlined text-[22px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        </div>
        <div>
          <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
            Đang hoạt động
          </p>
          <p className="text-2xl font-bold font-display text-emerald-600 leading-tight">
            {activeCourts}
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 text-amber-600">
          <span className="material-symbols-outlined text-[22px]">
            construction
          </span>
        </div>
        <div>
          <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
            Đang bảo trì
          </p>
          <p className="text-2xl font-bold font-display text-amber-600 leading-tight">
            {maintenanceCourts}
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0 text-purple-600">
          <span className="material-symbols-outlined text-[22px]">
            payments
          </span>
        </div>
        <div>
          <p className="text-lg font-bold font-display text-slate-900 leading-tight">
            {priceRange}
          </p>
          <span className="text-[10px] text-slate-400 font-mono">
            / 1 tiếng
          </span>
        </div>
      </div>
    </div>
  );
}
