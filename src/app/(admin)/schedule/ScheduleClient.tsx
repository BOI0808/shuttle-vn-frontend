"use client";

import { useState } from "react";
import { getTodayVN } from "@/utils";
import { Button } from "@/components/ui/Button";
import { CustomDatePicker } from "@/components/ui/CustomDatePicker";
import { Label } from "@/components/ui/Label";
import { CourtGrid } from "@/components/court/CourtGrid";

export default function ScheduleClient() {
  const [date, setDate] = useState(getTodayVN);

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div>
        <h1 className="font-display text-[24px] font-semibold leading-[32px] text-ink">
          Lịch sân
        </h1>
        <p className="mt-1 font-sans text-[14px] font-normal leading-[20px] text-ink-secondary">
          Theo dõi lịch theo ngày
        </p>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <Label>Ngày xem lịch</Label>
            <CustomDatePicker
              value={date}
              onChange={setDate}
              className="relative z-20"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setDate(getTodayVN())}
          >
            Hôm nay
          </Button>
        </div>
      </div>

      <CourtGrid date={date} showBookingDetails readOnly />
    </div>
  );
}
