import axiosInstance from "@/lib/axios";
import {
  ApiResponse,
  AuthResponse,
  LoginRequest,
  RefreshTokenRequest,
  RegisterRequest,
  UserAccount,
} from "@/types";

export const authService = {
  async login(payload: LoginRequest): Promise<AuthResponse> {
    const { data } = await axiosInstance.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      payload
    );
    return data.data;
  },

  async register(payload: RegisterRequest): Promise<UserAccount> {
    const { data } = await axiosInstance.post<ApiResponse<UserAccount>>(
      "/auth/register",
      payload
    );
    return data.data;
  },

  async refreshToken(payload: RefreshTokenRequest): Promise<AuthResponse> {
    const { data } = await axiosInstance.post<ApiResponse<AuthResponse>>(
      "/auth/refresh-token",
      payload
    );
    return data.data;
  },

  async logout(): Promise<void> {
    await axiosInstance.post("/auth/logout");
  },

  async getProfile(): Promise<UserAccount> {
    const { data } = await axiosInstance.get<ApiResponse<UserAccount>>(
      "/auth/profile"
    );
    return data.data;
  },
};
