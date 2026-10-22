"use client";

import { useQuery } from "@tanstack/react-query";
import { bookingAdminService } from "@/services";
import { QUERY_KEYS } from "@/config/app";
import { PaginationParams } from "@/types";

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