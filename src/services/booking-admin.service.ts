import axiosInstance from "@/lib/axios";
import {
  ApiResponse,
  BookingAdminDetail,
  BookingListItem,
  ConfirmBookingRequest,
  PaginatedResponse,
  PaginationParams,
  RejectBookingRequest,
} from "@/types";
import { IS_MOCK, mockDelay } from "@/mocks/config";
import { mockAdminBookings } from "@/mocks/data";

type PendingBookingParams = Pick<PaginationParams, "pageNumber" | "pageSize">;

export const bookingAdminService = {
  async getPendingBookings(
    params?: PendingBookingParams
  ): Promise<PaginatedResponse<BookingListItem>> {
    if (IS_MOCK) {
      await mockDelay();
      const pageNumber = params?.pageNumber ?? 1;
      const pageSize = params?.pageSize ?? 20;
      const pending = mockAdminBookings
        .filter((booking) => booking.status === "Pending")
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
      const start = (pageNumber - 1) * pageSize;
      return {
        items: pending.slice(start, start + pageSize),
        pageNumber,
        pageSize,
        totalCount: pending.length,
        totalPages: Math.ceil(pending.length / pageSize),
      };
    }
    const { data } = await axiosInstance.get<
      ApiResponse<PaginatedResponse<BookingListItem>>
    >("/booking-requests", { params });
    return data.data;
  },

  async getBookingDetail(id: string): Promise<BookingAdminDetail> {
    if (IS_MOCK) {
      await mockDelay();
      const booking = mockAdminBookings.find((item) => item.bookingId === id);
      if (!booking) throw new Error("Không tìm thấy đơn đặt sân");
      return booking;
    }
  const { data } = await axiosInstance.get<ApiResponse<BookingAdminDetail>>(
      `/booking-requests/${id}`
    );
    return data.data;
  },

  async confirmBooking(
    id: string,
    payload: ConfirmBookingRequest,
    idempotencyKey: string
  ): Promise<BookingAdminDetail> {
    const { data } = await axiosInstance.post<ApiResponse<BookingAdminDetail>>(
      `/booking-requests/${id}/confirm`,
      payload,
      { headers: { "Idempotency-Key": idempotencyKey } }
    );
    return data.data;
  },

  async rejectBooking(
    id: string,
    payload: RejectBookingRequest,
    idempotencyKey: string
  ): Promise<BookingAdminDetail> {
    const { data } = await axiosInstance.post<ApiResponse<BookingAdminDetail>>(
      `/booking-requests/${id}/reject`,
      payload,
      { headers: { "Idempotency-Key": idempotencyKey } }
    );
    return data.data;
  },

  async completeBooking(
    id: string,
    payload: ConfirmBookingRequest | undefined,
    idempotencyKey: string
  ): Promise<BookingAdminDetail> {
    const { data } = await axiosInstance.post<ApiResponse<BookingAdminDetail>>(
      `/booking-requests/${id}/complete`,
      payload,
      { headers: { "Idempotency-Key": idempotencyKey } }
    );
    return data.data;
  },
};