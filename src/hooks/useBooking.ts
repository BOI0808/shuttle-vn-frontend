'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { bookingService } from '@/services';
import { QUERY_KEYS } from '@/config/app';
import {
  ConfirmPaymentRequest,
  CreateBookingRequest,
  CreateGuestBookingRequest,
  PaginationParams,
} from '@/types';

export function useMyBookings(params?: PaginationParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.myBookings, params],
    queryFn: () => bookingService.getMyBookings(params),
  });
}

export function useBooking(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.booking(id),
    queryFn: () => bookingService.getBookingById(id),
    enabled: !!id,
  });
}

export function useAllBookings(params?: PaginationParams & { date?: string; status?: string }) {
  return useQuery({
    queryKey: [...QUERY_KEYS.bookings, params],
    queryFn: () => bookingService.getAllBookings(params),
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateBookingRequest) => bookingService.createBooking(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myBookings });
    },
  });
}

export function useCreateGuestBooking() {
  return useMutation({
    mutationFn: (payload: CreateGuestBookingRequest) =>
      bookingService.createGuestBooking(payload),
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => bookingService.cancelBooking(id),
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
