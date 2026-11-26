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
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
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
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="flex h-[44px] items-center gap-2.5 rounded-[8px] border border-line bg-white px-3.5 font-sans text-[14px] font-medium leading-[20px] text-ink shadow-xs transition-colors hover:border-line-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer"
      >
        <span className="material-symbols-outlined text-[20px] text-brand-strong" aria-hidden="true">
          calendar_today
        </span>
        <span className="tabular-nums">{formatDateDisplay(value)}</span>
        <span
          className={`material-symbols-outlined text-[18px] text-ink-muted transition-transform duration-150 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          keyboard_arrow_down
        </span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Chọn ngày"
          className="absolute left-0 top-full z-[110] mt-2 w-[310px] select-none rounded-[12px] border border-line bg-white p-4 shadow-md"
        >
          <div className="mb-3 flex items-center justify-between px-1">
            <span className="font-display text-[15px] font-medium text-ink">
              Tháng {viewMonth + 1}, {viewYear}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prevMonth}
                aria-label="Tháng trước"
                className="flex size-[32px] items-center justify-center rounded-[8px] text-ink-secondary transition-colors hover:bg-surface-soft hover:text-ink"
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                  chevron_left
                </span>
              </button>
              <button
                type="button"
                onClick={nextMonth}
                aria-label="Tháng sau"
                className="flex size-[32px] items-center justify-center rounded-[8px] text-ink-secondary transition-colors hover:bg-surface-soft hover:text-ink"
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                  chevron_right
                </span>
              </button>
            </div>
          </div>

          <div className="mb-1 grid grid-cols-7 gap-1 text-center">
            {DAYS_OF_WEEK.map((d, i) => (
              <span
                key={d}
                className={`py-1 font-sans text-[12px] font-semibold ${
                  i === 6 ? "text-status-warning" : "text-ink-muted"
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
                className="flex h-8 items-center justify-center font-sans text-[12px] text-ink-muted/50 tabular-nums"
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
                  className={`mx-auto flex size-8 items-center justify-center rounded-[8px] font-sans text-[12px] transition-colors cursor-pointer tabular-nums ${
                    isSelected
                      ? "bg-brand-strong font-semibold text-white"
                      : isToday
                      ? "border border-brand font-semibold text-brand-strong hover:bg-brand-soft"
                      : "text-ink hover:bg-surface-soft"
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-line pt-2.5 font-sans text-[12px] font-semibold">
            <button
              type="button"
              onClick={selectToday}
              className="text-brand-strong hover:underline cursor-pointer"
            >
              Hôm nay
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-ink-secondary hover:text-ink cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
