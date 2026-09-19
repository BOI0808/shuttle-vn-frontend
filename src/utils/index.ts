import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

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
  return format(new Date(dateStr), 'dd/MM/yyyy', { locale: vi });
}

export function formatDateTime(dateStr: string): string {
  return format(new Date(dateStr), 'dd/MM/yyyy HH:mm', { locale: vi });
}

export function toISODate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function getTodayISO(): string {
  return toISODate(new Date());
}

export function getErrorMessage(error: unknown): string {
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
