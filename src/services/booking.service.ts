// import axiosInstance from "@/lib/axios";
// import {
//   ApiResponse,
//   Booking,
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
//   ): Promise<PaginatedResponse<Booking>> {
//     const { data } = await axiosInstance.get<
//       ApiResponse<PaginatedResponse<Booking>>
//     >("/bookings/my", { params });
//     return data.data;
//   },

//   async getBookingById(id: string): Promise<Booking> {
//     const { data } = await axiosInstance.get<ApiResponse<Booking>>(
//       `/bookings/${id}`
//     );
//     return data.data;
//   },

//   async getBookingByCode(code: string): Promise<Booking> {
//     const { data } = await axiosInstance.get<ApiResponse<Booking>>(
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

// Mock API
import {
  Booking,
  ConfirmPaymentRequest,
  CreateBookingRequest,
  CreateWalkInBookingRequest,
  Invoice,
  PaginatedResponse,
  PaginationParams,
} from "@/types";

const sleep = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

// Bộ nhớ giả lập lưu trữ các booking trong phiên làm việc
let mockBookings: Booking[] = [
  {
    bookingId: "B-101",
    bookingCode: "DS-88231",
    customerId: "CUST-001",
    courtId: 1,
    date: new Date().toISOString().split("T")[0],
    startTime: "07:00",
    endTime: "08:30",
    status: "CONFIRMED",
    totalCost: 150000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    bookingId: "B-102",
    bookingCode: "DS-99120",
    customerId: "CUST-001",
    courtId: 2,
    date: new Date().toISOString().split("T")[0],
    startTime: "18:00",
    endTime: "19:30",
    status: "PENDING",
    totalCost: 180000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const bookingService = {
  // Customer
  async createBooking(payload: CreateBookingRequest): Promise<Booking> {
    await sleep();
    const newBooking: Booking = {
      bookingId: `B-${Date.now()}`,
      bookingCode: `DS-${Math.floor(10000 + Math.random() * 90000)}`,
      customerId: payload.customerId,
      courtId: payload.courtId,
      date: payload.date,
      startTime: payload.startTime,
      endTime: payload.endTime,
      status: "PENDING",
      totalCost: 120000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockBookings.unshift(newBooking);
    return newBooking;
  },

  async createWalkInBooking(
    payload: CreateWalkInBookingRequest
  ): Promise<Booking> {
    await sleep();
    const newBooking: Booking = {
      bookingId: `B-${Date.now()}`,
      bookingCode: `DS-${Math.floor(10000 + Math.random() * 90000)}`,
      customerId: "GUEST-TEMP",
      courtId: payload.courtId || 1,
      date: payload.date || new Date().toISOString().split("T")[0],
      startTime: payload.startTime || "08:00",
      endTime: payload.endTime || "09:00",
      status: "PENDING",
      totalCost: 100000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockBookings.unshift(newBooking);
    return newBooking;
  },

  async getMyBookings(
    params?: PaginationParams
  ): Promise<PaginatedResponse<Booking>> {
    await sleep();
    const pageNumber = params?.pageNumber ?? 1;
    const pageSize = params?.pageSize ?? 10;

    return {
      items: mockBookings,
      totalCount: mockBookings.length,
      pageNumber,
      pageSize,
      totalPages: Math.ceil(mockBookings.length / pageSize),
    };
  },

  async getBookingById(id: string): Promise<Booking> {
    await sleep();
    const found = mockBookings.find((b) => b.bookingId === id);
    if (!found) {
      throw new Error("Không tìm thấy đơn đặt sân");
    }
    return found;
  },

  async getBookingByCode(code: string): Promise<Booking> {
    await sleep();
    const found = mockBookings.find((b) => b.bookingCode === code);
    if (!found) {
      throw new Error("Mã đặt sân không tồn tại");
    }
    return found;
  },

  async cancelBooking(id: string): Promise<void> {
    await sleep();
    const target = mockBookings.find((b) => b.bookingId === id);
    if (target) {
      target.status = "CANCELLED";
      target.updatedAt = new Date().toISOString();
    }
  },

  // Admin
  async getAllBookings(
    params?: PaginationParams & { date?: string; status?: string }
  ): Promise<PaginatedResponse<Booking>> {
    await sleep();
    let result = [...mockBookings];

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
    return {
      invoiceId: payload.invoiceId,
      invoiceCode: `HD-${new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "")}-001`,
      bookingId: "B-101",
      totalCost: 150000,
      status: "PAID",
      issuedBy: "EMP-001",
      issuedAt: new Date().toISOString(),
      paidAt: new Date().toISOString(),
      paymentMethod: payload.paymentMethod,
      note: "Đã thanh toán tại quầy",
    };
  },
};
