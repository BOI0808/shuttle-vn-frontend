import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { isAxiosError } from "axios";

import type { BookingAdminDetail, BookingDetail, RevenueGroupBy } from "@/types";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return format(new Date(dateStr), "dd/MM/yyyy", { locale: vi });
}

export function formatDateTime(dateStr: string): string {
  return format(new Date(dateStr), "dd/MM/yyyy HH:mm", { locale: vi });
}

export function formatDateTimeVN(dateStr: string): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(dateStr));
  const pick = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  return `${pick("day")}/${pick("month")}/${pick("year")} ${pick("hour")}:${pick("minute")}`;
}

export function hasBookingEnded(date: string, endTime: string): boolean {
  return new Date(`${date}T${endTime}:00+07:00`).getTime() <= Date.now();
}

export function isBeforeBookingChangeDeadline(date: string, startTime: string, now = Date.now()): boolean {
  return new Date(`${date}T${startTime.slice(0, 5)}:00+07:00`).getTime() - now >= 3600000;
}

export function canRescheduleBooking(
  booking: BookingDetail | BookingAdminDetail,
  isStaff = false,
  now = Date.now()
): boolean {
  return (booking.status === "Pending" || booking.status === "Confirmed") &&
    (isStaff || (booking.paymentStatus ?? booking.invoice?.status) !== "Paid") &&
    isBeforeBookingChangeDeadline(booking.date, booking.startTime, now);
}

export function toISODate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function getTodayISO(): string {
  return toISODate(new Date());
}

export function getTodayVN(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date());
}

export function formatRevenuePeriod(
  periodStart: string,
  groupBy: RevenueGroupBy
): string {
  return format(parseISO(periodStart), groupBy === "Month" ? "MM/yyyy" : "dd/MM/yyyy", {
    locale: vi,
  });
}

interface ApiErrorBody {
  message?: string | null;
  errors?: Record<string, string[]> | null;
}

function getApiErrorMessage(error: unknown): string | null {
  if (!isAxiosError<ApiErrorBody>(error)) return null;
  const body = error.response?.data;
  if (!body || typeof body !== "object") return null;

  const details = Object.values(body.errors ?? {}).flat();
  const parts = [body.message, ...details].filter(
    (part): part is string => typeof part === "string" && part.length > 0
  );
  return parts.length > 0 ? Array.from(new Set(parts)).join(" ") : null;
}

export function getErrorMessage(error: unknown): string {
  const apiMessage = getApiErrorMessage(error);
  if (apiMessage) return apiMessage;
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Đã có lỗi xảy ra, vui lòng thử lại.";
}

export function calcHourDiff(startTime: string, endTime: string): number {
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  return (eh * 60 + em - (sh * 60 + sm)) / 60;
}

export * from "./auth-mapper";
