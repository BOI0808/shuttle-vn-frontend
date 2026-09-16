import axiosInstance from "@/lib/axios";
import {
    ApiResponse, CustomerProfile,
    UserAccount
} from "@/types";

export const customerService = {
    // async getProfile(): Promise<UserAccount> {
    //     const {data} = await axiosInstance.get<ApiResponse<UserAccount>>(
    //         "/auth/profile"
    //     );
    //     return data.data;
    // },
    async getProfile(): Promise<CustomerProfile> {
        return {
            fullName: "Nguyen Van A",
            phone: "0123456789",
            email: "nva123@gmail.com",
        };
    },
};