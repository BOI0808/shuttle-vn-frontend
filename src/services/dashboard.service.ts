import axiosInstance from "@/lib/axios";
import {
  ApiResponse,
  DashboardSummary,
  DateRangeParams,
  RevenueStats,
} from "@/types";
import { IS_MOCK, mockDelay } from "@/mocks/config";
import { mockDashboardSummary } from "@/mocks/data";

export const dashboardService = {
  async getSummary(): Promise<DashboardSummary> {
    if (IS_MOCK) {
      await mockDelay();
      return mockDashboardSummary;
    }
    const { data } = await axiosInstance.get<ApiResponse<DashboardSummary>>(
      "/admin/dashboard/summary"
    );
    return data.data;
  },

  async getRevenueStats(params: DateRangeParams): Promise<RevenueStats[]> {
    if (IS_MOCK) {
      await mockDelay();
      return mockDashboardSummary.revenueChart;
    }
    const { data } = await axiosInstance.get<ApiResponse<RevenueStats[]>>(
      "/admin/dashboard/revenue",
      { params }
    );
    return data.data;
  },
};
