export type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

export type InvoiceStatus = "UNPAID" | "PAID" | "CANCELLED";

/** BANK = chuyển khoản, CASH = tiền mặt (khớp BE/database.md) */
export type PaymentMethod = "BANK" | "CASH";

export type BookingActorType = "SYSTEM" | "EMPLOYEE" | "CUSTOMER";

/** NO_INVOICE khi chưa có hóa đơn hợp lệ (SRS 3.3) */
export type BookingPaymentStatus = "NO_INVOICE" | "UNPAID" | "PAID";

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
}

export interface BookingStatusHistory {
  id: string;
  bookingId: string;
  oldStatus: BookingStatus | null; 
  newStatus: BookingStatus;
  actorType: BookingActorType;
  actorName: string | null;
  changedAt: string;
  reason: string;
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
  invoice: Invoice | null;
  statusHistory: BookingStatusHistory[];
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
  paymentStatus: BookingPaymentStatus;
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

export interface CreateBookingRequest {
  customerId: string;
  courtId: number;
  date: string; // yyyy-MM-dd
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  note?: string;
}

export interface ConfirmBookingRequest {
  isPaid: boolean;
  paymentMethod?: PaymentMethod;
  paidAt?: string; // ISO UTC, bắt buộc khi isPaid
  note?: string;
}

export interface RejectBookingRequest {
  reason: string;
}

/**
 * Khi khách chưa có tài khoản (BR-03):
 * BE tự tạo Customer với accountId = NULL, rồi tạo Booking.
 */
export interface CreateWalkInBookingRequest {
  guestFullName: string;
  guestPhone: string;
  guestEmail?: string;
  courtId: number;
  date: string;
  startTime: string;
  endTime: string;
  note?: string;
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
