"use client";

import { useState } from "react";
import { getTodayISO } from "@/utils";
import { CustomDatePicker } from "@/components/ui/CustomDatePicker";
import { CourtGrid } from "@/components/court/CourtGrid";

export default function ScheduleClient() {
  const [date, setDate] = useState(getTodayISO());

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <CustomDatePicker
          value={date}
          onChange={setDate}
          className="relative z-20"
        />
      </div>
      <CourtGrid date={date} showBookingDetails readOnly />
    </div>
  );
}
