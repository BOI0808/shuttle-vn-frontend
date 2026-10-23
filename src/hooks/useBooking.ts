"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { bookingService } from "@/services";
import { BookingAdminQueryParams, QUERY_KEYS } from "@/config/app";
import {
  ConfirmPaymentRequest,
  CreateBookingRequest,
  CreateGuestBookingRequest,
  PaginationParams,
} from "@/types";

export function usePricePreview(params: {
  courtId: number;
  date: string;
  startTime: string;
  endTime: string;
}) {
  return useQuery({
    queryKey: ["booking-price-preview", params],
    queryFn: () => bookingService.getPricePreview(params),
    enabled:
      params.courtId > 0 &&
      !!params.date &&
      !!params.startTime &&
      !!params.endTime &&
      params.endTime > params.startTime,
  });
}

export function useMyBookings(params?: PaginationParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.myBookings, params],
    queryFn: () => bookingService.getMyBookings(params),
  });
}

export function useAllMyBookings() {
  return useQuery({
    queryKey: [...QUERY_KEYS.myBookings, "all"],
    queryFn: () => bookingService.getAllMyBookings(),
  });
}

export function useBooking(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.booking(id),
    queryFn: () => bookingService.getBookingById(id),
    enabled: !!id,
  });
}

/**
 * Tra cứu đơn theo mã (public, khách vãng lai).
 * Dùng mutation vì đây là một hành động "tra cứu" theo yêu cầu người dùng,
 * không phải dữ liệu cần cache/refetch tự động như query thông thường.
 */
export function useBookingLookup() {
  return useMutation({
    mutationFn: (code: string) => bookingService.getBookingByCode(code),
  });
}

export function useAllBookings(
  params?: BookingAdminQueryParams,
  enabled = true
) {
  return useQuery({
    queryKey: QUERY_KEYS.adminBookings(params),
    queryFn: () => bookingService.getAllBookings(params),
    enabled,
    placeholderData: keepPreviousData,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ payload, idempotencyKey }: { payload: CreateBookingRequest; idempotencyKey: string }) =>
      bookingService.createBooking(payload, idempotencyKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myBookings });
    },
  });
}

export function useCreateGuestBooking() {
  return useMutation({
    mutationFn: ({ payload, idempotencyKey }: { payload: CreateGuestBookingRequest; idempotencyKey: string }) =>
      bookingService.createGuestBooking(payload, idempotencyKey),
  });
}

export function useBookingInvoice(id: string, enabled = true) {
  return useQuery({
    queryKey: [...QUERY_KEYS.booking(id), "invoice"],
    queryFn: () => bookingService.getBookingInvoice(id),
    enabled: !!id && enabled,
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason, idempotencyKey }: { id: string; reason: string; idempotencyKey: string }) =>
      bookingService.cancelBooking(id, reason, idempotencyKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myBookings });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.bookings });
    },
  });
}

export function useConfirmPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ConfirmPaymentRequest) =>
      bookingService.confirmPayment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.bookings });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard });
    },
  });
}
