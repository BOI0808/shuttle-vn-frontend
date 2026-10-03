"use client";

import { useEffect, useMemo, useRef } from "react";
import { cn } from "@/utils";
import { CourtSlot } from "@/types";

interface Duration {
  label: string;
  mins: number;
  price: number; // VND
}

const SLOT_MIN = 30;
const DURATION_OPTIONS = [60, 90, 120, 150, 180];
const MAX_SLOTS = DURATION_OPTIONS[DURATION_OPTIONS.length - 1] / SLOT_MIN;

function pad(n: number) {
  return String(n).padStart(2, "0");
}
function toHHMM(totalMin: number) {
  return `${pad(Math.floor(totalMin / 60))}:${pad(totalMin % 60)}`;
}
function formatVnd(v: number) {
  return `${new Intl.NumberFormat("vi-VN").format(Math.round(v))} ₫`;
}
function formatDuration(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h} giờ ${m}` : `${h} giờ`;
}

/** Consecutive AVAILABLE slots from startMinutes; price = Σ(pricePerHour / 2) per 30-min slot (BR-07). */
function buildDurations(slots: CourtSlot[], startMinutes: number): Duration[] {
  const startIdx = slots.findIndex((s) => s.startTime === toHHMM(startMinutes));
  if (startIdx < 0) return [];

  const result: Duration[] = [];
  let total = 0;
  for (let n = 1; n <= MAX_SLOTS; n++) {
    const slot = slots[startIdx + n - 1];
    if (!slot || slot.displayStatus !== "AVAILABLE") break;
    total += slot.pricePerHour / 2;
    const mins = n * SLOT_MIN;
    if (DURATION_OPTIONS.includes(mins)) {
      result.push({ label: formatDuration(mins), mins, price: total });
    }
  }
  return result;
}

export interface SlotPopupState {
  courtName: string;
  startMinutes: number;
  slots: CourtSlot[];
  anchorEl?: HTMLElement;
  x: number;
  y: number;
}

interface SlotPopupProps {
  state: SlotPopupState;
  selectedDuration: number;
  onSelectDuration: (idx: number) => void;
  onReserve: () => void;
  onClose: () => void;
}

export function SlotPopup({
  state,
  selectedDuration,
  onSelectDuration,
  onReserve,
  onClose,
}: SlotPopupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const durations = useMemo(
    () => buildDurations(state.slots, state.startMinutes),
    [state.slots, state.startMinutes]
  );
  const dur: Duration | undefined = durations[selectedDuration];
  const startLabel = toHHMM(state.startMinutes);

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }

    function updatePosition() {
      if (!ref.current || !state.anchorEl) return;
      const rect = state.anchorEl.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const lx = Math.max(115, Math.min(window.innerWidth - 115, centerX));
      const ly = rect.top - 10;

      ref.current.style.left = `${lx}px`;
      ref.current.style.top = `${ly}px`;

      const isOutOfView = rect.bottom < 60 || rect.top > window.innerHeight;
      ref.current.style.visibility = isOutOfView ? "hidden" : "visible";
    }

    document.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [onClose, state.anchorEl]);

  return (
    <div
      ref={ref}
      className="fixed z-[200] rounded-[14px] p-4 w-[210px] -translate-x-1/2 -translate-y-full"
      style={{
        background: "#1f2937",
        boxShadow: "0 16px 48px rgba(0,0,0,0.32)",
        left: state.x,
        top: state.y,
      }}
    >
      {/* Title */}
      <p className="text-[13px] font-semibold text-white text-center">
        {state.courtName}
      </p>
      {/* Time range */}
      <p className="font-mono text-[11px] text-gray-400 text-center mt-0.5 mb-3">
        {dur
          ? `${startLabel} – ${toHHMM(state.startMinutes + dur.mins)} (${
              dur.label
            })`
          : startLabel}
      </p>

      {/* Duration list */}
      <div className="flex flex-col gap-1 max-h-[190px] overflow-y-auto mb-3">
        {durations.length === 0 && (
          <p className="text-[12px] text-gray-400 text-center py-3">
            Không đủ thời gian trống liên tiếp (tối thiểu 1 giờ)
          </p>
        )}
        {durations.map((d, i) => (
          <button
            key={d.mins}
            onClick={() => onSelectDuration(i)}
            className={cn(
              "flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors duration-100 border-2",
              i === selectedDuration
                ? "border-emerald-500"
                : "border-transparent"
            )}
            style={{
              background: i === selectedDuration ? "#374151" : "#374151",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#4b5563")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#374151")
            }
          >
            <span className="text-[13px] font-medium text-gray-100">
              {d.label}
            </span>
            <span
              className="font-mono text-[11px] font-semibold text-gray-300 px-1.5 py-0.5 rounded-md"
              style={{ background: "#4b5563" }}
            >
              {formatVnd(d.price)}
            </span>
          </button>
        ))}
      </div>

      {/* Reserve button */}
      <button
        onClick={onReserve}
        disabled={!dur}
        className="w-full py-2.5 rounded-[9px] text-[13px] font-semibold text-white transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: "#10b981" }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.background = "#059669")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.background = "#10b981")
        }
      >
        Đặt sân · {dur ? formatVnd(dur.price) : "—"}
      </button>

      {/* Arrow */}
      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0"
        style={{
          borderLeft: "9px solid transparent",
          borderRight: "9px solid transparent",
          borderTop: "9px solid #1f2937",
        }}
      />
    </div>
  );
}
