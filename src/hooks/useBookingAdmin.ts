"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bookingAdminService } from "@/services";
import { QUERY_KEYS } from "@/config/app";
import {
  ConfirmBookingRequest,
  PaginationParams,
  RejectBookingRequest,
} from "@/types";

export function usePendingBookings(
  params?: Pick<PaginationParams, "pageNumber" | "pageSize">
) {
  return useQuery({
    queryKey: QUERY_KEYS.pendingBookings(params),
    queryFn: () => bookingAdminService.getPendingBookings(params),
  });
}

export function useBookingDetail(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.bookingDetail(id),
    queryFn: () => bookingAdminService.getBookingDetail(id),
    enabled: !!id,
  });
}

function useInvalidateBookingQueries() {
  const queryClient = useQueryClient();
  return (id: string) =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pendingBookingsAll }),
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.adminBookingsAll }),
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.bookingDetail(id) }),
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.courtGrids }),
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard }),
    ]);
}

interface BookingActionVariables {
  id: string;
  idempotencyKey: string;
}

interface ConfirmBookingVariables extends BookingActionVariables {
  payload: ConfirmBookingRequest;
}

interface RejectBookingVariables extends BookingActionVariables {
  payload: RejectBookingRequest;
}

interface CompleteBookingVariables extends BookingActionVariables {
  payload?: ConfirmBookingRequest;
}

export function useConfirmBooking() {
  const invalidate = useInvalidateBookingQueries();
  return useMutation({
    mutationFn: ({ id, payload, idempotencyKey }: ConfirmBookingVariables) =>
      bookingAdminService.confirmBooking(id, payload, idempotencyKey),
    onSettled: (_data, _error, { id }) => invalidate(id),
  });
}

export function useRejectBooking() {
  const invalidate = useInvalidateBookingQueries();
  return useMutation({
    mutationFn: ({ id, payload, idempotencyKey }: RejectBookingVariables) =>
      bookingAdminService.rejectBooking(id, payload, idempotencyKey),
    onSettled: (_data, _error, { id }) => invalidate(id),
  });
}

export function useCompleteBooking() {
  const invalidate = useInvalidateBookingQueries();
  return useMutation({
    mutationFn: ({ id, payload, idempotencyKey }: CompleteBookingVariables) =>
      bookingAdminService.completeBooking(id, payload, idempotencyKey),
    onSettled: (_data, _error, { id }) => invalidate(id),
  });
}