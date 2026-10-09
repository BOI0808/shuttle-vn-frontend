"use client";

import { useState } from "react";
import { useCourtGrid } from "@/hooks";
import { COURT_STATUS_LABEL } from "@/config/app";
import { getTodayISO } from "@/utils";
import { CustomDatePicker } from "@/components/ui/CustomDatePicker";

/**
 * Calculates position and width percentage for a booking slot based on a 5:00 - 22:00 timeline (17 hours)
 */
function getTimelineStyle(startTime: string, endTime: string) {
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);

  const startMinutes = sh * 60 + sm;
  const endMinutes = eh * 60 + em;

  const timelineStart = 5 * 60; // 05:00
  const timelineDuration = 17 * 60; // 17 hours

  const left = ((startMinutes - timelineStart) / timelineDuration) * 100;
  const width = ((endMinutes - startMinutes) / timelineDuration) * 100;

  return {
    left: `${Math.max(0, left)}%`,
    width: `${Math.max(0, width)}%`,
  };
}

export default function ScheduleClient() {
  const [date, setDate] = useState(getTodayISO());
  const { data: grid, isLoading, isError } = useCourtGrid(date);

  const hours = Array.from(
    { length: 17 },
    (_, i) => `${i + 5 < 10 ? "0" : ""}${i + 5}:00`
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <CustomDatePicker
            value={date}
            onChange={setDate}
            className="relative z-20"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            {/* Timeline Header */}
            <div className="flex border-b border-slate-100 bg-slate-50/50">
              <div className="w-32 p-4 border-r border-slate-100 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                Sân / Giờ
              </div>
              {hours.map((h) => (
                <div
                  key={h}
                  className="flex-1 p-4 text-[10px] font-mono text-slate-400 text-center border-r border-slate-50 last:border-r-0"
                >
                  {h}
                </div>
              ))}
            </div>

            {/* Court Rows */}
            {isLoading ? (
              <div className="p-12 text-center text-slate-500 font-mono">
                Đang tải lịch sân...
              </div>
            ) : isError ? (
              <div className="p-12 text-center text-red-600">
                Không thể tải lịch sân.
              </div>
            ) : !grid?.courts.length ? (
              <div className="p-12 text-center text-slate-500">
                Không có dữ liệu sân trong ngày này.
              </div>
            ) : (
              grid.courts.map((item) => (
                <div
                  key={item.court.courtId}
                  className="flex border-b border-slate-100 last:border-b-0 hover:bg-slate-50/30 transition-colors"
                >
                  <div className="w-32 p-4 border-r border-slate-100">
                    <p className="text-[13px] font-bold text-slate-900">
                      {item.court.name}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {COURT_STATUS_LABEL[item.court.status]}
                    </p>
                  </div>
                  <div className="flex-1 flex relative h-16 bg-slate-50/10">
                    {item.slots
                      .filter((s) => s.displayStatus === "BOOKED")
                      .map((slot, idx) => {
                        const style = getTimelineStyle(
                          slot.startTime,
                          slot.endTime
                        );
                        return (
                          <div
                            key={idx}
                            className="absolute inset-y-2 bg-blue-100 border border-blue-200 rounded-md p-2 flex flex-col justify-center overflow-hidden hover:z-10 hover:shadow-md transition-all cursor-default"
                            style={style}
                            title={`${slot.startTime} - ${slot.endTime}`}
                          >
                            <p className="text-[10px] font-bold text-blue-700 truncate">
                              Đã đặt
                            </p>
                            <p className="text-[9px] text-blue-600 truncate">
                              {slot.startTime} - {slot.endTime}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
