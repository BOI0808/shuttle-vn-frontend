export const APP_CONFIG = {
  name: "ShuttleVN",
  description: "Hệ thống quản lý sân cầu lông",
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api",
  apiVersion: "v1",
} as const;

// ── Booking ───────────────────────────────────────────────────────────────────

export const BOOKING_STATUS_LABEL: Record<string, string> = {
  PENDING: "Chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  COMPLETED: "Hoàn thành",
  CANCELLED: "Đã huỷ",
};

export const BOOKING_STATUS_COLOR: Record<string, string> = {
  PENDING: "yellow",
  CONFIRMED: "blue",
  COMPLETED: "green",
  CANCELLED: "red",
};

// ── Invoice ───────────────────────────────────────────────────────────────────

export const INVOICE_STATUS_LABEL: Record<string, string> = {
  UNPAID: "Chưa thanh toán",
  PAID: "Đã thanh toán",
  CANCELLED: "Đã huỷ",
};

export const PAYMENT_METHOD_LABEL: Record<string, string> = {
  BANKING: "Chuyển khoản",
  MONEY: "Tiền mặt",
};

// ── Court ─────────────────────────────────────────────────────────────────────

export const COURT_STATUS_LABEL: Record<string, string> = {
  ACTIVE: "Đang hoạt động",
  MAINTENANCE: "Bảo trì",
};

/** Trạng thái hiển thị slot trên grid — tính toán phía FE */
export const SLOT_DISPLAY_STATUS_LABEL: Record<string, string> = {
  AVAILABLE: "Còn trống",
  BOOKED: "Đã đặt",
  CLOSED: "Đóng cửa",
};

// ── Account ───────────────────────────────────────────────────────────────────

export const ACCOUNT_STATUS_LABEL: Record<string, string> = {
  ACTIVE: "Hoạt động",
  LOCKED: "Bị khoá",
  DISABLED: "Vô hiệu hoá",
};

export const USER_ROLE_LABEL: Record<string, string> = {
  Admin: "Quản trị viên",
  Employee: "Nhân viên",
  Customer: "Khách hàng",
};

// ── Day of Week ───────────────────────────────────────────────────────────────

export const DAY_OF_WEEK_LABEL: Record<number, string> = {
  0: "Chủ nhật",
  1: "Thứ 2",
  2: "Thứ 3",
  3: "Thứ 4",
  4: "Thứ 5",
  5: "Thứ 6",
  6: "Thứ 7",
};

// ── Query Keys ────────────────────────────────────────────────────────────────

export const QUERY_KEYS = {
  // Court
  courts: ["courts"] as const,
  court: (id: number) => ["court", id] as const,
  courtSchedules: (courtId: number) => ["court-schedules", courtId] as const,
  pricingRules: (courtId: number) => ["pricing-rules", courtId] as const,
  courtGrid: (date: string) => ["court-grid", date] as const,

  // Booking
  bookings: ["bookings"] as const,
  booking: (id: string) => ["booking", id] as const,
  bookingByCode: (code: string) => ["booking-code", code] as const,
  myBookings: ["my-bookings"] as const,

  // Invoice
  invoices: ["invoices"] as const,
  invoice: (id: string) => ["invoice", id] as const,
  bookingInvoice: (bookingId: string) =>
    ["booking-invoice", bookingId] as const,

  // Customer / Employee
  customers: ["customers"] as const,
  customer: (id: string) => ["customer", id] as const,
  employees: ["employees"] as const,
  employee: (id: string) => ["employee", id] as const,

  // Dashboard
  dashboard: ["dashboard"] as const,
  revenueStats: (from: string, to: string) =>
    ["revenue-stats", from, to] as const,

  // Audit
  auditLogs: ["audit-logs"] as const,
} as const;
