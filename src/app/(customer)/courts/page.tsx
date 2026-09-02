"use client";

import { useState } from "react";
import { CourtGrid } from "@/components/court/CourtGrid";
import { WalkInBookingForm } from "@/components/booking/WalkInBookingForm";

function formatDateValue(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDateDisplay(date: Date) {
  const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${days[date.getDay()]}, ${d}/${m}/${y}`;
}

export default function CourtsPage() {
  const [date, setDate] = useState(formatDateValue(new Date()));

  return (
    <>
      {/* Hero */}
      <div
        className="relative h-[260px] overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,#2d3748 0%,#1a3a2a 40%,#0d4a3a 70%,#1a5c4a 100%)",
        }}
      >
        {/* BG image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1400&auto=format&fit=crop&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-top opacity-45"
          style={{ mixBlendMode: "luminosity" }}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom,rgba(20,35,25,0.25) 0%,rgba(20,35,25,0.6) 100%)",
          }}
        />
        {/* Content */}
        <div className="relative z-[2] h-full flex flex-col items-center justify-center gap-1.5">
          <h1
            className="font-display text-[34px] font-bold text-white tracking-[-0.01em]"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
          >
            Đặt Sân Cầu Lông
          </h1>
          <p
            className="text-[14px]"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Chọn ngày, chọn sân và khung giờ phù hợp
          </p>
        </div>

        {/* Date picker pill */}
        <button
          className="absolute bottom-5 left-7 bg-white rounded-full px-[18px] py-2 flex items-center gap-2 text-[14px] font-semibold text-[#1a1a2e] border-none transition-shadow duration-150"
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.boxShadow =
              "0 4px 20px rgba(0,0,0,0.22)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.boxShadow =
              "0 2px 12px rgba(0,0,0,0.15)")
          }
          onClick={() => {
            const input = document.getElementById(
              "hidden-date-input"
            ) as HTMLInputElement;
            input?.showPicker?.();
          }}
        >
          <span className="material-symbols-outlined text-gray-500 text-[16px]">
            calendar_today
          </span>
          <span>{formatDateDisplay(new Date(date + "T00:00:00"))}</span>
          <span className="material-symbols-outlined text-gray-500 text-[16px]">
            keyboard_arrow_down
          </span>
        </button>

        {/* Hidden native date input */}
        <input
          id="hidden-date-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="absolute opacity-0 pointer-events-none"
          style={{ bottom: 20, left: 28 }}
        />
      </div>

      {/* Main content */}
      <div className="max-w-[1400px] mx-auto px-7 py-6 flex flex-col gap-5">
        <CourtGrid date={date} />
        <WalkInBookingForm />
      </div>
    </>
  );
}
