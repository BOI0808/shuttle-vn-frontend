import { SlotDisplayStatus } from "@/types";
import { cn } from "@/utils";

interface CourtSlotCellProps {
  status: SlotDisplayStatus;
  isClosed: boolean;
  isHourSep: boolean;
  isNowSlot: boolean;
  nowFrac: number;
  startMinutes: number;
  courtName: string;
  onClickAvailable: (
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
  courtName,
  onClickAvailable,
}: CourtSlotCellProps) {
  return (
    <td
      style={{ contentVisibility: "auto", containIntrinsicSize: "72px 56px" }}
      className={cn(
        "w-[72px] min-w-[72px] h-14 p-[5px_3px] border-b border-b-gray-100 vertical-middle relative",
        isHourSep ? "border-r border-r-gray-300" : "border-r border-r-gray-200"
      )}
    >
      <div
        className={cn(
          "w-full h-full rounded-[5px] border border-transparent flex items-center justify-center relative overflow-hidden",
          isClosed
            ? "slot-closed"
            : status === "BOOKED"
            ? "slot-booked"
            : status === "AVAILABLE"
            ? "slot-available"
            : "slot-mine"
        )}
        title={
          isClosed
            ? "Đóng cửa"
            : status === "BOOKED"
            ? "Đã đặt"
            : status === "AVAILABLE"
            ? "Còn trống – click để đặt"
            : "Đặt của bạn"
        }
        onClick={
          !isClosed && status === "AVAILABLE"
            ? (e) => onClickAvailable(e, courtName, startMinutes)
            : undefined
        }
      ></div>
    </td>
  );
}
