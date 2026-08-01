import axiosInstance from '@/lib/axios';
import { ApiResponse, DashboardSummary, DateRangeParams, RevenueStats } from '@/types';

export const dashboardService = {
  async getSummary(): Promise<DashboardSummary> {
    const { data } = await axiosInstance.get<ApiResponse<DashboardSummary>>(
      '/admin/dashboard/summary',
    );
    return data.data;
  },

  async getRevenueStats(params: DateRangeParams): Promise<RevenueStats[]> {
    const { data } = await axiosInstance.get<ApiResponse<RevenueStats[]>>(
      '/admin/dashboard/revenue',
      { params },
    );
    return data.data;
  },
};
