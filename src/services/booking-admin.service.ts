import axiosInstance from "@/lib/axios";
import {
  ApiResponse,
  BookingAdminDetail,
  BookingListItem,
  BookingStatus,
  ConfirmBookingRequest,
  PaginatedResponse,
  PaginationParams,
  RejectBookingRequest,
} from "@/types";
import { IS_MOCK, mockDelay } from "@/mocks/config";
import { mockAdminBookings } from "@/mocks/data";

type PendingBookingParams = Pick<PaginationParams, "pageNumber" | "pageSize">;

function updateMockBooking(
  id: string,
  update: (current: BookingAdminDetail) => BookingAdminDetail
): BookingAdminDetail {
  const index = mockAdminBookings.findIndex((item) => item.bookingId === id);
  if (index === -1) throw new Error("Không tìm thấy đơn đặt sân");
  const next = update(mockAdminBookings[index]);
  mockAdminBookings[index] = next;
  return next;
}

function withMockTransition(
  current: BookingAdminDetail,
  newStatus: BookingStatus,
  reason: string | null
): BookingAdminDetail {
  return {
    ...current,
    status: newStatus,
    statusHistory: [
      ...current.statusHistory,
      {
        oldStatus: current.status,
        newStatus,
        actorType: "Employee",
        actorName: "Nhân viên (mock)",
        changedAt: new Date().toISOString(),
        reason,
      },
    ],
  };
}

function withMockInvoice(
  current: BookingAdminDetail,
  payload: ConfirmBookingRequest
): BookingAdminDetail {
  const today = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const order = mockAdminBookings.filter((item) => item.invoice).length + 1;
  const status = payload.isPaid ? "Paid" : "Unpaid";
  return {
    ...current,
    paymentStatus: status,
    invoice: {
      invoiceCode: `HD-${today}-${String(order).padStart(3, "0")}`,
      status,
      paymentMethod: payload.isPaid ? (payload.paymentMethod ?? null) : null,
      paidAt: payload.isPaid ? (payload.paidAt ?? null) : null,
    },
  };
}

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
    if (IS_MOCK) {
      await mockDelay();
      return updateMockBooking(id, (current) => {
        if (current.status !== "Pending") {
          throw new Error("Đơn không còn ở trạng thái chờ xác nhận");
        }
        return withMockInvoice(
          withMockTransition(current, "Confirmed", "Confirmed by staff"),
          payload
        );
      });
    }
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
    if (IS_MOCK) {
      await mockDelay();
      return updateMockBooking(id, (current) => {
        if (current.status !== "Pending") {
          throw new Error("Đơn không còn ở trạng thái chờ xác nhận");
        }
        return withMockTransition(current, "Cancelled", payload.reason);
      });
    }
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
    if (IS_MOCK) {
      await mockDelay();
      return updateMockBooking(id, (current) => {
        if (current.status === "Pending" && !payload) {
          throw new Error("Cần thông tin thanh toán để hoàn thành đơn chờ xác nhận");
        }
        if (current.status !== "Pending" && current.status !== "Confirmed") {
          throw new Error("Không thể hoàn thành đơn ở trạng thái hiện tại");
        }
        const withInvoice =
          current.status === "Pending" && payload
            ? withMockInvoice(current, payload)
            : current;
        return withMockTransition(withInvoice, "Completed", "Usage recorded by staff");
      });
    }
    const { data } = await axiosInstance.post<ApiResponse<BookingAdminDetail>>(
      `/booking-requests/${id}/complete`,
      payload,
      { headers: { "Idempotency-Key": idempotencyKey } }
    );
    return data.data;
  },
};