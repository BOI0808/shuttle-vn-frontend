'use client';

import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services';
import { QUERY_KEYS } from '@/config/app';
import { DateRangeParams } from '@/types';

export function useDashboardSummary() {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard,
    queryFn: () => dashboardService.getSummary(),
    refetchInterval: 1000 * 60 * 5, // Cập nhật 5 phút/lần
  });
}

export function useRevenueStats(params: DateRangeParams) {
  return useQuery({
    queryKey: QUERY_KEYS.revenueStats(params.fromDate, params.toDate),
    queryFn: () => dashboardService.getRevenueStats(params),
    enabled: !!params.fromDate && !!params.toDate,
  });
}
