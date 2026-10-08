import axiosInstance from "@/lib/axios";
import {
  ApiResponse,
  Court,
  CourtGridResponse,
  CourtSchedule,
  CreateCourtRequest,
  CreatePricingRuleRequest,
  PricingRule,
  UpdateCourtRequest,
  UpdateCourtScheduleRequest,
  UpdateCourtStatusRequest,
  UpdatePricingRuleRequest,
  PaginatedResponse,
} from "@/types";
import { IS_MOCK, mockDelay } from "@/mocks/config";
import { getMockCourtGrid, mockCourts } from "@/mocks/data";

export const courtService = {
  async getCourts(): Promise<Court[]> {
    if (IS_MOCK) {
      await mockDelay();
      return mockCourts;
    }
    const { data } = await axiosInstance.get<
      ApiResponse<PaginatedResponse<Court>>
    >("/courts");
    return data.data.items;
  },

  async getCourtById(id: number): Promise<Court> {
    if (IS_MOCK) {
      await mockDelay();
      const court = mockCourts.find((item) => item.courtId === id);
      if (!court) throw new Error("Không tìm thấy sân");
      return court;
    }
    const { data } = await axiosInstance.get<ApiResponse<Court>>(`/courts/${id}`);
    return data.data;
  },

  async getCourtGrid(date: string): Promise<CourtGridResponse> {
    if (IS_MOCK) {
      await mockDelay();
      return getMockCourtGrid(date);
    }
    const { data } = await axiosInstance.get<ApiResponse<CourtGridResponse>>(
      "/courts/grid",
      { params: { date } }
    );
    return data.data;
  },

  async createCourt(payload: CreateCourtRequest): Promise<Court> {
    if (IS_MOCK) {
      await mockDelay();
      return {
        courtId: mockCourts.length + 1,
        ...payload,
        status: "Active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
    const { data } = await axiosInstance.post<ApiResponse<Court>>(
      "/courts",
      payload
    );
    return data.data;
  },

  async updateCourt(id: number, payload: UpdateCourtRequest): Promise<Court> {
    if (IS_MOCK) {
      await mockDelay();
      const court = mockCourts.find((item) => item.courtId === id);
      if (!court) throw new Error("Không tìm thấy sân");
      Object.assign(court, payload, { updatedAt: new Date().toISOString() });
      return court;
    }
    const { data } = await axiosInstance.patch<ApiResponse<Court>>(`/courts/${id}`, payload);
    return data.data;
  },

  async updateCourtStatus(id: number, payload: UpdateCourtStatusRequest): Promise<boolean> {
    if (IS_MOCK) {
      await mockDelay();
      const court = mockCourts.find((item) => item.courtId === id);
      if (!court) throw new Error("Không tìm thấy sân");
      court.status = payload.status;
      court.updatedAt = new Date().toISOString();
      return true;
    }
    const { data } = await axiosInstance.patch<ApiResponse<boolean>>(`/courts/${id}/status`, payload);
    return data.data;
  },

  async getCourtSchedules(id: number): Promise<CourtSchedule[]> {
    const { data } = await axiosInstance.get<ApiResponse<CourtSchedule[]>>(`/courts/${id}/schedules`);
    return data.data;
  },

  async updateCourtSchedule(id: number, dayOfWeek: number, payload: UpdateCourtScheduleRequest): Promise<CourtSchedule> {
    const { data } = await axiosInstance.put<ApiResponse<CourtSchedule>>(`/courts/${id}/schedules/${dayOfWeek}`, payload);
    return data.data;
  },

  async getPricingRules(id: number): Promise<PricingRule[]> {
    const { data } = await axiosInstance.get<ApiResponse<PricingRule[]>>(`/courts/${id}/pricing-rules`);
    return data.data;
  },

  async createPricingRule(id: number, payload: CreatePricingRuleRequest): Promise<PricingRule> {
    const { data } = await axiosInstance.post<ApiResponse<PricingRule>>(`/courts/${id}/pricing-rules`, payload);
    return data.data;
  },

  async updatePricingRule(id: number, pricingRuleId: number, payload: UpdatePricingRuleRequest): Promise<PricingRule> {
    const { data } = await axiosInstance.put<ApiResponse<PricingRule>>(`/courts/${id}/pricing-rules/${pricingRuleId}`, payload);
    return data.data;
  },

  async deletePricingRule(id: number, pricingRuleId: number): Promise<void> {
    await axiosInstance.delete(`/courts/${id}/pricing-rules/${pricingRuleId}`);
  },

};
