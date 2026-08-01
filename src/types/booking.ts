export type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "PaymentPending"
  | "Paid"
  | "Cancelled"
  | "Completed";

export type PaymentMethod = "Cash" | "BankTransfer" | "VNPay" | "MoMo";

export type BookingType = "Registered" | "Guest";

export interface BookingSlot {
  courtId: string;
  date: string; // ISO yyyy-MM-dd
  startTime: string; // HH:mm
  endTime: string; // HH:mm
}

export interface CreateBookingRequest {
  slots: BookingSlot[];
  note?: string;
}

export interface CreateGuestBookingRequest {
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  slots: BookingSlot[];
  note?: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  type: BookingType;
  status: BookingStatus;
  customerId: string | null;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  slots: BookedSlot[];
  totalAmount: number;
  paidAmount: number;
  note: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BookedSlot {
  id: string;
  courtId: string;
  courtName: string;
  date: string;
  startTime: string;
  endTime: string;
  pricePerHour: number;
  totalPrice: number;
}

export interface Payment {
  id: string;
  bookingId: string;
  method: PaymentMethod;
  amount: number;
  transactionRef: string | null;
  confirmedAt: string | null;
  confirmedBy: string | null;
  createdAt: string;
}

export interface ConfirmPaymentRequest {
  bookingId: string;
  method: PaymentMethod;
  amount: number;
  transactionRef?: string;
}

export interface CartItem {
  courtId: string;
  courtName: string;
  date: string;
  timeSlot: string;
  pricePerHour: number;
}
