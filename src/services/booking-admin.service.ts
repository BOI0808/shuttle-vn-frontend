import axiosInstance from "@/lib/axios";
import {
  ApiResponse,
  BookingAdminDetail,
  BookingListItem,
  PaginatedResponse,
  PaginationParams,
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
};