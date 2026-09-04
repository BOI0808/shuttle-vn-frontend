import axiosInstance from "@/lib/axios";
import {
  ApiResponse,
  Court,
  CourtGridResponse,
  PaginatedResponse,
  PaginationParams,
  CreateCourtRequest,
  UpdateCourtRequest,
} from "@/types";

export const courtService = {
  async getCourts(
    params?: PaginationParams
  ): Promise<PaginatedResponse<Court>> {
    const { data } = await axiosInstance.get<
      ApiResponse<PaginatedResponse<Court>>
    >("/courts", { params });
    return data.data;
  },

  async getCourtById(id: string): Promise<Court> {
    const { data } = await axiosInstance.get<ApiResponse<Court>>(
      `/courts/${id}`
    );
    return data.data;
  },

  async getCourtGrid(date: string): Promise<CourtGridResponse> {
    const { data } = await axiosInstance.get<ApiResponse<CourtGridResponse>>(
      "/courts/grid",
      { params: { date } }
    );
    return data.data;
  },

  async createCourt(payload: CreateCourtRequest): Promise<Court> {
    const { data } = await axiosInstance.post<ApiResponse<Court>>(
      "/courts",
      payload
    );
    return data.data;
  },

  async updateCourt(id: string, payload: UpdateCourtRequest): Promise<Court> {
    const { data } = await axiosInstance.put<ApiResponse<Court>>(
      `/courts/${id}`,
      payload
    );
    return data.data;
  },

  async deleteCourt(id: string): Promise<void> {
    await axiosInstance.delete(`/courts/${id}`);
  },
};
