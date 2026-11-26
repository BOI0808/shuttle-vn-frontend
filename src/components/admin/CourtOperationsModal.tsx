"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  useCourtSchedules,
  usePricingRules,
  useSavePricingRules,
  useUpdateCourtSchedule,
} from "@/hooks";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import {
  PricingTimeline,
  type RuleDraft,
  toMinutes,
} from "@/components/admin/PricingTimeline";
import type { Court } from "@/types";
import { cn, getErrorMessage } from "@/utils";

const DAYS = [
  [1, "Thứ Hai"],
  [2, "Thứ Ba"],
  [3, "Thứ Tư"],
  [4, "Thứ Năm"],
  [5, "Thứ Sáu"],
  [6, "Thứ Bảy"],
  [7, "Chủ Nhật"],
] as const;

const TIME_OPTIONS = Array.from(
  { length: 48 },
  (_, index) =>
    `${String(Math.floor(index / 2)).padStart(2, "0")}:${index % 2 ? "30" : "00"}`
);

const shortTime = (value?: string) => value?.slice(0, 5) ?? "";
const pricingSnapshot = (items: RuleDraft[]) =>
  JSON.stringify(
    items
      .map(({ dayOfWeek, startTime, pricePerHour }) => ({
        dayOfWeek,
        startTime,
        pricePerHour,
      }))
      .sort((a, b) => a.startTime.localeCompare(b.startTime))
  );

function validateRules(
  rules: RuleDraft[],
  openTime: string,
  closeTime: string,
  isAvailable: boolean
): string | null {
  if (!isAvailable) return null;
  const open = toMinutes(openTime);
  const close = toMinutes(closeTime);
  if (!openTime || !closeTime || open >= close) {
    return "Giờ đóng cửa phải sau giờ mở cửa.";
  }
  if (!rules.length) {
    return "Ngày hoạt động phải có ít nhất một khung giá.";
  }
  if (
    rules.some(
      (rule) =>
        !rule.startTime || rule.pricePerHour === "" || rule.pricePerHour <= 0
    )
  ) {
    return "Mỗi khung giá cần có giờ bắt đầu và đơn giá lớn hơn 0.";
  }
  const sorted = [...rules].sort(
    (a, b) => toMinutes(a.startTime) - toMinutes(b.startTime)
  );
  if (sorted[0].startTime !== openTime) {
    return "Mốc giá đầu tiên phải trùng giờ mở cửa.";
  }
  if (
    sorted.some(
      (rule) =>
        toMinutes(rule.startTime) < open || toMinutes(rule.startTime) >= close
    )
  ) {
    return "Mọi mốc giá phải nằm trong giờ hoạt động.";
  }
  if (
    sorted.some(
      (rule, index) =>
        index > 0 &&
        toMinutes(rule.startTime) - toMinutes(sorted[index - 1].startTime) < 30
    )
  ) {
    return "Các mốc giá phải cách nhau ít nhất 30 phút.";
  }
  return null;
}

function fitRulesToSchedule(
  rules: RuleDraft[],
  openTime: string,
  closeTime: string
): RuleDraft[] {
  const open = toMinutes(openTime);
  const close = toMinutes(closeTime);
  if (!rules.length || open >= close) return rules;
  const sorted = [...rules].sort(
    (a, b) => toMinutes(a.startTime) - toMinutes(b.startTime)
  );
  const activeAtOpen =
    [...sorted].reverse().find((rule) => toMinutes(rule.startTime) <= open) ??
    sorted[0];
  return [
    { ...activeAtOpen, startTime: openTime },
    ...sorted.filter(
      (rule) =>
        toMinutes(rule.startTime) > open && toMinutes(rule.startTime) < close
    ),
  ];
}

interface CourtOperationsModalProps {
  court: Court;
  onClose: () => void;
}

export function CourtOperationsModal({
  court,
  onClose,
}: CourtOperationsModalProps) {
  const titleId = useId();
  const [day, setDay] = useState(1);
  const [openTime, setOpenTime] = useState("06:00");
  const [closeTime, setCloseTime] = useState("22:00");
  const [isAvailable, setIsAvailable] = useState(true);
  const [drafts, setDrafts] = useState<RuleDraft[]>([]);

  const { data: schedules, isLoading: schedulesLoading } = useCourtSchedules(
    court.courtId
  );
  const {
    data: rules,
    isLoading: rulesLoading,
    refetch: refetchRules,
  } = usePricingRules(court.courtId);
  const updateSchedule = useUpdateCourtSchedule();
  const saveRules = useSavePricingRules();

  const schedule = schedules?.find((item) => item.dayOfWeek === day);
  const dayRules = useMemo(
    () => rules?.filter((item) => item.dayOfWeek === day) ?? [],
    [rules, day]
  );

  useEffect(() => {
    setOpenTime(shortTime(schedule?.openTime) || "06:00");
    setCloseTime(shortTime(schedule?.closeTime) || "22:00");
    setIsAvailable(schedule?.isAvailable ?? true);
  }, [schedule, day]);

  useEffect(() => {
    setDrafts(
      dayRules.map((rule) => ({
        dayOfWeek: day,
        startTime: shortTime(rule.startTime),
        pricePerHour: rule.pricePerHour,
      }))
    );
  }, [dayRules, day]);

  const validation = validateRules(drafts, openTime, closeTime, isAvailable);
  const isPending = updateSchedule.isPending || saveRules.isPending;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isPending) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPending, onClose]);

  const scheduleDirty =
    Boolean(schedule) &&
    (openTime !== shortTime(schedule?.openTime) ||
      closeTime !== shortTime(schedule?.closeTime) ||
      isAvailable !== schedule?.isAvailable);

  const pricingDirty =
    pricingSnapshot(drafts) !==
    pricingSnapshot(
      dayRules.map((rule) => ({
        dayOfWeek: rule.dayOfWeek,
        startTime: shortTime(rule.startTime),
        pricePerHour: rule.pricePerHour,
      }))
    );

  const removedRuleCount = isAvailable
    ? dayRules.filter(
        (rule) =>
          toMinutes(rule.startTime) < toMinutes(openTime) ||
          toMinutes(rule.startTime) >= toMinutes(closeTime)
      ).length
    : dayRules.length;

  const changeDrafts = (next: RuleDraft[]) => setDrafts(next);

  const changeOpenTime = (nextOpenTime: string) => {
    setOpenTime(nextOpenTime);
    setDrafts((current) =>
      fitRulesToSchedule(current, nextOpenTime, closeTime)
    );
  };

  const changeCloseTime = (nextCloseTime: string) => {
    setCloseTime(nextCloseTime);
    setDrafts((current) =>
      fitRulesToSchedule(current, openTime, nextCloseTime)
    );
  };

  const saveSchedule = () => {
    if (validation) return toast.error(validation);
    updateSchedule.mutate(
      {
        courtId: court.courtId,
        dayOfWeek: day,
        payload: { openTime, closeTime, isAvailable },
      },
      {
        onSuccess: () =>
          toast.success(
            `Đã cập nhật lịch ${DAYS.find(([value]) => value === day)?.[1]}`
          ),
        onError: (error) => toast.error(getErrorMessage(error)),
      }
    );
  };

  const savePricing = async () => {
    if (validation) return toast.error(validation);
    try {
      const saved = await saveRules.mutateAsync({
        courtId: court.courtId,
        dayOfWeek: day,
        payload: {
          pricingRules: drafts.map(({ startTime, pricePerHour }) => ({
            startTime,
            pricePerHour: Number(pricePerHour),
          })),
        },
      });
      setDrafts(
        saved.map((rule) => ({
          dayOfWeek: day,
          startTime: shortTime(rule.startTime),
          pricePerHour: rule.pricePerHour,
        }))
      );
      toast.success("Đã lưu bảng giá");
    } catch (error) {
      const result = await refetchRules();
      const freshRules =
        result.data?.filter((rule) => rule.dayOfWeek === day) ?? [];
      setDrafts(
        freshRules.map((rule) => ({
          dayOfWeek: day,
          startTime: shortTime(rule.startTime),
          pricePerHour: rule.pricePerHour,
        }))
      );
      toast.error(
        `${getErrorMessage(error)} Bảng giá đã được khôi phục từ máy chủ.`
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 p-4 backdrop-blur-xs"
      onClick={(event) => {
        if (event.target === event.currentTarget && !isPending) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-hidden rounded-[12px] border border-line bg-surface-bg shadow-xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-line bg-white px-6 py-5">
          <div>
            <p className="font-sans text-[12px] font-semibold leading-[16px] text-brand-strong">
              Thiết lập hằng tuần
            </p>
            <h2
              id={titleId}
              className="mt-1 font-display text-[18px] font-medium leading-[26px] text-ink"
            >
              Vận hành &amp; Bảng giá · {court.name}
            </h2>
            <p className="mt-1 font-sans text-[12px] leading-[16px] text-ink-secondary">
              Cấu hình riêng 7 ngày trong tuần. Các mốc thời gian theo bước 30 phút.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            aria-label="Đóng"
            className="inline-flex size-[36px] shrink-0 items-center justify-center rounded-[8px] text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              close
            </span>
          </button>
        </header>

        <div className="grid min-h-0 flex-1 md:grid-cols-[200px_1fr]">
          <nav
            className="flex gap-1.5 overflow-x-auto border-b border-line bg-white p-3 md:flex-col md:border-b-0 md:border-r"
            aria-label="Chọn ngày trong tuần"
          >
            {DAYS.map(([value, label]) => {
              const isSelected = day === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setDay(value)}
                  className={cn(
                    "flex h-[44px] min-w-[104px] items-center rounded-[8px] px-3 text-left font-sans text-[14px] font-semibold leading-[20px] transition-colors md:min-w-0",
                    isSelected
                      ? "bg-brand-soft text-brand-strong"
                      : "text-ink-secondary hover:bg-surface-soft hover:text-ink"
                  )}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          <main className="overflow-y-auto p-5 md:p-6">
            {schedulesLoading || rulesLoading ? (
              <div className="space-y-4" aria-label="Đang tải" aria-busy="true">
                <div className="h-36 animate-pulse rounded-[12px] border border-line bg-white" />
                <div className="h-60 animate-pulse rounded-[12px] border border-line bg-white" />
              </div>
            ) : (
              <div className="space-y-5">
                <section className="rounded-[12px] border border-line bg-white p-5">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-display text-[18px] font-medium leading-[26px] text-ink">
                        Giờ hoạt động
                      </h3>
                      <p className="mt-1 font-sans text-[12px] leading-[16px] text-ink-secondary">
                        Khoảng thời gian sân nhận đặt chỗ trong ngày.
                      </p>
                    </div>
                    <label className="flex min-h-[44px] cursor-pointer items-center gap-2 font-sans text-[14px] font-semibold text-ink">
                      <input
                        type="checkbox"
                        checked={isAvailable}
                        onChange={(event) => setIsAvailable(event.target.checked)}
                        className="size-4 accent-brand"
                      />
                      Mở cửa
                    </label>
                  </div>

                  <div className="mb-4 overflow-x-auto pb-1">
                    <div className="min-w-[560px]">
                      <div className="relative h-12 overflow-hidden rounded-[8px] border border-line bg-surface-soft">
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_7px,rgba(89,109,128,0.12)_7px,rgba(89,109,128,0.12)_8px)]" />
                        {isAvailable && (
                          <div
                            className="absolute inset-y-0 flex items-center justify-center bg-brand-soft font-sans text-[12px] font-semibold text-brand-strong tabular-nums"
                            style={{
                              left: `${(toMinutes(openTime) / 1440) * 100}%`,
                              width: `${((toMinutes(closeTime) - toMinutes(openTime)) / 1440) * 100}%`,
                            }}
                          >
                            {openTime}–{closeTime}
                          </div>
                        )}
                      </div>
                      <div className="relative mt-2 h-4">
                        {[0, 6, 12, 18, 24].map((hour) => (
                          <span
                            key={hour}
                            className="absolute -translate-x-1/2 font-sans text-[12px] leading-[16px] text-ink-secondary tabular-nums first:translate-x-0 last:-translate-x-full"
                            style={{ left: `${(hour / 24) * 100}%` }}
                          >
                            {String(hour).padStart(2, "0")}:00
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                    <div>
                      <Label htmlFor="ops-open-time">Mở cửa</Label>
                      <Select
                        id="ops-open-time"
                        value={openTime}
                        disabled={!isAvailable}
                        onChange={(event) => changeOpenTime(event.target.value)}
                        className="tabular-nums"
                      >
                        {TIME_OPTIONS.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="ops-close-time">Đóng cửa</Label>
                      <Select
                        id="ops-close-time"
                        value={closeTime}
                        disabled={!isAvailable}
                        onChange={(event) => changeCloseTime(event.target.value)}
                        className="tabular-nums"
                      >
                        {TIME_OPTIONS.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <Button
                      type="button"
                      variant="primary"
                      disabled={isPending || !scheduleDirty}
                      loading={updateSchedule.isPending}
                      onClick={saveSchedule}
                    >
                      Lưu lịch
                    </Button>
                  </div>

                  {scheduleDirty && removedRuleCount > 0 && (
                    <div
                      className="mt-4 flex items-start gap-3 rounded-[8px] border border-status-warning/30 bg-status-warning-soft px-4 py-3 text-status-warning"
                      role="status"
                    >
                      <span
                        className="material-symbols-outlined mt-0.5 text-[20px]"
                        aria-hidden="true"
                      >
                        info
                      </span>
                      <div>
                        <p className="font-sans text-[14px] font-semibold">
                          Bảng giá sẽ được điều chỉnh
                        </p>
                        <p className="mt-0.5 font-sans text-[12px] leading-[18px]">
                          Khi lưu lịch, hệ thống tự động loại{" "}
                          <strong>{removedRuleCount} khung giá</strong> nằm ngoài giờ hoạt động.
                        </p>
                      </div>
                    </div>
                  )}
                </section>

                <section className="rounded-[12px] border border-line bg-white p-5">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-[18px] font-medium leading-[26px] text-ink">
                        Dòng thời gian giá (VND / giờ)
                      </h3>
                      <p className="mt-1 font-sans text-[12px] leading-[16px] text-ink-secondary">
                        Các đoạn luôn nối liền và giá được tính theo số phút thực tế.
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="primary"
                      disabled={isPending || Boolean(validation) || !pricingDirty}
                      loading={saveRules.isPending}
                      onClick={savePricing}
                    >
                      Lưu bảng giá
                    </Button>
                  </div>

                  {!isAvailable ? (
                    <p className="rounded-[8px] bg-surface-soft p-4 font-sans text-[14px] text-ink-secondary">
                      Ngày đóng cửa không cần cấu hình giá.
                    </p>
                  ) : drafts.length === 0 ? (
                    <button
                      type="button"
                      onClick={() =>
                        setDrafts([
                          {
                            dayOfWeek: day,
                            startTime: openTime,
                            pricePerHour: 60000,
                          },
                        ])
                      }
                      className="w-full rounded-[8px] border border-dashed border-line-strong p-6 font-sans text-[14px] font-medium text-ink-secondary transition-colors hover:bg-surface-bg hover:text-ink"
                    >
                      Tạo khung giá từ {openTime} đến {closeTime}
                    </button>
                  ) : (
                    <PricingTimeline
                      rules={drafts}
                      openTime={openTime}
                      closeTime={closeTime}
                      disabled={isPending}
                      onChange={changeDrafts}
                    />
                  )}

                  <div
                    role="status"
                    className={cn(
                      "mt-4 flex items-start gap-2.5 rounded-[8px] px-3.5 py-3 font-sans text-[12px] leading-[18px]",
                      validation
                        ? "bg-status-warning-soft text-status-warning"
                        : "bg-brand-soft text-brand-strong"
                    )}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      aria-hidden="true"
                    >
                      {validation ? "warning" : "check_circle"}
                    </span>
                    <span>
                      {validation ??
                        `Đã bao phủ đủ ${openTime}–${closeTime}. Các điểm chia được khóa theo bước 30 phút.`}
                    </span>
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
