import axiosInstance from "@/lib/axios";
import {
  ApiResponse,
  ApiSchemas,
  Booking,
  BookingAdminDetail,
  BookingDetail,
  BookingListItem,
  ConfirmPaymentRequest,
  CreateBookingRequest,
  CreateGuestBookingRequest,
  Invoice,
  PaginatedResponse,
  PaginationParams,
  PricePreviewDto,
} from "@/types";
import { BookingAdminQueryParams } from "@/config/app";
import { IS_MOCK, mockDelay } from "@/mocks/config";
import { mockAdminBookings, mockBookings } from "@/mocks/data";

function toBookingDetail(
  dto: ApiSchemas["BookingDto"] | ApiSchemas["BookingDetailDto"]
): BookingDetail {
  const invoice = dto.invoice;
  const history = "statusHistory" in dto ? dto.statusHistory : undefined;
  return {
    bookingId: dto.bookingId ?? "",
    bookingCode: dto.bookingCode ?? "",
    customerId: dto.customerId ?? "",
    customerName: dto.customerName ?? "",
    customerPhone: dto.customerPhone ?? "",
    courtId: dto.courtId ?? 0,
    courtName: dto.courtName ?? "",
    date: dto.date ?? "",
    startTime: dto.startTime ?? "",
    endTime: dto.endTime ?? "",
    status: dto.status ?? "Pending",
    totalCost: dto.totalCost ?? 0,
    createdAt: dto.createdAt ?? "",
    updatedAt: dto.createdAt ?? "",
    invoice: invoice ? {
      invoiceCode: invoice.invoiceCode ?? "",
      status: invoice.status ?? "Unpaid",
      paymentMethod: invoice.paymentMethod ?? null,
      paidAt: invoice.paidAt ?? null,
    } : null,
    paymentStatus: ("paymentStatus" in dto ? dto.paymentStatus : invoice?.status) ?? null,
    statusHistory: (history ?? []).map((item) => ({
      oldStatus: item.oldStatus ?? null,
      newStatus: item.newStatus ?? "Pending",
      actorType: item.actorType ?? "System",
      actorName: item.actorName ?? null,
      changedAt: item.changedAt ?? "",
      reason: item.reason ?? null,
    })),
  };
}

function matchesAdminFilters(
  booking: BookingAdminDetail,
  params?: BookingAdminQueryParams
): boolean {
  if (!params) return true;
  if (params.fromDate && booking.date < params.fromDate) return false;
  if (params.toDate && booking.date > params.toDate) return false;
  if (params.courtId && booking.courtId !== params.courtId) return false;
  if (params.status && booking.status !== params.status) return false;
  if (params.customerId && booking.customerId !== params.customerId) {
    return false;
  }
  const keyword = params.keyword?.trim().toLowerCase();
  if (!keyword) return true;
  return [
    booking.bookingCode,
    booking.customerName,
    booking.customerEmail,
    booking.customerPhone,
  ].some((value) => value.toLowerCase().includes(keyword));
}

function getMockAdminBookings(
  params?: BookingAdminQueryParams
): PaginatedResponse<BookingListItem> {
  const pageNumber = params?.pageNumber ?? 1;
  const pageSize = params?.pageSize ?? 20;
  const matched = mockAdminBookings
    .filter((booking) => matchesAdminFilters(booking, params))
    .sort((a, b) =>
      `${b.date}${b.startTime}`.localeCompare(`${a.date}${a.startTime}`)
    );
  const start = (pageNumber - 1) * pageSize;
  return {
    items: matched.slice(start, start + pageSize),
    pageNumber,
    pageSize,
    totalCount: matched.length,
    totalPages: Math.ceil(matched.length / pageSize),
  };
}

export const bookingService = {
  // Customer
  async getPricePreview(params: {
    courtId: number;
    date: string;
    startTime: string;
    endTime: string;
  }): Promise<PricePreviewDto> {
    const { data } = await axiosInstance.get<ApiResponse<PricePreviewDto>>(
      "/bookings/price-preview",
      { params }
    );
    return data.data;
  },

  async createBooking(payload: CreateBookingRequest, idempotencyKey: string): Promise<Booking> {
    if (IS_MOCK) {
      await mockDelay();
      return {
        bookingId: `b-${Math.random().toString(36).substring(2, 11)}`,
        bookingCode: `DS-${Math.random()
          .toString(36)
          .substring(2, 7)
          .toUpperCase()}`,
        ...payload,
        customerId: "mock-customer",
        status: "Pending",
        totalCost: 150000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
    const { data } = await axiosInstance.post<ApiResponse<Booking>>(
      "/bookings",
      payload,
      { headers: { "Idempotency-Key": idempotencyKey } }
    );
    return data.data;
  },

  async createGuestBooking(
    payload: CreateGuestBookingRequest,
    idempotencyKey: string
  ): Promise<Booking> {
    if (IS_MOCK) {
      await mockDelay();
      return {
        bookingId: `b-${Math.random().toString(36).substring(2, 11)}`,
        bookingCode: `DS-${Math.random()
          .toString(36)
          .substring(2, 7)
          .toUpperCase()}`,
        customerId: "guest-id",
        courtId: payload.courtId,
        date: payload.date,
        startTime: payload.startTime,
        endTime: payload.endTime,
        status: "Pending",
        totalCost: 150000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
    const { data } = await axiosInstance.post<ApiResponse<Booking>>(
      "/bookings/quick",
      payload,
      { headers: { "Idempotency-Key": idempotencyKey } }
    );
    return data.data;
  },

  async getMyBookings(
    params?: PaginationParams
  ): Promise<PaginatedResponse<BookingDetail>> {
    if (IS_MOCK) {
      await mockDelay();
      return {
        items: mockBookings.filter((b) => b.customerId === "c1"),
        totalCount: mockBookings.filter((b) => b.customerId === "c1").length,
        pageNumber: params?.pageNumber || 1,
        pageSize: params?.pageSize || 10,
        totalPages: 1,
      };
    }
    const { data } = await axiosInstance.get<ApiResponse<ApiSchemas["BookingDtoPagedResult"]>>(
      "/bookings/me", { params }
    );
    const page = data.data;
    return {
      items: (page.items ?? []).map(toBookingDetail),
      pageNumber: page.pageNumber ?? params?.pageNumber ?? 1,
      pageSize: page.pageSize ?? params?.pageSize ?? 10,
      totalCount: page.totalCount ?? 0,
      totalPages: page.totalPages ?? 0,
    };
  },

  async getAllMyBookings(): Promise<BookingDetail[]> {
    const pageSize = 100;
    const bookings: BookingDetail[] = [];
    let pageNumber = 1;
    let totalPages = 1;
    do {
      const page = await this.getMyBookings({ pageNumber, pageSize });
      bookings.push(...page.items);
      totalPages = page.totalPages;
      pageNumber += 1;
    } while (pageNumber <= totalPages);
    return bookings;
  },

  async getBookingById(id: string): Promise<BookingDetail> {
    if (IS_MOCK) {
      await mockDelay();
      const booking = mockBookings.find((b) => b.bookingId === id);
      if (!booking) throw new Error("Booking not found");
      return booking;
    }
    const { data } = await axiosInstance.get<ApiResponse<ApiSchemas["BookingDetailDto"]>>(
      `/bookings/${id}`
    );
    return toBookingDetail(data.data);
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

  async cancelBooking(id: string, reason: string, idempotencyKey: string): Promise<void> {
    if (IS_MOCK) {
      await mockDelay();
      const booking = mockBookings.find((b) => b.bookingId === id);
      if (!booking) return;

      const oldStatus = booking.status;
      booking.status = "Cancelled";
      booking.updatedAt = new Date().toISOString();
      booking.statusHistory.push({
        id: `h-${Math.random().toString(36).slice(2, 9)}`,
        bookingId: booking.bookingId,
        oldStatus,
        newStatus: "Cancelled",
        actorType: "Customer",
        actorName: null,
        changedAt: new Date().toISOString(),
        reason: "Người dùng yêu cầu hủy trên web",
      });

      return;
    }
    await axiosInstance.patch(`/bookings/${id}/cancel`, { reason }, {
      headers: { "Idempotency-Key": idempotencyKey },
    });
  },

  async getBookingInvoice(id: string) {
    const { data } = await axiosInstance.get<ApiResponse<import("@/types").ApiSchemas["InvoiceDto"]>>(
      `/bookings/${id}/invoice`
    );
    return data.data;
  },

  // Admin
    async getAllBookings(
    params?: BookingAdminQueryParams
  ): Promise<PaginatedResponse<BookingListItem>> {
    if (IS_MOCK) {
      await mockDelay();
      return getMockAdminBookings(params);
    }
    const { data } = await axiosInstance.get<
      ApiResponse<PaginatedResponse<BookingListItem>>
    >("/admin/bookings", { params });
    return data.data;
  },

  async confirmPayment(payload: ConfirmPaymentRequest): Promise<Invoice> {
    if (IS_MOCK) {
      await mockDelay();
      return {
        invoiceId: `inv-${Math.random().toString(36).substring(2, 11)}`,
        invoiceCode: `HD-${new Date()
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, "")}-001`,
        bookingId: "mock-booking-id",
        totalCost: 150000,
        status: "Paid",
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
