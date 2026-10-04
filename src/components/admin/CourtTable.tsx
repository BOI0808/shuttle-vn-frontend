import { Court } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { COURT_STATUS_LABEL } from "@/config/app";

interface CourtTableProps {
  courts: Court[];
  onStatusChange: (court: Court) => void;
}

export function CourtTable({ courts, onStatusChange }: CourtTableProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              <th className="px-5 py-3 border-b border-slate-100 font-semibold">
                Tên sân
              </th>
              <th className="px-5 py-3 border-b border-slate-100 font-semibold">
                Mô tả
              </th>
              <th className="px-5 py-3 border-b border-slate-100 font-semibold">
                Giờ mở cửa
              </th>
              <th className="px-5 py-3 border-b border-slate-100 font-semibold">
                Trạng thái
              </th>
              <th className="px-5 py-3 border-b border-slate-100 font-semibold text-right">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {courts.map((court) => (
              <tr
                key={court.courtId}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200/50 flex items-center justify-center flex-shrink-0 text-emerald-600">
                      <span
                        className="material-symbols-outlined text-[16px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        sports_tennis
                      </span>
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-slate-900 font-display">
                        {court.name}
                      </p>
                      <p className="font-mono text-[10px] text-slate-400">
                        ID-{String(court.courtId).padStart(3, "0")}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-[13px] text-slate-600">
                  {court.description || "—"}
                </td>
                <td className="px-5 py-4 text-[12px] font-mono text-slate-600">
                  05:00 – 22:00
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap items-center gap-1.5">
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
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onStatusChange(court)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-700 text-[11px] font-mono font-medium transition-colors cursor-pointer"
                      title="Đổi trạng thái"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        sync
                      </span>
                      Đổi trạng thái
                    </button>

                    <button
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-[11px] font-mono font-medium transition-colors cursor-pointer"
                      title="Sửa"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        edit
                      </span>
                    </button>

                    <button
                      className="inline-flex items-center justify-center p-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                      title="Xóa"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
