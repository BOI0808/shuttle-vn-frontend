"use client";

import { useState, useRef, useEffect } from "react";

interface CustomDatePickerProps {
  value: string;
  onChange: (dateStr: string) => void;
  className?: string;
}

const DAYS_OF_WEEK = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const DAYS_OF_WEEK_FULL = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatDateDisplay(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  const dayName = DAYS_OF_WEEK_FULL[d.getDay()];
  return `${dayName}, ${pad(d.getDate())}/${pad(
    d.getMonth() + 1
  )}/${d.getFullYear()}`;
}

export function CustomDatePicker({
  value,
  onChange,
  className = "absolute bottom-5 left-7 z-20",
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const initialDate = value ? new Date(value + "T00:00:00") : new Date();
  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth()); // 0 - 11

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!value) return;
    const d = new Date(value + "T00:00:00");
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  }, [value]);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
  const lastDayOfMonth = new Date(viewYear, viewMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  let startDay = firstDayOfMonth.getDay() - 1;
  if (startDay === -1) startDay = 6;

  const prevMonthLastDate = new Date(viewYear, viewMonth, 0).getDate();
  const prevDays = Array.from(
    { length: startDay },
    (_, i) => prevMonthLastDate - startDay + 1 + i
  );
  const currentDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleSelectDay = (day: number) => {
    const selected = `${viewYear}-${pad(viewMonth + 1)}-${pad(day)}`;
    onChange(selected);
    setIsOpen(false);
  };

  const selectToday = () => {
    const today = new Date();
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    onChange(
      `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(
        today.getDate()
      )}`
    );
    setIsOpen(false);
  };

  const todayStr = (() => {
    const t = new Date();
    return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`;
  })();

  return (
    <div ref={containerRef} className={className}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white rounded-full px-[18px] py-2 flex items-center gap-2 text-[14px] font-semibold text-[#1a1a2e] shadow-[0_2px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.22)] transition-all cursor-pointer border border-transparent hover:border-emerald-200"
      >
        <span className="material-symbols-outlined text-emerald-600 text-[18px]">
          calendar_today
        </span>
        <span>{formatDateDisplay(value)}</span>
        <span
          className={`material-symbols-outlined text-gray-400 text-[18px] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          keyboard_arrow_down
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2.5 bg-white rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.18)] border border-slate-100 p-4 w-[310px] animate-in fade-in zoom-in-95 duration-150 select-none">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="font-bold text-[15px] text-slate-800 font-display">
              Tháng {viewMonth + 1}, {viewYear}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prevMonth}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                title="Tháng trước"
              >
                <span className="material-symbols-outlined text-[18px]">
                  chevron_left
                </span>
              </button>
              <button
                type="button"
                onClick={nextMonth}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                title="Tháng sau"
              >
                <span className="material-symbols-outlined text-[18px]">
                  chevron_right
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {DAYS_OF_WEEK.map((d, i) => (
              <span
                key={d}
                className={`text-[11px] font-bold font-mono py-1 ${
                  i === 6 ? "text-amber-600" : "text-slate-400"
                }`}
              >
                {d}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {prevDays.map((d) => (
              <span
                key={`prev-${d}`}
                className="h-8 flex items-center justify-center text-[12px] text-slate-300 font-mono"
              >
                {d}
              </span>
            ))}

            {currentDays.map((d) => {
              const currentStr = `${viewYear}-${pad(viewMonth + 1)}-${pad(d)}`;
              const isSelected = currentStr === value;
              const isToday = currentStr === todayStr;

              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => handleSelectDay(d)}
                  className={`h-8 w-8 mx-auto rounded-xl flex items-center justify-center text-[12px] font-mono transition-all cursor-pointer ${
                    isSelected
                      ? "bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/30 scale-105"
                      : isToday
                      ? "border border-emerald-500 font-bold text-emerald-600 hover:bg-emerald-50"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium font-mono text-emerald-600">
            <button
              type="button"
              onClick={selectToday}
              className="hover:text-emerald-700 hover:underline cursor-pointer"
            >
              Hôm nay
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
