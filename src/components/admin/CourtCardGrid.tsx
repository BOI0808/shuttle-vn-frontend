import { Court } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {courts.map((court) => (
        <article
          key={court.courtId}
          className="flex flex-col justify-between rounded-[12px] border border-line bg-status-info-soft/60 p-5 transition-colors duration-150 hover:border-line-strong"
        >
          <div>
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-[18px] font-medium leading-[26px] text-ink">
                {court.name}
              </h3>

              <div className="flex flex-wrap items-center justify-end gap-1.5">
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
            </div>

            <p className="mt-2.5 min-h-[40px] font-sans text-[14px] leading-[20px] text-ink">
              {court.description || "—"}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
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
        </article>
      ))}
    </div>
  );
}
