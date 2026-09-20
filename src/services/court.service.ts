import axiosInstance from "@/lib/axios";
import {
  ApiResponse,
  Court,
  CourtGridResponse,
  CreateCourtRequest,
  PaginatedResponse,
  PaginationParams,
  UpdateCourtRequest,
} from "@/types";
import {IS_MOCK, mockDelay} from "@/mocks/config";
import {getMockCourtGrid, mockCourts} from "@/mocks/data";

export const courtService = {
  async getCourts(
    params?: PaginationParams
  ): Promise<PaginatedResponse<Court>> {
    if (IS_MOCK) {
      await mockDelay();
      return {
        items: mockCourts,
        totalCount: mockCourts.length,
        pageNumber: params?.pageNumber || 1,
        pageSize: params?.pageSize || 10,
        totalPages: 1,
      };
    }
    const { data } = await axiosInstance.get<
      ApiResponse<PaginatedResponse<Court>>
    >("/courts", { params });
    return data.data;
  },

  async getCourtById(id: string): Promise<Court> {
    if (IS_MOCK) {
      await mockDelay();
      const court = mockCourts.find((c) => c.courtId.toString() === id);
      if (!court) throw new Error("Court not found");
      return court;
    }
    const { data } = await axiosInstance.get<ApiResponse<Court>>(
      `/courts/${id}`
    );
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
        status: "ACTIVE",
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

  async updateCourt(id: string, payload: UpdateCourtRequest): Promise<Court> {
    if (IS_MOCK) {
      await mockDelay();
      const court = mockCourts.find((c) => c.courtId.toString() === id);
      if (!court) throw new Error("Court not found");
      return { ...court, ...payload, updatedAt: new Date().toISOString() };
    }
    const { data } = await axiosInstance.put<ApiResponse<Court>>(
      `/courts/${id}`,
      payload
    );
    return data.data;
  },

  async deleteCourt(id: string): Promise<void> {
    if (IS_MOCK) {
      await mockDelay();
      return;
    }
    await axiosInstance.delete(`/courts/${id}`);
  },
};
