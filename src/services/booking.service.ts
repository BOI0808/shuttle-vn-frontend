// import axiosInstance from "@/lib/axios";
// import {
//   ApiResponse,
//   Booking,
//   BookingDetail,
//   ConfirmPaymentRequest,
//   CreateBookingRequest,
//   CreateWalkInBookingRequest,
//   PaginatedResponse,
//   PaginationParams,
//   Invoice,
// } from "@/types";

// export const bookingService = {
//   // Customer
//   async createBooking(payload: CreateBookingRequest): Promise<Booking> {
//     const { data } = await axiosInstance.post<ApiResponse<Booking>>(
//       "/bookings",
//       payload
//     );
//     return data.data;
//   },

//   async createWalkInBooking(
//     payload: CreateWalkInBookingRequest
//   ): Promise<Booking> {
//     const { data } = await axiosInstance.post<ApiResponse<Booking>>(
//       "/bookings/guest",
//       payload
//     );
//     return data.data;
//   },

//   async getMyBookings(
//     params?: PaginationParams
//   ): Promise<PaginatedResponse<BookingDetail>> {
//     const { data } = await axiosInstance.get<
//       ApiResponse<PaginatedResponse<BookingDetail>>
//     >("/bookings/my", { params });
//     return data.data;
//   },

//   async getBookingById(id: string): Promise<Booking> {
//     const { data } = await axiosInstance.get<ApiResponse<BookingDetail>>(
//       `/bookings/${id}`
//     );
//     return data.data;
//   },

//   async getBookingByCode(code: string): Promise<BookingDetail> {
//     const { data } = await axiosInstance.get<ApiResponse<BookingDetail>>(
//       `/bookings/code/${code}`
//     );
//     return data.data;
//   },

//   async cancelBooking(id: string): Promise<void> {
//     await axiosInstance.put(`/bookings/${id}/cancel`);
//   },

//   // Admin
//   async getAllBookings(
//     params?: PaginationParams & { date?: string; status?: string }
//   ): Promise<PaginatedResponse<Booking>> {
//     const { data } = await axiosInstance.get<
//       ApiResponse<PaginatedResponse<Booking>>
//     >("/admin/bookings", { params });
//     return data.data;
//   },

//   async confirmPayment(payload: ConfirmPaymentRequest): Promise<Invoice> {
//     const { data } = await axiosInstance.post<ApiResponse<Invoice>>(
//       "/admin/payments/confirm",
//       payload
//     );
//     return data.data;
//   },
// };

// Mock Data
import {
  Booking,
  BookingDetail,
  ConfirmPaymentRequest,
  CreateBookingRequest,
  CreateWalkInBookingRequest,
  Invoice,
  PaginatedResponse,
  PaginationParams,
} from "@/types";

const sleep = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Database chi tiết phục vụ cả danh sách và tra cứu
let mockBookingDetails: BookingDetail[] = [
  {
    bookingId: "B-10294",
    bookingCode: "DS-10294",
    customerId: "CUST-001",
    customerName: "Nguyễn Văn An",
    customerPhone: "0901234567",
    courtId: 1,
    courtName: "Sân 1 (VIP)",
    date: "2026-09-04",
    startTime: "07:00",
    endTime: "08:30",
    status: "CONFIRMED",
    totalCost: 150000,
    createdAt: "2026-09-01T08:00:00.000Z",
    updatedAt: "2026-09-01T08:15:00.000Z",
    invoice: {
      invoiceId: "INV-001",
      invoiceCode: "HD-20260901-001",
      bookingId: "B-10294",
      totalCost: 150000,
      status: "PAID",
      issuedBy: "EMP-001",
      issuedAt: "2026-09-01T08:15:00.000Z",
      paidAt: "2026-09-01T08:15:00.000Z",
      paymentMethod: "BANKING",
      note: "Đã chuyển khoản VietQR",
    },
    statusHistory: [
      {
        id: "H-1",
        bookingId: "B-10294",
        oldStatus: "PENDING",
        newStatus: "CONFIRMED",
        changedBy: "EMP-001",
        changedAt: "2026-09-01T08:15:00.000Z",
        reason: "Xác nhận sau khi nhận thanh toán",
      },
    ],
  },
  {
    bookingId: "B-10312",
    bookingCode: "DS-10312",
    customerId: "CUST-001",
    customerName: "Trần Thị Mai",
    customerPhone: "0908765432",
    courtId: 2,
    courtName: "Sân 2 (Tiêu chuẩn)",
    date: "2026-09-04",
    startTime: "18:00",
    endTime: "19:30",
    status: "PENDING",
    totalCost: 180000,
    createdAt: "2026-09-02T10:00:00.000Z",
    updatedAt: "2026-09-02T10:00:00.000Z",
    invoice: null,
    statusHistory: [
      {
        id: "H-2",
        bookingId: "B-10312",
        oldStatus: "PENDING",
        newStatus: "PENDING",
        changedBy: null,
        changedAt: "2026-09-02T10:00:00.000Z",
        reason: "Khách tạo đơn online - chờ chuyển khoản",
      },
    ],
  },
  {
    bookingId: "B-10218",
    bookingCode: "DS-10218",
    customerId: "CUST-001",
    customerName: "Lê Hoàng Nam",
    customerPhone: "0912345678",
    courtId: 3,
    courtName: "Sân 3 (Tiêu chuẩn)",
    date: "2026-09-03",
    startTime: "19:00",
    endTime: "21:00",
    status: "COMPLETED",
    totalCost: 240000,
    createdAt: "2026-09-01T09:00:00.000Z",
    updatedAt: "2026-09-03T21:00:00.000Z",
    invoice: {
      invoiceId: "INV-002",
      invoiceCode: "HD-20260903-014",
      bookingId: "B-10218",
      totalCost: 240000,
      status: "PAID",
      issuedBy: "EMP-002",
      issuedAt: "2026-09-03T21:00:00.000Z",
      paidAt: "2026-09-03T21:00:00.000Z",
      paymentMethod: "MONEY",
      note: "Thanh toán tiền mặt tại quầy sau giờ chơi",
    },
    statusHistory: [
      {
        id: "H-3",
        bookingId: "B-10218",
        oldStatus: "CONFIRMED",
        newStatus: "COMPLETED",
        changedBy: "EMP-002",
        changedAt: "2026-09-03T21:00:00.000Z",
        reason: "Hoàn thành thời gian sử dụng sân",
      },
    ],
  },
];

export const bookingService = {
  // Customer
  async createBooking(payload: CreateBookingRequest): Promise<Booking> {
    await sleep();
    const newBookingDetail: BookingDetail = {
      bookingId: `B-${Date.now()}`,
      bookingCode: `DS-${Math.floor(10000 + Math.random() * 90000)}`,
      customerId: payload.customerId,
      customerName: "Khách đặt sân",
      customerPhone: "0900000000",
      courtId: payload.courtId,
      courtName: `Sân ${payload.courtId}`,
      date: payload.date,
      startTime: payload.startTime,
      endTime: payload.endTime,
      status: "PENDING",
      totalCost: 120000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      invoice: null,
      statusHistory: [],
    };

    mockBookingDetails.unshift(newBookingDetail);
    return newBookingDetail;
  },

  async createWalkInBooking(
    payload: CreateWalkInBookingRequest
  ): Promise<Booking> {
    await sleep();
    const newBookingDetail: BookingDetail = {
      bookingId: `B-${Date.now()}`,
      bookingCode: `DS-${Math.floor(10000 + Math.random() * 90000)}`,
      customerId: "GUEST-TEMP",
      customerName: payload.guestFullName,
      customerPhone: payload.guestPhone,
      courtId: payload.courtId || 1,
      courtName: `Sân ${payload.courtId || 1}`,
      date: payload.date || new Date().toISOString().split("T")[0],
      startTime: payload.startTime || "08:00",
      endTime: payload.endTime || "09:00",
      status: "PENDING",
      totalCost: 100000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      invoice: null,
      statusHistory: [],
    };

    mockBookingDetails.unshift(newBookingDetail);
    return newBookingDetail;
  },

  async getMyBookings(
    params?: PaginationParams
  ): Promise<PaginatedResponse<BookingDetail>> {
    await sleep();
    const pageNumber = params?.pageNumber ?? 1;
    const pageSize = params?.pageSize ?? 10;

    return {
      items: mockBookingDetails,
      totalCount: mockBookingDetails.length,
      pageNumber,
      pageSize,
      totalPages: Math.ceil(mockBookingDetails.length / pageSize),
    };
  },

  async getBookingById(id: string): Promise<Booking> {
    await sleep();
    const found = mockBookingDetails.find((b) => b.bookingId === id);
    if (!found) {
      throw new Error("Không tìm thấy đơn đặt sân");
    }
    return found;
  },

  async getBookingByCode(code: string): Promise<BookingDetail> {
    await sleep();
    const found = mockBookingDetails.find(
      (b) => b.bookingCode.toUpperCase() === code.trim().toUpperCase()
    );

    if (!found) {
      throw new Error("Mã đặt sân không tồn tại trong hệ thống");
    }
    return found;
  },

  async cancelBooking(id: string): Promise<void> {
    await sleep();
    const target = mockBookingDetails.find((b) => b.bookingId === id);
    if (target) {
      target.status = "CANCELLED";
      target.updatedAt = new Date().toISOString();
      target.statusHistory.push({
        id: `H-${Date.now()}`,
        bookingId: target.bookingId,
        oldStatus: target.status,
        newStatus: "CANCELLED",
        changedBy: null,
        changedAt: new Date().toISOString(),
        reason: "Người dùng yêu cầu hủy trên web",
      });
    }
  },

  // Admin
  async getAllBookings(
    params?: PaginationParams & { date?: string; status?: string }
  ): Promise<PaginatedResponse<Booking>> {
    await sleep();
    let result = [...mockBookingDetails];

    if (params?.status) {
      result = result.filter((b) => b.status === params.status);
    }
    if (params?.date) {
      result = result.filter((b) => b.date === params.date);
    }

    const pageNumber = params?.pageNumber ?? 1;
    const pageSize = params?.pageSize ?? 10;

    return {
      items: result,
      totalCount: result.length,
      pageNumber,
      pageSize,
      totalPages: Math.ceil(result.length / pageSize),
    };
  },

  async confirmPayment(payload: ConfirmPaymentRequest): Promise<Invoice> {
    await sleep();
    const newInvoice: Invoice = {
      invoiceId: payload.invoiceId,
      invoiceCode: `HD-${new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "")}-999`,
      bookingId: "B-10312",
      totalCost: 180000,
      status: "PAID",
      issuedBy: "EMP-001",
      issuedAt: new Date().toISOString(),
      paidAt: new Date().toISOString(),
      paymentMethod: payload.paymentMethod,
      note: "Xác nhận thanh toán thủ công",
    };

    const target = mockBookingDetails.find(
      (b) => b.bookingId === newInvoice.bookingId
    );
    if (target) {
      target.status = "CONFIRMED";
      target.invoice = newInvoice;
    }

    return newInvoice;
  },
};
