'use client';

import { skipToken, useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services';
import { QUERY_KEYS } from '@/config/app';
import { RevenueReportParams } from '@/types';

export function useDashboardSummary() {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard,
    queryFn: () => dashboardService.getSummary(),
    refetchInterval: 1000 * 60 * 5, // Cập nhật 5 phút/lần
  });
}

export function useRevenueStats(params: RevenueReportParams | null) {
  return useQuery({
    queryKey: QUERY_KEYS.revenueStats(
      params?.fromDate ?? '',
      params?.toDate ?? '',
      params?.groupBy ?? 'Day'
    ),
    queryFn: params ? () => dashboardService.getRevenueStats(params) : skipToken,
    retry: false,
  });
}
