import axiosInstance from "@/lib/axios";
import {
  ApiResponse,
  Booking,
  BookingDetail,
  ConfirmPaymentRequest,
  CreateBookingRequest,
  CreateWalkInBookingRequest,
  Invoice,
  PaginatedResponse,
  PaginationParams,
} from "@/types";
import {IS_MOCK, mockDelay} from "@/mocks/config";
import {mockBookings} from "@/mocks/data";

export const bookingService = {
  // Customer
  async createBooking(payload: CreateBookingRequest): Promise<Booking> {
    if (IS_MOCK) {
      await mockDelay();
      return {
        bookingId: `b-${Math.random().toString(36).substring(2, 11)}`,
        bookingCode: `DS-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        ...payload,
        status: "PENDING",
        totalCost: 150000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
    const { data } = await axiosInstance.post<ApiResponse<Booking>>(
      "/bookings",
      payload
    );
    return data.data;
  },

  async createWalkInBooking(
    payload: CreateWalkInBookingRequest
  ): Promise<Booking> {
    if (IS_MOCK) {
      await mockDelay();
      return {
        bookingId: `b-${Math.random().toString(36).substring(2, 11)}`,
        bookingCode: `DS-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        customerId: "guest-id",
        courtId: payload.courtId,
        date: payload.date,
        startTime: payload.startTime,
        endTime: payload.endTime,
        status: "PENDING",
        totalCost: 150000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
    const { data } = await axiosInstance.post<ApiResponse<Booking>>(
      "/bookings/guest",
      payload
    );
    return data.data;
  },

  async getMyBookings(
    params?: PaginationParams
  ): Promise<PaginatedResponse<BookingDetail>> {
    if (IS_MOCK) {
      await mockDelay();
      return {
        items: mockBookings.filter(b => b.customerId === "c1"),
        totalCount: mockBookings.filter(b => b.customerId === "c1").length,
        pageNumber: params?.pageNumber || 1,
        pageSize: params?.pageSize || 10,
        totalPages: 1,
      };
    }
    const { data } = await axiosInstance.get<
      ApiResponse<PaginatedResponse<BookingDetail>>
    >("/bookings/my", { params });
    return data.data;
  },

  async getBookingById(id: string): Promise<Booking> {
    if (IS_MOCK) {
      await mockDelay();
      const booking = mockBookings.find((b) => b.bookingId === id);
      if (!booking) throw new Error("Booking not found");
      return booking;
    }
    const { data } = await axiosInstance.get<ApiResponse<BookingDetail>>(
      `/bookings/${id}`
    );
    return data.data;
  },

  async getBookingByCode(code: string): Promise<BookingDetail> {
    if (IS_MOCK) {
      await mockDelay();
      const booking = mockBookings.find((b) => b.bookingCode === code);
      if (!booking) throw new Error("Booking not found");
      return booking;
    }
    const { data } = await axiosInstance.get<ApiResponse<BookingDetail>>(
      `/bookings/code/${code}`
    );
    return data.data;
  },

  async cancelBooking(id: string): Promise<void> {
    if (IS_MOCK) {
      await mockDelay();
      const booking = mockBookings.find((b) => b.bookingId === id);
      if (!booking) return;

      const oldStatus = booking.status;
      booking.status = "CANCELLED";
      booking.updatedAt = new Date().toISOString();
      booking.statusHistory.push({
        id: `h-${Math.random().toString(36).slice(2, 9)}`,
        bookingId: booking.bookingId,
        oldStatus,
        newStatus: "CANCELLED",
        changedBy: null,
        changedAt: new Date().toISOString(),
        reason: "Người dùng yêu cầu hủy trên web",
      });

      return;
    }
    await axiosInstance.put(`/bookings/${id}/cancel`);
  },

  // Admin
  async getAllBookings(
    params?: PaginationParams & { date?: string; status?: string }
  ): Promise<PaginatedResponse<Booking>> {
    if (IS_MOCK) {
      await mockDelay();
      let filtered = [...mockBookings];
      if (params?.date) filtered = filtered.filter(b => b.date === params.date);
      if (params?.status) filtered = filtered.filter(b => b.status === params.status);

      return {
        items: filtered,
        totalCount: filtered.length,
        pageNumber: params?.pageNumber || 1,
        pageSize: params?.pageSize || 10,
        totalPages: 1,
      };
    }
    const { data } = await axiosInstance.get<
      ApiResponse<PaginatedResponse<Booking>>
    >("/admin/bookings", { params });
    return data.data;
  },

  async confirmPayment(payload: ConfirmPaymentRequest): Promise<Invoice> {
    if (IS_MOCK) {
      await mockDelay();
      return {
        invoiceId: `inv-${Math.random().toString(36).substring(2, 11)}`,
        invoiceCode: `HD-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-001`,
        bookingId: "mock-booking-id",
        totalCost: 150000,
        status: "PAID",
        issuedBy: "e1",
        issuedAt: new Date().toISOString(),
        paidAt: new Date().toISOString(),
        paymentMethod: payload.paymentMethod,
        note: null,
      };
    }
    const { data } = await axiosInstance.post<ApiResponse<Invoice>>(
      "/admin/payments/confirm",
      payload
    );
    return data.data;
  },
};
