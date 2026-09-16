import axiosInstance from "@/lib/axios";
import {
    ApiResponse,
    LoginRequest,
    RegisterRequest,
    IssueCodeRequest,
    AuthResponse,
} from "@/types";

export const authService = {
  async login(payload: LoginRequest): Promise<AuthResponse> {
        const {data} = await axiosInstance.post<ApiResponse<AuthResponse>>(
            "/auth/login",
            payload
        );
        return data.data;
    },

    async register(payload: RegisterRequest): Promise<string> {
        const {data} = await axiosInstance.post<ApiResponse<string>>(
            "/auth/register",
            payload
        );
        return data.data;
    },

    async sendVerificationCode(payload: IssueCodeRequest): Promise<void> {
        const {data} = await axiosInstance.post<ApiResponse<string>>("/auth/issue-code", payload);
        console.log(data.data);
    },

    async logout(): Promise<void> {
        await axiosInstance.post("/auth/logout");
    },
};