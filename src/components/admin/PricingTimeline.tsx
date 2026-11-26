"use client";

import type { PricingRule } from "@/types";
import { Button } from "@/components/ui/Button";
import { cn, formatCurrency } from "@/utils";

export type RuleDraft = Pick<PricingRule, "dayOfWeek" | "startTime"> & {
  pricePerHour: number | "";
};

const STEP = 30;
const MIN_SEGMENT = STEP;
const DAY_MINUTES = 24 * 60;

const SEGMENT_STYLES = [
  {
    segment: "bg-brand-soft text-brand-strong border-brand/30",
    bar: "bg-brand",
  },
  {
    segment: "bg-status-info-soft text-status-info border-status-info/30",
    bar: "bg-status-info",
  },
  {
    segment: "bg-status-warning-soft text-status-warning border-status-warning/30",
    bar: "bg-status-warning",
  },
  {
    segment: "bg-surface-soft text-ink-secondary border-line-strong",
    bar: "bg-ink-muted",
  },
] as const;

export const toMinutes = (value: string) => {
  const [hour, minute] = value.split(":").map(Number);
  return hour * 60 + minute;
};

export const toTime = (value: number) =>
  `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;

const snap = (value: number) => Math.round(value / STEP) * STEP;
const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, snap(value)));

interface PricingTimelineProps {
  rules: RuleDraft[];
  openTime: string;
  closeTime: string;
  disabled?: boolean;
  onChange: (rules: RuleDraft[]) => void;
}

export function PricingTimeline({
  rules,
  openTime,
  closeTime,
  disabled,
  onChange,
}: PricingTimelineProps) {
  const open = toMinutes(openTime);
  const close = toMinutes(closeTime);
  const duration = close - open;
  const sorted = [...rules].sort(
    (a, b) => toMinutes(a.startTime) - toMinutes(b.startTime)
  );

  const segmentEnd = (index: number) =>
    sorted[index + 1]?.startTime ?? closeTime;

  const moveBoundary = (boundaryIndex: number, rawValue: number) => {
    const minimum = toMinutes(sorted[boundaryIndex].startTime) + MIN_SEGMENT;
    const maximum =
      boundaryIndex + 2 < sorted.length
        ? toMinutes(sorted[boundaryIndex + 2].startTime) - MIN_SEGMENT
        : close - MIN_SEGMENT;
    const value = clamp(rawValue, minimum, maximum);
    onChange(
      sorted.map((rule, index) =>
        index === boundaryIndex + 1
          ? { ...rule, startTime: toTime(value) }
          : rule
      )
    );
  };

  const splitLongest = () => {
    const index = sorted.reduce(
      (longest, rule, current) =>
        toMinutes(segmentEnd(current)) - toMinutes(rule.startTime) >
        toMinutes(segmentEnd(longest)) - toMinutes(sorted[longest].startTime)
          ? current
          : longest,
      0
    );
    const rule = sorted[index];
    const endTime = segmentEnd(index);
    const middle = snap((toMinutes(rule.startTime) + toMinutes(endTime)) / 2);
    if (
      middle - toMinutes(rule.startTime) < MIN_SEGMENT ||
      toMinutes(endTime) - middle < MIN_SEGMENT
    ) {
      return;
    }
    onChange([
      ...sorted.slice(0, index + 1),
      {
        dayOfWeek: rule.dayOfWeek,
        startTime: toTime(middle),
        pricePerHour: rule.pricePerHour,
      },
      ...sorted.slice(index + 1),
    ]);
  };

  const removeSegment = (index: number) => {
    if (sorted.length === 1 || index === 0) return;
    onChange(sorted.filter((_, current) => current !== index));
  };

  if (duration <= 0) return null;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-sans text-[12px] leading-[16px] text-ink-secondary">
          Kéo mốc theo bước 30 phút hoặc nhập giờ trực tiếp.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          icon="add"
          onClick={splitLongest}
          disabled={disabled || duration < MIN_SEGMENT * 2}
        >
          Thêm khung
        </Button>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="min-w-[680px] px-2 pt-4">
          <div className="relative h-20 overflow-hidden rounded-[8px] border border-line bg-surface-soft">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_7px,rgba(89,109,128,0.12)_7px,rgba(89,109,128,0.12)_8px)]" />
            {sorted.map((rule, index) => {
              const endTime = segmentEnd(index);
              const style = SEGMENT_STYLES[index % SEGMENT_STYLES.length];
              return (
                <div
                  key={`${rule.startTime}-${index}`}
                  style={{
                    left: `${(toMinutes(rule.startTime) / DAY_MINUTES) * 100}%`,
                    width: `${((toMinutes(endTime) - toMinutes(rule.startTime)) / DAY_MINUTES) * 100}%`,
                  }}
                  className={cn(
                    "absolute inset-y-0 flex min-w-0 items-center justify-center border-r px-2 text-center",
                    style.segment
                  )}
                >
                  <div className="min-w-0">
                    <p className="truncate font-sans text-[12px] font-semibold tabular-nums">
                      {rule.startTime}–{endTime}
                    </p>
                    <p className="mt-0.5 truncate font-sans text-[12px] tabular-nums">
                      {rule.pricePerHour === ""
                        ? "Chưa nhập giá"
                        : `${formatCurrency(rule.pricePerHour)}/giờ`}
                    </p>
                  </div>
                </div>
              );
            })}
            {sorted.slice(1).map((rule, index) => {
              const value = toMinutes(rule.startTime);
              return (
                <input
                  key={`slider-${index}`}
                  type="range"
                  min={0}
                  max={DAY_MINUTES}
                  step={STEP}
                  value={value}
                  disabled={disabled}
                  onChange={(event) =>
                    moveBoundary(index, Number(event.target.value))
                  }
                  aria-label={`Điểm chia ${index + 1}`}
                  className="pricing-boundary absolute inset-0 z-10 h-full w-full cursor-ew-resize appearance-none bg-transparent disabled:cursor-not-allowed"
                  style={{ pointerEvents: "none" }}
                />
              );
            })}
          </div>

          <div className="relative mt-3 h-14">
            {[0, 6, 12, 18, 24].map((hour) => (
              <span
                key={hour}
                className="absolute -translate-x-1/2 font-sans text-[12px] leading-[16px] text-ink-secondary tabular-nums first:translate-x-0 last:-translate-x-full"
                style={{ left: `${(hour / 24) * 100}%` }}
              >
                {String(hour).padStart(2, "0")}:00
              </span>
            ))}
            {sorted.slice(1).map((rule, index) => {
              const value = toMinutes(rule.startTime);
              return (
                <input
                  key={`time-${index}`}
                  type="time"
                  step={1800}
                  value={rule.startTime}
                  disabled={disabled}
                  onChange={(event) =>
                    moveBoundary(index, toMinutes(event.target.value))
                  }
                  aria-label={`Giờ điểm chia ${index + 1}`}
                  className="absolute top-6 h-[32px] w-[96px] -translate-x-1/2 rounded-[8px] border border-line-strong bg-white px-2 font-sans text-[12px] text-ink tabular-nums outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                  style={{ left: `${(value / DAY_MINUTES) * 100}%` }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {sorted.map((rule, index) => {
          const endTime = segmentEnd(index);
          const style = SEGMENT_STYLES[index % SEGMENT_STYLES.length];
          return (
            <div
              key={`price-${rule.startTime}-${index}`}
              className="flex items-center gap-3 rounded-[8px] border border-line bg-surface-bg p-3"
            >
              <span className={cn("h-10 w-1.5 shrink-0 rounded-full", style.bar)} />
              <label className="min-w-0 flex-1">
                <span className="block truncate font-sans text-[12px] font-semibold text-ink-secondary tabular-nums">
                  {rule.startTime}–{endTime} (VND / giờ)
                </span>
                <input
                  type="number"
                  min="1"
                  step="1000"
                  placeholder="Nhập đơn giá"
                  value={rule.pricePerHour}
                  disabled={disabled}
                  onChange={(event) => {
                    const raw = event.target.value;
                    onChange(
                      sorted.map((item, current) =>
                        current === index
                          ? {
                              ...item,
                              pricePerHour: raw === "" ? "" : Number(raw),
                            }
                          : item
                      )
                    );
                  }}
                  className="mt-1.5 h-[44px] w-full rounded-[8px] border border-line-strong bg-white px-3 font-sans text-[14px] text-ink placeholder:text-ink-muted tabular-nums outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:bg-surface-soft disabled:text-ink-muted"
                />
              </label>
              <button
                type="button"
                onClick={() => removeSegment(index)}
                disabled={disabled || sorted.length === 1 || index === 0}
                aria-label={`Xóa khung ${rule.startTime} đến ${endTime}`}
                className="inline-flex size-[44px] shrink-0 items-center justify-center rounded-[8px] text-ink-secondary transition-colors hover:bg-status-danger-soft hover:text-status-danger disabled:opacity-30"
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  delete
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
