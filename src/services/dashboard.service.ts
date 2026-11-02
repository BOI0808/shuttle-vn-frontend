import axiosInstance from "@/lib/axios";
import {
  ApiResponse,
  CourtUsageReport,
  CourtUsageReportParams,
  DashboardSummary,
  RevenueReport,
  RevenueReportParams,
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
      "/admin/dashboard"
    );
    return data.data;
  },

  async getRevenueStats(params: RevenueReportParams): Promise<RevenueReport> {
    const { data } = await axiosInstance.get<ApiResponse<RevenueReport>>(
      "/admin/statistics/revenue",
      { params }
    );
    return data.data;
  },

  async getCourtUsageStats(
    params: CourtUsageReportParams
  ): Promise<CourtUsageReport> {
    const { data } = await axiosInstance.get<ApiResponse<CourtUsageReport>>(
      "/admin/statistics/court-usage",
      { params }
    );
    return data.data;
  },
};
