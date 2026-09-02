// import axiosInstance from "@/lib/axios";
// import {
//   ApiResponse,
//   AuthResponse,
//   LoginRequest,
//   RefreshTokenRequest,
//   RegisterRequest,
//   UserAccount,
// } from "@/types";

// export const authService = {
//   async login(payload: LoginRequest): Promise<AuthResponse> {
//     const { data } = await axiosInstance.post<ApiResponse<AuthResponse>>(
//       "/auth/login",
//       payload
//     );
//     return data.data;
//   },

//   async register(payload: RegisterRequest): Promise<UserAccount> {
//     const { data } = await axiosInstance.post<ApiResponse<UserAccount>>(
//       "/auth/register",
//       payload
//     );
//     return data.data;
//   },

//   async refreshToken(payload: RefreshTokenRequest): Promise<AuthResponse> {
//     const { data } = await axiosInstance.post<ApiResponse<AuthResponse>>(
//       "/auth/refresh-token",
//       payload
//     );
//     return data.data;
//   },

//   async logout(): Promise<void> {
//     await axiosInstance.post("/auth/logout");
//   },

//   async getProfile(): Promise<UserAccount> {
//     const { data } = await axiosInstance.get<ApiResponse<UserAccount>>(
//       "/auth/profile"
//     );
//     return data.data;
//   },
// };

//Mock API
// src/services/auth.service.ts
import { AuthResponse, LoginRequest, RegisterRequest } from "@/types";

// Helper giả lập delay mạng (1 giây)
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  async login(payload: LoginRequest): Promise<AuthResponse> {
    await sleep(1000);

    // Test trường hợp sai mật khẩu
    if (payload.password === "123456") {
      throw new Error("Tài khoản hoặc mật khẩu không chính xác");
    }

    // Giả lập đăng nhập Admin nếu username có chữ 'admin'
    const isAdmin = payload.username.toLowerCase().includes("admin");

    return {
      accessToken: "mock_access_token_123456",
      refreshToken: "mock_refresh_token_abcdef",
      expiresIn: 3600,
      account: {
        accountId: "ACC-001",
        username: payload.username,
        status: "ACTIVE",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      employee: isAdmin
        ? {
            employeeId: "EMP-001",
            accountId: "ACC-001",
            fullName: "Quản trị viên Demo",
            phone: "0901234567",
            email: "admin@shuttlevn.com",
            isAdmin: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        : null,
      customer: !isAdmin
        ? {
            customerId: "CUST-001",
            accountId: "ACC-001",
            fullName: "Khách hàng Demo",
            phone: "0909876543",
            email: payload.username.includes("@")
              ? payload.username
              : "customer@shuttlevn.com",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        : null,
    };
  },

  async register(payload: RegisterRequest): Promise<void> {
    await sleep(1000);

    // Test trùng email
    if (payload.email === "admin@shuttlevn.com") {
      throw new Error("Email này đã được sử dụng");
    }

    console.log("Mock register payload:", payload);
    return;
  },

  async logout(): Promise<void> {
    await sleep(300);
    return;
  },

  async getProfile(): Promise<AuthResponse["account"]> {
    await sleep(500);
    return {
      accountId: "ACC-001",
      username: "demo_user",
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },
};
