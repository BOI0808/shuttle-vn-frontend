import axiosInstance from "@/lib/axios";
import {
    ApiResponse,
    IssueCodeRequest,
    LoginRequest,
    RegisterRequest,
    UpdateProfileRequest,
    UserAccount,
} from "@/types";
import {AuthUser} from "@/stores/auth.store";
import {IS_MOCK, mockDelay} from "@/mocks/config";
import {mockCustomer, mockUserAccounts} from "@/mocks/data";

export const authService = {
    async login(payload: LoginRequest): Promise<UserAccount> {
        if (IS_MOCK) {
            await mockDelay();
            const user = mockUserAccounts.find(u => 
                (u.customer?.email === payload.email || u.employee?.email === payload.email)
            );
            if (!user) throw new Error("Email hoặc mật khẩu không chính xác");
            return user;
        }
        const {data} = await axiosInstance.post<ApiResponse<UserAccount>>(
            "/auth/login",
            payload
        );
        return data.data;
    },

    async register(payload: RegisterRequest): Promise<string> {
        if (IS_MOCK) {
            await mockDelay();
            return "mock-account-id";
        }
        const {data} = await axiosInstance.post<ApiResponse<string>>(
            "/auth/register",
            payload
        );
        return data.data;
    },

    async sendVerificationCode(payload: IssueCodeRequest): Promise<void> {
        if (IS_MOCK) {
            await mockDelay();
            console.log("Mock verification code sent to:", payload.email);
            return;
        }
        const {data} = await axiosInstance.post<ApiResponse<string>>("/auth/issue-code", payload);
        console.log(data.data);
    },

    async logout(): Promise<void> {
        if (IS_MOCK) {
            await mockDelay(200);
            return;
        }
        await axiosInstance.post("/auth/logout");
    },

    async getProfile(): Promise<AuthUser> {
        if (IS_MOCK) {
            await mockDelay(200);
            return {
                accountId: mockCustomer.accountId!,
                fullName: mockCustomer.fullName,
                phone: mockCustomer.phone,
                email: mockCustomer.email,
                role: "Customer",
            };
        }
        const { data } = await axiosInstance.get<ApiResponse<AuthUser>>("/auth/me");
        return data.data;
    },

    async updateProfile(payload: UpdateProfileRequest): Promise<AuthUser> {
        if (IS_MOCK) {
            await mockDelay();
            return {
                accountId: mockCustomer.accountId!,
                fullName: payload.fullName,
                phone: payload.phone,
                email: mockCustomer.email,
                role: "Customer",
            };
        }
        const {data} = await axiosInstance.put<ApiResponse<AuthUser>>(
            "/profile",
            payload
        );
        return data.data;
    },
};