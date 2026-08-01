'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { courtService } from '@/services';
import { QUERY_KEYS } from '@/config/app';
import { PaginationParams } from '@/types';

export function useCourts(params?: PaginationParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.courts, params],
    queryFn: () => courtService.getCourts(params),
  });
}

export function useCourtGrid(date: string) {
  return useQuery({
    queryKey: QUERY_KEYS.courtGrid(date),
    queryFn: () => courtService.getCourtGrid(date),
    refetchInterval: 1000 * 30, // Refetch mỗi 30 giây cho real-time
  });
}

export function useCourt(id: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.courts, id],
    queryFn: () => courtService.getCourtById(id),
    enabled: !!id,
  });
}

export function useDeleteCourt() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => courtService.deleteCourt(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.courts });
    },
  });
}
