"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/utils";

interface Duration {
  label: string;
  mins: number;
  price: string;
}

const DURATIONS: Duration[] = [
  { label: "1 giờ", mins: 60, price: "80.000 ₫" },
  { label: "1 giờ 30", mins: 90, price: "120.000 ₫" },
  { label: "2 giờ", mins: 120, price: "160.000 ₫" },
  { label: "2 giờ 30", mins: 150, price: "200.000 ₫" },
  { label: "3 giờ", mins: 180, price: "240.000 ₫" },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}
function toHHMM(totalMin: number) {
  return `${pad(Math.floor(totalMin / 60))}:${pad(totalMin % 60)}`;
}

export interface SlotPopupState {
  courtName: string;
  startMinutes: number;
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
  const dur = DURATIONS[selectedDuration];
  const startLabel = toHHMM(state.startMinutes);
  const endLabel = toHHMM(state.startMinutes + dur.mins);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="fixed z-[200] rounded-[14px] p-4 w-[210px]"
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
        {startLabel} – {endLabel} ({dur.label})
      </p>

      {/* Duration list */}
      <div className="flex flex-col gap-1 max-h-[190px] overflow-y-auto mb-3">
        {DURATIONS.map((d, i) => (
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
              {d.price}
            </span>
          </button>
        ))}
      </div>

      {/* Reserve button */}
      <button
        onClick={onReserve}
        className="w-full py-2.5 rounded-[9px] text-[13px] font-semibold text-white transition-colors duration-150"
        style={{ background: "#10b981" }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.background = "#059669")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.background = "#10b981")
        }
      >
        Đặt sân · {dur.price}
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

export { DURATIONS };
