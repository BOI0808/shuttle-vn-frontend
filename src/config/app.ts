export const APP_CONFIG = {
  name: "ShuttleVN",
  description: "Hệ thống quản lý sân cầu lông",
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api",
  hotline: { display: "1900 1234", tel: "19001234" },
} as const;

export const CHAT_CONFIG = {
  maxMessageLength: 2000,
  maxMessages: 20,
  idleTimeoutMs: 45000,
  welcomeMessage:
    "Xin chào! Tôi có thể hướng dẫn đặt sân, tư vấn giá và gợi ý giờ trống.",
  noticeText:
    "AI chỉ tư vấn thông tin công khai. AI KHÔNG thể đặt, hủy, đổi sân, thu tiền hay xem dữ liệu cá nhân.",
  priceDisclaimer:
    "Giá và chỗ trống chỉ mang tính tham khảo, được kiểm tra lại khi đặt.",
  quickPrompts: [
    {
      label: "Hướng dẫn đặt sân",
      prompt: "Hướng dẫn mình cách đặt sân trên website.",
    },
    {
      label: "Giá theo giờ",
      prompt: "Giá thuê sân hôm nay theo từng khung giờ là bao nhiêu?",
    },
    {
      label: "Gợi ý giờ còn trống",
      prompt: "Gợi ý giúp mình các khung giờ còn trống hôm nay.",
    },
  ],
  toolLabels: {
    list_courts: "Đang xem danh sách sân…",
    get_court_availability: "Đang kiểm tra lịch trống và giá…",
    default: "Đang tra cứu thông tin…",
  },
  errorMessages: {
    validation: "Tin nhắn chưa hợp lệ. Vui lòng kiểm tra nội dung và thử lại.",
    rate_limited: "Bạn gửi quá nhanh. Vui lòng thử lại sau {seconds} giây.",
    unavailable: "Trợ lý tạm thời không phản hồi. Vui lòng thử lại.",
  },
} as const;

export const BOOKING_STATUS_LABEL: Record<string, string> = {
  Pending: "Chờ xác nhận",
  Confirmed: "Đã xác nhận",
  Completed: "Hoàn thành",
  Cancelled: "Đã huỷ",
};

export const BOOKING_STATUS_COLOR: Record<string, string> = {
  Pending: "yellow",
  Confirmed: "blue",
  Completed: "green",
  Cancelled: "red",
};

export const INVOICE_STATUS_LABEL: Record<string, string> = {
  Unpaid: "Chưa thanh toán",
  Paid: "Đã thanh toán",
  Cancelled: "Đã huỷ",
  Refunded: "Đã hoàn tiền",
};

export const PAYMENT_METHOD_LABEL: Record<string, string> = {
  Bank: "Chuyển khoản",
  Cash: "Tiền mặt",
};

export const NO_INVOICE_LABEL = "Chưa lập hóa đơn";

export const ACTOR_TYPE_LABEL: Record<string, string> = {
  System: "Hệ thống",
  Employee: "Nhân viên",
  Customer: "Khách hàng",
};

export const COURT_STATUS_LABEL: Record<string, string> = {
  Active: "Đang hoạt động",
  Maintenance: "Bảo trì",
  Closed: "Đóng cửa",
};

export const SLOT_DISPLAY_STATUS_LABEL: Record<string, string> = {
  AVAILABLE: "Còn trống",
  BOOKED: "Đã đặt",
  CLOSED: "Đóng cửa",
};

export const ACCOUNT_STATUS_LABEL: Record<string, string> = {
  Active: "Hoạt động",
  Disabled: "Vô hiệu hoá",
  PendingActivation: "Chờ kích hoạt",
};

export const EMAIL_SEND_TIMEOUT_MS = 35000;

export const USER_ROLE_LABEL: Record<string, string> = {
  Admin: "Quản trị viên",
  Employee: "Nhân viên",
  Customer: "Khách hàng",
};

export const DAY_OF_WEEK_LABEL: Record<number, string> = {
  0: "Chủ nhật",
  1: "Thứ 2",
  2: "Thứ 3",
  3: "Thứ 4",
  4: "Thứ 5",
  5: "Thứ 6",
  6: "Thứ 7",
};

export interface BookingAdminQueryParams {
  pageNumber?: number;
  pageSize?: number;
  fromDate?: string;
  toDate?: string;
  courtId?: number;
  status?: string;
  customerId?: string;
  keyword?: string;
}

export const QUERY_KEYS = {
  courts: ["courts"] as const,
  court: (id: number) => ["court", id] as const,
  courtSchedules: (courtId: number) => ["court-schedules", courtId] as const,
  pricingRules: (courtId: number) => ["pricing-rules", courtId] as const,
  courtGrid: (date: string) => ["court-grid", date] as const,
  courtGrids: ["court-grid"] as const,

  bookings: ["bookings"] as const,
  booking: (id: string) => ["booking", id] as const,
  bookingByCode: (code: string) => ["booking-code", code] as const,
  myBookings: ["my-bookings"] as const,
  pendingBookings: (params?: { pageNumber?: number; pageSize?: number }) =>
    ["pending-bookings", params ?? {}] as const,
  pendingBookingsAll: ["pending-bookings"] as const,
  adminBookings: (params?: BookingAdminQueryParams) =>
    ["admin-bookings", params ?? {}] as const,
  adminBookingsAll: ["admin-bookings"] as const,
  bookingDetail: (id: string) => ["booking-detail", id] as const,
  customerBookings: (
    customerId: string,
    params?: { pageNumber?: number; pageSize?: number },
  ) => ["customer-bookings", customerId, params ?? {}] as const,

  invoices: ["invoices"] as const,
  invoice: (id: string) => ["invoice", id] as const,
  bookingInvoice: (bookingId: string) =>
    ["booking-invoice", bookingId] as const,

  customers: ["customers"] as const,
  customer: (id: string) => ["customer", id] as const,
  employees: ["employees"] as const,
  employee: (id: string) => ["employee", id] as const,

  dashboard: ["dashboard"] as const,
  revenueStats: (from: string, to: string, groupBy: string) =>
    ["revenue-stats", from, to, groupBy] as const,
  courtUsageStatsAll: ["court-usage-stats"] as const,
  courtUsageStats: (from: string, to: string, groupBy: string) =>
    ["court-usage-stats", from, to, groupBy] as const,

  quickLookup: (keyword: string, pageNumber: number) =>
    ["quick-lookup", keyword, pageNumber] as const,

  auditLogs: ["audit-logs"] as const,
} as const;
