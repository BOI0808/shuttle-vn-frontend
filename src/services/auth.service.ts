import axiosInstance from "@/lib/axios";
import {
  ApiResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  MyProfile,
  UpdateProfileRequest,
} from "@/types";

export const authService = {
  async login(payload: LoginRequest): Promise<void> {
    await axiosInstance.post("/auth/login", payload);
  },

  async register(payload: RegisterRequest): Promise<RegisterResponse> {
    const { data } = await axiosInstance.post<ApiResponse<RegisterResponse>>(
      "/auth/register",
      payload
    );
    return data.data;
  },

  async logout(): Promise<void> {
    await axiosInstance.post("/auth/logout");
  },

  async getProfile(): Promise<MyProfile> {
    const { data } = await axiosInstance.get<ApiResponse<MyProfile>>(
      "/auth/profile"
    );
    return data.data;
  },

  async updateProfile(payload: UpdateProfileRequest): Promise<MyProfile> {
    const { data } = await axiosInstance.put<ApiResponse<MyProfile>>(
      "/profile",
      payload
    );
    return data.data;
  },
};
