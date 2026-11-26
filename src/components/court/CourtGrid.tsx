"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useCourtGrid } from "@/hooks/useCourt";
import { CourtSlotCell } from "./CourtSlotCell";
import { SlotPopup, SlotPopupState } from "./SlotPopup";
import { SlotDisplayStatus, CourtGridResponse, CourtSlot } from "@/types";
import { DAY_OF_WEEK_LABEL } from "@/config/app";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { getErrorMessage } from "@/utils";
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
  const { data, isLoading, isError, error } = useCourtGrid(date) as {
    data: CourtGridResponse | undefined;
    isLoading: boolean;
    isError: boolean;
    error: unknown;
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

    if (autoScrolledDateRef.current !== date) {
      const firstAllowedMinute = date === localToday
        ? Math.ceil((nowTotalMin + 1) / SLOT_MIN) * SLOT_MIN
        : START_HOUR * 60;
      const slotIndex = Math.max(0, Math.floor((firstAllowedMinute - START_HOUR * 60) / SLOT_MIN));
      container.scrollLeft = slotIndex * 72;
      autoScrolledDateRef.current = date;
    }
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
      <div
        aria-busy="true"
        className="overflow-hidden rounded-[12px] border border-line bg-white"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
          <div>
            <p className="font-display text-[18px] font-medium leading-[26px] text-ink">
              Lịch sân theo ngày
            </p>
            <p className="font-sans text-[12px] leading-[16px] text-ink-secondary">
              Đang tải lịch sân…
            </p>
          </div>
          <p className="font-sans text-[12px] leading-[16px] text-ink-secondary tabular-nums">
            34 khung giờ · 05:00–22:00
          </p>
        </div>
        <div className="flex items-center gap-3 p-5">
          <div className="w-[120px] shrink-0 space-y-2">
            <div className="h-[16px] w-16 animate-pulse rounded-[4px] bg-line" />
            <div className="h-[12px] w-24 animate-pulse rounded-[4px] bg-surface-soft" />
          </div>
          <div className="grid flex-1 grid-cols-6 gap-2 sm:grid-cols-10">
            {Array.from({ length: 10 }, (_, idx) => (
              <div
                key={idx}
                className="flex h-[56px] items-center justify-center rounded-[6px] border border-line bg-surface-soft font-sans text-[14px] font-medium text-ink-secondary"
              >
                —
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div
        role="alert"
        className="flex items-center gap-3 rounded-[12px] border border-line bg-white p-5"
      >
        <div className="flex size-[40px] shrink-0 items-center justify-center rounded-[8px] bg-status-danger-soft text-status-danger">
          <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
            warning
          </span>
        </div>
        <p className="font-sans text-[14px] text-ink-secondary">
          {getErrorMessage(error)}
        </p>
      </div>
    );
  }

  const courts = data.courts;

  return (
    <>
      <div className="overflow-hidden rounded-[12px] border border-line bg-white">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-[18px] font-medium leading-[26px] text-ink">
              {dayLabel}
            </span>
            <span className="font-sans text-[14px] font-medium text-ink-secondary tabular-nums">
              {dateLabel}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 font-sans text-[12px] text-ink-secondary">
            <span className="tabular-nums">34 khung giờ · 05:00–22:00</span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="inline-block size-[7px] animate-pulse rounded-full bg-brand"
                aria-hidden="true"
              />
              Cập nhật mỗi 30 giây
            </span>
          </div>
        </div>

        {/* Scrollable grid */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto"
        >
          <table className="border-collapse" style={{ tableLayout: "fixed" }}>
            <thead>
              <tr>
                {/* Corner */}
                <th
                  scope="col"
                  className="sticky left-0 z-[11] border-b border-line border-r border-line bg-surface-bg px-4 py-3 text-left font-sans text-[12px] font-semibold leading-[16px] text-ink-secondary"
                  style={{ width: 148, minWidth: 148 }}
                >
                  Sân
                </th>
                {Array.from({ length: TOTAL_SLOTS }, (_, i) => {
                  const totalMin = START_HOUR * 60 + i * SLOT_MIN;
                  const isHour = totalMin % 60 === 0;
                  return (
                    <th
                      key={i}
                      scope="col"
                      className={`whitespace-nowrap border-b border-line bg-surface-bg py-2.5 text-center font-sans text-[12px] leading-[16px] tabular-nums ${
                        isHour
                          ? "border-r border-line-strong font-semibold text-ink"
                          : "border-r border-line font-normal text-ink-secondary"
                      }`}
                      style={{ width: 72, minWidth: 72 }}
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
                    className="sticky left-0 z-[5] border-b border-line border-r border-line bg-white px-4 py-2.5"
                    style={{ height: 56, minWidth: 148 }}
                  >
                    <div className="font-sans text-[14px] font-semibold leading-[20px] text-ink">
                      {court.court.name}
                    </div>
                    {court.court.description && (
                      <div className="truncate font-sans text-[12px] leading-[16px] text-ink-secondary">
                        {court.court.description}
                      </div>
                    )}
                  </td>

                  {Array.from({ length: TOTAL_SLOTS }, (_, i) => {
                    const totalMin = START_HOUR * 60 + i * SLOT_MIN;
                    const isHour = totalMin % 60 === 0;
                    const slotFound = court.slots.find(
                      (s) => s.startTime === slotKey(i)
                    );
                    const slotIsPast = date < localToday ||
                      (date === localToday && totalMin <= now.getHours() * 60 + now.getMinutes());
                    const slotStatus: SlotDisplayStatus =
                      slotFound?.displayStatus === "BOOKED"
                        ? "BOOKED"
                        : slotIsPast
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
                          <span
                            title={`${slotFound.startTime}–${slotFound.endTime}`}
                            className="font-sans text-[12px] font-medium text-ink-secondary"
                          >
                            Đã đặt
                          </span>
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
        <div className="flex flex-wrap items-center justify-end gap-5 border-t border-line px-5 py-3">
          {[
            {
              label: "Còn trống",
              style: { background: "#FFFFFF", border: "1px solid #B9C8D6" },
            },
            {
              label: "Đã đặt",
              style: { background: "#EDF2F6", border: "1px solid #DCE5ED" },
            },
            {
              label: "Đặt của bạn",
              style: { background: "#087F5B", border: "1px solid #066649" },
            },
            {
              label: "Đóng / quá giờ",
              style: {
                backgroundImage:
                  "repeating-linear-gradient(-45deg,#DCE5ED 0px,#DCE5ED 1.5px,#EDF2F6 1.5px,#EDF2F6 8px)",
                border: "1px solid #DCE5ED",
              },
            },
          ].filter((item) => !readOnly || item.label !== "Đặt của bạn").map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 font-sans text-[12px] leading-[16px] text-ink-secondary"
            >
              <div
                className="h-3.5 w-5 shrink-0 rounded-[4px]"
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
