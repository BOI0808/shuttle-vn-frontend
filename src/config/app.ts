export const APP_CONFIG = {
  name: 'ShuttleVN',
  description: 'Hệ thống quản lý sân cầu lông',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:5000/api',
  apiVersion: 'v1',
} as const;

export const TIME_SLOTS = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00',
] as const;

export type TimeSlot = (typeof TIME_SLOTS)[number];

export const BOOKING_STATUS_LABEL: Record<string, string> = {
  Pending: 'Chờ xác nhận',
  Confirmed: 'Đã xác nhận',
  PaymentPending: 'Chờ thanh toán',
  Paid: 'Đã thanh toán',
  Cancelled: 'Đã huỷ',
  Completed: 'Hoàn thành',
};

export const PAYMENT_METHOD_LABEL: Record<string, string> = {
  Cash: 'Tiền mặt',
  BankTransfer: 'Chuyển khoản',
  VNPay: 'VNPay',
  MoMo: 'MoMo',
};

export const COURT_STATUS_LABEL: Record<string, string> = {
  Available: 'Còn trống',
  Booked: 'Đã đặt',
  Maintenance: 'Bảo trì',
  Closed: 'Đóng cửa',
};

export const COURT_TYPE_LABEL: Record<string, string> = {
  Standard: 'Tiêu chuẩn',
  Premium: 'Cao cấp',
  VIP: 'VIP',
};

export const QUERY_KEYS = {
  courts: ['courts'] as const,
  courtGrid: (date: string) => ['court-grid', date] as const,
  bookings: ['bookings'] as const,
  booking: (id: string) => ['booking', id] as const,
  myBookings: ['my-bookings'] as const,
  dashboard: ['dashboard'] as const,
  revenueStats: (from: string, to: string) => ['revenue-stats', from, to] as const,
} as const;
