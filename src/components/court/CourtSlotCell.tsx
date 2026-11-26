import { SlotDisplayStatus } from "@/types";
import { cn } from "@/utils";

interface CourtSlotCellProps {
  status: SlotDisplayStatus;
  isClosed: boolean;
  isHourSep: boolean;
  isNowSlot: boolean;
  nowFrac: number;
  startMinutes: number;
  isPast?: boolean;
  courtName: string;
  children?: React.ReactNode;
  onClickAvailable?: (
    e: React.MouseEvent,
    courtName: string,
    startMin: number
  ) => void;
}

export function CourtSlotCell({
  status,
  isClosed,
  isHourSep,
  startMinutes,
  isPast = false,
  courtName,
  children,
  onClickAvailable,
}: CourtSlotCellProps) {
  return (
    <td
      style={{ contentVisibility: "auto", containIntrinsicSize: "72px 56px" }}
      className={cn(
        "relative h-14 w-[72px] min-w-[72px] border-b border-line p-[5px_3px] align-middle",
        isHourSep ? "border-r border-line-strong" : "border-r border-line"
      )}
    >
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center overflow-hidden rounded-[6px] border border-transparent",
          isClosed
            ? "slot-closed"
            : status === "BOOKED"
            ? "slot-booked"
            : status === "AVAILABLE"
            ? onClickAvailable
              ? "slot-available"
              : "border-line bg-white"
            : "slot-mine",
          !onClickAvailable && "cursor-default!"
        )}
        title={
          status === "BOOKED"
            ? "Đã đặt"
            : isPast
            ? "Đã qua"
            : isClosed
            ? "Đóng cửa"
            : status === "AVAILABLE"
            ? onClickAvailable ? "Còn trống – click để đặt" : "Còn trống"
            : "Đặt của bạn"
        }
        onClick={
          !isClosed && status === "AVAILABLE" && onClickAvailable
            ? (e) => onClickAvailable(e, courtName, startMinutes)
            : undefined
        }
      >
        {children}
      </div>
    </td>
  );
}
