import { Court } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { COURT_STATUS_LABEL } from "@/config/app";

interface CourtTableProps {
  courts: Court[];
  onStatusChange: (court: Court) => void;
  onEdit: (court: Court) => void;
  onConfigure: (court: Court) => void;
}

export function CourtTable({
  courts,
  onStatusChange,
  onEdit,
  onConfigure,
}: CourtTableProps) {
  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="h-[44px] border-y border-line bg-status-info-soft font-sans text-[12px] font-semibold leading-[16px] text-ink-secondary">
              <th scope="col" className="px-5 py-3 font-semibold">
                Tên sân
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Mô tả
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Trạng thái
              </th>
              <th scope="col" className="px-5 py-3 text-right font-semibold">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {courts.map((court) => (
              <tr
                key={court.courtId}
                className="transition-colors duration-100 hover:bg-surface-bg"
              >
                <td className="px-5 py-4 align-middle">
                  <p className="font-sans text-[14px] font-semibold leading-[20px] text-ink">
                    {court.name}
                  </p>
                </td>
                <td className="px-5 py-4 align-middle font-sans text-[14px] leading-[20px] text-ink">
                  {court.description || "—"}
                </td>
                <td className="px-5 py-4 align-middle">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge status={court.status}>
                      {COURT_STATUS_LABEL[court.status] || court.status}
                    </Badge>
                    {court.isInUse && (
                      <Badge status="IN_USE">
                        <span
                          className="mr-1.5 size-1.5 rounded-full bg-status-info"
                          aria-hidden="true"
                        />
                        Đang sử dụng
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="px-5 py-4 text-right align-middle">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(court)}
                    >
                      Chỉnh sửa
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onStatusChange(court)}
                    >
                      Trạng thái
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onConfigure(court)}
                    >
                      Vận hành
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 border-t border-line p-4 md:hidden">
        {courts.map((court) => (
          <div
            key={court.courtId}
            className="rounded-[12px] border border-line bg-surface-bg p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-sans text-[14px] font-semibold leading-[20px] text-ink">
                  {court.name}
                </p>
                <p className="mt-1 font-sans text-[14px] leading-[20px] text-ink-secondary">
                  {court.description || "—"}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge status={court.status}>
                  {COURT_STATUS_LABEL[court.status] || court.status}
                </Badge>
                {court.isInUse && (
                  <Badge status="IN_USE">Đang sử dụng</Badge>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onEdit(court)}
              >
                Chỉnh sửa
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onStatusChange(court)}
              >
                Trạng thái
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onConfigure(court)}
              >
                Vận hành
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
