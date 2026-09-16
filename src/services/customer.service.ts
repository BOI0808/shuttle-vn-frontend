import {
    ApiResponse,
    Profile, UpdateProfileRequest
} from "@/types";
import axiosInstance from "@/lib/axios";

export const customerService = {
    // async getProfile(): Promise<UserAccount> {
    //     const {data} = await axiosInstance.get<ApiResponse<UserAccount>>(
    //         "/auth/profile"
    //     );
    //     return data.data;
    // },
    async getProfile(): Promise<Profile> {
        return {
            accountId: "AccountABC",
            fullName: "Nguyen Van A",
            phone: "0123456789",
            email: "nva123@gmail.com",
            role: "Customer",
        };
    },

    async updateProfile(payload: UpdateProfileRequest): Promise<Profile> {
        const {data} = await axiosInstance.put<ApiResponse<Profile>>(
            "/profile",
            payload
        );
        return data.data;
    },
};