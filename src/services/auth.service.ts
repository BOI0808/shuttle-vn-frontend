import axiosInstance from "@/lib/axios";
import {
    ApiResponse,
    AuthResponse,
    IssueCodeRequest,
    LoginRequest,
    RegisterRequest,
} from "@/types";

export const authService = {
    async login(payload: LoginRequest): Promise<AuthResponse> {
        const {data} = await axiosInstance.post<ApiResponse<AuthResponse>>(
            "/auth/login",
            payload
        );
        return data.data;
    },

    async register(payload: RegisterRequest): Promise<AuthResponse> {
        const {data} = await axiosInstance.post<ApiResponse<AuthResponse>>(
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

    async getProfile(): Promise<AuthResponse["account"]> {
        const {data} = await axiosInstance.get<ApiResponse<AuthResponse["account"]>>(
            "/auth/profile"
        );
        return data.data;
    },
};