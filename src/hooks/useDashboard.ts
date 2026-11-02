'use client';

import { skipToken, useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services';
import { QUERY_KEYS } from '@/config/app';
import { CourtUsageReportParams, RevenueReportParams } from '@/types';

export function useDashboardSummary() {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard,
    queryFn: () => dashboardService.getSummary(),
    refetchInterval: 1000 * 60 * 5,
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

export function useCourtUsageStats(params: CourtUsageReportParams | null) {
  return useQuery({
    queryKey: QUERY_KEYS.courtUsageStats(
      params?.fromDate ?? '',
      params?.toDate ?? '',
      params?.groupBy ?? 'Day'
    ),
    queryFn: params
      ? () => dashboardService.getCourtUsageStats(params)
      : skipToken,
    retry: false,
  });
}
