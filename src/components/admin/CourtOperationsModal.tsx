"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  useCourtSchedules,
  usePricingRules,
  useSavePricingRules,
  useUpdateCourtSchedule,
} from "@/hooks";
import { PricingTimeline, type RuleDraft, toMinutes } from "@/components/admin/PricingTimeline";
import type { Court } from "@/types";
import { getErrorMessage } from "@/utils";

const DAYS = [
  [1, "Thứ 2"], [2, "Thứ 3"], [3, "Thứ 4"], [4, "Thứ 5"],
  [5, "Thứ 6"], [6, "Thứ 7"], [7, "Chủ nhật"],
] as const;
const TIME_OPTIONS = Array.from({ length: 48 }, (_, index) => `${String(Math.floor(index / 2)).padStart(2, "0")}:${index % 2 ? "30" : "00"}`);

const shortTime = (value?: string) => value?.slice(0, 5) ?? "";
const pricingSnapshot = (items: RuleDraft[]) => JSON.stringify(items.map(({ dayOfWeek, startTime, pricePerHour }) => ({ dayOfWeek, startTime, pricePerHour })).sort((a, b) => a.startTime.localeCompare(b.startTime)));

function validateRules(rules: RuleDraft[], openTime: string, closeTime: string, isAvailable: boolean): string | null {
  if (!isAvailable) return null;
  const open = toMinutes(openTime);
  const close = toMinutes(closeTime);
  if (!openTime || !closeTime || open >= close) return "Giờ đóng cửa phải sau giờ mở cửa.";
  if (!rules.length) return "Ngày hoạt động phải có ít nhất một khung giá.";
  if (rules.some((rule) => !rule.startTime || rule.pricePerHour <= 0)) return "Mỗi khung giá cần có giờ bắt đầu và đơn giá lớn hơn 0.";
  const sorted = [...rules].sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime));
  if (sorted[0].startTime !== openTime) return "Mốc giá đầu tiên phải trùng giờ mở cửa.";
  if (sorted.some((rule) => toMinutes(rule.startTime) < open || toMinutes(rule.startTime) >= close)) return "Mọi mốc giá phải nằm trong giờ hoạt động.";
  if (sorted.some((rule, index) => index > 0 && toMinutes(rule.startTime) - toMinutes(sorted[index - 1].startTime) < 30)) return "Các mốc giá phải cách nhau ít nhất 30 phút.";
  return null;
}

function fitRulesToSchedule(rules: RuleDraft[], openTime: string, closeTime: string): RuleDraft[] {
  const open = toMinutes(openTime);
  const close = toMinutes(closeTime);
  if (!rules.length || open >= close) return rules;
  const sorted = [...rules].sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime));
  const activeAtOpen = [...sorted].reverse().find((rule) => toMinutes(rule.startTime) <= open) ?? sorted[0];
  return [
    { ...activeAtOpen, startTime: openTime },
    ...sorted.filter((rule) => toMinutes(rule.startTime) > open && toMinutes(rule.startTime) < close),
  ];
}

interface CourtOperationsModalProps {
  court: Court;
  onClose: () => void;
}

export function CourtOperationsModal({ court, onClose }: CourtOperationsModalProps) {
  const [day, setDay] = useState(1);
  const [openTime, setOpenTime] = useState("06:00");
  const [closeTime, setCloseTime] = useState("22:00");
  const [isAvailable, setIsAvailable] = useState(true);
  const [drafts, setDrafts] = useState<RuleDraft[]>([]);
  const { data: schedules, isLoading: schedulesLoading } = useCourtSchedules(court.courtId);
  const { data: rules, isLoading: rulesLoading, refetch: refetchRules } = usePricingRules(court.courtId);
  const updateSchedule = useUpdateCourtSchedule();
  const saveRules = useSavePricingRules();
  const schedule = schedules?.find((item) => item.dayOfWeek === day);
  const dayRules = useMemo(() => rules?.filter((item) => item.dayOfWeek === day) ?? [], [rules, day]);

  useEffect(() => {
    setOpenTime(shortTime(schedule?.openTime) || "06:00");
    setCloseTime(shortTime(schedule?.closeTime) || "22:00");
    setIsAvailable(schedule?.isAvailable ?? true);
  }, [schedule, day]);

  useEffect(() => {
    setDrafts(dayRules.map((rule) => ({
      dayOfWeek: day,
      startTime: shortTime(rule.startTime),
      pricePerHour: rule.pricePerHour,
    })));
  }, [dayRules, day]);

  const validation = validateRules(drafts, openTime, closeTime, isAvailable);
  const isPending = updateSchedule.isPending || saveRules.isPending;
  const scheduleDirty = Boolean(schedule) && (openTime !== shortTime(schedule?.openTime) || closeTime !== shortTime(schedule?.closeTime) || isAvailable !== schedule?.isAvailable);
  const pricingDirty = pricingSnapshot(drafts) !== pricingSnapshot(dayRules.map((rule) => ({ dayOfWeek: rule.dayOfWeek, startTime: shortTime(rule.startTime), pricePerHour: rule.pricePerHour })));
  const removedRuleCount = isAvailable
    ? dayRules.filter((rule) => toMinutes(rule.startTime) < toMinutes(openTime) || toMinutes(rule.startTime) >= toMinutes(closeTime)).length
    : dayRules.length;

  const changeDrafts = (next: RuleDraft[]) => setDrafts(next);
  const changeOpenTime = (nextOpenTime: string) => {
    setOpenTime(nextOpenTime);
    setDrafts((current) => fitRulesToSchedule(current, nextOpenTime, closeTime));
  };
  const changeCloseTime = (nextCloseTime: string) => {
    setCloseTime(nextCloseTime);
    setDrafts((current) => fitRulesToSchedule(current, openTime, nextCloseTime));
  };

  const saveSchedule = () => {
    if (validation) return toast.error(validation);
    updateSchedule.mutate({ courtId: court.courtId, dayOfWeek: day, payload: { openTime, closeTime, isAvailable } }, {
      onSuccess: () => toast.success(`Đã cập nhật lịch ${DAYS.find(([value]) => value === day)?.[1]}`),
      onError: (error) => toast.error(getErrorMessage(error)),
    });
  };

  const savePricing = async () => {
    if (validation) return toast.error(validation);
    try {
      const saved = await saveRules.mutateAsync({
        courtId: court.courtId,
        dayOfWeek: day,
        payload: { pricingRules: drafts.map(({ startTime, pricePerHour }) => ({ startTime, pricePerHour })) },
      });
      setDrafts(saved.map((rule) => ({ dayOfWeek: day, startTime: shortTime(rule.startTime), pricePerHour: rule.pricePerHour })));
      toast.success("Đã lưu bảng giá");
    } catch (error) {
      const result = await refetchRules();
      const freshRules = result.data?.filter((rule) => rule.dayOfWeek === day) ?? [];
      setDrafts(freshRules.map((rule) => ({ dayOfWeek: day, startTime: shortTime(rule.startTime), pricePerHour: rule.pricePerHour })));
      toast.error(`${getErrorMessage(error)} Bảng giá đã được khôi phục từ máy chủ.`);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-[2px]" role="dialog" aria-modal="true" aria-label={`Lịch và bảng giá ${court.name}`}>
      <div className="flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-[#EAEAEA] bg-[#FBFBFA] shadow-[0_16px_50px_rgba(15,23,42,0.12)]">
        <header className="flex items-start justify-between border-b border-[#EAEAEA] bg-white px-6 py-5">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700">Thiết lập hằng tuần</p>
            <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-[#2F3437]">Lịch và bảng giá · {court.name}</h2>
            <p className="mt-1 text-sm text-[#787774]">Áp dụng cố định cho mọi tuần. Ngày trong tuần theo chuẩn ISO-8601.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Đóng" className="rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </header>

        <div className="grid min-h-0 flex-1 md:grid-cols-[180px_1fr]">
          <nav className="flex gap-1 overflow-x-auto border-b border-[#EAEAEA] bg-white p-3 md:flex-col md:border-b-0 md:border-r" aria-label="Chọn ngày trong tuần">
            {DAYS.map(([value, label]) => (
              <button key={value} type="button" onClick={() => setDay(value)} className={`min-w-[92px] rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors md:min-w-0 ${day === value ? "bg-[#EDF3EC] text-[#346538]" : "text-slate-600 hover:bg-slate-50"}`}>
                <span className="mr-2 font-mono text-[10px] text-slate-400">0{value}</span>{label}
              </button>
            ))}
          </nav>

          <main className="overflow-y-auto p-5 md:p-7">
            {schedulesLoading || rulesLoading ? (
              <div className="space-y-3" aria-label="Đang tải"><div className="h-28 animate-pulse rounded-lg bg-slate-100" /><div className="h-52 animate-pulse rounded-lg bg-slate-100" /></div>
            ) : (
              <div className="space-y-6">
                <section className="rounded-lg border border-[#EAEAEA] bg-white p-5">
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div><h3 className="font-display text-base font-bold text-[#2F3437]">Giờ hoạt động</h3><p className="mt-1 text-xs text-[#787774]">Khoảng thời gian sân nhận đặt chỗ trong ngày.</p></div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700"><input type="checkbox" checked={isAvailable} onChange={(event) => setIsAvailable(event.target.checked)} className="h-4 w-4 accent-emerald-600" />Mở cửa</label>
                  </div>
                  <div className="mb-4 overflow-x-auto pb-1">
                    <div className="min-w-[620px]">
                      <div className="relative h-12 overflow-hidden rounded-lg border border-[#D9DDD8] bg-[#F2F3F2]">
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_7px,rgba(100,116,139,0.08)_7px,rgba(100,116,139,0.08)_8px)]" />
                        {isAvailable && <div className="absolute inset-y-0 flex items-center justify-center bg-[#DDECDD] font-mono text-[11px] font-bold text-slate-700" style={{ left: `${(toMinutes(openTime) / 1440) * 100}%`, width: `${((toMinutes(closeTime) - toMinutes(openTime)) / 1440) * 100}%` }}>{openTime}–{closeTime}</div>}
                      </div>
                      <div className="relative mt-2 h-4">{[0, 6, 12, 18, 24].map((hour) => <span key={hour} className="absolute -translate-x-1/2 font-mono text-[10px] text-slate-400 first:translate-x-0 last:-translate-x-full" style={{ left: `${(hour / 24) * 100}%` }}>{String(hour).padStart(2, "0")}:00</span>)}</div>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                    <label className="grid gap-1.5 text-xs font-semibold text-slate-600">Giờ mở<select value={openTime} disabled={!isAvailable} onChange={(event) => changeOpenTime(event.target.value)} className="rounded-md border border-slate-200 bg-[#FBFBFA] px-3 py-2.5 font-mono text-sm outline-none focus:border-emerald-600">{TIME_OPTIONS.map((time) => <option key={time} value={time}>{time}</option>)}</select></label>
                    <label className="grid gap-1.5 text-xs font-semibold text-slate-600">Giờ đóng<select value={closeTime} disabled={!isAvailable} onChange={(event) => changeCloseTime(event.target.value)} className="rounded-md border border-slate-200 bg-[#FBFBFA] px-3 py-2.5 font-mono text-sm outline-none focus:border-emerald-600">{TIME_OPTIONS.map((time) => <option key={time} value={time}>{time}</option>)}</select></label>
                    <button type="button" disabled={isPending || !scheduleDirty} onClick={saveSchedule} className="rounded-md bg-[#111111] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#333333] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40">Lưu lịch</button>
                  </div>
                  {scheduleDirty && removedRuleCount > 0 && (
                    <div className="mt-4 flex items-start gap-3 rounded-lg border border-[#EADFBF] bg-[#FBF3DB] px-4 py-3.5 text-[#6F5312]" role="status">
                      <span className="material-symbols-outlined mt-0.5 text-[19px]" aria-hidden="true">info</span>
                      <div>
                        <p className="text-sm font-semibold tracking-[-0.01em]">Bảng giá sẽ được điều chỉnh</p>
                        <p className="mt-0.5 text-xs leading-5 text-[#80651F]">Khi lưu lịch, hệ thống tự động loại <strong>{removedRuleCount} khung giá</strong> nằm ngoài giờ hoạt động.</p>
                      </div>
                    </div>
                  )}
                </section>

                <section className="rounded-lg border border-[#EAEAEA] bg-white p-5">
                  <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                    <div><h3 className="font-display text-base font-bold text-[#2F3437]">Khung giá</h3><p className="mt-1 text-xs text-[#787774]">Các đoạn luôn nối liền và giá được tính theo số phút thực tế.</p></div>
                    <button type="button" disabled={isPending || Boolean(validation) || !pricingDirty} onClick={savePricing} className="rounded-md bg-[#111111] px-4 py-2 text-xs font-semibold text-white hover:bg-[#333333] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40">Lưu bảng giá</button>
                  </div>

                  {!isAvailable ? <p className="rounded-md bg-slate-50 p-4 text-sm text-slate-500">Ngày đóng cửa không cần cấu hình giá.</p> : drafts.length === 0 ? (
                    <button type="button" onClick={() => setDrafts([{ dayOfWeek: day, startTime: openTime, pricePerHour: 60000 }])} className="w-full rounded-md border border-dashed border-slate-200 p-6 text-sm text-slate-600 hover:bg-slate-50">Tạo khung giá từ {openTime} đến {closeTime}</button>
                  ) : <PricingTimeline rules={drafts} openTime={openTime} closeTime={closeTime} disabled={isPending} onChange={changeDrafts} />}

                  <div className={`mt-4 flex items-start gap-2 rounded-md p-3 text-xs ${validation ? "bg-[#FBF3DB] text-[#956400]" : "bg-[#EDF3EC] text-[#346538]"}`}>
                    <span className="material-symbols-outlined text-[17px]">{validation ? "warning" : "check_circle"}</span>
                    <span>{validation ?? `Đã bao phủ đủ ${openTime}–${closeTime}. Các điểm chia được khóa theo bước 30 phút.`}</span>
                  </div>
                </section>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
