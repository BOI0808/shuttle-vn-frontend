import axiosInstance from "@/lib/axios";
import {
  ApiResponse,
  LoginRequest,
  RegisterRequest,
  IssueCodeRequest,
  UpdateProfileRequest,
  UserAccount,
} from "@/types";
import { AuthUser } from "@/stores/auth.store";

export const authService = {
  async login(payload: LoginRequest): Promise<UserAccount> {
    const { data } = await axiosInstance.post<ApiResponse<UserAccount>>(
      "/auth/login",
      payload
    );
    return data.data;
  },

  async register(payload: RegisterRequest): Promise<string> {
    const { data } = await axiosInstance.post<ApiResponse<string>>(
      "/auth/register",
      payload
    );
    return data.data;
  },

  async sendVerificationCode(payload: IssueCodeRequest): Promise<void> {
    const { data } = await axiosInstance.post<ApiResponse<string>>(
      "/auth/issue-code",
      payload
    );
    console.log(data.data);
  },

  async logout(): Promise<void> {
    await axiosInstance.post("/auth/logout");
  },

  async getProfile(): Promise<UserAccount> {
    const { data } = await axiosInstance.get<ApiResponse<UserAccount>>(
      "/auth/me"
    );
    return data.data;
  },

  async updateProfile(payload: UpdateProfileRequest): Promise<AuthUser> {
    const { data } = await axiosInstance.put<ApiResponse<AuthUser>>(
      "/profile",
      payload
    );
    return data.data;
  },
};
