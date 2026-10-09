"use client";

import { useState } from "react";
import { CourtGrid } from "@/components/court/CourtGrid";
import { WalkInBookingForm } from "@/components/booking/WalkInBookingForm";
import { useAuthStore } from "@/stores/auth.store";
import { CustomDatePicker } from "@/components/ui/CustomDatePicker";

function formatDateValue(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function CourtsClient() {
  const [date, setDate] = useState(formatDateValue(new Date()));
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      {/* Hero */}
      <div
        className="relative h-[260px]"
        style={{
          background:
            "linear-gradient(135deg,#2d3748 0%,#1a3a2a 40%,#0d4a3a 70%,#1a5c4a 100%)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1400&auto=format&fit=crop&q=80"
            alt=""
            className="w-full h-full object-cover object-top opacity-45"
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
        </div>

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

        <CustomDatePicker value={date} onChange={setDate} />
      </div>
      {/* Main content */}
      <div className="max-w-[1400px] mx-auto px-7 py-6 flex flex-col gap-5">
        <CourtGrid date={date} />

        {!isAuthenticated && <WalkInBookingForm />}
      </div>
    </>
  );
}
