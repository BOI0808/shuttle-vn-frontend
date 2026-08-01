import axiosInstance from '@/lib/axios';
import {
  ApiResponse,
  Booking,
  ConfirmPaymentRequest,
  CreateBookingRequest,
  CreateGuestBookingRequest,
  PaginatedResponse,
  PaginationParams,
  Payment,
} from '@/types';

export const bookingService = {
  // Customer
  async createBooking(payload: CreateBookingRequest): Promise<Booking> {
    const { data } = await axiosInstance.post<ApiResponse<Booking>>('/bookings', payload);
    return data.data;
  },

  async createGuestBooking(payload: CreateGuestBookingRequest): Promise<Booking> {
    const { data } = await axiosInstance.post<ApiResponse<Booking>>(
      '/bookings/guest',
      payload,
    );
    return data.data;
  },

  async getMyBookings(params?: PaginationParams): Promise<PaginatedResponse<Booking>> {
    const { data } = await axiosInstance.get<ApiResponse<PaginatedResponse<Booking>>>(
      '/bookings/my',
      { params },
    );
    return data.data;
  },

  async getBookingById(id: string): Promise<Booking> {
    const { data } = await axiosInstance.get<ApiResponse<Booking>>(`/bookings/${id}`);
    return data.data;
  },

  async getBookingByCode(code: string): Promise<Booking> {
    const { data } = await axiosInstance.get<ApiResponse<Booking>>(
      `/bookings/code/${code}`,
    );
    return data.data;
  },

  async cancelBooking(id: string): Promise<void> {
    await axiosInstance.put(`/bookings/${id}/cancel`);
  },

  // Admin
  async getAllBookings(params?: PaginationParams & { date?: string; status?: string }): Promise<PaginatedResponse<Booking>> {
    const { data } = await axiosInstance.get<ApiResponse<PaginatedResponse<Booking>>>(
      '/admin/bookings',
      { params },
    );
    return data.data;
  },

  async confirmPayment(payload: ConfirmPaymentRequest): Promise<Payment> {
    const { data } = await axiosInstance.post<ApiResponse<Payment>>(
      '/admin/payments/confirm',
      payload,
    );
    return data.data;
  },
};
