"use client";

import type { PricingRule } from "@/types";
import { formatCurrency } from "@/utils";

export type RuleDraft = Pick<PricingRule, "dayOfWeek" | "startTime" | "pricePerHour">;

const STEP = 30;
const MIN_SEGMENT = STEP;
const DAY_MINUTES = 24 * 60;
const COLORS = ["bg-[#DDECDD]", "bg-[#DDECF3]", "bg-[#F5EACB]", "bg-[#E8E2F0]"];

export const toMinutes = (value: string) => {
  const [hour, minute] = value.split(":").map(Number);
  return hour * 60 + minute;
};

export const toTime = (value: number) => `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
const snap = (value: number) => Math.round(value / STEP) * STEP;
const clamp = (value: number, minimum: number, maximum: number) => Math.min(maximum, Math.max(minimum, snap(value)));

interface PricingTimelineProps {
  rules: RuleDraft[];
  openTime: string;
  closeTime: string;
  disabled?: boolean;
  onChange: (rules: RuleDraft[]) => void;
}

export function PricingTimeline({ rules, openTime, closeTime, disabled, onChange }: PricingTimelineProps) {
  const open = toMinutes(openTime);
  const close = toMinutes(closeTime);
  const duration = close - open;
  const sorted = [...rules].sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime));

  const segmentEnd = (index: number) => sorted[index + 1]?.startTime ?? closeTime;

  const moveBoundary = (boundaryIndex: number, rawValue: number) => {
    const minimum = toMinutes(sorted[boundaryIndex].startTime) + MIN_SEGMENT;
    const maximum = boundaryIndex + 2 < sorted.length ? toMinutes(sorted[boundaryIndex + 2].startTime) - MIN_SEGMENT : close - MIN_SEGMENT;
    const value = clamp(rawValue, minimum, maximum);
    onChange(sorted.map((rule, index) => index === boundaryIndex + 1 ? { ...rule, startTime: toTime(value) } : rule));
  };

  const splitLongest = () => {
    const index = sorted.reduce((longest, rule, current) => toMinutes(segmentEnd(current)) - toMinutes(rule.startTime) > toMinutes(segmentEnd(longest)) - toMinutes(sorted[longest].startTime) ? current : longest, 0);
    const rule = sorted[index];
    const endTime = segmentEnd(index);
    const middle = snap((toMinutes(rule.startTime) + toMinutes(endTime)) / 2);
    if (middle - toMinutes(rule.startTime) < MIN_SEGMENT || toMinutes(endTime) - middle < MIN_SEGMENT) return;
    onChange([...sorted.slice(0, index + 1), { dayOfWeek: rule.dayOfWeek, startTime: toTime(middle), pricePerHour: rule.pricePerHour }, ...sorted.slice(index + 1)]);
  };

  const removeSegment = (index: number) => {
    if (sorted.length === 1 || index === 0) return;
    onChange(sorted.filter((_, current) => current !== index));
  };

  if (duration <= 0) return null;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-[#787774]">Kéo điểm chia hoặc nhập giờ. Mỗi bước 30 phút.</p>
        <button type="button" onClick={splitLongest} disabled={disabled || duration < MIN_SEGMENT * 2} className="shrink-0 rounded-md border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40">+ Chia khung</button>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="min-w-[720px] px-2 pt-9">
          <div className="relative h-20 overflow-hidden rounded-lg border border-[#D9DDD8] bg-[#F2F3F2]">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_7px,rgba(100,116,139,0.08)_7px,rgba(100,116,139,0.08)_8px)]" />
            {sorted.map((rule, index) => {
              const endTime = segmentEnd(index);
              return <div key={`${rule.startTime}-${index}`} style={{ left: `${(toMinutes(rule.startTime) / DAY_MINUTES) * 100}%`, width: `${((toMinutes(endTime) - toMinutes(rule.startTime)) / DAY_MINUTES) * 100}%` }} className={`absolute inset-y-0 flex min-w-0 items-center justify-center border-r border-white/70 px-2 text-center ${COLORS[index % COLORS.length]}`}>
                <div className="min-w-0"><p className="truncate font-mono text-xs font-bold text-slate-800">{rule.startTime}–{endTime}</p><p className="mt-1 truncate text-[11px] text-slate-600">{formatCurrency(rule.pricePerHour)}/giờ</p></div>
              </div>;
            })}
            {sorted.slice(1).map((rule, index) => {
              const value = toMinutes(rule.startTime);
              return <input key={`slider-${index}`} type="range" min={0} max={DAY_MINUTES} step={STEP} value={value} disabled={disabled} onChange={(event) => moveBoundary(index, Number(event.target.value))} aria-label={`Điểm chia ${index + 1}`} className="pricing-boundary absolute inset-0 z-10 h-full w-full cursor-ew-resize appearance-none bg-transparent disabled:cursor-not-allowed" style={{ pointerEvents: "none" }} />;
            })}
          </div>

          <div className="relative mt-3 h-14">
            {[0, 6, 12, 18, 24].map((hour) => <span key={hour} className="absolute -translate-x-1/2 font-mono text-[10px] text-slate-400 first:translate-x-0 last:-translate-x-full" style={{ left: `${(hour / 24) * 100}%` }}>{String(hour).padStart(2, "0")}:00</span>)}
            {sorted.slice(1).map((rule, index) => {
              const value = toMinutes(rule.startTime);
              return <input key={`time-${index}`} type="time" step={1800} value={rule.startTime} disabled={disabled} onChange={(event) => moveBoundary(index, toMinutes(event.target.value))} aria-label={`Giờ điểm chia ${index + 1}`} className="absolute top-5 w-[88px] -translate-x-1/2 rounded-md border border-slate-200 bg-white px-1.5 py-1 font-mono text-[11px] outline-none focus:border-emerald-600" style={{ left: `${(value / DAY_MINUTES) * 100}%` }} />;
            })}
          </div>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {sorted.map((rule, index) => {
          const endTime = segmentEnd(index);
          return <div key={`price-${rule.startTime}-${index}`} className="flex items-center gap-2 rounded-lg border border-[#EAEAEA] bg-[#FBFBFA] p-2.5">
            <span className={`h-8 w-1 rounded-sm ${COLORS[index % COLORS.length]}`} />
            <label className="min-w-0 flex-1 text-[11px] font-semibold text-slate-500"><span className="block truncate">{rule.startTime}–{endTime}</span><input type="number" min="1" step="1000" value={rule.pricePerHour} disabled={disabled} onChange={(event) => onChange(sorted.map((item, current) => current === index ? { ...item, pricePerHour: Number(event.target.value) } : item))} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-2.5 py-2 text-sm text-slate-800 outline-none focus:border-emerald-600" /></label>
            <button type="button" onClick={() => removeSegment(index)} disabled={disabled || sorted.length === 1 || index === 0} aria-label={`Xoá khung ${rule.startTime} đến ${endTime}`} className="rounded-md p-2 text-slate-400 hover:bg-[#FDEBEC] hover:text-[#9F2F2D] disabled:opacity-30"><span className="material-symbols-outlined text-[18px]">delete</span></button>
          </div>;
        })}
      </div>
    </div>
  );
}
