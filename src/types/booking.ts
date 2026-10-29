import type { ActorType } from "./audit";
import type { ApiPaths, ApiSchemas } from "./api";

export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export type InvoiceStatus = ApiSchemas["InvoiceStatus"];

export type PaymentMethod = "Bank" | "Cash";

// ── Core entities ──────────────────────────────────────────────────────────────

export interface Booking {
  bookingId: string;
  bookingCode: string; // DS-{5+ ký tự}
  customerId: string; // luôn có (BR-03)
  courtId: number;
  date: string; // ISO yyyy-MM-dd
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  status: BookingStatus;
  totalCost: number; // snapshot tại thời điểm tạo (BR-11)
  createdAt: string;
  updatedAt: string;
  expectedState?: string | null;
  priceSegments?: ApiSchemas["BookingDto"]["priceSegments"];
}

export interface BookingStatusHistory {
  id?: string;
  bookingId?: string;
  oldStatus: BookingStatus | null;
  newStatus: BookingStatus;
  actorType: ActorType;
  actorName: string | null;
  changedAt: string;
  reason: string | null;
}

export interface Invoice {
  invoiceId: string;
  invoiceCode: string; // HD-{yyyyMMdd}-{STT}
  bookingId: string;
  totalCost: number;
  status: InvoiceStatus;
  issuedBy: string; // Employee.employeeId
  issuedAt: string;
  paidAt: string | null;
  paymentMethod: PaymentMethod | null;
  note: string | null;
}

// ── Aggregated view (dùng cho danh sách / chi tiết FE) ────────────────────────

export interface BookingDetail extends Booking {
  customerName: string;
  customerPhone: string;
  courtName: string;
  invoice: Invoice | BookingInvoiceSummary | null;
  statusHistory: BookingStatusHistory[];
  paymentStatus?: InvoiceStatus | null;
}

export interface BookingListItem {
  bookingId: string;
  bookingCode: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  courtId: number;
  courtName: string;
  date: string; 
  startTime: string; 
  endTime: string; 
  status: BookingStatus;
  totalCost: number;
  paymentStatus: InvoiceStatus | null;
  createdAt: string; 
}

export interface BookingInvoiceSummary {
  invoiceCode: string;
  status: InvoiceStatus;
  paymentMethod: PaymentMethod | null;
  paidAt: string | null;
}

export interface BookingAdminDetail extends BookingListItem {
  customerEmail: string;
  invoice: BookingInvoiceSummary | null;
  statusHistory: BookingStatusHistory[];
}

// ── Requests ──────────────────────────────────────────────────────────────────

export type BookingPricePreviewParams = NonNullable<
  ApiPaths["/api/bookings/price-preview"]["get"]["parameters"]["query"]
>;
export type RescheduleBookingRequest = ApiSchemas["RescheduleBookingDto"];
export type ReschedulePreview = ApiSchemas["ReschedulePreviewDto"];
export type CancelBookingRequest = ApiSchemas["CancelBookingDto"];
export type RefundPaymentRequest = ApiSchemas["RefundPaymentDto"];

export interface CreateBookingRequest {
  courtId: number;
  date: string;
  startTime: string;
  endTime: string;
  totalCost: number;
  quoteFingerprint: string;
}

export interface ConfirmBookingRequest {
  isPaid: boolean;
  paymentMethod?: PaymentMethod;
  paidAt?: string; // ISO UTC, bắt buộc khi isPaid
  note?: string;
  amount?: number | null;
}

export interface RejectBookingRequest {
  reason: string;
}

/**
 * Khi khách chưa có tài khoản (BR-03):
 * BE tự tạo Customer với accountId = NULL, rồi tạo Booking.
 */
export interface CreateGuestBookingRequest {
  courtId: number;
  date: string;
  startTime: string;
  endTime: string;
  totalCost: number;
  quoteFingerprint: string;
  fullName: string;
  phone: string;
  email: string;
  verificationCode: string;
}

export interface UpdateBookingStatusRequest {
  newStatus: BookingStatus;
  reason: string;
}

export interface CreateInvoiceRequest {
  bookingId: string;
  paymentMethod: PaymentMethod;
  note?: string;
}

export interface ConfirmPaymentRequest {
  invoiceId: string;
  paymentMethod: PaymentMethod;
}

// ── Cart (client-side only) ───────────────────────────────────────────────────

export interface CartSlot {
  courtId: number;
  courtName: string;
  date: string;
  startTime: string;
  endTime: string;
  pricePerHour: number;
  estimatedCost: number;
}
