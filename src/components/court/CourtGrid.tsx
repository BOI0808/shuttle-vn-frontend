"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useCourtGrid } from "@/hooks/useCourt";
import { CourtSlotCell } from "./CourtSlotCell";
import { SlotPopup, SlotPopupState } from "./SlotPopup";
import { SlotDisplayStatus, CourtGridResponse, CourtSlot } from "@/types";
import { DAY_OF_WEEK_LABEL } from "@/config/app";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "sonner";

const START_HOUR = 5;
const END_HOUR = 22;
const SLOT_MIN = 30;
const TOTAL_SLOTS = ((END_HOUR - START_HOUR) * 60) / SLOT_MIN;

function pad(n: number) {
  return String(n).padStart(2, "0");
}
function toHHMM(totalMin: number) {
  return `${pad(Math.floor(totalMin / 60))}:${pad(totalMin % 60)}`;
}
function slotKey(i: number) {
  const totalMin = START_HOUR * 60 + i * SLOT_MIN;
  return toHHMM(totalMin);
}

interface CourtGridProps {
  date: string;
  showBookingDetails?: boolean;
  readOnly?: boolean;
}

export function CourtGrid({ date, showBookingDetails = false, readOnly = false }: CourtGridProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { data, isLoading, isError } = useCourtGrid(date) as {
    data: CourtGridResponse | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  const [popup, setPopup] = useState<SlotPopupState | null>(null);
  const [selectedDuration, setSelectedDuration] = useState(0);
  const autoScrolledDateRef = useRef("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const now = new Date();
  const nowTotalMin = now.getHours() * 60 + now.getMinutes();
  const localToday = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const nowSlotOffset = (nowTotalMin - START_HOUR * 60) / SLOT_MIN;
  const nowSlotIndex = Math.floor(nowSlotOffset);
  const nowFrac = nowSlotOffset - nowSlotIndex;

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      event.preventDefault();
      container.scrollLeft += event.deltaY * 1.2;
    };
    container.addEventListener("wheel", handleWheel, { passive: false });

    if (autoScrolledDateRef.current !== date) {
      const firstAllowedMinute = date === localToday
        ? Math.ceil((nowTotalMin + 1) / SLOT_MIN) * SLOT_MIN
        : START_HOUR * 60;
      const slotIndex = Math.max(0, Math.floor((firstAllowedMinute - START_HOUR * 60) / SLOT_MIN));
      container.scrollLeft = slotIndex * 72;
      autoScrolledDateRef.current = date;
    }

    return () => container.removeEventListener("wheel", handleWheel);
  }, [date, data, localToday, nowTotalMin]);

  const dateObj = new Date(`${date}T00:00:00`);
  const dayLabel =
    DAY_OF_WEEK_LABEL[dateObj.getDay() as keyof typeof DAY_OF_WEEK_LABEL];
  const dateLabel = `${pad(dateObj.getDate())}/${pad(
    dateObj.getMonth() + 1
  )}/${dateObj.getFullYear()}`;

  const handleClickAvailable = useCallback(
    (
      e: React.MouseEvent,
      courtId: number,
      courtName: string,
      startMin: number,
      slots: CourtSlot[]
    ) => {
      e.stopPropagation();
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const lx = Math.max(115, Math.min(window.innerWidth - 115, centerX));
      const ly = rect.top - 10;

      setSelectedDuration(0);
      setPopup({
        courtId,
        date,
        courtName,
        startMinutes: startMin,
        slots,
        anchorEl: target,
        x: lx,
        y: ly,
      });
    },
    [date]
  );

  function handleReserve(durationMinutes: number) {
    if (!popup || durationMinutes <= 0) return;
    const current = new Date();
    const currentMinutes = current.getHours() * 60 + current.getMinutes();
    if (popup.date < localToday || (popup.date === localToday && popup.startMinutes <= currentMinutes)) {
      toast.error("Khung giờ này đã qua. Vui lòng chọn giờ khác.");
      setPopup(null);
      return;
    }
    const startTime = toHHMM(popup.startMinutes);
    const endTime = toHHMM(popup.startMinutes + durationMinutes);
    const path = isAuthenticated ? "/booking" : "/booking/guest";
    router.push(`${path}?courtId=${popup.courtId}&date=${popup.date}&startTime=${startTime}&endTime=${endTime}`);
    setPopup(null);
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl h-40 flex items-center justify-center text-sm text-gray-400">
        Đang tải lịch sân...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="bg-white rounded-2xl h-40 flex items-center justify-center text-sm text-red-400">
        Không thể tải lịch sân. Vui lòng thử lại.
      </div>
    );
  }

  const courts = data.courts;

  return (
    <>
      <div
        className="bg-white rounded-2xl overflow-hidden"
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}
      >
        {/* Header */}
        <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-3">
          <div>
            <span className="font-display text-[15px] font-bold text-gray-900">
              {dayLabel}
            </span>
            <span className="font-mono text-[13px] text-gray-400 ml-1.5">
              {dateLabel}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-gray-500">
            <span
              className="w-[7px] h-[7px] rounded-full bg-green-500 inline-block"
              style={{ animation: "pulse 2s infinite" }}
            />
            Cập nhật mỗi 30 giây
          </div>
        </div>

        {/* Scrollable grid */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          <table className="border-collapse" style={{ tableLayout: "fixed" }}>
            <thead>
              <tr>
                {/* Corner */}
                <th
                  className="font-mono text-[11px] font-semibold text-gray-400 uppercase tracking-[0.06em] border-b-2 border-b-gray-200 border-r border-r-gray-200 sticky left-0 z-[11]"
                  style={{
                    width: 148,
                    minWidth: 148,
                    padding: "12px 16px",
                    background: "#fafafa",
                    textAlign: "left",
                  }}
                >
                  Sân
                </th>
                {Array.from({ length: TOTAL_SLOTS }, (_, i) => {
                  const totalMin = START_HOUR * 60 + i * SLOT_MIN;
                  const isHour = totalMin % 60 === 0;
                  return (
                    <th
                      key={i}
                      className={`font-mono text-[11px] font-medium text-gray-400 border-b-2 border-b-gray-200 whitespace-nowrap text-center ${
                        isHour
                          ? "font-semibold text-gray-500 border-r border-r-gray-300"
                          : "border-r border-r-gray-200"
                      }`}
                      style={{
                        width: 72,
                        minWidth: 72,
                        padding: "10px 0",
                        background: "#fafafa",
                      }}
                    >
                      {slotKey(i)}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {courts.map((court) => (
                <tr key={court.court.courtId}>
                  {/* Court info cell */}
                  <td
                    className="border-b border-b-gray-100 border-r border-r-gray-200 bg-white sticky left-0 z-[5]"
                    style={{ padding: "10px 16px", height: 56, minWidth: 130 }}
                  >
                    <div className="text-[13px] font-semibold text-gray-900 leading-snug">
                      {court.court.name}
                    </div>
                    <div className="font-mono text-[10px] text-gray-400 mt-px">
                      {court.court.description}
                    </div>
                  </td>

                  {Array.from({ length: TOTAL_SLOTS }, (_, i) => {
                    const totalMin = START_HOUR * 60 + i * SLOT_MIN;
                    const isHour = totalMin % 60 === 0;
                    const slotFound = court.slots.find(
                      (s) => s.startTime === slotKey(i)
                    );
                    const slotIsPast = date < localToday ||
                      (date === localToday && totalMin <= now.getHours() * 60 + now.getMinutes());
                    const slotStatus: SlotDisplayStatus = slotIsPast
                      ? "CLOSED"
                      : slotFound?.displayStatus ?? "CLOSED";

                    return (
                      <CourtSlotCell
                        key={i}
                        status={slotStatus}
                        isClosed={slotStatus === "CLOSED"}
                        isHourSep={isHour}
                        isNowSlot={i === nowSlotIndex}
                        nowFrac={nowFrac}
                        startMinutes={totalMin}
                        isPast={slotIsPast}
                        courtName={court.court.name}
                        onClickAvailable={readOnly ? undefined : (e, name, min) =>
                          handleClickAvailable(e, court.court.courtId, name, min, court.slots)
                        }
                      >
                        {showBookingDetails && slotFound?.displayStatus === "BOOKED" && (
                          <div className="text-center leading-tight text-gray-700">
                            <p className="text-[10px] font-semibold">Đã đặt</p>
                            <p className="mt-1 font-mono text-[8px]">
                              {slotFound.startTime}–{slotFound.endTime}
                            </p>
                          </div>
                        )}
                      </CourtSlotCell>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-[18px] px-5 py-2.5 border-t border-gray-100 justify-end">
          {[
            {
              label: "Còn trống",
              style: { background: "#fff", border: "1px solid #d1d5db" },
            },
            {
              label: "Đã đặt",
              style: { background: "#e5e7eb", border: "1px solid #d1d5db" },
            },
            { label: "Đặt của bạn", style: { background: "#10b981" } },
            {
              label: "Đóng cửa",
              style: {
                backgroundImage:
                  "repeating-linear-gradient(-45deg,#d1d5db 0px,#d1d5db 1.5px,#e5e7eb 1.5px,#e5e7eb 8px)",
                border: "1px solid #d1d5db",
              },
            },
          ].filter((item) => !readOnly || item.label !== "Đặt của bạn").map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-1.5 text-[11px] text-gray-500"
            >
              <div
                className="w-5 h-3.5 rounded-[4px] flex-shrink-0"
                style={item.style}
              />
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Popup */}
      {!readOnly && popup && (
        <SlotPopup
          state={popup}
          selectedDuration={selectedDuration}
          onSelectDuration={setSelectedDuration}
          onReserve={handleReserve}
          onClose={() => setPopup(null)}
        />
      )}
    </>
  );
}
