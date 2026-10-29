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
  BookingPricePreviewParams,
  CancelBookingRequest,
  RescheduleBookingRequest,
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

function useInvalidateBookingChange() {
  const queryClient = useQueryClient();
  return (id: string) => Promise.all([
    QUERY_KEYS.myBookings,
    QUERY_KEYS.bookings,
    QUERY_KEYS.booking(id),
    QUERY_KEYS.bookingDetail(id),
    QUERY_KEYS.adminBookingsAll,
    QUERY_KEYS.pendingBookingsAll,
    QUERY_KEYS.courtGrids,
    QUERY_KEYS.invoices,
    QUERY_KEYS.dashboard,
    ["booking-reschedule-preview", id],
  ].map((queryKey) => queryClient.invalidateQueries({ queryKey })));
}

export function useReschedulePreview(id: string, params: BookingPricePreviewParams) {
  return useQuery({
    queryKey: ["booking-reschedule-preview", id, params],
    queryFn: () => bookingService.getReschedulePreview(id, params),
    enabled: !!id && (params.courtId ?? 0) > 0 && !!params.date &&
      !!params.startTime && !!params.endTime && params.endTime > params.startTime,
  });
}

export function useRescheduleBooking() {
  const invalidate = useInvalidateBookingChange();
  return useMutation({
    mutationFn: ({ id, payload, idempotencyKey }: { id: string; payload: RescheduleBookingRequest; idempotencyKey: string }) =>
      bookingService.rescheduleBooking(id, payload, idempotencyKey),
    onSettled: (_data, _error, { id }) => invalidate(id),
  });
}

export function useCancelBooking() {
  const invalidate = useInvalidateBookingChange();
  return useMutation({
    mutationFn: ({ id, payload, idempotencyKey }: { id: string; payload: CancelBookingRequest; idempotencyKey: string }) =>
      bookingService.cancelBooking(id, payload, idempotencyKey),
    onSettled: (_data, _error, { id }) => invalidate(id),
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
