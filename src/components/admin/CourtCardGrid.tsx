import { Court } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { COURT_STATUS_LABEL } from "@/config/app";

interface CourtCardGridProps {
  courts: Court[];
  onStatusChange: (court: Court) => void;
  onEdit: (court: Court) => void;
  onConfigure: (court: Court) => void;
}
export function CourtCardGrid({
  courts,
  onStatusChange,
  onEdit,
  onConfigure,
}: CourtCardGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {courts.map((court) => (
        <div
          key={court.courtId}
          className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-emerald-500/40 transition-all flex flex-col justify-between"
        >
          <div className="p-4 border-b border-slate-100 flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/50 flex items-center justify-center flex-shrink-0 text-emerald-600">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  sports_tennis
                </span>
              </div>
              <div>
                <h3 className="font-bold text-[14px] text-slate-900 font-display leading-tight">
                  {court.name}
                </h3>
                <p className="font-mono text-[10px] text-slate-400 mt-0.5">
                  ID-{String(court.courtId).padStart(3, "0")}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <Badge status={court.status}>
                {COURT_STATUS_LABEL[court.status] || court.status}
              </Badge>
              {court.isInUse && (
                <Badge status="IN_USE">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1 animate-pulse" />
                  Đang sử dụng
                </Badge>
              )}
            </div>
          </div>

          <div className="p-4 flex-1">
            <p className="text-[12px] text-slate-600 line-clamp-2 leading-relaxed min-h-[36px]">
              {court.description ||
                "Sân tiêu chuẩn với hệ thống đèn chiếu sáng chuyên dụng, sàn gỗ composite."}
            </p>
          </div>

          <div className="p-3 bg-slate-50/70 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2">
            <button
              onClick={() => onConfigure(court)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-mono font-medium transition-colors cursor-pointer"
              title="Cấu hình lịch và bảng giá"
            >
              <span className="material-symbols-outlined text-[14px]">calendar_clock</span>
              Lịch & giá
            </button>

            <button
              onClick={() => onStatusChange(court)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-700 text-[11px] font-mono font-medium transition-colors cursor-pointer"
              title="Đổi trạng thái sân"
            >
              <span className="material-symbols-outlined text-[14px]">
                sync
              </span>
              Trạng thái
            </button>

            <button
              onClick={() => onEdit(court)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-[11px] font-mono font-medium transition-colors cursor-pointer"
              title="Chỉnh sửa thông tin sân"
            >
              <span className="material-symbols-outlined text-[14px]">
                edit
              </span>
              Chỉnh sửa
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
