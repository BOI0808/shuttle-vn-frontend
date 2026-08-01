import axiosInstance from '@/lib/axios';
import {
  ApiResponse,
  AuthResponse,
  LoginRequest,
  RefreshTokenRequest,
  RegisterRequest,
  User,
} from '@/types';

export const authService = {
  async login(payload: LoginRequest): Promise<AuthResponse> {
    const { data } = await axiosInstance.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      payload,
    );
    return data.data;
  },

  async register(payload: RegisterRequest): Promise<User> {
    const { data } = await axiosInstance.post<ApiResponse<User>>(
      '/auth/register',
      payload,
    );
    return data.data;
  },

  async refreshToken(payload: RefreshTokenRequest): Promise<AuthResponse> {
    const { data } = await axiosInstance.post<ApiResponse<AuthResponse>>(
      '/auth/refresh-token',
      payload,
    );
    return data.data;
  },

  async logout(): Promise<void> {
    await axiosInstance.post('/auth/logout');
  },

  async getProfile(): Promise<User> {
    const { data } = await axiosInstance.get<ApiResponse<User>>('/auth/profile');
    return data.data;
  },
};
